import mongoose from "mongoose";

const connectDB = async () => {
    mongoose.connect(process.env.MONGO_URL_LOCAL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 20000 // 20 seconds
    }).then(() => {
        console.log("Connected Succesfully")
    }).catch((err) => {
        console.log(err);
    })
}

export default connectDB