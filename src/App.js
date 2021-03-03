import { useEffect, useState } from 'react';
import './styles.css';
import { v4 as uuidv4 } from 'uuid';
import { ReactComponent as Logo } from './question.svg';

export default function App() {
  // master list
  const [events, setEvents] = useState(() => {
    if (localStorage.events) {
      return JSON.parse(localStorage.events);
    } else {
      return [];
    }
  });
  //temp state for forms
  const [currentEvent, setCurrentEvent] = useState('');
  const [date, setDate] = useState('');
  const [renderToggle, setRenderToggle] = useState(true);
  const [filterTerm, setFilterTerm] = useState('');

  const submitEvent = (e) => {
    e.preventDefault();
    if (!currentEvent) {
      return alert('enter an event');
    }
    if (!date) {
      return alert('enter a date');
    }
    setEvents((events) => [...events, { currentEvent, date, id: uuidv4() }]);
    setCurrentEvent('');
    setDate('');
  };

  const sortOldest = () => {
    events.sort((a, b) => {
      if (a.date > b.date) {
        return 1;
      }
      if (a.date < b.date) {
        return -1;
      }
      return 0;
    });
    setRenderToggle(!renderToggle);
  };
  const sortNewest = () => {
    events.sort((a, b) => {
      if (a.date > b.date) {
        return -1;
      }
      if (a.date < b.date) {
        return 1;
      }
      return 0;
    });
    setRenderToggle(!renderToggle);
  };

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  return (
    <div className="App">
      <div className="container">
        <Logo />
        <h1>The last time I ...</h1>
        <form>
          <label htmlFor="currentEvent">Event</label>
          <input
            placeholder="add an event"
            id="currentEvent"
            type="text"
            value={currentEvent}
            onChange={(event) => setCurrentEvent(event.target.value)}
          />
          <br />
          <label htmlFor="date">Date</label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
          <button onClick={submitEvent}>Add event</button>
        </form>
        <button onClick={sortOldest}>Oldest first</button>
        <button onClick={sortNewest}>Newest first</button>
        <br />
        <input
          type="text"
          placeholder="filter events"
          onChange={(event) => setFilterTerm(event.target.value)}
          value={filterTerm}
        />
        <button onClick={() => setFilterTerm('')}>Clear filter</button>

        {filterTerm === ''
          ? events.map((eachEvent) => {
              return (
                <div key={eachEvent.id}>
                  <p>
                    {eachEvent.currentEvent} -{eachEvent.date}
                    <button
                      className="deleteButton"
                      onClick={() => {
                        setEvents(
                          events.filter((event) => event.id !== eachEvent.id)
                        );
                      }}
                    >
                      X
                    </button>
                  </p>
                  <hr />
                </div>
              );
            })
          : events
              .filter((item) =>
                item.currentEvent
                  .toLowerCase()
                  .includes(filterTerm.toLowerCase())
              )
              .map((eachEvent) => {
                return (
                  <div key={eachEvent.id}>
                    <p>
                      {eachEvent.currentEvent} -{eachEvent.date}
                      <button
                        className="deleteButton"
                        onClick={() => {
                          setEvents(
                            events.filter((event) => event.id !== eachEvent.id)
                          );
                        }}
                      >
                        X
                      </button>
                    </p>
                    <hr />
                  </div>
                );
              })}
        <p>
          <a href="https://storyset.com/">Illustration by Freepik Storyset</a>
        </p>
      </div>
    </div>
  );
}
