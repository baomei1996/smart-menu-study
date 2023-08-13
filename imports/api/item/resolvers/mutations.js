import { Categories, Items } from "../collections";
import { getCurrentDate } from "../../../utils/formatDate";

const mutations = {
    async addCategory(_, { categoryName }) {
        const categoryValue = {
            categoryName,
        };
        try {
            const result = await Categories.insert(categoryValue);
            return result;
        } catch (err) {
            throw `addCategory mutation Error: ${err}`;
        }
    },
    async updateCategory(_, { _id, categoryName }) {
        const categoryValue = {
            categoryName,
        };
        try {
            const result = await Categories.update(
                { _id },
                { $set: categoryValue }
            );
            return result;
        } catch (err) {
            throw `updateCategory mutation Error: ${err}`;
        }
    },
    async deleteCategory(_, { _id }) {
        try {
            const result = await Categories.remove({ _id });
            return result;
        } catch (err) {
            throw `deleteCategory mutation Error: ${err}`;
        }
    },
    async addItem(_, { itemName, itemPrice, itemImage, itemCategoryId }) {
        const newDate = getCurrentDate();

        const itemValues = {
            itemName,
            itemPrice,
            itemImage,
            itemCategoryId,
            createdAt: newDate,
        };

        try {
            const result = await Items.insert(itemValues);
            itemValues._id = result;

            return itemValues;
        } catch (err) {
            throw `addItem mutation Error: ${err}`;
        }
    },
    async updateItem(
        _,
        { _id, itemName, itemPrice, itemImage, itemCategoryId }
    ) {
        const itemValues = {
            itemName,
            itemPrice,
            itemImage,
            itemCategoryId,
        };

        try {
            const result = await Items.update({ _id }, { $set: itemValues });
            itemValues._id = _id;

            return itemValues;
        } catch (err) {
            throw `updateItem mutation Error: ${err}`;
        }
    },
    async deleteItem(_, { _id }) {
        try {
            await Items.remove({ _id });
            return _id;
        } catch (err) {
            throw `deleteItem mutation Error: ${err}`;
        }
    },
    async uploadFile(_, {}) {},
};

export default mutations;
