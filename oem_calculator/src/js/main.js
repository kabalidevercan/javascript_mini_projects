//storage Controller
const StorageController = (function () {})();

//Product Controller
const ProductController = (function () {
  const Product = function (id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  };

  const data = {
    products: [],

    selectedProduct: null,
    totalPrice: 0
  };

  //public
  return {
    getProducts: function () {
      return data.products;
    },
    getData: function () {
      return data;
    },
    addProduct: function (name, price) {
      let id;
      if (data.products.length > 0) {
        id = data.products[data.products.length - 1].id + 1;
      } else {
        id = 0;
      }

      const newProduct = new Product(id, name, parseFloat(price));
      data.products.push(newProduct);

      return newProduct;
    },
    getTotal: function () {
      let total = 0;
      data.products.forEach(function (item) {
        total += item.price;
      });
      data.totalPrice = total;
      return data.totalPrice;
    },
    getProductById: function (id) {
      let product = null;
      data.products.forEach(function (prd) {
        if (prd.id == id) {
          product = prd;
        }
      });

      return product;
    },
    setCurrentPorudct: function (product) {
      data.selectedProduct = product;
    },
    getCurrentProduct: function () {
      return data.selectedProduct;
    }
  };
})();

//UI Controller

const UIController = (function (products) {
  const Selectors = {
    productList: '#item-list',
    addButton: '.addBtn',
    updateButton: '.updateBtn',
    deleteButton: 'deleteBtn',
    cancelButton: 'cancelBtn',
    productName: '#productName',
    productPrice: '#productPrice',
    totalTl: '#total-tl',
    totalDolar: '#total-dolar'
  };

  return {
    createProductList: function (products) {
      let html = ``;
      products.forEach(prd => {
        html += `
        <div
            class="w-full px-2 py-1 items-center justify-between flex border-2 border-gray-50"
          >
            <i>${prd.id}</i>
            <i>${prd.name}</i>
            <i> ${prd.price}$</i>
            <td class="text-right  ">
                <i class="far fa-edit edit-product bg-yellow-400 hover:bg-yellow-200 
                px-2 py-1 rounded border-2 border-gray-700 "></i>
            </td>
          </div>`;
      });

      document.querySelector(Selectors.productList).innerHTML = html;
    },
    getSelectors: function () {
      return Selectors;
    },
    addProduct: function (prd) {
      document.querySelector(Selectors.productList).style.display = 'block';
      var item = `<div
      class="w-full px-2 py-1 items-center justify-between flex border-2 border-gray-50"
    >
      <i>${prd.id}</i>
      <i>${prd.name}</i>
      <i> ${prd.price}$</i>
      <td class="text-right bg-yellow-400">
          <i class="far fa-edit edit-product bg-yellow-400  hover:bg-yellow-200 
          px-2 py-1 rounded border-2 border-gray-700"></i>
      </td>
    </div>`;
      document.querySelector(Selectors.productList).innerHTML += item;
    },
    clearInputs: function () {
      document.querySelector(Selectors.productName).value = '';
      document.querySelector(Selectors.productPrice).value = '';
    },
    hideCard: function () {
      document.querySelector(Selectors.productList).style.display = 'none';
    },
    showTotal: function (total) {
      document.querySelector(Selectors.totalDolar).textContent = total;

      document.querySelector(Selectors.totalTl).textContent = total * 5;
    },
    addProductToForm: function () {
      const selectedProduct = ProductController.getCurrentProduct();
      document.querySelector(Selectors.productName).value =
        selectedProduct.name;
      document.querySelector(Selectors.productPrice).value =
        selectedProduct.price;
    },
    addingState: function () {
      UIController.clearInputs();
      document.querySelector(Selectors.addButton).style.display = 'block';
      document.querySelector(Selectors.updateButton).style.display = 'none';
      document.querySelector(Selectors.deleteButton).style.display = 'none';
      document.querySelector(Selectors.cancelButton).style.display = 'none';
    },
    editState: function () {
      document.querySelector(Selectors.addButton).style.display = 'none';
      document.querySelector(Selectors.updateButton).style.display = 'inline';
      document.querySelector(Selectors.deleteButton).style.display = 'inline';
      document.querySelector(Selectors.cancelButton).style.display = 'inline';
    }
  };
})();

//Main Controller

const MainController = (function (ProductCtrl, UICtrl) {
  const UISelectors = UICtrl.getSelectors();
  //load Event Listeners

  const loadEventListeners = function () {
    // add product event
    document
      .querySelector(UISelectors.addButton)
      .addEventListener('click', function (e) {
        const productName = document.querySelector(
          UISelectors.productName
        ).value;
        const productPrice = document.querySelector(
          UISelectors.productPrice
        ).value;

        if (productName !== '' && productPrice !== '') {
          // Add Product
          const newProduct = ProductCtrl.addProduct(productName, productPrice);
          //ad item to list
          UICtrl.addProduct(newProduct);
          //get total
          const total = ProductCtrl.getTotal();

          //Show Total
          UICtrl.showTotal(total);
          //clear inputs
          UICtrl.clearInputs();
        }
        e.preventDefault();
      });
    document
      .querySelector(UISelectors.productList)
      .addEventListener('click', function (e) {
        if (e.target.classList.contains('edit-product')) {
          const id =
            e.target.previousElementSibling.previousElementSibling
              .previousElementSibling.textContent;
          //get selected product
          const product = ProductCtrl.getProductById(id);
          //set current product
          ProductCtrl.setCurrentPorudct(product);
          //add product to UI
          UICtrl.addProductToForm();

          UICtrl.editState();
        }
        e.preventDefault();
      });
  };

  return {
    init: function () {
      UICtrl.addingState();
      const products = ProductCtrl.getProducts();
      if (products.length > 0) {
        UICtrl.createProductList(products);
      } else {
        UICtrl.hideCard();
      }
      //Load event Listeners
      loadEventListeners();
    }
  };
})(ProductController, UIController);

MainController.init();
