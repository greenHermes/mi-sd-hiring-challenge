import axios from "axios";
import { convertDate } from "./utils";
const locationUrl = 'https://se-weather-api.herokuapp.com/api/v1/geo?zip_code=94132'
const weekdays = ['Sunday', 'Monday', 'Tuesday','Wednesday','Thursday','Friday','Saturday']
import snow from '../img/snow.png'
import rain from '../img/rain.png'
import sunny from '../img/sunny.png'
import cloudy from '../img/cloudy.png'

const t = new Date();
const day = ('0' + t.getDate()).slice(-2);
const month = ('0' + (t.getMonth() + 1)).slice(-2);
const year = t.getFullYear();

const date = `${month}/${day}/${year}`;

const apiCall = () => {
  return axios.get(locationUrl)
    .then(res => {
      getWeather(res.data.longitude, res.data.latitude)
    })
}


const makeHeader = (forecast, i) => {
  const text = i === day % 7 ? 'Today:' : `${weekdays[i]}:`
  return `<h4> ${text} </h4>`
}

const makeImage = (forecast) => {
  switch (forecast.icon) {
    case 'snow':
      return `<img src={../img/snow.png}/>`
      break;
    case 'cloudy':
      return `<img src=${cloudy}/>`
      break;
    case 'rain':
      return `<img src=${rain}/>`
      break;
    case 'sunny':
      return `<img src=${sunny}/>`
      break;
    default:
      return `<img src=${cloudy}/>`
  }
}

const makeDescription = () => {
  
}



const makeTemperature = () => {

}



const displayData = (arr) => {
  let j=0
  while (j <= 1){
    arr.forEach((item, i) => {
      const titleBlock = makeHeader(item, j)
      const icon = makeImage(item);
      const description = makeDescription(item);
      const temp = makeTemperature(item);

      var codeBlock = '<div>' + titleBlock + icon + temp + description + '</div>';
      
      document.getElementById(`${i}`).innerHTML = codeBlock;
      j++
    })
  }
}


apiCall();

const getWeather = (long, lat) => {
  return axios.get(`https://se-weather-api.herokuapp.com/api/v1/forecast?latitude=${lat}&longitude=${long}&date=${date}`)
  .then(res => {
    displayData(res.data.daily.data)  
})
}




