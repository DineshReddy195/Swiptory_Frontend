import React from "react";
import  "./FilterSection.css";
import filters from "../../constants/data";

const FilterSection = (props) => {
  return (
    <div className='filterContainer'>
      {filters.map((filter, index) => {
        return (
          <div
            key={index}
            onClick={() => props.handleSelectFilters(filter.name)}
            style={{
              border: props.selectedFilters.includes(filter.name) 
                ? "5px solid var(--secondary-color)"
                : "5px solid transparent",
            }}
            className='filterWrapper'
          >
            <div
              style={{
                backgroundImage: `url(${filter.imageUrl})`,
              }}
              className='filterBox'
            ></div>
            <div className='filterName'>{filter.name}</div>
          </div>
        );
      })}
    </div>
  );
};

export default FilterSection;