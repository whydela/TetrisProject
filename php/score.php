<!DOCTYPE html>
<html lang="it">
<head>
    <link rel="icon" href="/tetris/img/icone/icona.png" type="image/x-icon">
    <meta name="description" content="Tetris">
    <link rel="stylesheet" href="../tetris.css">
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Classifica</title>
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
        <div class = "tabella">
            <table>
                <tr> 
                    <th>Posizione</th> 
                    <th>Username</th> 
                    <th>Record</th>
                </tr>
                <?php
                    $sql = "SELECT username, record
                        FROM user
                        WHERE record <> 0
                        ORDER BY record DESC;";
                    $result = mysqli_query($connessione, $sql);
                    $i = 0;
                    while(1) {
                        $row = mysqli_fetch_assoc($result);
                        if(!$row){
                            break;
                        }
                        $i++;
                        $username = $row["username"];
                        $record = $row["record"];
                        echo ("<tr>");
                        echo ("<td>" . $i . "</td>");
                        echo ("<td>" . $username . "</td>");
                        echo ("<td>" . $record . "</td>");
                        echo ("</tr>");
                    }
                ?>
            </table>
        </div>
    </div>
        
</body>
</html>