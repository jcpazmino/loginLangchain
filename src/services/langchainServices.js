const { ChatOpenAI } = require("@langchain/openai");
const { createReactAgent } = require("langchain/agents");
const { AgentExecutor } = require("langchain/agents");
const { pull } = require("langchain/hub");
const { createTools } = require("../tools/langchainTools");
require("dotenv").config();

class LangChainAgentService {
    constructor() {
        this.executor = null;
        this.isInitialized = false;
        this.initializationPromise = null;
        this.model = null;
    }

    async initialize() {
        if (this.isInitialized) {
            return this.executor;
        }

        if (this.initializationPromise) {
            return this.initializationPromise;
        }

        this.initializationPromise = this._initializeAgent();
        return this.initializationPromise;
    }

    async _initializeAgent() {
        try {
            if (!process.env.OPENAI_API_KEY) {
                throw new Error("OPENAI_API_KEY no está configurada en las variables de entorno");
            }

            // Crear el modelo de chat
            this.model = new ChatOpenAI({
                openAIApiKey: process.env.OPENAI_API_KEY,
                temperature: 0,
                modelName: "gpt-3.5-turbo",
                maxTokens: 1000
            });
            const promtp = `
Eres un asistente útil que puede verificar si un usuario está autorizado para ingresar a la aplicación y realizar acciones en su nombre.
Tu tarea es verificar si el usuario está autenticado y, si lo está, realizar la acción solicitada.
Si el usuario no está autenticado, debes solicitarle que inicie sesión.
Pregunta: {input}
{agent_scratchpad}`;

            // Crear herramientas sin token inicial
            const tools = createTools();

            // Usar un agente más simple
            this.executor = {
                invoke: async (input, authToken = null) => {
                    try {
                        const result = await this._processQuerySimple(input.input, authToken);
                        return { output: result };
                    } catch (error) {
                        console.error("Error en invoke:", error);
                        return { output: `Error al procesar la consulta: ${error.message}` };
                    }
                }
            };


            this.isInitialized = true;
            return this.executor;

        } catch (error) {
            console.error("Error al inicializar el agente:", error);
            this.isInitialized = false;
            this.initializationPromise = null;
            throw error;
        }
    }

    async _processQuerySimple(inputText, authToken = null) {
        try {
            // Detectar si se quiere usar la herramienta loginTool
            if (inputText.includes('loginTool')) {
                const match = inputText.match(/["'](\d+)["']/);
                if (match) {
                    const [, email, password] = match;

                    const tools = createTools(authToken);
                    const loginTool = tools.find(tool => tool.name === "loginTool");

                    if (loginTool) {
                        const resultado = await loginTool.func(email, password);
                        return resultado;
                    } else {
                        return "Error: Herramienta loginTool no encontrada";
                    }
                } else {
                    return "Error: No se pudo extraer el formato email y password del input";
                }

            }

        } catch (error) {
            console.error("Error en _processQuerySimple:", error);
            return `Error al procesar la consulta: ${error.message}`;
        }
    }
}

// Crear una instancia singleton
const langChainService = new LangChainAgentService();

module.exports = langChainService;