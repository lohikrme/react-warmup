import { useState } from 'react'
import './App.css'
import he from 'he'

function App() {
  const [puzzle, setPuzzle] = useState(
    { question: "How many legs 'Sleipnir', the horse of viking god Odin has?",
      correct_answer: 8,
      incorrect_answers: [4, 6, 10]
    })
  const [difficulty, setDifficulty] = useState("easy")
  const [category, setCategory] = useState("General")
  const [userAnswer, setUserAnswer] = useState()


  // replace category name with a suitable api call
  const categoryIntoApiCode = (categoryName) => {
    switch(categoryName) {
      case "General":
        return ""
      case "Science":
        return "&category=17"
      case "Mathematics":
        return "&category=19"
      case "Mythology":
        return "&category=20"
      case "History":
        return "&category=23"
      case "Animals":
        return "&category=27"
    }
  }

  // change color of difficulty selection element automatically
  const getColorDifficulty = (level) => {
    if (level == "easy") {
      return "lightgreen"
    }
    else if (level == "medium") {
      return "orange"
    }
    else if (level == "hard") {
      return "#F8607F"
    }
  }

  /* Randomize array in-place using Durstenfeld shuffle algorithm */
  function shuffleArray(array) {
    let newArray = [...array]
    for (let i = newArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = newArray[i];
        newArray[i] = newArray[j];
        newArray[j] = temp;
    }
    return newArray
  }

  // use this to combine correct_answer string and false_answers array and mix
  // updates also the "overrideUserAnswer" used to check if answer is correct
  const shuffleAnswers = (correct_answer, uncorrect_answers) => {
    let shuffled_answers = [correct_answer, ...uncorrect_answers]
    shuffled_answers = shuffleArray(shuffled_answers)
    return shuffled_answers
  }

  // when user wants a new puzzle, update puzzle state content
  const getNewPuzzle = () => {
    let categoryCode = categoryIntoApiCode(category)
    let querySentence = `https://opentdb.com/api.php?amount=1&category=20&difficulty=easy`
    if (category !== "General") {
      querySentence += categoryCode
    }
    querySentence += `&difficulty=${difficulty}`

    fetch(querySentence)
    .then(res => res.json())
    .then(data => {
      setPuzzle(data.results[0])
      console.log(puzzle)
    })
    .catch(error => console.error(error))
  }

  

  return (
    <>
    <h1>Trivia Game!</h1>
    <img id="sleipnir_image" src="https://upload.wikimedia.org/wikipedia/commons/5/51/Ardre_Odin_Sleipnir.jpg"></img>
    <img id="sun_image" src="https://static.vecteezy.com/system/resources/previews/024/102/262/original/cute-sun-with-face-funny-smiling-sun-in-flat-design-childish-sunshine-emoji-simple-kawaii-sun-with-sunbeams-baby-sunshine-clipart-vector.jpg"></img>
    <div>
      <h3>Question:</h3>
      <p id="puzzle_question">{he.decode(puzzle.question)}</p>
      <label>Answer: </label>
      <select id="user_answer" name="user-answer" size="1"
        defaultValue=""
        onChange={(event) => setUserAnswer(event.target.value)}>
        {shuffleAnswers(puzzle.correct_answer, puzzle.incorrect_answers).map((answer, index) => {
          return <option>{answer}</option>
        })
        }
      </select>
      <button id="check_button">Check!</button>
    </div>
    
    <h3>Generate a new question:</h3>
    <div className='newQuestion'>
      <select id="category_selection" name="category-selection" size="1"
        onChange={(event) => setCategory(event.target.value)}>
        <option>General</option>
        <option>Science</option>
        <option>Mathematics</option>
        <option>Mythology</option>
        <option>History</option>
        <option>Animals</option>
      </select>
      <select id="difficulty_selection" name="difficulty-selection" size="1"
        onChange={(event) => setDifficulty(event.target.value.toLowerCase())}
        style={{ backgroundColor: getColorDifficulty(difficulty)}}>
        <option>Easy</option>
        <option>Medium</option>
        <option>Hard</option>
      </select>
      <button id="new_question_button" onClick={getNewPuzzle}>New Question!</button>
    </div>
    </>
  )
}

export default App
