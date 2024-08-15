import { observable, observe } from './observer.js';

export class Component {

  state; props; $el; children;
  
  constructor ($el, props) {
    this.$el = $el;
    this.props = props;
	  this.children = [];
    this.setup();
	  this.mounted();
    this.setEvent();
  }

  setup() {
    this.state = observable(this.initState());
    observe(() => {
      this.render();
	  this.children.forEach(child => child.render());
    });
  }

  initState() { return {} }
  template () { return ''; }
  render () { this.$el.innerHTML = this.template(); }
  setEvent () {}
  mounted () {}

  addEvent (eventType, selector, callback) {
    this.$el.addEventListener(eventType, event => {
      if (!event.target.closest(selector)) return false;
      callback(event);
    })
  }
}
