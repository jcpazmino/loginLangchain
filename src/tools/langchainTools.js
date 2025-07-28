const { DynamicTool } = require("langchain/tools");
const fetch = require("node-fetch");
require("dotenv").config();

// Función para crear herramientas con token de autorización
function createTools(authToken = null) {
    const headers = {
        "Content-Type": "application/json"
    };

    const loginTool = new DynamicTool({
        name: "login",
        description: "Login to the application. Returns a token.",
         func: async (input) => {
            try {
                if (!input || !input.includes('|')) {
                    return "Error: Formato de entrada incorrecto. Use 'email|password'";
                }

                const [email, password] = input.split("|");

                if (!email || !password) {
                    return "Error: email o password vacíos";
                }

                const response = await fetch('http://localhost:3000/api/users/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json'  },
                    body: JSON.stringify({ 
                        email: email, 
                        password: password 
                    })
                });

                const data = await response.json();

                if (!response.ok) {
                    return res.status(response.status).json(data);
                }             
                
                // Almacenar el token y el nombre de usuario
                localStorage.setItem('token', data.token);
                localStorage.setItem('username', data.user.username);
                localStorage.setItem('userId', data.user.user_id);
                localStorage.setItem('email', data.user.email);
                localStorage.setItem('rol', data.user.rol);
                localStorage.setItem('first_name', data.user.first_name);
                localStorage.setItem('last_name', data.user.last_name);
                localStorage.setItem('phone', data.user.phone);
                
            } catch (error) {
                console.error("Error en LoginTool:", error);
                return `Error al iniciar sesión: ${error.message}`;
            }
         }
    });

    return [loginTool];
}

module.exports = { createTools };