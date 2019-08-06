import React from "react";
import Board from "./Board";
import { calculateWinner } from "./calculateWinner";
import ToggleButton from "./ToggleButton";

const getLocation = (move) => {
    const locationMap = {
        0: 'row: 1, column: 1',
        1: 'row: 1, column: 2',
        2: 'row: 1, column: 3',
        3: 'row: 2, column: 1',
        4: 'row: 2, column: 2',
        5: 'row: 2, column: 3',
        6: 'row: 3, column: 1',
        7: 'row: 3, column: 2',
        8: 'row: 3, column: 3',
    }
    return locationMap[move];
};
const updateArrayValueGivenIndex = (array, index, oddValue, commonValue) => {
    const ret = array.slice(0);
    for (let i = 0; i < array.length; i++) {
        if (i === index) {
            ret[i] = oddValue;
        } else {
            ret[i] = commonValue;
        }
    }
    return ret;
};
class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            xIsNext: true,
            stepNumber: 0,
            classNames: Array(9).fill("square"),
            isDescending: false,
        };
    }
    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        })
    }
    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([
                { squares: squares, currentLocation: getLocation(i), }
            ]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
            classNames: updateArrayValueGivenIndex(this.state.classNames, i, "square-bold", "square"),
            
        });
    }
    handleToggleClick(value) {
        this.setState({
            isDescending: !this.state.isDescending,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        const moves = history.map((step, move) => {
            const currentLocation = step.currentLocation ? `(${step.currentLocation})` : '';
            const desc = move ? 'Go to move #' + move : 'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{`${desc}${currentLocation}`}</button>
                </li>
            );
        });
        let status;
        if (winner) {
            status = "Winner: " + winner;
        } else {
            status = "Next player: " + (this.state.xIsNext ? 'X' : 'O');
        }
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                        classNames={this.state.classNames}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    {/* toggle button here */}
                    <div><ToggleButton value={this.state.isDescending} onClick={(value)=>this.handleToggleClick(this.state.sortType)}/></div>
                    <ol>{this.state.isDescending ? moves : moves.reverse()}</ol>
                </div>
            </div>
        )
    }

}

export default Game;