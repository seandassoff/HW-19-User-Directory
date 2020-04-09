import React from "react";

function SearchForm(props) {
  return (
    <form>
      <div className="mb-5 d-flex justify-content-start align-items-end">
        <div className="w-100">
          <label htmlFor="search">Search:</label>
          <input
            onChange={props.handleInputChange}
            value={props.search}
            name="search"
            type="text"
            className="form-control"
            placeholder="Search for an Employee"
            id="search"
          />
        </div>
        <button
          onClick={props.handleFormSubmit}
          type="button"
          className="btn btn-primary "
        >
          Search
        </button>
      </div>
    </form>
  );
}

export default SearchForm;
