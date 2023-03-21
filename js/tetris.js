// Classe contenente le coordinate (pixelose) dove possono essere disegnati i blocchi
class Coordinate{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}

// Altezza del Gameboard
let AltBoard = 20;
// Larghezza del Gameboard
let LargBoard = 12;

// Variabili che ci dicono in che coordinate si trova il blocco attivo, la X e' settata a 4 perche' vogliamo che il blocchettino 
// si generi leggermente a destra rispetto all'inizio del Canvas
let X = 4;
let Y = 0;

// LiveScore
let score = 0;
// Livello
let level = 1;

// Matrice contentente per ogni locazione una coordinata x e y indicanti il numero di pixel dove verrà costruito il blocchettino \Q1
let pixelMatrix = [];

let pixY = 9;
for(var i = 0; i < 20; i++) {
    let pixX = 11;
    pixelMatrix[i] = new Array;
    for(var j = 0; j < 12; j++){
        pixelMatrix[i][j] = new Coordinate(pixX, pixY);
        pixX += 23;
    }
    pixY += 23;
}


// Variabili per il Canvas
let canvas;
let context;

// Blocco attivo nella sessione di gioco
let activeBlock = [];
let activeColor;

// Array contenente tutti i blocchi possibili da creare
let blocks = [];
let blockColor = [];

// Creiamo i blocchi ed inseriamoli nell'array

// Smashboy (Quadrato)
// XX
// XX
blocks.push([[0,0], [0,1], [1,0], [1,1]]);
blockColor.push("yellow");


// Hero (I)
// XXXX
blocks.push([[0,0], [0,1], [0,2], [0,3]]);
blockColor.push("cyan");

// Blue Ricky (J)
// X
// XXX 
blocks.push([[0,0], [1,0], [1,1], [1,2]]);
blockColor.push("blue");

// Orange Ricky (L)
//   X
// XXX 
blocks.push([[0,2], [1,0], [1,1], [1,2]]);
blockColor.push("orange");

// Teewee (T)
//  X
// XXX
blocks.push([[0,1], [1,0], [1,1], [1,2]]);
blockColor.push("purple");

// Rhode Island S
//  XX
// XX
blocks.push([[0,0], [0,1], [1,1], [1,2]]);
blockColor.push("red");

// Cleveland Z
// XX
//  XX
blocks.push([[0,1], [0,2], [1,0], [1,1]]);
blockColor.push("green");

window.setInterval(function(){
    oneDirection = dirDown;
    if(!cautionDown()){
        delBlock();
        Y++;
        drawBlock();
    }
  }, 500);

// Questa matrice memorizza le posizioni dove andranno colorati i quadratini per formare i blocchi
// E' una matrice booleana, ogni cella e' settata ad 1 se in quelle coordinate vi è un quadratino presente, a 0 altrimenti.
// E' indispensabile nella fase di draw e di delete del blocco.
let boolMatrix = [];

for(var i = 0; i < 20; i++) {
    boolMatrix[i] = new Array;
    for(var j = 0; j < 12; j++){
        // All'inizio abbiamo tutte le celle a 0, cioe' nessun blocco/quadratino e' presente nella gameboard
        boolMatrix[i][j] = 0;
    }
}

// Memorizziamo le direzioni
let dirLeft = 1;
let dirRight = 2;
let dirDown = 3;

// Variabile contenente la direzione corrente
let oneDirection = 0;

// Questa matrice, detta aiutante, memorizza per ogni cella, il colore del blocco presente, se presente, altrimenti 0.
// E' indispensabile nella fase di scroll, cioe' quando un giocatore completa una linea con tutti quadratini dobbiamo 
// scorrere il tutto verso il basso ma bisogna conoscere i colori sovrastanti !
let helpMatrix = [];

for(var i = 0; i < 20; i++) {
    helpMatrix[i] = new Array;
    for(var j = 0; j < 12; j++){
        // All'inizio abbiamo tutte le celle a 0, cioe' nessun blocco/quadratino e' presente nella gameboard
        helpMatrix[i][j] = 0;
    }
}


// EventListener per inizializzare la Gameboard
document.addEventListener("DOMContentLoaded", init);

// Funzione inizializzatrice, prepara il Canvas
function init(){

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

    // Disegniamo il primo blocco
    drawBlock();

}

// Questa funzione disegna un blocco all'interno della gameboard
function drawBlock(){
    // console.log(pixelMatrix);
    // console.log(activeBlock);

    // Dobbiamo ciclare ogni singolo quadratino per poterlo disegnare nel Canvas
    for(let i = 0; i < activeBlock.length; i++){
        
        // Prendiamo le coordinate
        let xPos = activeBlock[i][1] + X;
        let yPos = activeBlock[i][0] + Y;

        // Settiamo a 1 la cella della matrice booleana, indicante che in quella posizione e' presente il blocco
        boolMatrix[yPos][xPos] = 1;
        
        // Estraiamo le coordinate pixelose dalla matrice pixelosa
        let pixelX = pixelMatrix[yPos][xPos].x;
        let pixelY = pixelMatrix[yPos][xPos].y;
        // console.log(pixelX);
        // console.log(pixelY);
        
        // Il colore sara' quello del blocco attivo
        context.fillStyle = activeColor;
        context.fillRect(pixelX, pixelY, 21, 21);
        
    }
    // console.log(boolMatrix);
}


