export const setProductsByCategorie = (Jsoncategories) => {
    const transformedCategories = {};
    Jsoncategories.forEach((categorie) => {
      transformedCategories[categorie.rubro] = categorie.items.map(
        (product) => {
          return { ...product, rubro: categorie.rubro };
        }
      );
    });
    return transformedCategories;
}

export const setAllProducts = (products) => {
    const allProducts = [];
    for (let prop in products) {
      allProducts.push(products[prop]);
    }
    return allProducts.flat();
}

export const setSearchedProduct = (product) => {
    return product
}