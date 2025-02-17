const container = document.getElementById('container'),
      text = document.getElementById('text');

const totalTime = 7500;
const breathTime = (totalTime / 5) * 2;
const holdTime = totalTime / 5;

function breathAnimation(){
    text.innerText = 'Breath IN!';
    container.className = 'container grow';
    
    setTimeout(()=>{
       text.innerText = 'Hold';
        
        setTimeout(()=>{
            text.innerText = 'Breath Out!';
            container.className = 'container shrink';
        },holdTime);
    },breathTime);
}

setInterval(breathAnimation, totalTime);

breathAnimation();