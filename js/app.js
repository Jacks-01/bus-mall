'use strict';
console.log('app connected');


//global variables
let imageContainer = document.querySelector('section');
let resultButton = document.querySelector('div');
let image1 = document.querySelector('section img:first-child');
let image2 = document.querySelector('section img:nth-child(2)');
let image3 = document.querySelector('section img:nth-child(3)');
let chartResults = document.getElementById('chartResults');

// console.log({imageContainer, resultButton, image1, image2, image3});

let clicks = 0;
let maxClicksAllowed = 3;
// console.log('click tracker', {clicks, maxClicksAllowed});
const allImagesArray = [];

const Image = function(name, src, timesClicked, timesShown){
  this.name = name;
  this.src = src;
  if(timesClicked){
    this.timesClicked = timesClicked;
  } else {
    this.timesClicked = 0;
  }
  if(timesShown) {
    this.timesShown = timesShown;
  } else {
    this.timesShown = 0;
  }
  allImagesArray.push(this);


  //   As we create new instances of our image objects we can push those into array using the 'this' and the .push()
  // built in array method is created so we can use this outside of the function for each image.
  // Image.allImagesArray.push(this);

};

console.log(allImagesArray);




let savedImageString = localStorage.getItem('savedImageData');

if(savedImageString){
  //parse our string into an object
  let arrayOfNotImageObject = JSON.parse((savedImageString));
  console.log('if condition what is our type', arrayOfNotImageObject);
  //once we have object we are oging to run them through our constructor function so that they are image objects
  for(let j = 0; j < arrayOfNotImageObject.length; j++){
    new Image (
      arrayOfNotImageObject[j].name,
      arrayOfNotImageObject[j].src,
      arrayOfNotImageObject[j].timesClicked,
      arrayOfNotImageObject[j].timesShown
    );
  }
} else {
  new Image('bag','images/bag.jpg');
  new Image('banana','images/banana.jpg');
  new Image('bathroom','images/bathroom.jpg');
  new Image('boots','images/boots.jpg');
  new Image('breakfast','images/breakfast.jpg');
  new Image('bubblegum','images/bubblegum.jpg');
  new Image('chair','images/chair.jpg');
  new Image('cthulhu','images/cthulhu.jpg');
  new Image('dog duck','images/dog-duck.jpg');
  new Image('dragon','images/dragon.jpg');
  new Image('pen','images/pen.jpg');
  new Image('pet sweep','images/pet-sweep.jpg');
  new Image('scissors','images/scissors.jpg');
  new Image('shark','images/shark.jpg');
  new Image('sweep','images/sweep.png');
  new Image('tauntaun','images/tauntaun.jpg');
  new Image('unicorn','images/unicorn.jpg');
  new Image('water can','images/water-can.jpg');
  new Image('wine glass','images/wine-glass.jpg');
}


/**
 *
 * @returns random number for image selection
 */
function getRandomNumber(){
  return Math.floor(Math.random() * allImagesArray.length);
}


function renderImages(){

  let pic1 = getRandomNumber();
  let pic2 = getRandomNumber();
  let pic3 = getRandomNumber();


  if (pic1 === pic2 || pic1 === pic3){
    pic1 = getRandomNumber();
  }

  if (pic2 === pic3 || pic2 === pic1){
    pic2 = getRandomNumber();
  }
  if(pic3 === pic2 || pic3 === pic1){
    pic3 = getRandomNumber();
  }
  // while((pic1 === pic2 || pic3) && (pic2 === pic3)){

  image1.src = allImagesArray[pic1].src;
  image2.src = allImagesArray[pic2].src;
  image3.src = allImagesArray[pic3].src;


  image1.alt = allImagesArray[pic1].name;
  image2.alt = allImagesArray[pic2].name;
  image3.alt = allImagesArray[pic3].name;


  //track views
  allImagesArray[pic1].timesShown++;
  allImagesArray[pic2].timesShown++;
  allImagesArray[pic3].timesShown++;

  // }


}

function handleImageClick(event){
  console.log(event.target.alt);
  if(event.target === imageContainer){
    alert('please click on an image');
  }
  clicks++;
  let clickImage = event.target.alt;
  for(let i = 0; i < allImagesArray.length; i++){
    if(clickImage === allImagesArray[i].name){
      allImagesArray[i].timesClicked++;
      console.log(allImagesArray[i]);
      // let localClicks = localStorage.setItem(Image.allImagesArray[i].click,);
      break;
    }
  }//closes for loop
  //check to see if max clicks has been reached
  if (clicks === maxClicksAllowed){
    resultButton.addEventListener('click', renderResults);
    imageContainer.removeEventListener('click', handleImageClick);
    imageContainer.className = 'no-voting';
    localStorage.setItem('savedImageData', JSON.stringify(allImagesArray));
    console.log({allImagesArray});
  } else{
    renderImages();
  }
}//closes function

function renderResults(){
  let ul = document.querySelector('ul');
  for(let i = 0; i < allImagesArray.length; i++){
    let li = document.createElement('li');
    li.textContent = `${allImagesArray[i].name} had ${allImagesArray[i].timesShown} views and was clicked on ${allImagesArray[i].timesClicked} times.`;
    ul.appendChild(li);
  }

}
renderImages();

imageContainer.addEventListener('click', handleImageClick);

function createChart() {
  const imageNamesArray = [];
  const imageClicksArray = [];
  for (let i = 0; i < allImagesArray.length; i++) {
    const singleImageName = allImagesArray[i].name;
    imageNamesArray.push(singleImageName);
  }

  for (let i = 0; i < allImagesArray.length; i++){
    const singleImageClicks = allImagesArray[i].timesClicked;
    imageClicksArray.push(singleImageClicks);
  }
}





// add the chart 
const ctx = document.getElementById('imageChart').getContext('2d');
const imageChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: imageNamesArray,
    datasets: [{
      label: 'Image Clicks',
      backgroundColor: 'rgba(255, 99, 132, 0.8)',
      borderColor: 'rgba(255, 99, 132, 1)',
      data: imageClicksArray
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
});

