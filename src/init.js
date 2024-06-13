//const API_BASE_URL = 'http://localhost:5000';

function getTasks() {
    /***
     * @todo Fetch the tasks created by the user and display them in the dom.
     */
    axios({
        headers: {
            Authorization: localStorage.getItem('token'),
        },
        url: API_BASE_URL + '/todo/',
        method: 'get',
    }).then(function({data, status}) {
        const n=data.length;
        for(let i=0;i<n;i++){
            const task_id=data[i].task_id;
            const title=data[i].title;
            const taskslist = document.getElementsByClassName('todo-available-tasks')[0];
            const taskhtml = `
                <li id="element-${task_id}" class="list-group-item d-flex justify-content-between align-items-center">
                    <input id="input-button-${task_id}" type="text" class="form-control todo-edit-task-input hideme" placeholder="Edit The Task">
                    <div id="done-button-${task_id}" class="input-group-append hideme">
                        <button class="btn btn-outline-secondary todo-update-task" type="button" onclick="updateTask(${task_id})">Done</button>
                    </div>
                    <div id="task-${task_id}" class="todo-task">
                        ${title}
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
        }
    })
}

axios({
    headers: {
        Authorization: localStorage.getItem('token'),
    },
    url: API_BASE_URL + '/profile/',
    method: 'post',
}).then(function({data, status}) {
    document.getElementById('avatar-image').src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(data.name) + '&background=fff&size=33&color=007bff';
    document.getElementById('profile-name').innerHTML = data.name;
  getTasks();
}).catch(function (error) {
    displayErrorToast('You are not logged in properly. Please try again.');
    console.error(error);
    window.location.href = '/login/';
});