// Questa funzione elimina un blocco, serve per poter rendere dinamico il gioco, quando il blocco cambia posizione
function delBlock(){

    for(let i = 0; i < activeBlock.length; i++){

        // Prendiamo le coordinate del blocco
        let xPos = activeBlock[i][1] + X;
        let yPos = activeBlock[i][0] + Y;

        // Eliminiamo, cioè poniamo a 0 il valore nel boolean array
        boolMatrix[yPos][xPos] = 0;

        // Prendiamo le coordinate dei pixel
        let pixelX = pixelMatrix[yPos][xPos].x;
        let pixelY = pixelMatrix[yPos][xPos].y;

        // E disegniamo un quadrato nero, cioè cancelliamo
        context.fillStyle = "black";
        context.fillRect(pixelX, pixelY, 21, 21);

    }
}


function bo(){
    let X = 0;
    for(var i = 0; i < activeBlock.length; i++){
        let quadratino = activeBlock[i];
        if(quadratino[1] > X){
            X = quadratino[1];
        }
    }
    return X;
}

// Questa funzione ruota il blocco
//! DA RIGUARDAREEEE
function rotateBlock(){

    let block = activeBlock;
    let ruota = [];
    let copyBlock;

    for(var i = 0; i < block.length; i++){
        copyBlock = [...block];
        let xPos = block[i][1];
        let yPos = block[i][0];
        let rotY = (bo() - xPos);
        let rotX = yPos;
        ruota.push([rotY, rotX]); 
    }

    delBlock();

    //Se un blocco ruotato va fuori dalla gameboard bisogna gestire tramite il meccanismo delle eccezioni try & catch
    try{
        activeBlock = ruota;
        drawBlock();
    } catch(e){
        if(e){
            activeBlock = copyBlock;
            delBlock();
            drawBlock();
        }
    }

}

function whereDoIMove(e){
    // console.log(e.keyCode);
    // e.KeyCode switchhh, non mi fa impaccire...
    switch (e.keyCode) {

        // Il giocatore ha premuto la freccia sinistra
        case 37:

            // Settiamo la direzione attiva
            oneDirection = dirLeft;

            // Bisogna controllare se andiamo contro i bordi !
            if(!cautionWall()){
                // Ritorna false, cioe' va contro i bordi, breakiamo
                break;
            }

            // Bisogna controllare possibili collisioni orizzontali, la funzione e' implementata qualche riga sotto
            if(!cautionInline()){
                // In questo caso non ci sono collisioni, eliminiamo il blocco vecchio
                delBlock();
                // Andando a sinistra si decrementa la X
                X--;
                // Disegniamo il blocco nuovo con le coordinate aggiornate
                drawBlock();
            }

        break;

        // Il giocatore ha premuto la freccia destra
        case 39:

            // Settiamo la direzione attiva
            oneDirection = dirRight;

            // Bisogna controllare se andiamo contro i bordi !
            if(!cautionWall()){
                // Ritorna false, cioe' va contro i bordi, breakiamo.
                break;
            }
            // Bisogna controllare possibili collisioni orizzontali, la funzione e' implementata qualche riga sotto
            if(!cautionInline()){
                // In questo caso non ci sono collisioni, eliminiamo il blocco vecchio
                delBlock();
                // Andando a destra si incrementa la X
                X++;
                // Disegniamo il blocco nuovo con le coordinate aggiornate
                drawBlock();
            }

        break; 

        // Il giocatore ha premuto la freccia giù
        case 40:

            // Settiamo la direzione attiva
            oneDirection = dirDown;

            // Controlliamo se c'e' una collisione verticale, con la funzione implementata qualche riga di codice piu' in basso
            if(!cautionDown()){
                // Eliminiamo il blocco vecchio
                delBlock();
                // Andando giu' si incrementa la Y
                Y++;
                // Disegniamo il blocco nuovo con le coordinate aggiornate
                drawBlock();
            }
            
        break;
        
        // Il giocatore ha premuto la freccia su
        case 38:
            oneDirection = 0;
            rotateBlock();
            // console.log(helpMatrix);
            // console.log(boolMatrix);
            break;
        
        // Il giocatore ha premuto la barra spaziatrice
        case 32: 
            let fasterThanLight = setInterval(()=>{
                // Settiamo la direzione attiva
                oneDirection = dirDown;

                // Controlliamo se c'e' una collisione verticale, con la funzione implementata qualche riga di codice piu' in basso
                if(!cautionDown()){
                    // Eliminiamo il blocco vecchio
                    delBlock();
                    // Andando giu' si incrementa la Y
                    Y++;
                    // Disegniamo il blocco nuovo con le coordinate aggiornate
                    drawBlock();
                } else{
                    clearInterval(fasterThanLight);
                }
            }, 1);
    }
}

