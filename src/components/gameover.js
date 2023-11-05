import React, {useState, useEffect} from 'react';
import { Text, SafeAreaView, View, StyleSheet, Pressable} from 'react-native';

import {
    useFonts,
    MPLUSRounded1c_400Regular,
    MPLUSRounded1c_500Medium,
    MPLUSRounded1c_700Bold,
} from '@expo-google-fonts/m-plus-rounded-1c';

const GameOver = ({tries, closeFunction}) => {           
    const [rating, setRating] = useState("")  

    let [fontsLoaded, fontError] = useFonts({
        MPLUSRounded1c_400Regular,
        MPLUSRounded1c_500Medium,
        MPLUSRounded1c_700Bold,
      });

    const getRating = () => {
        if ({tries}<=5){
            setRating("You are truly a weather god with 100% accuracy!")
        }
        if ({tries}>5 && {tries}<20){
            setRating("Wow, you got lucky today.")
        }
        if ({tries}>=20 && {tries}<30){
            setRating("You could be better at this, haha.")
        }
        if ({tries}>=30){
            setRating("Wow, that took a long time.")
        }
    }

    useEffect(() => {
        getRating();
      }, []);

    return(
        <SafeAreaView style={styles.safeWrapper}>
            <View style={styles.messageBox}>
                <Text style={styles.message}>Wow, looks like you figured out the weather!</Text>
                <Text style={styles.message}>It took you {tries} tries in total.</Text>
                <Text style={styles.message}>{rating}</Text>
                <Pressable style={styles.pressableButton} onPress={closeFunction}><Text style={styles.text}>Close</Text></Pressable>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeWrapper: {
        position: 'absolute',
        alignSelf: 'center',
        flex: 1,
    },
    messageBox: {
        borderWidth: 4,
        borderColor: '#0058A1',
        borderRadius: 5,
        backgroundColor: 'white',
        marginTop: 250,
        padding: 50,
        alignItems: 'center',
    },
    message: {
        //marginTop: 300,
        color: '#0058A1',
        marginBottom: 4,
        fontFamily: 'MPLUSRounded1c_400Regular',
        textAlign: 'center',
    },
    text: {
        color: '#0058A1',
        fontFamily: 'MPLUSRounded1c_400Regular',
        textAlign: 'center',
    },
    pressableButton: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        shadowOpacity: 0.2,
        shadowRadius: 7,
        marginTop: 20,
        shadowColor: '#0058A1'
      },
})

export default GameOver