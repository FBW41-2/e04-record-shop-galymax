const { Schema, model, Decimal128 } = require('mongoose')
// record schema
const recordSchema = new Schema({
  artist: {
    type: String,
    required: true
  },
  album_name: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true,
    minLength: 4,
    maxLength: 4
  },
  genre: {
    type: String,
    enum: ["Hip Hop", "Rap"]
  },
  price: Decimal128,
  in_stock: Boolean
})
// record template
module.exports = model('Record', recordSchema)