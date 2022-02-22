//DOM reference
let myContainer = document.getElementById('container');
let firstImage = document.getElementById('first');
let secondImage = document.getElementById('second');
let thirdImage = document.getElementById('third');
let resultsBtn = document.getElementById('show-results-btn');
let showResults = document.getElementById('display-results-list');


//Global Variables
let allProducts = [];
let votesAllowed = 0;

//Constructor

function Product(name, fileExtension = 'jpg') {

  this.name = name;
  this.views = 0;
  this.clicks = 0;
  this.src = `img/${name}.${fileExtension}`;

  allProducts.push(this);
}

new Product('bag', 'jpg');
new Product('banana', 'jpg');
new Product('bathroom', 'jpg');
new Product('boots', 'jpg');
new Product('breakfast', 'jpg');
new Product('bubblegum', 'jpg');
new Product('chair', 'jpg');
new Product('cthulhu', 'jpg');
new Product('dog-duck', 'jpg');
new Product('dragon', 'jpg');
new Product('pen', 'jpg');
new Product('pet-sweep', 'jpg');
new Product('scissors', 'jpg');
new Product('shark', 'jpg');
new Product('sweep', 'png');
new Product('tauntaun', 'jpg');
new Product('unicorn', 'jpg');
new Product('water-can', 'jpg');
new Product('wine-glass', 'jpg');

console.log(allProducts);

//random image helper function

function getRandomIndex() {
  return Math.floor(Math.random() * allProducts.length);
}


//Random Image generator function

function renderImage() {

  let firstRandomImage = getRandomIndex();
  let secondRandomImage = getRandomIndex();
  let thirdRandomImage = getRandomIndex();


  while (firstRandomImage === secondRandomImage || secondRandomImage === thirdRandomImage || thirdRandomImage === firstRandomImage) {

    firstRandomImage = getRandomIndex();
    secondRandomImage = getRandomIndex();
    thirdRandomImage = getRandomIndex();
  }

  firstImage.src = allProducts[firstRandomImage].src;
  firstImage.alt = allProducts[firstRandomImage].name;
  allProducts[firstRandomImage].views++;

  secondImage.src = allProducts[secondRandomImage].src;
  secondImage.alt = allProducts[secondRandomImage].name;
  allProducts[secondRandomImage].views++;

  thirdImage.src = allProducts[thirdRandomImage].src;
  thirdImage.alt = allProducts[thirdRandomImage].name;
  allProducts[thirdRandomImage].views++;

}

renderImage();

console.log(renderImage);

//Event Handler

function handleClick(event) {
  votesAllowed++;

  let imgClicked = event.target.alt;

  for (let i = 0; i < allProducts.length; i++) {
    if (imgClicked === allProducts[i].name) {
      allProducts[i].clicks++;
    }
  }
  renderImage();

  if (votesAllowed === 25) {
    myContainer.removeEventListener('click', handleClick);
  }
}

function handleShowResults(event) { //eslint-disable-line
  if (votesAllowed === 25) {
    for (let i = 0; i < allProducts.length; i++) {
      let li = document.createElement('li');
      li.textContent = `${allProducts[i].name} was viewed ${allProducts[i].views} times and was voted for ${allProducts[i].clicks} times.`;
      showResults.appendChild(li);
    }
  }
}
resultsBtn.addEventListener('click', handleShowResults);
myContainer.addEventListener('click', handleClick);

