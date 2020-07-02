import { Router } from 'express';

import incidents from "./incidents";
import officers from "./officers";

const router = Router();

router.use((req, res, next) => {
    const body = req.body
    if (!body) {
        return res.status(400).json({error: 'No body found on request'})
    }

    next()
});

router.use('/incidents', incidents);
router.use('/officers', officers);

export default router;