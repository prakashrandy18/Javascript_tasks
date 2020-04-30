var container =document.querySelector('.container');
var count = document.querySelector('.count');
var total = document.querySelector('.total');
var movieticket = document.getElementById('movie');
var ticketPrice = +movieticket.value;
var seats = document.querySelectorAll('.row .seat:not(.occupied)');


  

populateUI();

//functions
function updateSelectedCount(){
    var selectedSeats = document.querySelectorAll('.row .seat.selected');
    var selectedSeatsCount = selectedSeats.length;
    
     var seattoLocal = [...selectedSeats].map((e)=>{
         return [...seats].indexOf(e);
     });
    console.log(seattoLocal);
    
    localStorage.setItem('seatselected', JSON.stringify(seattoLocal));
    
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount*ticketPrice;
}


function setMovieData(movieIndex, movieValue){
    localStorage.setItem('selectedMovieindex', movieIndex);
    localStorage.setItem('selectedMovieValule',movieValue);
    
}


function populateUI(){
    var getSeatData = JSON.parse(localStorage.getItem('seatselected'));
    
    if(getSeatData !== null && getSeatData.length > 0){
    seats.forEach((e, index)=>{
        if(getSeatData.indexOf(index) > -1){
            e.classList.add('selected');
        }
    });
 }
    var getmovieSelectData = localStorage.getItem('selectedMovieindex');
     if(getmovieSelectData !== null){
         movieticket.selectedIndex = getmovieSelectData;
     }
    
}
                  

//Event listerner

//movieselected
movieticket.addEventListener('change', (e)=>{
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value); 
    updateSelectedCount();
    
    
});

//seatclicked
container.addEventListener('click',(e)=>{
    
 if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
    e.target.classList.toggle('selected');
     
     updateSelectedCount();
     
    
 }   
});

updateSelectedCount();