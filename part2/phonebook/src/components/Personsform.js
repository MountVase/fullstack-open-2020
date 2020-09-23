import React from 'react'

function Personsform({addPers,newName,handleNewName, newPhone, handleNewPhone}) {
    return (
        <div>
            <form onSubmit={addPers}>
                <div>
                    name:  <input value={newName} onChange={handleNewName}></input>
                </div>
                <div> 
                   number: <input value={newPhone} onChange={handleNewPhone}></input>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
}

//Html is sensitive, watch out for spaces inbetween tags...
export default Personsform