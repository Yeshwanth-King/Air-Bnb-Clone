import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
    place: { type: mongoose.Schema.Types.ObjectId, ref: "PlaceModal", require: true },
    user: { type: mongoose.Schema.Types.ObjectId, require: true },
    name: { type: String, require: true },
    phone: { type: Number, require: true },
    checkInDate: { type: String, require: true },
    checkOutDate: { type: String, require: true },
    guests: { type: Number, require: true },
    price: { type: Number, require: true },
})
const Booking = mongoose.models.Booking || mongoose.model("Booking", BookingSchema)

export default Booking;