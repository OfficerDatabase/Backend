import { Router } from 'express';
import Officer from '../database/schemas/officer.schema';
import validation from '../util/validation';
import helpers from '../util/helpers';

const officers = Router();

const limit = 20;

officers.get('/', async ({ query }, res) => {
    try {
        const page = query.page || 0;

        const officer = await Officer
            .find({})
            .limit(limit)
            .skip(parseInt(page.toString()) * limit)
            .lean()
            .exec();

        res.json({ data: officer });
    } catch (error) {
        helpers.sendError(res, error);
    }
});

officers.post('/', async ({ body }, res) => {
    try {
        const error = validation.newOfficer(body);

        if (helpers.sendErrorIf(res, error, 400)) return;

        const officer = new Officer(body);
        await officer.save();

        res.json({ _id: officer._id });
    } catch (error) {
        helpers.sendError(res, error);
    }
});

officers.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const officer = await Officer
            .findById(id)
            .lean()
            .exec();

        res.json({ data: officer });
    } catch (error) {
        helpers.sendError(res, error);
    }
});

officers.get('/:id/incidents', async (req, res) => {
    try {
        const { id } = req.params;
        const incidents = await Officer
            .findById(id)
            .populate({
                path: 'incidents',
                sort: '-created_at'
            })
            .select('incidents')
            .lean()
            .exec();

        res.json({ data: incidents });
    } catch (error) {
        helpers.sendError(res, error);
    }
});

officers.delete('/:id', helpers.authenticated, async (req, res) => {
    try {
        const { id } = req.params;
        await Officer.findByIdAndDelete(id);
        res.sendStatus(204);
    } catch (error) {
        helpers.sendError(res, error);
    }
});

export default officers;