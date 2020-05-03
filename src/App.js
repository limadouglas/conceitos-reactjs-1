import React, {useState, useEffect} from "react";
import api from './services/api'

import "./styles.css";


function App() {

  const [repositories, setRepository] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepository(response.data);
    })
  }, [])

  async function handleAddRepository() {
    const repositoryDefault = { 
      "title": `Desafio ${Date.now()}`, 
      "url": "http://github.com/...", 
      "techs": ["Node.js", "ReactJS"]
    }
    api.post('repositories', repositoryDefault).then(response =>{
      setRepository([...repositories, response.data])
    })
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`).then(_=>{
      const newRepositories = repositories.filter(repository=>repository.id !== id)
      setRepository(newRepositories);
    })
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(repository => {
            return <li key={repository.id}>
              <h3>{repository.title}</h3>       
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          })
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
