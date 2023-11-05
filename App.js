import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, SafeAreaView, ImageBackground, Button, Image, Pressable } from 'react-native';
import Weather from './src/components/weather';
import GuessGame from './src/components/guessgame';
import GameOver from './src/components/gameover';
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
import {
  PlayfairDisplay_400Regular,
  PlayfairDisplay_500Medium,
  PlayfairDisplay_600SemiBold,
  PlayfairDisplay_700Bold,
  PlayfairDisplay_800ExtraBold,
  PlayfairDisplay_900Black,
  PlayfairDisplay_400Regular_Italic,
  PlayfairDisplay_500Medium_Italic,
  PlayfairDisplay_600SemiBold_Italic,
  PlayfairDisplay_700Bold_Italic,
  PlayfairDisplay_800ExtraBold_Italic,
  PlayfairDisplay_900Black_Italic,
} from '@expo-google-fonts/playfair-display';
import {
  Battambang_100Thin,
  Battambang_300Light,
  Battambang_400Regular,
  Battambang_700Bold,
  Battambang_900Black,
} from '@expo-google-fonts/battambang';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [cityName, setCityName] = useState("Loading...");
  const [lat, setLat] = useState([]);
  const [lon, setLon] = useState([]);
  const [gameData, setGameData] = useState([{type: "current temperature", value: -500, unit: "°F"}, {type: "minimum daily temperature", value:0, unit:"°F"},{type: "current humidity", value:-1, unit:"%"}, {type: "current wind speed", value:-1, unit:"mph"}])
  const [data, setData] = useState([-500,-99,99,-1,-1]);
  const [scores, setScores] = useState([0, 0, 0, 0, 0]);
  const [index, setIndex] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [show, setShow] = useState(false);
  const [filled, setFilled] = useState(0);
  const dataTypes = ["current temperature", "minimum daily temperature", "maximum daily temperature", "current humidity", "current wind speed"];
  const units = ["°F", "°F", "°F", "%", " mph"];
  const {text, safeArea, screenContainer, weatherContainer, title, subTitle, detailText, current, currentTemp, scoreContainer, scoreText, value, pressableButton, pressableButtonText} = styles

  async function fetchWeatherData(lat, lon){
    //console.log(lat,lon)
    //const API = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`;
    const API = `http://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${lat},${lon}&days=1`;
    
    try{
      let response = await fetch(API);
      let json = await response.json();
      //console.log("got json");
      //console.log(json)
      // setCityName(data.location.name);
      let unroundedData = [json.current.temp_f, json.forecast.forecastday[0].day.mintemp_f, json.forecast.forecastday[0].day.maxtemp_f, json.current.humidity, json.current.wind_mph];
      let roundedData = unroundedData.map((value) => Math.round(value));
      setGameData(roundedData.map((value, index) => {
        return {type: dataTypes[index], value: value, unit: units[index]};
      }))
      //console.log(gameData);
      setCityName(json.location.name)
    }
      catch (error){
        //console.error(error);
/*         console.log("error :(")
        console.log(lat,lon) */
      }
      finally{
        setLoading(false);
      }
    }


  async function fetchData(){
    await Location.requestForegroundPermissionsAsync()
    let {status} = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('no location access permission');
        return;
      }
    let location = await Location.getCurrentPositionAsync({})
    //console.log("got location")
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
    PlayfairDisplay_400Regular,
    PlayfairDisplay_500Medium,
    PlayfairDisplay_600SemiBold,
    PlayfairDisplay_700Bold,
    PlayfairDisplay_800ExtraBold,
    PlayfairDisplay_900Black,
    PlayfairDisplay_400Regular_Italic,
    PlayfairDisplay_500Medium_Italic,
    PlayfairDisplay_600SemiBold_Italic,
    PlayfairDisplay_700Bold_Italic,
    PlayfairDisplay_800ExtraBold_Italic,
    PlayfairDisplay_900Black_Italic,
    Battambang_100Thin,
    Battambang_300Light,
    Battambang_400Regular,
    Battambang_700Bold,
    Battambang_900Black,
  });
  
  const correctGuess = (numTries) => {
    let newScores = scores;
    newScores[index] = numTries;
    setScores(newScores);
    //console.log(scores);
    setShow(false);
    data[index] = gameData[index].value;
    setFilled(filled+1);
    console.log(filled)
    if(filled >= 4) {
      setGameOver(true);
      console.log("game over")
    }
  }

  const closeFunction = () => {
   setGameOver(false)
  }
  
  useEffect(() => {
    fetchData()
    fetchWeatherData(lat, lon);
  }, [lat, lon]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  if (loading){
    return null;
  }

  return (

  <ImageBackground source={require('./assets/bright-clouds.jpg')} style={{flex: 1,}}>
  <SafeAreaView style={safeArea}>

        <View style={screenContainer}>
            {!show && 
              <View style={weatherContainer}>
              <Text style={[text, title]}>Weather</Text>
              <Text style={[text, subTitle]}>or Not?</Text>
              {/* <Text style={[text, city]}><Text style={value}>Luma Land</Text></Text> */}
              <City cityName={cityName}></City>
              <Text style={[text, current]}>Current Temperature</Text>
              <Text style={[text, current, currentTemp]}>{data[0]!=-500 && <Text style={value}>{gameData[0].value}</Text>}{data[0]==-500 && <Pressable style={pressableButton} onPress={() => {setIndex(0); setShow(true)}}><View><Text style={[text, pressableButtonText]}>?</Text></View></Pressable>} ° F</Text>
              <Text style={[text, detailText]}>Low: {data[1]!=-99 && <Text style={value}>{gameData[1].value}</Text>}{data[1]==-99 && <Pressable style={pressableButton} onPress={() => {setIndex(1); setShow(true)}}><View><Text style={[text, pressableButtonText]}>?</Text></View></Pressable>} ° F      High: {data[2]!=99 && <Text style={value}>{gameData[2].value}</Text>}{data[2]==99 &&<Pressable style={pressableButton} onPress={() => {setIndex(2); setShow(true)}}><View><Text style={[text, pressableButtonText]}>?</Text></View></Pressable>} ° F</Text>
              <Text style={[text, detailText]}>Humidity: {data[3]!=-1 && <Text style={value}>{gameData[3].value}</Text>}{data[3]==-1 && <Pressable style={pressableButton} onPress={() => {setIndex(3); setShow(true)}}><View><Text style={[text, pressableButtonText]}>?</Text></View></Pressable>}%</Text>
              <Text style={[text, detailText]}>Wind Speed: {data[4]!=-1 && <Text style={value}>{gameData[4].value}</Text>}{data[4]==-1 && <Pressable style={pressableButton} onPress={() => {setIndex(4); setShow(true)}}><View><Text style={[text, pressableButtonText]}>?</Text></View></Pressable>} mph</Text>
            </View>
            }
          {show && <Image style={{opacity: 0.0,}} source={require('./assets/bright-clouds.jpg')} ></Image>}
          {show && <GuessGame type={gameData[index].type} value={gameData[index].value} unit={gameData[index].unit} correctGuess={correctGuess}/>}
          {gameOver && <GameOver tries={scores.reduce((a, b) => a + b, 0)} closeFunction={closeFunction}></GameOver>}
        </View>
      
    
      </SafeAreaView>
    </ImageBackground>

  )

}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1, 
    //backgroundColor: 'orange',
  },
  text:{
    fontFamily: 'MPLUSRounded1c_400Regular', 
    color: '#0058A1',
  },
  screenContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'stretch',
    //backgroundColor: 'powderblue',
    flex: 1,
    flexShrink: 1,
  },
  weatherContainer: {
    //backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 10,
    flexShrink: 1,
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
    fontFamily: 'PlayfairDisplay_500Medium',
  },
  subTitle: {
    fontSize: 48,
    marginBottom: 16,
    fontFamily: 'PlayfairDisplay_500Medium',
  },
  city: {
    fontSize: 24,
    marginBottom: 48,
    
  },
  current: {
    fontSize: 28,
    marginBottom: 8,
  },
  currentTemp: {
    fontSize: 40,
    marginBottom: 48,
  },
  detailText: {
    fontSize: 24,
    marginBottom: 12,
  },
  scoreText: {
    fontSize: 20,
  },
  value: {
    color: 'green',
    fontFamily: 'MPLUSRounded1c_500Medium',
  },
  pressableButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    opacity: 0.6,
    shadowRadius: 7,
    shadowOpacity: 0.3,
    shadowColor: '#0058A1',
  },
  pressableButtonText:{
    color: 'red',
    fontFamily: 'MPLUSRounded1c_700Bold',
  }
});
