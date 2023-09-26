import React, { useState } from "react";

function AddDaysToDate() {
  const [dayInputs, setDayInputs] = useState([{ id: 1, daysToAdd: 0 }]);
  const [results, setResults] = useState({});

  const handleDaysChange = (event, id) => {
    const updatedDayInputs = dayInputs.map(input =>
      input.id === id
        ? { ...input, daysToAdd: parseInt(event.target.value, 10) }
        : input
    );
    setDayInputs(updatedDayInputs);
  };

  const calculateNewDate = id => {
    const currentDate = new Date();
    const newDate = new Date(currentDate);
    const daysToAdd = dayInputs.find(input => input.id === id).daysToAdd;
    newDate.setDate(currentDate.getDate() + daysToAdd);

    setResults({
      ...results,
      [id]: { days: daysToAdd, date: newDate.toDateString() }
    });
  };

  const addNewInput = () => {
    const newId = dayInputs.length + 1;
    setDayInputs([...dayInputs, { id: newId, daysToAdd: 0 }]);
  };

  return (
    <>
      <div className="app-container">
        <h1>Date Calculator</h1>
        {dayInputs.map(input => (
          <div key={input.id} className="input-container">
            <label>
              Enter number of days to add:
              <input
                type="number"
                value={input.daysToAdd}
                onChange={event => handleDaysChange(event, input.id)}
                className="center-input"
              />
            </label>
            <button onClick={() => calculateNewDate(input.id)}>
              Calculate New Date
            </button>
            {results[input.id] && (
              <p className="result">
                {results[input.id].days} days added: {results[input.id].date}
              </p>
            )}
          </div>
        ))}
        <button onClick={addNewInput}>Add Input</button>
        <div>
          <p>
            <a href="https://glittering-bavarois-501d37.netlify.app">
              Automatically and pre-defined best before dates.
            </a>
          </p>
          <h3 className="developer">developed by: Monica Wolfe</h3>
        </div>
      </div>
    </>
  );
}

export default AddDaysToDate;
