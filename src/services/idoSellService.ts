import axios from 'axios';
import {config} from '../config';

export const fetchOrdersFromIdoSell = async () => {
    try {
        let allOrders: any[] = [];
        let page = 0;
        const resultsLimit = 100;
        let totalResults = 0;

        do {
            const response = await axios.post(
                `${config.idoSellAPI.baseUrl}/orders/orders/search`,
                {
                    params: {
                        ordersBy: [{sortDirection: 'ASC'}],
                        resultsPage: page,
                        resultsLimit: resultsLimit,
                    },
                },
                {
                    headers: {
                        'X-API-KEY': config.idoSellAPI.apiKey,
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (!response.data.Results || response.data.Results.length === 0) {
                break;
            }

            allOrders.push(
                ...response.data.Results.map((order: any) => ({
                    orderID: order.orderId,
                    products: order.orderDetails.productsResults.map((p: any) => ({
                        productID: p.productId,
                        quantity: p.productQuantity,
                    })),
                    orderWorth: order.orderDetails.payments.orderBaseCurrency.orderProductsCost,
                }))
            );

            totalResults = response.data.resultsNumberAll;
            page++;

        } while (allOrders.length < totalResults);

        return allOrders;

    } catch (error: any) {
        console.error('Błąd API:', error?.response?.data || error?.message || error);
        throw new Error('Nie udało się pobrać zamówień z IdoSell.');
    }
};
