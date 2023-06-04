import React from 'react'

export default function WeatherDetail({ data, title }) {
    return (
        <div className="detail-item">
            <p className="detail-data">{title}</p>
            <p className="received-data">{data}</p>
        </div>
    )
}
