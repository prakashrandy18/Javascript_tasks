const balance = document.getElementById('balance'),
      money_plus = document.getElementById('money-plus'),
      money_minus = document.getElementById('money-minus'),
      list = document.getElementById('list'),
      form = document.getElementById('form'),
      text = document.getElementById('text'),
      amount = document.getElementById('amount');



/*const egTrans = [
    {id: 1, text: 'flower', amount: +180},
    {id: 2, text: 'pot', amount: -250},
    {id: 3, text: 'name', amount: -220},
    {id: 4, text: 'efed', amount: +320},
    
];

*/



const localStorageTrans = JSON.parse(localStorage.getItem('egTrans'));

let egTrans = localStorage.getItem('egTrans') !== null ? localStorageTrans : [];

function addTransaction(e){
    e.preventDefault();
    
    if(text.value.trim() === '' || amount.value.trim() === ''){
       alert('Please fill out details to Add');
    }else{
        const trans = {
            id: generateID(),
            text: text.value,
            amount: +amount.value };
        
        egTrans.push(trans);
               
        addegTransToDOM(trans);
        
        updateValues();
        
        updateLocalStorage();
        
        
        
        text.value = '';
        amount.value = '';       
        
       
    }
    
    
}

function generateID() {
  return Math.floor(Math.random() * 100000000);
}

function addegTransToDOM(egTrans){
    
    //Get sign(+ or -)
    const sign = egTrans.amount > 0 ? '+' : '-' ;
    
    const item = document.createElement('li');
    
    //Add class based on sign 
    
    item.classList.add(egTrans.amount > 0 ? 'plus' : 'minus');
    
    
    item.innerHTML = ` 
        ${egTrans.text} <span> ${sign}${Math.abs(egTrans.amount)} </span>
        <button class="delete-btn" onclick=removeTransaction(${egTrans.id})>x</button>
`;
    
    list.appendChild(item);
    
}
 //update balance , income and expense
function updateValues(){
    const amounts = egTrans.map(vals => vals.amount);
    
    const total = amounts.reduce((acc,cur)=> acc += cur, 0).toFixed(2);
    
    const income = amounts
                    .filter(item => item > 0)
                    .reduce((acc, cur)=> (acc += cur), 0)
                    .toFixed(2);
    
    const expense = (amounts     
                    .filter(item => item < 0)
                    .reduce((acc,cur) => (acc += cur),0) * -1)
                    .toFixed(2);
    
    //updateDOM()
    
    balance.innerHTML = `$${total}`;
    
    money_plus.innerHTML = `+$${income}`;
    
    money_minus.innerHTML = `-$${expense}`;
    
    
}

function removeTransaction(id) {
  egTrans = egTrans.filter(transaction => transaction.id !== id);

  updateLocalStorage();

  init();
}

function updateLocalStorage(){
    localStorage.setItem('egTrans', JSON.stringify(egTrans));
}

function init(){
    list.innerHTML = ''; 
    
    egTrans.forEach(addegTransToDOM);
    
    updateValues();
}

//Event Listener 

form.addEventListener('submit', addTransaction);

init();