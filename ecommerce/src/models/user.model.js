import mongoose from "mongoose";

const userCollection = "user";

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  cart: {
    type:[
        {
            cartId:{    
                type: mongoose.Schema.Types.ObjectId,
                ref: 'cart' // referenciamos el modelo con el que popularemos.
            }
        }
    ],
    default:[] // Si no se proporciona ningún valor para "carts", se establece como un array vacío por defecto.
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  githubId: Number,
  githubUsername: String,
});

userSchema.pre('find', function(){
  this.populate('cart.cartId');
});

export const Users = mongoose.model(userCollection, userSchema);
