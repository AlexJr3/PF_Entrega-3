import { faker } from "@faker-js/faker";

const { commerce, image, database, string, internet, person, phone, datatype } =
  faker;

export const generateProducts = () => {
  return {
    id: database.mongodbObjectId(),
    title: commerce.productName(),
    description: commerce.productDescription(),
    thumbnails: image.url(),
    code: string.alphanumeric(10),
    stock: parseInt(string.numeric(3)),
    status: datatype.boolean(),
    category: commerce.department(),
  };
};

export const generateUser = () => {
  const prodNumber = Math.ceil(Math.random() * 10);
  let products = [];
  for (let i = 0; i < prodNumber; i++) {
    let product = generateProducts();
    products.push(product);
  }
  return {
    id: database.mongodbObjectId(),
    firstName: person.firstName(),
    lastName: person.lastName(),
    email: internet.email(),
    password: internet.password(),
    role: datatype.boolean() ? "user" : "admin",
    age: parseInt(string.numeric(2)),
    cart: products,
  };
};
