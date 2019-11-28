import React, { Component } from 'react';
import Snake from './components/Snake';
import Food from './components/Food';
import getRandomCoordinates from './utils/getRandomCoordinates';

const initialState = {
  snakeDots: [
    [0,0],
    [2,0]
  ],
  food: getRandomCoordinates(),
  direction: 'RIGHT',
  speed: 200
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {...initialState};

    this.interval = null;
  }

  componentDidMount() {
    const { speed } = this.state;
    this.interval = setInterval(this.moveSnake, speed);
    document.onkeydown = this.onKeyDown;
  }

  onKeyDown = e => {
    const { direction } = this.state;
    e = e || window.event;
    switch(e.keyCode) {
      case 38:
        if (direction !== 'DOWN') {
          this.setState({direction: 'UP'});
        }
        break;
      case 40:
        if (direction !== 'UP') {
          this.setState({direction: 'DOWN'});
        }
        break;
      case 37:
        if (direction !== 'RIGHT') {
          this.setState({direction: 'LEFT'});
        }
        break;
      case 39:
        if (direction !== 'LEFT') {
          this.setState({direction: 'RIGHT'});
        }
        break;
      default:
    }
  }

  moveSnake = () => {
    const { snakeDots, direction } = this.state;
    let dots = [...snakeDots];
    let head = dots[dots.length - 1];

    switch(direction) {
      case 'RIGHT':
        head = [head[0] + 2, head[1]];
        break;
      case 'LEFT':
        head = [head[0] - 2, head[1]];
        break;
      case 'DOWN':
        head = [head[0], head[1] + 2];
        break;
      case 'UP':
        head = [head[0], head[1] - 2];
        break;
      default:
    }

    dots.push(head);
    dots.shift();
    this.setState({ snakeDots: dots });
    this.checkIfOutOfBounds();
    this.checkIfCollapsed();
    this.checkIfEat();
  }

  checkIfOutOfBounds() {
    const { snakeDots } = this.state;
    let head = snakeDots[snakeDots.length - 1];
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      this.onGameOver();
    }
  }

  checkIfCollapsed() {
    const { snakeDots } = this.state;
    let snake = [...snakeDots];
    let head = snakeDots[snakeDots.length - 1];
    snake.pop();
    snake.forEach(dot => {
      if (head[0] === dot[0] && head[1] === dot[1]) {
        this.onGameOver();
      }
    });
  }

  checkIfEat() {
    const { snakeDots, food } = this.state;
    let head = snakeDots[snakeDots.length - 1];
    if (head[0] === food[0] && head[1] === food[1]) {
      this.setState({
        food: getRandomCoordinates()
      });
      this.enlargeSnake();
      this.increaseSpeed();
    }
  }

  increaseSpeed() {
    const { speed } = this.state;
    if (speed > 150) {
      this.setState(prevState => ({
        speed: prevState.speed - 10
      }))
      this.interval = setInterval(this.moveSnake, speed);
    }
  }

  enlargeSnake() {
    const { snakeDots } = this.state;
    let newSnake = [...snakeDots];
    newSnake.unshift([]);
    this.setState({
      snakeDots: newSnake
    })
  }

  onGameOver() {
    alert('Game Over!');
    this.setState({...initialState});
    clearInterval(this.interval);
  }

  render() {
    const { snakeDots, food } = this.state;
    return (
      <div className="game-area">
        <Snake snakeDots={snakeDots} ></Snake>
        <Food food={food} ></Food>
      </div>
    );
  }
}

export default App;
