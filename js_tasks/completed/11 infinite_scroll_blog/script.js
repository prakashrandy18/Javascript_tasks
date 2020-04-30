const postContainer = document.getElementById('posts-container');
const loading = document.querySelector('.loader');
const filterInput = document.getElementById('filter');

let limit = 5;
let page = 1;

async function getPost(){
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);
    
    const data = await res.json();
    
    return data;
}

async function showPost(){
    const posts = await getPost(); 
    
    posts.forEach((post)=>{
        const postEL = document.createElement('div');
        postEL.classList.add('post');
        postEL.innerHTML =`
            <div class="number">${post.id}
            </div>
            <div class="post-info">
                <h2 class="post-title">${post.title}</h2>
                <p class="post-body">${post.body}<?p>
            </div>
`;

        postContainer.appendChild(postEL);
        
    });
}

showPost();

function showLoading(){
    loading.classList.add('show');
    
    setTimeout(()=>{
        loading.classList.remove('show');
        
        setTimeout(()=>{
            page++;
                    showPost();
        },300)
    }, 3000);
    
}


function filterPosts(e){
    const term = e.target.value.toUpperCase();
    
    const posts = document.querySelectorAll('.post');
    
    
    posts.forEach(p=>{
        const title = p.querySelector('.post-title').innerText.toUpperCase();
        const body = p.querySelector('.post-body').innerText.toUpperCase();
        
        if(title.indexOf(term) > -1 || body.indexOf(term) > -1){
            p.style.display = "flex";
        }else{
            p.style.display ='none';
        
        }
    });
    
}


window.addEventListener('scroll', ()=>{
    const { scrollTop, scrollHeight, clientHeight} = document.documentElement;
    
    if(scrollTop + clientHeight >= scrollHeight -5){
        showLoading();
    }
    
});


filter.addEventListener('input', filterPosts);