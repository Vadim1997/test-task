const loaderEl = document.querySelector('[data-loader]');
const productsContainerEL = document.querySelector('[data-products-wrapper]');
const products = [];

function createProduct(productsArray) {
    productsContainerEL.innerHTML = '';
    productsArray.forEach((product) => {
        const productWrapper = document.createElement('div');
        const title = document.createElement('h2');
        const descriptionProduct = document.createElement('p');
        const price = document.createElement('p');
        title.textContent = product.title;
        title.className = 'products-container__product__title';
        descriptionProduct.className = 'products-container__product__description';
        descriptionProduct.textContent = product.description;
        price.textContent = product.price;
        productWrapper.className = 'products-container__product';
        product.images.forEach(imageUrl => {
            const imgElement = document.createElement('img');
            imgElement.src = imageUrl;
            imgElement.onerror = function() {
                imgElement.src = 'https://placehold.co/600x400';
            }
            productWrapper.appendChild(imgElement);
          });
        productsContainerEL.append(productWrapper);
        productWrapper.append(title);
        productWrapper.append(descriptionProduct);
        productWrapper.append(price);
    });
} 

window.addEventListener('load', () => {
    setTimeout(() => {
        async function getProducts() {
            const response = await fetch('https://api.escuelajs.co/api/v1/products');
            const productsResponse = await response.json();
            Array.prototype.push.apply(products, productsResponse);
            return products;
        }

        getProducts()
            .then(() => {
                createProduct(products);
            });
        loaderEl.className = 'after-load';
    }, 3000);
});