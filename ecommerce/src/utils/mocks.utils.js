
import { Faker, es } from '@faker-js/faker';

//seteamos el idioma de los datos
const faker = new Faker({ locale: [es] }) 

// Exportamos una función que genera un objeto de productos
export const generateProduct = () => {
    return {
        title: faker.commerce.productName(), // Nombre del producto
        description: faker.commerce.productAdjective(), // Descripción del producto
        price: faker.commerce.price(), // Precio del producto
        //thumbnail: faker.image.imageUrl(), // Imagen en miniatura del producto
        code: faker.string.alphanumeric(10), // Código alfanumérico del producto
        stock: +faker.string.numeric(1), // Stock del producto
        category: faker.commerce.department(), // Categoría del producto
        _id: faker.database.mongodbObjectId(), // ID de MongoDB del producto
        // image: faker.image.image(),
    }
}