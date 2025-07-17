const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 4000;
// Puerto del frontend

// Middleware para parsear JSON
app.use(express.json());

// Ruta para la página principal (ANTES de express.static)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Ruta para el dashboard (después del login)
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// Configurar tipos MIME para archivos estáticos
app.use(express.static(path.join(__dirname, 'public'), {
    setHeaders: (res, filePath) => {
        if (filePath.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css');
        }
        if (filePath.endsWith('.js')) {
            res.setHeader('Content-Type', 'application/javascript');
        }
        if (filePath.endsWith('.html')) {
            res.setHeader('Content-Type', 'text/html');
        }
    }
}));

// Proxy para el login - redirige las llamadas al backend
app.post('/api/users/login', async (req, res) => {
    try {
        const response = await fetch('http://localhost:3000/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req.body)
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            return res.status(response.status).json(data);
        }
        
        res.json(data);
    } catch (error) {
        console.error('Error al conectar con el backend para login:', error);
        res.status(500).json({ message: 'Error al conectar con el backend' });
    }
});

// Ruta para consumir datos del backend (proxy)
app.get('/api/proxy-documents', async (req, res) => {
    try {
        const response = await fetch('http://localhost:3000/api/documents');
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error al obtener datos del backend:', error);
        res.status(500).json({ message: 'Error al conectar con el backend' });
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Frontend disponible en http://localhost:${PORT}`);
});
