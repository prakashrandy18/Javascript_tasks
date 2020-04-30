var video = document.getElementById('video');
var play = document.getElementById('play');
var stop = document.getElementById('stop');
var progress = document.getElementById('progress');
var timespan = document.getElementById('timespan');




//functions

var togglevideo = ()=>{
    if(video.paused){
        video.play();
    }
    else{
        video.pause();
    }
};

let updatePlayIcon = ()=>{
    if(video.paused){
        play.innerHTML = '<i class="fa fa-play fa-2x"></i>';
    }
    else{
        play.innerHTML = '<i class="fa fa-pause fa-2x"></i>';
    }
};

let stopVideo = () => {
    video.currentTime = 0;
    video.pause();
};

let updateProgress=()=> {
    
    //console.log(video.currentTime);
    //console.log(video.duration);
    progress.value = ((video.currentTime/video.duration) * 100);

    let mins = Math.floor(video.currentTime / 60);
    if(mins < 10){
        mins = '0' + String(mins);
    }

    let secs = Math.floor(video.currentTime % 60);
    if(secs < 10){
        secs = '0' + String(secs);
    }
    timespan.innerHTML = `${mins}:${secs}`;
};


let setVideoProgress = ()=>{
    video.currentTime = (+progress.value * video.duration) / 100;
    
};
//Event listener

video.addEventListener('click', togglevideo);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('timeupdate', updateProgress); 

play.addEventListener('click', togglevideo);

stop.addEventListener('click', stopVideo);

progress.addEventListener('change', setVideoProgress);

