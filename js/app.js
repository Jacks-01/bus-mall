'use strict';
console.log('app connected');


//global variables
let imageContainer = document.querySelector('section');
let resultButton = document.querySelector('section + div');
let image1 = document.querySelector('section img:first-child');
let image2 = document.querySelector('section img:nth-child(2)');
let image3 = document.querySelector('section img:nth-child(3)');
console.log({imageContainer, resultButton, image1, image2, image3});

let clicks = 0;
let maxClicksAllowed = 3;
console.log('click tracker', {clicks, maxClicksAllowed});
Image.allImagesArray = [];

/**
 * constructor function
 * @param {string} name name of the image
 * @param {image} src file path for the image
 */
function Image(name, src){
  this.name = name;
  this.src = src;
  this.view = 0;
  //tracking each image click
  this.click = 0;

  //   As we create new instances of our image objects we can push those into array using the 'this' and the .push()
  // built in array method is created so we can use this outside of the function for each image.
  Image.allImagesArray.push(this);

}

/**
 *
 * @returns random number for image selection
 */
function getRandomNumber(){
  return Math.floor(Math.random() * Image.allImagesArray.length);
}


function renderImages(){

  let image1 = getRandomNumber();
  let image2 = getRandomNumber();
  let image3 = getRandomNumber();


  if (image1 === image2 || image1 === image3){
    image1 = getRandomNumber();
  }

  if (image2 === image3 || image2 === image1){
    image2 = getRandomNumber();
  }
  if(image3 === image2 || image3 === image1){
    image3 = getRandomNumber();
  }
  // while((image1 === image2 || image3) && (image2 === image3)){

  // image1.src = 
  console.log(Image.allImagesArray[image1].src);
  // image2.src = Image.allImagesArray[image2].src;
  // image3.src = Image.allImagesArray[image3].src;

  // image3.alt = Image.allImagesArray[image3].name;
  // image3.alt = Image.allImagesArray[image3].name;
  // image3.alt = Image.allImagesArray[image3].name;


  //track views
  Image.allImagesArray[image1].views++;
  Image.allImagesArray[image2].views++;
  Image.allImagesArray[image3].views++;
  

  // }


}

function handleImageClick(event){
  if(event.target === imageContainer){
    alert('please click on an image');
  }
  clicks++;
  let clickImage = event.target.alt;
  for(let i = 0; i <Image.allImagesArray.length; i++){
    if(clickImage === Image.allImagesArray[i].name){
      Image.allImagesArray[i].click++;
      break;
    }
    //check to see if max clicks has been reached
    if(clicks === maxClicksAllowed){
      imageContainer.removeEventListener('click', handleImageClick);
      resultButton.addEventListener('click', renderResults());
      imageContainer.className = 'no voting';

    }
    else{
      renderImages();
    }

  }

}

function renderResults(){
  let ul = document.querySelector('ul');
  for(let i = 0; Image.allImagesArray.length; i++){
    let li = document.createElement('li');
    li.textContent = `${Image.allImagesArray[i].name} had ${Image.allImagesArray[i].views} views and was clicked on ${Image.allImagesArray[i].click} times.`;
    ul.appendChild(li);
  }
}

new Image('bag','images/bag.jpg');
new Image('banana','images/banana.jpg');
new Image('bathroom','images/bathroom.jpg');
new Image('boots','images/boots.jpg');
new Image('breakfast','images/breakfast.jpg');
new Image('bubblegum','images/bubblegum.jpg');
new Image('chair','images/chair.jpg');
new Image('cthulu','images/cthulu.jpg');
new Image('dog duck','images/dog-duck.jpg');
new Image('dragon','images/dragon.jpg');
new Image('pen','images/pen.jpg');
new Image('pet sweep','images/pet-sweep.jpg');
new Image('scissors','images/scissors.jpg');
new Image('shark','images/shark.jpg');
new Image('sweep','images/sweep.jpg');
new Image('tauntaun','images/tauntaun.jpg');
new Image('unicorn','images/unicorn.jpg');
new Image('water can','images/water-can.jpg');
new Image('wine glass','images/wine-glass.jpg');


renderImages();


imageContainer.addEventListener('click', handleImageClick);
