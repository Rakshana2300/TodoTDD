import axios from 'axios';

export const postTodo = (todo) => {
    console.log(todo);
    axios.post('http://localhost:3000/todos',todo)
}