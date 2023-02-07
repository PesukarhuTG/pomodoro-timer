import { startTimer, showTimer } from "./timer.js";
import { state } from "./state.js";

const btnStart = document.querySelector('.control__btn_start');
const btnStop = document.querySelector('.control__btn_stop');
const navigationBtns = document.querySelectorAll('.navigation__btn');

export const changeActiveBtn = (dataUse) => {
  state.statusApp = dataUse;

  for (let i = 0; i < navigationBtns.length; i++) {
    if (navigationBtns[i].dataset.use === dataUse) {
      navigationBtns[i].classList.add('navigation__btn_active');
    } else {
      navigationBtns[i].classList.remove('navigation__btn_active');
    }
  }
};

export const stop = () => {
  clearTimeout(state.timerId);
  state.isActive = false;
  btnStart.textContent = 'Старт';
  state.timeLeft = state[state.statusApp] * 60;
  showTimer(state.timeLeft);
};

const initControl = () => {
  btnStart.addEventListener('click', () => {
    if (state.isActive) {
      clearTimeout(state.timerId);
      state.isActive = false;
      btnStart.textContent = 'Старт';
    } else {
      state.isActive = true;
      btnStart.textContent = 'Пауза';
      startTimer();
    }
  });

  btnStop.addEventListener('click', stop);

  for (let i = 0; i < navigationBtns.length; i++) {
    navigationBtns[i].addEventListener('click', () => {
      changeActiveBtn(navigationBtns[i].dataset.use);
      stop();
    })
  }

  showTimer(state.timeLeft);
};

export default initControl;