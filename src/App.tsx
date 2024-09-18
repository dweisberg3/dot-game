import React, { useState, useEffect } from "react";
import { Box, Button, Typography, TextField } from "@mui/material";

// Define Dot type
interface Dot {
  top: string;
  left: string;
}

const DotGuessingGame: React.FC = () => {
  const [dots, setDots] = useState<Dot[]>([]);
  const [numDots, setNumDots] = useState<number>(0);
  const [guess, setGuess] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [timeLeft, setTimeLeft] = useState<number>(7);
  const [isGameRunning, setIsGameRunning] = useState<boolean>(false);

  useEffect(() => {
    if (isGameRunning) {
      startGame();
    }
  }, [isGameRunning]);

  useEffect(() => {
    if (timeLeft > 0 && isGameRunning) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && isGameRunning) {
      checkGuess();
    }
  }, [timeLeft, isGameRunning]);

  const startGame = () => {
    const randomNumDots = Math.floor(Math.random() * 20) + 1;
    const generatedDots: Dot[] = Array.from({ length: randomNumDots }, () => ({
      top: Math.random() * 90 + "%",
      left: Math.random() * 90 + "%",
    }));

    setDots(generatedDots);
    setNumDots(randomNumDots);
    setTimeLeft(7);
    setMessage("");
    setGuess("");
  };

  const checkGuess = () => {
    if (parseInt(guess) === numDots) {
      setMessage("Correct!");
    } else {
      setMessage(`Incorrect! The correct number was ${numDots}`);
    }
    // Reset for the next round
    setTimeout(startGame, 1000);
  };

  const handleEndGame = () => {
    setIsGameRunning(false);
    setMessage("Game Over!"); // Show a final message when the game ends
  };

  const handleStartGame = () => {
    setIsGameRunning(true)
  }

  return (
    <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center", // Horizontally centers the content
      justifyContent: "center", // Vertically centers the content
      height: "100vh", // Full viewport height for centering
      width: "100vw",  // Ensure full viewport width
      textAlign: "center", // Center text within the box
    }}
    >
      {/* Time left text */}
      {isGameRunning && (
          <Typography variant="h6" sx={{ marginBottom: "10px" }}>
          Time left: {timeLeft}s
        </Typography>
      )}
    

      {/* Game Box */}
      <Box
        sx={{
          width: 300,
          height: 300,
          border: "2px solid black",
          position: "relative",
          marginBottom: "20px",
        }}
      >
        {dots.map((dot, index) => (
          <Box
            key={index}
            sx={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: "red",
              position: "absolute",
              top: dot.top,
              left: dot.left,
            }}
          ></Box>
        ))}
      </Box>

      {/* Guess input */}
      <TextField
        label="Guess the number of dots"
        variant="outlined"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            checkGuess();
          }
        }}
        sx={{ marginBottom: "10px", width: "100px" }}
      />

      {/* Submit Guess button */}
      {!isGameRunning && (
            <Button
            variant="outlined"
            color="secondary"
            onClick={handleStartGame}
            sx={{ marginBottom: "10px" }}
          >
            Start Game
            </Button>)
          }
    
     
      {isGameRunning && (
        <>
       <Button
       variant="contained"
       color="primary"
       onClick={checkGuess}
       sx={{ marginBottom: "10px" }}
     >
       Submit Guess
     </Button>

      <Button
        variant="outlined"
        color="secondary"
        onClick={handleEndGame}
        sx={{ marginBottom: "10px" }}
      >
        End Game
      </Button></> )}
  

      {/* Result message */}
      {message && (
        <Typography variant="h6" sx={{ marginTop: "20px" }}>
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default DotGuessingGame;
