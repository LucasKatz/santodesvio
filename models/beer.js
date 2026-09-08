import mongoose from 'mongoose';

const BeerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    style: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    ibu: { type: Number },
    abv: { type: Number },
    srm: { type: Number },
  },
  {
    timestamps: true,
  }
);

// El tercer parámetro 'SantoDesvio' le dice a Mongoose la colección exacta a consultar
export default mongoose.models.Beer || mongoose.model('Beer', BeerSchema, 'SantoDesvio');