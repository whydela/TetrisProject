let livello;

// Obiettivo
let goal = document.getElementById("goal");

// Mosse
let moves = document.getElementById("moves");
let mosse;

// Righe
let rows = document.getElementById("rows");
let righe;

let color;

// Funzione inizializzatrice, prepara il Canvas
function init(level){

    // Canvas
    canvas = document.getElementById("canv");
    context = canvas.getContext("2d");

    // Zoommiamo il canvas
    context.scale(2,2); 
    
    // Rettangolo vuoto bianco, indicante i bordi della gameboard
    context.strokeStyle = "yellow";
    context.strokeRect(8, 8, 280, 462);
    context.strokeStyle = "red";
    context.strokeRect(6, 6, 284, 466);

    // EventListener per il movimento del blocco
    document.addEventListener("keydown", whereDoIMove);
    
    // Estraiamo il blocco, con la funzione random() dal vettore blocks, contenente tutti i blocchettini.
    let index = Math.floor(Math.random()*blocks.length);
    activeBlock = blocks[index];
    activeColor = blockColor[index];
    index = Math.floor(Math.random()*blocks.length);
    nBlock = blocks[index];
    nColor = blockColor[index];
    drawLevel(level);
    livello = level;
    shape();
    let img = document.createElement('img');
    img.id = "idImg";
    img.setAttribute('src', "../img/blocchi/" + nColor + ".png");
    let larg = (nColor == "yellow") ? 120 : 170;
    img.setAttribute("width", larg);
    let div = document.getElementById("nBlock");
    div.appendChild(img);

    
    // Disegniamo il primo blocco
    drawBlock();
    
}

