import React, { useState, useEffect } from "react";

const NewsAndEvents = () => {
  const [news, setNews] = useState([]);
  const [events, setEvents] = useState([]);

  // Fetching the news and events data from the public folder
  useEffect(() => {
    fetch("/news.json")
      .then((response) => response.json())
      .then((data) => setNews(data))
      .catch((error) => console.error("Error fetching news data:", error));

    fetch("/events.json")
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error("Error fetching events data:", error));
  }, []);

  return (
    <main>
      <div className="news-events-container">
        <div className="news-section">
          <h1>News</h1>
          {news.map((item) => (
            <div key={item.id} className="news-item">
              <div className="news-content">
                <h2>{item.title}</h2>
                <p>{item.summary}</p>
                <p>
                  <strong>Date:</strong> {item.date}
                </p>
                <a href={item.detailsLink}>Read More</a>
              </div>
            </div>
          ))}
        </div>
        <div className="events-section">
          <h1>Events</h1>
          {events.map((item) => (
            <div key={item.id} className="event-item">
              <div className="event-content">
                <h2>{item.title}</h2>
                <p>{item.summary}</p>
                <p>
                  <strong>Date:</strong> {item.date}
                </p>
                <a href={item.detailsLink}>Read More</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default NewsAndEvents;
