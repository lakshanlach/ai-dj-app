leftmusic = ""
rightmusic = ""
status = ""

leftwristscore = 0;
rightwristscore = 0;

status1 = "";
status2 = "";

leftwristX = 0;
leftwristy = 0;
rightwristx = 0;
rightwristy =0;

function preload() {
 leftmusic = loadSound("frozen.mp3")
 rightmusic = loadSound("unstoppable.mp3")
}

function setup() {
	canvas =  createCanvas(600, 500)
	canvas.center()

    video = createCapture(VIDEO)
    video.hide()
    
    poseNet = ml5.poseNet(video, modeloaded)
    poseNet.on("pose" , gotposes)
}


function modeloaded() {
    console.log("model loaded")
    status = true
  }

function draw() {
    image(video,0,0,600,500)
    fill ("red")
    stroke ("red")

    status1 = leftmusic.isPlaying()
    status2 = rightmusic.isPlaying()
  
    if(rightwristscore > 0.2)
	{ 
		circle(rightwristx,rightwristy,20)

			leftmusic.stop();

		if(status2 == false)
		{
			rightmusic.play()
		}
	}

    if(leftwristscore > 0.2)
	{ 
		circle(leftwristx,leftwristy,20)

			rightmusic.stop();

		if(status1 == false)
		{
			leftmusic.play()
		}
	}
}



function gotposes(results) {
    if(results.length > 0){
        console.log(results)
        leftwristx = results[0].pose.leftWrist.x
        leftwristy = results[0].pose.leftWrist.y
   
        rightwristx = results[0].pose.rightWrist.x
        rightwristy = results[0].pose.rightWrist.y
        leftwristscore = results[0].pose.keypoints[9].score
        rightwristscore = results[0].pose.keypoints[10].score
    }
}

function song(){
    
}