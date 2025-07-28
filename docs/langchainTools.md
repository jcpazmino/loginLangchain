# Documentación de langchainTools.js

## 📋 Descripción General

El archivo `langchainTools.js` implementa herramientas personalizadas de LangChain para la autenticación de usuarios en la aplicación. Este módulo define y exporta una función que crea herramientas dinámicas (DynamicTool) específicamente diseñadas para gestionar el proceso de login a través de la integración con LangChain.

## 🔧 Funcionalidad Detallada

### Función Principal: `createTools(authToken = null)`

Esta función es responsable de crear y configurar las herramientas de LangChain que pueden ser utilizadas por el agente de IA para realizar operaciones de autenticación.

**Parámetros:**
- `authToken` (opcional): Token de autorización para operaciones autenticadas (actualmente no utilizado en la implementación)

**Retorna:**
- Array de herramientas de LangChain configuradas

### Herramienta: `loginTool`

Es una instancia de `DynamicTool` que encapsula la lógica de autenticación del usuario.

#### Propiedades:
- **name**: `"login"` - Identificador único de la herramienta
- **description**: `"Login to the application. Returns a token."` - Descripción para el agente de IA
- **func**: Función asíncrona que ejecuta el proceso de login

#### Función de Login:

```javascript
func: async (input) => {
    // Validación de formato de entrada
    // Separación de credenciales (email|password)
    // Llamada a API de autenticación
    // Almacenamiento de datos de usuario en localStorage
    // Manejo de errores
}
```

### Validación de Entrada

1. **Verificación de formato**: El input debe contener el carácter `|` como separador
2. **Separación de credenciales**: Divide el input en email y password usando `split("|")`
3. **Validación de campos**: Verifica que tanto email como password no estén vacíos

### Proceso de Autenticación

1. **Petición HTTP**: Realiza un POST a `http://localhost:3000/api/users/login`
2. **Headers**: Establece `Content-Type: application/json`
3. **Body**: Envía las credenciales en formato JSON
4. **Respuesta**: Procesa la respuesta del servidor de autenticación

### Almacenamiento de Datos

Una vez autenticado exitosamente, almacena en `localStorage`:
- `token`: Token JWT de autenticación
- `username`: Nombre de usuario
- `userId`: ID único del usuario
- `email`: Correo electrónico
- `rol`: Rol del usuario en el sistema
- `first_name`: Nombre
- `last_name`: Apellido
- `phone`: Número de teléfono

## 🔄 Flujo de Ejecución

```
┌─────────────────────┐
│   Input recibido    │
│   "email|password"  │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Validación formato  │
│ Contiene "|" ?      │
└──────────┬──────────┘
           │ Sí
           ▼
┌─────────────────────┐
│ Separar credenciales│
│ email = input[0]    │
│ password = input[1] │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Validar campos      │
│ email && password   │
└──────────┬──────────┘
           │ Válidos
           ▼
┌─────────────────────┐
│ Petición HTTP POST  │
│ a backend login API │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Procesar respuesta  │
│ response.ok ?       │
└──────────┬──────────┘
           │ Éxito
           ▼
┌─────────────────────┐
│ Almacenar en        │
│ localStorage        │
│ (token, user data)  │
└─────────────────────┘
```

## 📋 Requisitos Previos

### Sistema
- Node.js (versión 14.x o superior)
- npm o yarn como gestor de paquetes

### Servidor Backend
- API de autenticación ejecutándose en `http://localhost:3000`
- Endpoint `/api/users/login` disponible y funcional
- Backend que retorne tokens JWT válidos

### Variables de Entorno
- Archivo `.env` configurado (aunque no se usa directamente en este módulo)

## 📦 Instalación de Dependencias

```bash
# Instalar dependencias principales
npm install langchain node-fetch dotenv

# O usando yarn
yarn add langchain node-fetch dotenv
```

### Dependencias Específicas:
- **langchain**: Framework para desarrollar aplicaciones con LLMs
- **node-fetch**: Cliente HTTP para Node.js
- **dotenv**: Manejo de variables de entorno

## 🚀 Casos de Uso

### 1. Autenticación Automatizada
```javascript
const { createTools } = require('./langchainTools');
const tools = createTools();
const loginTool = tools[0];

// Ejemplo de uso
const result = await loginTool.func("usuario@email.com|password123");
```

### 2. Integración con Agente LangChain
```javascript
const { ChatOpenAI } = require("@langchain/openai");
const { createReactAgent } = require("langchain/agents");
const { createTools } = require('./langchainTools');

const model = new ChatOpenAI({...});
const tools = createTools();
const agent = await createReactAgent({
    llm: model,
    tools: tools,
    prompt: customPrompt
});
```

### 3. Validación de Credenciales por IA
El agente puede usar esta herramienta para:
- Verificar credenciales de usuario de forma inteligente
- Manejar diferentes formatos de entrada
- Proporcionar feedback contextual sobre errores de login

## 🔧 Posibles Mejoras

### 1. Manejo de Errores Mejorado
```javascript
// Mejora sugerida: Tipos específicos de error
try {
    // ... código de login
} catch (error) {
    if (error.code === 'ECONNREFUSED') {
        return "Error: No se puede conectar al servidor de autenticación";
    } else if (error.code === 'ETIMEDOUT') {
        return "Error: Tiempo de espera agotado";
    }
    return `Error de autenticación: ${error.message}`;
}
```

