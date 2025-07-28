# LoginLangchain

Una aplicación web de autenticación que utiliza LangChain Tools para gestionar el proceso de login de usuarios.

## 📋 Descripción

Este proyecto implementa un sistema de login moderno que integra LangChain Tools para proporcionar funcionalidades avanzadas de autenticación. La aplicación cuenta con un frontend elegante y un backend robusto que maneja la autenticación mediante JWT.

## 🚀 Características

- ✅ Sistema de autenticación con JWT
- ✅ Integración con LangChain Tools
- ✅ Frontend responsivo con HTML5, CSS3 y JavaScript vanilla
- ✅ Dashboard administrativo
- ✅ Gestión de usuarios y documentos
- ✅ API proxy para comunicación con backend
- ✅ Documentación completa

## 🛠️ Tecnologías

- **Backend**: Node.js + Express.js
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **AI/ML**: LangChain + OpenAI
- **Autenticación**: JWT (JSON Web Tokens)
- **HTTP Client**: node-fetch

## 📦 Dependencias

```json
{
  "express": "^5.1.0",
  "@langchain/community": "^0.0.20",
  "@langchain/openai": "^0.0.14",
  "langchain": "^0.1.0",
  "dotenv": "^16.3.1",
  "node-fetch": "^2.7.0",
  "mime-types": "^2.1.35"
}
```

## 🏗️ Estructura del Proyecto

```
loginLangchain/
├── docs/                    # Documentación del proyecto
│   ├── login.md
│   ├── loginProcess.md
│   ├── loginProcess.png
│   └── main.md
├── src/
│   ├── server.js           # Servidor Express principal
│   ├── public/             # Archivos estáticos del frontend
│   │   ├── index.html
│   │   ├── login.html
│   │   ├── dashboard.html
│   │   ├── css/
│   │   │   ├── login.css
│   │   │   └── main.css
│   │   └── js/
│   │       ├── login.js
│   │       └── main.js
│   ├── services/           # Servicios de LangChain
│   │   └── langchainServices.js
│   └── tools/              # Herramientas de LangChain
│       └── langchainTools.js
├── package.json
└── README.md
```

## ⚙️ Configuración

1. **Clona el repositorio**:
   ```bash
   git clone https://github.com/jcpazmino/loginLangchain.git
   cd loginLangchain
   ```

2. **Instala las dependencias**:
   ```bash
   npm install
   ```

3. **Configura las variables de entorno**:
   Crea un archivo `.env` en la raíz del proyecto:
   ```env
   OPENAI_API_KEY=tu_clave_de_openai_aqui
   PORT=4000
   ```

4. **Inicia el servidor**:
   ```bash
   npm start
   ```
   
   O para desarrollo:
   ```bash
   npm run dev
   ```

## 🖥️ Uso

1. Accede a la aplicación en `http://localhost:4000`
2. Utiliza el formulario de login para autenticarte
3. Una vez autenticado, serás redirigido al dashboard
4. Navega por las diferentes secciones (Usuarios, Documentos, etc.)

## 📡 API Endpoints

- `GET /` - Página de login
- `GET /dashboard` - Dashboard principal
- `POST /api/users/login` - Proxy para autenticación
- `GET /api/proxy-documents` - Proxy para obtener documentos

## 🤖 Integración con LangChain

La aplicación utiliza LangChain Tools para:
- Verificación avanzada de credenciales
- Procesamiento inteligente de consultas de autenticación
- Integración con OpenAI para funcionalidades de IA

### Configuración de LangChain

El servicio de LangChain se inicializa automáticamente y proporciona:
- Agente de chat con OpenAI GPT-3.5-turbo
- Herramientas personalizadas para login
- Procesamiento de consultas de autenticación

## 📚 Documentación

Para más información detallada, consulta la carpeta `docs/`:
- [Proceso de Login](docs/loginProcess.md)
- [Documentación Principal](docs/main.md)
- [Guía de Login](docs/login.md)

## 🔧 Scripts Disponibles

- `npm start` - Inicia el servidor en producción
- `npm run dev` - Inicia el servidor en modo desarrollo
- `npm test` - Ejecuta las pruebas (por implementar)

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia ISC.

## 👥 Autor

- **Desarrollador**: jcpazmino
- **Repositorio**: [GitHub](https://github.com/jcpazmino/loginLangchain)

## 🆘 Soporte

Si tienes alguna pregunta o problema, por favor abre un [issue](https://github.com/jcpazmino/loginLangchain/issues) en GitHub.
