let round = 0;
let chosen = new Array;
let points = 0;
let modet = 'name';
let modea = 'capital';

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
    modea = document.querySelector("#modea").value;
    modet = document.querySelector("#modet").value;
    board.removeChild(document.getElementById("btn"));
    board.removeChild(document.querySelector("#modet"));
    board.removeChild(document.querySelector("#modea"));
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
    while(document.querySelector(".task").hasChildNodes())
    document.querySelector(".task").removeChild(document.querySelector(".task").firstChild)
}

function nextround() {
    if(round>9)
        end_game();
    board_prepare();
    if(modet=='flag'){        
        let elem = document.createElement("img");
        elem.src=countries_data[chosen[round]][modet];
        elem.classList.add("flag");
        document.querySelector(".task").appendChild(elem);
    } else
        document.querySelector(".task").innerHTML=countries_data[chosen[round]][modet];
    let correct = Math.floor(Math.random()*3+1);
    let wrong = new Array;
    while(wrong.length!=4)
    {
        let rand = Math.floor(Math.random()*countries_data.length)
        if(!wrong.includes() && rand!=chosen[round])
            wrong.push(rand);
    }

    for(let i=1; i<5; i++){
        if(modea=='flag'){
            let elem = document.createElement("img");
            elem.src=countries_data[wrong[i-1]][modea];
            elem.classList.add("flag2");
            document.querySelector(".ans"+i).appendChild(elem);
        } else
            document.querySelector(".ans"+i).innerHTML=countries_data[wrong[i-1]][modea];
    }
    if(modea=='flag')
        document.querySelector(".ans"+correct).firstChild.src=countries_data[chosen[round]][modea]
    else
        document.querySelector(".ans"+correct).innerHTML=countries_data[chosen[round]][modea];
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
    elem = document.createElement("select");

    let opt = document.createElement("option");
    opt.value="name";
    opt.innerHTML="Country";
    elem.appendChild(opt);

    opt = document.createElement("option");
    opt.value="capital";
    opt.innerHTML="Capital";
    elem.appendChild(opt);

    opt = document.createElement("option");
    opt.value="flag";
    opt.innerHTML="Flag";
    elem.appendChild(opt);

    opt = document.createElement("option");
    opt.value="population";
    opt.innerHTML="Population";
    elem.appendChild(opt);

    opt = document.createElement("option");
    opt.value="area";
    opt.innerHTML="Area";
    elem.appendChild(opt);
    
    elem.setAttribute("id", "modet")
    board.appendChild(elem);

    elem = document.createElement("select");
    
    opt = document.createElement("option");
    opt.value="name";
    opt.innerHTML="Country";
    elem.appendChild(opt);

    opt = document.createElement("option");
    opt.value="capital";
    opt.innerHTML="Capital";
    elem.appendChild(opt);

    opt = document.createElement("option");
    opt.value="flag";
    opt.innerHTML="Flag";
    elem.appendChild(opt);

    opt = document.createElement("option");
    opt.value="population";
    opt.innerHTML="Population";
    elem.appendChild(opt);

    opt = document.createElement("option");
    opt.value="area";
    opt.innerHTML="Area";
    elem.appendChild(opt);

    elem.setAttribute("id", "modea")
    board.appendChild(elem);

    elem = document.createElement("button");
    elem.addEventListener("click", initgame);
    elem.setAttribute("id", "btn");
    elem.innerHTML = "Play again"
    board.appendChild(elem);
}