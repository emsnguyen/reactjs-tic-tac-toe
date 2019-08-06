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
        return <Square value={this.props.squares[i]} className={this.props.classNames[i]} key={i}
            onClick={() => this.props.onClick(i)}
        />;
    }

    render() {
        const items = [];
        let count = 0;
        for (let i = 0; i <= 2; i++) {
            let children = [];
            for (let j = 0; j <= 2; j++) {
                children.push(this.renderSquare(count++));
            }
            items.push(<div className="board-row" key={count}>{children}</div>);
        }
        return (
           <div>{items}</div>
        );
    }
}
export default Board;
