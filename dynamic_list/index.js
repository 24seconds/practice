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
    console.log(`mouse is overed on element ${this.props.index}`);

    currentHoveredItem.innerHTML = `current: ${this.props.index}`;
    currentHoveredItem.setAttribute('data-value', this.props.index);

    this.element.style.cursor = "pointer";
    this.element.className = "hovered";
    this.setSurroundingMargin(20);
  }

  setSurroundingMargin(margin) {
    const { index } = this.props;

    memo[index - 1] && (memo[index - 1].element.className = "surround");
    memo[index + 1] && (memo[index + 1].element.className= "surround");
  }

  onMouseOut() {
    console.log(`mouse is out on element ${this.props.index}`);
    currentHoveredItem.innerHTML = `current: -1`;
    this.element.style.margin = null;
    this.setSurroundingMargin(0);
  }

  onClick() {
    this.dettachListener()
    this.element.className = "clicked";
    currentHoveredItem.getAttribute('data-value', this.props.index);
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

