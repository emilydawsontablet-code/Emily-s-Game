let finalResult = "";

let answers = [];

const startBtn = document.getElementById("startBtn");
const startScreen = document.getElementById("startScreen");
const gameScreen = document.getElementById("gameScreen");

let questionText = document.getElementById("questionText");
let choice1 = document.getElementById("choice1");
let choice2 = document.getElementById("choice2");

let currentQuestion = 0;

const questions = [
  {
    option1: "Boy",
    option2: "Girl",
  },

  { 
    option1: "Rich",
    option2: "Smart",
  },
  { 
    option1: "Blue",
    option2: "Green",
  },
  {
    option1: "Funny",
    option2: "Pretty",
  }
];

startBtn.addEventListener("click", startGame);

function startGame() {
  startScreen.style.display = "none";
  gameScreen.style.display = "block";
  loadQuestion();
}

function loadQuestion() {
  const question = questions[currentQuestion];

  questionText.textContent = "Which Are You?";
  choice1.textContent = question.option1;
  choice2.textContent = question.option2;
}

choice1.addEventListener("click", chooseA);
choice2.addEventListener("click", chooseB);

let scoreA = 0;
let scoreB = 0;

function chooseA() {
    answers.push("A");
    scoreA++;
    nextQuestion();
}

function chooseB() {
    answers.push("B");
    scoreB++;
    nextQuestion();
}

function showResult() {
    if (scoreA > scoreB) {
        finalResult = "HappyDude472😊";
    } else if (scoreB > scoreA) {
        finalResult = "LovelyKitty330😻";
    } else {
        finalResult = "User5554321💻";
    }

    gameScreen.innerHTML = `
        <h2>📧 Your Username Is... ${finalResult}</h2>
        <button onclick="goToBlackScreen()">Continue</button>
        <button onclick="restartGame()">Restart</button>
    `;
}

