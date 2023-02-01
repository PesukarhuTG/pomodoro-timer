import { startTimer, showTimer } from "./timer.js";
import { state } from "./state.js";

const btnStart = document.querySelector('.control__btn_start');
const btnStop = document.querySelector('.control__btn_stop');

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

  btnStop.addEventListener('click', () => {
    clearTimeout(state.timerId);
    state.isActive = false;
    btnStart.textContent = 'Старт';
    state.timeLeft = state[state.statusApp] * 60;
    showTimer(state.timeLeft);
  });

  showTimer(state.timeLeft);
};

export default initControl;