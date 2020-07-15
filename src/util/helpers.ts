export default {
    sendErrorIf(res, error?: string | Object, status?: number) {
        if (error) {
            this.sendError(res, error, status);
            return true;
        }

        return false;
    },
    sendError(res, error: string | Object = 'Internal error', status = 500) {
        res.status(status).json({ error });
    },
    authenticated(req, res, next) {
        return this.sendError(res, 'Unauthenticated', 401);
    }
};