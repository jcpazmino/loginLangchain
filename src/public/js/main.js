
// Verificar si el usuario está autenticado
const token = localStorage.getItem('token');
const username = localStorage.getItem('username');

const estado = await verificarEstadoAgente();
if (estado) {
    console.log("Agente LangChain activo");
} else {
    console.log("Agente LangChain inactivo o no disponible");
}

if (!token) {
    // Si no hay token, redirigir al login
    window.location.href = '/login.html';
} else {
    // Mostrar información del usuario
    document.getElementById('username').textContent = username || 'Usuario';
  //  document.getElementById('token').textContent = token.substring(0, 20) + '...';
}

function logout() {
    // Limpiar localStorage y redirigir al login
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    localStorage.removeItem('email');
    localStorage.removeItem('rol');
    localStorage.removeItem('first_name');
    localStorage.removeItem('last_name');
    localStorage.removeItem('phone');
    
    console.log('Sesión cerrada exitosamente');
    window.location.href = '/login.html';
}

// Función para verificar el estado del agente LangChain
async function verificarEstadoAgente() {
    try {
        const response = await fetch('/api/agent-status', {
            method: 'GET'
        });
        
        if (response.ok) {
            const data = await response.json();
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
}