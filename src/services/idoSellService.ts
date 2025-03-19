import axios from "axios";
import { config } from "../config";

export const fetchOrdersFromIdoSell = async () => {
    try {
        const response = await axios.get(`${config.idoSellAPI.baseUrl}/orders/orders?limit=`, {
            headers: {
                "X-API-KEY": config.idoSellAPI.apiKey,
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });

        if (!response.data.Results || response.data.Results.length === 0) {
            throw new Error("Brak zamówień w odpowiedzi API");
        }

        return response.data.Results.map((order: any) => ({
            orderID: order.orderId,
            products: order.orderDetails.productsResults.map((p: any) => ({
                productID: p.productId,
                quantity: p.productQuantity,
            })),
            orderWorth: order.orderDetails.payments.orderBaseCurrency.orderProductsCost,
        }));
    } catch (error) {
        throw new Error("Nie udało się pobrać zamówień z IdoSell.");
    }
};