### 2. Configuración Dinámica de URL
```javascript
// Mejora sugerida: URL configurable
const API_BASE_URL = process.env.AUTH_API_URL || 'http://localhost:3000';
const response = await fetch(`${API_BASE_URL}/api/users/login`, {
    // ... configuración
});
```

### 3. Validación de Input Más Robusta
```javascript
// Mejora sugerida: Validación con regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
    return "Error: Formato de email inválido";
}

if (password.length < 6) {
    return "Error: La contraseña debe tener al menos 6 caracteres";
}
```

### 4. Soporte para Múltiples Formatos
```javascript
// Mejora sugerida: Aceptar JSON también
func: async (input) => {
    let email, password;
    
    try {
        // Intentar parsear como JSON
        const parsed = JSON.parse(input);
        email = parsed.email;
        password = parsed.password;
    } catch {
        // Fallback al formato actual
        [email, password] = input.split("|");
    }
    
    // ... resto de la lógica
}
```

### 5. Logging y Auditoría
```javascript
// Mejora sugerida: Sistema de logs
const winston = require('winston');
const logger = winston.createLogger({...});

func: async (input) => {
    logger.info('Intento de login iniciado', { 
        timestamp: new Date().toISOString(),
        email: email // sin incluir password por seguridad
    });
    
    // ... lógica de login
    
    if (success) {
        logger.info('Login exitoso', { email, userId: data.user.user_id });
    } else {
        logger.warn('Login fallido', { email, reason: error.message });
    }
}
```

### 6. Timeout y Retry Logic
```javascript
// Mejora sugerida: Timeout y reintentos
const fetchWithTimeout = async (url, options, timeout = 5000) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal
        });
        clearTimeout(timeoutId);
        return response;
    } catch (error) {
        clearTimeout(timeoutId);
        throw error;
    }
};
```

### 7. Integración con Token Refresh
```javascript
// Mejora sugerida: Herramienta para refresh token
const refreshTokenTool = new DynamicTool({
    name: "refreshToken",
    description: "Refresh the authentication token",
    func: async (input) => {
        const refreshToken = localStorage.getItem('refreshToken');
        // ... lógica de refresh
    }
});
```

## 🛠️ Problemas Identificados

### 1. Error en el Código Actual
```javascript
// PROBLEMA: Esta línea está mal ubicada y causará error
if (!response.ok) {
    return res.status(response.status).json(data); // 'res' no está definido
}

// SOLUCIÓN:
if (!response.ok) {
    return `Error de autenticación: ${data.message || response.statusText}`;
}
```

### 2. localStorage en Contexto del Servidor
```javascript
// PROBLEMA: localStorage no existe en Node.js
localStorage.setItem('token', data.token);

// SOLUCIÓN: Devolver los datos para que el cliente los maneje
return {
    success: true,
    token: data.token,
    user: data.user,
    message: "Login exitoso"
};
```

## 💡 Recomendaciones de Arquitectura

### 1. Separación de Responsabilidades
- Mover la lógica de almacenamiento al frontend
- Mantener solo la comunicación con API en el tool
- Implementar un patrón de respuesta consistente

### 2. Configuración Centralizada
```javascript
// config/auth.js
module.exports = {
    AUTH_API_URL: process.env.AUTH_API_URL || 'http://localhost:3000',
    LOGIN_ENDPOINT: '/api/users/login',
    TIMEOUT: parseInt(process.env.AUTH_TIMEOUT) || 5000,
    RETRY_ATTEMPTS: parseInt(process.env.AUTH_RETRY_ATTEMPTS) || 3
};
```

### 3. Interface Consistente
```javascript
// Todas las herramientas deberían devolver un formato similar
const standardResponse = {
    success: boolean,
    data: any,
    error: string | null,
    metadata: object
};
```

## 🎯 Conclusión

El archivo `langchainTools.js` proporciona una base sólida para la integración de LangChain con sistemas de autenticación. Su diseño modular permite una fácil extensión y personalización para diferentes casos de uso.

### Fortalezas:
- ✅ Integración limpia con LangChain
- ✅ Validación básica de entrada
- ✅ Manejo de errores implementado
- ✅ Estructura extensible para nuevas herramientas

### Áreas de Mejora:
- ❌ Corrección de errores en el código actual
- ❌ Mejor manejo de localStorage (contexto servidor vs cliente)
- ❌ Validación más robusta de datos de entrada
- ❌ Configuración más flexible
- ❌ Logging y auditoría
- ❌ Manejo de timeouts y reintentos

### Impacto en el Proyecto:
Este módulo es fundamental para la funcionalidad de autenticación inteligente de la aplicación, permitiendo que el agente de LangChain pueda realizar operaciones de login de manera autónoma y contextual. Con las mejoras sugeridas, puede convertirse en una herramienta robusta y confiable para sistemas de autenticación empresariales.

### Próximos Pasos:
1. Corregir los errores identificados
2. Implementar las mejoras de seguridad y robustez
3. Agregar pruebas unitarias
4. Documentar casos de uso adicionales
5. Crear herramientas complementarias (logout, refresh token, etc.)
