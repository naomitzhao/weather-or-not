import React from 'react'
import { Text, SafeAreaView, View, StyleSheet } from 'react-native';


const City = ({cityName}) => {
    const {text, city} = styles

    return(
            <Text style={[text, city]}>You are in: {cityName}</Text>
    )
}

const styles = StyleSheet.create({
    text:{
        fontFamily: 'MPLUSRounded1c_400Regular', 
        color: '#0058A1',
      },
    city: {
        fontSize: 24,
        marginBottom: 48,
      },
})

export default City