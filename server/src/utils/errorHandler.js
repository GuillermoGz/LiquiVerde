export const notFound = (req, res, next) => {
    const error = new Error(`No encontrado: ${req.originalUrl}`);
    res.status(404);
    next(error);
};

export const errorHandler = (err, req, res, _next) => {
    const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

    res.status(statusCode).json({
        message: err.message || 'Error interno del servidor'
    });
};
