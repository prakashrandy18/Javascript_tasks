var timer = document.getElementById('time');


const start = document.getElementById('start');




//list elements
const valStart = document.getElementById('valStart');
const valStop = document.getElementById('valStop');
const spent = document.getElementById('spent');


//start time  and stop time
var start_time_in_ms = 0;
var stop_time_in_ms = 0;


var el = document.createElement('div');
el.classList.add('time-container');

function showTime(){
    setTimeout(()=>{                      
       var t =  getTime();
        el.innerHTML = `${t.time}`;
        timer.appendChild(el);
    },0);
}

setInterval(showTime,1000);


function getTime(){
     var hour = new Date().getHours();
        var h = hour < 10 ? '0'+hour : hour;
      

         var minute = new Date().getMinutes();
         var m =minute < 10 ? '0'+ minute : minute;

         var seconds = new Date().getSeconds();
         var s =seconds < 10 ? '0'+ seconds : seconds; 
    
         var t = `${h}: ${m}: ${s}`;
        var t_in_ms = new Date().getTime();
        
      
        return {
            time: t,
            time_in_millisecond :t_in_ms
        };



}

function getStartTime(){
    
    var time_of_start = getTime();      
    var time_of_start = time_of_start;
    valStart.innerHTML =`${time_of_start.time}`;
    
    //getting starttime in milliseconds    
    var time_of_start_ms = time_of_start.time_in_millisecond;
    console.log(`${time_of_start.time_in_millisecond}`);  
    
    start_time_in_ms = time_of_start_ms;
    
    start.innerHTML = 'STOP';
    start.removeAttribute('id');
    start.setAttribute('id','stop');
    
     stop = document.getElementById('stop');
   
   
      stop.addEventListener('click', getStopTime,true);
    
    
       
}



//
//function getStopTime(){    
//     
//    var time_of_stop = getTime();
//     var time_of_stop = time_of_stop;
//     valStop.innerHTML = `${time_of_stop.time}`;
//    
//    //getting stoptime in milliseconds
//    var time_of_stop_ms = time_of_stop.time_in_millisecond;
//    console.log(`${time_of_stop.time_in_millisecond}`); 
//    
//    stop_time_in_ms =  time_of_stop_ms;
//         
//    var diff = (stop_time_in_ms - start_time_in_ms);
//    var diffFormat =  convertMS(diff);
//    spent.innerHTML = diffFormat;
//    
//    stop.innerHTML = 'START';
//    stop.setAttribute('id','start');
//}

function convertMS(ms) {
    var d, h, m, s;
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



//Event Listeners


start.addEventListener('click',getStartTime);




//Task manager
//to find each and every start and stop values

//to fing difference between times and output results

