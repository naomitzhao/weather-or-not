import React, {useState, useEffect} from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, ImageBackground } from 'react-native';
import Weather from './src/components/weather';
import GuessGame from './src/components/guessgame';
import City from './src/components/city';
import * as Location from 'expo-location'

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
  const [lat, setLat] = useState([])
  const [lon, setLon] = useState([])
  const [high, setHigh] = useState(99)
  const [low, setLow] = useState(-99)
  const [humidity, setHumidity] = useState(-1)
  const [windspeed, setWindspeed] = useState(-1)
  const {text, safeArea, screenContainer, weatherContainer, title, subTitle, city, detailText, current, currentTemp, scoreContainer, scoreText, value} = styles

  async function fetchWeatherData(lat, lon){
    console.log(lat,lon)
    //const API = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`;
    const API = `http://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${lat},${lon}&days=1`;
    
    try{
      let response = await fetch(API);
      let data = await response.json();
      console.log(data)
      setTemp(Math.floor(data.current.temp_f));
      setCityName(data.location.name);
      setHigh(data.forecast.forecastday[0].day.maxtemp_f);
      setLow(data.forecast.forecastday[0].day.mintemp_f);
      setHumidity(data.current.humidity)
      setWindspeed(data.current.wind_mph)
    }
    catch (error){
      console.error(error);
    }
  }

  async function fetchData(){
    await Location.requestForegroundPermissionsAsync()
    let {status} = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }
    let location = await Location.getCurrentPositionAsync({})
    console.log(location)
    setLat(location.coords.latitude)
    setLon(location.coords.longitude)
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
    fetchData()
    fetchWeatherData(lat, lon);
  }, [lat, lon]);

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
        {/* <Text style={[text, city]}><Text style={value}>Luma Land</Text></Text> */}
        <City cityName={cityName}></City>
        <Text style={[text, current]}>Current Temperature</Text>
        <Text style={[text, current, currentTemp]}><Text style={value}>{temp}° F</Text></Text>
        <Text style={[text, detailText]}>High: <Text style={value}>{high}° F</Text>      Low: <Text style={value}>{low}° F</Text></Text>
        <Text style={[text, detailText]}>Humidity: <Text style={value}>{humidity}%</Text></Text>
        <Text style={[text, detailText]}>Windspeed: <Text style={value}>{windspeed} mph</Text></Text>
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
