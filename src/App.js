import React from "react";
import "./App.css";
import Table from "./components/Table";
import Button from "./components/Button";
import RequestManager from "./lib/RequestManager";
import EmployeeForm from "./components/Form";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      employees: [],
    };
    this.updateTable = this.updateTable.bind(this);
  }

  componentDidMount = () => {
    this.fetchEmployees();
  };

  fetchEmployees = () => {
    const apiUrl = "https://tranquil-taiga-11364.herokuapp.com/v1/fetchEmployees";
    fetch(apiUrl)
      .then((response) => response.json())
      .then((response) =>
        this.setState({
          employees: response.data,
        })
      );
  };

  delete = async (elem) => {
    const url = `https://tranquil-taiga-11364.herokuapp.com/v1/employee`;
    const data = { _id: elem };
    let output = await RequestManager.deleteEntity(url, data);
    if (output.status === 200) {
      this.setState({ employees: [] });
    }
    this.fetchEmployees();
  };
  updateTable() {
    console.log("called props");
    this.fetchEmployees();
  }

  render() {
    const headings = ["Name", "Email", "Feedback", "Delete"];

    const rows = [];

    for (const elem of this.state.employees) {
      const row = {};
      row["name"] = elem["name"];
      row["email"] = elem["email"];
      row["update"] = elem["feedback"];
      row["delete"] = (
        <Button
          onClick={() => this.delete(elem["_id"])}
          text="Delete"
          ID={elem["_id"]}
        />
      );
      rows.push(row);
    }
    return (
      <div className="App">
        <table>
          <tr style={{ textAlign: "right" }}>
            <a href="/feedback">Feedback</a>
          </tr>
          <tr>
            <Table headings={headings} rows={rows} />
          </tr>
          <tr></tr>
          <tr>
            <EmployeeForm updateTable={this.updateTable} />
          </tr>
        </table>
      </div>
    );
  }
}

export default App;
