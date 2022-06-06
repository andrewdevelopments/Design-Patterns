import { Db, MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();


/**
 * Singleton, an object that can only be instantiated once.
 * Resource is shared by the entire application
 * Caching systems, databases, logging
 */

export class Database {

    private static instance: Database;
    private connectionString: string;

    private static client: MongoClient;
    private static db: Db | null = null;

    public logs: any[];

    private constructor() {
        this.connectionString = process.env.MONGO_CONNECTION_STRING!;

        this.logs = [];

        Database.client = new MongoClient(this.connectionString);
        Database.db = Database.client.db("prisma");
    }

    static getInstance(): Database {

        if(!Database.instance) {
            Database.instance = new Database();
        }

        return Database.instance;

    }

    async connect() {
        await Database.client.connect();
    }

    setCounter(log: number) {
        this.logs.push(log);
    }

    getCounter() {
        console.log(this.logs);
    }

}

// const conn = new Database()
Database.getInstance();