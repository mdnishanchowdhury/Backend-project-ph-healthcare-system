import express, { Application, NextFunction, request, Request, response, Response } from "express";
import { IndexRoutes } from "./app/routes";
import { AuthRoutes } from "./app/modules/auth/auth.route";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler";
import { notFount } from "./app/middleware/notFound";
import cors from "cors";
import qs from "qs";
import cron from "node-cron";
import cookieParser from "cookie-parser";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./app/lib/auth";
import path from "node:path";
import { envVars } from "./app/config/env";
import { PaymentController } from "./app/modules/payment/payment.controller";
import { AppointmentService } from "./app/modules/appointment/appointment.service";

const app: Application = express();
app.set("query parser", (str: string) => qs.parse(str));

app.set("view engine", "ejs");
app.set("views", path.resolve(process.cwd(), `src/app/templates`))

app.post("/webhook", express.raw({ type: "application/json" }), PaymentController.handleStripeWebhookEvent)

app.use(cors({
    origin: [envVars.FRONTEND_URL, envVars.BETTER_AUTH_URL, "http://localhost:3000", "http://localhost:5000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(cookieParser());

cron.schedule("*/25 * * * *", async () => {
    try {
        console.log("Running cron job to cancel unpaid appointments...");
        await AppointmentService.cancelUnpaidAppointments();
    } catch (error: any) {
        console.error("Error occurred while canceling unpaid appointments:", error.message);
    }
})

app.use("/api/auth", toNodeHandler(auth))

app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1", IndexRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript + Express!');
});

app.use(globalErrorHandler);
app.use(notFount)

export default app;