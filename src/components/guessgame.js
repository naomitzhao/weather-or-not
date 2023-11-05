import React, {useState} from 'react';
import { Text, SafeAreaView, View, StyleSheet } from 'react-native';
import { VirtualKeyboard } from 'react-native-screen-keyboard';
import {
    useFonts,
    MPLUSRounded1c_400Regular,
    MPLUSRounded1c_500Medium,
    MPLUSRounded1c_700Bold,
  } from '@expo-google-fonts/m-plus-rounded-1c';

const GuessGame = ({type, value, unit, correctGuess}) => {
    const [isFirstGuess, setIsFirstGuess] = useState(true);
    const [guess, setGuess] = useState(0);
    const [prevGuess, setPrevGuess] = useState(0);
    const [hint, setHint] = useState("higher");
    const [tries, setTries] = useState(0);
    const {text, keyboardWrapper, instruction, gameWrapper} = styles

    let [fontsLoaded, fontError] = useFonts({
        MPLUSRounded1c_400Regular,
        MPLUSRounded1c_500Medium,
        MPLUSRounded1c_700Bold,
      });

    return(
    <SafeAreaView style={gameWrapper}>
    
    <View style={keyboardWrapper}>
    <View>
        {isFirstGuess && <Text style={[text, instruction]}>Guess the {type} in {unit}</Text>}
        {!isFirstGuess && <Text style={[text, instruction]}>The {type} is {hint} than {prevGuess}{unit}!</Text>}
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
        style={styles.keyboard}
    />
    {guess != 0 ? <Text style={[text, instruction]}>{guess}</Text> : <Text style={[text, instruction]}> </Text>}
    </View>
    </SafeAreaView>)
}

const styles = StyleSheet.create({
    gameWrapper: {
        position: 'absolute',
        alignSelf: 'center',
    },
    keyboardWrapper: {
        position: 'absolute',
        alignSelf: 'center',
        marginTop: 120,
    },
    instruction: {
        backgroundColor: 'white',
        padding: 20,
        margin: 8,
    },
    text:{
        fontFamily: 'MPLUSRounded1c_400Regular', 
        color: '#0058A1',
      },
});
  

export default GuessGame

