import { deleteBranch, insertBranch, selectAllBranches, selectBranchById, updateBranch } from "../models/branchModel.js";
import { AppError } from "../utils/appError.js";

export const getAllBranchesService = async () => {
    return await selectAllBranches();
};

export const getBranchByIdService = async (id) => {
    const branch = await selectBranchById(id);

    if (!branch)
        throw new AppError("Concessionária não encontrada", 400);

    return branch;
};

export const createBranchService = async ({ name, city, state, cep }) => {
    if (!name || !city || !state || !cep)
        throw new AppError("Preencha os campos corretamente", 400);

    return await insertBranch(name, city, state, cep);
};

export const editBranchService = async ({ id, name, city, state, cep }) => {
    const existingBranch = await selectBranchById(id);

    if (!existingBranch)
        throw new AppError("Concessionária não encontrada", 400);

    if (!name || !city || !state || !cep)
        throw new AppError("Preencha os campos corretamente", 400);

    return await updateBranch(id, name, city, state, cep);
};

export const removeBranchService = async (id) => {
    const existingBranch = selectBranchById(id);

    if (!existingBranch)
        throw new AppError("Concessionária não encontrada", 400);

    return await deleteBranch(id);
};