function drawLevel(level){
    switch (level) {
        case 1:
            mosse = 50;
            righe = 9;
            goal.innerText = "Completa " + righe + " Righe in " + mosse + " Mosse";
            moves.innerText = "Mosse: " + mosse;
            rows.innerText = "Righe: " + righe;
            document.getElementById("good").innerText = "Hai sbloccato una nuova skin";
            for(var j = 0; j < 12; j++){
                for(var i = 0; i < 20; i++){
                    if(i == 13){
                        let xPos = j;
                        let yPos = i;
                        if(j < 5){
                            // Settiamo a 1 la cella della matrice booleana, indicante che in quella posizione e' presente il blocco
                            boolMatrix[yPos][xPos] = 1;
                            helpMatrix[yPos][xPos] = "yellow";
                            // Estraiamo le coordinate pixelose dalla matrice pixelosa
                            let pixelX = pixelMatrix[yPos][xPos].x;
                            let pixelY = pixelMatrix[yPos][xPos].y;
                            context.fillStyle = "yellow";
                            context.fillRect(pixelX, pixelY, 21, 21);
                        } else if(j > 6){
                            boolMatrix[yPos][xPos] = 1;
                            let pixelX = pixelMatrix[yPos][xPos].x;
                            let pixelY = pixelMatrix[yPos][xPos].y;
                            helpMatrix[yPos][xPos] = "red";
                            context.fillStyle = "red";
                            context.fillRect(pixelX, pixelY, 21, 21);
                        }
                    }
                    else if(i > 13){
                        let xPos = j;
                        let yPos = i;
                        if(j < 2){
                            // Settiamo a 1 la cella della matrice booleana, indicante che in quella posizione e' presente il blocco
                            boolMatrix[yPos][xPos] = 1;
                            helpMatrix[yPos][xPos] = "yellow";
                            // Estraiamo le coordinate pixelose dalla matrice pixelosa
                            let pixelX = pixelMatrix[yPos][xPos].x;
                            let pixelY = pixelMatrix[yPos][xPos].y;
                            
                            context.fillStyle = "yellow";
                            context.fillRect(pixelX, pixelY, 21, 21);
                        } else if(j > 9){
                            boolMatrix[yPos][xPos] = 1;
                            let pixelX = pixelMatrix[yPos][xPos].x;
                            let pixelY = pixelMatrix[yPos][xPos].y;
                            helpMatrix[yPos][xPos] = "red";
                            context.fillStyle = "red";
                            context.fillRect(pixelX, pixelY, 21, 21);
                        }
                    }
                }
            }
        break;

        case 2:
            mosse = 35;
            righe = 6;
            goal.innerText = "Completa " + righe + " Righe in " + mosse + " Mosse";
            moves.innerText = "Mosse: " + mosse;
            rows.innerText = "Righe: " + righe;
            document.getElementById("good").innerText = "Hai sbloccato un nuovo tema";

            for(var j = 0; j < 12; j++){
                for(var i = 0; i < 20; i++){
                    if(i > 13){

                        let xPos = j;
                        let yPos = i;
                        if(j < 2 || j==4 || j == 5 || j ==8 || j==9){
                            // Settiamo a 1 la cella della matrice booleana, indicante che in quella posizione e' presente il blocco
                            boolMatrix[yPos][xPos] = 1;
                            helpMatrix[yPos][xPos] = "cyan";
                            // Estraiamo le coordinate pixelose dalla matrice pixelosa
                            let pixelX = pixelMatrix[yPos][xPos].x;
                            let pixelY = pixelMatrix[yPos][xPos].y;
                            context.fillStyle = "cyan";
                            context.fillRect(pixelX, pixelY, 21, 21);
                        }
                    }
                }
            }

        break;

        case 3:
            mosse = 35;
            righe = 8;

            goal.innerText = "Completa " + righe + " Righe in " + mosse + " Mosse";
            moves.innerText = "Mosse: " + mosse;
            rows.innerText = "Righe: " + righe;
            document.getElementById("good").innerText = "Hai sbloccato una nuova skin";
              
            let index = 5;
            let lun = 2;
            for(var i = 0; i < 6; i++){
                switch (i) {
                    case 0:
                        color = "yellow";
                        break;
                    case 1:
                        color = "orange";
                        break;
                    case 2:
                        color = "red";
                        break;
                    case 3:
                        color = "green";
                        break;
                    case 4:
                        color = "cyan";
                        break;
                    case 5:
                        color = "blue";
                        break;
                    default:
                        break;
                }
                for(var j = 0; j < lun; j++){
                    let xPos = j+index-i;
                    let yPos = i+14;
                    // Settiamo a 1 la cella della matrice booleana, indicante che in quella posizione e' presente il blocco
                    boolMatrix[yPos][xPos] = 1;
                    helpMatrix[yPos][xPos] = color;
                    // Estraiamo le coordinate pixelose dalla matrice pixelosa
                    let pixelX = pixelMatrix[yPos][xPos].x; 
                    let pixelY = pixelMatrix[yPos][xPos].y;
                    context.fillStyle = color;
                    context.fillRect(pixelX, pixelY, 21, 21);
                }
                lun+=2;
            }
            

        break;
        
        case 4:
            mosse = 45;
            righe = 5;
            goal.innerText = "Completa " + righe + " Righe in " + mosse + " Mosse"; 
            moves.innerText = "Mosse: " + mosse;
            rows.innerText = "Righe: " + righe;
            document.getElementById("good").innerText = "Hai sbloccato un nuovo tema";
            let wow = 2;
            context.fillStyle = "green";
            for(var i = 1; i < 12; i+=2){
                for(var j = wow+7; j < 20; j++){
                    let xPos = i;
                    let yPos = j;
                    // Settiamo a 1 la cella della matrice booleana, indicante che in quella posizione e' presente il blocco
                    boolMatrix[yPos][xPos] = 1;
                    helpMatrix[yPos][xPos] = "green";
                    // Estraiamo le coordinate pixelose dalla matrice pixelosa
                    let pixelX = pixelMatrix[yPos][xPos].x; 
                    let pixelY = pixelMatrix[yPos][xPos].y;
                    context.fillRect(pixelX, pixelY, 21, 21);
                }
                wow+=2;
            }
            
            
        break;

        case 5:
            mosse = 45;
            righe = 10;
            goal.innerText = "Completa " + righe + " Righe in " + mosse + " Mosse"; 
            moves.innerText = "Mosse: " + mosse;
            rows.innerText = "Righe: " + righe;
            document.getElementById("good").innerText = "Hai sbloccato un nuovo tema";

            for(var i = 0; i < 4; i++){
                switch (i) {
                    case 0:
                        color = "red";
                        break;
                    case 1:
                        color = "yellow";
                        break;
                    case 2:
                        color = "cyan";
                        break;
                        case 3:
                        color = "green";
                        break;
                    default:
                        break;
                }
                for(var j = 0; j < 5; j++){
                    let xPos = j;
                    let yPos = i+16;
                    if(j == 4){
                        color = "purple";
                    }
                    // Settiamo a 1 la cella della matrice booleana, indicante che in quella posizione e' presente il blocco
                    boolMatrix[yPos][xPos] = 1;
                    helpMatrix[yPos][xPos] = color;
                    // Estraiamo le coordinate pixelose dalla matrice pixelosa
                    let pixelX = pixelMatrix[yPos][xPos].x; 
                    let pixelY = pixelMatrix[yPos][xPos].y;
                    context.fillStyle = color;
                    context.fillRect(pixelX, pixelY, 21, 21);
                }
            }
            color = "cyan";
            for(var j = 0; j < 4; j++){
                let xPos = j+5;
                let yPos = 19;
                // Settiamo a 1 la cella della matrice booleana, indicante che in quella posizione e' presente il blocco
                boolMatrix[yPos][xPos] = 1;
                helpMatrix[yPos][xPos] = color;
                // Estraiamo le coordinate pixelose dalla matrice pixelosa
                let pixelX = pixelMatrix[yPos][xPos].x; 
                let pixelY = pixelMatrix[yPos][xPos].y;
                context.fillStyle = color;
                context.fillRect(pixelX, pixelY, 21, 21);
            }
            
            
        break;
        
        case 6:
            mosse = 55;
            righe = 15;
            goal.innerText = "Completa " + righe + " Righe in " + mosse + " Mosse"; 
            moves.innerText = "Mosse: " + mosse;
            rows.innerText = "Righe: " + righe;
            document.getElementById("good").innerText = "Hai sbloccato un nuovo tema";

            color = "green";
            context.fillStyle = color;
            boolMatrix[17][0] = 1;
            helpMatrix[17][0] = color;
            let pixelX = pixelMatrix[17][0].x; 
            let pixelY = pixelMatrix[17][0].y;
            context.fillRect(pixelX, pixelY, 21, 21);
            boolMatrix[18][0] = 1;
            helpMatrix[18][0] = color;
            pixelX = pixelMatrix[18][0].x; 
            pixelY = pixelMatrix[18][0].y;
            context.fillRect(pixelX, pixelY, 21, 21);
            boolMatrix[16][1] = 1;
            helpMatrix[16][1] = color;
            pixelX = pixelMatrix[16][1].x; 
            pixelY = pixelMatrix[16][1].y;
            context.fillRect(pixelX, pixelY, 21, 21);
            boolMatrix[17][1] = 1;
            helpMatrix[17][1] = color;
            pixelX = pixelMatrix[17][1].x; 
            pixelY = pixelMatrix[17][1].y;
            context.fillRect(pixelX, pixelY, 21, 21);
            color = "purple";
            context.fillStyle = color;
            boolMatrix[19][0] = 1;
            helpMatrix[19][0] = color;
            pixelX = pixelMatrix[19][0].x; 
            pixelY = pixelMatrix[19][0].y;
            context.fillRect(pixelX, pixelY, 21, 21);
            boolMatrix[19][1] = 1;
            helpMatrix[19][1] = color;
            pixelX = pixelMatrix[19][1].x; 
            pixelY = pixelMatrix[19][1].y;
            context.fillRect(pixelX, pixelY, 21, 21);
            boolMatrix[19][2] = 1;
            helpMatrix[19][2] = color;
            pixelX = pixelMatrix[19][2].x; 
            pixelY = pixelMatrix[19][2].y;
            context.fillRect(pixelX, pixelY, 21, 21);
            boolMatrix[18][1] = 1;
            helpMatrix[18][1] = color;
            pixelX = pixelMatrix[18][1].x; 
            pixelY = pixelMatrix[18][1].y;
            context.fillRect(pixelX, pixelY, 21, 21);
            color = "red";
            context.fillStyle = color;
            boolMatrix[18][2] = 1;
            helpMatrix[18][2] = color;
            pixelX = pixelMatrix[18][2].x; 
            pixelY = pixelMatrix[18][2].y;
            context.fillRect(pixelX, pixelY, 21, 21);
            boolMatrix[18][3] = 1;
            helpMatrix[18][3] = color;
            pixelX = pixelMatrix[18][3].x; 
            pixelY = pixelMatrix[18][3].y;
            context.fillRect(pixelX, pixelY, 21, 21);
            boolMatrix[19][3] = 1;
            helpMatrix[19][3] = color;
            pixelX = pixelMatrix[19][3].x; 
            pixelY = pixelMatrix[19][3].y;
            context.fillRect(pixelX, pixelY, 21, 21);
            boolMatrix[19][4] = 1;
            helpMatrix[19][4] = color;
            pixelX = pixelMatrix[19][4].x; 
            pixelY = pixelMatrix[19][4].y;
            context.fillRect(pixelX, pixelY, 21, 21);
        break;

        case 7:
            mosse = 45;
            righe = 10; 
            goal.innerText = "Completa " + righe + " Righe in " + mosse + " Mosse"; 
            moves.innerText = "Mosse: " + mosse;
            rows.innerText = "Righe: " + righe;
            document.getElementById("good").innerText = "Hai sbloccato una nuova skin";
            for(var i = 0; i < 5; i++){
                if(i < 3){
                    color = "orange";
                } else{
                    color = "yellow";
                }
                context.fillStyle = color;
                boolMatrix[i+15][0] = 1;
                helpMatrix[i+15][0] = color;
                let pixelX = pixelMatrix[i+15][0].x; 
                let pixelY = pixelMatrix[i+15][0].y;
                context.fillRect(pixelX, pixelY, 21, 21);
            }

            for(var j = 0; j < 2; j++){
                for(var i = 0; i < 3; i++){
                    if(i < 1){
                        color = "orange";
                    } else{
                        color = "yellow";
                    }
                    context.fillStyle = color;
                    boolMatrix[i+17][j+1] = 1;
                    helpMatrix[i+17][j+1] = color;
                    let pixelX = pixelMatrix[i+17][j+1].x; 
                    let pixelY = pixelMatrix[i+17][j+1].y;
                    context.fillRect(pixelX, pixelY, 21, 21);
                }
            }

            for(var j = 0; j < 2; j++){
                for(var i = 0; i < 3; i++){
                    color = "cyan";
                    if(!j || i == 2){
                        color = "blue";
                    }
                    context.fillStyle = color;
                    boolMatrix[i+17][j+9] = 1;
                    helpMatrix[i+17][j+9] = color;
                    let pixelX = pixelMatrix[i+17][j+9].x; 
                    let pixelY = pixelMatrix[i+17][j+9].y;
                    context.fillRect(pixelX, pixelY, 21, 21);
                }
            }

            for(var i = 0; i < 5; i++){
                if(i < 4){
                    color = "cyan";
                } else{
                    color = "blue";
                }
                context.fillStyle = color;
                boolMatrix[i+15][11] = 1;
                helpMatrix[i+15][11] = color;
                let pixelX = pixelMatrix[i+15][11].x; 
                let pixelY = pixelMatrix[i+15][11].y;
                context.fillRect(pixelX, pixelY, 21, 21);
            }

            

        break;
        
        case 8:
            mosse = 45;
            righe = 10; 
            goal.innerText = "Completa " + righe + " Righe in " + mosse + " Mosse"; 
            moves.innerText = "Mosse: " + mosse;
            rows.innerText = "Righe: " + righe;
            document.getElementById("good").innerText = "Hai sbloccato un nuovo tema";
            color = "purple";
            for(var j = 0; j < 2; j++){
                for(var i = 0; i < 12; i++){
                    if(!j){
                        if(i>2 && i<7){
                            continue;
                        }
                    }else{
                        if(i>3 && i<6){
                            continue;
                        }
                    }
                    context.fillStyle = color;
                    boolMatrix[j+18][i] = 1;
                    helpMatrix[j+18][i] = color;
                    let pixelX = pixelMatrix[j+18][i].x; 
                    let pixelY = pixelMatrix[j+18][i].y;
                    context.fillRect(pixelX, pixelY, 21, 21);
                }
            }
            break;

        case 9:
            document.getElementById("good").innerText = "Hai sbloccato una nuova skin";
            mosse = 50;
            righe = 1; 
            goal.innerText = "Completa " + righe + " Righe in " + mosse + " Mosse"; 
            moves.innerText = "Mosse: " + mosse;
            rows.innerText = "Righe: " + righe;
            color = "red";
            for(var j = 0; j < 2; j++){
                for(var i = 0; i < 10; i++){
                    context.fillStyle = color;
                    boolMatrix[j+10][i+1] = 1;
                    helpMatrix[j+10][i+1] = color;
                    let pixelX = pixelMatrix[j+10][i+1].x; 
                    let pixelY = pixelMatrix[j+10][i+1].y;
                    context.fillRect(pixelX, pixelY, 21, 21);
                }
            }

            for(var j = 0; j < 2; j++){
                for(var i = 0; i < 10; i++){
                    context.fillStyle = color;
                    boolMatrix[i+10][j+5] = 1;
                    helpMatrix[i+10][j+5] = color;
                    let pixelX = pixelMatrix[i+10][j+5].x; 
                    let pixelY = pixelMatrix[i+10][j+5].y;
                    context.fillRect(pixelX, pixelY, 21, 21);
                }
            }
            break;

        default:
            break;
    }
}

