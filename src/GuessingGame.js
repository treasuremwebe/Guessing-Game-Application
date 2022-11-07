import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './GuessingGame.css'

function GuessingGame() {
  const [guesses, setGuesses] = useState("");
  const [message, setMessage] = useState("Start Guessing");
  const [luckyNum, setLuckyNum] = useState(null);
  const [currentGuess, setCurrentGuess] = useState(null);

  useEffect(() => {
    if (luckyNum === null) {
      setLuckyNum(
        JSON.parse(localStorage.getItem('lucky number')) || LuckyNumber()
      )
    }

    if (currentGuess === null) {
      setCurrentGuess(
        JSON.parse(localStorage.getItem('guesses')) || 0
      )
    }

  }, []);

  function LuckyNumber() {
    const generateLuckyNum = Math.floor(Math.random() * 100);
    localStorage.setItem('lucky number', JSON.stringify(generateLuckyNum));
    return generateLuckyNum;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const parsedNum = parseInt(guesses);

    if (parsedNum === luckyNum) {
      setMessage("You Guessed it! Good Job")
    } else if (parsedNum > luckyNum) {
      setMessage("Number is too high")
    } else {
      setMessage("Number is too low")
    }

    setCurrentGuess(currentGuess + 1);
    localStorage.setItem('guesses', JSON.stringify(currentGuess + 1));
  }

  function handleChange(e) {
    if (!isNaN(e.target.value)) {
      setGuesses(e.target.value);
    } else {
      alert("Type a number");
    }
  }

  function handleReset() {
    setGuesses("");
    setMessage("Start Guessing");
    setCurrentGuess(0);
    setLuckyNum(LuckyNumber());
    localStorage.removeItem('guesses')

  }


  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>
            I am thinking of a number between 1 and 100. Guess the Lucky Number!
          </Form.Label>
          <br />
          <Form.Label>
            You have made {currentGuess} guesses
          </Form.Label>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control type="text" value={guesses} name="guesses" onChange={handleChange} />
          <Form.Text className="text-muted">
            What's the lucky number?
          </Form.Text>
        </Form.Group>
      

      <Button className="Button" type="submit" >
        Guess
      </Button>
      <br />

      <Button className="Button" type="reset" onClick={handleReset} >Reset</Button>
      <br />

      <Form.Label>{message}</Form.Label>

     </Form>

    </>
  )

}

export default GuessingGame 