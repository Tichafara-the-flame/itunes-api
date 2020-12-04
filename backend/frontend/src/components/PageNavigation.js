import React from "react";

export default props => {
  const {
    pageLoad,
    displayPrevious,
    showNextLink,
    handlePrevClick,
    handleNextClick
  } = props;
  return (
    <div className="nav-link-container">
      {/* anchor tag for previous page*/}
      <a
        href="/"
        className={`nav-link ${displayPrevious ? "show" : "hide"} 
          ${pageLoad ? "greyed-out" : ""}`}
        onClick={handlePrevClick}
      >
        Prev
      </a>
      {/* anchor tag for next page*/}
      <a
        href="/"
        className={`nav-link ${showNextLink ? "show" : "hide"}
          ${pageLoad ? "greyed-out" : ""}`}
        onClick={handleNextClick}
      >
        Next
      </a>
    </div>
  );
};
