let boxes = document.querySelectorAll(".x1");
let resetBtn = document.querySelector("#reset");
let newBtn = document.querySelector("#new");
let msgContainer = document.querySelector(".msg-container");
let typedWinner = document.querySelector("#typed-winner");

let turnO = true;
let count = 0;
let typingInterval;

const winPatterns = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6],
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "X";
    } else {
      box.innerText = "O";
    }

    turnO = !turnO;
    box.disabled = true;
    count++;

    if (checkWinner()) return;

    if (count === 9) {
      showDraw();
    }
  });
});

function showDraw() {
  msgContainer.classList.remove("hidden");
  typedWinner.innerText = "Game is Draw 🤝";
  disableBoxes();
}

function disableBoxes() {
  boxes.forEach(box => box.disabled = true);
}

function enableBoxes() {
  boxes.forEach(box => {
    box.disabled = false;
    box.innerText = "";
  });
}

function showWinner(winner) {
  msgContainer.classList.remove("hidden");

  const text = `🎉 Congratulations, ${winner} wins! 👏`;

  typedWinner.innerText = "";
  let index = 0;

  clearInterval(typingInterval);

  typingInterval = setInterval(() => {
    typedWinner.innerText += text[index];
    index++;
    if (index === text.length) {
      clearInterval(typingInterval);
    }
  }, 50);

  disableBoxes();
}

function checkWinner() {
  for (let pattern of winPatterns) {
    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;

    if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
      showWinner(pos1);
      return true;
    }
  }
  return false;
}

function resetGame() {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hidden");
  typedWinner.innerText = "";
  clearInterval(typingInterval);
}

newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
