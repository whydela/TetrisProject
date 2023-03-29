<!DOCTYPE html>
<html lang="it">
<head>
    <link rel="icon" href="/tetris/img/icone/icona.png" type="image/x-icon">
    <meta name="description" content="Tetris">
    <link rel="stylesheet" href="../tetris.css">
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Skin e Temi</title>
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

        // Mi prendo il tema
        $sql = "SELECT theme
        FROM User
        WHERE Username = '" . $_SESSION["username"] . "';";
        $result = mysqli_query($connessione, $sql);
        $row = mysqli_fetch_assoc($result);
        $theme = $row["theme"];

        // Vedo le skin sbloccate prendendomi quella massima
        $sql = "SELECT max(skin) as MaxSkin
        FROM skinwallet
        WHERE user =  '" . $_SESSION["username"] . "';";
        $result = mysqli_query($connessione, $sql);
        $row = mysqli_fetch_assoc($result);
        $maxskin = $row["MaxSkin"];

        // Vedo i temi sbloccati prendendomi quello massimo
        $sql = "SELECT max(theme) as MaxTheme
        FROM themewallet
        WHERE user =  '" . $_SESSION["username"] . "';";
        $result = mysqli_query($connessione, $sql);
        $row = mysqli_fetch_assoc($result);
        $maxtheme = $row["MaxTheme"];

    ?>
    <style>
        body{
            display: block;
        } 



    </style>
</head>
<body>

    <a href="home.php">
        <img src="../img/icone/back.png" alt="back" id = "back" width = "100">
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
    <div class = "logos">
        <div class="logo"><img src="/tetris/img/sfondi/logo.png" alt="logo" width = "400"></div>
    </div>
    <div style = "display:flex; margin-top: 20px">
        <div class = "themeskin">
            <p>Skin</p>
            <div class = "skins">
                <?php
                    if($skin == 2){
                        echo("<img src='../img/skin/1.png' style = 'animation: blink 3s infinite'alt='one' width=90>");
                    } else{
                        echo("<img src='../img/skin/1.png' alt='one' width=90>");
                    }
                    if($maxskin >= 2){
                        if($skin == 2){
                            echo("<img src='../img/skin/2.png' style = 'animation: blink 3s infinite'alt='two' width=90>");
                        } else{
                            echo("<img src='../img/skin/2.png' alt='two' width=90>");
                        }
                    } else{
                        echo("<img src='../img/skin/blocked.png' alt='blocked' width=90>");
                    }
                    if($maxskin >= 3){
                        if($skin == 3){
                            echo("<img src='../img/skin/3.png' style = 'animation: blink 3s infinite' alt='three' width=90>");
                        } else{
                            echo("<img src='../img/skin/3.png' alt='three' width=90>");
                        }
                    } else{
                        echo("<img src='../img/skin/blocked.png' alt='blocked' width=90>");
                    }
                    if($maxskin >= 4){
                        if($skin == 4){
                            echo("<img src='../img/skin/4.png' style = 'animation: blink 3s infinite' alt='four' width=90>");
                        } else{
                            echo("<img src='../img/skin/4.png' alt='four' width=90>");
                        }
                    } else{
                        echo("<img src='../img/skin/blocked.png' alt='blocked' width=90>");
                    }
                    if($maxskin >= 5){
                        if($skin == 5){
                            echo("<img src='../img/skin/5.png' style = 'animation: blink 3s infinite' alt='five' width=90>");
                        } else{
                            echo("<img src='../img/skin/5.png' alt='five' width=90>");
                        }
                    } else{
                        echo("<img src='../img/skin/blocked.png' alt='blocked' width=90>");
                    }
                ?>
            </div>
        </div>
        <div class = "themeskin">
            <p>Temi</p>
            <div class = "temis">
                <?php
                    if($theme == 1){
                        echo("<img src='../img/sfondi/1.jpg' style = 'animation: blink 3s infinite' alt='one' width=150>");
                    } else{
                        echo("<img src='../img/sfondi/1.jpg' alt='one' width=150>");
                    }
                    if($maxtheme >= 2){
                        if($theme == 2){
                            echo("<img src='../img/sfondi/2.jpg' style = 'animation: blink 3s infinite' alt='two' width=150>");
                        } else{
                            echo("<img src='../img/sfondi/2.jpg' alt='two' width=150>");
                        }
                    } else{
                        echo("<img src='../img/sfondi/blocked.jpg' alt='blocked' width=150 height=85.2>");
                    }
                    if($maxtheme >= 3){
                        if($theme == 3){
                            echo("<img src='../img/sfondi/3.jpg' style = 'animation: blink 3s infinite' alt='three' width=150>");
                        } else{
                            echo("<img src='../img/sfondi/3.jpg' alt='three' width=150>");
                        }
                    } else{
                        echo("<img src='../img/sfondi/blocked.jpg' alt='blocked' width=150 height=85.2>");
                    }
                    if($maxtheme >= 4){
                        if($theme == 4){
                            echo("<img src='../img/sfondi/4.jpg' style = 'animation: blink 3s infinite' alt='four' width=150>");
                        } else{
                            echo("<img src='../img/sfondi/4.jpg' alt='four' width=150>");
                        }
                    } else{
                        echo("<img src='../img/sfondi/blocked.jpg' alt='blocked' width=150 height=85.2>");
                    }
                    if($maxtheme >= 5){
                        if($theme == 5){
                            echo("<img src='../img/sfondi/5.jpg' style = 'animation: blink 3s infinite' alt='five' width=150>");
                        } else{
                            echo("<img src='../img/sfondi/5.jpg' alt='five' width=150>");
                        }
                    } else{
                        echo("<img src='../img/sfondi/blocked.jpg' alt='blocked' width=150 height=85.2>");
                    }
                    if($maxtheme >= 6){
                        if($theme == 6){
                            echo("<img src='../img/sfondi/6.jpg' style = 'animation: blink 3s infinite' alt='six' width=150>");
                        } else{
                            echo("<img src='../img/sfondi/6.jpg' alt='six' width=150 height=85.2>");
                        }
                    } else{
                        echo("<img src='../img/sfondi/blocked.jpg' alt='blocked' width=150 height=85.2>");
                    }
                ?>
            </div>
        </div>
    </div>
        
</body>
<script src = "../js/shop.js"></script>
</html>