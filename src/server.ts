import express, { Application } from 'express';
import { createConnection } from './database';

// Middlewares
import morgan from 'morgan';
import cors from 'cors';

// Routes
import residenteRouter from './api/residente/residente.routes';
import residenciaRouter from './api/residencia/residencia.routes';
import calleRouter from './api/calle/calle.routes';
import vehiculoRouter from './api/vehiculo/vehiculo.routes';
import authRouter from './api/auth/auth.routes';

export default class Server {

    readonly app: Application = express();
    readonly port: string | number = process.env.PORT || 3000;

    constructor() { }

    onConfigure(): Server {
        // Middlewares
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(cors({
            origin: '*'
        }))

        return this;
    }

    onRoutes(root?: string): Server {
        // Routes
        const router = express.Router();

        router.use('/residente', residenteRouter);
        router.use('/residencia', residenciaRouter);
        router.use('/calle', calleRouter);
        router.use('/vehiculo', vehiculoRouter);
        router.use('/auth', authRouter);
        router.use('**', (_, res) => res.sendStatus(404));

        this.app.use(root || '/', router);
        return this;
    }

    onStartup() {
        createConnection(() =>
            this.app.listen(this.port,
                () => console.log(`SERVER ON PORT: ${this.port}`)
            )
        );
    }

}