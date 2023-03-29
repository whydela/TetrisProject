// Classe contenente le coordinate (pixelose) dove possono essere disegnati i blocchi
class Coordinate{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}

let change = 0;

// Variabili che ci dicono in che coordinate si trova il blocco attivo, la X e' settata a 4 perche' vogliamo che il blocchettino 
// si generi leggermente a destra rispetto all'inizio del Canvas
let X = 4;
let Y = 0;


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

let nBlock = [];
let nColor;

// Array contenente tutti i blocchi possibili da creare
let blocks = [];
let blockColor = [];

let shapeBlock = [];
let shapeColor = [];

// Creiamo i blocchi ed inseriamoli nell'array

// Smashboy (Quadrato)
// XX
// XX
blocks.push([[0,0], [0,1], [1,0], [1,1]]);
blockColor.push("yellow");
shapeColor.push("rgba(255, 255, 0, 0.4)");

// Hero (I)
// XXXX
blocks.push([[0,0], [0,1], [0,2], [0,3]]);
blockColor.push("cyan");
shapeColor.push("rgba(0, 255, 255, 0.4)");

// Blue Ricky (J)
// X
// XXX 
blocks.push([[0,0], [1,0], [1,1], [1,2]]);
blockColor.push("blue");
shapeColor.push("rgba(0, 0, 255, 0.4)");

// Orange Ricky (L)
//   X
// XXX 
blocks.push([[0,2], [1,0], [1,1], [1,2]]);
blockColor.push("orange");
shapeColor.push("rgba(255, 165, 0, 0.4)");

// Teewee (T)
//  X
// XXX
blocks.push([[0,1], [1,0], [1,1], [1,2]]);
blockColor.push("purple");
shapeColor.push("rgba(128, 0, 128, 0.4)");

// Rhode Island S
//  XX
// XX
blocks.push([[0,0], [0,1], [1,1], [1,2]]);
blockColor.push("red");
shapeColor.push("rgba(255, 0, 0, 0.4)");

// Cleveland Z
// XX
//  XX
blocks.push([[0,1], [0,2], [1,0], [1,1]]);
blockColor.push("green");
shapeColor.push("rgba(0, 255, 0, 0.4)");

// Si inizia con 
let howTime = 1700;

let mainInterval = window.setInterval(function(){
    oneDirection = dirDown;
    if(!cautionDown()){
        delBlock();
        Y++;
        drawBlock();
    }
  }, howTime);

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

let shapeMatrix = [];

