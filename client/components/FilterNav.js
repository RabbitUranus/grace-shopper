import React from 'react';

export const FilterNav = props => {
  return (
    <div>
      <label htmlFor="filter">
        Filter by category:
        <input
          type="text"
          id="category"
          value="category"
          // onChange={this.handleChange}
        />
      </label>

      <label htmlFor="price">
        Filter by price:
        <input
          type="text"
          id="price"
          value="price"
          // onChange={this.handleChange}
        />
      </label>

      <label htmlFor="color">
        Filter by color:
        <input
          type="text"
          id="color"
          value="color"
          // onChange={this.handleChange}
        />
      </label>
    </div>
  );
};
