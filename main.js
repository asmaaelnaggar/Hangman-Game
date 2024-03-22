const letters="abcdefghijklmnopqrstuvwxyz";

let lettersArray=Array.from(letters);

let letterscontainer=document.querySelector(".letters");

lettersArray.forEach(letter =>{
    let span=document.createElement("span");
    let theletter=document.createTextNode(letter);
    span.appendChild(theletter);
    span.className='letter-box';
    letterscontainer.appendChild(span);
});
const words={
    programming: ["php", "javascript", "go", "scala", "fortran", "r", "mysql", "python"],
    movies: ["Prestige", "Inception", "Parasite", "Interstellar", "Whiplash", "Memento", "Coco", "Up"],
    people: ["Albert Einstein", "Hitchcock", "Alexander", "Cleopatra", "Mahatma Ghandi"],
    countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"]
}

let allkeys=Object.keys(words);
let randomPropNumber=Math.floor(Math.random()*allkeys.length);
let randomPropName=allkeys[randomPropNumber];
let randomPropValue=words[randomPropName];

let randomValueNumber=Math.floor(Math.random()*randomPropValue.length);
let randomValueValue=randomPropValue[randomValueNumber];

document.querySelector(".game-info .category span").innerHTML = randomPropName;

let lettersGuessContainer=document.querySelector(".letters-guess");

let LettersAndSpace=Array.from(randomValueValue);

LettersAndSpace.forEach(letter=>{
    let emptySpan=document.createElement("span");
    if(letter === ' '){
        emptySpan.className='with-space';
    }
    lettersGuessContainer.appendChild(emptySpan);
});

let guessSpans=document.querySelectorAll(".letters-guess span");
let wrongAttempts=0;
let theDraw=document.querySelector(".hangman-draw");
let size=0;
document.addEventListener("click",(e)=>{
    let thestatus=false;
    if(e.target.className ==='letter-box'){
        e.target.classList.add("clicked");
        let theClickedLetter=e.target.innerHTML.toLowerCase();
        let theChosenWord=Array.from(randomValueValue.toLowerCase());
        theChosenWord.forEach((wordLetter ,WordIndex) =>{
            if(theClickedLetter == wordLetter){
                size++;
                thestatus=true;
                guessSpans.forEach((span,spanIndex)=>{
                    if(WordIndex === spanIndex){
                        span.innerHTML=wordLetter;
                    }
                });
                if(size === theChosenWord.length){
                    successgame();
                    letterscontainer.classList.add("finished");
                    document.getElementById("success").play();
                }
            }
            
        });
        if(thestatus !=true){
            if(wrongAttempts<=7){
                wrongAttempts++;
                theDraw.classList.add(`wrong-${wrongAttempts}`);
                document.getElementById("fail").play();
            }
            if(wrongAttempts === 8){
                endGame();
                letterscontainer.classList.add("finished");
            }
        }else{
            document.getElementById("success").play();
        }
    }

});

function endGame(){
    let div=document.createElement("div");
    let divtext=document.createTextNode(`Game Over, The Word Is ${randomValueValue}`);
    div.appendChild(divtext);
    div.className='popup';
    document.body.appendChild(div);
    document.getElementById("gameover").play();
}
function successgame(){
    let divv=document.createElement("div");
    let divvtext=document.createTextNode(`Congratulations, You win`);
    divv.appendChild(divvtext);
    divv.className='popupsucess';
    document.body.appendChild(divv);
    
}