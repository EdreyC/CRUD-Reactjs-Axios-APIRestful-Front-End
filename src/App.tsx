import { useEffect, useState } from 'react'
import axios from 'axios'
import AiOutlineDelete from 'react-icons/ai'
import "../src/styles/home.scss"


type Categorys = {
  name: string,
  description: string,
  created_at: Date
}

function App() {
  const [data, setData] = useState<Categorys[]>([])
  const [inputName, setinputName] = useState("")
  const [inputDescription, setinputDescription] = useState("")

  const url = "http://localhost:3002/categories"

  async function get() {
    await axios.get(url)
      .then(res => {
        setData(res.data)
        console.log(data)
      })
  }

  async function create() {
    await axios.post(url, {
      name: inputName,
      description: inputDescription
    })
    get();
  }

 
  useEffect(() => {
    get();
  }, []);

  return (

    <div className="App">

      <div className='created-category'>
          <input
            value={inputName}
            onChange={
              (event) => {
                setinputName(event.target.value)
                console.log(inputName);
              }
            }
          />
          <textarea
            value={inputDescription}
            onChange={(event) => {
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
              <div>
                <h4>{item.name}</h4>
                <p>{item.description}</p>
              </div>
            )
          })
        }
      </ul>
      </div>
      
     
    </div>
  )
}

export default App
