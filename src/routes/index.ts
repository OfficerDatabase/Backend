import { Router } from 'express';

import incidents from './incidents';
import officers from './officers';
import Incident from '../database/schemas/incident.schema';
import Officer from '../database/schemas/officer.schema';
import helpers from '../util/helpers';

const router = Router();

router.use((req, res, next) => {
    const body = req.body;
    if (!body) {
        return res.status(400).json({ error: 'No body found on request' });
    }

    next();
});

router.get('/stats', async ({ query }, res) => {
    try {
        const incidents = await Incident.estimatedDocumentCount();
        const officers = await Officer.estimatedDocumentCount();

        res.json({
            data: [
                {
                    name: 'Incidents',
                    value: incidents
                },
                {
                    name: 'Officers',
                    value: officers
                },
                {
                    name: 'Placeholder',
                    value: 0
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