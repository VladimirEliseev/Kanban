let listTasks=document.getElementsByClassName('task');
let boards=document.getElementsByClassName('board');
let buttonAddTasks=document.getElementsByClassName('addList');
let main=document.getElementsByTagName('main');
let mainTasks=document.getElementsByClassName('tasks');
let currentBoard;
import {createObjectTask,arrayTasks,arrayAdditionTask} from '../script.js';

import {addFirstTask} from './addFirstTask.js';
function saveNewTask(){
    let select=document.querySelector('.select');
    let selectedValue=select.value;
    let selectIndex=select.selectedIndex;
    select.parentNode.removeChild(select);
    if(selectedValue!=='Выберите задачу'){
      let task=document.createElement('li');
      task.className='li';
      listTasks[currentBoard].append(task);
      task.draggable='true';
      task.innerHTML=selectedValue;
      arrayTasks[currentBoard][arrayTasks[currentBoard].length]=selectedValue;
      let partBeforeDelete=arrayTasks[currentBoard-1].slice(0,selectIndex-1);  
      let partAfterDelete=arrayTasks[currentBoard-1].slice(selectIndex,arrayTasks[currentBoard-1].length);
      arrayTasks[currentBoard-1]=partBeforeDelete.concat(partAfterDelete);
      arrayAdditionTask[currentBoard][arrayAdditionTask[currentBoard].length]=arrayAdditionTask[currentBoard-1][selectIndex-1];
      let partBeforeDeleteAdd=arrayAdditionTask[currentBoard-1].slice(0,selectIndex-1);  
      let partAfterDeleteAdd=arrayAdditionTask[currentBoard-1].slice(selectIndex,arrayAdditionTask[currentBoard-1].length);
      arrayAdditionTask[currentBoard-1]=partBeforeDeleteAdd.concat(partAfterDeleteAdd);
      let delElem=listTasks[currentBoard-1].getElementsByClassName('li')[selectIndex-1];
      boards[currentBoard-1].style.height=boards[currentBoard-1].offsetHeight-60+'px';
      mainTasks[currentBoard-1].style.height=boards[currentBoard-1].offsetHeight-70+'px';
      delElem.remove();
      localStorage.setItem('additionTasks',JSON.stringify(arrayAdditionTask)); 
      localStorage.setItem('Tasks',JSON.stringify(main[0].innerHTML));  
      createObjectTask();
    }else{
      boards[currentBoard].style.height=boards[currentBoard].offsetHeight-60+'px';
      mainTasks[currentBoard].style.height=boards[currentBoard].offsetHeight-70+'px';
    }
  }

  export function addNewTask(){
    let finishedTasksIndex=[];
      let openedSelect=document.querySelector('.select');
      if(openedSelect===null){
        let select=document.createElement('select');
        select.className='select';
        let task=event.target.parentElement.getElementsByClassName('tasks')[0];
        boards=document.getElementsByClassName('board');
        if (event.target!==buttonAddTasks[0]){
          for(let i=1;i<buttonAddTasks.length;i++){
            if(event.target===buttonAddTasks[i]){
              currentBoard=i;
              task.prepend(select);
              let defaultOption=document.createElement('option');
              defaultOption.className='option';
              select.appendChild(defaultOption);
              defaultOption.innerHTML='Выберите задачу';
              defaultOption.disabled='disabled';
              for(let j=0;j<arrayTasks[i-1].length;j++){
                finishedTasksIndex[j]=document.createElement('option');
                finishedTasksIndex[j].className='option';
                select.appendChild(finishedTasksIndex[j]);
                finishedTasksIndex[j].innerHTML=arrayTasks[i-1][j];
              }
              boards[i].style.height=boards[i].offsetHeight+40+'px';
              mainTasks[i].style.height=boards[i].offsetHeight-70+'px';
            }
          }
          document.getElementsByClassName('select')[0].focus();
          document.getElementsByClassName('select')[0].addEventListener('blur',saveNewTask);
        }else{
          addFirstTask();
        }
      }     
  }