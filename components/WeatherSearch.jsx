const WeatherSearch = (props) => {
  const searchWeather = async (city) => {
    let coordinates = await getCoordinates(props.cityInput).then((c) => {
      return c;
    });
    let latitude = await coordinates[1][1];
    let longitude = await coordinates[2][1];
    console.log(latitude);
    console.log(longitude);
    let url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=weathercode`;

    let weatherCode = await fetch(url)
      .then((data) => data.json())
      .then((data) => {
        return data.current.weathercode;
      });
    props.handleSearch(weatherCode);
  };

  const getCoordinates = async (city) => {
    const apiKey = import.meta.env.VITE_COORDS_API_KEY;
    try {
      const response = await fetch(
        `https://api.api-ninjas.com/v1/geocoding?city=${city}`,
        {
          method: "GET",
          headers: {
            "X-Api-Key": apiKey,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);

      return Object.entries(result[0]);
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };

  const handleInputChange = (e) => {
    props.handleInputChange(e);
  };

  return (
    <div>
      WeatherSearch<br></br>
      <br></br>
      <br></br>
      <input
        value={props.cityInput}
        onChange={(e) => handleInputChange(e)}
        type="text"
        placeholder="Buenos Aires"
      ></input>
      <br></br>
      <br></br>
      <button onClick={searchWeather}>Buscar pronóstico</button>
    </div>
  );
};

export default WeatherSearch;
