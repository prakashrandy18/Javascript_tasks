const cartBtn = document.getElementById('cart-btn');

const cart_item_count = document.getElementById('cart-item-count');
const cart_close_btn = document.getElementById("cart-close-btn");


const productDom = document.getElementById("product-gallery");


const cart_btn = document.querySelectorAll('.cart-btn');



const section_5 = document.getElementById('section_5');
const cart_container = document.getElementById('cart-container')

const  cart_item = document.getElementById('cart-item-container');



const item_count_up = document.getElementById('item-count-up');
const item_count_down = document.getElementById('item-count-down');


const cart_total = document.getElementById('item-total');

const clear_cart = document.getElementById("clear-cart-btn");



let carts = [];

let buttonsDom = [];


class Products{
   async  getProducts(){
       try{
            
           //fetching products form json data
            let res = await fetch("products.json");
            let data = await res.json();
            let products = data.items;
           
            //filtering json data to wanted data
             products = products.map(i =>{
                   const {title, price} = i.fields;
                   const {id} = i.sys;
                   const image = i.fields.image.fields.file.url;

                   return {title, price, id, image};       
              });
           
          return products;
           
       }catch(error){
        console.log(error);
       }
   }
}



class displayUI{
    
    
    displayProducts(products){    
        
        products.forEach((product) => {
            
             let div = document.createElement('div');
             div.setAttribute('class', 'products');
            
                div.innerHTML = `

                            <div class="product-img">
                                <img src ="${product.image}">

                                <button class="cart-btn" data-id="${product.id}">
                                    <i class="fa fa-cart-plus"></i>
                                Add to Cart</button>                  
                            </div>

                                    <div class="product-details">
                                            <div class="product-name">
                                                <h4>${product.title}</h4>
                                    </div>

                                    <div class="product-price">
                                            <span>$ ${product.price}</span>
                                   </div>
                            </div>`;
            
            productDom.appendChild(div);
        });
    }
    
    
    getCartBtn(){
        let cart_btn =[...document.querySelectorAll('.cart-btn')]; 
        buttonsDom = cart_btn;
        
        cart_btn.forEach((cart) => {
            let id = cart.dataset.id;
            
            //checking whether cart has product or not
            let inCart = carts.find(item => item.id === id);
            
            if(inCart){
               cart.innerText = `In Cart`;
               cart.disabled = true;
            }else{
                cart.addEventListener('click', (event) => {
                    event.target.innerText = 'In Cart';
                    event.target.disabled = true;
                    
            //get Product from Products
                    
                    let cartItem = {...Storage.getProductsforCart(id), amount:1};
                    
                    
                    
            //add Product to Cart
        
                    carts = [...carts, cartItem];                                  
            //Save cart in localStorage
                        
                    Storage.saveCartProducts(carts);
                    
            //set cart values 
            
                    this.setCartValues(carts);
                    
                    
            //display cart item
                    
                    this.displayCartItems(cartItem);            
            
            //show the cart 
                    this.showCart();
                    
                });
                
            }
            
            
            
        });
        
       
        
    }
    
    
    setCartValues(carts){
        let tempTotal = 0;
        let itemsTotal = 0;
        
        carts.map((item) => {
            tempTotal += item.amount * item.price;
            itemsTotal += item.amount;
        });
    
    //cart-items total price value    
            cart_total.innerText =      parseFloat(tempTotal.toFixed(2));

    //cart-item count in navbar
              cart_item_count.innerText = itemsTotal;        
    }
    
    
    
     displayCartItems(carts){
    
        let div = document.createElement('div');
         div.setAttribute('class','cart-item');
         
                    div.innerHTML = `
                            <div class="cart-item-img">
                                <img src="${carts.image}">
                            </div>
                            <div class="cart-item-detail">
                                <h6>${carts.title}</h6>
                                <span>$${carts.price}</span>
                                <a href='#' class="remove-item" data-id="${carts.id}">remove</a>
                            </div>

                            <div class="cart-item-count">
                                <i class="fa fa-chevron-up" id="item-count-up" data-id="${carts.id}"></i>
                                <span class="item-count" >${carts.amount}</span>
                                <i class="fa fa-chevron-down" id="item-count-down" data-id="${carts.id}"></i>
                            </div>`;

                cart_item.appendChild(div);
    
}
    
