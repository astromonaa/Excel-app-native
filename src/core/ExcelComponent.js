import { DomListener } from "@core/DomListener";

export class ExcelComponent extends DomListener {
  constructor($root, options={}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.emitter = options.emitter;
    this.subscribe = options.subscribe || []
    this.store = options.store
    this.unsubscribers = []
    this.prepare()
  }
  // Setting component before init
  prepare() {}
  // Returns component template
  toHTML() {
    return ''
  }
  // Приходят изменения по тем полям, на которые мы подписались 
  storeChanged() {}
  // Уведомляем слушателей про событие event
  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn)
    this.unsubscribers.push(unsub)
  }

  $dispatch(action) {
    this.store.dispatch(action)
  }

  // Initializing component
  // Add Listeners
  init() {
    this.initDomListeners()
  }
  // Destroy component
  // Remove listeners
  destroy() {
    this.removeDomListeners()
    this.unsubscribers.forEach(unsub => unsub())
  }
  isWatching(key) {
    return this.subscribe.includes(key)
  }
}