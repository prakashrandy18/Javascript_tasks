const word = document.getElementById('word'),
      text = document.getElementById('text'),
      scoreEl = document.getElementById('score'),
      timeEl = document.getElementById('time'),
      endgameEl = document.getElementById('end-game-container'),
      settingsBtn = document.getElementById('settings-btn'),
      settings = document.getElementById('settings'),
      settingsForm = document.getElementById('settings-form'),
      difficutltySelect = document.getElementById('difficulty');
      

let randomWord;
let time = 10;
let score = 0;

//set difficulty value in localstorage
let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

//set difficulty value to DOM
difficutltySelect.value = difficulty;

let words =['hello','hi','bye','good','see','boo','lisbon','patrick',
            'jane','praddeep','world'];

//focus on text when starts
text.focus();

//start timer by counting down

const timer = setInterval(updateTime, 1000);

//functions

function getRandomWord(){
    return words[Math.floor(Math.random() * words.length)];
}

function addWordToDOM(){
    randomWord = getRandomWord();
    word.innerHTML = randomWord;
}

function updateScore(){
    score++;
    
    scoreEl.innerHTML = score;
}

function updateTime(){
    time--;
    timeEl.innerHTML = `${time}s`;
    
    if(time === 0){
        clearInterval(timer); //stops setTimer
        
        gameOver();
        
        
    }
}

function gameOver(){
    endgameEl.innerHTML =`
        <h1>Time ran out</h1>
        <p>your final score is ${score}</p>
        <button onclick="location.reload()">Reload</button>`;
    
    endgameEl.style.display = "flex";
}

addWordToDOM();


//event listeners

//typing..
text.addEventListener('input', e =>{
    const insertTerm = e.target.value;
    
    if(insertTerm === randomWord){
        addWordToDOM();
        updateScore();
        
        e.target.value = '';
        
        if(difficulty === 'hard'){
        time += 2;
        }else if(difficulty === 'medium'){
            time += 3;
            
        }else{
            time += 4;
        }
        
        updateTime();
    }
});

//settings
settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));

//settings select

settingsForm.addEventListener('change', e=>{
    difficulty = e.target.value;
    localStorage.setItem('difficulty',difficulty);
});


