let arrow=document.querySelector('.arrow');
let onDropDown=false;
function changeDropDown(){
    if(!onDropDown){
      arrow.style.transform='rotate(180deg)';
      onDropDown=true;
      arrow.style.top='10px';
      showDropDown();
    }else{
      arrow.style.transform='rotate(360deg)';
      arrow.style.top='0px';
      onDropDown=false;
      hideDropDown();
    } 
  }
  
  function showDropDown(){
    let blockDropDown=document.createElement('div');
    blockDropDown.className='dropDown';
    blockPersonalInfo.append(blockDropDown);
    blockDropDown.append(document.createElement('button'));
    blockDropDown.append(document.createElement('button'));
    let arrayList=blockDropDown.children;
    arrayList[0].innerHTML='Profile';
    arrayList[1].innerHTML='Log out';
  }
  
  function hideDropDown(){
    let delDropDown=document.querySelector('.dropDown');
    delDropDown.parentNode.removeChild(delDropDown);
  }
  arrow.addEventListener('click',changeDropDown);  