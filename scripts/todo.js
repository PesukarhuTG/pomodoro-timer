import { state } from "./state.js";

const titleElem = document.querySelector('.title');
const countPomodoro = document.querySelector('.count_num');
const todoListElem = document.querySelector('.todo__list');

const newItem = document.createElement('li');
newItem.classList.add('todo__item');
const todoAddBtn = document.createElement('button');
todoAddBtn.classList.add('todo__add');
todoAddBtn.textContent = 'Добавить новую задачу';
newItem.append(todoAddBtn);

const getTodo = () => {
  const todoList = JSON.parse(localStorage.getItem('pomodoro') || '[]');
  return todoList;
};

const showTodo = () => {
  titleElem.textContent = state.activeTodo.title;
  countPomodoro.textContent = state.activeTodo.pomodoro;
};

const addTodo = (title) => {
  const todo = {
    id: Math.random().toString(16).substring(2,8),
    pomodoro: 0,
    title,
  };

  const todoList = getTodo();
  todoList.push(todo);
  localStorage.setItem('pomodoro', JSON.stringify(todoList));

  return todo;
};

// const createTodoItem = (item) => {
//     if (item.id !== 'default') {
//       const todoItem = document.createElement('li');
//       todoItem.classList.add('todo__item');

//       const todoItemWrapper = document.createElement('div');
//       todoItemWrapper.classList.add('todo__item-wrapper');

//       const todoBtn = document.createElement('button');
//       todoBtn.classList.add('todo__btn');
//       todoBtn.textContent = item.title;

//       const editBtn = document.createElement('button');
//       editBtn.classList.add('todo__edit');
//       editBtn.ariaLabel = 'Редактировать';

//       const delBtn = document.createElement('button');
//       delBtn.classList.add('todo__del');
//       delBtn.ariaLabel = 'Удалить';

//       todoItemWrapper.append(todoBtn, editBtn, delBtn);
//       todoItem.append(todoItemWrapper);
//       todoListElem.prepend(todoItem);
//     }
// };

const createTodoItem = (item) => {
  if (item.id !== 'default') {
      const todoItem = document.createElement('li');
      todoItem.classList.add('todo__item');
      todoItem.dataset.id = item.id;

      todoItem.innerHTML = `
          <div class="todo__item-wrapper">
            <button class="todo__btn">${item.title}</button>
            <button class="todo__edit" aria-label="Редактировать"></button>
            <button class="todo__del" aria-label="Удалить"></button>
          </div>
      `;

      todoListElem.prepend(todoItem);
  }
};

const renderTodoList = (list) => {
  todoListElem.textContent = '';
  list.forEach(createTodoItem);
  todoListElem.append(newItem);
};

export const initTodo = () => {
  const todoList = getTodo();

  if (!todoList.length) {
    state.activeTodo = [{
      id: 'default',
      pomodoro: 0,
      title: 'Создать помодоро',
    }];
  } else {
    state.activeTodo = todoList[todoList.length - 1];
  }

  showTodo();
  renderTodoList(todoList);

  todoListElem.addEventListener('click', (e) => {
    const target = e.target;

    if (target.classList.value === 'todo__btn') {
      console.log('активировать', target.closest('.todo__item').dataset.id);
    }

    if (target.classList.value === 'todo__edit') {
      console.log('редактировать', target.closest('.todo__item').dataset.id);
    }

    if (target.classList.value === 'todo__del') {
      console.log('удалить', target.closest('.todo__item').dataset.id);
    }

    if (target.classList.value === 'todo__add') {
      const title = prompt('Введине название задачи')?.trim();

      if (title) {
        const todo = addTodo(title);
        createTodoItem(todo);
      } else {
        alert('Введите корректные данные');
      }
    }
  });
};