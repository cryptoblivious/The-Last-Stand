import './App.css'
import { useState } from 'react'
import { Todo } from './model';
import InputField from './components/InputField';
import TodoList from './components/TodoList';

const App:React.FC = () => {

  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAddTodo = (e:React.FormEvent) => {
    e.preventDefault();

    if(todo) {
      setTodos([...todos, {id: Date.now(), todo, isDone: false}])
      setTodo("");
    }
  };

  console.log(todos);

  return <div className="App">
    <span className="heading">Taskify</span>
    <InputField todo={todo} setTodo={setTodo} handleAddTodo={handleAddTodo}/>
    <TodoList todos={todos} setTodos={setTodos}/>
    </div>;
}

export default App
