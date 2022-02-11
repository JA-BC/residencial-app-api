import { HttpResponse } from '../../core/interfaces/common/api.interface';
import { Request, Response } from 'express';
import * as service from '../../core/services/auth.service';

export const login = async (req: Request, res: Response) => {
    try {
        const { correo, password } = req.body;
        const { token, refreshToken } = await service.login(correo, password);
        return res.status(200).json({
            token,
            refreshToken
        });
    } catch (e: any) {
        console.error(e);
        return res.status(404).json(e?.message);
    }
};

export const register = async (req: Request, res: Response) => {
    try {
        const { nombre, correo, password } = req.body;
        await service.register(nombre, correo, password);
        return res.status(200).send();
    } catch (e: any) {
        console.error(e);
        return res.status(404).json(e?.message);
    }
};

export const refreshToken = async (req: Request, res: Response) => {
    try {
        const { token } = req.body;
        const result = await service.refreshToken(token);
        return res.status(200).json({ refreshToken: result });
    } catch (e: any) {
        console.error(e);
        return res.status(404).json(e?.message);
    }
};
