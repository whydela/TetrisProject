<!DOCTYPE html>
<html lang="it">
<head>
    <link rel="icon" href="/tetris/img/icone/icona.png" type="image/x-icon">
    <meta name="description" content="Tetris">
    <link rel="stylesheet" href="../tetris.css">
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home</title>
</head>
<body>
    <div class = "main">
        <div class="logo"><img src="/tetris/img/sfondi/logo.png" alt="logo" width = "400"></div>
        <form action = "home.php" method = "POST">
            <button class = "menu" name = "Maratona">Modalità Maratona</button>
            <button class = "menu" name = "Livelli">Modalità a Livelli</button>
            <button class = "menu" name = "SkinTemi">Skin & Temi</button>
            <button class = "menu" name = "Classifica">Classifica</button>
            <button class = "menu" name = "Shop">Shop</button>
        </form>
    </div>
        
</body>
</html>

<?php

if($_POST) {

    if(isset($_POST["Maratona"])){
        header("location: marathon.html");
        return;
    }

    if(isset($_POST["Livelli"])){
        header("location: levels.php");
        return;
    }

    if(isset($_POST["SkinTemi"])){
        header("location: themeskin.php");
        return;
    }

    if(isset($_POST["Classifica"])){
        header("location: score.php");
        return;
    }

    if(isset($_POST["Shop"])){
        header("location: shop.php");
        return;
    }

}


?>