for(var i = 0; i < 20; i++) {
    shapeMatrix[i] = new Array;
    for(var j = 0; j < 12; j++){
        // All'inizio abbiamo tutte le celle a 0, cioe' nessun blocco/quadratino e' presente nella gameboard
        shapeMatrix[i][j] = 0;
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
// document.addEventListener("DOMContentLoaded", init);




// Questa funzione disegna un blocco all'interno della gameboard
function drawBlock(){

    // Dobbiamo ciclare ogni singolo quadratino per poterlo disegnare nel Canvas
    for(let i = 0; i < activeBlock.length; i++){
        
        // console.log(X);
        // Prendiamo le coordinate
        let xPos = activeBlock[i][1] + X;
        let yPos = activeBlock[i][0] + Y;

        if(yPos < 20 && xPos < 12){
            // Settiamo a 1 la cella della matrice booleana, indicante che in quella posizione e' presente il blocco
            boolMatrix[yPos][xPos] = 1;
            // console.log(yPos, xPos);
            shapeMatrix[yPos][xPos] = 0;
        }
        

        // Estraiamo le coordinate pixelose dalla matrice pixelosa
        let pixelX = pixelMatrix[yPos][xPos].x;
        let pixelY = pixelMatrix[yPos][xPos].y;
        
        // Il colore sara' quello del blocco attivo
        context.fillStyle = activeColor;
        context.fillRect(pixelX, pixelY, 21, 21);
        
    }
    // fixScreen();
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
        if(yPos == 19){
            console.log(activeBlock);
            console.log("Cancello (delBlock):"+yPos+" " + xPos);
        }
        context.fillStyle = "black";
        context.fillRect(pixelX, pixelY, 21, 21);
        
    }
}


// Questa funzione disegna un'ombra all'interno della gameboard
function drawShape(){
        
    // Dobbiamo ciclare ogni singolo quadratino per poterlo disegnare nel Canvas
    for(let i = 0; i < shapeBlock.length; i++){

        // Prendiamo le coordinate
        let xPos = shapeBlock[i][1];
        let yPos = shapeBlock[i][0];

        // console.log(yPos, xPos);
        shapeMatrix[yPos][xPos] = 1;

        // Estraiamo le coordinate pixelose dalla matrice pixelosa
        let pixelX = pixelMatrix[yPos][xPos].x;
        let pixelY = pixelMatrix[yPos][xPos].y;

        
        // Il colore sara' quello del blocco attivo opaco
        let index = blockColor.indexOf(activeColor);
        
        context.fillStyle = shapeColor[index];
        context.fillRect(pixelX, pixelY, 21, 21);
        
    }
    // fixScreen();
        
}

function delShape(){
    for(var j = 0; j < 12; j++){
        for(var i = 0; i < 20; i++){
            if(shapeMatrix[i][j] == 1){
                    // Prendiamo le coordinate dei pixel
                    let pixelX = pixelMatrix[i][j].x;
                    let pixelY = pixelMatrix[i][j].y;
                    shapeMatrix[i][j] = 0;
                    // E disegniamo un quadrato nero, cioè cancelliamo

                    context.fillStyle = "black";

                    context.fillRect(pixelX, pixelY, 21, 21);
                }
            }
                
        }
}

// Si estrae un indicatore per effettuare la rotazione, in particolare la coordinata Y piu' alta (del blocco attivo)
function extractY(){

    let ind = 0;
    for(var i = 0; i < activeBlock.length; i++){
        if(activeBlock[i][1] > ind){
            ind = activeBlock[i][1];
        }
    }

    return ind;
}

// Questa funzione ruota il blocco
function rotateBlock(){

    // In questo array verrano salvate le coordinate del nuovo blocco ruotato
    let newBlock = [];

    newBlock = rotateLeft(activeBlock);

    delBlock();
    
    delShape();


    //Se un blocco ruotato va fuori dalla gameboard bisogna gestire tramite il meccanismo delle eccezioni try & catch
    try{
        activeBlock = newBlock;
        drawBlock();
    } catch(e){
        if(e){
            // activeBlock = copyBlock;
            // delBlock();
            activeBlock = fixRotate();
            drawBlock();
        }
    }
    change++;
    
    shape();

    // clearInterval(mainInterval);
}

function rotateLeft(block){

    let newBlock = [];

    // Scorriamo tutti i blocchettini del blocco
    for(var i = 0; i < block.length; i++){

        // Prendiamo le coordinate
        let xPos = block[i][1];
        let yPos = block[i][0];


        let rotX = yPos;
        let rotY = extractY() - xPos;

        newBlock.push([rotY, rotX]); 
    }
    return newBlock;
}

let redFix = [[1,1], [1,0], [0,0], [0,-1]];
let cyanFix =[[0,3], [0,2], [0,1], [0,0]];
let purpleFix =[[0,1], [1,0], [1,1], [1,2]];
let greenFix =[[1,1], [1,0], [0,2], [0,1]];
let orangeFix = [[1,0], [0,2], [0,1], [0,0]];
let blueFix = [[0,0], [1,0], [1,1], [1,2]];

// Questa funzione risolve piccoli bug grafici (a volte dopo la rotazione si creava un quadratino in una parte della gameboard)
function fixMatrix(index){
    for(var j = 0; j < 20; j++){
        if(boolMatrix[j][index]){
            // delBlock();
            boolMatrix[j][index] = 0;
            // drawBlock();
            fixScreen();
            return;
        }
    }
}

// Funzione associata a quella precedente, si cancellano tutti i quadratini che corrispondono a celle della matrice booleana settati a 0 
function fixScreen(){
    for(var j = 0; j < 12; j++){
        for(var i = 0; i < 20; i++){
            if(boolMatrix[i][j] == 0 && shapeMatrix[i][j] == 0){
                // Prendiamo le coordinate dei pixel
                let pixelX = pixelMatrix[i][j].x;
                let pixelY = pixelMatrix[i][j].y;
        
                // E disegniamo un quadrato nero, cioè cancelliamo
                context.fillStyle = "black";
                context.fillRect(pixelX, pixelY, 21, 21);

            }
                
        }
    }
}

// Funzione che cancella tutto lo schermo 
function clearScreen(){
    for(var j = 0; j < 12; j++){
        for(var i = 0; i < 20; i++){
                // Prendiamo le coordinate dei pixel
                let pixelX = pixelMatrix[i][j].x;
                let pixelY = pixelMatrix[i][j].y;
        
                // E disegniamo un quadrato nero, cioè cancelliamo
                context.fillStyle = "black";
                context.fillRect(pixelX, pixelY, 21, 21);
            }
                
        }
}


// Questa funzione viene chiamata quando vengono ruotati dei blocchi situati totalmente a destra dello schermo, cosa che causa alcuni problemini
function fixRotate(){

    let newBlock = [];

    switch(activeColor){
        case "red":
            newBlock = redFix;
            fixMatrix(11);
            // fixScreen();
            break;
        case "cyan":
            newBlock = cyanFix;
            X = 8;
            break;  
        case "purple":
            fixMatrix(11);
            newBlock = purpleFix;
            X--;
            break;
        case "green":
            newBlock = greenFix;
            fixMatrix(11);
            X--;
            break;
        case "orange":
            fixMatrix(10);
            newBlock = orangeFix;
            X--;
            break;
        case "blue":
            fixMatrix(10);
            newBlock = blueFix;
            X--;
            break;            


    }

    return newBlock;
}

let fixRed = [[2,0], [1,0], [1,1], [0,1]];

// clearInterval(mainInterval);

function shape(){
    let count = 0;
    let fakeY = Y;
    let fakeBlock = [];
    let yPos;
    
    while(1){

        for(var i = 0; i < activeBlock.length; i++){

            // Prendiamo le coordinate di ogni quadratino del blocco
            let xPos = activeBlock[i][1] + X;
            yPos = activeBlock[i][0] + fakeY;
            // Se non siamo in fondo e la matrice aiutante ci dice che c'è un blocco sotto un quadratino che stiamo supervisionando 
            if(yPos < 19 && helpMatrix[yPos+1][xPos]){
                if(activeColor == "blue" || activeColor == "green"){
                    // console.log(i);
                    // console.log(change);
                }
                if((change%2) == 0){
                    if(activeColor=="cyan"){
                        yPos++;
                    }
                    if((change%4==0) && activeColor=="green" && (i == 1)){
                        yPos++;
                    }
                    if((change%4!=0) && activeColor=="green" && (i == 2)){
                        yPos++;
                    }
                    if(activeColor=="red" && (!i || i == 3)){
                         yPos++;
                        if(((change+2)%4) == 0){
                            yPos--;
                            if(i==3){
                                yPos++;
                            }
                        }
                        if(change%4==0){
                            if(i==3){
                                yPos--;
                            }
                        }
                    } 
                    if(activeColor=="purple" && (i == 3 || i == 1) && (change%4 !=0)){
                        yPos++;
                    }
                    if(activeColor == "orange" && i == 1 && ((change+2)%4 == 0)){
                        yPos++;
                    }
                    if(activeColor == "blue" && (i == 3 || i == 2 ) && ((change+2)%4 == 0)){
                        yPos++;
                    }
                    // console.log(i);

                }else{

                    if(activeColor=="red" && (i == 1 || i==2)){
                        yPos++;
                    }
                    if(activeColor=="green" && (!(i) || i == 3)){
                    }
                    else if(activeColor == "cyan"){
                        yPos-=2;
                    }
                    else if(activeColor == "purple" && !i){
                        // console.log(i);
                    }
                    else if(activeColor == "orange" && !i && ((change-1)%4==0)){
                        yPos++;
                    }
                    else if(activeColor == "blue" && !i && ((change+1)%4==0)){
                        yPos++;
                        // console.log(i);
                    }
                    else{
                        // console.log(activeBlock);
                        // console.log(i);
                        yPos--;
                    }

                }
                count++; 
                break;
            }

            if(yPos >= 19){
                if(activeColor=="cyan"){
                    yPos++;
                    if(change%2){
                        yPos -= 2;
                    }
                }
                count++;
                if((change % 2)){
                    yPos--;
                }
                break;
            }
        
        }

        fakeY++;

        if(count){ 
            break;
        }
        
    }

    // console.log(yPos);
    for(var i = 0; i < 4; i++){
        let x = activeBlock[i][1] + X;
        let y = activeBlock[i][0] + yPos - 1;
        // console.log(y, x);
        fakeBlock.push([y, x]);
    }

    // delShape();
    // console.log(fakeBlock);

    shapeBlock = fakeBlock;

    drawShape();

    // drawBlock();
    
}

function whereDoIMove(e){
    // console.log(e.keyCode);
    // e.KeyCode switchhh, non mi fa impaccire...
    // shape();
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
                delShape();
                shape();
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
                delShape();
                shape();
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
            if(activeColor != "yellow"){
                rotateBlock();
                fixScreen();
            }
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


            break;
    }
}

// FUNZIONI DI CHECKING

// Questa funzione previene la collisione con i bordi della gameboard
function cautionWall(){
    for(var i = 0; i < activeBlock.length; i++){

        let xPos = activeBlock[i][1] + X;

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

