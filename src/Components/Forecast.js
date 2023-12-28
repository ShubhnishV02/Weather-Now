import React, { Component } from 'react';
import Search from './Search';
import Result from './Result';
import axios from 'axios';
import Recent from './Recent';

import cloudyImage from '../images/stormclouds.jpg';
import brokenClouds from '../images/brokenClouds.jpg';
import scatteredClouds from '../images/scatteredClouds.jpg';
import defaultCloudImage from '../images/cloud-blue-sky.jpg';
import rainImage from '../images/heavyRain.jpg';                               //drizzle and rain, i used same image
import clearSkyImage from '../images/clearSkyImage.jpg';
import mistImage from '../images/mist.jpg';
import hazeImage from '../images/haze1.jpg';
import smokeImage from '../images/smoke.webp';
import snowImage from '../images/snow.jpg';
import thunderstormImage from '../images/thunderstorm2.jpeg';
import fogImage from '../images/fog.jpg';
import defaultImage from '../images/thunderstorm2.jpeg';


class Forecast extends Component {
  constructor(props) {
    super(props)

    this.state = {
      lat: "",
      lon: "",
      weatherData: "",
      city: "",
      isSearched: false,
      recent: [],
      hourlyData: [],
      uvIndex: '',
    }
  }




  addDataToRecent = () => {
    let recent = this.state.recent;
    recent.push({
      lat: this.state.lat,
      lon: this.state.lon,
      city: this.state.weatherData.name,                                //we don't get directly city name with this.state.city bcoz we remove the city name in each request of axios.
    });
    this.setState({ recent }, () => {
      window.localStorage.setItem("recent", JSON.stringify(this.state.recent));
    });
  };

  deleteRecentHandler = () => {                                           // this is used when user triggered the clear button to clear all the recents.
    localStorage.removeItem("recent");
    this.setState({ recent: [] });
  }



  componentDidMount() {
    const data = window.localStorage.getItem("recent");
    let recent = data === null ? [] : JSON.parse(data);                    //terinary operation we used to set the data empty [] or JSON to object form to overcome the error which it comes when the data is null.
    this.setState({ recent });

  }



  // when onClick triggered on the Recent component the reSearchHandler will call and it will get the already stored arguments lat and lon which comes through the 
  // addDataToRecent function as you can check above . The already stored data fetch by the axios request and it will show the recent place forecast.






