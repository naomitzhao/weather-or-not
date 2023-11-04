import React, {useState, useEffect} from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Weather from './src/components/weather';
import { WEATHER_API_KEY } from '@env'



export default function App() {
  const [temp, setTemp] = useState(0);
  const [cityName, setCityName] = useState("Unknown");

  async function fetchWeatherData(lat, lon){
    console.log(lat, lon);
    const API = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`;
    try{
      let response = await fetch(API);
      let data = await response.json();
      console.log(data)
      setTemp(data.main.temp)
      setCityName(data.name)
    }
    catch (error){
      console.error(error)
    }

/*     const response = await fetch(API)
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
    } */
  }
  
  useEffect(() => {
    fetchWeatherData(38.5449, -121.7405);
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
