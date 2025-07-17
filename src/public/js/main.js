
// Verificar si el usuario está autenticado
const token = localStorage.getItem('token');
const username = localStorage.getItem('username');

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
    window.location.href = '/login.html';
}