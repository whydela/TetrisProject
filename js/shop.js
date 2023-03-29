let skin = document.getElementsByClassName("skins")[0].children;
let temi = document.getElementsByClassName("temis")[0].children;

for(var i = 0; i < 6; i++){
    temi[i].id = i;
    temi[i].onclick = function(){
        changeTheme(this);
    };
}

for(var i = 0; i < 5; i++){
    skin[i].id = i;
    skin[i].onclick = function(){
        changeSkin(this);
    };
}

function changeTheme(elem){

    if(elem.alt == "blocked"){
        switch(Number(elem.id)){
            case 1:
                alert("Devi completare il livello 2.");
                break;
            case 2:
                alert("Devi completare il livello 4.");
                break;
            case 3:
                alert("Devi completare il livello 5.");
                break;
            case 4:
                alert("Devi completare il livello 6.");
                break;
            case 5:
                alert("Devi completare il livello 8.");
                break;
            default:
                break;
        }
        return;
    }

    // Chiamata AJAX per cambiare tema corrente
    var xmlHttp = new XMLHttpRequest();
    
    xmlHttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          console.log(this.responseText);
        }
    };

    xmlHttp.open("POST", "http://localhost/Tetris/php/update.php", true);
    xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    switch(Number(elem.id)){
        case 0:
            // Update del tema che si sblocca al livello 0
            var parameter = 'level=20&score=0';
            xmlHttp.send(parameter);
            break;
        case 1:
            // Update del tema che si sblocca al livello 2
            var parameter = 'level=12&score=0';
            xmlHttp.send(parameter);
            break;
        case 2:
            // Update del tema che si sblocca al livello 4
            var parameter = 'level=14&score=0';
            xmlHttp.send(parameter);
            break;
        case 3:
            // Update del tema che si sblocca al livello 5
            var parameter = 'level=15&score=0';
            xmlHttp.send(parameter);
            break;
        case 4:
            // Update del tema che si sblocca al livello 6
            var parameter = 'level=16&score=0';
            xmlHttp.send(parameter);
            break;
        case 5:
            // Update del tema che si sblocca al livello 8
            var parameter = 'level=18&score=0';
            xmlHttp.send(parameter);
            break;
        default:
            break;
    }

    let temis = document.getElementsByClassName("temis")[0].children;
    for(var i = 0; i < 6; i++){
        temis[i].style.animation = "none";
    }

    elem.style.animation = "blink 3s infinite";

    return;
}

function changeSkin(elem){

    if(elem.alt == "blocked"){
        switch(Number(elem.id)){
            case 1:
                alert("Devi completare il livello 1.");
                break;
            case 2:
                alert("Devi completare il livello 3.");
                break;
            case 3:
                alert("Devi completare il livello 7.");
                break;
            case 4:
                alert("Devi completare il livello 9.");
                break;
            default:
                break;
        }
        return;
    }

    // Chiamata AJAX per cambiare skin corrente
    var xmlHttp = new XMLHttpRequest();
    
    xmlHttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          console.log(this.responseText);
        }
    };

    xmlHttp.open("POST", "../php/update.php", true);
    xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    switch(Number(elem.id)){
        case 0:
            // Update della skin che si sblocca al livello 0
            var parameter = 'level=10&score=0';
            xmlHttp.send(parameter);
            // Cambiamo la skin nella pagina
            break;
            case 1:
            // Update della skin che si sblocca al livello 1
            var parameter = 'level=11&score=0';
            xmlHttp.send(parameter);
            break;
        case 2:
            // Update della skin che si sblocca al livello 3
            var parameter = 'level=13&score=0';
            xmlHttp.send(parameter);
            break;
        case 3:
            // Update della skin che si sblocca al livello 7
            var parameter = 'level=17&score=0';
            xmlHttp.send(parameter);
            break;
        case 4:
            // Update della skin che si sblocca al livello 9
            var parameter = 'level=19&score=0';
            xmlHttp.send(parameter);
            break;
        default:
            break;
        }
        
    let img = document.getElementsByClassName("Skin")[0].children[0];
    img.src = "../img/skin/"+(Number(elem.id)+1)+".png";
    
    let skin = document.getElementsByClassName("skins")[0].children;
    for(var i = 0; i < 5; i++){
        skin[i].style.animation = "none";
    }

    elem.style.animation = "blink 3s infinite";

    return;

    

}