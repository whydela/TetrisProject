<!-- Piccolo codice per la connessione al database -->

<?php

    $host = "localhost";
    $usr = "root";
    $psw  = "root";
    $db = "tetris";

    $connessione = mysqli_connect($host, $usr, $psw, $db);
    session_start();    

    if (mysqli_connect_errno()) {
        die(mysqli_connect_error());
    }

?>
