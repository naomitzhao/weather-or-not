import React, {useState, useEffect} from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, ImageBackground } from 'react-native';
import Weather from './src/components/weather';
import GuessGame from './src/components/guessgame';
import { WEATHER_API_KEY } from '@env'
import {
  useFonts,
  MPLUSRounded1c_100Thin,
  MPLUSRounded1c_300Light,
  MPLUSRounded1c_400Regular,
  MPLUSRounded1c_500Medium,
  MPLUSRounded1c_700Bold,
  MPLUSRounded1c_800ExtraBold,
  MPLUSRounded1c_900Black,
} from '@expo-google-fonts/m-plus-rounded-1c';

export default function App() {
  const [temp, setTemp] = useState(0);
  const [cityName, setCityName] = useState("Unknown");
  const {text, safeArea, screenContainer, weatherContainer, title, subTitle, city, detailText, current, currentTemp, scoreContainer, scoreText, value} = styles

  async function fetchWeatherData(lat, lon){
    console.log(lat, lon);
    const API = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`;
    try{
      let response = await fetch(API);
      let data = await response.json();
      console.log(data);
      setTemp(Math.floor(data.main.temp));
      setCityName(data.name);
    }
    catch (error){
      console.error(error);
    }

  }

  let [fontsLoaded, fontError] = useFonts({
    MPLUSRounded1c_100Thin,
    MPLUSRounded1c_300Light,
    MPLUSRounded1c_400Regular,
    MPLUSRounded1c_500Medium,
    MPLUSRounded1c_700Bold,
    MPLUSRounded1c_800ExtraBold,
    MPLUSRounded1c_900Black,
  });

  
  useEffect(() => {
    fetchWeatherData(38.5449, -121.7405);
  }, []);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    
    <ImageBackground source={require('./assets/bright-clouds.jpg')} style={{flex: 1,}}>
    <SafeAreaView style={safeArea}>
    <View style={screenContainer}>
    <View style={weatherContainer}>
        <Text style={[text, title]}>Weather</Text>
        <Text style={[text, subTitle]}>or Not</Text>
        <Text style={[text, city]}><Text style={value}>Luma Land</Text></Text>
        <Text style={[text, current]}>Current Temperature</Text>
        <Text style={[text, current, currentTemp]}><Text style={value}>700° F</Text></Text>
        <Text style={[text, detailText]}>High: <Text style={value}>100° F</Text>      Low: <Text style={value}>100° F</Text></Text>
        <Text style={[text, detailText]}>Humidity: <Text style={value}>100%</Text></Text>
        <Text style={[text, detailText]}>Windspeed: <Text style={value}>100 mph</Text></Text>
      </View>
      <View style={scoreContainer}>
        <Text style={[text, scoreText]}>score</Text>
      </View>
    </View>
    </SafeAreaView>
    </ImageBackground>
    
    
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1, 
    //backgroundColor: 'orange',
  },
  text:{
    fontFamily: 'MPLUSRounded1c_400Regular', 
    color: 'darkblue',
  },
  screenContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'stretch',
    //backgroundColor: 'powderblue',
    flex: 1,
  },
  weatherContainer: {
    //backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 3,
  },
  scoreContainer: {
    //backgroundColor: 'grey',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 72,
    marginBottom: 0,
  },
  subTitle: {
    fontSize: 36,
  },
  city: {
    fontSize: 24,
    marginBottom: 48,
    
  },
  current: {
    fontSize: 24,
    marginBottom: 8,
  },
  currentTemp: {
    fontSize: 40,
    marginBottom: 48,
  },
  detailText: {
    fontSize: 24,
    marginBottom: 24,
  },
  scoreText: {
    fontSize: 20,
  },
  value: {
    color: 'red',
  },
});
