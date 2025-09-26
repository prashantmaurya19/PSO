import { emit } from "@pso/util/event";

export class RenderChessBoardEventHandler {
  static onDrag(e) {
    const x = e.currentTarget.parentNode.parentNode.pmclientX;
    const y = e.currentTarget.parentNode.parentNode.pmclientY;
    e.currentTarget.style.transform = `translate(${e.clientX - x}px, ${e.clientY - y}px)`;
  }
  static onDragStart(e) {
    e.dataTransfer.setDragImage(document.createElement("span"), 0, 0);
    e.currentTarget.parentNode.parentNode.pmx = parseInt(
      e.currentTarget.getAttribute("data-col"),
    );
    e.currentTarget.parentNode.parentNode.pmy = parseInt(
      e.currentTarget.getAttribute("data-row"),
    );
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.parentNode.parentNode.pmclientY =
      rect.top + rect.height / 2;
    e.currentTarget.parentNode.parentNode.pmclientX =
      rect.left + rect.width / 2;

    e.stopPropagation();
    e.stopPropagation();
  }
  static onDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
  }
  static onDrop(e) {
    const e_rect = e.currentTarget.getBoundingClientRect();
    const e_height = e_rect.height;
    const e_width = e_rect.width;
    const p_rect =
      e.currentTarget.parentNode.parentNode.getBoundingClientRect();
    const y = Math.floor((e.clientY - p_rect.y) / e_height);
    const x = Math.floor((e.clientX - p_rect.x) / e_width);
    emit("PHYSICAL_BOARD_MOVE_PLAYED", {
      to: [x, y],
      from: [e.currentTarget.parentNode.pmx, e.currentTarget.parentNode.pmy],
    });
    e.target.style.transform = "";
    e.preventDefault();
    e.stopPropagation();
  }
}
