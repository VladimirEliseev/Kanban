let arrow=document.querySelector('.arrow');
let blockPersonalInfo=document.querySelector('.userBlock');
let boards=document.getElementsByClassName('board');
let mainTasks=document.getElementsByClassName('tasks');
let buttonAddTasks=document.getElementsByClassName('addList');
let activeTask=document.getElementsByClassName('activeTask');
let finishedTask=document.getElementsByClassName('finishedTask');
let listTasks=document.getElementsByClassName('task');
let buttonAddList=document.getElementsByClassName('addButton');
let headerBoards=document.getElementsByClassName('headerBoard');
let additionalBoard=document.getElementsByClassName('additionalBoard')[0];
let closeBtn=document.getElementsByClassName('closeBtn')[0];
let titleBoard=document.getElementsByClassName('titleBoard')[0];
let textBoard=document.getElementsByClassName('textBoard')[0];
let main=document.getElementsByTagName('main');
let taskMenu=document.getElementsByClassName('menu');
let countActiveTask=0, countFinishedTask=0;
let countBacklog=0;
let storageTasks;
let currentNumBoard,currentMenu,currentTask;
let currentNumBoardDrag,currentTaskDrag;
let onDropDown=false,onDropDownBoard=false;
let arrayTasks=[], arrayAdditionTask=[[],[],[],[]];

function loadContent(){
  storageTasks=JSON.parse(localStorage.getItem('Tasks'));
  if(storageTasks!==null){
    main[0].innerHTML='';
    main[0].insertAdjacentHTML("afterBegin", storageTasks);
  }
}

