import React, { Component } from "react";
import RequestManager from "../../lib/RequestManager";

export default class Feedback extends React.Component {
  constructor(props) {
    super(props);
    this.state = { employees: [] };
  }

  componentDidMount() {
    this.fetchEmployeesToAssign();
  }

  fetchEmployeesToAssign = () => {
    const apiUrl = "http://localhost:3001/v1/fetchEmployeesToAssign?emp_id=5f1d6c1321c54464a647fbc8";
    fetch(apiUrl)
      .then((response) => response.json())
      .then((response) =>
        this.setState({
          employees: response.data,
          name: response.data.length > 0 ? response.data[0]._id : undefined,
        })
      );
  };

  handleChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const url = "http://localhost:3001/v1/feedback";
    const entity = {
      from: "5f1d6c1321c54464a647fbc8",
      to: this.state.name,
      feedback: this.state.feedback,
    };
    const employee = await RequestManager.submitEntity(url, entity);
    document.getElementById("feedbackForm").reset();
    this.fetchEmployeesToAssign();
  };

  render() {
    const generateDropDownOptions = [];

    for (const elem of this.state.employees) {
      generateDropDownOptions.push(
        <option value={elem._id}>{elem.email}</option>
      );
    }
    return (
      <div className="card">
        <tr style={{ textAlign: "right" }}>
          <a href="/app">App</a>
        </tr>
        <form onSubmit={this.handleSubmit} id="feedbackForm">
          <div className="">
            <label>Employee List:</label>
            <select name="name" onChange={this.handleChange}>
              {generateDropDownOptions}
            </select>
          </div>
          <div className="form-row">
            <label>
              Feedback:{" "}
              <textarea
                type="text"
                rows="10"
                cols="30"
                name="feedback"
                onChange={this.handleChange}
              />
            </label>
          </div>
          <div>
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    );
  }
}
