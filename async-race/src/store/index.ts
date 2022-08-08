import { Store } from '../types';
import { Numbers } from '../constants';

const store: Store = {
  animationId: {},
  winner: '',
  hasWinner: false,
  winnerTime: Numbers.zero,
};

export default store;
