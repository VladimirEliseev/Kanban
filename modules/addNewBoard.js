import {createObjectTask,arrayAdditionTask,arrayTasks} from '../script.js';
let main=document.getElementsByTagName('main');
let boards=document.getElementsByClassName('board');
let headerBoards=document.getElementsByClassName('headerBoard');
let buttonAddTasks=document.getElementsByClassName('addList');
let taskMenu=document.getElementsByClassName('menu');
let mainTasks=document.getElementsByClassName('tasks');
export function addNewList(){
    let noneTask=document.getElementsByClassName('noneTask')[0];
    if(noneTask)
      document.getElementsByClassName('noneTask')[0].remove();
    let openedInput=document.querySelector('.input');
    if(!openedInput){
      let newBlock=document.createElement('div');
      newBlock.className='board';
      main[0].prepend(newBlock);
      let headerBoard=document.createElement('div');
      headerBoard.className='headerBoard';
      boards[0].prepend(headerBoard);
      let input=document.createElement('input');
      input.className='input';
      headerBoards[0].prepend(input);
      let buttonMenu=document.createElement('button');
      buttonMenu.className='menu';
      headerBoards[0].append(buttonMenu);
      buttonMenu.innerHTML='&middot;&middot;&middot;';
      document.getElementsByClassName('input')[0].focus();  
      document.getElementsByClassName('input')[0].addEventListener('blur',saveNewList);
    }
  }
  
  function saveNewList(){
    let input=document.querySelector('.input');
    let str=input.value;
    input.parentNode.removeChild(input);
    if(str!==''){
      let title=document.createElement('span');
      headerBoards[0].prepend(title);
      title.innerHTML=str;
      let tasks=document.createElement('div');
      tasks.className='tasks';
      boards[0].append(tasks);
      let task=document.createElement('ul');
      task.className='task';
      tasks.prepend(task);
      let buttonAddTask=document.createElement('button');
      buttonAddTask.className='addList';
      boards[0].append(buttonAddTask);
      buttonAddTask.innerHTML='+ Add card';
      buttonAddTasks=document.getElementsByClassName('addList');
      boards=document.getElementsByClassName('board');
      taskMenu=document.getElementsByClassName('menu');
      mainTasks=document.getElementsByClassName('tasks');
      for(let i=arrayAdditionTask.length;i>0;i--){
        arrayAdditionTask[i]=arrayAdditionTask[i-1];
        arrayTasks[i]=arrayTasks[i-1];
        buttonAddTasks[i].tabindex = buttonAddTasks[i-1].tabindex;
        taskMenu[i].tabindex=taskMenu[i-1].tabindex;
      }
      let count=3;
      for(let i=0;i<buttonAddTasks.length;i++){
        buttonAddTasks[i].tabIndex=count;
        count++;
        taskMenu[i].tabIndex=count;
        count++;
      }
      localStorage.setItem('additionTasks',JSON.stringify(arrayAdditionTask)); 
      localStorage.setItem('Tasks',JSON.stringify(main[0].innerHTML));  
      createObjectTask();
    }
    else{
      boards[0].remove();
      createObjectTask();
    }
  }
