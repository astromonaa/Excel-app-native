export class Emitter {
  constructor() {
    this.listeners = {}
  }
  // dispatch, fire, trigger
  // Уведомляем слушателей, если они есть
  // eventName - formua:done...
  emit(event, ...args) {
    if (!Array.isArray(this.listeners[event])) {
      return
    }
    this.listeners[event].forEach(listener => listener(...args))
    return true
  }
  // on, listen
  // Подписываемся на уведомления, добавляем нового слушателя
  // formula.subscribe('table:select', () => {})
  subscribe(event, fn) {
    this.listeners[event] = this.listeners[event] || []
    this.listeners[event].push(fn)

    return () => {
      this.listeners[event] = this.listeners[event].filter(listener => listener !== fn)
    }
  }
}

// const emitter = new Emitter()

// const unsub = emitter.subscribe('abby', data => console.log('sub', data))
// emitter.emit('abby', 42)
// unsub()