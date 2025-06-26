const productsGrid = document.querySelector(".products-grid");
const categoriesContainer = document.querySelector(".products-categories");

// Validacija DOM elemenata
if (!productsGrid || !categoriesContainer) {
  console.error("Required DOM elements not found");
  throw new Error('Required DOM elements not found')
}

const getProductsFromApi = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/products');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error getting products from API:", error);
  }
}

const getCategoriesFromApi = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/categories');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error getting categories from API:", error);
  }
}

const renderCategoriesWithFilterLogic = (categories, products) => {
  categories.forEach(category => {
    const categoryLabel = document.createElement("a");
    categoryLabel.textContent = category;
    categoryLabel.classList.add("products-category");

    categoryLabel.addEventListener("click", (e) => {
      e.preventDefault();
      setActiveCategory(category);
      if(category === 'All Categories') {
        renderProducts(products);
      } else {
        const filteredProducts = products.filter(product => product.type === category);
        renderProducts(filteredProducts);
      }
    });

    categoriesContainer.appendChild(categoryLabel);
  });
}

const setActiveCategory = (providedCategory) => {
  const activeCategory = document.querySelectorAll('.products-category');
  activeCategory.forEach(category => {
    if (category.textContent === providedCategory) {
      category.classList.add('active');
    } else {
      category.classList.remove('active');
    }
  });
}

const renderProducts = (products) => {
  productsGrid.innerHTML = ``;
  products.forEach(product => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");
    productCard.innerHTML = `
    <div class="product-image-container">
      <img src="${product.image || './images/product1.png'}" alt="${product.name}" />
        <div class="product-hover">
          <span>${product.lager || 0} left</span>
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
  productsGrid.appendChild(productCard);
  });
}

// Inicijalizacija aplikacije
const initializeApp = async () => {
  try {
    const products = await getProductsFromApi();
    const categories = await getCategoriesFromApi();
    const fullCategories = ['All Categories', ...categories];
    renderCategoriesWithFilterLogic(fullCategories, products);
    setActiveCategory("All Categories");
    renderProducts(products);
  } catch (error) {
    console.error("Error initializing app:", error);
  }
};

// Pokretanje aplikacije
initializeApp();
