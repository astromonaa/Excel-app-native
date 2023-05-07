export class TableSelection {
  static className = "selected";
  constructor() {
    this.group = [];
    this.current = null;
  }

  // $el instanceof Dom
  select($el) {
    this.clear();
    this.group.push($el);
    this.current = $el;
    $el.focus().addClass("selected");
  }
  clear() {
    this.group.forEach(($el) => $el.removeClass(TableSelection.className));
    this.group = [];
  }
  get selectedIds() {
    return this.group.map(i => i.id())
  }
  selectGroup(group = []) {
    this.clear();
    this.group = group;
    this.group.forEach(($el) => $el.addClass(TableSelection.className));
  }
  applyStyle(style) {
    this.group.forEach($el => $el.css(style))
  }
}
