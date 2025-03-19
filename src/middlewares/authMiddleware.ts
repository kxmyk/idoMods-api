import { Request, Response, NextFunction } from "express";
import basicAuth from "basic-auth";
import { config } from "../config";

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const credentials = basicAuth(req);
    const isAuthorized =
        credentials &&
        credentials.name === config.server.basicAuth.username &&
        credentials.pass === config.server.basicAuth.password;

    if (!isAuthorized) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    next();
};
