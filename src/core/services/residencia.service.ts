import { Pagination } from "../../core/class/pagination";
import { HttpGetParams } from "../../core/interfaces/common/api.interface";
import { ResidenciaModel } from "../../core/models/residencia.model";
import { ResidenciaEntity } from "../../database/entities/residencia.entity";
import { getRepository } from "typeorm";

export const find = async (params: HttpGetParams) => {
    const { page, limit, ...filters } = params;

    const repository = getRepository(ResidenciaEntity);
    const [data, total] = await repository.findAndCount({
        where: { ...filters },
        take: params.limit,
        skip: (params.page - 1) * params.limit
    });
    const pagination = new Pagination(page, limit, total);

    if (!data.length) {
        throw new Error('No existen datos para mostrar');
    }

    return { data, pagination };
};

export const requery = async (predicates: { [key: string]: any }) => {
    const repository = getRepository(ResidenciaEntity);

    const entity = await repository.findOneOrFail({
        where: { ...predicates }
    }).catch(() => { throw new Error('No existe el registro seleccionado'); });

    return entity;
};

export const create = async (model: ResidenciaModel) => {
    const repository = getRepository(ResidenciaEntity);

    const exists = await repository.findOne({ numero: model.numero });

    if (exists) {
        throw new Error('Exite una residencia con el numero de casa proporcionado');
    }

    const entity = repository.create(model);

    return await repository.save(entity);
};

export const update = async (id: number, model: ResidenciaModel) => {
    const repository = getRepository(ResidenciaEntity);

    const entity = await repository.findOneOrFail({ id })
        .catch(() => { throw new Error('Error al buscar el registro seleccionada.'); });

    const result = repository.merge(entity!, model);

    return await repository.save(result);
};

export const remove = async (id: number) => {
    const repository = getRepository(ResidenciaEntity);

    await repository.delete({ id })
        .catch(() => { throw new Error('Fallo al intentar eliminar el registro.'); });

    return true;
};
