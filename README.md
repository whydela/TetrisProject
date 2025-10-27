# Tetris Arcade Game

## 🕹️ Overview

This project is a web-based arcade Tetris game built with **PHP, MySQL, and vanilla JavaScript**. It features a complete user authentication system, multiple game modes (Marathon and Level-based), a high-score leaderboard, and a shop for cosmetic customization.

[cite_start]The backend is built in PHP, handling user accounts, sessions, and database interactions[cite: 1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]. [cite_start]The entire game logic—including block physics, rotation, collision detection, and scoring—is written in JavaScript, running in the browser on an HTML5 `<canvas>`[cite: 15, 16, 17, 18, 19]. [cite_start]The game client communicates with the PHP backend via AJAX (`XMLHttpRequest`) to save high scores, level progression, and user preferences[cite: 17, 19, 21].

## 📁 Project Structure

This project contains the following key files:

### Core PHP Files
* **`index.php`**: The main login page for the application. [cite_start]It handles user input, form validation, and server-side password verification[cite: 1].
* **`signup.php`**: The user registration page. [cite_start]Handles new user creation, password hashing, and insertion of default user data into the database[cite: 13].
* [cite_start]**`home.php`**: The main menu/dashboard shown after a user logs in. Provides navigation to the different game modes and features[cite: 3].
* **`connessione.php`**: The database connection script. [cite_start]It connects to the MySQL database and initializes PHP sessions (`session_start()`)[cite: 6].
* **`update.php`**: The central backend endpoint for all AJAX requests from the game. [cite_start]It updates high scores, saves level progression, unlocks new items, and sets the user's active skin or theme[cite: 5].

### Game Mode & UI (PHP)
* **`marathon.php`**: The PHP page that hosts the "Marathon" (endless) game mode. [cite_start]It loads the user's current theme, skin, and high score before starting the game[cite: 11].
* **`sceltaLivello.php`**: The "Level Select" screen. [cite_start]It queries the database to see the user's highest completed level and dynamically displays which levels are unlocked or locked[cite: 4].
* **`livello.php`**: The PHP page that hosts the "Level" (challenge) game mode. [cite_start]It loads the specific level's objectives and layout based on a URL parameter[cite: 2].
* **`themeskin.php`**: The "Skins and Themes" shop page. [cite_start]It queries the database to show all available items and which ones the user has unlocked[cite: 9].
* **`score.php`**: The "Leaderboard" page. [cite_start]It queries the database and displays all user high scores in descending order[cite: 12].
* [cite_start]**`shop.php`**: A placeholder file; the primary shop functionality is in `themeskin.php`[cite: 7, 9].

### JavaScript (Game Logic)
* **`tetris.js`**: The core game engine. [cite_start]It defines block shapes, colors, and all primary functions for block movement, rotation, collision detection, and rendering on the `<canvas>`[cite: 15].
* **`marathon.js`**: JavaScript for the "Marathon" mode. [cite_start]It manages scoring, leveling (which increases game speed), and saving the final high score via AJAX[cite: 17].
* **`level.js`**: JavaScript for the "Level" mode. [cite_start]It loads predefined level layouts, tracks objectives (e.g., "clear 9 rows in 50 moves"), and saves level completion status via AJAX[cite: 19].
* **`shop.js`**: JavaScript for the shop page (`themeskin.php`). [cite_start]It handles user clicks on themes/skins and sends AJAX requests to `update.php` to change the active cosmetic[cite: 21].

### Database & Styling
* **`tetris.sql`**: The MySQL database export file. [cite_start]It contains the schema for all tables (`user`, `skin`, `theme`, etc.) and default data[cite: 18].
* [cite_start]**`tetris.css`**: The single stylesheet for the entire project, including the login form, game UI, shop, and leaderboard[cite: 20].
* [cite_start]**`EsportaDB.bat`**: A Windows batch script utility for developers to export the database structure and data[cite: 22].

---

## 🗄️ Database Schema

[cite_start]The `tetris.sql` file defines the following database structure[cite: 18]:

* **`user`**: The main table for user accounts.
    * `Username` (VARCHAR): The user's unique name (Primary Key).
    * `Psw` (VARCHAR): The user's **hashed** password.
    * `Coins` (INT): A currency (not fully implemented in the provided JS).
    * `Theme` (INT): Foreign Key to `theme.IdTheme`. Stores the user's *currently active* theme.
    * `Skin` (INT): Foreign Key to `skin.IdSkin`. Stores the user's *currently active* block skin.
    * `Record` (BIGINT): The user's all-time high score in Marathon mode.
* [cite_start]**`theme`**: A catalog table storing the available background themes[cite: 18].
    * `IdTheme` (INT): Primary Key.
    * `Url` (VARCHAR): The file path to the theme image.
* [cite_start]**`skin`**: A catalog table storing the available block skins[cite: 18].
    * `IdSkin` (INT): Primary Key.
    * `Url` (VARCHAR): The file path to the skin image.
