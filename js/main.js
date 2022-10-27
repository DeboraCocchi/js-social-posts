/*
Descrizione**
Ricreiamo un feed social aggiungendo al layout di base fornito, il nostro script JS in cui:
Utilizzando la base dati fornita e prendendo come riferimento il layout di esempio presente nell’html, stampiamo i post del nostro feed.
Formattare le date in formato italiano (gg/mm/aaaa)
****BONUS**
1
Se clicchiamo sul tasto “Mi Piace” cambiamo il colore al testo del bottone e incrementiamo il counter dei likes relativo.
Salviamo in un secondo array gli id dei post ai quali abbiamo messo il like.
2
Gestire l’assenza dell’immagine profilo con un elemento di fallback che contiene le iniziali dell’utente (es. Luca Formicola > LF).
3
Al click su un pulsante “Mi Piace” di un post, se abbiamo già cliccato dobbiamo decrementare il contatore e cambiare il colore del bottone.

*/


const posts = [
  {
      "id": 1,
      "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
      "media": "https://unsplash.it/600/300?image=171",
      "author": {
          "name": "Phil Mangione",
          "image": "https://unsplash.it/300/300?image=15"
      },
      "likes": 80,
      "created": "2021-06-25"
  },
  {
      "id": 2,
      "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
      "media": "https://unsplash.it/600/400?image=112",
      "author": {
          "name": "Sofia Perlari",
          "image": "https://unsplash.it/300/300?image=10"
      },
      "likes": 120,
      "created": "2021-09-03"
  },
  {
      "id": 3,
      "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
      "media": "https://unsplash.it/600/400?image=234",
      "author": {
          "name": "Chiara Passaro",
          "image": "https://unsplash.it/300/300?image=20"
      },
      "likes": 78,
      "created": "2021-05-15"
  },
  {
      "id": 4,
      "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
      "media": "https://unsplash.it/600/400?image=24",
      "author": {
          "name": "Luca Formicola",
          "image": null
      },
      "likes": 56,
      "created": "2021-04-03"
  },
  {
      "id": 5,
      "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
      "media": "https://unsplash.it/600/400?image=534",
      "author": {
          "name": "Alessandro Sainato",
          "image": "https://unsplash.it/300/300?image=29"
      },
      "likes": 95,
      "created": "2021-03-05"
  }
];

const container=document.getElementById('container');

posts.forEach(element => {
    reverseDate();
    
    const postTag =
        `
            <div class="post__header">
                <div class="post-meta">                    
                    <div class="post-meta__icon">
                        <img class="profile-pic" src="${element.author.image}" alt="${element.author.name}">                    
                    </div>
                    <div class="post-meta__data">
                        <div class="post-meta__author">${element.author.name}</div>
                        <div class="post-meta__time">${element.newDate}</div>
                    </div>                    
                </div>
            </div>
            <div class="post__text">Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.</div>
            <div class="post__image">
                <img src="${element.media}" alt="">
            </div>
            <div class="post__footer">
                <div class="likes js-likes">
                    <div class="likes__cta">
                        <a class="like-button  js-like-button" href="#" data-postid="${element.id}">
                            <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                            <span class="like-button__label">Mi Piace</span>
                        </a>
                    </div>
                    <div class="likes__counter">
                        Piace a <b id="like-counter-${element.id}" class="js-likes-counter">${element.likes}</b> persone
                    </div>
                </div> 
            </div>            
        `
       
       
        const newPostDiv = document.createElement('div');
        newPostDiv.className="post";
        newPostDiv.innerHTML = postTag;
        container.append(newPostDiv); 
});


//BONUS 1 e 3: incremento e decremento il numero di like al click del 'Mi piace'
const likeCounters = document.getElementsByClassName('js-likes-counter');
const likeButtons=document.getElementsByClassName('js-like-button');

let likedPosts = [];

for(let i=0;i<likeButtons.length;i++){
    likeButtons[i].addEventListener('click', function(){
        if(!(likedPosts.includes(posts[i].id))){
            likeButtons[i].classList.add('like-button--liked');
            likedPosts.push(posts[i].id);
            posts[i].likes +=1;
            likeCounters[i].innerHTML=posts[i].likes;
            
        }else{
            likeButtons[i].classList.remove('like-button--liked');
            posts[i].likes -=1;
            likeCounters[i].innerHTML=posts[i].likes;
            let postIndexInLikedArr = likedPosts.indexOf((posts[i].id));
            likedPosts.splice(postIndexInLikedArr,1);
        }
    })
}

function reverseDate(){
    posts.forEach(element => {
        const newDateArray= element.created.split("-");
        [newDateArray[0], newDateArray[1], newDateArray[2]] = [newDateArray[2], newDateArray[1], newDateArray[0]];
        let newDate = newDateArray.join("-");
        element["newDate"]=newDate;
        return newDate;
    });
}

//BONUS 2: sostituzione con iniziali in caso di mancata foto
for(let i=0;i<posts.length;i++){
    if(posts[i].author.image==null){
        let nameArray=posts[i].author.name.split(" "); 
        let capitalArray=[];
        capitalArray.push(nameArray[0].charAt(0));
        capitalArray.push(nameArray[1].charAt(0));
        const capitalLetters= capitalArray.join("");
        const imageSpaces = document.getElementsByClassName('post-meta__icon');
        imageSpaces[i].innerHTML = `${capitalLetters}`;
        imageSpaces[i].classList.add('profile-pic-default');
}}


