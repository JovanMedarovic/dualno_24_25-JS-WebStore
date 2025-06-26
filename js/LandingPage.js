const productsGrid = document.querySelectorAll('.products-grid')[0];

const loadProducts = async () => {
  const url = `https://jsonplaceholder.typicode.com/products`;
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    productsGrid.innerHTML=``;
    data.forEach(product => {
      const card = document.createElement('div');
      card.classList = ['product-card']; 
      card.innerHTML = `
        <div class="product-image-container">
          <img src="./images/product1.png" alt="Product 1" />
            <div class="product-hover">
              <span>${product.lager} left</span>
              <button>
                <span class="cart-icon">
                  <img src="./images/cart.svg" alt="cart" />
                </span>
                Add To Cart
              </button>
            </div>
          </div>
          <div class="product-info">
            <div class="product-name">${product.name}</div>
            <div class="product-type">${product.type}</div>
            <div class="product-price">$${product.price}</div>
          </div>
      `;
      productsGrid.appendChild(card);
    })
  } catch (err) {
    productsGrid.innerHTML = `<p style="color: red;">${err}</p>`
  }
}

loadProducts();