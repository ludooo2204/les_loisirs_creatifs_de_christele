import logo from './logo.svg';
import './App.css';
import react,{useState} from 'react'

function App() {
  const [msg, setMsg] = useState("")
  const handleClick= async()=> {

    const data = await fetch('/test')
    const json = await data.json()
    setMsg(json.msg)
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
       <button onClick={handleClick}>CLick me</button>
       {msg}
      </header>
    </div>
  );
}

export default App;
