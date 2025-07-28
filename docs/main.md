# Documentación del Archivo main.js

## Descripción General

El archivo `main.js` es el núcleo de la lógica del frontend de una aplicación web tipo panel administrativo o dashboard. Gestiona la autenticación del usuario, navegación dinámica entre secciones como usuarios y documentos, y la carga de contenido HTML y scripts JavaScript según el módulo seleccionado. Además, facilita la comunicación con el backend mediante funciones autenticadas.

## Funcionalidad

- **Autenticación:**
  - `getAuthToken()`: Obtiene el token JWT desde `localStorage`.
  - `checkAuth()`: Verifica si el usuario está autenticado, redirige al login si no lo está.
  - `fetchWithAuth(url, options)`: Realiza peticiones `fetch` incluyendo token de autenticación en los headers. Redirige si el token es inválido o expirado.

- **Carga dinámica del contenido (SPA-like):**
  - `loadContent(section, param)`: Carga dinámicamente contenido en el `<div id="content">` según la sección seleccionada (`users`, `formUser`, `documents`).
    - En cada caso, realiza una petición para obtener el HTML correspondiente.
    - Carga de forma condicional scripts (`formUser.js`, `documents.js`) y estilos (`formUser.css`).
    - Inicializa funciones específicas si están disponibles (`initializeUsersPage`, `initializeUserForm`, etc.).

- **Inicialización del Dashboard:**
  - Verifica autenticación al cargar la página.
  - Inserta el nombre del usuario autenticado en el encabezado.
  - Configura el botón de logout para limpiar sesión.
  - Asocia eventos de clic para navegación en los enlaces del menú.
  - Carga la vista de `users` por defecto al iniciar.

## Casos de Uso / Para qué Sirve

- 🧭 Carga y navegación en una SPA administrativa sin recargar toda la página.
- 🔐 Asegura el acceso autenticado a contenido restringido.
- 🔄 Carga modular de secciones HTML/JS, mejorando el rendimiento y la mantenibilidad.
- 🧩 Es ideal para paneles administrativos que gestionan usuarios, documentos u otros recursos.

Este módulo beneficia a:
- Usuarios finales que necesitan una navegación fluida.
- Equipos de desarrollo que desean separar lógicamente las vistas y controlarlas desde un solo punto.
- Aplicaciones que necesitan persistencia de sesión basada en `localStorage`.

## Consideraciones Adicionales

- Requiere que existan los archivos HTML: `users.html`, `formUser.html`, `documents.html`.
- Asume que las funciones `initializeUsersPage`, `initializeUserForm` y similares están definidas globalmente.
- Puede ampliarse fácilmente para nuevas secciones siguiendo el mismo patrón.
- Necesita que la API backend implemente protección con JWT.
- Utiliza `MutationObserver` de forma implícita para cargar scripts según secciones cargadas.