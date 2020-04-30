 const form = document.getElementById('form'),
       search = document.getElementById('search'),
       result = document.getElementById('result'),
        more= document.getElementById('more');


const apiURL = 'https://api.lyrics.ovh';

async function searchSongs(term){
        const res = await fetch(`${apiURL}/suggest/${term}`);
        const data = await res.json();
    console.log(data);
    
    showDataDOM(data);
}


async function showDataDOM(data){
    
    result.innerHTML = `
        <ul class="songs">
            ${data.data.map((songs)=>
                `<li><span><strong>${songs.artist.name}</strong> - ${songs.title}</span> 
                <button class="btn" data-artist="${songs.artist.name}" data-songtitle="${songs.title}">Get Lyrics</button>
</li>`).join('')}
        </ul>
    
    `;
    
    
    if(data.prev || data.next){
        more.innerHTML = `
            ${data.prev 
            ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Prev</button>` : ''}
            ${
            data.next   
            ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>` : ''}
`;
    }else{
        more.innerHTML = '';
    }
}



async function getMoreSongs(url){
    const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
    const data = await res.json();
    showDataDOM(data);
}



async function getLyrics(artist, songTitle){
     const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
    const data = await res.json();
    
    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');
    
    result.innerHTML =`<h2><strong>${artist}</strong> - ${songTitle}</h2>
        <span>${lyrics}</span>`;
    more.innerHTML = '';
    
    
}


form.addEventListener('submit', e=>{
    e.preventDefault();
    
    const searchTerm = search.value;
    
    if(!searchTerm == ""){
        searchSongs(searchTerm);
    }else{
        alert('Please fill to search!!');
    }
});


result.addEventListener('click',e => {
    const clickedEL = e.target;
    
    if(clickedEL.tagName === 'BUTTON'){
        const artist = clickedEL.getAttribute('data-artist');
        const songTitle = clickedEL.getAttribute('data-songtitle');
        
        getLyrics(artist, songTitle);
        
    }
})
