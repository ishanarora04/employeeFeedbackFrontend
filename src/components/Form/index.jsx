import React, { Component } from "react";
import RequestManager from "../../lib/RequestManager";

export default class EmployeeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

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
    const url = "http://localhost:3001/v1/employee";
    const entity = { name: this.state.name, email: this.state.email };
    const employee = await RequestManager.submitEntity(url, entity);
    document.getElementById("employeeForm").reset();
    this.props.updateTable();
  };

  render() {
    return (
      <div className="card">
        <form onSubmit={this.handleSubmit} id="employeeForm">
          <div className="form-row">
            <label>
              Employee Name:{" "}
              <input type="text" name="name" onChange={this.handleChange} />
            </label>
          </div>
          <div className="form-row">
            <label>
              Employee Email:{" "}
              <input type="text" name="email" onChange={this.handleChange} />
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
