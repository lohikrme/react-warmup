import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [repositories, setRepositories] = useState([])
  const [keyWord, setKeyWord] = useState("discord")
  const [searchWord, setSearchWord] = useState("discord")

  const clickSearch = () => {
    setSearchWord(keyWord)
  }

  useEffect( () => {
    fetch(`https://api.github.com/search/repositories?q=${searchWord}`)
    .then(response => response.json())
    .then(data => {
      console.log(Array.isArray(data.items))
      console.log(data.items.length)
      setRepositories(data.items)
      console.log(repositories.length)
    })
    .catch(error => console.error(error))
  }, [searchWord]) // updates table when searchWord updates during search click

  if (repositories.length > 0) {
    return (
      <>
      <h1>GitHub Repositories</h1>
      <input id='keyword_input' placeholder='discord' 
        onChange={(event) => setKeyWord(event.target.value)}></input>
      <button id='search_button' onClick={clickSearch}>Search</button>
      
        <table>
            <tr>
              <th>Repository</th>
              <th>Web Address</th>
            </tr>
          
            {
              repositories.map((repo)=> {
                //{console.log(repo.owner.url)}
                return (
                <tr key={repo.id}>
                  <td>{repo.full_name}</td>
                  <td><a href={repo.owner.html_url}>{repo.owner.html_url}</a></td>
                </tr>
                )
              })
            }
          
        </table>
      </>
    )  
  }

  else {
    return (
      <>
        <h1>GitHub Repositories</h1>
        <input id='keyword_input' placeholder='discord' 
          onChange={(event) => setKeyWord(event.target.value)}></input>
        <button id='search_button' onClick={clickSearch}>Search</button>
        <br></br>
        <p>No repositories with the keyword {keyWord} were found</p>
      </>
    )
  }
}

export default App
