function delRow(currElement, table) {
    const parentRowIndex = currElement.parentNode.parentNode.rowIndex;
    document.getElementById(table).deleteRow(parentRowIndex);
}

function addRow(tableChosen, values) {
    const [a, b] = values;
    const table = document.getElementById(tableChosen);
    const row = table.insertRow(-1);
    const cell1 = row.insertCell(-1);
    const newInp1 = document.createElement("input");
    newInp1.type="text";
    newInp1.value=a;
    cell1.appendChild(newInp1);
    const cell2 = row.insertCell(1);
    const newInp2 = document.createElement("input");
    newInp2.type="text";
    newInp2.value=b;
    cell2.appendChild(newInp2);
    const cell3 = row.insertCell(2);
    const newInp3 = document.createElement("input");
    newInp3.type = "button";
    newInp3.value = "Delete";
    newInp3.onclick = () => delRow(newInp3, tableChosen);
    cell3.appendChild(newInp3);
}

function addCalcRow(tableChosen, values) {
    const [a, b] = values;
    const table = document.getElementById(tableChosen);
    const row = table.insertRow(-1);
    const cell1 = row.insertCell(-1);
    const newInp1 = document.createElement("input");
    newInp1.type="text";
    newInp1.value=a;
    cell1.appendChild(newInp1);
    const cell2 = row.insertCell(1);
    const newInp2 = document.createElement("input");
    newInp2.type="text";
    newInp2.value=b;
    cell2.appendChild(newInp2);
}

let table1Values = [[1, 2], [2, 4], [4, 6], [7, 7]];
for (let i = 0; i < table1Values.length; i += 1) {
    addRow('table1', table1Values[i]);
}

let table2Values = [[2, -1], [4, -1], [6, 1], [9, 2], [11, 4]];
for (let i = 0; i < table2Values.length; i += 1) {
    addRow('table2', table2Values[i]);
}

const table3Size = () => { return Math.min(table1Values.length, table2Values.length) };

function calculate() {
    table1Values = [];
    table2Values = [];
    const table1 = document.getElementById("table1");
    for (let i = 1; i < table1.rows.length; i += 1) {
        let row = table1.rows[i]
        table1Values.push([Number(row.cells[0].firstChild.value), Number(row.cells[1].firstChild.value)])
    }
    // console.log(table1Values);    
    const table2 = document.getElementById("table2");
    for (let i = 1; i < table2.rows.length; i += 1) {
        let row = table2.rows[i]
        table2Values.push([Number(row.cells[0].firstChild.value), Number(row.cells[1].firstChild.value)])
    }
    // console.log(table2Values);
    const table3 =  document.getElementById("table3");    
    const rowCount = table3.rows.length;
    // console.log(rowCount);
    for (let i = rowCount - 1; i > 0; i -= 1) {
        table3.deleteRow(i);
    }
    const calcArray = [];
    // console.log(table3Size());
    for (let i = 0; i < table3Size(); i += 1) {
        calcArray.push([(table1Values[i][0] + table2Values[i][0]) / 2, (table1Values[i][1] + table2Values[i][1]) / 2]);
        addCalcRow('table3', calcArray[i]);
    }
    drawGraph('canvas1', table1Values);
    drawGraph('canvas2', table2Values);
    drawGraph('canvas3', calcArray);
}
calculate();

function prepareCanvas (canvasId) {
let canvas = document.getElementById(canvasId);
let ctx = canvas.getContext('2d');
    
ctx.strokeStyle = "black";
ctx.fillStyle = "black";
ctx.lineWidth = 1.0;
ctx.beginPath();
ctx.moveTo(250, 10);
ctx.lineTo(250, 490);
ctx.stroke();
ctx.moveTo(10, 250);
ctx.lineTo(490, 250);
ctx.stroke();
ctx.font = '6px serif';
ctx.textAlign = 'center';

ctx.fillStyle = "black";
const fillY = (i) => {
    ctx.fillText( i + "", 244, 252 - i * 10); 
    ctx.beginPath(); 
    ctx.moveTo(248, 250 - i * 10); 
    ctx.lineTo(252, 250 - i * 10); 
    ctx.stroke(); 
};
for(let i = -24; i < 24; i += 1) { 
   if (i !== 0) fillY(i);
}
const fillX = (i) => {
    ctx.fillText( i + "", 250 + i * 10, 258); 
    ctx.beginPath(); 
    ctx.moveTo(250 + i * 10, 248); 
    ctx.lineTo(250 + i * 10, 252); 
    ctx.stroke(); 
};
for(let i = -24; i < 24; i += 1) { 
    if (i !== 0) fillX(i);
 }
}

function drawGraph (canvasId, arr) {
    const array =arr.sort((a, b) => a[0] - b[0]);
    let canvas = document.getElementById(canvasId); 
    let ctx = canvas.getContext('2d');    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    prepareCanvas(canvasId);
    ctx.strokeStyle = "red";
    ctx.lineWidth = 1.0; 
    ctx.beginPath();
    ctx.moveTo(250 + array[0][0] * 10, 250 - array[0][1] * 10);
    for (let i = 1; i < array.length; i += 1) { 
        ctx.lineTo(250 + array[i][0] * 10, 250 - array[i][1] * 10); 
     }
    ctx.stroke();
}
