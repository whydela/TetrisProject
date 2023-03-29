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
    <?php
        require_once "./connessione.php";

        // Controllo del login
        if(!isset($_SESSION["username"])){
            header("location: ../index.php");
        }
    
        // Mi prendo la skin
        $sql = "SELECT skin
        FROM User
        WHERE Username = '" . $_SESSION["username"] . "';";
        $result = mysqli_query($connessione, $sql);
        $row = mysqli_fetch_assoc($result);
        $skin = $row["skin"];

    ?>
</head>
<body>
    <a href="../index.php">
        <img src="../img/icone/logout.png" alt="logout" class = "logout" width = "100">
        <img src="../img/icone/logout_img.png" alt="logoutimg" class = "logout" width = "150">
    </a>
    <div class = "Skin">    
        <?php
            echo("<img src='../img/skin/".$skin.".png' alt='one' width ='70'>")
        ?>
    </div>
    <p class = "nome">      
        <?php
            echo($_SESSION["username"]);
        ?>
    </p>
    <div class = "main">
        <div class="logo"><img src="/tetris/img/sfondi/logo.png" alt="logo" width = "400"></div>
        <form action = "home.php" method = "POST">
            <button class = "menu" name = "Maratona">Modalità Maratona</button>
            <button class = "menu" name = "Livelli">Modalità a Livelli</button>
            <button class = "menu" name = "SkinTemi">Skin e Temi</button>
            <button class = "menu" name = "Classifica">Classifica</button>
        </form>
    </div>
        
</body>
</html>

<?php

if($_POST) {

    if(isset($_POST["Maratona"])){
        header("location: marathon.php");
        return;
    }

    if(isset($_POST["Livelli"])){
        header("location: sceltaLivello.php");
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

}


?>