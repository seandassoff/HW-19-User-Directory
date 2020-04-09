import React, { Component } from "react";
import SearchForm from "./SearchForm";
import EmployeeCard from "./EmployeeCard";
import API from "../utils/API";
import "../styles/Result.css";
const MaxResults = 20;

class SearchResultContainer extends Component {
  state = {
    result: [],
    filter: [],
    sortBy: { column: "firstName", isAsc: true },
    searchInput: "",
  };
  componentDidMount() {
    API.search()
      .then((res) => {
        const result = res.data.results.map((e, i) => ({
          firstName: e.name.first,
          lastName: e.name.last,
          picture: e.picture.large,
          email: e.email,
          phone: e.phone,
          dob: e.age,
          key: i,
        }));

        this.setState({
          result,
          filter: result,
        });
      })
      .catch((err) => console.log(err));
  }
  handleInputChange = (e) =>
    this.setState({ searchInput: e.currentTarget.value });
  handleSubmit = (e) => {
    const { searchInput, result } = this.state;
    let temp = searchInput
      ? result.filter(
          (d) =>
            String(d.firstName).includes(searchInput) ||
            String(d.lastName).includes(searchInput) ||
            String(d.email).includes(searchInput) ||
            String(d.phone).includes(searchInput)
        )
      : result;
    this.setState({ filter: temp, searchInput: "" });
  };
  handleSort = (col) => {
    const { sortBy } = this.state;
    let temp = JSON.parse(JSON.stringify(sortBy));
    if (col === sortBy.column) temp.isAsc = !sortBy.isAsc;
    else {
      temp.column = col;
      temp.isAsc = false;
    }
    this.setState({ sortBy: temp });
  };
  render() {
    const { filter, sortBy, searchInput } = this.state;
    console.log("SearchResultContainer -> render -> sortBy", sortBy);
    const data = filter.sort((a, b) => {
      if (a[sortBy.column] > b[sortBy.column]) {
        return sortBy.isAsc ? 1 : -1;
      }
      if (a[sortBy.column] < b[sortBy.column]) {
        return sortBy.isAsc ? -1 : 1;
      }
    });
    console.log("SearchResultContainer -> render -> data", data);
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h2>Employee Directory</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <SearchForm
              value={searchInput}
              handleInputChange={this.handleInputChange}
              handleFormSubmit={this.handleSubmit}
            />
          </div>
        </div>

        <div className="row">
          {/* <div > */}
          <table className="table">
            <tr>
              <th scope="col">Photo</th>
              <th onClick={(e) => this.handleSort("firstName")}>
                First Name{" "}
                <i
                  class={`fas fa-caret-${
                    sortBy.column === "firstName" &&
                    (sortBy.isAsc ? "down" : "up")
                  }`}
                ></i>
              </th>
              <th scope="col" onClick={(e) => this.handleSort("lastName")}>
                Last Name{" "}
                <i
                  class={`fas fa-caret-${
                    sortBy.column === "lastName" &&
                    (sortBy.isAsc ? "down" : "up")
                  }`}
                ></i>
              </th>
              <th scope="col" onClick={(e) => this.handleSort("email")}>
                Email{" "}
                <i
                  class={`fas fa-caret-${
                    sortBy.column === "email" && (sortBy.isAsc ? "down" : "up")
                  }`}
                ></i>
              </th>
              <th scope="col" onClick={(e) => this.handleSort("phone")}>
                Phone{" "}
                <i
                  class={`fas fa-caret-${
                    sortBy.column === "phone" && (sortBy.isAsc ? "down" : "up")
                  }`}
                ></i>
              </th>
            </tr>

            {data.map((item) => (
              <EmployeeCard
                picture={item.picture}
                firstName={item.firstName}
                lastName={item.lastName}
                email={item.email}
                phone={item.phone}
                key={item.key}
              />
            ))}
          </table>
        </div>
      </div>
    );
  }
}

export default SearchResultContainer;
