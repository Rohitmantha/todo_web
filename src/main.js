function displaySuccessToast(message) {
    iziToast.success({
        title: 'Success',
        message: message
    });
}

function displayErrorToast(message) {
    iziToast.error({
        title: 'Error',
        message: message
    });
}

function displayInfoToast(message) {
    iziToast.info({
        title: 'Info',
        message: message
    });
}

const API_BASE_URL = 'http://localhost:5000';

function logout() {
    console.log("pressed")
    axios({
        headers: {
            Authorization: localStorage.getItem('token'),
        },
        url: API_BASE_URL + '/logout/',
        method: 'get',
    }).then(function () {
        localStorage.removeItem('token');
        window.location.href = '/login/';

    }).catch(function (error) {
        displayErrorToast('An error occurred during logging you out. Please try again later.');
        console.error('Add task error:', error);
    });
}

function registerFieldsAreValid(firstName, lastName, email, username, password) {
    if (firstName === '' || lastName === '' || email === '' || username === '' || password === '') {
        displayErrorToast("Please fill all the fields correctly.");
        return false;
    }
    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
        displayErrorToast("Please enter a valid email address.")
        return false;
    }
    return true;
}

function loginFieldsAreValid(username, password) {
    if (username === '' || password === '') {
        displayErrorToast("Please fill all the fields correctly.");
        return false;
    }
    return true;
}

function register() {
    const firstName = document.getElementById('inputFirstName').value.trim();
    const lastName = document.getElementById('inputLastName').value.trim();
    const email = document.getElementById('inputEmail').value.trim();
    const username = document.getElementById('inputUsername').value.trim();
    const password = document.getElementById('inputPassword').value;

    if (registerFieldsAreValid(firstName, lastName, email, username, password)) {
        displayInfoToast("Please wait...");

        const dataForApiRequest = {
            name: firstName + " " + lastName,
            email: email,
            username: username,
            password: password
        }

        axios({
            url: API_BASE_URL + '/register/',
            method: 'post',
            data: dataForApiRequest,
        }).then(function ({ data, status }) {
            const token = data.token;
            if (token) {
                localStorage.setItem('token', data.token);
                window.location.href = '/';
            } else {
                displayErrorToast('An account using same email or username is already created');
            }
        }).catch(function (error) {
            displayErrorToast('An error occurred. Please try again.');
            console.error('Registration error:', error);
        });
    }
}

function login() {  // Corrected function definition
    const username = document.getElementById('inputUsername').value.trim();
    const password = document.getElementById('inputPassword').value;

    if (loginFieldsAreValid(username, password)) {
        displayInfoToast("Please wait...");

        const dataForApiRequest = {
            username: username,
            password: password
        }

        axios({
            url: API_BASE_URL + '/login/',
            method: 'post',
            data: dataForApiRequest,
        }).then(function ({ data, status }) {
            const token = data.token;
            if (token) {
                localStorage.setItem('token', data.token);
                window.location.href = '/';
            } else {
                displayErrorToast('Invalid username or password, please try again.');
            }
        }).catch(function (error) {
            displayErrorToast('An error occurred during login. Please try again later.');
            console.error('Login error:', error);
        });
    }
}
function addTask() {
    /**
     * @todo Complete this function.
     * @todo 1. Send the request to add the task to the backend server.
     * @todo 2. Add the task in the dom.
     */
    const taskslist = document.getElementsByClassName('todo-available-tasks')[0];
    const newtask = document.getElementById("inputnewtask").value.trim();

    if (newtask != '') {
        displayInfoToast("Please wait...");

        const dataForApiRequest = {
            title: newtask
        }

        axios({
            headers: {
                Authorization: localStorage.getItem('token'),
            },
            url: API_BASE_URL + '/todo/create/',
            method: 'post',
            data: dataForApiRequest,
        }).then(function ({ data }) {
            const task_id = data.id;
            const taskhtml = `
                <li id="element-${task_id}" class="list-group-item d-flex justify-content-between align-items-center">
                    <input id="input-button-${task_id}" type="text" class="form-control todo-edit-task-input hideme" placeholder="Edit The Task">
                    <div id="done-button-${task_id}" class="input-group-append hideme">
                        <button class="btn btn-outline-secondary todo-update-task" type="button" onclick="updateTask(${task_id})">Done</button>
                    </div>
                    <div id="task-${task_id}" class="todo-task">
                        ${data.title}
                    </div>
                    <span id="task-actions-${task_id}">
                        <button style="margin-right:5px;" type="button" onclick="editTask(${task_id})" class="btn btn-outline-warning">
                            <img src="https://res.cloudinary.com/nishantwrp/image/upload/v1587486663/CSOC/edit.png" width="18px" height="20px">
                        </button>
                        <button type="button" class="btn btn-outline-danger" onclick="deleteTask(${task_id})">
                            <img src="https://res.cloudinary.com/nishantwrp/image/upload/v1587486661/CSOC/delete.svg" width="18px" height="22px">
                        </button>
                    </span>
                </li>`;

            // Create a temporary container to parse the string into an HTML element
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = taskhtml;
            const taskElement = tempDiv.firstElementChild;

            // Append the new task element to the task list
            taskslist.appendChild(taskElement);

            // Clear the input field
            document.getElementById("inputnewtask").value = '';

        }).catch(function (error) {
            displayErrorToast('An error occurred during adding task. Please try again later.');
            console.error('Add task error:', error);
        });
    }
}

function editTask(id) {
    const task=document.getElementById('task-' + id)
    const taskactions=document.getElementById('task-actions-' + id)
    const newtext=document.getElementById('input-button-' + id)
    const donebutton=document.getElementById('done-button-' + id)

    taskactions.classList.add('hideme');
    task.classList.add('hideme');
    donebutton.classList.remove('hideme');
    newtext.classList.remove('hideme');

    donebutton.addEventListener("click", () => {
        
        const dataForApiRequest = {
            title:newtext.value
        }

        axios({
            headers: {
                Authorization: localStorage.getItem('token'),
            },
            url: API_BASE_URL + '/todo/'+String(id)+'/',
            method: 'put',
            data: dataForApiRequest,
        }).then(function ({ data, status }) {
            taskactions.classList.remove('hideme');
            task.classList.remove('hideme');
            donebutton.classList.add('hideme');
            newtext.classList.add('hideme');
            task.textContent=data.title;
        }).catch(function (error) {
            displayErrorToast('An error occurred during updating value. Please try again later.');
            console.error('Login error:', error);
        });
    });

}

function deleteTask(id) {
    /**
     * @todo Complete this function.
     * @todo 1. Send the request to delete the task to the backend server.
     * @todo 2. Remove the task from the dom.
     */

    const element=document.getElementById("element-"+id);
    axios({
        headers: {
            Authorization: localStorage.getItem('token'),
        },
        url: API_BASE_URL + '/todo/'+String(id)+'/',
        method: 'delete',
    }).then(function ({ data, status }) {
        element.remove();
    }).catch(function (error) {
        displayErrorToast('An error occurred during removing task. Please try again later.');
        console.error('Login error:', error);
    });
}
