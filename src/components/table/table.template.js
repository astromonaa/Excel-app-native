import { defaultStyles } from "../../constants"
import { parse } from "../../core/parse"
import { toInlineStyles } from "../../core/utils"

const CODES = {
  A: 65,
  Z: 90
}
const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 25

function getWidth(state, index) {
  return state[index] || DEFAULT_WIDTH + 'px'
}
function getHeight(state, index) {
  return state[index] || DEFAULT_HEIGHT + 'px'
}
function getCellText(row, col, state) {
  const id = `${row}:${col}`
  return state[id] || ''
}
// function toCell(_, col) {
//   return `<div class="cell" data-col=${col} contenteditable></div>`
// }

function toCell(row, state) {
  return function(_, col) {
    const styles = toInlineStyles({
      ...defaultStyles,
      ...state.stylesState[`${row}:${col}`]
    })
    const cellValue = getCellText(row, col, state.dataState)
    return `
      <div
        class="cell"
        data-col=${col}
        data-row=${row}
        data-type="cell"
        data-id="${row}:${col}"
        data-value="${cellValue}"
        contenteditable
        style="${styles}; width: ${getWidth(state.colState, col)}"
      >${parse(cellValue)}</div>`
  }
}

function toColumn({col, index, width}) {
  return `
  <div
    class="column"
    data-type="resizable"
    data-col=${index}
    style="width: ${width}"
  >
    ${col}
    <div class="col-resize" data-resize="col"></div>
  </div>`
}

function createRow(index, content, state) {
  const resize = index ? '<div class="row-resize" data-resize="row"></div>' : ''
  const height = getHeight(state, index)
  return `
  <div class="row" data-type="resizable" data-row="${index}" style="height: ${height}">
    <div class="row-info">
      ${index ? index : ''}
      ${resize}
    </div>
    <div class="row-data">${content}</div>
  </div>`
}

function toChar(_, idx) {
  return String.fromCharCode(CODES.A + idx)
}

function withWidthFrom(state) {
  return (col, index) => {
    return {
      col, index, width: getWidth(state.colState, index)
    }
  }
}

export function createTable(rowsCount=25, state = {}) {
  console.log(state);
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  // Создаем первую строку с буквами
  const cols = new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(withWidthFrom(state))
    .map(toColumn)
    .join('')

  rows.push(createRow(null, cols, {}))

  // Затем создаем остальные строки

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
      .fill('')
      // .map((_, col) => toCell(row, col))
      .map(toCell(row, state))
      .join('')

    rows.push(createRow(row + 1, cells, state.rowState))
  }
  return rows.join('')
}