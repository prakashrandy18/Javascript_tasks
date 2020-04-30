var currencyEL_1 = document.getElementById('currency-1');
var currencyEL_2 = document.getElementById('currency-2');

var amountEl_1 = document.getElementById('amount-1');
var amountEl_2 = document.getElementById('amount-2');

var rateEl = document.getElementById('rate');
var swap = document.getElementById('swap');




function calculate(){
    let currency_1 = currencyEL_1.value;
    let currency_2 = currencyEL_2.value;
    
    fetch(`https://api.exchangerate-api.com/v4/latest/${currency_1}`)
    .then(res => res.json())
    .then(data => {
        //console.log(data.rates)
        const rates = data.rates[currency_2];
        //console.log(rates);
        rateEl.innerHTML = `1 ${currency_1} = ${rates} ${currency_2}`;
        
        amountEl_2.value = (amountEl_1.value * rates).toFixed(2);
    });
    
     
}

currencyEL_1.addEventListener('change',calculate);
amountEl_1.addEventListener('input',calculate);
currencyEL_2.addEventListener('change',calculate);
amountEl_2.addEventListener('input',calculate);

swap.addEventListener('click', ()=>{
    const temp = currencyEL_1.value;
    currencyEL_1.value = currencyEL_2.value;
    currencyEL_2.value = temp;
    calculate();
});

calculate();


