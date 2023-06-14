import generateProducts from "../../test/product.test.js";

export async function handleGetProducts(req, res, next) {
  try {
    let products = await generateProducts();
    res.json(products);
  } catch (error) {}
}
