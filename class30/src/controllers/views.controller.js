

export const purchaseView = async (req, res) => {

    let purchaseComplete = []  //array para los productos procesados correctamente.
    let purchaseError = [] //array para los productos que no pudieron procesarse por falta de stock.
    let precioTotal = 0
    const userId = req.user._id; 

    try {
        const user = await userService.getUserById(userId);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        const cartId = user.cart[0]._id  //cart[0] porque es el primer elemento dentro del array.
        const cart = await cartService.getCartById(cartId)
        if (!cart) {
            throw new Error('Carrito no encontrado');
        }

        const productsInCart = cart.products

        for (let product of productsInCart ) {
            const idproduct = product.productID
            const quantity = product.quantity
            const productInDB = await productService.getProductById(idproduct)
    
            if(quantity > productInDB.stock){  //verificamos que la cantidad comprada no sea mayor a nuestro stock
                purchaseError.push(product);  //agregamos el producto al array de productos que pudieron procesarse para la compra.

            }
    
            if(quantity <= productInDB.stock){
                let productUpdate = productInDB;
                const quantityUpdate = productInDB.stock - quantity;
                productUpdate.stock = quantityUpdate; //actualizamos el stock del producto
                const update = await productService.updateProduct(idproduct, productUpdate) //Actualizamos el stock en nuestra base de datos luego de la compra
                purchaseComplete.push(product); //agreamos el producto al array para proceder con la compra.
                const monto = productInDB.price * quantity
                precioTotal = precioTotal + monto

            }
        }

        //Eliminamos los productos que se procesaron correctamente del carrito, e insertamos el array de productos no procesados:
        const notPurchasedProductsInCart = await cartService.insertArrayOfProducts(cartId,purchaseError);

        // Solo creamos el ticket si hay productos en purchaseComplete
        if (purchaseComplete.length > 0) {
            //definimos los datos que necesitamos para el ticket:
            const ticketData = {
                amount: precioTotal,
                purchaser: req.user.email
            }
            //creamos el ticket en la base de datos:
            const ticket = await ticketService.addTicket(ticketData);

            //MODIFICACIONES PARA QUE RENDERIZE LA VISTA:
            //agregamos informacion adicional, los productos que se procesaron correctamente y los que no:
            const purchaseData = {
                ticketId: ticket._id,
                amount: ticket.amount,
                purchase_datetime: ticket.purchase_datetime,
                purchaser:ticket.purchaser,
                productosProcesados: purchaseComplete,
                productosNoProcesados: purchaseError,
            }
            // Renderizamos la vista 'purchase' con los datos de la compra:
            res.status(200).render('purchase', { status: 'success', payload: purchaseData , cartId});
        } else {
            // Si no hay productos en purchaseComplete, renderizamos la vista 'error' con los productos en purchaseError
            res.status(200).send('errorPurchase', { status: 'success', message: 'No se procesaron productos, por falta de stock.', productosNoProcesados: purchaseError });
        }
        
    } catch (error) {

        res.status(400).send({ error: error.message });
    }
}