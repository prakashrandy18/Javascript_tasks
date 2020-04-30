function start(){
	var xhr = new XMLHttpRequest();

	xhr.open('GET', 'https://api.spoonacular.com/recipes/search', true);

	xhr.onload  = function(){
		if(this.status == 200){
			var users = JSON.parse(this.responseText);
			console.log(users);
		}

	}
	xhr.send();
}

start();