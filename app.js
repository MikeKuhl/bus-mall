/* As a user, I would like to display three unique products by chance so that the viewers can pick a favorite.

Create a constructor function that creates an object associated with each product, and has the following properties:
Name of the product
File path of image
Times the image has been shown */
"use strict";

let allProducts = document.getElementById("all_products");
let leftProductsImg = document.getElementById("left_products_img");
let centerProductsImg = document.getElementById("center_products_img");
let rightProductsImg = document.getElementById("right_products_img");

let totalClicks = 0;

let leftProductOnPage = null;
let rightProductOnPage = null;

const ProductImage = function (name, filePath) {
  this.name = name;
  this.clicks = 0;
  this.timesShown = 0;
  this.filePath = filePath;
  ProductImage.allImages.push(this);
};

ProductImage.allImages = [];

// function renderImage(productImage, id) {
//   const imgElem = document.getElementById(id);
//   imgElem.src = ProductImage.filePath;
//   imgElem.alt = ProductImage.name;
// }
const renderNewProducts = function (leftIndex, rightIndex) {
  leftProductsImg.src = ProductImage.allImages[leftIndex].filePath;
  // centerProductsImg.src = ProductImage.allImages[leftIndex + 1].filePath;
  rightProductsImg.src = ProductImage.allImages[rightIndex].filePath;
  console.log(leftProductsImg.filePath, rightProductsImg.filePath);
};

const pickNewProducts = function () {
  const leftIndex = Math.floor(Math.random() * ProductImage.allImages.length);
  let rightIndex;
  do {
    rightIndex = Math.floor(Math.random() * ProductImage.allImages.length);
  } while (rightIndex === leftIndex);
  console.log(
    ProductImage.allImages[leftIndex],
    ProductImage.allImages[rightIndex]
  );

  leftProductOnPage = ProductImage.allImages[leftIndex];
  rightProductOnPage = ProductImage.allImages[rightIndex];

  renderNewProducts(leftIndex, rightIndex);
};

// Attach an event listener to the section of the HTML page where the images are going to be displayed.

// Once the users ‘clicks’ a product, generate three new products for the user to pick from.
const handleUserClicks = function (e) {
  console.log("alive");
  if (totalClicks > 3) {
    const itemsClicked = e.target;
    const id = itemsClicked.id;

    if (id === "left_product_img" || id === " right_product_img") {
      if (id === "left_product_img") {
        leftProductOnPage.clicks += 1;
      }
      if (id === "right_product_img") {
        rightProductOnPage.clicks += 1;
      }
      leftProductOnPage.timesShown += 1;
      rightProductOnPage.timesShown += 1;
      // As a user, I would like to track the selections made by viewers so that I can determine which products to keep for the catalog.
      // In the constructor function define a property to hold the number of times a product has been clicked.

      // After every selection by the viewer, update the newly added property to reflect if it was clicked.
      pickNewProducts();
    }
  }
  // increment amount of clicks
  totalClicks++;
  //when they reach total max clicks, remove the clicky function
  if (totalClicks === 10) {
    allProducts.removeEventListener("click", handleUserClicks);
    console.log("stopped");
    //TODO: display the clicks to the page
  }
};

allProducts.addEventListener("click", handleUserClicks);

// Products
new ProductImage("bag", "./assets/images/bag.jpg");
new ProductImage("banana", "./assets/images/banana.jpg");
new ProductImage("bubblegum", "./assets/images/bubblegum.jpg");
new ProductImage("pen", "./assets/images/pen.jpg");

leftProductOnPage = ProductImage.allImages[1];
rightProductOnPage = ProductImage.allImages[4];

pickNewProducts();
