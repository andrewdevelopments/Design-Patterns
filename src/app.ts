import express, { Request, Response, urlencoded } from "express";
import dotenv from "dotenv";
import { Database } from "./patterns/Singleton";
dotenv.config();

const app = express();

app.use(urlencoded({extended: true}));

app.use("/singleton", (req: Request, res: Response) => {
    const test = Database.getInstance();
    test.setCounter(1);
    test.setCounter(3);
    test.setCounter(4);

    test.getCounter();
});

app.listen(process.env.PORT, () => {
    console.log(`port ready on http://localhost:${process.env.PORT}`)
});