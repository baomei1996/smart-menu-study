import { Orders } from "./collections";
import { getCurrentDate } from "../../utils/formatDate";

const queries = {
    async orders(_, args, context, info) {
        try {
            const result = await Orders.find({
                orderDate: { $gte: new Date() },
            });
            return result;
        } catch (err) {
            throw `orders query Error: ${err}`;
        }
    },
};

const mutations = {
    async addOrder(
        _,
        { orderPriceSum, orderCount, orderItems },
        { user },
        info
    ) {
        const newDate = getCurrentDate();

        let orderValues = {
            orderDate: newDate,
            orderPriceSum,
            orderCount,
            orderItems,
            orderState: false,
        };

        try {
            const result = await Orders.insert(orderValues);
            return result;
        } catch (err) {
            throw `Order Add Error: ${err}`;
        }
    },
    async checkOrder(_, { _id, orderState }, { user }, info) {
        const changeOrderState = {
            orderState: orderState,
        };

        try {
            await Orders.update({ _id: _id }, { $set: changeOrderState });
        } catch (err) {
            throw `CheckOrder Update Error: ${err}`;
        }
    },
};

const resolvers = {
    Query: queries,
    Mutation: mutations,
};

export default resolvers;
