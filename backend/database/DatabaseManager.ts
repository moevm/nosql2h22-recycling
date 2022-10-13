import mongoose from "mongoose";

const databaseConfig = {
    DATABASE_HOST: process.env.DATABASE_HOST || "localhost",
    DATABASE_NAME: process.env.DATABASE_NAME || "test",
    DATABASE_PORT: process.env.DATABASE_PORT || "27017",
};

const { DATABASE_HOST, DATABASE_NAME, DATABASE_PORT } = databaseConfig;

export default class DatabaseManager {
    private readonly mongoURL: string;

    public constructor() {
        this.mongoURL = `mongodb://${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`;
        this.initConnection()
            .then((res) => {
                console.log(`Connected to database ${DATABASE_NAME} on port ${DATABASE_PORT}`);
            })
            .catch((err) => {
                if (err instanceof Error) console.error(err.message);
            });
    }

    private async initConnection(): Promise<any> {
        await mongoose.connect(this.mongoURL);
    }
}
