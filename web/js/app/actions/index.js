let nextTodoId = 0
export const addTodo = (text) => {
  return dispatch => {
    return new Promise(resolve => {
        setTimeout(()=>{
          resolve({
                type: 'ADD_TODO',
                id: nextTodoId++,
                text
              })
        }, 2000)
    }).then(data=>{
      dispatch(data);
    });
  }
  //return {
  //  type: 'ADD_TODO',
  //  id: nextTodoId++,
  //  text
  //}
}

export const setVisibilityFilter = (filter) => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter
  }
}

export const toggleTodo = (id) => {
  return {
    type: 'TOGGLE_TODO',
    id
  }
}
