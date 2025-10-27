# Tetris Arcade Game

## 🕹️ Overview

This project is a web-based arcade Tetris game built with **PHP, MySQL, and vanilla JavaScript**. It features a complete user authentication system, multiple game modes (Marathon and Level-based), a high-score leaderboard, and a shop for cosmetic customization.

The backend is built in PHP, handling user accounts, sessions, and database interactions. The entire game logic—including block physics, rotation, collision detection, and scoring—is written in JavaScript, running in the browser on an HTML5 `<canvas>`. The game client communicates with the PHP backend via AJAX (`XMLHttpRequest`) to save high scores, level progression, and user preferences.

## 📁 Project Structure

This project contains the following key files:

### Core PHP Files
* **`index.php`**: The main login page for the application. It handles user input, form validation, and server-side password verification.
* **`signup.php`**: The user registration page. Handles new user creation, password hashing, and insertion of default user data into the database.
* **`home.php`**: The main menu/dashboard shown after a user logs in. Provides navigation to the different game modes and features.
* **`connessione.php`**: The database connection script. It connects to the MySQL database and initializes PHP sessions (`session_start()`).
* **`update.php`**: The central backend endpoint for all AJAX requests from the game. It updates high scores, saves level progression, unlocks new items, and sets the user's active skin or theme.

### Game Mode & UI (PHP)
* **`marathon.php`**: The PHP page that hosts the "Marathon" (endless) game mode. It loads the user's current theme, skin, and high score before starting the game.
* **`sceltaLivello.php`**: The "Level Select" screen. It queries the database to see the user's highest completed level and dynamically displays which levels are unlocked or locked.
* **`livello.php`**: The PHP page that hosts the "Level" (challenge) game mode. It loads the specific level's objectives and layout based on a URL parameter.
* **`themeskin.php`**: The "Skins and Themes" shop page. It queries the database to show all available items and which ones the user has unlocked.
* **`score.php`**: The "Leaderboard" page. It queries the database and displays all user high scores in descending order.
* **`shop.php`**: A placeholder file; the primary shop functionality is in `themeskin.php`.

### JavaScript (Game Logic)
* **`tetris.js`**: The core game engine. It defines block shapes, colors, and all primary functions for block movement, rotation, collision detection, and rendering on the `<canvas>`.
* **`marathon.js`**: JavaScript for the "Marathon" mode. It manages scoring, leveling (which increases game speed), and saving the final high score via AJAX.
* **`level.js`**: JavaScript for the "Level" mode. It loads predefined level layouts, tracks objectives (e.g., "clear 9 rows in 50 moves"), and saves level completion status via AJAX.
* **`shop.js`**: JavaScript for the shop page (`themeskin.php`). It handles user clicks on themes/skins and sends AJAX requests to `update.php` to change the active cosmetic.

### Database & Styling
* **`tetris.sql`**: The MySQL database export file. It contains the schema for all tables (`user`, `skin`, `theme`, etc.) and default data.
* **`tetris.css`**: The single stylesheet for the entire project, including the login form, game UI, shop, and leaderboard.
* **`EsportaDB.bat`**: A Windows batch script utility for developers to export the database structure and data.

---

## 🗄️ Database Schema

The `tetris.sql` file defines the following database structure:

* **`user`**: The main table for user accounts.
    * `Username` (VARCHAR): The user's unique name (Primary Key).
    * `Psw` (VARCHAR): The user's **hashed** password.
    * `Coins` (INT): A currency (not fully implemented in the provided JS).
    * `Theme` (INT): Foreign Key to `theme.IdTheme`. Stores the user's *currently active* theme.
    * `Skin` (INT): Foreign Key to `skin.IdSkin`. Stores the user's *currently active* block skin.
    * `Record` (BIGINT): The user's all-time high score in Marathon mode.
* **`theme`**: A catalog table storing the available background themes.
    * `IdTheme` (INT): Primary Key.
    * `Url` (VARCHAR): The file path to the theme image.
* **`skin`**: A catalog table storing the available block skins.
    * `IdSkin` (INT): Primary Key.
    * `Url` (VARCHAR): The file path to the skin image.
* **`themewallet`**: A junction table that links users to the themes they have unlocked.
    * `user` (VARCHAR): Foreign Key to `user.Username`.
    * `theme` (INT): Foreign Key to `theme.IdTheme`.
* **`skinwallet`**: A junction table that links users to the skins they have unlocked.
    * `user` (VARCHAR): Foreign Key to `user.Username`.
    * `skin` (INT): Foreign Key to `skin.IdSkin`.

---

## ✨ Key Features

### 1. User Authentication
* **Secure Registration (`signup.php`):** New user passwords are securely hashed using `password_hash()`. The system also populates the `skinwallet` and `themewallet` with default items upon creation.
* **Secure Login (`index.php`):** Uses **prepared statements** (`mysqli_prepare`) to prevent SQL injection and `password_verify()` to securely check passwords against the stored hash.
* **Session Management (`connessione.php`):** Uses PHP sessions (`session_start()`, `$_SESSION["username"]`) to maintain user login state across all pages.

### 2. Dual Game Modes
* **Marathon Mode (`marathon.js`):** The classic endless Tetris experience.
    * Score and level tracking. The game speed increases as the user's `level` increases.
    * When the game ends, the final score is sent to `update.php` via an AJAX call (`upScore()`). The backend only updates the `Record` if the new score is higher than the existing one.
* **Level Mode (`level.js`):** A challenge-based mode with 9 unique levels.
    * Each level has a predefined starting board and specific objectives (e.g., "Complete 9 Rows in 50 Moves").
    * When a level is won, the `updateLevel()` function sends an AJAX request to `update.php`.
    * The backend then updates the user's `level` in the `user` table and inserts the newly unlocked cosmetic item into the `skinwallet` or `themewallet` table.

### 3. Core Game Engine (`tetris.js`)
* **Canvas Rendering:** All game elements (blocks, grid, shadow) are drawn and updated on an HTML5 `<canvas>`.
* **State Management:** Uses 2D arrays (`boolMatrix`, `helpMatrix`) to track the game board state, including which cells are occupied and by what color.
* **Ghost Piece:** A "shadow" (`drawShape`) shows where the active block will land.
* **Collision Detection:** Robust logic for horizontal (`cautionWall`, `cautionInline`) and vertical (`cautionDown`) collisions.

### 4. Customization Shop (`themeskin.php` & `shop.js`)
* Users can customize their game with different background **themes** and block **skins**.
* Items are unlocked by completing levels in the Level Mode. The shop UI dynamically renders items as "blocked" or "unblocked" by checking the `themewallet` and `skinwallet` tables.
* User selections are saved to their profile via an AJAX call, allowing preferences to persist between sessions.

### 5. Leaderboard (`score.php`)
* A global leaderboard that queries the `user` table.
* It displays all users' high scores, ordered from highest to lowest (`ORDER BY record DESC`).

---

## 🚀 Installation and Usage

1.  **Database Setup**:
    * Ensure you have a **MySQL** server (e.g., via XAMPP, WAMP, or MAMP).
    * Import the `tetris.sql` file into your MySQL server. This will create the `tetris` database and all required tables with default data.

2.  **Web Server**:
    * Place all the project files in a directory on a local web server (e.g., inside the `htdocs` folder for XAMPP).

3.  **Configuration**:
    * Open the **`connessione.php`** file.
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
    * You can register a new account on the `signup.php` page or log in.


