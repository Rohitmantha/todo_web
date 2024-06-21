# 📝 To-Do App Backend

Welcome to the To-Do App Backend project! This is a simple backend for a To-Do application built with Flask, featuring user authentication and task management functionalities. Let's get you started! 🚀

## Getting Started

Follow these instructions to set up and run the backend on your local machine.

### Prerequisites

Make sure you have the following installed:
- 🐍 [Python 3.x](https://www.python.org/downloads/)
- 🐬 [MySQL Server](https://dev.mysql.com/downloads/mysql/)

### Installation

1. **Clone the Repository**

    First, download the project folder from GitHub:

    ```sh
    git clone https://github.com/yourusername/todo_backend.git
    cd todo_backend
    ```

2. **Start Your MySQL Server**

    Ensure your MySQL server is up and running. You might need to create a database and update the database configuration in your project.

3. **Run the Launch Script**

    Use the `run_todo_backend.bat` script to create a virtual environment, install the required dependencies, initialize the database, and then launch the Flask application:

    ```sh
    run_todo_backend.bat
    ```

### Usage

Once the backend is running, you can interact with it by sending HTTP requests to the endpoints. By default, the backend server runs on `http://127.0.0.1:5000/`.

### API Endpoints

Here's a quick guide to the available API endpoints:

- **Login**
    - `POST /login/`
    - Request: `{"username": "your_username", "password": "your_password"}`
    - Response: `{"token": "your_token"}`

- **Register**
    - `POST /register/`
    - Request: `{"name": "Your Name", "email": "your_email@example.com", "username": "your_username", "password": "your_password"}`
    - Response: `{"token": "your_token"}`

- **Get Profile Details**
    - `POST /profile/`
    - Headers: `Authorization: your_token`
    - Response: Profile details in JSON format.

- **To-Do Tasks**
    - `GET /todo/`
    - Headers: `Authorization: your_token`
    - Response: List of tasks.

    - `POST /todo/create/`
    - Headers: `Authorization: your_token`
    - Request: `{"title": "New Task"}`
    - Response: `{"id": task_id, "title": "New Task"}`

    - `PUT /todo/<int:id>/`
    - Headers: `Authorization: your_token`
    - Request: `{"title": "Updated Task"}`
    - Response: `{"id": task_id, "title": "Updated Task"}`

    - `DELETE /todo/<int:id>/`
    - Headers: `Authorization: your_token`
    - Response: `removed successfully`

- **Logout**
    - `GET /logout/`
    - Headers: `Authorization: your_token`
    - Response: `Logged out`

### License

This project is licensed under the MIT License. 📜

### Acknowledgments

Big thanks to the following resources for making this project possible:
- 📚 [Flask documentation](https://flask.palletsprojects.com/)
- 📘 [MySQL documentation](https://dev.mysql.com/doc/)

Feel free to reach out if you have any questions or need further assistance. Happy coding! 💻✨
