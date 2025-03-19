import express, { Request, Response, NextFunction } from "express";
import { getOrders, getOrderById } from "../services/orderService";
import { exportOrdersToCSV } from "../services/csvService";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await fn(req, res, next);
        } catch (error) {
            next(error);
        }
    };

router.get("/orders", authMiddleware, asyncHandler(async (req: Request, res: Response) => {
    const minWorth = req.query.minWorth ? parseFloat(req.query.minWorth as string) : undefined;
    const maxWorth = req.query.maxWorth ? parseFloat(req.query.maxWorth as string) : undefined;
    const orders = await getOrders(minWorth, maxWorth);
    res.json(orders);
}));

router.get("/orders/:id", authMiddleware, asyncHandler(async (req: Request, res: Response) => {
    const order = await getOrderById(req.params.id);
    if (!order) {
        res.status(404).json({ message: "Order not found" });
        return;
    }
    res.json(order);
}));

router.get("/orders/export/csv", authMiddleware, asyncHandler(async (req: Request, res: Response) => {
    const csvData = await exportOrdersToCSV();
    res.header("Content-Type", "text/csv");
    res.attachment("orders.csv");
    res.send(csvData);
}));

export default router;
