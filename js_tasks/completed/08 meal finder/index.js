const search =  document.getElementById('search');
const submit = document.getElementById('submit');
const random = document.getElementById('random ');
const mealsEl = document.getElementById('meals');
const resultHeading = document.getElementById('result-heading');
const single_mealEl = document.getElementById('single-meal');




//search meal and fetch data from api
function searchMeal(e){
    
    e.preventDefault();
    
    //CLear single meal
    
    single_mealEl.innerHTML = '';
    
    //get search term 
    
    const term = search.value;
    console.log(term);
    
    
    //check for empty search
    if(term.trim()){
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
        .then(res => res.json())
        .then(data=>{
            resultHeading.innerHTML = `<h2>Seach results for '${term}': </h2>`;
            
            
            if(data.meals === null){
                resultHeading.innerHTML = `<p>There are no search results <p>`;
            }else{
                mealsEl.innerHTML = data.meals.map( meal =>
                    `<div class="meal">
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                        <div class="meal-info" data-mealID="${meal.idMeal}">

                        <h3>${meal.strMeal}</h3>
                        </div> 
                    </div>
`
                   
                )
                    .join('');
            }
        });
        
        //clear search text
        
        search.value = '';
        
        
        
        
    }else{
        alert('please enter something');
    }
    
}


//fetch meal 

function getMealById(id){
    console.log(id);
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(res => res.json())
    .then(data =>{
        const meal = data.meals[0];
        
        addMealToDOM(meal);
    } );
}



//addMealTo DOm 

function addMealToDOM(meal){
    const ingred = [];
    
    for(let i=0; i <= 20; i++){
        if(meal[`strIngredient${i}`]){
            ingred.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
        }else{
            break;
        }
    }
    
    single_mealEl.innerHTML = `
    <div class="single-meal">
            <h1>${meal.strMeal}</h1>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
            <div class="single-meal-info">
            ${meal.strCategory ? `<p>${meal.strCategory}</p> `: ''}
            ${meal.strArea ? `<p>${meal.strArea}</p>`: ''}
            </div>
        <div class="main">
            <p>${meal.strInstructions}</p>
            <h2>Ingredients</h2>
               <ul>
                ${ingred.map(i => `<li>${i}</li>`).join('')}

                </ul>
        </div>  
        
        </div>

`;
    
   
}

//event listener
submit.addEventListener('submit', searchMeal);

mealsEl.addEventListener('click', e => {
    const mealInfo = e.path.find(item=>{
       if(item.classList){
        return item.classList.contains('meal-info');
           
       }
        else{
            return false;
        }
    });

    if(mealInfo) {
        const mealID = mealInfo.getAttribute('data-mealid');
        getMealById(mealID);
        
    }
});