// Questa funzione previene la collisione con la parte inferiore della gameboard
function cautionDown(){


    // Quello che si fa e' controllare, prima che il blocco scenda se dovra' essere fermato o meno, cio' viene fatto utilizzando 
    // una variabile ausiliaria: block. Questa variabile e' come se fosse una simulazione invisibile del blocco che va giù e può
    // collidere con altri
    let block = activeBlock;

    // Variabile booleana che ci dice se c'e' stata una collisione
    let help = false;

    for(var i = 0; i < block.length; i++){

        // Prendiamo le coordinate di ogni quadratino del blocco
        let xPos = block[i][1] + X;
        let yPos = block[i][0] + Y;

        // Se la direzione è verso giù, si incrementa la variabile delle Y
        if(oneDirection == dirDown){
             yPos++;
        }

        // Se arriviamo in fondo adios amigos, sennò dà problemi dopo
        if(yPos > 19){

            // Segnaliamo la collisione
            help = true;
            break;

        }

        // Se non siamo in fondo e la matrice aiutante ci dice che c'è un blocco sotto un quadratino che stiamo supervisionando 
        if(yPos < 19 && helpMatrix[yPos+1][xPos]){

                // Eliminiamo il blocco
                delBlock();

                // Incrementiamo la variabile Y
                Y++;

                // Disegniamo il blocco nel livello sottostante (abbiamo incrementato la Y)
                drawBlock();

                // Segnaliamo la collisione
                help = true;

                break;
            }
    }
    
    if(help){
        mosse--;
        if(Y <= 2){
            // Il giocatore ha perso 
            // Poiche' ha avuto una collisione nella zona alta della gameboard !
            clearScreen();
            document.getElementById("gameOver").style.display = "unset";
            clearInterval(mainInterval);
            document.removeEventListener("keydown", whereDoIMove);
            delImg = document.getElementById("idImg");
            delImg.remove();
            
        } else{
            for(var i = 0; i < block.length; i++){
                
                // Il block[i] rappresenta il quadratino
                let xPos = block[i][1] + X;
                let yPos = block[i][0] + Y;
                
                // Memorizziamo il fatto che ci sia un blocco memorizzato in quella zona della gameboard, in particolare il colore
                // Memorizzare il colore ci serve nel caso di scroll verso il basso !
                if(yPos > 19){
                    break;
                }
                helpMatrix[yPos][xPos] = activeColor;
            }
            
            change = 0;
            
            // Vediamo se il giocatore ha fatto un punto, cioè ha completato una riga di quadratini
            checkPoint();

            if(mosse <= 0){
                clearScreen();
                document.getElementById("gameOver").style.display = "unset";
                clearInterval(mainInterval);
                moves.innerText = "Mosse: 0";
                document.removeEventListener("keydown", whereDoIMove);
                delImg = document.getElementById("idImg");
                delImg.remove();
                return;
            }
            
            moves.innerText = "Mosse: " + mosse; 
            // // Si estrae un altro blocco che parte dall'inizio
            // let index = Math.floor(Math.random()*blocks.length);
            // activeBlock = blocks[index];
            // activeColor = blockColor[index];
            
            activeBlock = nBlock;
            activeColor = nColor;
            index = Math.floor(Math.random()*blocks.length);
            nBlock = blocks[index];
            nColor = blockColor[index];
            
            delImg = document.getElementById("idImg");
            if(delImg){
                delImg.remove();
            }
            img = document.createElement("img");
            img.id = "idImg";
            img.setAttribute('src', "../img/blocchi/" + nColor + ".png");
            let larg = (nColor == "yellow") ? 120 : 170;
            img.setAttribute("width", larg);
            let div = document.getElementById("nBlock");
            div.appendChild(img);
            
            // No direzione
            oneDirection = 0;
            
            // Si settano le variabili iniziali
            X = 4;
            Y = 0;
            
            // Disegniamo il nuovo blocco 
            drawBlock();
            
            setTimeout(() => {
                shape();
            }, 100);

        }
    }

    return help;

}

