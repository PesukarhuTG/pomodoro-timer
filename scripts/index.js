import initControl from './controls.js';
import { state } from "./state.js";

const initApp = () => {
  initControl();

  state.activeTodo = {
    id: 'default',
    pomodoro: 2,
    title: 'Создать помодоро',
  }
};

initApp();