* [cite_start]**`themewallet`**: A junction table that links users to the themes they have unlocked[cite: 18].
    * `user` (VARCHAR): Foreign Key to `user.Username`.
    * `theme` (INT): Foreign Key to `theme.IdTheme`.
* [cite_start]**`skinwallet`**: A junction table that links users to the skins they have unlocked[cite: 18].
    * `user` (VARCHAR): Foreign Key to `user.Username`.
    * `skin` (INT): Foreign Key to `skin.IdSkin`.

---

## ✨ Key Features

### 1. User Authentication
* [cite_start]**Secure Registration (`signup.php`):** New user passwords are securely hashed using `password_hash()`[cite: 13]. [cite_start]The system also populates the `skinwallet` and `themewallet` with default items upon creation[cite: 13].
* [cite_start]**Secure Login (`index.php`):** Uses **prepared statements** (`mysqli_prepare`) to prevent SQL injection and `password_verify()` to securely check passwords against the stored hash[cite: 1].
* [cite_start]**Session Management (`connessione.php`):** Uses PHP sessions (`session_start()`, `$_SESSION["username"]`) to maintain user login state across all pages[cite: 6, 3, 4, 2, 11, 12, 9].

### 2. Dual Game Modes
* [cite_start]**Marathon Mode (`marathon.js`):** The classic endless Tetris experience[cite: 11].
    * Score and level tracking. [cite_start]The game speed increases as the user's `level` increases[cite: 17].
    * [cite_start]When the game ends, the final score is sent to `update.php` via an AJAX call (`upScore()`)[cite: 17]. [cite_start]The backend only updates the `Record` if the new score is higher than the existing one[cite: 5].
* [cite_start]**Level Mode (`level.js`):** A challenge-based mode with 9 unique levels[cite: 2, 4].
    * [cite_start]Each level has a predefined starting board and specific objectives (e.g., "Complete 9 Rows in 50 Moves")[cite: 19].
    * [cite_start]When a level is won, the `updateLevel()` function sends an AJAX request to `update.php`[cite: 19].
    * [cite_start]The backend then updates the user's `level` in the `user` table and inserts the newly unlocked cosmetic item into the `skinwallet` or `themewallet` table[cite: 5].

### 3. Core Game Engine (`tetris.js`)
* [cite_start]**Canvas Rendering:** All game elements (blocks, grid, shadow) are drawn and updated on an HTML5 `<canvas>`[cite: 15].
* [cite_start]**State Management:** Uses 2D arrays (`boolMatrix`, `helpMatrix`) to track the game board state, including which cells are occupied and by what color[cite: 15].
* [cite_start]**Ghost Piece:** A "shadow" (`drawShape`) shows where the active block will land[cite: 15].
* [cite_start]**Collision Detection:** Robust logic for horizontal (`cautionWall`, `cautionInline`) and vertical (`cautionDown`) collisions[cite: 15].

### 4. Customization Shop (`themeskin.php` & `shop.js`)
* [cite_start]Users can customize their game with different background **themes** and block **skins**[cite: 9].
* [cite_start]Items are unlocked by completing levels in the Level Mode[cite: 5, 21]. [cite_start]The shop UI dynamically renders items as "blocked" or "unblocked" by checking the `themewallet` and `skinwallet` tables[cite: 9].
* [cite_start]User selections are saved to their profile via an AJAX call, allowing preferences to persist between sessions[cite: 21].

### 5. Leaderboard (`score.php`)
* [cite_start]A global leaderboard that queries the `user` table[cite: 12].
* [cite_start]It displays all users' high scores, ordered from highest to lowest (`ORDER BY record DESC`)[cite: 12].

---

## 🚀 Installation and Usage

1.  **Database Setup**:
    * Ensure you have a **MySQL** server (e.g., via XAMPP, WAMP, or MAMP).
    * Import the `tetris.sql` file into your MySQL server. [cite_start]This will create the `tetris` database and all required tables with default data[cite: 18].

2.  **Web Server**:
    * Place all the project files in a directory on a local web server (e.g., inside the `htdocs` folder for XAMPP).

3.  **Configuration**:
    * [cite_start]Open the **`connessione.php`** file[cite: 6].
    * Update the `$host`, `$usr`, `$psw`, and `$db` variables to match your local MySQL database credentials.
        ```php
        $host = "localhost";
        $usr = "root";
        $psw  = "YOUR_PASSWORD"; // E.g., "root" or empty ""
        $db = "tetris";
        ```

4.  **Run the Game**:
    * Start your web server (e.g., start Apache and MySQL in XAMPP).
    * Open your web browser and navigate to the project's root directory (e.g., `http://localhost/tetris/` or `http://localhost/your-folder-name/`).
    * [cite_start]You can register a new account on the `signup.php` page or log in[cite: 1, 13].

