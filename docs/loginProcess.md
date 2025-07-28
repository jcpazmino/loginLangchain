# Documentación del Archivo de Inicio de Sesión (login.html, login.css, login.js)

## Descripción General

El conjunto de archivos `login.html`, `login.css` y `login.js` constituyen el módulo de inicio de sesión de la aplicación web **RAGPersonal**. Su propósito principal es permitir que los usuarios ingresen a la plataforma de manera segura a través de un formulario web, validando sus credenciales con el backend y redirigiéndolos al panel de control (`/dashboard`) en caso de éxito.

## Funcionalidad

### 📄 login.html

- Estructura un formulario de inicio de sesión con campos para `email` y `contraseña`.
- Incluye:
  - Campo de error (`<div id="errorMessage">`) para mostrar mensajes si la autenticación falla.
  - Referencia a `login.css` para los estilos visuales.
  - Carga `login.js` como script de comportamiento.

### 🎨 login.css

- Define un diseño limpio y centrado del formulario:
  - Contenedor responsivo con borde redondeado y sombra.
  - Colores suaves y tipografía clara.
- Mejora la experiencia del usuario con efectos visuales:
  - Efecto hover en el botón de enviar.
  - Indicadores visuales en campos enfocados.
  - Estilización de mensajes de error en rojo.

### ⚙️ login.js

- Se encarga de la lógica del formulario:
  - Captura el evento `submit` y previene el comportamiento por defecto.
  - Envía una solicitud `POST` al endpoint `/api/users/login` con el `email` y la `contraseña` en formato JSON.
  - Si la respuesta es exitosa, guarda en `localStorage`:
    - El token de autenticación (`data.token`)
    - El nombre de usuario (`data.user.username`)
  - Redirige al usuario a `/dashboard`.
  - Si ocurre un error, muestra un mensaje descriptivo en el contenedor `#errorMessage`.

## Casos de Uso / Para qué Sirve

- ✅ **Escenario principal**: Autenticación de usuarios registrados.
- 👤 **Usuarios finales**: Personal administrativo, agentes de ventas u operativos que necesitan acceso seguro al sistema.
- 🔐 **Propósito**: Controlar el acceso a secciones privadas del sistema como el dashboard y los módulos de gestión de documentos o usuarios.
- 🧭 **Navegación protegida**: Sólo usuarios autenticados podrán ver o interactuar con contenidos protegidos por sesión.

## Consideraciones Adicionales

- 📌 **Requiere un backend activo** que exponga `/api/users/login` y retorne un `token` válido en JSON.
- 🛡️ **Seguridad**: Se recomienda usar HTTPS para proteger las credenciales.
- 🔍 **Validaciones**:
  - El navegador valida automáticamente los campos `email` y `required`.
  - Validaciones adicionales del lado del servidor son necesarias.
- 🧪 **Persistencia**: El token se almacena en `localStorage`, lo que permite mantener la sesión mientras el navegador esté abierto (no es la opción más segura para aplicaciones altamente sensibles).