loadContent();
createObjectTask();
buttonAddTasks=document.getElementsByClassName('addList');
mainTasks=document.getElementsByClassName('tasks');
boards=document.getElementsByClassName('board');
function createObjectTask(){
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
      buttonAddTasks[0].disabled=false;
      buttonAddTasks[0].style.pointerEvents='auto';
      buttonAddTasks[0].style.color='#3b3737';
    }
    let currentBoard=boards[i].getElementsByTagName('li');
    if(currentBoard.length!==0){
      let currentTasks=[], currentAdditionTasks=[];
      if(i!==boards.length-1){
        buttonAddTasks[i+1].disabled=false;
        buttonAddTasks[i+1].style.pointerEvents='auto';
        buttonAddTasks[i+1].style.color='#3b3737';
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

function changeDropDown(){
  if(!onDropDown){
    arrow.style.transform='rotate(180deg)';
    onDropDown=true;
    arrow.style.top='10px';
    showTasksList();
  }else{
    arrow.style.transform='rotate(360deg)';
    arrow.style.top='0px';
    onDropDown=false;
    hideTasksList();
  } 
}

function showTasksList(){
  let blockDropDown=document.createElement('div');
  blockDropDown.className='dropDown';
  blockPersonalInfo.append(blockDropDown);
  blockDropDown.append(document.createElement('button'));
  blockDropDown.append(document.createElement('button'));
  let arrayList=blockDropDown.children;
  arrayList[0].innerHTML='Profile';
  arrayList[1].innerHTML='Log out';
}

function hideTasksList(){
  let delDropDown=document.querySelector('.dropDown');
  delDropDown.parentNode.removeChild(delDropDown);
}

function addNewList(){
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

function addFirstTask(){
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
    countActiveTask++;
    activeTask[0].innerHTML="Active tasks: " + countActiveTask;
    arrayAdditionTask[0][arrayAdditionTask[0].length]='';
    localStorage.setItem('additionTasks',JSON.stringify(arrayAdditionTask)); 
    localStorage.setItem('Tasks',JSON.stringify(main[0].innerHTML));  
    console.log(arrayTasks);
    console.log(arrayAdditionTask);
    createObjectTask();
  }
  else{
    boards[0].style.height=boards[0].offsetHeight-60+'px';
    mainTasks[0].style.height=boards[0].offsetHeight-70+'px';
  }
}

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
    console.log(arrayTasks);
    console.log(arrayAdditionTask);
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
function openAdditionalTask(){
  let currentBoard=event.target.parentElement.parentElement.parentElement.getElementsByClassName('tasks')[0];
  for(let i=0;i<boards.length;i++){
    boards[i].style.display='none';
    if(currentBoard===mainTasks[i]){
      currentNumBoard=i;
      console.log(arrayTasks);
      console.log(arrayAdditionTask);
      for(let j=0;j<arrayTasks[i].length;j++){  
        if(event.target.innerHTML===arrayTasks[i][j]){
            currentTask=j;
            let additionalBoard=document.getElementsByClassName('additionalBoard')[0].style.display='flex';
            document.getElementsByClassName('titleBoard')[0].value=event.target.innerHTML;
            console.log(arrayAdditionTask);
            document.getElementsByClassName('textBoard')[0].value=arrayAdditionTask[i][j];
            let coor= document.getElementsByClassName('additionalBoard')[0].getBoundingClientRect();
        }
      }
    }
  }
}

function saveAdditionalTask(){
  arrayAdditionTask[currentNumBoard][currentTask]=document.getElementsByClassName('textBoard')[0].value;
  arrayTasks[currentNumBoard][currentTask]=document.getElementsByClassName('titleBoard')[0].value;
  document.getElementsByClassName('additionalBoard')[0].style.display='none';
  for(let i=0;i<boards.length;i++){
    document.getElementsByClassName('board')[i].style.display='flex';
  }
  document.getElementsByClassName('board')[currentNumBoard].getElementsByClassName('li')[currentTask].innerHTML=document.getElementsByClassName('titleBoard')[0].value;
  localStorage.setItem('additionTasks',JSON.stringify(arrayAdditionTask)); 
  localStorage.setItem('Tasks',JSON.stringify(main[0].innerHTML));
  createObjectTask();
}

function addNewTask(){
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

function deleteBoard(){
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

function openMenuBoard(){
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
        taskDropDown.style.top=coor.top+40+'px';
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
const drag =()=>{
  const cells=document.querySelectorAll('.board');
  let selectTask;
function dragAndDropStart(){
  let currentBoard=event.target.parentElement.parentElement.parentElement.getElementsByClassName('tasks')[0];
  for(let i=0;i<boards.length;i++){
    if(currentBoard===mainTasks[i]){
      currentNumBoardDrag=i;
      let board=boards[i].getElementsByClassName('li');
      for(let j=0;j<arrayTasks[i].length;j++){  
        if(event.target.innerHTML===arrayTasks[i][j]){
          currentTaskDrag=j;
          selectTask=event.target;         
          setTimeout(()=>{board[j].style.display='none'},0);
        }
      }
    }
  }
  
}

function dragAndDropEnd(){
  boards[currentNumBoardDrag].getElementsByClassName('li')[currentTaskDrag].style.display='block';
}

function dragAndDropOver(event){
  event.preventDefault();
}

function drop(){
  let newLi=document.createElement('li');
  newLi.className='li';
  newLi.innerHTML=selectTask.innerHTML;
  newLi.draggable='true';
  this.getElementsByClassName('task')[0].prepend(newLi);
  boards[currentNumBoardDrag].getElementsByClassName('li')[currentTaskDrag].remove();
  boards[currentNumBoardDrag].style.height=boards[currentNumBoardDrag].offsetHeight-60+'px';
  mainTasks[currentNumBoardDrag].style.height=boards[currentNumBoardDrag].offsetHeight-70+'px';
  this.style.height=this.offsetHeight+40+'px';
  this.getElementsByClassName('tasks')[0].style.height=this.offsetHeight-70+'px';
  for(let i=0;i<boards.length;i++){
    if(this===boards[i]){
      arrayAdditionTask[i][arrayAdditionTask[i].length]=arrayAdditionTask[currentNumBoardDrag][currentTaskDrag];
    }
  }
  arrayAdditionTask[currentNumBoardDrag].splice(currentTaskDrag,1);
  localStorage.setItem('additionTasks',JSON.stringify(arrayAdditionTask)); 
  localStorage.setItem('Tasks',JSON.stringify(main[0].innerHTML));  
  createObjectTask();

}
cells.forEach((board)=>{
  board.addEventListener('dragover', dragAndDropOver);
  board.addEventListener('drop', drop);
});
main[0].addEventListener('dragstart', dragAndDropStart);
main[0].addEventListener('dragend', dragAndDropEnd);
}

drag();
arrow.addEventListener('click',changeDropDown);
main[0].addEventListener('click', checkEvent);
buttonAddList[0].addEventListener('click',addNewList);
     