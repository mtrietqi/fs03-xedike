const mongoose = require('mongoose')

const CarSchema= mongoose.Schema({
    carID:  mongoose.Schema.Types.ObjectId,
    brand: String,
    model: String,
    manufacturingYear: Number,
    licensePlate : Number,
    numberOfSeats : Number,
    carImage: String
})

const Car = mongoose.model('Car',CarSchema);

module.export={
    CarSchema, Car
}