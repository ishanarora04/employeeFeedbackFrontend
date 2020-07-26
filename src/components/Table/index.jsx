import React, { Component } from "react";
import "./table.css";

export default class Table extends Component {
  constructor(props) {
    super(props);
  }

  renderHeadingRow = () => {
    const { headings } = this.props;
    const cells = [];
    for (const elem of headings) {
      cells.push(<th key={elem}>{elem}</th>);
    }
    return cells;
  };
  renderData = () => {
    const { rows } = this.props;
    const output = [];
    for (const elem of rows) {
      const cells = [];
      for (const subelem in elem) {
        cells.push(<td key={elem[subelem]}>{elem[subelem]}</td>);
      }
      output.push(<tr>{cells}</tr>);
    }
    return output;
  };

  render() {
    return (
      <div className="table card">
        <table>
          <tr>
          {this.renderHeadingRow()}
          </tr>
          <tbody>{this.renderData()}</tbody>
        </table>
      </div>
    );
  }
}
