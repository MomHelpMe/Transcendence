import { Component } from "../core/Component.js";

export class AddCal extends Component {

  initState () {
    return {
      a: 0,
      b: 0,
    }
  }

  template () {
    const { state } = this;
    return `
      <input id="stateA" value="${state.a}" size="5" />
      <input id="stateB" value="${state.b}" size="5" />
      <p>a + b = ${state.a + state.b}</p>
    `;
  }

  setEvent () {
    const { state } = this;
    
    this.addEvent('change', '#stateA', ({ target }) => {
      state.a = Number(target.value);
    });

    this.addEvent('change', '#stateB', ({ target }) => {
      state.b = Number(target.value);
    });
  }
}