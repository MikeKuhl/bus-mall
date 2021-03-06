"use strict";

let currentRound = 0;

//product constructor
function Product(name, path) {
  this.name = name;
  this.path = path;
  this.clicks = 0;
  this.shown = 0;
  Product.all.push(this);
}

Product.all = [];

let completeArr = Product.all;

Product.left = null;
Product.center = null;
Product.right = null;

Product.prototype.render = function (side) {
  const imgElem = document.getElementById(side + "-img");
  imgElem.src = this.path;
  imgElem.alt = this.name;

  const nameElem = document.getElementById(side + "-name");
  nameElem.textContent = this.name;

  this.shown += 1;
};

//Fisher Yates shuffle https://bost.ocks.org/mike/shuffle/
function getRandomProduct(arr) {
  let arrLength = arr.length,
    placeHolder,
    randIndex;
  while (arrLength) {
    randIndex = Math.floor(Math.random() * arrLength--);

    placeHolder = arr[arrLength];
    arr[arrLength] = arr[randIndex];
    arr[randIndex] = placeHolder;
  }
  return arr;
}
//sets the random products to initially be displayed
function pickProducts() {
  let shuffle = getRandomProduct(completeArr);

  Product.left = shuffle[0];
  Product.right = shuffle[1];
  Product.center = shuffle[2];
}

//renders the random products to the page
function renderProducts() {
  Product.left.render("left");
  Product.right.render("right");
  Product.center.render("center");
}

//checks for local storage
function loadJSON() {
  let myProductsJSON = localStorage.getItem("products");

  if (myProductsJSON) {
    getData();
  } else {
    makeProducts();
  }
}

//parses data from json
function getData(json) {
  const product = JSON.parse(json);
  for (let i = 0; i < product.length; i++) {
    let dataProduct = new Product(product[i].name, product[i].path);
    dataProduct.clicks = product.clicks;
    dataProduct.shown = product.shown;
  }
}
//makes products using constructor function
function makeProducts() {
  new Product("bag", "/assets/images/bag.jpg");
  new Product("banana", "/assets/images/banana.jpg");
  new Product("bubblegum", "/assets/images/bubblegum.jpg");
  new Product("pen", "/assets/images/pen.jpg");
  new Product("bathroom", "/assets/images/bathroom.jpg");
  new Product("boots", "/assets/images/boots.jpg");
  new Product("breakfast", "/assets/images/breakfast.jpg");
  new Product("chair", "/assets/images/chair.jpg");
  new Product("cthulhu", "/assets/images/cthulhu.jpg");
  new Product("dog-duck", "/assets/images/dog-duck.jpg");
  new Product("dragon", "/assets/images/dragon.jpg");
  new Product("pen", "/assets/images/pen.jpg");
  new Product("pet-sweep", "/assets/images/pet-sweep.jpg");
  new Product("scissors", "/assets/images/scissors.jpg");
  new Product("shark", "/assets/images/shark.jpg");
  new Product("sweep", "/assets/images/sweep.png");
  new Product("tauntaun", "/assets/images//tauntaun.jpg");
  new Product("unicorn", "/assets/images/unicorn.jpg");
  new Product("water-can", "/assets/images/water-can.jpg");
  new Product("wine-glass", "/assets/images/wine-glass.jpg");
}

function attachEventListner() {
  const container = document.getElementById("product-container");
  container.addEventListener("click", handleClick);
}

function removeEventListner() {
  const container = document.getElementById("product-container");
  container.removeEventListener("click", handleClick);
}
//controls click event and adds clicks to images and rounds
function handleClick(e) {
  if (e.target.id === "left-img") {
    Product.left.clicks += 1;
  } else if (e.target.id === "right-img") {
    Product.right.clicks += 1;
  } else if (e.target.id === "center-img") {
    Product.center.clicks += 1;
  }
  currentRound += 1;

  if (currentRound === 25) {
    document.getElementById("results").hidden = false;
    removeEventListner();
    localStorage.setItem("products", JSON.stringify(Product.all));
    renderChart();
    renderList();
  } else {
    pickProducts();
    renderProducts();
  }
}

function renderList() {
  const ulElem = document.getElementById("results-list");

  for (let i = 0; i < Product.all.length; i++) {
    const product = Product.all[i];
    const liElem = document.createElement("li");
    ulElem.appendChild(liElem);
    liElem.textContent = `${product.name}: Was selected ${product.clicks} times`;
  }
}

//controls chart render
function renderChart() {
  const productNamesArray = [];
  const productClicksArray = [];

  for (let i = 0; i < Product.all.length; i++) {
    const product = Product.all[i];

    const productName = product.name;
    productNamesArray.push(productName);

    const productClicks = product.clicks;
    productClicksArray.push(productClicks);
  }

  const ctx = document.getElementById("results-chart").getContext("2d");
  const productChart = new Chart(ctx, {
    // The type of chart we want to create
    type: "bar",

    // The data for our dataset
    data: {
      labels: productNamesArray,
      datasets: [
        {
          label: "Product Votes",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: productClicksArray,
        },
      ],
    },

    // Configuration options go here
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
}

function start() {
  attachEventListner();
  makeProducts();
  pickProducts();
  renderProducts();
  loadJSON();
}

start();
