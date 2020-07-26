import React from "react";
import './button.css';

export default class Button extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { onClick, text, ID } = this.props;

    return (
      <div>
        <button id={ID} onClick={onClick}>
          {text}
        </button>
      </div>
    );
  }
}
