import { Router } from "express";
import { SpecialtyRoutes } from "../modules/specialty/specialty.route";
import { UserRoutes } from "../modules/user/user.route";

const router = Router();

router.use("/specialties", SpecialtyRoutes)
router.use("/users", UserRoutes)

export const IndexRoutes = router;