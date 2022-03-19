const mongoose = require('mongoose')
const connectDB = async () => {
    mongoose
        .connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log("Database Connected");
        })
        .catch((err) => {
            console.error(err);
        });
};
module.exports = connectDB;

