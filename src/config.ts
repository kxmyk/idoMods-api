import dotenv from "dotenv";
dotenv.config();

export const config = {
    idoSellAPI: {
        baseUrl: process.env.IDOSELL_API_BASE_URL || "",
        apiKey: process.env.IDOSELL_API_KEY || ""
    },
    server: {
        port: process.env.PORT || 3000,
        basicAuth: {
            username: process.env.BASIC_AUTH_USER || "",
            password: process.env.BASIC_AUTH_PASS || ""
        }
    },
    db: {
        uri: process.env.MONGO_URI || ""
    }
};
