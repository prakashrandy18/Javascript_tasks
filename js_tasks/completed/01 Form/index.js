var form = document.getElementById('form');
var uname = document.getElementById('uname');
var email = document.getElementById('email');
var pwd = document.getElementById('pwd');
var cpwd = document.getElementById('cpwd');

//functions........
function showError(input, msg){
	input.parentElement.className = 'error';
	var message = input.parentElement.querySelector('small');
	message.innerText = msg;
}

function showSuccess(input){
	input.parentElement.className = 'success';
}

function checkRequired(input, msg){
	if(input.value === ''){
		showError(input,msg);
	}
	else{
		showSuccess(input);
	}
}

function validateEmail(email) {
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   return re.test(String(email).toLowerCase());
}
	

function checkPasswordMatch(input1, input2){
	if(input1.value !== input2.value){
		showError(input2, 'passwords dont match');
	}	
}


//Event listener....
form.addEventListener('submit', (e)=>{
	e.preventDefault();

	checkRequired(uname,'username required' );
	checkRequired(email,'email required' );
	checkRequired(pwd,'passwords required' );
	checkRequired(cpwd,'cpwd requuired' );
	if(!validateEmail(email.value)){
		showError(email, 'invalid email');
	}
	checkPasswordMatch(pwd,cpwd);


});