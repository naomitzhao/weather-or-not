import React from 'react'
import { Text, SafeAreaView, View, StyleSheet } from 'react-native';


const Weather = ({temp, cityName}) => {
    return(
        <SafeAreaView>
        <View style={styles.container}>
            <Text>Here is the weather component</Text>
            <Text style={styles.red}>{temp}</Text>
            <Text>{cityName}</Text>
        </View>
    </SafeAreaView>
    )
    
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    red: {
        color: 'red',
    }
  });
  

export default Weather

