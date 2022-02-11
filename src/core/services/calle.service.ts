import { Pagination } from "../../core/class/pagination";
import { HttpGetParams } from "../../core/interfaces/common/api.interface";
import { CalleModel } from "../../core/models/calle.model";
import { CalleEntity } from "../../database/entities/calle.entity";
import { getRepository } from "typeorm";

export const find = async (params: HttpGetParams) => {
    const { page, limit, ...filters } = params;

    const repository = getRepository(CalleEntity);
    const [data, total] = await repository.findAndCount({
        where: { ...filters },
        take: params.limit,
        skip: (params.page - 1) * params.limit
    });
    const pagination = new Pagination(Number(page), Number(limit), total);

    if (!data.length) {
        throw new Error('No existen datos para mostrar');
    }

    return { data, pagination };
};

export const requery = async (predicates: { [key: string]: any }) => {
    const repository = getRepository(CalleEntity);

    const entity = await repository.findOneOrFail({
        where: { ...predicates }
    }).catch(() => { throw new Error('No existe el registro seleccionado'); });

    return entity;
};

export const create = async (model: CalleModel) => {
    const repository = getRepository(CalleEntity);

    const exists = await repository.findOne({ nombre: model.nombre });

    if (exists) {
        throw new Error('Exite una calle con el nombre proporcionada.')
    }

    const entity = repository.create(model);

    return await repository.save(entity);
};

export const update = async (id: number, model: CalleModel) => {
    const repository = getRepository(CalleEntity);

    const entity = await repository.findOneOrFail({ id })
        .catch(() => { throw new Error('Error al buscar el registro seleccionada.'); });

    const result = repository.merge(entity!, model);

    return await repository.save(result);
};

export const remove = async (id: number) => {
    const repository = getRepository(CalleEntity);

    await repository.delete({ id })
        .catch(() => { throw new Error('Fallo al intentar eliminar el registro.'); });

    return true;
};
