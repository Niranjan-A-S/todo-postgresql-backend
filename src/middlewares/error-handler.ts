import { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
    const statusCode = res.statusCode || 500;

    res
        .status(statusCode)
        .json({
            message: err.message || 'Something went wrong!',
            stack: process.env.NODE_ENV === 'production' ? null : err.stack,
        })
}