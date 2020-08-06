import { Router } from 'express';
import Incident from '../database/schemas/incident.schema';
import validation from '../util/validation';
import helpers from '../util/helpers';
import User from '../database/schemas/user.schema';
import { page_limits } from '../config.json';
import Officer from '../database/schemas/officer.schema';

const incidents = Router();

incidents.get('/', async ({ query }, res) => {
    try {
        const page = query.page || 1;
        const limit = page_limits.incidents;

        const incidents = await Incident
            .find({})
            .limit(limit)
            .skip((parseInt(page.toString()) - 1) * limit)
            .sort('-created_at')
            .lean()
            .exec();

        const incidentCount = await Incident.countDocuments();

        res.json({
            data: incidents,
            pages: Math.ceil(incidentCount / limit)
        });
    } catch (error) {
        helpers.sendError(res, error);
    }
});

incidents.post('/', async ({ body }, res) => {
    try {
        const error = validation.newIncident(body);

        if (helpers.sendErrorIf(res, error, 400)) return;

        const createdBy = new User(body.created_by);

        const incident = new Incident({
            created_by: createdBy._id,
            content: body.content,
            title: body.title,
            officer: body.officer,
            location: body.location
        });

        await incident.save();
        await createdBy.save();

        await Officer.findByIdAndUpdate(body.officer, {
            $push: {
                incidents: incident._id
            }
        }).exec();

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
            .populate('created_by')
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
        const incident: any = await Incident
            .findById(id)
            .populate('officer')
            .populate('created_by')
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