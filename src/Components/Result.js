import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';             // these 3 imports are used for slider in the hourly forecast as install externally.

import React from 'react';
import Loader from './Loader';
import Footer from './Footer';


export default function Result(props) {
    const { weatherData, hourlyData, uvIndex } = props;


    // this function is used to convert the default kelvin into Celcius
    function kToC(k) {
        return (k - 273.15).toFixed(2) + "°C";
    }

    // this function is used to convert the default value to extract the time.
    function getTheDate(stamp) {
        const date = new Date(stamp * 1000);
        return date.toLocaleTimeString();
    }

    // convert the deafault value into speed in kmph
    function getTheSpeed(h) {
        return ((h * 60 * 60) / 1000).toFixed(2);
    }

    // convert the default value and extract the current time with AM and PM
    function getTheCurrentTime(stamp) {
        const currentTimeData = new Date(stamp * 1000);
        const hours = currentTimeData.getHours() % 12 || 12;
        let st = hours.toString();
        if (st.length < 2) {
            st = "0" + hours;
        } else {
            st = hours;
        }
        const minutes = currentTimeData.getMinutes().toString().padStart(2, "0");
        const period = currentTimeData.getHours() >= 12 ? "PM" : "AM";

        return (
            <div>
                <div>
                    <h1 className='mb-4 mt-3'>{`${st}:${minutes}`} <span>{period}</span></h1>
                </div>
            </div>
        );
    }


    // this is used to dynamically fetch the uvIndex and show the text as the uvIndex is about with style and css dynamically.
    let uvDesc = (uvIndex) => {
        if (uvIndex <= 2) {
            uvDesc = {
                css: "mb-1",
                text: "Low Risk",
                style: {
                    color: "rgb(158,159,159)",
                    fontWeight: "600",
                    textShadow: "1px 1px 2px black",
                }
            };
            return uvDesc;
        } else if (uvIndex > 2 && uvIndex <= 5) {
            uvDesc = {
                css: "mb-1",
                text: "Moderate",
                style: {
                    color: "#e5b629",
                    fontWeight: "600",
                    textShadow: "1px 1px 2px black",
                }
            };
            return uvDesc;
        } else if (uvIndex > 5 && uvIndex <= 7) {
            uvDesc = {
                css: "mb-1 grey",
                text: "High Risk",
                style: {
                    color: "orangered",
                    fontWeight: "600",
                    textShadow: "1px 1px 2px black",
                }
            };
            return uvDesc;
        } else if (uvIndex > 7 && uvIndex < 11) {
            uvDesc = {
                css: "mb-1 grey",
                text: "Very High Risk",
                style: {
                    color: "crimson",
                    fontWeight: "700",
                    textShadow: "1px 1px 1px black",
                }
            };
            return uvDesc;
        } else if (uvIndex >= 11) {
            uvDesc = {
                css: "mb-1 grey",
                text: "Extreme Risk",
                style: {
                    color: "purple",
                    fontWeight: "600",
                }
            };
            return uvDesc;
        }
    }

    uvDesc(props.uvIndex);



    // slider setting functionality starts here

    const sliderSettingsHourly = {
        dots: false,
        infinite: false,
        speed: 1000,
        slidesToShow: 8, // Adjust the number of slides to show at once
        slidesToScroll: 3,
        autoplay: false, // Disable automatic sliding
        autoplaySpeed: 500,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 1000,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5,
                },
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                },
            },
            {
                breakpoint: 755,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                },
            },
            {
                breakpoint: 350,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                },
            },
        ],
    };

    // slider setting functionality ends here





    let showOnPage;

    if (weatherData === "") {
        if (props.isSearched === true)
            showOnPage = <Loader />

        else
            showOnPage = (
                <div className='text-center' style={{ marginTop: "4rem", marginBottom: "3rem", textShadow: "1.5px 1.5px 2.5px black" }}>
                    <h2 className='enter-the-cord-or-city-para'>Please enter the city or co-ordinates to get the Weather Forecast!</h2>
                </div>
            );

    } else {
        showOnPage = <>

            <div className='container'>
                <div className='mb-2 container'>
                    <div className='row'>
                        <div className="col-md-4 col-lg-4 col-8 text-start temp-details-box">
                            <div className='card box-color mb-3'>
                                <h6 className='m-2 mx-3 mb-0'>{weatherData.sys.country}</h6>
                                <div className='d-flex'>
                                    <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt='' className='img-main-forecast' />
                                    <div className='d-block city-name-description-forecast'>
                                        <h4 className='card-title'>{weatherData.name} <span>{kToC(weatherData.main.temp)}</span></h4>
                                        <h3 className='mb-2 px-2'> {weatherData.weather[0].description}</h3>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className="col detail-box">
                                        <div className='card box-temp-detail-color'>
                                            <div className='weather-temp-detail-box px-2'>
                                                <h5>Temperature</h5>
                                                <span>{kToC(weatherData.main.temp)}</span>
                                            </div>
                                            <div className='weather-temp-detail-box px-2'>
                                                <h5>Feels Like</h5>
                                                <span>{kToC(weatherData.main.feels_like)}</span>
                                            </div>
                                            <div className='weather-temp-detail-box px-2'>
                                                <h5>Min Temp.</h5>
                                                <span>{kToC(weatherData.main.temp_min)}</span>
                                            </div>
                                            <div className='weather-temp-detail-box px-2'>
                                                <h5>Max Temp.</h5>
                                                <span>{kToC(weatherData.main.temp_max)}</span>
                                            </div>
                                            <div className='weather-temp-detail-box px-2'>
                                                <h5>Wind Gust</h5>
                                                <span>{getTheSpeed(weatherData.wind.gust)}</span>
                                            </div>
                                            <div className='weather-temp-detail-box px-2'>
                                                <h5>Humidity</h5>
                                                <span>{weatherData.main.humidity}%</span>
                                            </div>
                                            <div className='weather-temp-detail-box px-2'>
                                                <h5>Sunrise</h5>
                                                <span>{getTheDate(weatherData.sys.sunrise)}</span>
                                            </div>
                                            <div className='weather-temp-detail-box px-2'>
                                                <h5>Sunset</h5>
                                                <span>{getTheDate(weatherData.sys.sunset)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>



                        <div className="col-md-7 text-start">
                            <div className='card overall-hourly-forecast-section box-color'>
                                <div className='card-body'>
                                    <h5 className='mx-2 mb-3 hourlyforecast-heading'><i className='fa-solid fa-cloud-sun-rain'></i> Hourly Forecast <span style={{ fontSize: "11px", color: "white", fontWeight: "400" }}>- every 3 hours forecast</span></h5>
                                    <div>
                                        <Slider {...sliderSettingsHourly}>
                                            {hourlyData.map((hour, index) => (
                                                <div key={index} className='text-center wrapper'>
                                                    <h5>{hour.time}</h5>
                                                    <img src={`https://openweathermap.org/img/wn/${hour.icon}@2x.png`} alt='' />
                                                    <h4 className='text-center'>{hour.temperature}</h4>
                                                </div>
                                            ))}
                                        </Slider>
                                    </div>
                                </div>
                            </div>



                            <div className='row mt-1 g-3 hourlyforecast-main'>
                                <div className='col-md-4'>
                                    <div className='card overall-time-forecast-section box-color'>
                                        <div className='card-body'>
                                            <h6 className='hourlyforecast-heading'><span className='fa fa-clock'></span> Current Time</h6>
                                            <h1 className='mb-4 mt-3 text-white'>{getTheCurrentTime(weatherData.dt)}</h1>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <div className='card overall-uvIndex-forecast-section box-color'>
                                        <div className='card-body'>
                                            <h6 className='hourlyforecast-heading'><i className='fa-solid fa-radiation'></i> UV Index</h6>
                                            <h1 className='mt-3 mb-0'>{uvIndex}</h1>
                                            <span className={uvDesc.css} style={uvDesc.style}>{uvDesc.text}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className='col-md-4'>
                                    <div className='card overall-speed-forecast-section box-color'>
                                        <div className='card-body'>
                                            <h6 className='hourlyforecast-heading'><i className='fa-solid fa-wind'></i> Wind</h6>
                                            <h1 className='mb-4 mt-3 speed'>{getTheSpeed(weatherData.wind.speed)} <span>kmph</span></h1>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='row mt-1 g-2'>
                                <div className='col-md-12'>
                                    <div className='card overall-visibility-forecast-section box-color'>
                                        <div className='card-body d-flex justify-content-between align-items-center mx-md-2 mx-lg-2 mx-0 text-white'>
                                            <h5><span className='fa-solid fa-eye'></span> Visibility</h5>
                                            <h3 className='mx-md-3 mx-lg-3 mx-0 visibility' >{weatherData.visibility / 1000}<span> km</span></h3>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>




                    </div>

                </div>
            </div >
            <Footer />
        </>



    };

    return (
        <>{showOnPage}</>

    )
}
