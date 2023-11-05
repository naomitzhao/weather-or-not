import React, {useState} from 'react'
import { Text, SafeAreaView, View, StyleSheet } from 'react-native';
import { VirtualKeyboard } from 'react-native-screen-keyboard';

const GuessGame = ({type, value, unit, correctGuess}) => {
    const [isFirstGuess, setIsFirstGuess] = useState(true);
    const [guess, setGuess] = useState(0);
    const [prevGuess, setPrevGuess] = useState(0);
    const [hint, setHint] = useState("higher");
    const [tries, setTries] = useState(0);

    return(<>
    <View>
        {isFirstGuess && <Text>Guess the {type} in {unit}</Text>}
        {!isFirstGuess && <Text>The {type} is {hint} than {prevGuess}{unit}.</Text>}
        {guess != 0 ? <Text>{guess}</Text> : <Text> </Text>}
    </View>
    <VirtualKeyboard 
        vibration={true}
        // onPressFunction={"onPress"}
        onKeyDown={(key) => {
            if (typeof key === 'number') {
                setGuess(guess * 10 + key);
            } else if (key === "custom") {
                setGuess(Math.floor(guess / 10));
            } else {
                if (guess == value) {
                    correctGuess(tries + 1);
                    setTries(0);
                    setIsFirstGuess(true);
                } else {
                    setTries(tries + 1);
                    setHint(value < guess ? "lower" : "higher");
                    setIsFirstGuess(false);
                    setPrevGuess(guess);
                }
                setGuess(0);  
            }
        }}
    />
    </>)
}

const styles = StyleSheet.create({
    
});
  

export default GuessGame

