import { List, Map } from 'immutable';

// const todo = (state, action) => {
//   switch (action.type) {
//     case 'ADD_TODO':
//       return {
//         id: action.id,
//         text: action.text,
//         completed: false
//       }
//     case 'TOGGLE_TODO':
//       if (state.id !== action.id) {
//         return state
//       }

//       return Object.assign({}, state, {
//         completed: !state.completed
//       })
//     default:
//       return state
//   }
// }

const todos = (state = List(), action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return state.push(Map({
          id: action.id,
          text: action.text,
          completed: false
      }));
    case 'TOGGLE_TODO':
      return state.map(todo => {
        if (todo.get('id') === action.id) {
          return todo.update('completed', v => !v);
        }
        return todo;
      });
    default:
      return state
  }
}

export default todos
