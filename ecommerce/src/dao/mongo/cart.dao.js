import { Cart } from "../../models/cart.model.js";
import Product from "../../models/product.model.js";


export default class MongoCartDao {
  async create(cartData) {
    try {
      const products = await Cart.create({ products: cartData });
      return products;
    } catch (error) {
      throw error;
    }
  }

  async getAll() {
    try {
      const products = await Cart.find();
      return products;
    } catch (error) {
      throw error;
    }
  }

  async getProductsByCartId(cartId) {
    try {
      const cart = await Cart.findById(cartId).populate("products.productId");
      const modifiedCart = cart.toObject();
      modifiedCart.products = modifiedCart.products.map((product) => {
        return {
          product: product.productId,
          quantity: product.quantity,
          _id: product._id,
        };
      });

      return modifiedCart;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updateProductsByCartId(cartId, products) {
    try {
      const cart = await Cart.findById(cartId);

      // Verifica si el carrito existe, si no existe retorno error y corto el flujo
      if (!cart) {
        return res.status(404).json({ error: "Cart not found" });
      }

      // Agrega al arreglo de productos del carrito con el nuevo arreglo recibido en la solicitud
      cart.products = products;

      // Guarda los cambios en el carrito actualizado en la base de datos
      const updatedCart = await cart.save();

      return updatedCart;
    } catch (error) {
      throw error;
    }
  }

  async addProductsByCartId(cid, arrayOfproducts) {
    try {
      //A partir de los datos, buscar por idx los productos para obtener su _id para generar el populate
      const arr = [];
      for (const item of arrayOfproducts) {
        const object = await Product.findById(item._id);
        arr.push({
          productId: object._id,
          quantity: item.quantity,
        });
      }

      // Actualizar con los nuevos datos
      const update = { $set: { products: arr } };

      const updateCart = await Cart.findOneAndUpdate(cid, update, {
        new: true,
      });
      return updateCart;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async addProductByCartId(pid, cid) {
    try {
      const product = await Product.findOne({ _id: pid });
      const cart = await Cart.findOne({ _id: cid });

      const productIndex = cart.products?.findIndex(
        (item) => item.productId.toString() == product._id.toString()
      );
      
      if (productIndex >= 0) {
        cart.products[productIndex].quantity += 1; // Si el producto ya existe en el carrito, aumentamos su cantidad.
      } else {
        cart.products.push({ productId: pid }); // Si el producto no existe en el carrito, lo añadimos con cantidad 1.
      }

      const cartUpdated = Cart.updateOne({ _id: cid}, cart);

      return cartUpdated;
    } catch (error) {
      console.log(error)
      throw error;
    }
  }

  async updateProductStockByCartId(filter, newProductInfo) {
    try {
      const editedProduct = await Cart.updateOne(filter, newProductInfo);
      return editedProduct;
    } catch (error) {
      throw error;
    }
  }

  async clearCart(id) {
    try {
      const result = await Cart.deleteOne(id);
      return result;
    } catch (error) {
      throw error;
    }
  }
}
