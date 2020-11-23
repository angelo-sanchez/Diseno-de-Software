import * as dotenv from 'dotenv';

dotenv.config({ path: `${__dirname}/../../.env` });

export const config = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT || 3000,
    JWT_SECRET: process.env.JWT_SECRET,
    BASE_URL: process.env.BASE_URL,
    MONGO_DB: {
        CONN_STRING: process.env.MONGO_DB_URI?.toString() || "mongodb+srv://Guichi:hola1234@cluster0.clby5.gcp.mongodb.net/apiBD?retryWrites=true&w=majority",
        LOG: process.env.MONGO_DB_LOG
    },
    CORS: {
        WHITELIST: process.env.CORS_WHITELIST
                    ? process.env.CORS_WHITELIST.split(',')
                    : []
    },
    JIRA: {
        PROTOCOL: process.env.PROTOCOL ? process.env.PROTOCOL : 'https',
        HOST: process.env.HOST,
        USERNAME: process.env.USERNAME,
        PASSWORD: process.env.PASSWORD,
        APIVERSION: process.env.API_VERSION ? process.env.API_VERSION : '2',
        STRICTSSL: process.env.STRICTSSL ? process.env.STRICTSSL : true
    }
}