import React, {useState, useEffect} from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Weather from './src/components/weather';
import GuessGame from './src/components/guessgame';
import { WEATHER_API_KEY } from '@env'

export default function App() {
  const [data, setData] = useState([{type: "current temperature", value: 0, unit: "°F"}]);
  const [cityName, setCityName] = useState("Unknown");
  const [scores, setScores] = useState([0, 0, 0, 0, 0]);
  const [index, setIndex] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  
  const dataTypes = ["current temperature", "minimum daily temperature", "maximum daily temperature", "current humidity", "current wind speed"];
  const units = ["°F", "°F", "°F", "%", " mph"];

  useEffect(() => {
    fetchWeatherData(38.5449, -121.7405);
  }, []);

  const fetchWeatherData = async (lat, lon) => {
    console.log(lat, lon);
    console.log(`${WEATHER_API_KEY}`);
    const API = `http://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${lat},${lon}&days=1&aqi=no&alerts=no`;
    try {
      let response = await fetch(API);
      let json = await response.json();
      console.log(json);
      // setCityName(data.location.name);
      let unroundedData = [json.current.temp_f, json.forecast.forecastday[0].day.mintemp_f, json.forecast.forecastday[0].day.maxtemp_f, json.current.humidity, json.current.wind_mph];
      let roundedData = unroundedData.map((value) => Math.round(value));
      let gameData = roundedData.map((value, index) => {
        return {type: dataTypes[index], value: value, unit: units[index]};
      });
      console.log(gameData);
      setData(gameData);
    }
    catch (error){
      console.error(error);
    }
  }

  const correctGuess = (numTries) => {
    newScores = scores;
    newScores[index] = numTries;
    setScores(newScores);
    console.log(scores);
    if(index < 4) {
      setIndex(index + 1);
    } else {
      setGameOver(true);
    }
  }

  return (
    <View style={styles.container}>
      {/* <Weather temp={temp} cityName={cityName}/> */}
      {!gameOver && <GuessGame type={data[index].type} value={data[index].value} unit={data[index].unit} correctGuess={correctGuess}/>}
      {gameOver && <Text>Total Tries: {scores.reduce((a, b) => a + b, 0)}</Text>}
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
