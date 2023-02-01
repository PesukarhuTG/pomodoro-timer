import { addZero } from "./addZero.js";
import message from "./message.js";
import { state } from "./state.js";

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
  }
};