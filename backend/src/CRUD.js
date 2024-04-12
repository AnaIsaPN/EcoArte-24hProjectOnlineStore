const { ObjectId } = require("mongodb")
const { getMongoCollection } = require("./mongodb")

async function GetAllProducts() {
    const collection = await getMongoCollection("FabioArte", "produtos");
    const res = await collection.find();
    return res.toArray();
}

async function GetProduct(prodId) {
    const collection = await getMongoCollection("FabioArte", "produtos");
    const res = await collection.findOne({ _id: new ObjectId(prodId) });
    return res;
}

async function ProductPurchased(prodId) {
    const collection = await getMongoCollection("FabioArte", "produtos");
    const res = await collection.deleteOne({ _id: new ObjectId(prodId) })
    return res;
}

module.exports = { GetAllProducts, GetProduct, ProductPurchased }