import Server from './server';
import 'reflect-metadata';
import 'dotenv/config';

(() => {
    new Server()
        .onConfigure() // Middlewares
        .onRoutes('/api') // Routes
        .onStartup(); // Server
})();