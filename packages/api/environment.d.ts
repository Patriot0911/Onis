export declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DATABASE_URL: string;
            SECRET: string;
            JWT_EXPIRES: string;
            FRONTEND_URL: string;
        }
    };
};
