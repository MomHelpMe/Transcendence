import { observable, observe } from './observer.js';

export class Component {

	state; props; $el; children; translations;
	
	constructor ($el, props) {
		this.$el = $el;
		this.props = props;
		this.children = [];
		this.setup();
		this.setEvent();
	}
	
	setup() {
		this.translate();
		this.state = observable(this.initState());
		observe(() => {
			this.render();
			this.mounted();
			this.children.forEach(child => child.render());
		});
	}
	
	initState() { return {} }
	template () { return ''; }
	render () { this.$el.innerHTML = this.template(); }
	setEvent () {}
	translate() {}
	mounted () {}

	addEvent (eventType, selector, callback) {
		this.$el.addEventListener(eventType, event => {
			if (!event.target.closest(selector)) return false;
			callback(event);
		})
	}
}
