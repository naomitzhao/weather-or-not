import React, {useState} from 'react'
import { Text, SafeAreaView, View, StyleSheet } from 'react-native';
import { VirtualKeyboard } from 'react-native-screen-keyboard';

const GuessGame = ({temp}) => {
    const [guess, setGuess] = useState(0);
    const [prevGuess, setPrevGuess] = useState(0);
    const [hint, setHint] = useState("lower");
    const [correct, setCorrect] = useState(false);

    return(<>
    <View>
        {!correct && <Text>The temperature is {hint} than {prevGuess}.</Text>}
        {correct && <Text>{prevGuess} is the correct temperature.</Text>}
        {guess != 0 && <Text>{guess}</Text>}
    </View>
    <VirtualKeyboard 
        vibration={true}
        // onPressFunction={"onPress"}
        onKeyDown={(e) => {
            if (typeof e === 'number') {
                setGuess(guess * 10 + e);
            } else if (e === "custom") {
                setGuess(Math.floor(guess / 10));
            } else {
                setCorrect(temp == guess);
                setHint(temp < guess ? "lower" : "higher");
                setPrevGuess(guess);
                setGuess(0);
            }
        }}
    />
    </>)
}

const styles = StyleSheet.create({
    
});
  

export default GuessGame

