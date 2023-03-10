import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Input from './components/Input'

const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  console.log(event.target.value)
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
     <Input placeHolder='Entrez votre nom' onChange={onChange}/>
    </div>
  )
}


export default App
