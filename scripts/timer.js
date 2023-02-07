import { addZero } from "./addZero.js";
import message from "./message.js";
import { state } from "./state.js";
import { changeActiveBtn } from "./controls.js";
import { showTodo, updateTodo } from "./todo.js";

const minElem = document.querySelector('.time__minutes');
const secElem = document.querySelector('.time__seconds');
const title = document.title;

export const showTimer = (seconds) => {
  minElem.textContent = addZero(Math.floor(seconds / 60));
  secElem.textContent = addZero(seconds % 60);
};

export const startTimer = () => {
  const countDown = new Date().getTime() + state.timeLeft * 1000; //stop time

  state.timerId = setInterval(() => {
    state.timeLeft -= 1;
    showTimer(state.timeLeft);

    document.title = state.timeLeft;

    if (!(state.timeLeft % 5)) { //time synchronization for every 5 sec
      const now = new Date().getTime();
      state.timeLeft = Math.floor((countDown - now) / 1000);
    }

    if (state.timeLeft > 0 && state.isActive) {
      return;
    }

    document.title = title;
    clearTimeout(state.timerId);

    if (state.statusApp === 'work') {
      state.activeTodo.pomodoro += 1;
      updateTodo(state.activeTodo);

      if (state.activeTodo.pomodoro % state.count) {
        state.statusApp = 'break';
      } else {
        state.statusApp = 'relax';
      }
    } else {
      state.statusApp = 'work';
    }
  
    message();
    state.timeLeft = state[state.statusApp] * 60; // change timer according status
    changeActiveBtn(state.statusApp);
    showTodo();
    startTimer();
  }, 1000);
};