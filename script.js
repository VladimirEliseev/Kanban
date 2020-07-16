let boards=document.getElementsByClassName('board');
let buttonAddTasks=document.getElementsByClassName('addList');
let activeTask=document.getElementsByClassName('activeTask');
let finishedTask=document.getElementsByClassName('finishedTask');
let main=document.getElementsByTagName('main');
let buttonAddList=document.getElementsByClassName('addButton');
let storageTasks;
export let arrayTasks=[];
export let arrayAdditionTask=[[],[],[],[]];
import {addNewTask} from './modules/addNewTask.js';
import {openAdditionalTask,saveAdditionalTask} from './modules/addAdditionalInfo.js';
import {deleteBoard,openMenuBoard} from './modules/deleteBoard.js';
import {addNewList} from './modules/addNewBoard.js';
import {drag} from './modules/dragAndDrop.js';

function loadContent(){
  storageTasks=JSON.parse(localStorage.getItem('Tasks'));
  if(storageTasks!==null){
    main[0].innerHTML='';
    main[0].insertAdjacentHTML("afterBegin", storageTasks);
  }
}

export function createObjectTask(){
  arrayTasks=[];
  arrayAdditionTask=[[],[],[],[]];
  boards=document.getElementsByClassName('board');
  if(boards.length===0){
    let noneTask=document.createElement('span');
    noneTask.className='noneTask';
    main[0].prepend(noneTask);
    noneTask.innerHTML='Нет активных списков. Нажми кнопку "Create new list", чтобы добавить список';
    noneTask.style.color='white';
  }
  for(let i=0;i<boards.length;i++){
    if(i===0){
      buttonAddTasks[0].style.color='#3b3737';
      buttonAddTasks[0].disabled=false;
      buttonAddTasks[0].style.pointerEvents='auto';     
    }
    let currentBoard=boards[i].getElementsByTagName('li');
    if(currentBoard.length!==0){
      let currentTasks=[], currentAdditionTasks=[];
      if(i!==boards.length-1){
        buttonAddTasks[i+1].style.color='#3b3737';
        buttonAddTasks[i+1].disabled=false;
        buttonAddTasks[i+1].style.pointerEvents='auto';
        
      }    
      for(let j=0;j<currentBoard.length;j++){
        currentTasks[currentTasks.length]=currentBoard[j].innerHTML;  
        currentAdditionTasks[currentTasks.length-1]='';
      }
      arrayTasks[arrayTasks.length]=currentTasks;
      arrayAdditionTask[arrayTasks.length-1]=currentAdditionTasks;
    }else{
      arrayTasks[arrayTasks.length]=[];
      if(i!==boards.length-1){
        buttonAddTasks[i+1].disabled=true;
        buttonAddTasks[i+1].style.color='#9c9595';
        buttonAddTasks[i+1].style.pointerEvents='none';
      }
    }
  }
  if(JSON.parse(localStorage.getItem('additionTasks'))!==null){
    arrayAdditionTask=JSON.parse(localStorage.getItem('additionTasks'));
  }
  activeTask[0].innerHTML="Active tasks: " + arrayTasks[0].length;
  finishedTask[0].innerHTML="Finished tasks: " +arrayTasks[arrayTasks.length-1].length;
}

function checkEvent(){
  if(event.target.className==='addList')
    addNewTask();
  else if(event.target.className==='menu')
    openMenuBoard();
  else if(event.target.className==='buttonDelBoard')
    deleteBoard();
  else if(event.target.className==='li')
    openAdditionalTask();
  else if(event.target.className==='closeBtn')
    saveAdditionalTask();
}

loadContent();
createObjectTask();
drag();
main[0].addEventListener('click', checkEvent);
buttonAddList[0].addEventListener('click',addNewList);
     