let video;
let label = "Loading";
let classifier;
let r,p,s;
let size = 500;
let f = size/2;
let modelURL = 'https://teachablemachine.withgoogle.com/models/ePikIUXR/';

function preload() {
  classifier = ml5.imageClassifier(modelURL + 'model.json');
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  video = createCapture(VIDEO);
  video.hide();
  r = loadImage("Rock.png");
  p = loadImage("Paper.png");
  s = loadImage("Scissors.png");
  classifyVideo();
}

function classifyVideo() {
  classifier.classify(video, gotResults);
}

function draw() {
  background(255);

  // Draw the video
  image(video, 100, 0,-100,100);

  textSize(32);
  textAlign(CENTER, CENTER);
  fill(35,40,45);
  // text(label, width / 2, height - 50);

  // Pick an emoji, the "default" is train
  // let emoji = "B";
  if (label == "Rock") {
    image(p,width/2-f,height/2-f,size,size);
    text("Paper", width / 2, height - 50);
  } else if (label == "Paper") {
    image(s,width/2-f,height/2-f,size,size);
    text("Scissors", width / 2, height - 50);
  } else if (label == "Scissors") {
    image(r,width/2-f,height/2-f,size,size);
    text("Rock", width / 2, height - 50);
  } else {
    // text("Align with the camera", width / 2, height - 50);
  }
  // Draw the emoji
  textSize(256);
  // text(emoji, width / 2, height / 2);
}

function gotResults(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  label = results[0].label;
  classifyVideo();
}
