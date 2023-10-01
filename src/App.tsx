/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import './App.css';
import logo from './logo.svg';
import { Note } from './note.class';
import $, { removeData } from "jquery";

/* 
**************************************************************************
To run in browser...
1. using console, navigate to dev directory 
2. navigate to reactProject directory
3. run 'npm start' to start the server
4. point browser at http://localhost:3000/ (if it doesn't automatically)
**************************************************************************
*/


// https://www.typescriptlang.org/docs/handbook/2/modules.html#additional-import-syntax
import {controlOptions} from './links';


/** ********************
 *  OBJECTS
 *  ********************
 */

/** 
 *  updating a list: 
 *  https://www.robinwieruch.de/react-add-item-to-list/
 */ 


const initialList = [
  {
    id: 1,
    name: 'Robin',
  },
  {
    id: 2,
    name: 'Dennis',
  },
];

var divCounter: number = 0;

const initialNoteList = [
  {
    title: 'blah',
    content: 'blah',
  }
];

const tmpCoordinates = {
  x: 0,
  y: 0,
  div: null,
}

const noteOptions = {
  x: 50,
  y: 100,
  w: 200,
  h: 200,
  title: 'blah',
  content: 'this is my new thingy',
};

const noteObj = {};
let box;
let boxArray: any = [];

var greaterThanTen: any = (num) => {
  let out: number | string;
  if (num >= 10) { 
    out = num 
  } 
  else { 
    out = "0" + num; 
  }

  return out;
}


// create code for current time
var getTimeNow = () => {
  var time = [];
  var currentDate = new Date();
  var hour = greaterThanTen ( currentDate.getHours() );
  time.push ( hour );
  var minute = greaterThanTen ( currentDate.getMinutes() );
  time.push ( minute );
  var second = greaterThanTen ( currentDate.getSeconds() );
  time.push ( second );

  return time.join(":");
  }

// https://stackoverflow.com/questions/36497843/what-is-the-array-type-for-html-elements-in-typescript
//var divList : Array<HTMLDivElement>;


  // Dragging
  // https://www.kindacode.com/article/react-typescript-drag-and-drop/#google_vignette
  // https://stackoverflow.com/questions/72309926/how-can-i-get-the-data-attribute-in-typescript-with-react-drag-and-drop
  // https://www.programcreek.com/typescript/?api=react.DragEvent
  

  // https://stackoverflow.com/questions/71313587/what-is-the-equivalent-of-dragstart-event-datatransfer-setdata-for-touchstart
  // create a custom object that temporarily stores then destroys drag information, as you can only have
  // one drag event happening at any given time, regardless of how many objects are being dragged.
  // you can even use react to detect changes in the value


  // https://reactjs.org/docs/components-and-props.html
  // https://stackoverflow.com/questions/61226729/pass-style-as-props-in-react-component

  // deals with the curious issue of the div snapping back in place, plus the delay
  // https://github.com/react-dnd/react-dnd/issues/3115
  
  function DraggableDiv <HTMLDivElement>(props: any) {
    
    let name: string = props.name;
    let x: number = props.x;
    let y: number = props.y;
    let z: number = props.z;
    let description: string = props.description;

    const divStyle: any = {
      width: '100px',
      hight: '100px',

    };

    return (<div style={props.divStyle}>
      {props.name}
      <br />
      {props.description}
      </div>);
  }


/* ************************************************
   ************************************************

    MAIN APP

   ************************************************
   ************************************************
*/

