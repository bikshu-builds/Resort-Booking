"use client";
import React, { useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

function CalenderComponents({ onDateSelected }) {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [showCalender, setShowCalender] = useState(false);
  const [selectedDates, setSelectedDates] = useState(null);

  const handleSelectDates = async () => {
    const startDate = state[0].startDate.toLocaleDateString();
    const endDate = state[0].endDate.toLocaleDateString();

    const bookingData = { startDate, endDate };
    setSelectedDates(bookingData);

    console.log("Selected Dates:", bookingData);

    // ✅ Call parent callback safely
    if (onDateSelected) {
      onDateSelected(bookingData);
    }
  };

  return (
    <>
      <h2>Select Date Range</h2>

      <button onClick={() => setShowCalender(!showCalender)}>
        {showCalender ? "Hide Calendar" : "Show Calendar"}
      </button>

      {showCalender && (
        <DateRange
          editableDateInputs={true}
          onChange={(item) => setState([item.selection])}
          moveRangeOnFirstSelection={false}
          ranges={state}
        />
      )}

      <button onClick={handleSelectDates}>Select Dates</button>

      {selectedDates && (
        <p>
          Selected: {selectedDates.startDate} → {selectedDates.endDate}
        </p>
      )}
    </>
  );
}

export default CalenderComponents;
