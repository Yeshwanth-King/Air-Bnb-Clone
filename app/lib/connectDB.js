import mongoose from "mongoose";

const connectDB = async () => {
    mongoose.connect(process.env.MONGO_URL_LOCAL).then(() => {
        console.log("Connected Succesfully")
    }).catch((err) => {
        console.log(err);
    })
}

export default connectDB