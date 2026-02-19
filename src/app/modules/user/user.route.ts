import { Router } from "express";
import { UserController } from "./user.controller";
import { createDoctorZodSchema } from "./user.validation";
import { validateRequst } from "../../middleware/validationRequsts";


const router = Router()

router.post("/create-doctor", validateRequst(createDoctorZodSchema), UserController.createDoctor)

// router.post("/create-admin", UserController.createDoctor)
// router.post("/create-superadmin", UserController.createDoctor)

export const UserRoutes = router;