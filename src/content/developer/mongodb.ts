export const mongodb: string[] = [
  "db.users.find({ age: { $gte: 18 } }, { name: 1, email: 1 }).sort({ name: 1 }).limit(10);",
  "db.orders.aggregate([\n    { $match: { status: 'shipped' } },\n    { $group: { _id: '$customer_id', total: { $sum: '$amount' } } },\n    { $sort: { total: -1 } }\n]);",
  "db.orders.aggregate([\n    { $lookup: { from: 'users', localField: 'user_id', foreignField: '_id', as: 'user' } },\n    { $unwind: '$user' }\n]);",
  "db.users.createIndex({ email: 1 }, { unique: true });\ndb.users.createIndex({ location: '2dsphere' });",
  "db.inventory.updateMany(\n    { quantity: { $lt: 10 } },\n    { $set: { restock: true }, $inc: { restock_count: 1 } }\n);",
];
