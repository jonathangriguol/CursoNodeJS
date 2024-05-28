export default class NewProductDto {
    constructor(newProductInfo) {
        this.code = newProductInfo.code,
        this.title = newProductInfo.title,
        this.description = newProductInfo.description,
        this.price = newProductInfo.price,
        this.thumbnails = newProductInfo.thumbnails,
        this.stock = newProductInfo.stock,
        this.category = newProductInfo.category,
        this.status = newProductInfo.status
    }
}