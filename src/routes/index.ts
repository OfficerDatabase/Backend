import { Router } from 'express';

import incidents from './incidents';
import officers from './officers';
import Incident from '../database/schemas/incident.schema';
import Officer from '../database/schemas/officer.schema';
import helpers from '../util/helpers';

const router = Router();

router.use(({ body }, res, next) => {

    if (!body) {
        return res.status(400).json({ error: 'No body found on request' });
    }

    next();
});

router.get('/stats', async ({ query }, res) => {
    try {
        const incidents = await Incident.estimatedDocumentCount().exec();
        const officers = await Officer.estimatedDocumentCount().exec();
        const lastIncident = await Incident.findOne({})
            .select('created_at')
            .sort('-created_at')
            .exec();

        res.json({
            data: [
                {
                    name: 'incidents made by people.',
                    value: incidents,
                    href: '/incidents'
                },
                {
                    name: 'officers reported in the website.',
                    value: officers,
                    href: '/officers'
                },
                {
                    name: 'a new incident was created.',
                    value: lastIncident,
                    href: `/incidents/${lastIncident._id}`
                }
            ]
        });
    } catch (error) {
        helpers.sendError(res, error);
    }
});

router.use('/incidents', incidents);
router.use('/officers', officers);

export default router;