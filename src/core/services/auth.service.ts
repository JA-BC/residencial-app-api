import { UserEntity } from "../../database/entities/user.entity";
import { getRepository } from "typeorm";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const login = async (email: string, password: string) => {
    const repository = getRepository(UserEntity);
    const defaultError = new Error('Credenciales incorrectas');

    const user = await repository.findOneOrFail({
        where: { correo: email },
        relations: ['role']
    }).catch(() => { throw defaultError; });
    
    const isValid = await validatePassword(user as UserEntity, password);
    
    if (!isValid) {
        throw defaultError;
    }

    const { nombre } = user;
    const [token, refreshToken] = await generateToken({ name: nombre, email, role: 'Administrador' });

    const result = repository.merge(user, { sessionToken: refreshToken });
    await repository.save(result);

    return { token, refreshToken };
};

const validatePassword = async (user: UserEntity, password: string) => {
    const isValid = await bcrypt.compare(password, user.password);
    return isValid; 
};

const generateToken = async (claims: any) => {
    const secretKey = process.env.SECRET_KEY || 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRTSUVWXYZ0123456789';
    const token = jwt.sign(claims, secretKey, {
        algorithm: 'HS256',
        expiresIn: process.env.EXPIRE_IN || 3600,
        notBefore: '1 hour'
    });

    const refreshToken = jwt.sign({}, secretKey, {
        algorithm: 'HS256',
        expiresIn: 60 * 60 * 24
    });

    return [token, refreshToken];
};

export const register = async (name: string, email: string, password: string) => {
    const repository = getRepository(UserEntity);

    const hash = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, hash);

    const user = repository.create({
        password,
        hashPassword: hash,
        nombre: name,
        correo: email
    });

    return await repository.save(user);
};

export const refreshToken = async (refreshToken: string) => {
    const repository = getRepository(UserEntity);
    
    const secretKey = process.env.SECRET_KEY || 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRTSUVWXYZ0123456789';
    jwt.verify(refreshToken, secretKey, (error) => {
        if (error) {
            throw new Error('Token invalido');
        }
    });

    const user = await repository.findOneOrFail({
        where: { sessionToken: refreshToken }
    }).catch(() => { throw new Error('Token invalido'); });

    const { nombre, correo } = user;
    const [newToken] = await generateToken({ name: nombre, email: correo, role: 'Administrador' });

    return newToken;
};
