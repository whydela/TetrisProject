<!DOCTYPE html>
<html lang="it">
<head>
    <link rel="icon" href="/tetris/img/icone/icona.png" type="image/x-icon">
    <link rel="stylesheet" href="../tetris.css">
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sign up</title>
    <style>
        #back{
            position: absolute;
            top: -1%;
            left: 2%;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <a href="../index.php">
        <img src="../img/icone/back.png" alt="back" id = "back" width = "100">
    </a>
    <div class = "main">
        <div class="logo"><img src="/tetris/img/sfondi/logo.png" alt="logo" width = "400"></div>
        <form action="signup.php" method="POST">
            <div class = "credenziali">
                <div class = "username">
                    <img src="/tetris/img/icone/usr2.png" alt="usrr" class = "usr">
                    <input type="text" name = "username" placeholder = "Username">
                </div>
                <div class = "password">
                    <img src="/tetris/img/icone/psw.png" alt="psww" class = "usr">
                    <input type="password" name = "psw1" placeholder = "Password">
                </div>
                <div class = "password">
                    <img src="/tetris/img/icone/psw.png" alt="psww" class = "usr">
                    <input type="password" name = "psw2" placeholder = "Conferma Password">
                </div>
            </div>
            <button class = "submit" name = "signup">Sign up</button>
        </form>
        </div>
    </div>
        
</body>
</html>

<?php


if ($_POST) {

    $username = $_POST["username"];
    $password = $_POST["psw1"];
    $confirm = $_POST["psw2"];

    if (empty($username)) {
        echo ("
            <script>
                alert('ATTENZIONE ! Lo username non può essere vuoto'); 
                window.history.back();
            </script>"
        );
        exit();
    }

    // Una password costituita dal solo carattere 0 non è considerata valida
    if (empty($password)) {
        echo ("
            <script>
                alert('ATTENZIONE ! La password non può essere vuota'); 
                window.history.back();
            </script>
        ");
        exit();
    }

    if($password != $confirm){
        echo ("
            <script>
                alert('ATTENZIONE ! Le due password non coincidono !'); 
                window.history.back();
            </script>"
        );
        exit();
    }

    signup($username, $password);

}

function signup($username, $password)
{

    require_once "./connessione.php";
    $pswHashata = password_hash($password, PASSWORD_BCRYPT);
    $sql = "INSERT INTO User VALUES (?, ?, 0, 1, 1, 0, 1)";
    $statement = mysqli_prepare($connessione, $sql);
    mysqli_stmt_bind_param($statement, 'ss', $username, $pswHashata);

    if (!mysqli_stmt_execute($statement)) {
        echo ("
        <script>
            alert('ATTENZIONE ! Utente già registrato !'); 
            window.history.back(); 
            </script>
        ");
        exit();
    }
    $_SESSION["username"] = $username;
    $sql = "INSERT INTO skinwallet VALUES("."'" . $username . "'".", 1)";
    mysqli_query($connessione, $sql);
    $sql = "INSERT INTO themewallet VALUES("."'" . $username . "'".", 1)";
    mysqli_query($connessione, $sql);
    header("location: home.php");
    exit();
    
}
?>
