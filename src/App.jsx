import WeatherSearch from "../components/WeatherSearch.jsx";
import WeatherBoard from "../components/WeatherBoard.jsx";
import "./App.css";
import { useState } from "react";

function App() {
  const [shownWeather, setShownWeather] = useState("");
  const [cityInput, setCityInput] = useState("");

  const handleInputChange = (e) => {
    setCityInput(e.target.value);
  };

  const handleSearch = (updatedWeather) => {
    console.log(updatedWeather);
    setShownWeather(updatedWeather);
  };

  return (
    <>
      <WeatherSearch
        cityInput={cityInput}
        handleSearch={handleSearch}
        handleInputChange={handleInputChange}
      ></WeatherSearch>
      <WeatherBoard shownWeather={shownWeather}></WeatherBoard>
    </>
  );
}

export default App;
