song = "";
score_left_wrist = 0;
left_wrist_x = 0;
left_wrist_y = 0;
right_wrist_x = 0;
right_wrist_y = 0;

function setup(){
    canvas = createCanvas(600,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log("PoseNet Is Initialised");
}

function gotPoses(results){
    if(results.length > 0){
        left_wrist_x = results[0].pose.leftWrist.x;
        left_wrist_y = results[0].pose.leftWrist.y;
        right_wrist_x = results[0].pose.rightWrist.x;
        right_wrist_y = results[0].pose.rightWrist.y;
        score_left_wrist = results[0].pose.keypoints[9].score;
        console.log(score_left_wrist);
        console.log("Right Wrist Position is: " + right_wrist_x + ", " + right_wrist_y);
        console.log("Left Wrist Position is: " + left_wrist_x + ", " + left_wrist_y);
        console.log(results);
    }
}

function draw(){
    image(video, 0, 0, 600, 500);
    fill("#FF0000");
    stroke("#FF0000");
    circle(right_wrist_x,right_wrist_y, 20);

    if(right_wrist_y>0 && right_wrist_y <=100){
        document.getElementById("speed").innerHTML = "Speed = 0.5x";
        song.rate(0.5);
    }
    if(right_wrist_y>100 && right_wrist_y <=200){
        document.getElementById("speed").innerHTML = "Speed = 1x";
        song.rate(1);
    }
    if(right_wrist_y>200 && right_wrist_y <=300){
        document.getElementById("speed").innerHTML = "Speed = 1.5x";
        song.rate(1.5);
    }
    if(right_wrist_y>300 && right_wrist_y <=400){
        document.getElementById("speed").innerHTML = "Speed = 2.0x";
        song.rate(2);
    }
    if(right_wrist_y>400 && right_wrist_y <=500){
        document.getElementById("speed").innerHTML = "Speed = 2.5x";
        song.rate(2.5);
    }

    if (score_left_wrist > 0.2){
    circle(left_wrist_x, left_wrist_y, 20);
    InNumberleft_wrist_y = Number(left_wrist_y);
    remove_decimals = floor(InNumberleft_wrist_y);
    volume = remove_decimals/500;
    document.getElementById("volume").innerHTML = "Volume - " + volume;
    song.setVolume(volume);
    }
}

function preload(){
    song = loadSound("music.mp3");
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}