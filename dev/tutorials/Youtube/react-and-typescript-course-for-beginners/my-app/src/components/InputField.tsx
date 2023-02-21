import React, { useRef } from 'react'
import './styles.css'

interface InputFieldProps {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAddTodo: (e:React.FormEvent) => void;
}

const InputField:React.FC<InputFieldProps> = ({todo, setTodo, handleAddTodo}) => {

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form className="input" onSubmit={(e) => {
      handleAddTodo(e)
      inputRef.current?.blur();
      }}>
      <input ref={inputRef} type="input" value={todo} onChange={(e) => setTodo(e.target.value)} placeholder="Add a task" className="input-box"/>
      <button className="input-submit">Add</button>
    </form>
  )
}

export default InputField