  // Modify your reSearchHandler function in Forecast.js
  reSearchHandler = (lat, lon) => {
    const getTheCurrentTime = (stamp) => {
      const currentTimeData = new Date(stamp * 1000);
      const hours = currentTimeData.getHours() % 12 || 12;
      const period = currentTimeData.getHours() >= 12 ? "PM" : 'AM';
      return `${hours}${period}`;
    };

    const kToC = (k) => {
      return Math.round(k - 273.15).toString() + "°";
    };

    this.setState({ weatherData: "", hourlyData: [], uvIndex: "" }, () => {              // this setState is run for showing the Loader to User, if the places is changed on Click.
      this.setState({ lat, lon }, () => {                                         // this setState is run for get the lat and lon coordinates from already stored in recent array and fetch by axios request.      
        // Fetch current weather data
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${this.state.lat}&lon=${this.state.lon}&appid=5a1e4432cbaef39b09b86fc012109f8f`)
          .then((result) => {
            this.setState({
              lat: result.data.coord.lat,
              lon: result.data.coord.lon,
              city: "",
              weatherData: result.data,
              isSearched: true,
            });
          })
          .catch((error) => {
            console.log(error);
          });

        // Fetch hourly forecast data
        if (this.state.hourlyData.length < 9) {
          axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${this.state.lat}&lon=${this.state.lon}&appid=5a1e4432cbaef39b09b86fc012109f8f`)
            .then((result) => {
              // Extract the relevant hourly data and update the state
              const currentDate = new Date();
              const next3DaysData = result.data.list.filter(item => {
                const itemDate = new Date(item.dt * 1000);
                return itemDate.getDate() >= currentDate.getDate() && itemDate.getDate() < currentDate.getDate() + 3;
              });
              // Extract the relevant hourly data and update the state
              const hourlyData = next3DaysData.slice(0, 10).map(item => ({
                time: getTheCurrentTime(item.dt),
                icon: item.weather[0].icon,
                temperature: kToC(item.main.temp),

              }));

              this.setState({ hourlyData });
              // console.log(this.state.hourlyData);
            })
            .catch((error) => {
              console.log(error);
            });

          // Fetch UV index data
          axios
            .get(`https://api.openweathermap.org/data/2.5/uvi?lat=${this.state.lat}&lon=${this.state.lon}&appid=5a1e4432cbaef39b09b86fc012109f8f`)
            .then((result) => {
              this.setState({ uvIndex: result.data.value });
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
      );
    });
  }



  changeHandler = (event) => {
    const name = event.target.name;
    // console.log(name);
    if (name === "city") {
      this.setState({
        city: event.target.value,
      });
    } else if (name === "lat") {
      this.setState({
        lat: event.target.value,
      });
    } else if (name === "lon") {
      this.setState({
        lon: event.target.value,
      });
    }
  }


  searchHandler = (e) => {                           // when user clicks on search button ... the button calls a function search and it hits the searchHandler function.
    e.preventDefault()

    const getTheCurrentTime = (stamp) => {
      const currentTimeData = new Date(stamp * 1000);
      const hours = currentTimeData.getHours() % 12 || 12;
      const period = currentTimeData.getHours() >= 12 ? "PM" : 'AM';
      return `${hours}${period}`;
    };

    const kToC = (k) => {
      return Math.round(k - 273.15).toString() + "°";
    };

    const fetchWeatherData = (lat, lon) => {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=5a1e4432cbaef39b09b86fc012109f8f`)
        .then((result) => {
          this.setState({
            city: "",
            weatherData: result.data,
            lat: result.data.coord.lat,
            lon: result.data.coord.lon,
            isSearched: true,
          }, () => {
            this.addDataToRecent();
          });
        })
        .catch((error) => {
          console.log(error);
        });


      // Fetch UV index data
      axios.get(`https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=5a1e4432cbaef39b09b86fc012109f8f`)
        .then((result) => {
          this.setState({ uvIndex: result.data.value });
        })
        .catch((error) => {
          console.log(error);
        });

      // Fetch hourly forecast data
      axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=5a1e4432cbaef39b09b86fc012109f8f`)
        .then((result) => {
          // Extract the relevant hourly data and update the state
          const currentDate = new Date();
          const next3DaysData = result.data.list.filter(item => {
            const itemDate = new Date(item.dt * 1000);
            return itemDate.getDate() >= currentDate.getDate() && itemDate.getDate() < currentDate.getDate() + 3;
          });
          const hourlyData = next3DaysData.slice(0, 10).map(item => ({
            time: getTheCurrentTime(item.dt),
            icon: item.weather[0].icon,
            temperature: kToC(item.main.temp),
          }));

          this.setState({ hourlyData });
          // console.log(this.state.hourlyData);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    // UI error Handling
    // before if else condition with city blank or not this gets 2 results in the console panel (first searched by city and also searched by coordinates) and UI doesn't respond 
    //  to the answer because it gives the result to the last searched answer. for ex. if we first searched for meerut by cordinates or city name than it shows the result with the meerut 
    //  weather Forecast and it stores the cordinates of the place and after we searched for next city name like hyderabad it shows the same result as Meerut coordinates and weather 
    //  forecast in UI and shows 2 results in the console log as it searched with 2 results first searched by city and second searched by codinates. so to overcome this i use 
    //  the if and else condition. so if user searched with city then it shows with city result and stores the coordinates and after the city name is going to empty in state 
    // and after again searched with city or codinates it will show the result as required.

    if (this.state.city !== "") {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&appid=5a1e4432cbaef39b09b86fc012109f8f`)
        .then((result) => {
          const { lat, lon } = result.data.coord;
          fetchWeatherData(lat, lon);
        })
        .catch(
          (error) => {
            console.log(error);
          }
        );
    } else {
      fetchWeatherData(this.state.lat, this.state.lon);
    }
  }




  locationHandler = (e) => {                            // when user clicks on navigator button ... the button calls a function getLocation and it hits the locationHandler function.
    e.preventDefault()
    // console.log(this.state.lat);
    this.setState({
      // lat: "",
      // lon: "",
      city: "",
      weatherData: "",
      isSearched: true,
    })

    const getTheCurrentTime = (stamp) => {
      const currentTimeData = new Date(stamp * 1000);
      const hours = currentTimeData.getHours() % 12 || 12;
      const period = currentTimeData.getHours() >= 12 ? "PM" : 'AM';
      return `${hours}${period}`;
    };

    const kToC = (k) => {
      return Math.round(k - 273.15).toString() + "°";
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (res) => {
          setTimeout(() => {
            this.setState({
              lat: res.coords.latitude,
              lon: res.coords.longitude,
            });

            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${this.state.lat}&lon=${this.state.lon}&appid=5a1e4432cbaef39b09b86fc012109f8f`)
              .then(
                (result) => {
                  this.setState({
                    city: "",
                    weatherData: result.data,
                    isSearched: true,
                  }, () => {
                    this.addDataToRecent();
                  }
                  );
                }
              )
              .catch(
                (error) => {
                  console.log(error);
                }
              );
          }, 500)


          // Fetch UV index data
          axios.get(`https://api.openweathermap.org/data/2.5/uvi?lat=${this.state.lat}&lon=${this.state.lon}&appid=5a1e4432cbaef39b09b86fc012109f8f`)
            .then((result) => {
              this.setState({ uvIndex: result.data.value });
            })
            .catch((error) => {
              console.log(error);
            });



          // Fetch hourly forecast data
          axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${this.state.lat}&lon=${this.state.lon}&appid=5a1e4432cbaef39b09b86fc012109f8f`)
            .then((result) => {
              const currentDate = new Date();
              const next3DaysData = result.data.list.filter(item => {
                const itemDate = new Date(item.dt * 1000);
                return itemDate.getDate() >= currentDate.getDate() && itemDate.getDate() < currentDate.getDate() + 3;
              });
              const hourlyData = next3DaysData.slice(0, 10).map(item => ({
                time: getTheCurrentTime(item.dt),
                icon: item.weather[0].icon,
                temperature: kToC(item.main.temp),
              }));

              this.setState({ hourlyData });
            })
            .catch((error) => {
              console.log(error);
            });



        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.log("Location is not supported");
    }

  }



  render() {
    // Function to get the background image based on weather condition
    const getBackgroundImage = () => {
      const weatherCondition = this.state.weatherData.weather && this.state.weatherData.weather[0].main;
      // console.log(this.state.weatherData);
      switch (weatherCondition) {
        case 'Clear':
          return `url(${clearSkyImage})`;
        case 'Clouds':
          if (this.state.weatherData.weather[0].description === "broken clouds") {
            return `url(${brokenClouds})`;
          } else if (this.state.weatherData.weather[0].description === "scattered clouds") {
            return `url(${scatteredClouds})`;
          } else if (this.state.weatherData.weather[0].description === "overcast clouds") {
            return `url(${cloudyImage})`;
          } else {
            return `url(${defaultCloudImage})`
          };
        case 'Rain':
          return `url(${rainImage})`;
        case 'Haze':
          return `url(${hazeImage})`;
        case 'Smoke':
          return `url(${smokeImage})`;
        case 'Thunderstorm':
          return `url(${thunderstormImage})`;
        case 'Drizzle':
          return `url(${rainImage})`;
        case 'Snow':
          return `url(${snowImage})`;
        case 'Mist':
          return `url(${mistImage})`;
        case 'Fog':
          return `url(${fogImage})`;
        // Add more cases for other weather conditions as needed
        default:
          return `url(${defaultImage})`;
      }
    };
    // Inline styles for the background image
    const backgroundImageStyle = {
      backgroundImage: getBackgroundImage(),
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      position: 'relative', // Needed for stacking pseudo-element
      minHeight: '100vh',
    };
    const overlayStyle = {
      content: '""',
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      background: 'rgba(0, 0, 0, 0.2)', // Adjust the alpha value for darkness
    };

    return (
      <div style={backgroundImageStyle}>
        <div style={overlayStyle}></div>
        <div className='container py-1'>
          <h3 className='text-white pt-1' style={{ textShadow: "1.5px 1.5px 2.5px black" }}>Weather Forecast</h3>
          <Recent recent={this.state.recent} research={this.reSearchHandler} deleteRecents={this.deleteRecentHandler} />
          <Search
            lat={this.state.lat}
            lon={this.state.lon}
            city={this.state.city}
            weatherData={this.state.weatherData}
            change={this.changeHandler}
            getLocation={this.locationHandler}
            search={this.searchHandler}
          >
          </Search>

          <Result isSearched={this.state.isSearched} weatherData={this.state.weatherData} hourlyData={this.state.hourlyData} uvIndex={this.state.uvIndex} >
          </Result>
        </div>
      </div>

    )
  }
}

export default Forecast