function nextQuestion() {
    currentQuestion++;

    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function restartGame() {
    scoreA = 0;
    scoreB = 0;
    currentQuestion = 0;
    answers = [];

    // Rebuild game screen
    gameScreen.innerHTML = `
        <h2 id="questionText"></h2>
        <button id="choice1"></button>
        <button id="choice2"></button>
    `;

    // Re-connect buttons
    questionText = document.getElementById("questionText");
    choice1 = document.getElementById("choice1");
    choice2 = document.getElementById("choice2");

    choice1.addEventListener("click", chooseA);
    choice2.addEventListener("click", chooseB);

    loadQuestion();
}

function goToBlackScreen() {
    document.body.style.backgroundColor = "black";

    gameScreen.innerHTML = `
        <h2 id="typingText"><span id="text"></span><span id="cursor">|</span></h2>
        <button id="nextBtn" style="display:none;" onclick="startTask()">Start Task</button>
`;

    const text = `Hello ${finalResult} 👋

Welcome to MY GAME...

In this game there are no rules.
You could ride a donkey while feeding your Grandma.
You could poop on the moon while wearing a
purple polka dotted paper bag.
Your only task find me...`;

    typeWriter(text, "typingText", () => {
        document.getElementById("nextBtn").style.display = "block";
    });
}

function typeWriter(text, elementId, callback) {
    let i = 0;
    const speed = 40;

    const textElement = document.getElementById("text");
    const glitchContainer = document.getElementById("typingText");

    function type() {
        if (i < text.length) {
            textElement.innerHTML += text.charAt(i);

            // Update glitch layer text
            glitchContainer.setAttribute("data-text", textElement.innerHTML);

            // RANDOM GLITCH TRIGGER
            if (Math.random() < 0.1) {
                glitchContainer.style.transform = "translate(" + (Math.random()*4-2) + "px," + (Math.random()*4-2) + "px)";
                setTimeout(() => {
                    glitchContainer.style.transform = "translate(0,0)";
                }, 50);
            }

            i++;
            setTimeout(type, speed);
        } else if (callback) {
            callback();
        }
    }

    type();
}

function startTask(){

gameScreen.innerHTML = `
    <h2 style="color:white;">${finalResult}</h2>

    <canvas id="gardenCanvas" width="700" height="450"></canvas>

    <div id="dialogue" style="
        display:none;
        margin-top:20px;
        padding:15px;
        width:650px;
        margin-left:auto;
        margin-right:auto;
        background:#222;
        color:white;
        border:3px solid white;
        font-size:24px;
        border-radius:10px;
    ">
        <p id="dialogueText"></p>
        <button id="nextDialogueBtn" style="display:none;">Next</button>
    </div>
`;

    const canvas = document.getElementById("gardenCanvas");
    const ctx = canvas.getContext("2d");

    let player = {
        x:350,
        y:225,
        size:20
    };

const npc = {
    x:340,
    y:40,
    w:20,
    h:30
};

    // decide character features
    let shirtColor = "red";
    if(answers[2] === "A") shirtColor = "blue";
    if(answers[2] === "B") shirtColor = "lime";

    let funny = (answers[3] === "A");
    let smart = (answers[1] === "B");

    // random decorations
    const rocks = [];
    const flowers = [];
    const trees = [];
    const solids = [];

         for(let i=0;i<6;i++){

    let rock = {x:Math.random()*650,y:Math.random()*400,w:12,h:12};
    rocks.push(rock);
    solids.push(rock);

    let tree = {x:Math.random()*650,y:Math.random()*400,w:20,h:20};
    trees.push(tree);
    solids.push(tree);

    flowers.push({x:Math.random()*650,y:Math.random()*400});
}

    function draw(){

        // grass
        ctx.fillStyle="green";
        ctx.fillRect(0,0,700,450);

        // paths
        ctx.fillStyle="#c2a679";
        ctx.fillRect(330,0,40,450);
        ctx.fillRect(0,205,700,40);

        // rocks
        ctx.fillStyle="gray";
        rocks.forEach(r=>{
            ctx.fillRect(r.x,r.y,12,12);
        });

        // flowers
        ctx.fillStyle="red";
        flowers.forEach(f=>{
            ctx.fillRect(f.x,f.y,6,6);
        });

        // trees
        trees.forEach(t=>{
            ctx.fillStyle="brown";
            ctx.fillRect(t.x+6,t.y+10,8,14);
            ctx.fillStyle="darkgreen";
            ctx.fillRect(t.x,t.y,20,20);
        });

// NPC
ctx.fillStyle="#ffcc99";
ctx.fillRect(npc.x,npc.y,16,16);

ctx.fillStyle="#e30022";
ctx.fillRect(npc.x-2,npc.y+16,20,18);

ctx.fillStyle="Black";
ctx.fillRect(npc.x,npc.y+34,6,12);
ctx.fillRect(npc.x+10,npc.y+34,6,12);


        // player head
        ctx.fillStyle="#ffcc99";
        ctx.fillRect(player.x,player.y-18,16,16);

        // glasses
        if(smart){
            ctx.fillStyle="black";
            ctx.fillRect(player.x+2,player.y-10,4,4);
            ctx.fillRect(player.x+10,player.y-10,4,4);
        }

        // smile
        if(funny){
            ctx.fillStyle="black";
            ctx.fillRect(player.x+4,player.y-4,8,2);
        }

        // shirt
        ctx.fillStyle=shirtColor;
        ctx.fillRect(player.x-2,player.y,20,18);

        // legs
        ctx.fillStyle="black";
        ctx.fillRect(player.x,player.y+18,6,12);
        ctx.fillRect(player.x+10,player.y+18,6,12);
    }

    function update(){
        draw();
        requestAnimationFrame(update);
    }

    update();

function isColliding(x,y,size){

    for(let obj of solids){

        if(
            x < obj.x + obj.w &&
            x + size > obj.x &&
            y < obj.y + obj.h &&
            y + size > obj.y
        ){
            return true;
        }

    }

    return false;
}

    // movement
document.addEventListener("keydown", function(e){

    const speed=6;

    let newX = player.x;
    let newY = player.y;

    if(e.key==="ArrowUp") newY -= speed;
    if(e.key==="ArrowDown") newY += speed;
    if(e.key==="ArrowLeft") newX -= speed;
    if(e.key==="ArrowRight") newX += speed;

if(
    newX >= 0 &&
    newX + player.size <= canvas.width &&
    newY >= 0 &&
    newY + player.size <= canvas.height &&
    !isColliding(newX, newY, player.size)
){
    player.x = newX;
    player.y = newY;

    checkNpcCollision();
}

});

let talkedToNpc = false;

const npcDialogue = [
    "👤 NPC: Hello " + finalResult + "...",
    "👤Wow! I can't believe you already found me...",
    "👤Well...",
    "👤Wanna be friends?",
    "👤TOO BAD!😡"
];

let dialogueIndex = 0;

function checkNpcCollision(){

    if(talkedToNpc) return;

    if(
        player.x < npc.x + npc.w &&
        player.x + player.size > npc.x &&
        player.y < npc.y + npc.h &&
        player.y + player.size > npc.y
    ){

dialogueIndex = 0;

        talkedToNpc = true;

        document.getElementById("dialogue").style.display = "block";
        document.getElementById("dialogueText").textContent = npcDialogue[0];
        document.getElementById("nextDialogueBtn").style.display = "inline-block";

    }

}

document.getElementById("nextDialogueBtn").addEventListener("click", function(){

    dialogueIndex++;

    if(dialogueIndex < npcDialogue.length){

        document.getElementById("dialogueText").textContent =
            npcDialogue[dialogueIndex];

    }else{

        document.getElementById("dialogue").innerHTML = `
            <p>*The NPC smiles*</p>
            <button onclick="showEndScreen()">Continue</button>
        `;

    }

});

}

function showEndScreen() {
    // Make the whole page #ff0800
    document.body.style.backgroundColor = "#ff0800";

    // Replace the game with the ending screen
    gameScreen.innerHTML = `
        <div style="
            display:flex;
            justify-content:center;
            align-items:center;
            height:80vh;
        ">
            <h1 style="
                color:#120A8F;
                font-size:200px;
                font-family:Arial, sans-serif;
            ">
                The End
            </h1>
        </div>
    `;
}