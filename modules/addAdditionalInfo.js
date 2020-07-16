import {createObjectTask,arrayTasks,arrayAdditionTask} from '../script.js';
let main=document.getElementsByTagName('main');
let mainTasks=document.getElementsByClassName('tasks');
let currentTask,currentNumBoard;
let boards=document.getElementsByClassName('board');
export function openAdditionalTask(){
  let currentBoard=event.target.parentElement.parentElement.parentElement.getElementsByClassName('tasks')[0];
  for(let i=0;i<boards.length;i++){
    boards[i].style.display='none';
    if(currentBoard===mainTasks[i]){
      currentNumBoard=i;
      for(let j=0;j<arrayTasks[i].length;j++){  
        if(event.target.innerHTML===arrayTasks[i][j]){
            currentTask=j;
            document.getElementsByClassName('additionalBoard')[0].style.display='flex';
            document.getElementsByClassName('titleBoard')[0].value=event.target.innerHTML;
            document.getElementsByClassName('textBoard')[0].value=arrayAdditionTask[i][j];
        }
      }
    }
  }
}

export function saveAdditionalTask(){
  if(document.getElementsByClassName('titleBoard')[0].value!==''){
    arrayTasks[currentNumBoard][currentTask]=document.getElementsByClassName('titleBoard')[0].value;
    arrayAdditionTask[currentNumBoard][currentTask]=document.getElementsByClassName('textBoard')[0].value;
    document.getElementsByClassName('additionalBoard')[0].style.display='none';
    for(let i=0;i<boards.length;i++){
      document.getElementsByClassName('board')[i].style.display='flex';
    }
    document.getElementsByClassName('board')[currentNumBoard].getElementsByClassName('li')[currentTask].innerHTML=document.getElementsByClassName('titleBoard')[0].value;
    localStorage.setItem('additionTasks',JSON.stringify(arrayAdditionTask)); 
    localStorage.setItem('Tasks',JSON.stringify(main[0].innerHTML));
    createObjectTask();
  }
  else
    alert('Заголовок задачи не может быть пустым');
}
