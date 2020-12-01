
export const setFilter = filter => {
    return {
        type: 'FILTER',
        filterText: filter
    }
}

const filterReducer = (state = '', action) => {
    switch (action.type) {
        case 'FILTER': {
            return action.filterText
        }

        default: return state
    }
}

export default filterReducer
