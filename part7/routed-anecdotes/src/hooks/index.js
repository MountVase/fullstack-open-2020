import React, { useState } from 'react'


export const useField = (type) => {
    const [value, setValue] = useState('')


    const onChange = (event) => {
        setValue(event.target.value)
    }

    // returns an object with all required fields for <input />

    return {
        type,
        value,
        onChange
    }
}