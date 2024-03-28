song1 = "";
song2 = "";

leftWristX = 0;
rightWristX = 0;
leftWristY = 0;
rightWristY = 0;

function preload() {
song1 = loadSound("normal music.mp3");
song2 = loadSound("normal music 2.mp3");
}

function setup() {
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw() {
    image(video, 0, 0, 600, 500);
}

function modelLoaded() {
    console.log("Posenet is loaded");
}

function gotPoses(results) {
    if(results.length > 0) {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("left wrist is at X: " + leftWristX + ", Y: " + leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("right wrist is at X: " + rightWristX + ", Y: " + rightWristY);
    }
}