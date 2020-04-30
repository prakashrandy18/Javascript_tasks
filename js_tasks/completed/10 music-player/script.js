const musicContainer = document.getElementById('music-container'),
      playBtn =document.getElementById('play'),
      prevBtn = document.getElementById('prev'),
      nextBtn = document.getElementById('next');


const audio = document.getElementById('audio'),
      progress = document.getElementById('progress'),
      progressContainer = document.getElementById('progress-container'),
      title = document.getElementById('title'),
      cover = document.getElementById('cover');


const songs = ['hey', 'summer', 'ukulele'];

let songIndex = 2;

function loadSong(song){
    title.innerText = song;
    
    audio.src = `music/${song}.mp3`;
    cover.src = `images/${song}.jpg`;

    
}

loadSong(songs[songIndex]);

function toggleAudio(){
    if(audio.paused){
        
       musicContainer.classList.add('play');
       
        playBtn.querySelector('i.fas').classList.replace('fa-play','fa-pause');        
        
       audio.play();
    }else{
        
        musicContainer.classList.remove('play');
        
        playBtn.querySelector('i.fas').classList.replace('fa-pause','fa-play'); 
        audio.pause();
    }
}

function prevSong(){
    songIndex--;
    
    if(songIndex < 0){
        songIndex = songs.length -1;
    }
    
    
    loadSong(songs[songIndex]);
    
    toggleAudio();    
    
}

function nextSong(){
    songIndex++;
  
    if(songIndex > songs.length - 1){
        songIndex = 0;
    }
    
    loadSong(songs[songIndex]);
    
    toggleAudio();
}


function updateProgress(){
  const progressValue = (audio.currentTime / audio.duration) * 100;
  
    
    progress.style.width = `${progressValue}%`;
}


function setProgress(e){
    const width = this.clientWidth;   //we will get full width  
    const clickX = e.offsetX; // where we click at x-axies
 
    audio.currentTime = (clickX / width) * audio.duration;
        
}


playBtn.addEventListener('click', toggleAudio);

prevBtn.addEventListener('click', prevSong);

nextBtn.addEventListener('click',nextSong);

audio.addEventListener('timeupdate', updateProgress);

progressContainer.addEventListener('click',setProgress);

audio.addEventListener('ended',nextSong);