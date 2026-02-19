import z from "zod";
import { NextFunction, Request, Response, Router } from "express";


export const validateRequst = (zodSchema: z.ZodObject) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const parsedResult = zodSchema.safeParse(req.body);

        if (!parsedResult.success) {
            next(parsedResult.error)
        }
        req.body = parsedResult.data;
        next();
    }
}
