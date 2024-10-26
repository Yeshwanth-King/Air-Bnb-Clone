import mongoose from "mongoose";

const PlaceSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: String,
    address: String,
    photos: [String],
    description: String,
    perks: [String],
    extraInfo: String,
    checkIn: Number,
    checkOut: Number,
    maxGuests: Number
})

const PlaceModal = mongoose.models.PlaceModal || mongoose.model("PlaceModal", PlaceSchema)

export default PlaceModal;