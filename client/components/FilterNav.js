import React from 'react';

export const FilterNav = props => {
  return (
    <div>
      <label htmlFor="filter">Filter by Category: </label>
      <input
        type="text"
        id="filter"
        value="category"
        // onChange={this.handleChange}
      />
      <input
        type="text"
        id="filter"
        value="description"
        // onChange={this.handleChange}
      />
      <input
        type="text"
        id="filter"
        value="price"
        // onChange={this.handleChange}
      />
      <input
        type="text"
        id="filter"
        value="color"
        // onChange={this.handleChange}
      />
    </div>
  );
};
