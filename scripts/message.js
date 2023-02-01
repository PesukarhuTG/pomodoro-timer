import { state } from "./state.js";

const audio = {
  work: new Audio('audio/sound-01.wav'),
  break: new Audio('audio/sound-02.wav'),
  relax: new Audio('audio/sound-03.wav'),
}

const message = () => {
  audio[state.statusApp].play();
};

export default message;