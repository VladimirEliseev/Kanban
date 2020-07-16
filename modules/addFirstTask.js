let boards=document.getElementsByClassName('board');
let mainTasks=document.getElementsByClassName('tasks');
let buttonAddTasks=document.getElementsByClassName('addList');
let listTasks=document.getElementsByClassName('task');
let activeTask=document.getElementsByClassName('activeTask');
let main=document.getElementsByTagName('main');
import {createObjectTask,arrayAdditionTask, arrayTasks} from '../script.js';
export function addFirstTask(){
    let isInput=document.querySelector('.input');
    if(isInput===null){
      let input=document.createElement('input');
      input.className='input';
      mainTasks[0].append(input);
      input.focus();
      boards[0].style.height=boards[0].offsetHeight+40+'px';
      mainTasks[0].style.height=boards[0].offsetHeight-70+'px';
      buttonAddTasks[1].disabled=false;
      buttonAddTasks[1].style.pointerEvents='auto';
      buttonAddTasks[1].style.color='#3b3737';
      }
    document.getElementsByClassName('input')[0].addEventListener('blur',saveFirstTask);
  }
  
  function saveFirstTask(){
    let input=document.querySelector('.input');
    let str;
    str=input.value;
    input.parentNode.removeChild(input);
    if(str!==''){
      let task=document.createElement('li');
      task.className='li';
      listTasks[0].append(task);
      task.draggable='true';
      task.innerHTML=str;
      let countActiveTask=arrayTasks[0].length+1;
      activeTask[0].innerHTML="Active tasks: " + countActiveTask;
      arrayAdditionTask[0][arrayAdditionTask[0].length]='';
      localStorage.setItem('additionTasks',JSON.stringify(arrayAdditionTask)); 
      localStorage.setItem('Tasks',JSON.stringify(main[0].innerHTML));  
      createObjectTask();
    }
    else{
      boards[0].style.height=boards[0].offsetHeight-60+'px';
      mainTasks[0].style.height=boards[0].offsetHeight-70+'px';
    }
  }