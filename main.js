song1 = "";
song2 = "";
song1Status = "";
song2Status = "";

leftWristX = 0;
rightWristX = 0;
leftWristY = 0;
rightWristY = 0;
leftWristConfidence = 0;
rightWristConfidence = 0;

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
    fill("red");
    stroke("red");
    song1Status = song1.isPlaying();
    song2Status = song2.isPlaying();
    if(leftWristConfidence > 0.2) {
        circle(leftWristX, leftWristY, 20);
        song2.stop();
        if(song1Status == false) {
        song1.play();
        document.getElementById("song").innerHTML = "Song Name: Rick Astley - Never Gonna Give You Up"
        }
    }
    if(rightWristConfidence > 0.2) {
        circle(rightWristX, rightWristY, 20);
        song1.stop();
        if(song2Status == false) {
        song2.play();
        document.getElementById("song").innerHTML = "Song Name: Henry Stickmin - Distraction Dance"
        }
    }
    
    
}

function modelLoaded() {
    console.log("Posenet is loaded");
}

function gotPoses(results) {
    if(results.length > 0) {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        leftWristConfidence = results[0].pose.keypoints[9].score;
        console.log("left wrist is at X: " + leftWristX + ", Y: " + leftWristY) + ", confidence: " + leftWristConfidence;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        rightWristConfidence = results[0].pose.keypoints[10].score;
        console.log("right wrist is at X: " + rightWristX + ", Y: " + rightWristY) + ", confidence: " + rightWristConfidence;
    }
}
