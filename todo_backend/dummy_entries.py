import mysql.connector

# Connect to MySQL server
mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password=""
)

cursor = mydb.cursor()
cursor.execute("USE todo_db")



# Insert sample data into users table
users_data = [
    ("Alice Johnson", "alice@example.com", "alice", "password1"),
    ("Bob Smith", "bob@example.com", "bob", "password2"),
    ("Charlie Brown", "charlie@example.com", "charlie", "password3"),
    ("Diana Prince", "diana@example.com", "diana", "password4"),
    ("Evan Wright", "evan@example.com", "evan", "password5")
]

cursor.executemany("""
INSERT INTO users (name, email, username, password)
VALUES (%s, %s, %s, %s)
""", users_data)

# Insert sample data into tasks table
tasks_data = [
    (1, "Task 1 for Alice", "pending"),
    (1, "Task 2 for Alice", "completed"),
    (2, "Task 1 for Bob", "pending"),
    (3, "Task 1 for Charlie", "completed"),
    (4, "Task 1 for Diana", "pending")
]

cursor.executemany("""
INSERT INTO tasks (user_id, task_name, task_status)
VALUES (%s, %s, %s)
""", tasks_data)
# Insert sample data into activetokens table
tokens_data = [
    (1, "token_for_alice"),
    (2, "token_for_bob"),
    (3, "token_for_charlie"),
    (4, "token_for_diana"),
    (5, "token_for_evan")
]

cursor.executemany("""
INSERT INTO activetokens (user_id, token)
VALUES (%s, %s)
""", tokens_data)

# Commit the transactions
mydb.commit()

print("Sample data inserted successfully.")

# Close the cursor and connection
cursor.close()
mydb.close()