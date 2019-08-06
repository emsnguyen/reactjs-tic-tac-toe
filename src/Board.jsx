import React from "react";
import Square from "./Square";
class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true
        };
    }
    renderSquare(i) {
        return <Square value={this.props.squares[i]} className={this.props.classNames[i]}
            onClick={() => this.props.onClick(i)}
        />;
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0, 0, 0)}
                    {this.renderSquare(1, 0, 1)}
                    {this.renderSquare(2, 0, 2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3, 1, 0)}
                    {this.renderSquare(4, 1, 1)}
                    {this.renderSquare(5, 1, 2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6, 2, 0)}
                    {this.renderSquare(7, 2, 1)}
                    {this.renderSquare(8, 2, 2)}
                </div>
            </div>
        );
    }
}
export default Board;
