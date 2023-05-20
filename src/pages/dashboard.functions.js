import { storage } from "../core/utils"

function toHTML(key) {
  const model = storage(key)
  const id = key.match(/\d/g).join('')
  return `<li class="db__record">
            <a href="#excel/${id}">${model.title}</a>
            <strong>${format(model.openedDate)}</strong>
          </li>`
}

function getAllKeys() {
  const keys = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (!key.includes('excel')) {
      continue
    }
    keys.push(key)
  }
  return keys
}


export function createRecordsTable() {
  const keys = getAllKeys()
  if (!keys.length) {
    return `<p>You didn't create any table</p>`
  }
  return `<div class="db__list-header">
            <span>Name</span>
            <span>Date created</span>
          </div>

          <ul class="db__list">
            ${keys.map(toHTML).join('')}
          </ul>`
}

function format(number) {
  return `
    ${new Date(number).toLocaleDateString()}
    ${new Date(number).toLocaleTimeString()}
  `
}