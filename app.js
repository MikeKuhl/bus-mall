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

const ImageObject = function (name, filePath) {
  this.name = name;
  this.clicks = 0;
  this.timesShown = 0;
  this.filePath = filePath;
  ImageObject.all.push(this);
};

ImageObject.all = [];

ImageObject.prototype.render = function (id) {
  const imgElem = document.getElementById(id);
  imgElem.src = this.filePath;
  imgElem.alt = this.name;
};

function renderImages() {
  //TODO: Select Randomly
  const safeIndex = getRandomIndices();

  const leftIndex = safeIndex[0];
  const middleIndex = safeIndex[1];
  const rightIndex = safeIndex[2];

  const leftImageObj = ImageObject.all[leftIndex];
  const centerImageObj = ImageObject.all[middleIndex];
  const rightImageObj = ImageObject.all[rightIndex];

  leftImageObj.render("left_products_img");
  centerImageObj.render("center_products_img");
  rightImageObj.render("right_products_img");
}
//TODO: Randomly select

function getRandomIndices() {
  // shuffle array
  //grab first randomly
  return [0, 1, 2];
}
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
new ImageObject("bag", "./assets/images/bag.jpg");
new ImageObject("banana", "./assets/images/banana.jpg");
new ImageObject("bubblegum", "./assets/images/bubblegum.jpg");
new ImageObject("pen", "./assets/images/pen.jpg");

leftProductOnPage = ImageObject.all[1];
rightProductOnPage = ImageObject.all[4];

renderImages();
