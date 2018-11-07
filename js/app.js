
function loadTasks(taskList){
    let container = document.getElementById('taskContainer');
    container.innerHTML='';

    taskList.forEach((task,i)=>{
        let divTask = document.createElement('div');
        divTask.className="taskCard";
        divTask.innerHTML = `
            ${task.img?"<img src='" + task.img + "' />":""}
            <div class="task-complete-cont"><button data-index=${i} class="button-two js-complete">click to complete</button><p class="task-title">${task.title + ' ' + i}</p></div>
            <span class="task-date">created on ${task.createdOn} by ${task.createdBy}</span>
            <p class="task-description">${task.description}</p>
            <span class="task-due task-date">Due on ${task.dueDate}</span>            
        `;

        if(task.completed)
            divTask.classList.add("taskCompleted");
        else if(task.dueDate < Date.now() )
            divTask.classList.add("taskLate");


        container.appendChild(divTask);
    });
    
    $('.js-complete').on("click", updateCompletedTask);

}

loadTasks(taskList);


function completeTask(indexToComplete){
    taskList = taskList.filter((task, i)=>{
       return i !== indexToComplete;
    });
    loadTasks(taskList);
}

function addTask(task){
    taskList.unshift(task);
    loadTasks(taskList);
}

function updateCompletedTask(e){
    var currTargIndex = Number($(e.currentTarget).attr('data-index'));
    completeTask(currTargIndex); 
}

$('.js-clear-all-tasks').on("click", ()=>{
   taskList.length = 0; 
   loadTasks(taskList);
});






