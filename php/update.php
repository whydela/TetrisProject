<?php
    require_once "./connessione.php";

    if($_POST){
        $livello = $_POST["level"];
        $score = $_POST["score"];
        updateLevel($livello, $connessione); 
        updateHighScore($score, $connessione);
    }

    function updateLevel($livello, $connessione){
        if($livello > 0 && $livello < 10){
            $sql = "UPDATE user
                    SET level =".($livello+1)." 
                    WHERE username = '".$_SESSION["username"]."' and level <= " . ($livello+1) . ";";
            mysqli_query($connessione, $sql);

            switch ($livello) {
                case 1:
                    $sql = "INSERT INTO skinwallet VALUES('".$_SESSION["username"]."', 2);";
                    mysqli_query($connessione, $sql);
                    break;
                case 2:
                    $sql = "INSERT INTO themewallet VALUES('".$_SESSION["username"]."', 2);";
                    mysqli_query($connessione, $sql);
                    break;
                case 3:
                    $sql = "INSERT INTO skinwallet VALUES('".$_SESSION["username"]."', 3);";
                    mysqli_query($connessione, $sql);
                    break;
                case 4:
                    $sql = "INSERT INTO themewallet VALUES('".$_SESSION["username"]."', 3);";
                    mysqli_query($connessione, $sql);
                    break;
                case 5:
                    $sql = "INSERT INTO themewallet VALUES('".$_SESSION["username"]."', 4);";
                    mysqli_query($connessione, $sql);
                    break;
                case 6:
                    $sql = "INSERT INTO themewallet VALUES('".$_SESSION["username"]."', 5);";
                    mysqli_query($connessione, $sql);
                    break;
                case 7:
                    $sql = "INSERT INTO skinwallet VALUES('".$_SESSION["username"]."', 4);";
                    mysqli_query($connessione, $sql);
                    break;
                case 8:
                    $sql = "INSERT INTO themewallet VALUES('".$_SESSION["username"]."', 6);";
                    mysqli_query($connessione, $sql);
                    break;
                case 9:
                    $sql = "INSERT INTO skinwallet VALUES('".$_SESSION["username"]."', 5);";
                    mysqli_query($connessione, $sql);
                    break;
                default:
                    break;
            }



        } else if($livello >= 10){

            $themeskin = $livello - 10;

            switch ($themeskin) {
                case 0:
                    // Setto al player la skin numero 1
                    $sql = "UPDATE user
                    SET skin =".($themeskin+1)."
                    WHERE username = '".$_SESSION["username"]."';";
                    mysqli_query($connessione, $sql);
                    break;
                case 1:
                    // Setto al player la skin numero 2
                    $sql = "UPDATE user
                    SET skin =".($themeskin+1)."
                    WHERE username = '".$_SESSION["username"]."';";
                    mysqli_query($connessione, $sql);
                    break;
                case 2:
                    // Setto al player il tema numero 2
                    $sql = "UPDATE user
                    SET theme =".($themeskin)."
                    WHERE username = '".$_SESSION["username"]."';";
                    mysqli_query($connessione, $sql);
                    break;
                case 3:
                    // Setto al player la skin numero 3
                    $sql = "UPDATE user
                    SET skin =".($themeskin)."
                    WHERE username = '".$_SESSION["username"]."';";
                    mysqli_query($connessione, $sql);
                    break;
                case 4:
                    // Setto al player il tema numero 3
                    $sql = "UPDATE user
                    SET theme =".($themeskin-1)."
                    WHERE username = '".$_SESSION["username"]."';";
                    mysqli_query($connessione, $sql);
                    break;
                case 5:
                    // Setto al player il tema numero 4
                    $sql = "UPDATE user
                    SET theme =".($themeskin-1)."
                    WHERE username = '".$_SESSION["username"]."';";
                    mysqli_query($connessione, $sql);
                    break;
                case 6:
                    // Setto al player il tema numero 5
                    $sql = "UPDATE user
                    SET theme =".($themeskin-1)."
                    WHERE username = '".$_SESSION["username"]."';";
                    mysqli_query($connessione, $sql);
                    break;
                case 7:
                    // Setto al player la skin numero 4
                    $sql = "UPDATE user
                    SET skin =".($themeskin-3)."
                    WHERE username = '".$_SESSION["username"]."';";
                    mysqli_query($connessione, $sql);
                    break;
                case 8:
                    // Setto al player il tema numero 6
                    $sql = "UPDATE user
                    SET theme =".($themeskin-2)."
                    WHERE username = '".$_SESSION["username"]."';";
                    mysqli_query($connessione, $sql);
                    break;
                case 9:
                    // Setto al player la skin numero 5
                    $sql = "UPDATE user
                    SET skin =".($themeskin-4)."
                    WHERE username = '".$_SESSION["username"]."';";
                    mysqli_query($connessione, $sql);
                    break;
                case 10:
                    // Setto al player il tema numero 1
                    $sql = "UPDATE user
                    SET theme =".($themeskin-9)."
                    WHERE username = '".$_SESSION["username"]."';";
                    mysqli_query($connessione, $sql);
                    break;
                default:
                    # code...
                    break;
            }
        }
    }

    function updateHighScore($score, $connessione){
        if($score > 0){
            $sql = "
            UPDATE user
            SET Record =".($score)." 
            WHERE username = '".$_SESSION["username"]."' and Record < " . ($score) . ";";
            echo $sql;
            mysqli_query($connessione, $sql);
        }
    }

?>