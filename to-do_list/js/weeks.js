// BEGIN LIST OF TASKS // 
let tasks = [];
//== BEGIN LIST OF TASKS ==// 
// --------------------------------------------------------------------------------------------------------------------- //
// --------------------------------------------------------------------------------------------------------------------- //
// --------------------------------------------------------------------------------------------------------------------- //
// STORAGE FUNCTIONS //
// SETITEM TASKS --- //
function setItemTasksToStorage() 
{
    let tasksString = JSON.stringify(tasks);
    localStorage.setItem("tasksWeeks", tasksString);
}
// --- SETITEM TASKS //
// ===================================================================================================================== //
// GETITEM TASKS --- //
function getItemTasksFromStorage()
{
    let retrievedTasks = JSON.parse(localStorage.getItem("tasksWeeks"));
    tasks = retrievedTasks ?? [];
};
getItemTasksFromStorage();
// --- GETITEM TASKS //
//== STORAGE FUNCTIONS ==//
// --------------------------------------------------------------------------------------------------------------------- //
// --------------------------------------------------------------------------------------------------------------------- //
// --------------------------------------------------------------------------------------------------------------------- //
// FILL TASKS ON THE PAGE //
function fillTasksOnThePage()
{
    document.getElementById("list").innerHTML = "";

    let index = 0;
    for(task of tasks)
    {
        let content =
        `
            <!-- BEGIN: LIST -->
            <div id="list">
                <div id="list-form" class="row mt-3 p-5 rounded-pill">
                    <div class="col-sm-4" style="margin: auto; overflow: auto">
                        <b>
                            ${task.title} 
                        </b>
                        <div id="list-form-date" class="mt-1" style="font-size: 1vw;">
                            <span class="material-symbols-outlined" style="padding-left: 0.3vw;">
                                calendar_month
                            </span>
                            <span>${task.date}</span>
                        </div>
                    </div>
                    <div id="taskFrom" class="col-sm-2" style="margin: auto;">${task.from ?? ""}</div>
                    <div id="taskTo" class="col-sm-2" style="margin: auto;">${task.to ?? ""}</div>
                    <div id="tasksInd" class="col-sm-4 style="margin: auto;">
                        <div id="task-index" class="row d-flex justify-content-center align-items-center" style="width: 100%; height: 100%; margin-right: 2vw;">
                            ${task.isDone ?
                            ` 
                                <div class="col-sm-4">
                                    <div onclick="toggleTaskcompletion(${index})" class="center-list" style="background-color: green;">
                                        <span class="material-symbols-outlined">
                                            done
                                        </span>
                                    </div>
                                </div>
                            `:`
                                <div class="col-sm-4">
                                    <div onclick="toggleTaskcompletion(${index})" class="center-list" style="background-color: red">
                                        <span class="material-symbols-outlined">
                                            cancel
                                        </span>
                                    </div>
                                </div>
                            `}
                            <div class="col-sm-4">
                                <div onclick="editTask(${index})" class="center-list" style="background-color: blue;">
                                    <span class="material-symbols-outlined">
                                        edit
                                    </span>
                                </div>
                            </div>
                            <div class="col-sm-4"">
                                <div onclick="deleteTask(${index})" class="center-list" style="background-color: rgb(110, 0, 114);">
                                    <span class="material-symbols-outlined">
                                        delete
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- END: LIST -->
        `

        document.getElementById("list").innerHTML += content;

        index++;
    }
};
fillTasksOnThePage();
//== FILL TASKS ON THE PAGE ==//
// --------------------------------------------------------------------------------------------------------------------- //
// --------------------------------------------------------------------------------------------------------------------- //
// --------------------------------------------------------------------------------------------------------------------- //


// --------------------------------------------------------------------------------------------------------------------- //
// --------------------------------------------------------------------------------------------------------------------- //
// --------------------------------------------------------------------------------------------------------------------- //
// CRUD //
// ===================================================================================================================== //
// ===================================================================================================================== //
// ADD TASK FUNCTION //
document.getElementById('add-icon').addEventListener("click", function()
{
    
    document.getElementById('task-form').style.visibility = "visible";

    // SUBMIT BUTTON //
    document.getElementById('submit-btn').addEventListener("click", function()
    {
        let taskTitle = document.getElementById('taskTitle').value;
        let dateForm =  document.getElementById('date-from').value;
        let dateTo =  document.getElementById('date-to').value;
        if(taskTitle != "" && dateForm != "" && dateTo != "")
        {
            let now = new Date();
            let date = now.getDate() + " / " + (now.getMonth() + 1) + " / " + now.getFullYear();
            let taskobj = {
                "title": taskTitle,
                "date": date,
                "from": dateForm,
                "to": dateTo,
                "isDone": false
            };
            tasks.push(taskobj);

            setItemTasksToStorage();
            fillTasksOnThePage();

            document.getElementById('task-form').style.visibility = "hidden";

            window.location.href = "weeks.html";
            
        } else{
            alert('إملأ  المتطلبات الموجودة في النموذج')
        }
    });
    //== SUBMIT BUTTON ==//
    // ================================================================================================================= //
    // CANCEL BUTTON //
    document.getElementById('cancel-btn').addEventListener("click", function()
    {
        document.getElementById('task-form').style.visibility = "hidden";

    })
    //== CANCEL BUTTON ==//
});
//== ADD TASK FUNCTION ==//
// ===================================================================================================================== //
// ===================================================================================================================== //
// TOGGLE TASKS COMPLETION //
function toggleTaskcompletion(index)
{
    let task = tasks[index];
    task.isDone = !task.isDone;

    setItemTasksToStorage();
    fillTasksOnThePage();
}
//== TOGGLE TASKS COMPLETION ==//
// ===================================================================================================================== //
// ===================================================================================================================== //
// UPDATE TASK FUNCTION //
function editTask(index) 
{
    let task = tasks[index];

    document.getElementById('task-form').style.visibility = "visible";

    // SUBMIT BUTTON //
    document.getElementById('submit-btn').addEventListener("click", function()
    {
        let newTaskTitle = document.getElementById('taskTitle').value;
        let newdateForm =  document.getElementById('date-from').value;
        let newdateTo =  document.getElementById('date-to').value;
        if(newTaskTitle != "" && newdateForm != "" && newdateTo != "")
        {
            task.title = newTaskTitle
            task.from = newdateForm 
            task.to = newdateTo 

            setItemTasksToStorage();
            fillTasksOnThePage();
            
            document.getElementById('task-form').style.visibility = "hidden";

            window.location.href = "weeks.html";

        } else{
            alert('لم تقوم بكامل التعديلات')
        }
    });
    //== SUBMIT BUTTON ==//
    // ================================================================================================================= //
    // CANCEL BUTTON //
    document.getElementById('cancel-btn').addEventListener("click", function()
    {
        document.getElementById('task-form').style.visibility = "hidden";
    }) 
}
    //== CANCEL BUTTON ==//
//== UPDATE TASK FUNCTION ==//
// ===================================================================================================================== //
// ===================================================================================================================== //
// DELETE TASK FUNCTION //
function deleteTask(index) {
    let task = tasks[index];
    let isConfirmed = confirm(`هل أنت متأكد من حذف هذه المهمة [${task.title}]`);
    if(isConfirmed) {
        tasks.splice(index, 1);
        
        setItemTasksToStorage();
        fillTasksOnThePage();
    }
};
//== DELETE TASK FUNCTION ==//
// ===================================================================================================================== //
// ===================================================================================================================== //
//== CRUD ==//