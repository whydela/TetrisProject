<!DOCTYPE html>
<html lang="it">
<head>
    <link rel="icon" href="/tetris/img/icone/icona.png" type="image/x-icon">
    <meta name="description" content="Tetris">
    <link rel="stylesheet" href="./tetris.css">
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
</head>
<body>
    <div class = "main">
        <div class="logo"><img src="/tetris/img/sfondi/logo.png" alt="logo" width = "400"></div>
        <form action="index.php" method="POST">
            <div class = "credenziali">
                <div class = "username">
                    <img src="/tetris/img/icone/usr2.png" alt="usrr" class = "usr">
                    <input type="text" name = "username" placeholder = "Username">
                </div>
                <div class = "password">
                    <img src="/tetris/img/icone/psw.png" alt="psww" class = "usr">
                    <input type="password" name = "psw" placeholder = "Password">
                </div>
            </div>
            <button class = "submit" name = "login">Login</button>
        </form>
        <div class = "link">Non hai un account ? <a href="./php/signup.php" name = "signup">Sign up</a></div>
        </div>
    </div>
        
</body>
</html>

<?php

// Nel caso di signup
function signup() {   
    header("location: ./php/signup.php");
}

function login($username, $password) {

    // Includiamo il codice per la connessione al database
    require_once "./php/connessione.php";
    
    $sql = "SELECT Psw FROM User WHERE Username = ?";
    
    if ($statement = mysqli_prepare($connessione, $sql)) {

        // Inseriamo l'username (tipo stringa) nello statement
        mysqli_stmt_bind_param($statement, 's', $username);

        // Eseguiamo lo statement
        mysqli_stmt_execute($statement);
        
        // Attacchiamo i risultati
        mysqli_stmt_bind_result($statement, $pswHashata);

        while (mysqli_stmt_fetch($statement)){
            if (password_verify($password, $pswHashata)){
                $_SESSION["username"] = $username;
                header("location: ./php/home.php");
                return;
            }
        }

        echo (
            "
            <script>
                let usr = document.querySelector('.username');
                let psw = document.querySelector('.password');
                usr.style.borderBottom = 'solid 2px red';
                psw.style.borderBottom = 'solid 2px red';
                alert('Login errato');  
            </script>
            "
        );
    }
}

if ($_POST) {
    
    $username = $_POST["username"];
    $password = $_POST["psw"];

    if (empty($username)) {
        echo ("
            <script>
                alert('ATTENZIONE ! Lo username non può essere vuoto'); 
                let usr = document.querySelector('.username');
                usr.style.borderBottom = 'solid 2px red';
                window.history.back();
            </script>"
        );
        exit();
    }

    // Una password costituita dal solo carattere 0 non è considerata valida
    if (empty($password)) {
        echo (
            "
            <script>
                alert('ATTENZIONE ! La password non può essere vuota'); 
                let psw = document.querySelector('.password');
                psw.style.borderBottom = 'solid 2px red';
                window.history.back();
            </script>
        ");
        exit();
    }

    login($username, $password);

}

?>

<script>
    
</script>


