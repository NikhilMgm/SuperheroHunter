// To Display if no characters found in Favourite page
const noFavChar = document.getElementById('noFavChar')

// looping over all the elements found in local storage if found
if(localStorage.length != 0){
    for (var i = 0; i < localStorage.length; i++) {
        // set iteration key name
        var key = localStorage.key(i);
        
        // use key name to retrieve the corresponding value
        var value = localStorage.getItem(key);
        
        const charById = `http://gateway.marvel.com/v1/public/characters/${value}?&ts=1&apikey=9ee03c81a57d11f5044f9a9679fb75b7&hash=6a59d2d0c8f88d556f02ff14854543e5`
        favChar(charById)
    }
}else{
    noFavChar.style.display = 'block'
}

// Calling api to fetch data of all characters in LocalStorage
async function favChar(charById){
    const res = await fetch(charById)
    const data = await res.json()
    renderFavChar(data.data.results)
    removeSeletedChar()
}

// Rendering all the characters present in localStorage
function renderFavChar(data){
    const ul = document.getElementById('ul')
    const li = document.createElement('li')
    li.className = "char"
    li.innerHTML = 
    `
                <div class="img">
                    <img class="charImg" src="${data[0].thumbnail.path}.jpg" alt="Not Found">
                </div>
                <div class="content">
                    <p class="name">${data[0].name}</p>
                    <button class="delBtn"name="${data[0].name}"><i class="fa-solid fa-trash "></i></button>
                </div>
    `
    ul.append(li)
}

// Removing the selected character
function removeSeletedChar(){
    const delBtn = document.querySelectorAll('.delBtn')
    delBtn.forEach((data)=>{
        console.log(data)
        data.addEventListener('click',function(){
            localStorage.removeItem(data.name)
            location.reload()
        })
    })
}