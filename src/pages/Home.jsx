import { useState } from 'react'

export default function Home() {
  const [currentDate] = useState(new Date())
  
  // Get current day and next 6 days
  const getDayName = (date) => date.toLocaleDateString('en-US', { weekday: 'short' })
  const days = Array.from({length: 7}, (_, i) => {
    const date = new Date()
    date.setDate(currentDate.getDate() + i)
    return getDayName(date)
  })
  
  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">CLOUD-9</h1>
        <nav className="nav-buttons">
          <button>Home</button>
          <button>Maps</button>
          <button>Settings</button>
        </nav>
      </header>

      <main className="weather-widget">
        <div className="current-weather">
          <div className="current-date">
            {currentDate.toLocaleDateString('en-US', { weekday: 'long' })}, {currentDate.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' })}
          </div>
          <div className="current-temp">
            <img src="/path/to/weather-icon.png" alt="Current weather" className="weather-icon" />
            <span>72°</span>
          </div>
        </div>

        <div className="forecast-grid">
          {days.map((day) => (
            <div key={day} className="forecast-day">
              <div className="forecast-day-name">{day}</div>
              <img src="/path/to/weather-icon.png" alt={`${day} weather`} className="weather-icon" />
              <div>72°</div>
            </div>
          ))}
        </div>
      </main>

      <div className="suggestion-box">
        <span>Suggestion: Go to settings to personalize your app!</span>
      </div>
    </div>
  )
}