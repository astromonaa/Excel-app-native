import { $ } from "@core/dom";

export function resizeHandler($root, event) {
  return new Promise((resolve) => {
    const $resizer = $(event.target);
    // const $parent = $resizer.$el.parentNode // BAD!
    // const $parent = $resizer.$el.closest('.column') // better, but also bad

    const $parent = $resizer.closest('[data-type="resizable"]');
    const coords = $parent.getCoords();
    const type = $resizer.data.resize;

    const sideProp = type === "col" ? "bottom" : "right";
    $resizer.css({ opacity: 1, [sideProp]: "-5000px" });

    let changedValue;

    document.onmousemove = (e) => {
      if (type === "col") {
        const delta = e.pageX - coords.right;
        changedValue = coords.width + delta + "px";
        $resizer.css({ right: -delta + "px" });
      } else {
        const delta = e.pageY - coords.bottom;
        changedValue = coords.height + delta + "px";
        $resizer.css({ bottom: -delta + "px" });
      }
    };

    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;

      if (type === "col") {
        $parent.css({ width: changedValue });
        $root
          .findAll(`[data-col="${$parent.data.col}"]`)
          .forEach((cell) => (cell.style.width = changedValue));
      } else {
        $parent.css({ height: changedValue });
      }
      $resizer.css({ opacity: 0, bottom: 0, right: 0 });
      resolve({
        value: changedValue,
        type,
        // id: type === 'col' ? $parent.data.col : $parent.data.row
        id: $parent.data[type]
      })
    };
  });
}
