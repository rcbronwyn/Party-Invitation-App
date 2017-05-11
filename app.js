const form = document.getElementById('registrar');
const input = form.querySelector('input');
const ul = document.getElementById('invitedList');

//Create the list element
function createLi(text){
    
    const li = document.createElement('li');
    li.textContent = text;
    const label = document.createElement('label');
    label.textContent = 'Confirmed';
    const checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    label.appendChild(checkbox);
    li.appendChild(label);
    const button = document.createElement('button');
    button.textContent = "remove";
    li.appendChild(button);

    return li;
}

form.addEventListener('submit', (e) => {
    //Cancel the default behavior
    e.preventDefault();
    //Grab the input value and store it in a different const.
    //Then clear the input
    const text = input.value;
    input.value = "";
    //Call createLi
    var li = createLi(text);
    //Append the li element returned to the ul element.
    ul.appendChild(li);
    
});

// Listen to the checkbox element
ul.addEventListener('change', (e) => {
   const checkbox = event.target;
   const checked = checkbox.checked;
   const listItem = checkbox.parentNode.parentNode;
   //If checked, we want to add a class for styling purposes.
   if( checked ){
       listItem.className = 'responded';
   } else {
       listItem.classname = '';
   }
   
});


ul.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        const li = e.target.parentNode;
        const ul = li.parentNode;
        ul.removeChild(li);
    }
});