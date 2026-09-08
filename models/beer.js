import mongoose from 'mongoose';

const BeerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    style: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    
  },
  {
    timestamps: true, // Crea automáticamente createdAt y updatedAt
  }
);

// Previene la recreación del modelo si ya fue compilado
export default mongoose.models.Beer || mongoose.model('Beer', BeerSchema);