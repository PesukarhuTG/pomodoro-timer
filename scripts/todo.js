import { changeActiveBtn, stop } from "./controls.js";
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

export const showTodo = () => {
  if (state.activeTodo) {
    titleElem.textContent = state.activeTodo.title;
    countPomodoro.textContent = state.activeTodo.pomodoro;
  } else {
    titleElem.textContent = '';
    countPomodoro.textContent = 0;
  }
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

export const updateTodo = (todo) => {
  const todoList = getTodo();
  if (!todoList.length) {
    return;
  }

  const todoItem = todoList.find((item) => item.id === todo.id);
  todoItem.title = todo.title;
  todoItem.pomodoro = todo.pomodoro;
  localStorage.setItem('pomodoro', JSON.stringify(todoList));
};

const deleteTodo = (todo) => {
  const todoList = getTodo();
  const newTodoList = todoList.filter((item) => item.id !== todo.id);

  if (todo.id === state.activeTodo.id) {
    state.activeTodo = newTodoList[newTodoList.length - 1];
  }

  localStorage.setItem('pomodoro', JSON.stringify(newTodoList));
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

//       todoBtn.addEventListener('click', () => {
//         state.activeTodo = item;
//         showTodo();
//         changeActiveBtn('work');
//         stop();
//       });

//       editBtn.addEventListener('click', () => {
//         item.title = prompt('Изменить название задачи:', item.title);
//         todoBtn.textContent = item.title;

//         if (item.id === state.activeTodo.id) {
//           state.activeTodo.title = item.title;
//         }
//         showTodo();
//         updateTodo(item);
//       });

//       delBtn.addEventListener('click', () => {
//         deleteTodo(item);
//         showTodo();
//         todoItem.remove();
//       });
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

  const subtitle = document.createElement('p');
  subtitle.classList.add('todo__subtitle');
  subtitle.textContent = 'Нет задач'; 

  if (!todoList.length) {
    todoListElem.insertAdjacentElement('beforebegin', subtitle);

    state.activeTodo = {
      id: 'default',
      pomodoro: 0,
      title: 'Создать помодоро',
    };
  } else {
    state.activeTodo = todoList[todoList.length - 1];
  }

  showTodo();
  renderTodoList(todoList);

  // implement delegation instead of adding click on every button
  todoListElem.addEventListener('click', (e) => {
    const target = e.target;

    // make item active
    if (target.closest('.todo__btn')) {
      const listTodo = getTodo();
      if (!listTodo.length) {
        return;
      }

      const todo = listTodo.find(item => item.id === target.closest('.todo__item').dataset.id);

      state.activeTodo = todo;
      showTodo();
      changeActiveBtn('work');
      stop();
    }

    // edit todo item
    if (target.closest('.todo__edit')) {
        const listTodo = getTodo();
        if (!listTodo.length) {
          return;
        }
        const todo = listTodo.find(item => item.id === target.closest('.todo__item').dataset.id);
        
        const title = prompt('Изменить название задачи на:', todo.title);
        todo.title = title;
        target.previousElementSibling.textContent = title;

        if (todo.id === state.activeTodo.id) {
                state.activeTodo.title = todo.title;
        }

        showTodo();

        localStorage.setItem('pomodoro', JSON.stringify(listTodo));
    }

    // delete item
    if (target.closest('.todo__del')) {
      const listTodo = getTodo();
      if (!listTodo.length) {
        return;
      }
      const todo = listTodo.find(item => item.id === target.closest('.todo__item').dataset.id);

      deleteTodo(todo);
      showTodo();
      target.closest('.todo__item').remove();
    }

    // add item
    if (target.closest('.todo__add')) {
      const title = prompt('Введите название задачи', 'Название задачи')?.trim();

      if (title) {
        const todo = addTodo(title);
        createTodoItem(todo);
        state.activeTodo = todo;
        showTodo();
        subtitle.remove();
      } else {
        alert('Введите корректные данные');
      }
    }
  });
};