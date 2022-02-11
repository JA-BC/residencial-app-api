import { HttpResponse } from '../../core/interfaces/common/api.interface';
import { ResidenteModel } from '../../core/models/residente.model';
import { Request, Response } from 'express';
import * as service from '../../core/services/residente.service';

export const find = async (req: Request, res: Response) => {
    try {
        const query = req.query as any;

        const {
            data, pagination
        } = await service.find(query);

        const response: HttpResponse = {
            data,
            pagination
        };

        return res.status(200).json(response);
    } catch (e: any) {
        console.error(e);
        return res.status(404).json(e?.message);
    }
};

export const requery = async (req: Request, res: Response) => {
    try {
        const id = req.params['id'];
        const response = await service.requery({ id });

        return res.status(200).json(response);
    } catch (e: any) {
        console.error(e);
        return res.status(404).json(e?.message);
    }
};

export const create = async (req: Request, res: Response) => {
    try {
        const model = req.body as ResidenteModel;
        const response = await service.create(model);

        return res.status(200).json(response);
    } catch (e: any) {
        console.error(e);
        return res.status(400).json(e?.message);
    }
};

export const update = async (req: Request, res: Response) => {
    try {
        const id = req.params['id'];
        const model = req.body as ResidenteModel;
        const response = await service.update(Number(id), model);

        return res.status(200).json(response);
    } catch (e: any) {
        console.error(e);
        return res.status(400).json(e?.message);
    }
};

export const remove = async (req: Request, res: Response) => {
    try {
        const id = req.body.id;
        const response = await service.remove(id);

        return res.status(200).json(response);
    } catch (e: any) {
        console.error(e);
        return res.status(400).json(e?.message);
    }
};

export const moveTo = async (req: Request, res: Response) => {
    try {
        const residenciaId = req.body.residenciaId;
        const ids = req.body.residentesIds;
        const response = await service.moveToResidencia(residenciaId, ids);

        return res.status(200).json(response);
    } catch (e: any) {
        console.error(e);
        return res.status(400).json(e?.message);
    }
};
