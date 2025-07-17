document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error al iniciar sesión');
            }

            // Almacenar el token y el nombre de usuario
            localStorage.setItem('token', data.token);
            localStorage.setItem('username', data.user.username);

            // Redirigir al dashboard
            window.location.href = '/dashboard';
        } catch (error) {
            errorMessage.textContent = error.message;
        }
    });
}); 