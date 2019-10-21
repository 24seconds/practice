class ListItem {
  constructor(tag, parent, props) {
    const element = document.createElement(tag);
    element.innerHTML = `This is item  ${props.index}`;
    element.onmouseover = this.onMouseOver.bind(this);
    element.onmouseout = this.onMouseOut.bind(this);
    this.element = element;
    this.props = props;
    this.parent = parent;
  }

  onMouseOver() {
    console.log(`mouse is overed on element ${this.props.index}`);

    this.element.style.marginLeft = "40px";
    this.setSurroundingMargin(20);
  }

  setSurroundingMargin(margin) {
    const { index } = this.props;

    memo[index - 1] && (memo[index - 1].element.style.marginLeft = `${margin}px`);
    memo[index + 1] && (memo[index + 1].element.style.marginLeft = `${margin}px`);
  }

  onMouseOut() {
    console.log(`mouse is out on element ${this.props.index}`);
    this.element.style.marginLeft = "0";
    this.setSurroundingMargin(0);
  }

  render() {
    this.parent.appendChild(this.element);
  }
}

const container = document.querySelector("#container");

const memo = {};

function render() {
  for (let i = 0; i < 100; i ++) {
    const newItem = new ListItem("li", container, { index: i });
    memo[i] = newItem;
    newItem.render();
  }
}

render();

