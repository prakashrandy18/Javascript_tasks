var timer = document.getElementById('time');


const start = document.querySelectorAll('#start');
const stop = document.querySelectorAll('#stop');


//list elements
let valStart = document.querySelectorAll('#valStart');
let valStop = document.querySelectorAll('#valStop');
let spent = document.querySelectorAll('#spent');



//start time  and stop time
var start_time_in_ms = 0;
var stop_time_in_ms = 0;


var el = document.createElement('div');
el.classList.add('time-container');




/*******************************************************/
//Time class
/*******************************************************/
class Time{
    
        getTime(){
            let  hour = new Date().getHours();
            let h = hour < 10 ? '0'+hour : hour;

            let minute = new Date().getMinutes();
            let m =minute < 10 ? '0'+ minute : minute;

            let seconds = new Date().getSeconds();
            let s =seconds < 10 ? '0'+ seconds : seconds; 

             let t = `${h}: ${m}: ${s}`;
             let t_in_ms = new Date().getTime();


            return {
                time: t,
                time_in_millisecond :t_in_ms
            };


        }
    
    
        getStartTime(n){
             
    
    
                let time_of_start = time.getTime();      
                ui.showStartTime(time_of_start, n);

                //getting starttime in milliseconds    
                var time_of_start_ms = time_of_start.time_in_millisecond;
                
               //adding to global variable
                start_time_in_ms += time_of_start_ms;             
        }
    
    
        getStopTime(n){
             
    
    
                 let time_of_stop = time.getTime();
                 ui.showStopTime(time_of_stop, n);


                
                //getting stoptime in milliseconds
                var time_of_stop_ms = time_of_stop.time_in_millisecond;
        
                //adding stop ms in global variable
                stop_time_in_ms =  time_of_stop_ms;

                //getting diff time
                var diff = (stop_time_in_ms - start_time_in_ms);
               
                //converting diff time to time format
                var diffFormat =  time.convertMs(diff);
                ui.showDiffTime(diffFormat, n);

                //setting global var to empty
                start_time_in_ms = 0;
                stop_time_in_ms = 0;
        }
    
    
        convertMs(ms){
             
                let d, h, m, s;
                s = Math.floor(ms / 1000);
                m = Math.floor(s / 60);
                s = s % 60;
                h = Math.floor(m / 60);
                m = m % 60;
                d = Math.floor(h / 24);
                h = h % 24;
                h += d * 24;

                h = h < 10 ? '0' + h : h;
                m = m < 10 ? '0' + m : m;
                s = s < 10 ? '0' + s : s;
                return  h + ':' + m + ':' + s;
}
        

}


/*******************************************************/
//UI class
/*******************************************************/
class displayUI{    
    
        showTimeToDOM(){

               var t =  time.getTime();
                el.innerHTML = `${t.time}`;
                timer.appendChild(el);

         }
    
        showStartTime(time, n){
             let div = document.createElement('div');
             div.innerHTML =`${time.time}`;
             valStart[n-1].appendChild(div);
             
            //only after start clicked stop
            start[n-1].disabled = true; 
            stop[n-1].disabled = false;
            
            
        }
    
        showStopTime(time, n){
              let div = document.createElement('div'); 
              div.innerHTML = `${time.time}`;             valStop[n-1].appendChild(div);
            
            //only after stop clicked start
                
               start[n-1].disabled = false;
               stop[n-1].disabled = true;    
            
        }
    
        showDiffTime(time, n){
              let div =  document.createElement('div'); 
              div.innerHTML = time;
              spent[n-1].appendChild(div);
        }
    
}



/*******************************************************/
//On ContentLoad
/*******************************************************/

const time = new Time();
const ui = new  displayUI();
setInterval(ui.showTimeToDOM,1000);


/*******************************************************/
//On ContentLoad (watch ui class to see how it does)
/*******************************************************/

valStart = [...valStart];
valStop = [...valStop];
spent = [...spent];


/*******************************************************/
//Event Listeners
/*******************************************************/


start.forEach((btn) =>{
    btn.addEventListener('click',(btn)=>{
       if(btn.target.dataset.id === '1'){
           time.getStartTime(1);
           
       }
        else if(btn.target.dataset.id === '2'){
           time.getStartTime(2);
       }
        else{
           time.getStartTime(3);
       }
    });
    
    

});


    
stop.forEach((btn) =>{
    btn.addEventListener('click',(btn)=>{
       if(btn.target.dataset.id === '1'){
           time.getStopTime(1);
           
       }
        else if(btn.target.dataset.id === '2'){
           time.getStopTime(2);
       }
        else{
           time.getStopTime(3);
       }
    });
});



    


