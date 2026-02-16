import express, { Application, Request, Response } from "express";
import { IndexRoutes } from "./app/routes";
import { AuthRoutes } from "./app/modules/auth/auth.route";

const app: Application = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1", IndexRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript + Express!');
});


export default app;