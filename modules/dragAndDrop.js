import {createObjectTask,arrayAdditionTask,arrayTasks} from '../script.js';
let mainTasks=document.getElementsByClassName('tasks');
let currentNumBoardDrag,currentTaskDrag;
let boards=document.getElementsByClassName('board');
let main=document.getElementsByTagName('main');
export const drag =()=>{
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