function App() {
  let co: controlOptions = new controlOptions();
  let cs = co.cranberrySauce;

  const root = document.querySelector(":root");
  var canvas1 = document.createElement('canvas');
  canvas1.id = "canvas1";
  canvas1.style.border="2px dotted orange";
  canvas1.style.width="600px";
  canvas1.style.height="600px";
  canvas1.style.position="absolute";
  canvas1.style.top="20px";
  root.append(canvas1);

  // controls the size of the two end points
  const pointRadius = 20;
  let dragging = "none";
  
  function getVars() {
    const rootStyle = window.getComputedStyle(root);
    const vars = {};
    for (const p of ["p", "cp"]) {
      for (const i of ["1", "2"]) {
        for (const xy of ["x", "y"]) {
          const varName = p + i + xy;
          vars[varName] = parseInt(rootStyle.getPropertyValue("--" + varName));
        }
      }
    }
    return vars;
  }

  //const canvas = document.querySelector("canvas");
  const ctx = canvas1.getContext("2d");

    // sets the style of the two shapes
// that are connected by the curve
function drawPoint(x, y) {
  ctx.save();
  ctx.fillStyle = "blue";
  ctx.strokeStyle = "orange";
  ctx.beginPath();
  ctx.arc(x, y, pointRadius, 0, 2 * Math.PI);
  ctx.fill();
  ctx.restore();
}

function drawBezier(vars) {
  ctx.save();
  ctx.strokeStyle = "red";
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.moveTo(vars.p1x, vars.p1y);
  ctx.bezierCurveTo(
    vars.cp1x,
    vars.cp1y,
    vars.cp2x,
    vars.cp2y,
    vars.p2x,
    vars.p2y
  );
  ctx.stroke();
  ctx.restore();
}


function redraw() {
  ctx.clearRect(0, 0, canvas1.width, canvas1.height);
  const vars = getVars();

  drawBezier(vars);
  drawPoint(50, 100);
  drawPoint(100, 200);
}

redraw();


  // React hook: a simple state
  //   example of how to use state in a function component 
  //   with the useState hook
  // https://www.robinwieruch.de/react-usestate-hook/

  /* 
  This JavaScript syntax (const [val1, val2]) is called “array destructuring”. It means that we’re making 
  two new variables count and setCount, where count is set to the first value returned by useState, and 
  setCount is the second. 
  
  When we declare a state variable with useState, it returns a pair — an array with two items. The first 
  item is the current value, and the second is a function that lets us update it. Using [0] and [1] to 
  access them is a bit confusing because they have a specific meaning. This is why we use array 
  destructuring instead.
  */
  //const [list, setList] = React.useState(initialList);
  
  const [count, setCount] = React.useState(0);
  const [list, setList] = React.useState<any[]>([]);
  const [value, setValue] = React.useState("");

  // create temporary values for currently dragged items
  const [posX, setX] = React.useState<number>(tmpCoordinates.x);
  const [posY, setY] = React.useState<number>(tmpCoordinates.y);
  const [draggedDiv, setDiv] = React.useState<string>(tmpCoordinates.div);

  const [notes, setNote] = React.useState(initialNoteList);

  // https://stackoverflow.com/questions/59125973/react-typescript-argument-of-type-is-not-assignable-to-parameter-of-type
  var noteArray: Array<HTMLDivElement>[];

  const [divList, setDivList] = React.useState<any[]>([]);
  const addDivToList = (d) => {
    var dm = document.getElementById('12345');
    dm.append(d);

    let tempArr: any[] = divList;
    tempArr.push(d);
    // call the React useState
    setDivList(tempArr);
    // update a status value
    setValue("div array: " + divList.length);
  };

  var createNote = () => {  
    
    divCounter++;
    var id:string = "div" + divCounter;
    var note = new Note(noteOptions);
    note.title = "fred" + divCounter;
    note.content = "some stuff I saw";  

    var div = document.createElement('div');
    div.id = id;
    div.title = note.title;
    div.style.position = "absolute";
    div.style.backgroundColor = "white";
    div.style.width = "200px";
    div.style.height = "200px";
    div.style.left = "100px";
    div.style.top = "100px";
    div.draggable = true;

    // childNode[0]
    var divText = document.createElement('div');
    divText.id = "divtext" + divCounter;
    divText.contentEditable="true";
    divText.style.font="Arial";
    divText.style.fontSize="15px";
    divText.style.fontWeight="400";
    divText.style.border="1px";
    divText.style.borderColor="#FFFFFF";
    divText.style.color="#000000";
    divText.style.margin="2px";
    divText.style.padding="2px";
    divText.style.width="190px";
    divText.style.height="160px";
    divText.style.overflow="auto";

    divText.innerHTML=id;

    div.appendChild(divText);

    div.ondragstart = (ev: any) => {
      console.log("drag start");
      setValue("drag start");

      // USE THIS TO SET THE VALUE IN DRAG?
      var style = window.getComputedStyle(ev.target, null);
      var str = ( parseInt(style.getPropertyValue("left")) - ev.clientX ) + "," + ( parseInt(style.getPropertyValue("top") ) - ev.clientY) + "," + ev.target.id;
      ev.dataTransfer.setData("Text", str);
      //console.log(str);
      
      //ev.preventDefault();
      ev.stopPropagation();
    }

    div.ondrag = (ev: any) => {
      
      setValue("draggin it");
      console.log("dragging");
      let x: number = ev.clientX;
      let y: number = ev.clientY;
      let time = getTimeNow();

      //console.log(time + ": x=" + x + " | y=" + y + " | id=" + id);
      setX(x);
      setY(y);
      setDiv(id);

      if (x>0 && y>0) {
        tmpCoordinates.x = x;
        tmpCoordinates.y = y;
        tmpCoordinates.div = id;
      }

      let dm = document.getElementById( tmpCoordinates.div ); 
      dm.style.left = (tmpCoordinates.x - 195) + 'px';
      dm.style.top = (tmpCoordinates.y - 195) + 'px';      
     
      ev.preventDefault();
    }

    div.ondragend = (ev: any) => {
      setValue("drag end");
      console.log("drag end");
      ev.stopPropagation();
      ev.stopImmediatePropagation();
      ev.preventDefault();
      
    }

    addDivToList(div);
    
  }


  
// https://bobbyhadz.com/blog/react-type-is-not-assignable-to-type-never
// - never[] - an array that will always be empty, which is not what we want.
  const addToList = () => {
    let tempArr: any[] = list;
    tempArr.push(value);
    setList(tempArr);
    setValue("");
  };


  const deleteItem = (index) => {
    let temp = list.filter((item, i) => i !== index);
    setList(temp);
  };


//Read more: https://www.java67.com/2022/01/how-to-create-dynamic-list-in-react.html


  /* ***********************************
  Hooks and Function Components
    function components in React look like this:

      const Example = (props) => 
      {
        // You can use Hooks here!
        return <div />;
      } 
    OR
      function Example(props) 
      {
        // You can use Hooks here!
        return <div />;
      }

    Hooks don’t work inside classes. But you can use them instead of writing classes.

    https://reactjs.org/docs/hooks-state.html
    What is a Hook? A Hook is a special function that lets you “hook into” React features. 
    For example, useState is a Hook that lets you add React state to function components. 

    What does calling useState do? It declares a “state variable”. This is a way to “preserve” some 
    values between the function calls. Normally, variables “disappear” when 
    the function exits but state variables are preserved by React.

    What do we pass to useState as an argument? The only argument to the useState() Hook 
    is the initial state. Unlike with classes, the state doesn’t have to be an object. We 
    can keep a number or a string if that’s all we need. In our example, we just want a 
    number for how many times the user clicked, so pass 0 as initial state for our variable. 
    (If we wanted to store two different values in state, we would call useState() twice.)

    What does useState return? It returns a pair of values: 
    - the current state
    - a function that updates it. 
    This is why we write const [count, setCount] = useState(). This is similar 
    to this.state.count and this.setState in a class, except you get them in a pair. If you’re 
    not familiar with the syntax we used, we’ll come back to it at the bottom of this page.
  */

  const handleIncrease = () => {
    setCount(count + 1);
    setValue("Increasing");
    initialList.push({ id: count, name: 'Richard' + count});
  };

  const handleDecrease = () => {
    setCount(count - 1);
    setValue("Decreasing");
    initialList.push({ id: count, name: 'Bobby' + count});
  };

  const addNoteToList = (n) => {
    initialNoteList.push(n);
  }

  // ============ DRAG AND DROP ============
  // The content of the target box
  const [content, setContent] = React.useState<string>("Drop Something Here");

  // This function will be triggered when you start dragging
  const dragStartHandler = ( ev: React.DragEvent<HTMLDivElement>) => {
    console.log("dragStartHandler ---------------------------------");
    ev.dataTransfer.setData("text", ev.currentTarget.id);
  };

  // This function will be triggered when dragging
  const dragHandler = (ev: React.DragEvent<HTMLDivElement>) => { 

  }

  const mouseUpHandler = (ev: React.MouseEvent) => {
    setValue("mouse is UP!!");
  }
  // This function will be triggered when dropping
  
  const dropHandler = (ev: React.DragEvent<HTMLDivElement>) => { 
    console.log("React dropHandler ---------------------------------");
    
    // set local values from temporary ones
    let x: number = posX;
    let y: number = posY;
    let divId: string = draggedDiv;

    let dm = document.getElementById( divId );
    dm.style.left = x + 'px';
    dm.style.top = y + 'px';
    ev.preventDefault();
    ev.stopPropagation();
  };


  // This makes the third box become droppable
  const allowDrop = (ev: React.DragEvent<HTMLDivElement>) => {
    ev.preventDefault();
    ev.stopPropagation();
  };

  // additional reference for creating a dynamic list
  // https://www.java67.com/2022/01/how-to-create-dynamic-list-in-react.html


  
  return (  
    <div id='12345' className="App">

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" width="80px" />
        { /*<canvas height="600" width="800" style={{border: '1px solid red'}} />*/ }
          <div style={{border: '1px solid blue'}}><b>{cs}</b></div>

        <DraggableDiv 
          name='blah'
          description='my description' />            
        <br />

        Count: {count}<br />
          <button type="button" onClick={handleDecrease}>Decrease</button>
          &nbsp;
          <button type="button" onClick={handleIncrease}>Increase</button>   
          &nbsp;
          <button type="button" onClick={createNote}>add note</button>

        <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />{" "}
        <button onClick={addToList}> Click to Add </button>

          { /* Read more: https://www.java67.com/2022/01/how-to-create-dynamic-list-in-react.html#ixzz7gO4xK1Cs */ }


        <p>
        X: <input type="text" value={tmpCoordinates.x} />
        Y: <input type="text" value={tmpCoordinates.y} />
        div: <input type="text" value={tmpCoordinates.div} />
        note count in array <input type="text" value={divList.length} />
        <br />

        <ul>
          {list.length > 0 && list.map((item, i) => <li onClick={() => deleteItem(i)}>{item} </li>)}
        </ul>

          <ul>
          {
            notes.map((item) => (
              <li>{item.title}</li>
            ))
          }
          </ul>
        </p>
      </header>

    </div>

  );
}


export default App;