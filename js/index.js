window.onload = function(){
    const taskField = document.getElementById('taskField');
    const taskBtn = document.getElementById('taskBtn');
    const allTask = document.getElementById('allTask');

    taskField.addEventListener('keypress', function(event){
        if(event.keyCode === 13){
            createNewTask(allTask, event.target.value);
        }
    });
    taskBtn.addEventListener('click', function(){
        createNewTask(allTask, taskField.value);
    })
}

function createNewTask(parentNode, task){
    taskField.value = '';
    let col = document.createElement('div');
    col.className = 'col-sm-3';
    let singleTask = document.createElement('div');
    singleTask.className = 'single-task d-flex';
    let para = document.createElement('p');
    para.innerHTML = task;
    singleTask.appendChild(para);
    
    let span = document.createElement('span');
    span.className = 'ml-auto';
    span.style.cursor = 'pointer';
    span.innerHTML = `<i class="fas fa-times-circle"></i>`;
    span.addEventListener('click', function(){
        parentNode.removeChild(col);
    });
    singleTask.appendChild(span);

    let taskController = createTaskController(singleTask);
    taskController.style.visibility = 'hidden';
    singleTask.appendChild(taskController);

    singleTask.onmouseenter = function(){
        taskController.style.visibility = 'visible';
    }

    singleTask.onmouseleave = function(){
        taskController.style.visibility = 'hidden';
    }

    col.appendChild(singleTask);
    parentNode.appendChild(col)
}

function createTaskController(parent){
    let controlPanel = document.createElement('div');
    controlPanel.className = 'task-control-panel d-flex align-items-center';

    let colorPallet = createColorPallet(parent);
    controlPanel.appendChild(colorPallet);

    let editBtn = createEditBtn(parent);
    controlPanel.appendChild(editBtn);

    return controlPanel;
}

function createEditBtn(parent){
    let span = document.createElement('span');
    span.className = 'ml-auto mr-2';
    span.innerHTML = `<i class="fas fa-edit"></i>`;
    span.style.color = "#fff"
    span.style.cursor = 'pointer';

    span.addEventListener('click', function(){
        let p = parent.querySelector('p');
        let textArea = document.createElement('textarea');
        textArea.className = "inner-textarea";
        textArea.style.width = parent.offsetWidth + 'px';
        textArea.style.height = parent.offsetHeight + 'px';
        textArea.innerHTML = p.innerHTML;

        textArea.addEventListener('keypress', function(){
            if(event.keyCode === 13){
                event.stopPropagation();
                if(this.value){
                    p.innerHTML = this.value;
                    parent.removeChild(this);
                }else{
                    alert("Please Put Some Data");
                }
            }
        })

        parent.appendChild(textArea);        
    })

    return span;
}

function createColorPallet(parent){
    const colors = ['palegreen', 'skyblue', 'powderblue', 'salmon', 'grey', 'red'];

    let colorDiv = document.createElement('div');
    colorDiv.className = 'd-flex'
    colors.forEach(color => {
        let div = document.createElement('div');
        div.className = 'color-circle ml-1';
        div.style.background = color;
        div.style.cursor = 'pointer'
        div.addEventListener('click', function(){
            parent.style.background = color;
        })
        colorDiv.appendChild(div);
    });

    return colorDiv;
}