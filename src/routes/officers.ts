import { Router } from 'express';
import Officer from '../database/schemas/officer.schema';
import validation from '../util/validation';
import helpers from '../util/helpers';
// @ts-ignore
import Multer from 'multer';
import { FirebaseFile } from '../util/classes';
import { page_limits } from '../config.json';
import Incident from '../database/schemas/incident.schema';

const officers = Router();

const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 8 * (1024 * 1024)
    }
});

officers.get('/list', async (_ , res) => {
    try {
        const officer = await Officer
            .find({})
            .select('fullname badge')
            .lean()
            .exec();

        res.json({ data: officer });
    } catch (error) {
        helpers.sendError(res, error);
    }
});

officers.get('/', async ({ query }, res) => {
    try {
        const limit = page_limits.officers;
        const page = query.page || 1;

        const officers = await Officer
            .find({})
            .limit(limit)
            .skip((parseInt(page.toString())-1) * limit)
            .sort('fullname')
            .populate('latest_incident')
            .lean()
            .exec();

        const officerCount = await Officer.countDocuments();

        res.json({
            data: officers,
            pages: Math.ceil(officerCount / limit)
        });
    } catch (error) {
        helpers.sendError(res, error);
    }
});

// @ts-ignore
officers.post('/', multer.single('picture'), async ({ body, file }, res) => {
    try {
        const error = validation.newOfficer(body);

        if (helpers.sendErrorIf(res, error, 400)) return;

        const picture = await helpers.uploadFile(new FirebaseFile(
            body.fullname,
            file.mimetype,
            file.buffer,
            'images/officers',
            file.originalname
        ));

        const officer = new Officer({ ...body, picture });
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

officers.get('/:id/incidents', async ({ params, query }, res) => {
    try {
        const limit = page_limits.officer_incidents;
        const page = query.page || 1;
        const { id } = params;

        const officer: any = await Officer
            .findById(id)
            .populate({
                path: 'incidents',
                options: {
                    sort: '-created_at',
                },
                skip: (parseInt(page.toString()) - 1) * limit,
                limit,
            })
            .select('incidents')
            .lean()
            .exec();

        const incidentCount = await Incident.countDocuments({ officer: id });

        res.json({
            data: officer.incidents,
            pages: Math.ceil(incidentCount / limit),
            incidentCount
        });
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