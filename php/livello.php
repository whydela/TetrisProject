<!DOCTYPE html>
<html lang="it">
<head>
  <link rel="icon" href="/tetris/img/icone/icona.png" type="image/x-icon">
  <meta name="description" content="Tetris">
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Livello</title>
  <?php
    require_once "./connessione.php";

    // Mi prendo il tema
    $sql = "SELECT theme
            FROM User
            WHERE Username = '" . $_SESSION["username"] . "';";
    $result = mysqli_query($connessione, $sql);
    $row = mysqli_fetch_assoc($result);
    $tema = $row["theme"];
  ?>
  <style>
  
    body{
      text-align: center;
      margin-left: 400px;
      background: white;
      transform: scale(0.556);
      transform-origin: 0 0;
      overflow: hidden;
      <?php
      echo("background-image: url(../img/sfondi/".$tema.".jpg);");
      ?>
      background-size: 1000px;
    }

    .main{
      display: flex;
    }
    
    #canv{
      margin-left: 10px;
      margin-right: 10px;
      background-color: black;
      background-size: 1200px;  
    }

    .pointer{
      background-color: black;
      color: white;
      margin-left: -15px;
      height: 960px;
    }

    #goal{
      font-size: xx-large;
      margin-top: 20px;
      font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
      color: yellow;
      font-weight: 900;
      width: 500px;
    }

    #moves{
      font-size: 50px;
      margin-top: 50px;
      font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
      color: orange ;
      font-weight: 900;
    }

    #rows{
      font-size: 50px;
      margin-top: 50px;
      font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
      color: red;
      font-weight: 900;
    }

    #nBlock{
      font-size: xxx-large;
      margin-top: 50px;
      font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
      color: white;
      font-weight: 900;
    }

    #nBlock img{
      margin-top: 20px;
    }
    
    @keyframes blink {
      50% {
        opacity: 0;
      }
    }

    #gameOver {
      display: block;
      font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
      color: white;
      margin-left: 50px;
      position: absolute;
      background-color: black;
      margin-top: 17px;
      height: 920px;
      display: none;
    }

    .BO{
      color: red;
      animation: blink 1s infinite;
      font-weight: 600;
      font-size: 80px;
     }

    .try{
      font-size: 40px;
      margin-top: -80px;
    }

    #win {
      display: block;
      font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
      margin-left: 25px;
      position: absolute;
      background-color: white;
      margin-top: 17px;
      height: 925px;
      display: none;
      width: 560px;
    }

    .YW{
      color:lime;
      animation: blink 1s infinite;
      font-weight: 600;
      font-size: 75px;
    }

    #good{
      font-size: 40px;
      margin-top: -40px;
    }
    
    .info{
      font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
      margin-top: 50px;
      font-size: 30px;
    }
    
    a{
      font-size: 50px;
      font-weight: 800;
      text-decoration: none;
      color: blue;
      font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    }

    .link1{
      margin-top: 500px;
      margin-bottom: 30px;
    }

    .coin{
      margin-top: -90px;
      margin-left: 340px;
    }

    .Skin{
        position: absolute;
        left: -77%;
        top: 2%;
    }
      
    .nome{
      font-family: segoe script;
      font-size: 95px;
      position: absolute;
      left: -61%;
      top: -9.5%;
    }

    #back{
      top: 13%;
      left: -77%;
      cursor: pointer;
      position: absolute;
    }

    </style>
    <?php
      // require_once "./connessione.php";

      // Controllo del login
      if(!isset($_SESSION["username"])){
          header("location: ../index.php");
      }

      // Mi prendo il livello selezionato
      $percorso = $_SERVER['REQUEST_URI'];
      $url = parse_url($percorso);
      parse_str($url['query'], $parametri);
      $level = $parametri['level'];

      // Mi prendo la skin
      $sql = "SELECT skin
      FROM User
      WHERE Username = '" . $_SESSION["username"] . "';";
      $result = mysqli_query($connessione, $sql);
      $row = mysqli_fetch_assoc($result);
      $skin = $row["skin"];

    ?>
</head>
<?php
  echo("<body onload = init(".$level. ")>");
?>  
    <a href="sceltaLivello.php">
        <img src="../img/icone/back.png" alt="back" id = "back" width = "180">
    </a>
    <div class = "Skin">    
        <?php
            echo("<img src='../img/skin/".$skin.".png' alt='one' width ='120'>")
        ?>
    </div>
    <p class = "nome">
      <?php
        echo($_SESSION["username"]);
      ?>
    </p>
    <div class = "main">
        <canvas id = "canv" width="592" height="956"></canvas>
        <div class = "pointer">
            <img src="../img/icone/gameLogo.jpg" alt = "gameLogo" width="500">
            <div id = "goal"></div>
            <div id = "moves"></div>
            <div id = "rows">Righe</div>
            <div id = "nBlock"> Prossimo Blocco: <br></div>
        </div>
        <div id = "gameOver">
          <p class = "BO">BLOCK OUT</p>
          <p class = "try">Riprova, ce la puoi fare !</p>
          <div class = "link1">
            <?php
              echo("<a href='../php/livello.php?level=".$level."'>Riprova</a>");
            ?>  
          </div>
          <div>
            <a href="../php/sceltaLivello.php">Torna al Menu</a>
          </div>
        </div>
        <div id = "win">
          <p class = "YW">HAI VINTO !</p>
          <p id = "good">Hai guadagnato 100</p>
          <div class = "link1">
            <?php
              echo("<a href='../php/livello.php?level=".($level+1)."'>Prossimo Livello</a>");
            ?>  
          </div>
          <div>
            <a href="../php/sceltaLivello.php">Torna al Menu</a>
          </div>
        </div>
      </div>    
</body>
<script src = "../js/tetris.js"></script>
<script src = "../js/level.js"></script>
</html>