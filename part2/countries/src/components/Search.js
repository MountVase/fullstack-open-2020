
import React from "react";

function Search({search, handleSearch}) {
  return (
    <div>
      find countries <input value={search} onChange={handleSearch}/>
    </div>
  )
}

export default Search