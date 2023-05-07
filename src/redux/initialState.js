import { defaultStyles } from "../constants"
import { storage } from "../core/utils"


const defaultState = {
  rowState: {},
  colState: {},
  dataState: {}, // {'0:1':'text'} 
  currentText: '',
  stylesState: {}, // {'1', {...}}
  currentStyles: defaultStyles
}
const normalize = state => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: ''
})
export const initialState = normalize(storage('excel-state')) || defaultState