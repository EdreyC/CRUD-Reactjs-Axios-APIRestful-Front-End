import { useEffect, useState } from 'react'
import axios from 'axios'

type Categorys = {
  name: string,
  description: string,
  created_at: Date
}

function App() {
  const [data, setData] = useState<Categorys[]>([])
  const [inputName, setinputName] = useState("")
  const [inputDescription, setinputDescription] = useState("")

  const url="http://localhost:3002/categories"
  
  async function get(){
    axios.get(url)
    .then(res => {
      setData(res.data)
      console.log(data)
    })
  }

  async function create() {
    await axios.post(url,{
      name:inputName,
      description:inputDescription
    })
    get();
  }
  useEffect(() => {
   get();
  }, []);
  
  return (
    <div className="App">
      <input 
      value={inputName}
      onChange={(event)=>{
        setinputName(event.target.value);
      }}
      />
      <input 
      value={inputDescription}
      onChange={(event)=>{
        setinputDescription(event.target.value);
      }}
      />
      <button
      onClick={create}
      >
        Enviar
      </button>
      <ul>
        {
          data.map(item => {
            return (
              <>
              <li>{item.name}<br />
                <span>{item.description}</span><br />
                <span>{item.created_at}</span>
              </li>
              
              </>
            )
          })
        }
      </ul>
    </div>
  )
}

export default App
