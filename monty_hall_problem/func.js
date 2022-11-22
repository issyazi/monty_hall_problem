//задать открытие\закрытие дверей через 3 переменные которым на рандоме ставм тру фолс
//29 nov
//isNaN

var numWinAll = 0;
var numWinChange = 0;
var numWinStay = 0;
var numLossAll = 0;
var numLossChange = 0;
var numLossStay = 0;
var numGames = 0;
var StatusOfGame = "Pick one of three doors";

var stats = document.getElementById('stats');
stats.innerHTML = StatusOfGame;

var win = document.getElementById('win');
win.innerHTML = numWinAll;

var win_change = document.getElementById('win_change');
win_change.innerHTML = numWinChange;

var win_stay = document.getElementById('win_stay');
win_stay.innerHTML = numWinStay;

var loss = document.getElementById('loss');
loss.innerHTML = numLossAll;

var loss_change = document.getElementById('loss_change');
loss_change.innerHTML = numLossChange;

var loss_stay = document.getElementById('loss_stay');
loss_stay.innerHTML = numLossStay;

var games = document.getElementById('games');
games.innerHTML = numGames;

var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

var imageOpenDoor = new Image();
imageOpenDoor.src = 'images/open_door.png' 
var imageCloseDoor = new Image();
imageCloseDoor.src ='images/close_door.png' 
var imageCheck = new Image();
imageCheck.src = 'images/click.png' 
var imageGoat = new Image();
imageGoat.src = 'images/kozel.png' 
var imageCar = new Image();
imageCar.src = 'images/car.png' 

var carDoor = Math.floor(Math.random() * 3);
var goatDoors = []; 
i = -1
 while(++i < 3) {
    if (i != carDoor) {goatDoors.push(i)};
}

imageCloseDoor.onload = function() {
    context.drawImage(imageCloseDoor, 0,0,200, 323);
    context.drawImage(imageCloseDoor, 300,0,200, 323);
    context.drawImage(imageCloseDoor, 600,0,200, 323);
};

var doors = [false,false,false]; 
var turn = 0; 
var check = 0; 
var openDoor = 0; 

canvas.addEventListener('click', function(event) {
    var rect = canvas.getBoundingClientRect();
    var x = event.pageX - rect.left;
    var y = event.pageY - rect.top;


    if(turn == -1){
        StatusOfGame = "Pick one of three doors";
        doors = [false,false,false];
        openDoor = 0;
        carDoor = Math.floor(Math.random() * 3);
        goatDoors = [];
        i = -1
        while(++i < 3) {
            if (i != carDoor) {goatDoors.push(i)};
        }
        context.clearRect(0,0,canvas.width,canvas.height)
        context.drawImage(imageCar, carDoor*300,0,200, 323);
        goatDoors.forEach(function(d){context.drawImage(imageGoat, d*300,0,200, 323);});
        context.drawImage(imageCloseDoor, 0,0,200, 323);
        context.drawImage(imageCloseDoor, 300,0,200, 323);
        context.drawImage(imageCloseDoor, 600,0,200, 323); 
        ++turn;
        stats.innerHTML = StatusOfGame;
    } 
    else if (turn == 0){
        StatusOfGame = "Pick next door";
        check = 0;
        if (x < 300 && x > 0) {check = 0;}
        if (x < 600 && x > 300) {check = 1;}
        if (x < 800 && x > 600) {check = 2;}

        openDoor = Math.floor(Math.random() * 3);

        while(openDoor == check || openDoor == carDoor){
            openDoor = Math.floor(Math.random() * 3);
        }
        doors[openDoor] = true;
        context.clearRect(0,0,canvas.width,canvas.height);
        context.drawImage(imageCar, carDoor*300,0,200,323);
        goatDoors.forEach(function(d){context.drawImage(imageGoat, d*300,0,200, 323);});
        i = -1;
        while(++i < 3){
            if(!doors[i]){
                context.drawImage(imageCloseDoor, i*300,0,200, 323);
            }
            else{
                context.drawImage(imageOpenDoor, i*300,0,200, 323);
            }
        }
        context.drawImage(imageCheck, check*300,0,200,323);
        ++turn;
        stats.innerHTML = StatusOfGame;
    }
    else{
        if (turn > 0){
            open = 0;
            if (x < 300 && x > 0) {open = 0;}
            if (x < 600 && x > 300) {open = 1;}
            if (x < 800 && x > 600) {open = 2;}

            if(open == openDoor){
                return;
            }
            doors[open] = true;
            context.clearRect(0,0,canvas.width,canvas.height)
            context.drawImage(imageCar, carDoor*300,0,200,323);
            goatDoors.forEach(function(d){context.drawImage(imageGoat, d*300,0,200,323);});
            i = -1;
            while(++i < 3){
                if(!doors[i]){
                    context.drawImage(imageCloseDoor, i*300,0,200,323);
                }
                else{
                    context.drawImage(imageOpenDoor, i*300,0,200,323);
                }
            }
            context.drawImage(imageCheck, check*300,0,200,323);

            if(open == carDoor){
                if(open == check){
                    ++numWinStay
                    ++numWinAll;
                }
                else{
                    ++numWinChange
                    ++numLossAll;
                }
                StatusOfGame = "You win!";
                ++numGames;
            }
            else {
                if(open == check){
                    ++numLossStay
                    ++numWinAll;
                }
                else{
                    ++numLossChange
                    ++numLossAll;
                }
                StatusOfGame = "You lose!";
                ++numGames;
            }
            stats.innerHTML = StatusOfGame;
            win.innerHTML = numWinAll;
            win_change.innerHTML = numWinChange;
            win_stay.innerHTML = numWinStay;
            loss.innerHTML = numLossAll;
            loss_change.innerHTML = numLossChange;
            loss_stay.innerHTML = numLossStay;
            games.innerHTML = numGames;

            turn = -1;
        };
    }
    }, false);