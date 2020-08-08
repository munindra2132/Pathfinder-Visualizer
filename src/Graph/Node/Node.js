import React , {Component} from 'react';
import './Node.css';

export default class Node extends Component {
    render() {
        const{
            src,
            dest,
            wall,
            col,
            row,
            pointer_Up,
            pointer_Down,
            pointer_Now,
        }=this.props;

        const css_style = dest ?'node-dest':src?'node-src':wall?'node-wall':'';

    return (
      <div
        id={`node-${row}-${col}`}
        className={`node ${css_style}`}
        pointer_Down={() => pointer_Down(row, col)}
        pointer_Now={() => pointer_Now(row, col)}
        pointer_Up={() => pointer_Up()}>
        </div>
    );
    }
}

