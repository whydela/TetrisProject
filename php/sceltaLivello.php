<!DOCTYPE html>
<html lang="it">
<head>
    <link rel="icon" href="/tetris/img/icone/icona.png" type="image/x-icon">
    <meta name="description" content="Tetris">
    <link rel="stylesheet" href="../tetris.css">
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Scelta Livello</title>
    <style>
        body{
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            background-image: url(../img/sfondi/8.jpg);
            background-size: 1100px;
            color: white;
        }

        form{
            text-align: center;
            margin-top: 30px;
        }

        form img{
            margin-right: 80px;
        }
        
        .unblocked{
            cursor: pointer;
        }
        
        .blocked{
            cursor: not-allowed;
        }
        
        .num{
            display: flex;
            margin-bottom: 20px;
        }

        .num:first-of-type{
            margin-left: 21px;
        }

        .num:last-of-type{
            margin-left: 21px;
        }

        .Skin{
            position: absolute;
            left: 2%;
            top: 3%;
        }

        .nome{
            font-family: segoe script;
            font-size: 50px;
            position: absolute;
            left: 8%;
            top: -6.8%;

        }
        #back{
            position: absolute;
            top: 14%;
            left: 2%;
            cursor: pointer;
        }

    </style>
    <?php
        require_once "./connessione.php";

        // Controllo del login
        if(!isset($_SESSION["username"])){
            header("location: ../index.php");
        }

        // Mi prendo il livello
        $sql = "SELECT level
                FROM User
                WHERE Username = '" . $_SESSION["username"] . "';";
        $result = mysqli_query($connessione, $sql);
        $row = mysqli_fetch_assoc($result);
        $level = $row["level"];
        
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
    <div class = "main">
        <div class="logo"><img src="/tetris/img/sfondi/logo.png" alt="logo" width = "400"></div>
        <form action = "livelli.php" method = "POST">
            <div class = "num">
                <a href='livello.php?level=1'>
                    <img src='../img/numeri/1.png' alt='one' width='60' height = '100' class='unblocked'></img>
                </a>
                <?php
                    if($level >= 2){
                        echo("
                        <a href='livello.php?level=2'>
                            <img src='../img/numeri/2.png' alt='two' width='80' height='100' id = 'img_2' class='unblocked'></img>
                        </a>
                        ");
                    } else {
                        echo("
                        <img src='../img/numeri/2_blocked.png' alt='two' width='100' height='100' id = 'img_2' class='blocked'></img>
                        ");
                    }
                    if($level >= 3){
                        echo("
                        <a href='livello.php?level=3'>
                            <img src='../img/numeri/3.png' alt='three' width='80' height='100' class='unblocked'></img>
                        </a>
                        ");
                    } else {
                        echo("
                        <img src='../img/numeri/3_blocked.png' alt='three' width='100' height='100' class='blocked'></img>
                        ");
                    }
                ?>
            </div>
            <div class = "num">
                <?php
                    if($level >= 4){
                        echo("
                        <a href='livello.php?level=4'>
                            <img src='../img/numeri/4.png' alt='four' width='80' height='100' class='unblocked'></img>
                        </a>
                        ");
                    } else {
                        echo("
                        <img src='../img/numeri/4_blocked.png' alt='four' width='80' height='100' class='blocked'></img>
                        ");
                    }
                    if($level >= 5){
                        echo("
                        <a href='livello.php?level=5'>
                            <img src='../img/numeri/5.png' alt='five' width='80' height='100' class='unblocked'></img>
                        </a>
                        ");
                    } else {
                        echo("
                        <img src='../img/numeri/5_blocked.png' alt='five' width='100' height='100' class='blocked'></img>
                        ");
                    }
                    if($level >= 6){
                        echo("
                        <a href='livello.php?level=6'>
                            <img src='../img/numeri/6.png' alt='six' width='80' height='100' class='unblocked'></img>
                        </a>
                        ");
                    } else {
                        echo("
                        <img src='../img/numeri/6_blocked.png' alt='six' width='100' height='100' class='blocked'></img>
                        ");
                    }
                ?>
            </div>
            <div class = "num">
                <?php
                    if($level >= 7){
                        echo("
                        <a href='livello.php?level=7'>
                            <img src='../img/numeri/7.png' alt='seven' width='60' height='100' class='unblocked'></img>
                        </a>
                        ");
                    } else {
                        echo("
                        <img src='../img/numeri/7_blocked.png' alt='seven' width='60' height='100' class='blocked'></img>
                        ");
                    }
                    if($level >= 8){
                        echo("
                        <a href='livello.php?level=8'>
                            <img src='../img/numeri/8.png' alt='eight' width='80' height='100' class='unblocked'></img>
                        </a>
                        ");
                    } else {
                        echo("
                        <img src='../img/numeri/8_blocked.png' alt='eight' width='100' height='100' class='blocked'></img>
                        ");
                    }
                    if($level >= 9){
                        echo("
                        <a href='livello.php?level=9'>
                            <img src='../img/numeri/9.png' alt='nine' width='80' height='100' class='unblocked'></img>
                        </a>
                        ");
                    } else {
                        echo("
                        <img src='../img/numeri/9_blocked.png' alt='nine' width='100' height='100' class='blocked'></img>
                        ");
                    }
                ?>
            </div>
        </form>
    </div>
        
</body>
</html>
