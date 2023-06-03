export const generateProductsError = (product) => {
  retunr`Tiene que agregar todos lo campos del producto:
    lista requerida para agregarlo:
    * Title : tiene que ser un String, se recibio: ${product.title}
    * Description : tiene que ser un String, se recibio: ${product.description}
    * Pirce] : tiene que ser un Number, se recibio: ${product.price}
    * Code : tiene que ser un String, se recibio: ${product.code}
    * Sttock : tiene que ser un Number, se recibio: ${product.stock}
    * Category : tiene que ser un String, se recibio: ${product.category}
    `;
};
