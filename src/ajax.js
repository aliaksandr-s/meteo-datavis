import axios from 'axios';

const apiToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjozNzM1NSwiZW1haWwiOiJ0ZXN0LXRhc2tAb25lc29pbC5haSIsImlhdCI6MTU1NDQ3NDQ5Nn0.R7p1pGGhLCEsqPr9mSQlod91Jmx9ddXn11BtoYlFV4s" 

axios.defaults.headers.common['Authorization'] = 'Token ' + apiToken


async function getDevices() {
  try {
    const response = await axios.get('https://iot-meteo.onesoil.io/api/stations?show_last_coordinate=1');
    return response.data.data
  } catch (error) {
    console.error(error);
  }
}

const prepareMeteoData = (data) => {
  return data.reduce((acc, cur) => {
    acc.dates.push(cur.datetime);
    acc.soilTemp.push(cur.temp / 100); // it comes from api mulitplied by 100
    acc.airTemp.push(cur.air_temp / 100);
    acc.luminance.push(cur.luminance);
    return acc
  }, {dates: [], soilTemp: [], airTemp: [], luminance: []})
}

const limitMeteoData = (data, limit) => {
  return data.slice(0, limit) 
}

async function getMeteoData(id, limit, dateFrom, dateTo) {
  try {
    const response = await axios.get(`https://iot-meteo.onesoil.io/api/coordinates/${id}/data?date_from=${dateFrom}&date_to=${dateTo}`);
    
    const limitedData = limitMeteoData(response.data, limit) // limit in api doesn't work so we use this as a rough mock
    const preparedData = prepareMeteoData(limitedData)
    return preparedData 
  } catch (error) {
    console.error(error);
  }
}

export { getDevices, getMeteoData }