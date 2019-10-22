class ListItem {
  constructor(tag, parent, props) {
    const element = document.createElement(tag);
    element.innerHTML = `This is item  ${props.index}`;
    element.onclick = this.onClick.bind(this);
    this.element = element;
    this.props = props;
    this.parent = parent;

    this.attachListener();
  }

  onMouseOver() {
    const { index } = this.props;
    console.log(`mouse is overed on element ${index}`);
    currentHoveredItem.innerHTML = `current: ${index}`;
    currentHoveredItem.setAttribute('data-value', index);

    this.element.className = "hovered";
    this.element.style.cursor = "pointer";
    this.setSurroundingMargin("surround");
  }

  setSurroundingMargin(className) {
    const { index } = this.props;

    memo[index - 1] && (memo[index - 1].element.className = className);
    memo[index + 1] && (memo[index + 1].element.className = className);
  }

  onMouseOut() {
    currentHoveredItem.innerHTML = `current: -1`;
    currentHoveredItem.setAttribute('data-value', -1);

    this.element.className = null;
    this.setSurroundingMargin(null);
  }

  onClick() {
    this.dettachListener()
    this.element.className = "clicked";
    this.element.style.cursor = null;
    currentHoveredItem.getAttribute('data-value', this.props.index);
    this.setSurroundingMargin(null);

    showPoupRoot()
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

function showPoupRoot() {
  popupRoot.className = "popupRoot";
}

const container = document.querySelector("#container");

const memo = {};
const currentHoveredItem = document.querySelector("#currentHoveredItem");
const popupRoot = document.querySelector("#popupRoot");
popupRoot.onclick = function () {
  const listItem = memo[currentHoveredItem.getAttribute('data-value')]
  listItem.element.className = null;
  listItem.attachListener();
  popupRoot.className = "null";
}

function render() {
  for (let i = 0; i < 100; i ++) {
    const newItem = new ListItem("li", container, { index: i });
    memo[i] = newItem;
    newItem.render();
  }
}

render();

