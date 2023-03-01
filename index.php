<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Tetris - Registrazione account</title>
    <style>
      body {
        background-color: #f0e8d8;
        font-family: 'Courier New', Courier, monospace;
        font-size: 16px;
        margin: 0;
        padding: 0;
      }

      #form-container {
        background-color: #f0e8d8;
        border: 1px solid #a3a3a3;
        box-shadow: 2px 2px 2px #a3a3a3;
        margin: 50px auto;
        max-width: 400px;
        padding: 20px;
      }

      h1 {
        color: #a3a3a3;
        font-size: 28px;
        margin: 0 0 20px;
        text-align: center;
      }

      label {
        color: #a3a3a3;
        display: block;
        font-size: 20px;
        margin: 20px 0 10px;
      }

      input[type="text"],
      input[type="password"] {
        border: none;
        border-bottom: 2px solid #a3a3a3;
        font-size: 16px;
        margin-bottom: 20px;
        padding: 5px;
        width: 100%;
      }

      input[type="submit"] {
        background-color: #a3a3a3;
        border: none;
        color: #f0e8d8;
        cursor: pointer;
        font-size: 20px;
        padding: 10px;
        text-transform: uppercase;
        width: 100%;
      }

      input[type="submit"]:hover {
        background-color: #f0e8d8;
        color: #a3a3a3;
        transition: all 0.3s ease;
      }
    </style>
  </head>
  <body>
    <div id="form-container">
      <h1>Registrazione account</h1>
      <form>
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" />

        <label for="password">Password:</label>
        <input type="password" id="password" name="password" />

        <label for="confirm-password">Conferma password:</label>
        <input type="password" id="confirm-password" name="confirm-password" />

        <input type="submit" value="Registrati" />
      </form>
    </div>
  </body>
</html>
