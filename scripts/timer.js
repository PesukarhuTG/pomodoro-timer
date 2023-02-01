import { addZero } from "./addZero.js";
import message from "./message.js";
import { state } from "./state.js";
import { changeActiveBtn } from "./controls.js";

const minElem = document.querySelector('.time__minutes');
const secElem = document.querySelector('.time__seconds');

export const showTimer = (seconds) => {
  minElem.textContent = addZero(Math.floor(seconds / 60));
  secElem.textContent = addZero(seconds % 60);
};

export const startTimer = () => {
  state.timeLeft -= 1;
  showTimer(state.timeLeft);

  if (state.timeLeft > 0 && state.isActive) {
    state.timerId = setTimeout(startTimer, 1000);
  }

  if (state.timeLeft <= 0) {
    message();
    console.log(state.activeTodo);

    if (state.statusApp === 'work') {
      state.activeTodo.pomodoro += 1;

        if (state.activeTodo.pomodoro % state.count) {
          state.statusApp = 'break';
        } else {
          state.statusApp = 'relax';
        }
    } else {
      state.statusApp = 'work';
    }

    state.timeLeft = state[state.statusApp] * 60; // change timer according status
    console.log(state.activeTodo);
    changeActiveBtn(state.statusApp);
    startTimer();
  }
};