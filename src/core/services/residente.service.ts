import { Pagination } from "../../core/class/pagination";
import { HttpGetParams } from "../../core/interfaces/common/api.interface";
import { ResidenteModel } from "../../core/models/residente.model";
import { ResidenciaEntity } from "../../database/entities/residencia.entity";
import { ResidenteEntity } from "../../database/entities/residente.entity";
import { getRepository } from "typeorm";

export const find = async (params: HttpGetParams) => {
    const { page, limit, ...filters } = params;

    const repository = getRepository(ResidenteEntity);
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
    const repository = getRepository(ResidenteEntity);

    const entity = await repository.findOneOrFail({
        where: { ...predicates }
    }).catch(() => { throw new Error('No existe el registro seleccionado'); });

    return entity;
};

export const create = async (model: ResidenteModel) => {
    const repository = getRepository(ResidenteEntity);
    const residenciaRepository = getRepository(ResidenciaEntity);

    const exists = await repository.findOne({ dni: model.dni });

    if (exists) {
        throw new Error('Exite un residente con la identificacion proporcionada.')
    }

    const entity = repository.create(model);

    if (model.residenciaId) {
        const residencia = await residenciaRepository.findOneOrFail(model.residenciaId)
            .catch(() => { throw new Error('Error al buscar la residencia seleccionada.'); });

        entity.residencia = residencia;
    }

    return await repository.save(entity);
};

export const update = async (id: number, model: ResidenteModel) => {
    const repository = getRepository(ResidenteEntity);

    const entity = await repository.findOneOrFail({ id })
        .catch(() => { throw new Error('Error al buscar el registro seleccionada.'); });

    const result = repository.merge(entity!, model);

    return await repository.save(result);
};

export const remove = async (id: number) => {
    const repository = getRepository(ResidenteEntity);

    await repository.delete({ id })
        .catch(() => { throw new Error('Fallo al intentar eliminar el registro.'); });

    return true;
};

export const moveToResidencia = async (residenciaId: number, residenteIds: number[]) => {
    const repository = getRepository(ResidenteEntity);
    const residenciaRepository = getRepository(ResidenciaEntity);

    const residencia = await residenciaRepository.findOneOrFail(residenciaId)
        .catch(() => { throw new Error('Error al buscar la residencia seleccionada.'); });

    const residentes = (await repository.findByIds(residenteIds))
        .map(x => x.residencia = residencia);

    await repository.save(residentes);
    return residentes;
};
