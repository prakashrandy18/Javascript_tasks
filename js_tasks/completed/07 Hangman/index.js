const wordEl = document.getElementById('word');
const wrongwordEl = document.getElementById('wrong-letters');
const playAgain = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalmsg = document.getElementById('final-message');


const figureParts = document.querySelectorAll('.figure-part');

const words = ['application', 'programming','wizard', 'interface'];

//selected words for the question
let selectedWords = words[Math.floor(Math.random()* words.length)];


//to get users correct&& wrong letter
let  correctLettersByUser = [];
let wrongLettersByUSer = [];


//show hidden word

function displayWord(){
    wordEl.innerHTML = `
        ${selectedWords
              .split('')
              .map(letter=>
                    `<span class="letter">                        ${correctLettersByUser.includes(letter)
                       ? letter : '' } 
                    </span>
               `).join('')}
    `;
    
    //to make \n disappear
    const  innerWord = wordEl.innerText.replace(/\n/g, '');  
    
    if(innerWord === selectedWords){
        finalmsg.innerText = 'congratulations you won';
        popup.style.display = 'flex';
    }
    
}

//updateWrongLetters function
function updateWrongLetters(){
    //update wrong letters into display
    wrongwordEl.innerHTML = `
        ${wrongLettersByUSer.length > 0 ? `<p>Wrong</p>` : '' }
        ${wrongLettersByUSer.map(letter=> `<span>${letter}</span>`)}
    `;
    
    //figure-parts into display
    figureParts.forEach((cur, index)=>{
        const errors = wrongLettersByUSer.length;
        if(index < errors){
            cur.style.display= 'block';
        }else{
            cur.style.display = 'none';
        }
    });
    
    //check if lost
    if(wrongLettersByUSer.length === figureParts.length){
        finalmsg.innerText = `unfortunately you lost `;
        popup.style.display = 'flex';
    }
}


//show notification function 

function showNotification(){
    notification.classList.add('show');
    
    setTimeout(()=>{
        notification.classList.remove('show');
    }, 2000)
}

//keypress letter 

window.addEventListener('keydown', e =>{
//console.log(e.keyCode );
  if(e.keyCode >= 65 && e.keyCode <= 90){
      const letter = e.key;
      
      if(selectedWords.includes(letter)){
          if(!correctLettersByUser.includes(letter)){
              correctLettersByUser.push(letter);
              displayWord();
          }else{
              showNotification();
          }
         
         }else{
             if(!wrongLettersByUSer.includes(letter)){
                 wrongLettersByUSer.push(letter);
                 
                 updateWrongLetters();
             }else{
                 showNotification();
             }
         }
  }                      
});

//restart game

playAgain.addEventListener('click', e=>{
    //empty array
    correctLettersByUser.splice(0);
    wrongLettersByUSer.splice(0);
    
    selectedWords = words[Math.floor(Math.random() * words.length)];
    
    displayWord();
    
    updateWrongLetters();
    
    popup.style.display = 'none';
    
    
})

displayWord();