function checkPoint(){
 
    let from;
    let howRighe = 0;
 
    for (let j = 0; j < 20; j++){
        let done = true;
        // Si scorrono tutte i quadratini di una riga
        for(let i = 0; i < 12; i++){

            let littleBlock = helpMatrix[j][i];
            // No disegno
            if (!littleBlock){
                // Nel caso in cui una riga ha un quadrato vuoto si puo' uscire dal ciclo 
                done = false;
                break;
            }
        }
        
        // Se tutti i quadratini di una riga sono presenti, cioe' abbiamo ciclato 12 volte
        if(done){

            // Se siamo alla prima riga dovremo iniziare a cancellare, sia nel caso di una riga sia nel caso di n righe dalla prima
            // cioe' la riga j
            from = (!howRighe) ? j : from;        

            // Incrementiamo le righe da dover "cancellare"
            howRighe++;
            
            for(var i = 0; i < 12; i++){

                // Rendiamo consistenti le matrici, cioe' memorizziamo il fatto che in quella cella non vi e' più un quadratino
                helpMatrix[j][i] = 0;
                boolMatrix[j][i] = 0;

                // console.log(pixelMatrix);

                // Estriamo le coordinate pixelose
                let pixelX = pixelMatrix[j][i].x;
                let pixelY = pixelMatrix[j][i].y;

                // Piccola animazione gestita con timeout
                context.fillStyle = "white";
                context.fillRect(pixelX, pixelY, 21, 21);
                
                // Usiamo delle coordinate di backup, non mi fido dei timeout...
                let backupX = pixelX;
                let backupY = pixelY;

                // Poi dovranno ritornare neri
                setTimeout(()=>{
                    context.fillStyle = "black";
                    context.fillRect(backupX, backupY, 21, 21);
                }, 50);
            }
        }
    }

    // Se abbiamo cancellato qualcosa dobbiamo fare il famoso scroll verso il basso
    if(howRighe){
        setTimeout(()=>{
            scrollDown(howRighe, from);
        }, 100);
        righe -= howRighe;
        if(righe <= 0){
            clearScreen();
            setTimeout(() => {
                rows.innerText = "Righe: 0";
                document.getElementById("win").style.display = "unset";
                clearInterval(mainInterval);
                document.removeEventListener("keydown", whereDoIMove);
                delImg = document.getElementById("idImg");
                delImg.remove();
                updateLevel();
            }, 50);
            return;
        }
        rows.innerText = "Righe: " + righe;
    }


}

function updateLevel(){

    var xmlHttp = new XMLHttpRequest();
    var parameter = 'level=' + livello + '&score=0';

    // console.log(parameter);
    
    xmlHttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          console.log(this.responseText);
        }
    };

    xmlHttp.open("POST", "http://localhost/Tetris/php/update.php", true);
    xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlHttp.send(parameter);

}

