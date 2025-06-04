import darthParrotImage from '../../src/images/darth_parrot.png'
import './styles/Home.css'

function Home() {
  return(
    <div className='home-container'>
      <h1>How to become a sith?</h1>
      <p>If you want to become apprentice of Darth Parrot, complete all missions and then send email to:</p>
      <p><a href="mailto:darth.parrot@gmail.com">darth.parrot@gmail.com</a></p>
      <img src={darthParrotImage}></img>
    </div>
  )
}

export default Home;