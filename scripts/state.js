const WORK_TIME_MIN = 25;
const BREAK_TIME_MIN = 5;
const RELAX_TIME_MIN = 20;

export const state = {
  work: WORK_TIME_MIN,
  break: BREAK_TIME_MIN,
  relax: RELAX_TIME_MIN,
  statusApp: 'work',
  count: 4, //amount of short breaks before long rest
  timeLeft: WORK_TIME_MIN * 60,
  isActive: false,
  timerId: '',
};