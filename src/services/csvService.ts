import { Order } from "../models/Order";
import { Parser } from "json2csv";

export const exportOrdersToCSV = async (): Promise<string> => {
    const orders = await Order.find();
    const formattedOrders = orders.map(order => ({
        orderID: order.orderID,
        orderWorth: order.orderWorth.toFixed(2),
        products: order.products.map(p => `ID: ${p.productID} (Qty: ${p.quantity})`).join("; ")
    }));

    const json2csvParser = new Parser({ fields: ["orderID", "orderWorth", "products"] });
    return json2csvParser.parse(formattedOrders);
};
