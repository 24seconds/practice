const DATA_VALUE = "data-value";

class ListItem {
  constructor(tag, parent, props) {
    const element = document.createElement(tag);
    element.innerHTML = `This is item  ${props.index}`;
    element.onclick = this.onClick.bind(this);
    element.style.transition = "width 0.2s, margin 0.2s";
    this.element = element;
    this.props = props;
    this.parent = parent;

    this.attachListener();
  }

  onMouseOver() {
    const { index } = this.props;
    console.log(`mouse is overed on element ${index}`);
    currentHoveredItem.innerHTML = `current: ${index}`;
    currentHoveredItem.setAttribute(DATA_VALUE, index);

    onHovered(this.element)
    this.element.style.cursor = "pointer";
    this.setSurroundingMargin(false);
  }

  setSurroundingMargin(shouldReset) {
    const { index } = this.props;

    memo[index - 1] && onSurround(memo[index - 1].element, shouldReset);
    memo[index + 1] && onSurround(memo[index + 1].element, shouldReset);
  }

  onMouseOut() {
    currentHoveredItem.innerHTML = `current: -1`;
    currentHoveredItem.setAttribute(DATA_VALUE, -1);

    onNotHovered(this.element);
    this.setSurroundingMargin(true);
  }

  onClick() {
    this.dettachListener()
    onClicked(this.element);
    onPopupRootShow(popupRoot);

    this.element.style.cursor = null;
    currentHoveredItem.getAttribute(DATA_VALUE, this.props.index);
    this.setSurroundingMargin(true);

    showPoupRoot(popupRoot);
  }

  attachListener() {
    this.element.onmouseover = this.onMouseOver.bind(this);
    this.element.onmouseout = this.onMouseOut.bind(this);
  }

  dettachListener() {
    this.element.onmouseover = null;
    this.element.onmouseout = null;
  }

  render() {
    this.parent.appendChild(this.element);
  }
}

function showPoupRoot(element) {
  const style = {
    width: "100%",
    height: "100%",
    "background-color": "#0000001f",
    position: "absolute",
    "z-index": "10",
    "top": "0",
  }

  for (const key in style) {
    element.style[key] = style[key];
  }
}

function onHovered(element) {
  element.style.margin = "10px 0 10px 40px";
}

function onNotHovered(element) {
  element.style.margin = null;
}

function onSurround(element, shouldReset = true) {
  if (shouldReset) {
    element.style.margin = null;
  } else {
    element.style.margin = "10px 0 10px 20px";
  }
}

function onClicked(element) {
  const style = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "fixed",
    margin: "auto",
    top: "0",
    bottom: "0",
    left: "0",
    right: "0",
    height: "50%",
    zIndex: "15",
  }

  for (const key in style) {
    element.style[key] = style[key];
  }
}

function onNotClicked(element) {
  const style ={
    display: "list-item",
    justifyContent: null,
    position: "static",
    margin: "0",
    top: "auto",
    bottom: "auto",
    left: "auto",
    right: "auto",
    height: "100px",
    zIndex: "auto",
  }

  for (const key in style) {
    element.style[key] = style[key];
  }
}

function onPopupRootShow(element) {
  const style = {
    width: "100%",
    height: "100%",
    "background-color": "#0000001f",
    position: "absolute",
    "z-index": "10",
    top: 0,
  }

  for (const key in style) {
    element.style[key] = style[key];
  }
}

function onPopupRootHide(element) {
  const style = {
    width: 0,
    height: 0,
    position: "relative",
    top: "auto",
  }

  for (const key in style) {
    element.style[key] = style[key];
  }
}

const container = document.querySelector("#container");

const memo = {};
const currentHoveredItem = document.querySelector("#currentHoveredItem");
const popupRoot = document.querySelector("#popupRoot");
popupRoot.onclick = function () {
  const listItem = memo[currentHoveredItem.getAttribute(DATA_VALUE)]
  listItem.element.className = null;
  listItem.attachListener();
  onNotClicked(listItem.element);
  onPopupRootHide(popupRoot);
}

function render() {
  for (let i = 0; i < 100; i ++) {
    const newItem = new ListItem("li", container, { index: i });
    memo[i] = newItem;
    newItem.render();
  }
}

render();

