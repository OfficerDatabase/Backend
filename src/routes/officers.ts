import { Router } from 'express';
import Officer from "../database/schemas/officer.schema";
import validation from "../validation";
import helpers from "../helpers";

const officers = Router();

officers.post('/', async ({ body }, res) => {
    try {
        const error = validation.newOfficer(body);

        if (helpers.sendErrorIf(res, error)) return;

        const officer = new Officer(body);
        await officer.save();

        res.json({ _id: officer._id });
    } catch (error) {
        helpers.sendError(res, error);
    }
})

officers.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const officer = await Officer.findById(id)
            .lean();

        res.json(officer);
    } catch (error) {
        helpers.sendError(res, error);
    }
})

officers.delete('/:id', helpers.authenticated, async (req, res) => {
    try {
        const { id } = req.params
        await Officer.findByIdAndDelete(id)
        res.sendStatus(204);
    } catch (error) {
        helpers.sendError(res, error);
    }
})

export default officers;