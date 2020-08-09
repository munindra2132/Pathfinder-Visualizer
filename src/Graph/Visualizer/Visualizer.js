import React , {Component} from 'react';
import Node from '../Node/Node.js';
import {dijkstra, getNodesInShortestPathOrderDijkstra} from '../Algorithms/dijkstra';
import {bfs, getNodesInShortestPathOrderBFS } from '../Algorithms/bfs';
import {dfs, getNodesInShortestPathOrderDFS } from '../Algorithms/dfs';
import './Visualizer.css';


let sr =7;
let sc =15;
let fr = 18;
let fc = 45;
export default class Visualizer extends Component {
    constructor(props){
        super(props);
        this.state={
            grid: [],
            mouseIsPressed:false,
            START_NODE_ROW: 7,
            START_NODE_COL:  15,
            FINISH_NODE_ROW:  18,
            FINISH_NODE_COL: 45,

        }
        
    } 
    componentDidMount() {
        const grid = getInitialGrid();
        this.setState({grid});
      }
    
      handleMouseDown(row, col) {
        const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
        this.setState({grid: newGrid, mouseIsPressed: true});
      }
    
      handleMouseEnter(row, col) {
        if (!this.state.mouseIsPressed) return;
        const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
        this.setState({grid: newGrid});
      }
    
      handleMouseUp() {
        this.setState({mouseIsPressed: false});
      }
    
      animateDijkstra(visitedNodesInOrder,nodesInShortestPathOrder) {
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
          if (i === visitedNodesInOrder.length) {
            setTimeout(() => {
              this.animateShortestPath(nodesInShortestPathOrder);
            }, 10 * i);
            return;
          }
          setTimeout(() => {
            const node = visitedNodesInOrder[i];
            document.getElementById(`node-${node.row}-${node.col}`).className =
              'node node-visited';
          }, 10 * i);
        }
      }
    
      animateShortestPath(nodesInShortestPathOrder) {
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
          setTimeout(() => {
            const node = nodesInShortestPathOrder[i];
            document.getElementById(`node-${node.row}-${node.col}`).className =
              'node node-shortest-path';
          }, 50 * i);
        }
      }
    //the below lines 
      visualizeDijkstra() {
        // sr = this.state.START_NODE_ROW;
        // sc = this.state.START_NODE_COL;
        // fr = this.state.FINISH_NODE_ROW;
        // fc = this.state.FINISH_NODE_COL;
        document.getElementById(`node-${this.state.START_NODE_ROW}-${this.state.START_NODE_COL}`).className =
              'node node-start';
        const {grid} = this.state;
        const startNode = grid[this.state.START_NODE_ROW][this.state.START_NODE_COL];
        const finishNode = grid[this.state.FINISH_NODE_ROW][this.state.FINISH_NODE_COL];
        const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
        
        const nodesInShortestPathOrder = getNodesInShortestPathOrderDijkstra(finishNode);
        // console.log(visitedNodesInOrder);
        this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
      }
    
      //the below lines calls the bfs function to traverse the grid
      visualizeBFS() {
        // sr = this.state.START_NODE_ROW;
        // sc = this.state.START_NODE_COL;
        const {grid} = this.state;
        const startNode = grid[this.state.START_NODE_ROW][this.state.START_NODE_COL];
        const finishNode = grid[this.state.FINISH_NODE_ROW][this.state.FINISH_NODE_COL];
        const visitedNodesInOrder = bfs(grid,startNode,finishNode);
        const nodesInShortestPathOrder = getNodesInShortestPathOrderBFS(finishNode);
          //console.table(visitedNodesInOrder[0]);
         // alert("BFS is going to execute");
          this.animateDijkstra(visitedNodesInOrder,nodesInShortestPathOrder);
         //console.log(visitedNodesInOrder.length);
      }

      visualizeDFS() {
        // sr = this.state.START_NODE_ROW;
        // sc = this.state.START_NODE_COL;
        const {grid} = this.state;
        const startNode = grid[this.state.START_NODE_ROW][this.state.START_NODE_COL];
        const finishNode = grid[this.state.FINISH_NODE_ROW][this.state.FINISH_NODE_COL];
        const visitedNodesInOrder = dfs(grid,startNode,finishNode);
        const nodesInShortestPathOrder = getNodesInShortestPathOrderDFS(finishNode);
          this.animateDijkstra(visitedNodesInOrder,nodesInShortestPathOrder);
      }


      myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
      }

        render() {
            const {grid, mouseIsPressed} = this.state;
        
            return (
              <>
              {/* /*{ <form >
              <label>
                  Start Node :
                        <label>
                         X : 
                         <input
                         name="START_NODE_ROW"
                         type="number"
                         onChange={this.myChangeHandler}
                         value={this.state.START_NODE_ROW}
                         />
                         </label>
                         <label>
                         Y : 
                         <input
                         name="START_NODE_COL"
                         type="number"
                         onChange={this.myChangeHandler}
                         value = {this.state.START_NODE_COL}
                         />
                         </label>
              </label>
              <br/>
              <label>
                  End Node :
                        <label>
                         X : 
                         <input
                         name="FINISH_NODE_ROW"
                         type="number"
                         onChange={this.myChangeHandler}
                         value={this.state.FINISH_NODE_ROW}
                         />
                         </label>
                         <label>
                         Y : 
                         <input
                         name="FINISH_NODE_COL"
                         type="number"
                         onChange={this.myChangeHandler}
                         value={this.state.FINISH_NODE_COL}
                         />
                         </label>
              </label><br/>
              
             </form>  */}
             <button onClick={() => this.visualizeDFS() }>
                  Visualize Dijkstra's Algorithm
                </button>
                <div className="grid">
                  {grid.map((row, rowIdx) => {
                    return (
                      <div key={rowIdx}>
                        {row.map((node, nodeIdx) => {
                          const {row, col, dest, src, wall} = node;
                          return (
                            <Node
                              key={nodeIdx}
                              col={col}
                              dest={dest}
                              src={src}
                              wall={wall}
                              mouseIsPressed={mouseIsPressed}
                              onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                              onMouseEnter={(row, col) =>
                                this.handleMouseEnter(row, col)
                              }
                              onMouseUp={() => this.handleMouseUp()}
                              row={row}></Node>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </>
            );
          }
}
const getInitialGrid = () => {
    const grid = [];
    for (let row = 0; row < 20; row++) {
      const currentRow = [];
      for (let col = 0; col < 50; col++) {
        currentRow.push(createNode(col, row));
      }
      grid.push(currentRow);
    }
    return grid;
  };
  const createNode = (col, row) => {
    return {
      col,
      row,
      src: row === sr && col === sc,
      dest: row === fr && col === fc,
      distance: Infinity,
      isVisited: false,
      wall: false,
      previousNode: null,
    };
  };
  const getNewGridWithWallToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      wall: !node.wall,
    };
    newGrid[row][col] = newNode;
    return newGrid;
  };