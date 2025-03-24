import express from "express";
import mongoose from "mongoose";
import orderRoutes from "./routes/orderRoutes";
import { config } from "./config";
import { fetchOrdersFromIdoSell } from "./services/idoSellService";
import { saveOrders } from "./services/orderService";
import cron from "node-cron";

const app = express();
app.use(express.json());
app.use("/api", orderRoutes);

mongoose.connect(config.db.uri)
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("MongoDB connection error:", error));

cron.schedule("0 * * * *", async () => {
    try {
        const orders = await fetchOrdersFromIdoSell();
        await saveOrders(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
    }
});

(async () => {
    try {
        const orders = await fetchOrdersFromIdoSell();
        await saveOrders(orders);
    } catch (error) {
        console.error("Error fetching orders at startup:", error);
    }
})();

app.listen(config.server.port, () => console.log(`Server running on port ${config.server.port}`));
