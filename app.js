const loaderEl = document.querySelector('[data-loader]');
const productsContainerEL = document.querySelector('[data-products-wrapper]');
const products = [];

function createProduct(productsArray) {
    productsContainerEL.innerHTML = '';
    productsArray.forEach((product) => {
        const productWrapper = document.createElement('div');
        const title = document.createElement('h2');
        const descriptionProduct = document.createElement('p');
        const btnReadMore = document.createElement('button');
        const price = document.createElement('p');
        btnReadMore.textContent  = "Read More";
        title.textContent = product.title;
        title.className = 'products-container__product__title';
        descriptionProduct.className = 'products-container__product__description';
        descriptionProduct.textContent = product.description.substring(0, 100) + "...";
        price.textContent = product.price + " $";
        productWrapper.className = 'products-container__product';
        const imgProduct = document.createElement('img');
        imgProduct.className = 'products-container__product__img ';
        const firsImageUrl = product.images[0];
        imgProduct.src = firsImageUrl;
           imgProduct.onerror = function() {
                imgProduct.src = 'https://placehold.co/600x400';
            }
            btnReadMore.addEventListener('click', () => {
                if(descriptionProduct.classList.contains('expanded')){
                    descriptionProduct.textContent = product.description.substring(0, 100)+ "...";
                    btnReadMore.textContent = 'Read more';
                } else {
                    descriptionProduct.textContent = product.description;
                    btnReadMore.textContent = 'Read less';
                }
                descriptionProduct.classList.toggle('expanded');
            });
        productsContainerEL.append(productWrapper);
        productWrapper.append(imgProduct);
        productWrapper.append(title);
        productWrapper.append(descriptionProduct);
        productWrapper.append(btnReadMore);
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
