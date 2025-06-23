let box=document.querySelectorAll(".x1");
let reset1=document.querySelector("#reset");
let newgame= document.querySelector("#new");
let msgcontainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");

let turnO=true;
let count=0;
const Wins=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];
box.forEach((x1) =>{ 
    x1.addEventListener("click",()=>{
        if(turnO)
        {
            x1.innerText="X";
            turnO=false;
        }
        else{
            x1.innerText="O";
            turnO=true;
        }
        x1.disabled=true;
        count++;
        let isWinner=Winner();
        if(count===9 && !isWinner)
        {
            gameDraw();
        }
    });    
});
const gameDraw=()=>{
    msg.innerText=`Game is Draw`;
    msgcontainer.classList.remove("hidden");
    disableBoxes();
};
const disableBoxes=()=>{
    for(let b1 of box )
    {
        b1.disabled=true;
    }
};
const enableBoxes=()=>{
    for(let b1 of box )
    {
        b1.disabled=false;
        b1.innerText="";
    }
};
const showWinner = (winner) => {
  msgcontainer.classList.remove("hidden");
  const text = `🎉 Congratulations,  ${winner}  wins! 👏😊`;
  const typedElement = document.getElementById("typed-winner");
  typedElement.innerText = ""; // Clear previous content

  let index = 0;
  const typingInterval = setInterval(() => {
    typedElement.innerText += text[index];
    index++;
    if (index === text.length) clearInterval(typingInterval);
  }, 60); // typing speed in ms

  disableBoxes();
};
const Winner=() =>{
    for (let pattern of Wins)
    {
        let po1value=box[pattern[0]].innerText;
        let po2value=box[pattern[1]].innerText;
        let po3value=box[pattern[2]].innerText;
        if(po1value !=""&& po2value !=""&& po3value !="")
        {
            if(po1value===po2value && po2value===po3value)
            {
                showWinner(po1value);
                return true;
            }
        }

    }
};
const resetgame =() =>{
    turnO=true;
    count=0;
    enableBoxes();
    msgcontainer.classList.add("hidden");
};
newgame.addEventListener("click",resetgame);
reset1.addEventListener("click",resetgame);
