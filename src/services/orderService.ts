import { Order } from "../models/Order";

export const saveOrders = async (orders: any[]) => {
    try {
        for (const order of orders) {
            await Order.findOneAndUpdate(
                { orderID: order.orderID },
                order,
                { upsert: true, new: true }
            );
        }
    } catch (error) {
        throw new Error("Błąd zapisu zamówień w bazie.");
    }
};

export const getOrders = async (minWorth?: number, maxWorth?: number) => {
    const filter: any = {};
    if (minWorth !== undefined) filter.orderWorth = { $gte: minWorth };
    if (maxWorth !== undefined) filter.orderWorth = { ...filter.orderWorth, $lte: maxWorth };

    return Order.find(filter);
};

export const getOrderById = async (orderID: string) => {
    return Order.findOne({ orderID });
};
