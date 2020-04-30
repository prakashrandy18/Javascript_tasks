var add_user = document.getElementById('add-user');
var double_money = document.getElementById('double');
var show_millionaires = document.getElementById('show-millionaires');
var sort_by_rich = document.getElementById('sort');
var calculate_wealth = document.getElementById('calculate-wealth');

var main = document.getElementById('main');



let data = [];

//fetch random users and add money

async function getRandomUser(){
    var res = await fetch('https://randomuser.me/api');
    var res_data = await res.json();
    
       
    var user = res_data.results[0];
    
    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money:Math.floor(Math.random() * 1000000)
    };
   
    addData(newUser);
    
}

function doubleMoney(){
    data = data.map(user=>{
        return {...user,money: user.money * 2 };
    });
    
     updateUI(data);
}

function addData(obj){
    data.push(obj);
 
    updateUI(data);
    
}

function sortByRich(){
    data.sort((a,b)=> b.money - a.money );
    
    updateUI(data);
}

function showMillionaires(){
    data = data.filter(val => val.money > 1000000);
    
    updateUI(data);
}

function calculateWealth(){
    var wealth = data.reduce((acc,num) => (acc+= num.money), 0);
    
    var wealtUI = document.createElement('div');
    wealtUI.innerHTML = `<h3>Total Wealth: ${wealth}</h3>`

    main.appendChild(wealtUI);
}


function updateUI(data){
    //clear the main div 
    main.innerHTML = ` <h2><strong>Person</strong>Wealth</h2>`;
    
       data.forEach((el,index,arr)=>{
        var element = document.createElement('div');
        element.classList.add('person');
        
        element.innerHTML = `<strong>${el.name}</strong >${el.money}`;
        
        main.appendChild(element);
        
        
    });
    
}



getRandomUser();





//event listener

add_user.addEventListener('click', getRandomUser);

double_money.addEventListener('click',doubleMoney);

sort_by_rich.addEventListener('click', sortByRich);

show_millionaires.addEventListener('click', showMillionaires);


calculate_wealth.addEventListener('click', calculateWealth);





















