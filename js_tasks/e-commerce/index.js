const cartBtn = document.getElementById('cart-btn');
const cart_close_btn = document.getElementById("cart-close-btn");

const section_5 = document.getElementById('section_5');
const  cart_container = document.getElementById('cart-container');


const item_count_up = document.getElementById('item-count-up');
const item_count_down = document.getElementById('item-count-down');

const clear_cart = document.getElementById("clear-cart-btn");


















//Event Listeners

cartBtn.addEventListener('click',()=>{
    
    document.body.style.overflow="hidden";
    section_5.style.visibility = "visible";    
    cart_container.style.transform = "translateX(0)" ;
    
    
});

cart_close_btn.addEventListener('click',()=>{
     document.body.style.overflow="visible";
    section_5.style.visibility = "hidden";    
    cart_container.style.transform = "translateX(100%)" ;
})



