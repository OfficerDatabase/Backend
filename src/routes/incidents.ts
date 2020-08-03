import { Router } from 'express';
import Incident from '../database/schemas/incident.schema';
import validation from '../util/validation';
import helpers from '../util/helpers';

const incidents = Router();

const limit = 20;

incidents.get('/', async ({ query }, res) => {
    try {
        const page = query.page || 0;

        const incidents = await Incident
            .find({})
            .skip(parseInt(page.toString()) * limit)
            .limit(limit)
            .sort('-created_at')
            .lean()
            .exec();

        res.json({ data: incidents });
    } catch (error) {
        helpers.sendError(res, error);
    }
});

incidents.post('/', async ({ body }, res) => {
    try {
        const error = validation.newIncident(body);

        if (helpers.sendErrorIf(res, error, 400)) return;

        const incident = new Incident(body);
        await incident.save();

        res.json({ _id: incident._id });
    } catch (error) {
        helpers.sendError(res, error);
    }
});

incidents.get('/latest', async ({ query }, res) => {
    try {
        const incidents = await Incident
            .find({})
            .select('officer created_by created_at')
            .populate('officer')
            .populate('')
            .sort('-created_at')
            .limit(8)
            .lean()
            .exec();

        res.json({ data: incidents });
    } catch (error) {
        helpers.sendError(res, error);
    }
});

incidents.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const incident = await Incident
            .findById(id)
            .populate('officer')
            .lean()
            .exec();

        res.json({ data: incident });
    } catch (error) {
        helpers.sendError(res, error);
    }
});

incidents.delete('/:id', helpers.authenticated, async (req, res) => {
    try {
        const { id } = req.params;
        await Incident.findByIdAndDelete(id);
        res.sendStatus(204);
    } catch (error) {
        helpers.sendError(res, error);
    }
});

export default incidents;