     showCart(){
     document.body.style.overflow="hidden";
     section_5.style.visibility = "visible";    
     cart_container.style.transform = "translateX(0)" ;
    
}
    
setupApp(){
    
    carts = Storage.getCart(); 
    this.setCartValues(carts);
    this.populateUI(carts);
    
}    
    
populateUI(cart){
    cart.forEach(item => this.displayCartItems(item));
    
}    
    
cartLogic(){
    
    //clearing on clear cart btn
    clear_cart.addEventListener('click',this.clearCart);
    
    //cart functionality
    
    cart_item.addEventListener('click', event =>{
        
   let target = event.target;
      
        
        if(event.target.classList.contains('remove-item')){
           let removeItem = event.target;
            
           let id = removeItem.dataset.id;
            cart_item.removeChild(removeItem.parentElement.parentElement);
            
            ui.removeItems(id);
        }
        else if(event.target.classList.contains('fa-chevron-up'))
        {
            
            let addAmount = event.target;
            let id = addAmount.dataset.id;
            
            let tempItem = carts.find(item => item.id === id);
            
            tempItem.amount = tempItem.amount + 1;
            console.log(tempItem.amount);
            Storage.saveCartProducts(carts);
            ui.setCartValues(carts);
            
            addAmount.nextElementSibling.innerText = tempItem.amount;
        }
         else if(event.target.classList.contains('fa-chevron-down')){
             let lowerAmount = event.target;
             let id = lowerAmount.dataset.id;
             
             let tempItem = carts.find(item => item.id === id);
             
             tempItem.amount = tempItem.amount -1 ;
             
             if(tempItem.amount > 0){
                 Storage.saveCartProducts(carts);
                 ui.setCartValues(carts);
                 lowerAmount.previousElementSibling.innerText = tempItem.amount;
                
                }else{
                    cart_item.removeChild(lowerAmount.parentElement.parentElement);
                    ui.removeItems(id);
                }
         }
        
    });
    
}
removeItems(id){ 
    
    
    carts = carts.filter(item => item.id !== id);
    this.setCartValues(carts);
    Storage.saveCartProducts(carts);
    let btn = this.getSingleButton(id);
    btn.disabled = false;
    btn.innerHTML = `<i class="fa fa-shopping-cart"></i>add to cart`;
}    
clearCart(){
    
    let cartItems = carts.map(item => item.id);

    console.log(cartItems);
   
   
    cartItems.forEach(item => ui.removeItems(item));
    

     while(cart_item.childElementCount> 0) {
         cart_item.removeChild(cart_item.children[0]);
    }
}    

   
    
getSingleButton(id){
    return buttonsDom.find(button => button.dataset.id === id);
    
}
    
    
}



class Storage{
    saveProducts(products){
        localStorage.setItem('Products',JSON.stringify(products));        
    }
    
   static getProductsforCart(id){
        let prod = localStorage.getItem('Products');
        prod = JSON.parse(prod);
        
        //getting products on specific id
        return prod.find(prod => prod.id === id);        
    }
    
    static saveCartProducts(carts){
        localStorage.setItem('carts', JSON.stringify(carts));
    }
    
    static getCart(){
        return localStorage.getItem('carts') ? JSON.parse(localStorage.getItem('carts')): [];
    }
    
}




const products = new Products(); 

const ui = new displayUI();

const store = new Storage();


ui.setupApp();
products.getProducts().then(products => {
    ui.displayProducts(products);
    store.saveProducts(products);   
    
    
}).then(() => {
    ui.getCartBtn();
    ui.cartLogic();
  
});



//Event Listeners

cartBtn.addEventListener('click', ui.showCart);

cart_close_btn.addEventListener('click',()=>{
     document.body.style.overflow="visible";
    section_5.style.visibility = "hidden";    
    cart_container.style.transform = "translateX(100%)" ;
})



