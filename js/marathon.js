// LiveScore
let score = 0;
let updateScore = document.getElementById("score");
let record;

// Livello
let level = 1;
let updateLevel = document.getElementById("level");
let updateLevelUp = document.getElementById("level-up");

// Funzione inizializzatrice, prepara il Canvas
function init(score){

    // Canvas
    canvas = document.getElementById("canv");
    context = canvas.getContext("2d");

    // Zoommiamo il canvas
    context.scale(2,2); 
    
    // Rettangolo vuoto bianco, indicante i bordi della gameboard
    context.strokeStyle = "white";
    context.strokeRect(8, 8, 280, 462);

    // EventListener per il movimento del blocco
    document.addEventListener("keydown", whereDoIMove);
    
    // Estraiamo il blocco, con la funzione random() dal vettore blocks, contenente tutti i blocchettini.
    let index = Math.floor(Math.random()*blocks.length);
    activeBlock = blocks[index];
    activeColor = blockColor[index];
    index = Math.floor(Math.random()*blocks.length);
    nBlock = blocks[index];
    nColor = blockColor[index];
    shape();

    record = score;

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
    }

    score += (100 * howRighe * 2);

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
        if(Y <= 2){
            // Il giocatore ha perso 
            // Poiche' ha avuto una collisione nella zona alta della gameboard !
            clearScreen();
            document.getElementById("gameOver").style.display = "unset";
            clearInterval(mainInterval);
            document.removeEventListener("keydown", whereDoIMove);
            delImg = document.getElementById("idImg");
            delImg.remove();
            upScore();
            let num = document.getElementById("numbers");
            if(score > record){
                num.innerText = score;
                updateScore.innerText = "Punteggio: " +score;
                num.id = "numbersCord";
                document.getElementById("try").innerText = "Complimenti, hai totalizzato un nuovo record !";
            }            
        } else{
            for(var i = 0; i < block.length; i++){

                // Il block[i] rappresenta il quadratino
                let xPos = block[i][1] + X;
                let yPos = block[i][0] + Y;

                // Memorizziamo il fatto che ci sia un blocco memorizzato in quella zona della gameboard, in particolare il colore
                // Memorizzare il colore ci serve nel caso di scroll verso il basso !
                helpMatrix[yPos][xPos] = activeColor;
                if(yPos > 19){
                    break;
                }
            }

            score += 4;
            change = 0;
            // Vediamo se il giocatore ha fatto un punto, cioè ha completato una riga di quadratini
            checkPoint();

            if(score> level*500){
                level++;
                updateLevel.innerText = "Livello: " + level;
                updateLevelUp.style.display = "unset";
                setTimeout(() => {
                    updateLevelUp.style.display = "none";   
                }, 1500);
                if(level && level < 5){
                    howTime-=200;
                } else if(level >= 5){
                    howTime-=150;
                    if(howTime <= 200){
                        howTime = 250;
                        // level = 0;
                    }
                } else if(level >= 10){
                    howTime -= 100;
                    if(howTime <= 200){
                        howTime = 250;
                        // level = 0;
                    }
                }
                
                clearInterval(mainInterval);
                mainInterval = window.setInterval(function(){
                    oneDirection = dirDown;
                    if(!cautionDown()){
                        delBlock();
                        Y++;
                        drawBlock();
                    }
                  }, howTime);
            }
            
            updateScore.innerText = "Punteggio: " + score;
            
            activeBlock = nBlock;
            activeColor = nColor;
            index = Math.floor(Math.random()*blocks.length);
            nBlock = blocks[index];
            nColor = blockColor[index];

            // console.log(helpMatrix);
            
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
  


function upScore(){
    // console.log("eccomi");
    var xmlHttp = new XMLHttpRequest();
    var parameter = 'level=0' + '&score='+score;

    xmlHttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          console.log(this.responseText);
        }
    };

    xmlHttp.open("POST", "http://localhost/Tetris/php/update.php", true);
    xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlHttp.send(parameter);

}


