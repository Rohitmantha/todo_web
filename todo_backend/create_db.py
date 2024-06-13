import mysql.connector

# Connect to MySQL server
mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password=""
)

cursor = mydb.cursor()

# Create and use the database
cursor.execute("CREATE DATABASE IF NOT EXISTS todo_db")
cursor.execute("USE todo_db")

# Create tables
cursor.execute("""
CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
)
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS tasks (
    task_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    task_name VARCHAR(255) NOT NULL,
    task_status ENUM('pending', 'completed') DEFAULT 'pending',
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
)
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS activetokens (
    user_id INT NOT NULL PRIMARY KEY,
    token VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
)
""")


cursor.close()
mydb.close()
