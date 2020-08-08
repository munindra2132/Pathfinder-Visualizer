import React , {Component} from 'react';
import Node from '../Node/Node.js';
import { render } from '@testing-library/react';


export default class Visualizer extends Component {
    constructor(props){
        super(props);
        this.state={
            nodes: [],
        }
    }

    componentDidMount() {
        const nodes = [];
        for(let row =0; row < 25 ; row++) {
            const curRow = [];
            for(let col=0; col<50; col++){
                curRow.push([]);
            }
            nodes.push(curRow);
        }
        this.setState({nodes});
    }

    render(){
        const {nodes} = this.state;

        return(
        <div>
        {nodes.map((row,rowIdx) => {
            return <div>
                {row.map((node,nodeIdx) => <Node></Node>)}
            </div>
        })}
        </div>
        );
    }
}