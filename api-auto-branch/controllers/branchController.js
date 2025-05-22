import { createBranchService, editBranchService, getAllBranchesService, getBranchByIdService, removeBranchService } from "../services/branchService.js";

export const getAllBranches = async (req, res) => {
    try {
        const branches = await getAllBranchesService();
        res.status(200).json({
            data: branches,
            message: "Concessionárias listadas com sucesso!"
        });
    } catch (err) {
        const status = err.statusCode || 500;
        res.status(status).json({ message: err.message });
    }
};

export const getBranchById = async (req, res) => {
    const { id } = req.params

    try {
        const branch = await getBranchByIdService(id);
        res.status(200).json({
            data: branch,
            message: "Concessionária listada com sucesso!"
        });
    } catch (err) {
        const status = err.statusCode || 500;
        res.status(status).json({ message: err.message });
    }
};

export const createBranch = async (req, res) => {
    try {
        await createBranchService(req.body);
        res.status(201).json({
            message: "Concessionária criada com sucesso!"
        });
    } catch (err) {
        const status = err.statusCode || 500;
        res.status(status).json({ message: err.message });
    }
};

export const editBranch = async (req, res) => {
    try {
        await editBranchService(req.body);
        res.status(200).json({
            message: "Concessionária editada com sucesso!"
        });
    } catch (err) {
        const status = err.statusCode || 500;
        res.status(status).json({ message: err.message });
    }
};

export const removeBranch = async (req, res) => {
    const { id } = req.params;

    try {
        await removeBranchService(id);
        res.status(200).json({
            message: "Concessionária removida com sucesso!"
        });
    } catch (err) {
        const status = err.statusCode || 500;
        res.status(status).json({ message: err.message });
    }
};