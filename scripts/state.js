const WORK_TIME_MIN = 0.2;
const BREAK_TIME_MIN = 0.1;
const RELAX_TIME_MIN = 0.5;

export const state = {
  work: WORK_TIME_MIN,
  break: BREAK_TIME_MIN,
  relax: RELAX_TIME_MIN,
  statusApp: 'work',
  count: 3, //amount of short breaks before long rest
  timeLeft: WORK_TIME_MIN * 60,
  isActive: false,
  timerId: '',
};