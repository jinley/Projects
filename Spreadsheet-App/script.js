const spreadSheetContainer = document.querySelector("#spreadsheet-container");
const exportBtn = document.querySelector('#export-btn');
const ROWS = 10;
const COLS = 10;
const spreadsheet = [];
const alphabets = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
];

// 클래스 생성하기
class Cell {
    constructor(isHeader, disabled, data, row, column, rowName, columnName, active = false) {
        this.isHeader = isHeader;
        this.disabled = disabled;
        this.data = data;
        this.row = row;
        this.rowName = rowName;
        this.column = column;
        this.columnName = columnName;
        this.active = active;
    
    }
}

exportBtn.onclick = function (e) {
    let csv = "";
    for(let i = 0; i < spreadsheet.length; i++) {
        if(i === 0) continue;
        csv +=
            spreadsheet[i]
                .filter(item => !item.isHeader) // 헤더는 데이터에 포함하지 않음
                .map(item => item.data) // 객체 프로퍼티 중 data 값만 필요함
                .join(',') + "\r\n"; // \r\n : 줄바꾸기
    }
    console.log('csv', csv);

    const  csvObj = new Blob([csv]);
    const csvUrl = URL.createObjectURL(csvObj);
    console.log('csvUrl', csvUrl);

    const a = document.createElement('a');
    a.href = csvUrl;
    a.download = 'spreadsheet name.csv';
    a.click();
}

initSpreadsheet();
function initSpreadsheet() {
    for (let i = 0; i < ROWS; i++) {
        let spreadsheetRow = [];
        for (let j = 0; j < COLS; j++) {
            let cellData = '';
            let isHeader = false;
            let disabled = false;

            // 첫 row에 숫자 넣기
            if(j === 0) {
                cellData = i;
                isHeader = true;
                disabled = true;
            }
            // 첫 번째 row의 칼럼은 빈칸으로
            if(cellData <= 0) {
                cellData = '';
            }

            // 첫 column에 숫자 넣기
            if(i === 0) {
                cellData = alphabets[j - 1];
                isHeader = true;
                disabled = true;
            }            

            // undefined이 나오면 빈칸으로 처리
            if(!cellData) {
                cellData = "";
            }

            const rowName = i;
            const columnName = alphabets[j - 1];

            const cell = new Cell(isHeader, disabled, cellData, i, j, rowName, columnName, false);
            spreadsheetRow.push(cell);
        }
        spreadsheet.push(spreadsheetRow);
    }
    drawSheet();
    console.log(spreadsheet);
}


// cell 생성하기

function createCellEl(cell) {
    const cellEl = document.createElement('input');
    cellEl.className = 'cell';
    cellEl.id = 'cell_' + cell.row + cell.column;
    cellEl.value = cell.data;
    cellEl.disabled = cell.disabled;

    if(cell.isHeader) {
        cellEl.classList.add('header');
    }

    cellEl.onclick = () => handleCellClick(cell); // 셀 클릭 시 클릭된 셀 객체를 콘솔에 보여줌
    cellEl.onchange = (e) => handleOnChange(e.target.value, cell);

    return cellEl;
}

function handleOnChange(data, cell) {
    cell.data = data;
}

function handleCellClick(cell) {
    clearHeaderActiveStates(); // 클릭 시 액티브 속성 지우기
    const columnHeader = spreadsheet[0][cell.column];
    const rowHeader = spreadsheet[cell.row][0];
    const columnHeaderEl = getElFromRowCol(columnHeader.row, columnHeader.column); // 헤더 요소를 가져오기
    const rowHeaderEl = getElFromRowCol(rowHeader.row, rowHeader.column);
    columnHeaderEl.classList.add('active');
    rowHeaderEl.classList.add('active');

    console.log('clicked cell', columnHeaderEl, rowHeaderEl);
    document.querySelector('#cell-status').innerHTML = cell.columnName + cell.rowName;
}

function getElFromRowCol (row, col) {
    return document.querySelector("#cell_" + row + col);
}

function clearHeaderActiveStates() {
    const headers = document.querySelectorAll('.header');

    headers.forEach((headers) => {
        headers.classList.remove('active');
    });
}


// cell 렌더링하기 V
function drawSheet () {
    for(let i = 0; i < spreadsheet.length; i++) {
        const rowContainerEl= document.createElement('div'); // 한 행을 div로 감싸주기
        rowContainerEl.className = 'cell-row';

        for(let j = 0; j < spreadsheet[i].length; j++) {
            const cell = spreadsheet[i][j];
            rowContainerEl.append(createCellEl(cell));
            spreadSheetContainer.append(rowContainerEl); // 컨테이너 요소에 붙여주기
        }
    }
}