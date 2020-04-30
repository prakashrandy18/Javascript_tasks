//This class is to make a constuctor so that we can make instances...

class Books{
	constructor(title, author, isbn){
		this.title = title;
		this.author = author;
		this.isbn = isbn;
	}
}

//UI class used to maintain UI handler using certain methods...
//displaying books reflects on UI
//removing books reflects on UI
// whatever reflects on UI it should be done it here.

class UI{

	static displayBooks(){

		//without class StoredBookData
		//sample data to check
		const storedBooks = [
			{
				title: '5 am',
				author: 'robin',
				isbn: '#24589'
			},
			{
				title:'rich dad poor dad',
				author: 'robin',
				isbn: '#459809'
			},
			{
				title:'hello',
				author:'heidh',
				isbn:'#76899'
			}
		];

		//here the data comes from localstorage
		//const storedBooks = StoreBookData.getBooks();
		storedBooks.forEach(book => UI.addBookToList(book));

	}

	static addBookToList(books){
		const list = document.getElementById('book-list');
		const row = document.createElement('tr');
		row.innerHTML = `
			<td>${books.title}</td>
			<td>${books.author}</td>
			<td>${books.isbn}</td>
			<td><a href='#'' class="btn btn-danger btn-sm delete"> X</a></td>`;
		list.appendChild(row);   //adding child to row .
	}

	static showALert(msg, className){
		//bootswatch <div class="alert alert-success"> message </div> 
		//instead of showing simple js alert we tried bootstrap alert in js

		const div = document.createElement('div');
		div.className = `alert alert-${className}`;   
		div.appendChild(document.createTextNode(msg));

		const container = document.querySelector('.container');
		const form = document.querySelector('#book-form');
		container.insertBefore(div, form);

		setTimeout(()=>document.querySelector('.alert').remove(),3000);
	}


	static clearFields(){
		document.getElementById('title').value = '';
		document.getElementById('author').value = '';
		document.getElementById('isbn').value = '';
	}

	static deleteBook(el){
		if(el.classList.contains('delete')){     //classList means classNames containes means if it exits('delete')
			el.parentElement.parentElement.remove();    //reversing DOM to remove whatever we want
			UI.showALert('Book has been deleted', "success");

		}
	}
}


//just to store book data on to the local storage.
//and keep track of add, remove books.

// class StoreBookData{
// 	static getBooks(){
// 		let books;
// 		if(localStorage.getItem('books')=== null){
// 			books = [];
// 		}else{
// 			books = JSON.parse(localStorage.getItem('books')); 	
// 		}

// 		return books;

// 	}

// 	static addBooks(books){
// 		const books1 = StoreBookData.getBooks();
// 		books.push(book);

// 		//JOSN is used to parse string to js 
// 		localStorage.setItem('books1', JSON.stringify(books1));

// 	}

// 	static  removeBooks(isbn){
// 		//isbn is unique to track to remove
// 		const books2 = StoreBookData.getBooks();
// 		books.forEach((book, index)=>{

// 			if(book.isbn === isbn){
// 				books.splice(index, 1);
// 			}
// 		});

// 		localStorage.setItem('books2', JSON.stringify(books2));

// 	}

// }


//Events to be happened.


document.addEventListener('DOMContentLoaded', UI.displayBooks());  //DOMContenetLoaded every time refrehes.

document.getElementById('add-book').addEventListener('click', e =>{
 
	e.preventDefault();                 //the data displayes flashes due to click event.
	const title = document.getElementById('title').value;
	const author = document.getElementById('author').value;
	const isbn = document.getElementById('isbn').value;

	if(title == '' || author == '' || isbn == ''){
		UI.showALert('please fill', 'danger');
		//alert('please fill out the fields');
	}else{

		const book = new Books(title, author, isbn);
		console.log(book);
		UI.addBookToList(book);

		//StoreBookData.addBooks(book);
		UI.clearFields();
		UI.showALert('book has been added', 'success');
	}


	
});


document.getElementById('book-list').addEventListener('click', e => {
	UI.deleteBook(e.target);   //target is when you click it shows/refres the clicked element 

	//this shows target elements parentNode and previous sibling's textcontents..
	StoreBookData.removeBooks(e.target.parentElement.previousElementSibling.textContent);  
	
});
