import cloneDeep from 'lodash/fp/cloneDeep';

export const defaultState = {
  player: 'X',
  ai: 'O',
  isPlayerTurn: true,
  board: [
    {id: 0, value: null},
    {id: 1, value: null},
    {id: 2, value: null},
    {id: 3, value: null},
    {id: 4, value: null},
    {id: 5, value: null},
    {id: 6, value: null},
    {id: 7, value: null},
    {id: 8, value: null}
  ]
};

export function reset() {
  return cloneDeep(defaultState);
}

export default {
  reset: reset
};