import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authorization = (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers.authorization;

    if (!authorization || authorization.split(' ')[0] !== 'Bearer') {
        return res.sendStatus(401);
    }

    const token = jwt.decode(authorization.split(' ')[1], { json: true });
    const isExpires = Date.now() >= ((token?.exp || 0) * 1000);

    if (!token || isExpires) {
        return res.sendStatus(401);
    }

    next();
}