// FUNZIONI DI CHECKING

// Questa funzione previene la collisione con i bordi della gameboard
function cautionWall(){
    for(var i = 0; i < activeBlock.length; i++){

        let xPos = activeBlock[i][1] + X;
        // console.log(xPos);

        // Collisione a destra
        if(xPos >= 11 && oneDirection == dirRight){
            return false
        }

        // Collisione a sinistra
        if(xPos <= 0 && oneDirection == dirLeft){
            return false;
        }
    }
    
    return true;
}

// Questa funzione previene la collisione con la parte inferiore della gameboard
function cautionDown(){

    // console.log(Y);

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

                // console.log(helpMatrix);
                // console.log(boolMatrix);

                // console.log("QUI");

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
            location.reload();
        } else{
            for(var i = 0; i < block.length; i++){

                // Il block[i] rappresenta il quadratino
                let xPos = block[i][1] + X;
                let yPos = block[i][0] + Y;

                // Memorizziamo il fatto che ci sia un blocco memorizzato in quella zona della gameboard, in particolare il colore
                // Memorizzare il colore ci serve nel caso di scroll verso il basso !
                helpMatrix[yPos][xPos] = activeColor;
            }
            
            // Vediamo se il giocatore ha fatto un punto, cioè ha completato una riga di quadratini
            checkPoint();

            // Si estrae un altro blocco che parte dall'inizio
            let index = Math.floor(Math.random()*blocks.length);
            activeBlock = blocks[index];
            activeColor = blockColor[index];

            // No direzione
            oneDirection = 0;

            // Si settano le variabili iniziali
            X = 4;
            Y = 0;

            // Disegniamo il nuovo blocco 
            drawBlock();

        }
    }

    return help;

}
  


// Bisogna stare attenti anche alle collisioni avvenute orizzontalmente
function cautionInline(){

    // Il meccanismo e' simile a quello precedente, si simula un possibile blocco che in questo caso non scende verso giù
    // Bensì va a destra o a sinistra.
    let block = activeBlock;

    for(var i = 0; i < block.length; i++){

        // Prendiamo le coordinate
        let xPos = block[i][1] + X;
        let yPos = block[i][0] + Y;

        // Se il giocatore va a sinistra, ovviamente la coordinata X va decrementata ! 
        if(oneDirection == dirLeft){
            xPos--;
        } 

        // Altrimenti, se va a destra, va incrementata !
        else if(oneDirection == dirRight){
            xPos++;
        }

        // Controlliamo nell'array aiutante, il quale ci dirà se in quel blocco con la coordinata X (incrementata/decrementata)
        // ce n'e' un altro. Nel caso affermativo si deve ritornare true, cioè c'e' una collisione. E quindi se si vede sopra, 
        // il blocco non puo' spostarsi a destra/sinistra.
        if(helpMatrix[yPos][xPos]){
            return true;
        }
    }

    // No collisioni
    return false;

}

// Questa funzione 
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
            // console.log("RIGA COMPLETAAAA");

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

}





function scrollDown(howRighe, from){

    // Cicliamo le righe a partire da quella indicata precedentemente salvata nella variabile from
    for (var i = from - 1; i >= 0; i--){
        // Cicliamo orizzontalmente
        for(var j = 0; j < 12; j++){

            // Ci prendiamo la posizione che occupera' il blocco aggiornato sommando la riga corrente alla variabile howRighe
            // che indica quante righe devono essere cancellate, sicuramente > 0 (si veda controllo precedente)
            var z = i + howRighe;

            // Questo e' il colore blocchettino precedente all'aggiornamento
            var previousBlock = helpMatrix[i][j];

            // Questo e' il colore del blocchettino successivo all'aggiornamento
            var nextBlock = helpMatrix[z][j];

            // Se c'e' un blocchettino da traslare verso il basso
            if (previousBlock){
                // console.log(helpMatrix);

                // Ci memorizziamo il colore aggiornato della posizione nuova
                nextBlock = previousBlock;

                // Memorizziamo il fatto che in quella posizione avremo un quadratino
                boolMatrix[z][j] = 1; 

                // Che avra' il colore di quello sovrastante (quello precedente dunque)
                helpMatrix[z][j] = previousBlock; 
                
                // Estraiamo le coordinate pixelose
                let pixelX = pixelMatrix[z][j].x;
                let pixelY = pixelMatrix[z][j].y;

                // Settiamo il colore giusto
                context.fillStyle = nextBlock;
                // E disegniamo il blocchettino nella posizione nuova
                context.fillRect(pixelX, pixelY, 21, 21);
                
                // A questo punto il blocco precedente e' cancellato
                previousBlock = 0;

                // Settiamo le matrici in modo appropriato
                boolMatrix[i][j] = 0; 
                helpMatrix[i][j] = 0;

                // Estraiamo le coordinate pixelose
                pixelX = pixelMatrix[i][j].x;
                pixelY = pixelMatrix[i][j].y;

                // E cancelliamo
                context.fillStyle = 'black';
                context.fillRect(pixelX, pixelY, 21, 21);

            }
        }
    }
}