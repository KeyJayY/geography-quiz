// initial values
let round = 0;
let chosen = new Array;
let points = 0;
let modet = 'name';
let modea = 'capital';

// initializing game
function initgame() {
    let board = document.getElementById("quiz");
    if(round!=0)
    {
        let elem = document.querySelector(".task");
        board.removeChild(elem);
    }

    round = 0;
    points = 0;
    
    // removing buttons
    modea = document.querySelector("#modea").value;
    modet = document.querySelector("#modet").value;
    board.removeChild(document.getElementById("btn"));
    board.removeChild(document.querySelector("#modet"));
    board.removeChild(document.querySelector("#modea"));

    // creating board
    let elem = document.createElement("div");
    elem.classList.add("task");
    board.appendChild(elem);

    for(let i=1; i<5; i++){
        elem = document.createElement("div");
        elem.classList.add("ans"+i);
        board.appendChild(elem);
    }

    // choosing sequence of countries
    while(chosen.length!=10)
    {
        let rand = Math.floor(Math.random()*countries_data.length)
        if(!chosen.includes(rand))
            chosen.push(rand);
    }

    nextround();
}

// preparing boared between rounds
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

// setting new round
function nextround() {
    // case if game already had 10 rounds
    if(round>9)
        end_game();

    board_prepare();

    // setting question
    if(modet=='flag'){        
        let elem = document.createElement("img");
        elem.src=countries_data[chosen[round]][modet];
        elem.classList.add("flag");
        document.querySelector(".task").appendChild(elem);
    } else
        document.querySelector(".task").innerHTML=countries_data[chosen[round]][modet];
    
    // generating wrong answers
    let correct = Math.floor(Math.random()*3+1);
    let wrong = new Array;

    while(wrong.length!=4)
    {
        let rand = Math.floor(Math.random()*countries_data.length)
        if(!wrong.includes() && rand!=chosen[round])
            wrong.push(rand);
    }

    // setting wrong answer tiles
    for(let i=1; i<5; i++){
        if(modea=='flag'){
            let elem = document.createElement("img");
            elem.src=countries_data[wrong[i-1]][modea];
            elem.classList.add("flag2");
            document.querySelector(".ans"+i).appendChild(elem);
        } else
            document.querySelector(".ans"+i).innerHTML=countries_data[wrong[i-1]][modea];
    }

    // setting correct answer tile
    if(modea=='flag')
        document.querySelector(".ans"+correct).firstChild.src=countries_data[chosen[round]][modea]
    else
        document.querySelector(".ans"+correct).innerHTML=countries_data[chosen[round]][modea];

    // setting event listeners on click
    for(let i=1; i<5; i++)
    {
        if(i!=correct) // wrong answer
            document.querySelector(".ans"+i).addEventListener("click", function() {
                // change wrong and correct answers backgroung colors
                document.querySelector(".ans"+i).classList.add("wrong");
                document.querySelector(".ans"+correct).classList.add("correct");

                // disableing other tiles when one has already been clicked 
                document.querySelector(".ans1").classList.add("disb");
                document.querySelector(".ans2").classList.add("disb");
                document.querySelector(".ans3").classList.add("disb");
                document.querySelector(".ans4").classList.add("disb");
         
                // iterating round number
                round++;
                setTimeout(nextround, 1500);
            });
        else // correct answer
            document.querySelector(".ans"+i).addEventListener("click", function() {
                // change correct answer backgroung color
                document.querySelector(".ans"+correct).classList.add("correct");

                // disableing other tiles when one has already been clicked 
                document.querySelector(".ans1").classList.add("disb");
                document.querySelector(".ans2").classList.add("disb");
                document.querySelector(".ans3").classList.add("disb");
                document.querySelector(".ans4").classList.add("disb");

                // iterating round number and points count                
                round++;
                points++;
                setTimeout(nextround, 1000);
            });

    }
    
}

// ending game
function end_game() {
    let board = document.getElementById("quiz");

    // removing answer tiles
    for(let i=1; i<5; i++)
        board.removeChild(document.querySelector(".ans"+i));
    
    // giving feedback with count of points to player
    let elem = document.querySelector(".task");
    elem.innerHTML="Congratulations you've got "+points+" out of 10 answers correct!";

    // creating select boxes with game modes 
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
    opt.setAttribute("selected" , "selected");
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

    // creating play again button
    elem = document.createElement("button");
    elem.addEventListener("click", initgame);
    elem.setAttribute("id", "btn");
    elem.innerHTML = "Play again";
    board.appendChild(elem);
}


// functions for dictionary

// setting all tiles
function setTiles(){
    board = document.querySelector(".countries");
    for(let i=0; i<countries_data.length; i++){
        const elem = document.createElement("div");
        elem.setAttribute("id", "t" + i.toString());
        elem.setAttribute("class", "countrytile");

        elem.innerHTML = '<img class="flagtile" src="'+ countries_data[i].flag +'"></img><br>Name: ' + countries_data[i].name +'<br>Capital: ' + countries_data[i].capital;

        if("population" in countries_data[i])
            elem.innerHTML += '<br>Population: ' + countries_data[i].population.toLocaleString("en-US");
        else
            elem.innerHTML += '<br>Population: -';

        if("area" in countries_data[i])
            elem.innerHTML += '<br>Area: ' + countries_data[i].area.toLocaleString("en-US");
        else
            elem.innerHTML += '<br>Area: -';
        board.appendChild(elem);
        
    }
}

// searching for exact result
function search(){
    let bar = document.querySelector("#search");
    for(let i=0; i<countries_data.length; i++){
        if(!countries_data[i].name.toUpperCase().includes(bar.value.toUpperCase()))
            document.querySelector("#t"+i.toString()).style.display = "none";
        else
            document.querySelector("#t"+i.toString()).style.display = "block";
    }
}
