import { NextFunction, Request, Response, Router } from "express";
import { UserController } from "./user.controller";
import { createDoctorZodSchema } from "./user.validation";


const router = Router()

router.post("/create-doctor", (req: Request, res: Response, next: NextFunction) => {
    const parsedResult = createDoctorZodSchema.safeParse(req.body);

    if (!parsedResult.success) {
        next(parsedResult.error)
    }
    req.body = parsedResult.data;
    next();
}, UserController.createDoctor)

// router.post("/create-admin", UserController.createDoctor)
// router.post("/create-superadmin", UserController.createDoctor)

export const UserRoutes = router;