'use strict';

const ul = document.querySelector('#todo-list');
const addBtn = document.querySelector('.btn-paw');
const input = document.querySelector('input');
const hiddenImg = document.querySelector('.confetti');
const achieveSound = new Audio('./sounds/achieve.wav');

//Function for creating elements
function createElement(type, { classNames }, ...childNodes) {
  const elem = document.createElement(type);
  elem.classList.add(...classNames);
  elem.append(...childNodes);
  return elem;
}

//Listener for button that add new elements to ul
function addBtnHandler({ target }) {
  const input = target.parentElement.previousElementSibling;
  const inputValue = input.value;

  if (inputValue !== '') {
    const button = createElement('button', { classNames: ['btn'] }, '\u2713');
    const li = createElement(
      'li',
      { classNames: ['list-item'] },
      inputValue,
      button
    );

    ul.append(li);

    //Listener for button thant delete li
    button.addEventListener('click', function () {
      li.remove();
      hiddenImg.classList.remove('hidden');
      achieveSound.play();

      setTimeout(function () {
        hiddenImg.classList.add('hidden');
      }, 500);
    });

    //Listener for editing li after click
    li.addEventListener('dblclick', function () {
      // Create input for deleting text
      const inputFromLi = document.createElement('input');
      inputFromLi.value = li.textContent.slice(0, -1);
      //Add input to li
      li.textContent = '';
      li.appendChild(inputFromLi);
      //Focus for li
      inputFromLi.focus();
      // Listener for changes if input is not in the focus
      inputFromLi.addEventListener('blur', function () {
        li.textContent = inputFromLi.value;
        li.append(button);
      });
    });
  }

  //Deleting value and creating placeholder
  input.value = '';
  input.placeholder = 'do whatchu gotta do';
}

addBtn.addEventListener('click', addBtnHandler);

//Listener for deleting placeholder for input in focus
input.addEventListener('focus', function ({ target }) {
  target.placeholder = '';
});
