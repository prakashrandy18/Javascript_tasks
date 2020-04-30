const cardsContainer = document.getElementById('cards-container'),
      prevBtn = document.getElementById('prev'),
      nextBtn = document.getElementById('next'),
        currentEL = document.getElementById('current'),
        showBtn = document.getElementById('show'),
        hideBtn = document.getElementById('hide'),
        questionEL= document.getElementById('question'),
        answerEL = document.getElementById('answer'),
        addCardBtn= document.getElementById('add-card'),
        clearBtn = document.getElementById('clear'),
        addContainer = document.getElementById('add-container');
      


//keep track of active cards 

let currectActiveCard = 0;

//store DOM cards

const cardsEl = [];

//store card data
const cardsData = getData();
//const cardsData = [{question:'what is ReactJs', answer:'ReactJs is javascript framework'},{question:'what is VueJs', answer:'VueJs is javascript framework'}];

//creating all cards
function createCards(){
    cardsData.forEach((data,index) => createCard(data,index));
}

//creating single card
function createCard(data,index){
    const card = document.createElement('div');
    card.classList.add('card');
    
    if(index === 0){
        card.classList.add('active');
    }
    
    card.innerHTML = `
        <div class="inner-card">
        <div class="inner-card-front">
            <p>${data.question}</p>
        </div>
        <div class="inner-card-back">
            <p>${data.answer}</p>
        </div>
        </div>
    `;
    
    card.addEventListener('click', () => card.classList.toggle('show-answer'));
    
    //add to DOM
    
    cardsEl.push(card);
    
    cardsContainer.appendChild(card);
    
    updatePageNum();
}

function updatePageNum(){
    currentEL.innerText = `${currectActiveCard + 1}/${cardsEl.length}`;
}

function getData(){
    const carddata = JSON.parse(localStorage.getItem('cards'));
    
    return carddata === null ? [] : carddata;
}

function setCardsData(cards){
    localStorage.setItem('cards', JSON.stringify(cards));
    window.location.reload();
}

createCards();



prevBtn.addEventListener('click',()=> {
    cardsEl[currectActiveCard].className = 'cards right';
    
    currectActiveCard = currectActiveCard - 1;
    
    if(currectActiveCard < 0){
        currectActiveCard = 0;
    }
    
    cardsEl[currectActiveCard].className = 'card active';
    
    updatePageNum();
} );

nextBtn.addEventListener('click',() =>  {
    cardsEl[currectActiveCard].className = 'card left';
    
    currectActiveCard = currectActiveCard + 1;
    
    if(currectActiveCard > cardsEl.length - 1){
        currectActiveCard = cardsEl.length -1;
    }
    
    cardsEl[currectActiveCard].className = 'card active';
    
    updatePageNum();
});

showBtn.addEventListener('click', ()=> addContainer.classList.add('show'));

hideBtn.addEventListener('click', ()=> addContainer.classList.remove('show'));

addCardBtn.addEventListener('click',()=>{
    const question = questionEL.value;
    const answer = answerEL.value;
    
    if(question.trim() && answer.trim()){
        const newCard = {question, answer};
        
        createCard(newCard);
        
        questionEL.value = '';
        answerEL.value="";
        
        addContainer.classList.remove('show');
        
        cardsData.push(newCard);
        setCardsData(cardsData);
        
    }
});

clearBtn.addEventListener('click',()=>{
   localStorage.clear();
    cardsContainer.innerHTML ='';
    window.location.reload();
});