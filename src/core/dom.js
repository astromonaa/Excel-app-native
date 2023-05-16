class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string' 
      ? document.querySelector(selector)
      : selector
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html
      return this
    }
    return this.$el.outerHTML.trim()
  }
  text(content) {
    if (typeof content !== 'undefined') {
      this.$el.textContent = content;
      return this
    }
    if (this.$el.tagName.toLowerCase() === 'input') {
      return this.$el.value.trim()
    }
    return this.$el.textContent.trim()
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback)
  }
  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback)
  }
  clear() {
    this.html('')
    return this
  }
  append(node) {
    if (node instanceof Dom) {
      node = node.$el
    }
    if (Element.prototype.append) {
      this.$el.append(node)
    } else {
      this.$el.appendChild(node)
    }
    return this
  }
  closest(selector) {
    return $(this.$el.closest(selector))
  }
  getCoords() {
    return this.$el.getBoundingClientRect()
  }
  get data() {
    return this.$el.dataset
  }
  find(selector) {
    return $(this.$el.querySelector(selector))
  }
  findAll(selector) {
    return this.$el.querySelectorAll(selector)
  }
  css(styles={}) {
    // for (const style in styles) {
    //   if (styles.hasOwnProperty(style)) {
    //     this.$el.style[style] = styles[style]
    //   }
    // }
    Object
      .keys(styles)
      .forEach(style => this.$el.style[style] = styles[style])
  }
  getStyles(styles = []) {
    return styles.reduce((acc, style) => {
      acc[style] = this.$el.style[style]
      return acc
    }, {})
  }
  addClass(className) {
    this.$el.classList.add(className)
    return this
  }
  removeClass(className) {
    this.$el.classList.remove(className)
    return this
  }
  id(parse) {
    if (parse) {
      const parsed = this.id().split(':')
      return {
        row: +parsed[0],
        col: +parsed[1]
      }
    }
    return this.data.id
  }
  focus() {
    this.$el.focus()
    return this
  }
  attr(name, value) {
    if (value) {
      this.$el.setAttribute(name, value)
      return this
    }
    return this.$el.getAttribute(name)
  }
}


export function $(selector) {
  return new Dom(selector)
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName)
  if (classes) {
    el.classList.add(classes)
  }
  return $(el)
}