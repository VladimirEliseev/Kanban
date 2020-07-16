import {arrayTasks,arrayAdditionTask,createObjectTask} from '../script.js';
let boards=document.getElementsByClassName('board');
let main=document.getElementsByTagName('main');
let taskMenu=document.getElementsByClassName('menu');
let headerBoards=document.getElementsByClassName('headerBoard');
let onDropDownBoard=false;
let currentMenu;
export function deleteBoard(){
  for(let i=0;i<boards.length;i++){
    if(event.target.parentElement.parentElement.parentElement===boards[i]){
      boards[i].remove();
      arrayTasks.splice(i,1);     
      arrayAdditionTask.splice(i,1);
      localStorage.setItem('additionTasks',JSON.stringify(arrayAdditionTask)); 
      localStorage.setItem('Tasks',JSON.stringify(main[0].innerHTML));  
      createObjectTask();
      onDropDownBoard=false;
    }
  }
}

export function openMenuBoard(){
  if(!onDropDownBoard){
    onDropDownBoard=true;
    for(let i=0;i<taskMenu.length;i++){
      if(event.target===taskMenu[i]){       
        currentMenu=i;
        let taskDropDown=document.createElement('div');
        taskDropDown.className='dropDownBoard';
        headerBoards[i].prepend(taskDropDown);
        let buttonDelBoard=document.createElement('button');
        buttonDelBoard.className='buttonDelBoard';
        taskDropDown.append(buttonDelBoard);
        let coor=boards[i].getBoundingClientRect();
        taskDropDown.style.top=coor.top-10+'px';
        taskDropDown.style.left=coor.right - 80 +'px';
        let arrayList=taskDropDown.children;
        arrayList[0].innerHTML='Удалить';
      }
    }
  }else{
    onDropDownBoard=false;
    let delDropDown=document.querySelector('.dropDownBoard');
    delDropDown.parentNode.removeChild(delDropDown);
  } 
}