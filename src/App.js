import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => { setRepos(response.data); console.log(response); });

  }, [])


  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: 'é isso aq mesmo',
      url: 'https://url.com/exemplo',
      techs: 'VueJS, ReactJS, Node.js',
    })

    setRepos([...repos, response.data]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);

    if (response.status === 204)
      setRepos(repos.filter(repo => repo.id !== id))

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repos.map(r =>
          <li key={r.id}>
            <span>{r.title}</span>

            <button onClick={() => handleRemoveRepository(r.id)}>
              Remover
          </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
