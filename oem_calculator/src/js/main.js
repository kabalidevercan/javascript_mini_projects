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
    },
    updateProduct: function (name, price) {
      let product = null;
      data.products.forEach(function (prd) {
        if (prd.id == data.selectedProduct.id) {
          prd.name = name;
          prd.price = parseFloat(price);
          product = prd;
        }
      });
      return product;
    },
    deleteProduct: function (product) {
      data.products.forEach(function (prd, index) {
        if (prd.id == product.id) {
          data.products.splice(index, 1);
        }
      });
    }
  };
})();

//UI Controller

const UIController = (function (products) {
  const Selectors = {
    productList: '#item-list',
    productListItems: '.tr',
    addButton: '.addBtn',
    updateButton: '.updateBtn',
    deleteButton: '.deleteBtn',
    cancelButton: '.cancelBtn',
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
            class="w-full px-2 py-1 items-center justify-between flex border-2 border-gray-50 tr"
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
      class="w-full px-2 py-1 items-center justify-between flex border-2 border-gray-50 tr"
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
    clearWarnings: function () {
      const items = document.querySelectorAll(Selectors.productListItems);
      items.forEach(function (item) {
        if (item.classList.contains('bg-red-400')) {
          item.classList.remove('bg-red-400');
        }
      });
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
      UIController.clearWarnings();
      UIController.clearInputs();
      document.querySelector(Selectors.addButton).style.display = 'inline';
      document.querySelector(Selectors.updateButton).style.display = 'none';
      document.querySelector(Selectors.deleteButton).style.display = 'none';
      document.querySelector(Selectors.cancelButton).style.display = 'none';
    },
    editState: function (tr) {
      const parent = tr.parentNode;
      for (let i = 0; i < parent.children.length; i++) {
        parent.children[i].classList.remove('bg-red-400');
      }

      tr.classList.add('bg-red-400');
      document.querySelector(Selectors.addButton).style.display = 'none';
      document.querySelector(Selectors.updateButton).style.display = 'inline';
      document.querySelector(Selectors.deleteButton).style.display = 'inline';
      document.querySelector(Selectors.cancelButton).style.display = 'inline';
    },
    updateProduct: function (prd) {
      let updatedItem = null;

      let items = document.querySelectorAll(Selectors.productListItems);

      items.forEach(function (item) {
        if (item.classList.contains('bg-red-400')) {
          item.children[1].textContent = prd.name;
          item.children[2].textContent = prd.price + ' $';
          updatedItem = item;
        }
      });

      return updatedItem;
    },
    deleteProduct: function () {
      let items = document.querySelectorAll(Selectors.productListItems);
      items.forEach(function (item) {
        if (item.classList.contains('bg-red-400')) {
          item.remove();
        }
      });
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

          UICtrl.editState(e.target.parentNode);
        }
        e.preventDefault();
      });

    //edit product submit
    document
      .querySelector(UISelectors.updateButton)
      .addEventListener('click', function (e) {
        const productName = document.querySelector(
          UISelectors.productName
        ).value;
        const productPrice = document.querySelector(
          UISelectors.productPrice
        ).value;
        if (productName !== '' && productPrice !== '') {
          //update Product
          const updatedProduct = ProductCtrl.updateProduct(
            productName,
            productPrice
          );

          //updateUI
          let item = UICtrl.updateProduct(updatedProduct);

          //get total
          const total = ProductCtrl.getTotal();

          //show total
          UICtrl.showTotal(total);

          UICtrl.addingState();
        }
        e.preventDefault();
      });

    //cancel button click
    document
      .querySelector(UISelectors.cancelButton)
      .addEventListener('click', function (e) {
        UICtrl.addingState();
        UICtrl.clearWarnings();
        e.preventDefault();
      });

    //delete button

    document
      .querySelector(UISelectors.deleteButton)
      .addEventListener('click', function (e) {
        //get selected product
        const selectedProduct = ProductCtrl.getCurrentProduct();
        //delete product
        ProductCtrl.deleteProduct(selectedProduct);

        //deleteUI
        UICtrl.deleteProduct();

        const total = ProductCtrl.getTotal();

        if (total == 0) {
          UICtrl.hideCard();
        }

        UICtrl.showTotal(total);

        UICtrl.addingState();

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
