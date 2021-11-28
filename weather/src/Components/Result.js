import React from 'react';

const Result = ({data}) => {
return (
    <div id="result" style={{display: "none"}}>
    {
        data.error !== undefined ? <h1 className="display-6">{data.error.message}</h1>
        :
        <>
        <h1 className="display-6">Current Weather</h1>
        <p>
            <strong>Location:</strong> {data.location.name}, {data.location.region}, {data.location.country}<br />
            <strong>Last Updated:</strong> {data.current.last_updated} <br />
            <strong>Tempature:</strong> {data.current.temp_f} F <br />
            <strong>Feels Like: </strong>{data.current.feelslike_f} F <br />
            <strong>Wind:</strong> {data.current.wind_mph} MPH <br />
            <strong>Wind Gusts:</strong> {data.current.gust_mph} MPH <br />
            <strong>Wind Direction:</strong> {data.current.wind_dir} <br />
            <strong>Humidity:</strong> {data.current.humidity}% <br />
            <strong>Visibility:</strong> {data.current.vis_miles} miles <br />
            <strong>Cloud Coverage:</strong> {data.current.cloud}% <br />
            <strong>Percipitation:</strong> {data.current.precip_in} inches<br />
        </p>
        </>
    }
    </div>
);
}

export default Result;