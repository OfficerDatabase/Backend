import { Router } from 'express';
import Incident from "../database/schemas/incident.schema";
import validation from "../validation";
import helpers from "../helpers";

const incidents = Router();

const limit = 20;

incidents.get('/', async ({ query }, res) => {
    try {
        const page = query.page || 0

        const incidents = await Incident
            .find({})
            .limit(limit)
            .skip(parseInt(page.toString()) * limit)
            .lean();

        res.json({ data: incidents });
    } catch (error) {
        helpers.sendError(res, error);
    }
})

incidents.post('/', async ({ body }, res) => {
    try {
        const error = validation.newIncident(body);

        if (helpers.sendErrorIf(res, error)) return;

        const incident = new Incident(body);
        await incident.save();

        res.json({ _id: incident._id });
    } catch (error) {
        helpers.sendError(res, error);
    }
})

incidents.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const incident = await Incident.findById(id)
            .populate('officer')
            .lean();

        res.json({ data: incident });
    } catch (error) {
        helpers.sendError(res, error);
    }
})

incidents.delete('/:id', helpers.authenticated, async (req, res) => {
    try {
        const { id } = req.params
        await Incident.findByIdAndDelete(id)
        res.sendStatus(204);
    } catch (error) {
        helpers.sendError(res, error);
    }
})

export default incidents;