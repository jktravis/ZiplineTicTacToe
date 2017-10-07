import React, { Component } from 'react';
import ModalBody from 'react-bootstrap/lib/ModalBody';
import { Machine } from 'xstate';
import ChooseXToken from './ChooseXToken';
import ChooseYToken from './ChooseYToken';
import { gameStates } from '../constants';

class Chooser extends Component {
  constructor() {
    super();

    this.machine = Machine({
      key: 'ticTacToe',
      initial: gameStates.CHOOSE_X_TOKEN,
      states: {
        [gameStates.CHOOSE_X_TOKEN]: {
          on: {
            NEXT: gameStates.CHOOSE_O_TOKEN
          }
        },
        [gameStates.CHOOSE_O_TOKEN]: {
          on: {
            NEXT: gameStates.START_GAME,
            BACK: gameStates.CHOOSE_X_TOKEN
          }
        },
        StartGame: {}
      }
    });

    this.state = {
      current: this.machine.getInitialState()
    };

    this.next = this.next.bind(this);
    this.back = this.back.bind(this);
  }

  back() {
    this.setState(state => {
      return {
        current: this.machine.transition(state.current, 'BACK').value
      };
    });
  }

  next() {
    this.setState(state => {
      return {
        current: this.machine.transition(state.current, 'NEXT').value
      };
    });
  }

  render() {
    const { current } = this.state;
    return (
      <ModalBody>
        {(() => {
          switch (current) {
            case gameStates.CHOOSE_X_TOKEN:
              return (
                <ChooseXToken next={this.next}/>
              );
            case gameStates.CHOOSE_O_TOKEN:
              return (
                <ChooseYToken next={this.next} back={this.back}/>
              );
          }
        })()}
      </ModalBody>
    );
  }
}

export default Chooser;
