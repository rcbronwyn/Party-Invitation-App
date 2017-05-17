document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('registrar');
    const input = form.querySelector('input');

    const mainDiv = document.querySelector('.main');
    const ul = document.getElementById('invitedList');

    //Create element we'll want to use for the filter checkbox
    const div = document.createElement('div');
    const filterLabel = document.createElement('label');
    const filterCheckbox = document.createElement('input');

    filterLabel.textContent = "Hide those who haven't responded.";
    filterCheckbox.type='checkbox';
    div.appendChild(filterLabel);
    div.appendChild(filterCheckbox);

    //Insert the div element before the ul, as a child of the .main div.
    mainDiv.insertBefore(div, ul);

    //Event Handler for the checkbox.
    filterCheckbox.addEventListener('change', (e) => {
        const isChecked= e.target.checked;
        //Reference the list items to be looped through.
        const list = ul.children;
        //If isChecked is true, we'll want to not hide the item.
        if (isChecked){
            //for each list item
            for (let i = 0; i < list.length; i += 1){
                let li = list[i];
                if (li.className === 'responded'){
                    li.style.display = '';
                } else {
                    li.style.display = 'none';
                }
            }
        } else {
            for (let i = 0; i < list.length; i += 1){
                let li = list[i];
                li.style.display = '';
            }
        }
    });


    //Create the list element
    function createLi(text){
        
        function createElement(elementName, property, value){
            const element = document.createElement(elementName);
            element[property] = value;
            return element;
        }

        function appendToLi(elementName, property, value){
            const element = createElement(elementName, property, value);
            li.appendChild(element);
            return element;
        }

        const li = document.createElement('li');
        appendToLi('span','textContent', text);
        appendToLi('label', 'textContent', 'confirmed')
            .appendChild(createElement('input','type', 'checkbox'));
        appendToLi('button','textContent', 'edit');
        appendToLi('button', 'textContent', 'remove');
        
        

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
        if (e.target.tagName === 'BUTTON'){
            const button = e.target;
                    const li = e.target.parentNode;
                    const ul = li.parentNode;
                    const action = button.textContent;
                    const nameActions = {
                        remove: () => {
                            ul.removeChild(li);
                        },
                        edit: () => {
                            const span = li.firstElementChild;
                            const input = document.createElement('input');
                            input.type = 'text';
                            input.value = span.textContent;
                            li.insertBefore(input, span);
                            li.removeChild(span);
                            button.textContent = 'save';
                        },  
                        save: () => {
                            const input = li.firstElementChild;
                            const span = document.createElement('span');
                            span.textContent = input.value;
                            li.insertBefore(span, input);
                            li.removeChild(input);

                            button.textContent= 'edit'
                        }  
                    };

                    // select and run action in nameActions object
                    nameActions[action]();

        }
        
        
    });


});