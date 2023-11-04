import React, {useState, useEffect} from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Weather from './src/components/weather';
import { WEATHER_API_KEY } from '@env'



export default function App() {
  const [weatherData, setWeatherData] = useState([]);
  const [temp, setTemp] = useState([]);
  const [cityName, setCityName] = useState([]);

  async function fetchWeatherData(lat, lon){
    console.log(lat, lon);
    const API = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`;
    const response = await fetch(API)
    if (response.status == 200){
      console.log("got data")
      const data = await response.json();
      //console.log(data)
      setWeatherData(data)
      console.log(weatherData)
      setTemp(weatherData.main.temp)
      console.log(weatherData.main.temp)
      setCityName(weatherData.name)
    }
    else{
      console.log("something went wrong")
    }
  }
  
  useEffect(() => {
    fetchWeatherData(37.78, -122.42);
  }, []);

  return (
    <View style={styles.container}>
      <Weather temp={temp} cityName={cityName}/>
      {/* <Text>{weatherData.main.temp}</Text> */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
