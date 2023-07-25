let round = 0;
let chosen = new Array;
let points = 0;

document.getElementById("btn").addEventListener("click", initgame);


function initgame() {
    let board = document.getElementById("quiz");
    if(round!=0)
    {
        let elem = document.querySelector(".task");
        board.removeChild(elem);
    }
    round = 0;
    points = 0;
    board.removeChild(document.getElementById("btn"));
    let elem = document.createElement("div");
    elem.classList.add("task");
    board.appendChild(elem);
    for(let i=1; i<5; i++){
        elem = document.createElement("div");
        elem.classList.add("ans"+i);
        board.appendChild(elem);
    }
    while(chosen.length!=10)
    {
        let rand = Math.floor(Math.random()*countries_data.length)
        if(!chosen.includes(rand))
            chosen.push(rand);
    }
    nextround();
}

function board_prepare(){
    let board = document.getElementById("quiz");
    for(let i=1; i<5; i++)
        board.removeChild(document.querySelector(".ans"+i));
    for(let i=1; i<5; i++){
        elem = document.createElement("div");
        elem.classList.add("ans"+i);
        board.appendChild(elem);
    }
}

function nextround() {
    if(round>9)
        end_game();
    board_prepare();
    document.querySelector(".task").innerHTML=countries_data[chosen[round]].name;
    let correct = Math.floor(Math.random()*3+1);
    let wrong = new Array;
    while(wrong.length!=4)
    {
        let rand = Math.floor(Math.random()*countries_data.length)
        if(!wrong.includes() && rand!=chosen[round])
            wrong.push(rand);
    }
    console.log(wrong);
    for(let i=1; i<5; i++)
        document.querySelector(".ans"+i).innerHTML=countries_data[wrong[i-1]].capital;
    document.querySelector(".ans"+correct).innerHTML=countries_data[chosen[round]].capital;
    for(let i=1; i<5; i++)
    {
        if(i!=correct)
            document.querySelector(".ans"+i).addEventListener("click", function() {
                document.querySelector(".ans"+i).classList.add("wrong");
                document.querySelector(".ans"+correct).classList.add("correct");
                document.querySelector(".ans1").classList.add("disb");
                document.querySelector(".ans2").classList.add("disb");
                document.querySelector(".ans3").classList.add("disb");
                document.querySelector(".ans4").classList.add("disb");
                round++;
                setTimeout(nextround, 1500);
            });
        else
            document.querySelector(".ans"+i).addEventListener("click", function() {
                document.querySelector(".ans"+correct).classList.add("correct");
                document.querySelector(".ans1").classList.add("disb");
                document.querySelector(".ans2").classList.add("disb");
                document.querySelector(".ans3").classList.add("disb");
                document.querySelector(".ans4").classList.add("disb");
                round++;
                points++;
                setTimeout(nextround, 1000);
            });

    }
    
}

function end_game() {
    let board = document.getElementById("quiz");
    for(let i=1; i<5; i++)
        board.removeChild(document.querySelector(".ans"+i));
    let elem = document.createElement("div");
    elem = document.querySelector(".task");
    elem.innerHTML="Congratulations you've got "+points+" out of 10 answers correct!";
    board.appendChild(elem);
    elem = document.createElement("button");
    elem.addEventListener("click", initgame);
    elem.setAttribute("id", "btn");
    elem.innerHTML = "Play again"
    board.appendChild(elem);
}