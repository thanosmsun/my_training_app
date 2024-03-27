import React, { useState, useEffect, useRef  } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import './css/TrainingDayColumn.css'; // Import the CSS file

function TrainingDayColumn({ id, dayNumber, isRestDay, onToggleRestDay }) {
  const [isTrainingDay, setIsTrainingDay] = useState(true);
  const navigate = useNavigate();
  const timeSlots = Array.from({ length: 48 }, (_, i) => `${Math.floor(i / 2)}:${i % 2 === 0 ? '00' : '30'}`);
  const scrollRef = useRef(null);

  const handleRowClick = (timeSlot) => {
    if (isTrainingDay) {
      navigate(`/workout-creation?day=${dayNumber}&time=${timeSlot}`);
    }
  };

  const toggleDayType = () => {
    const newIsRestDay = !isRestDay;
    onToggleRestDay(id, newIsRestDay); // Call the callback with the new rest day status
    setIsTrainingDay(!newIsRestDay); // Update local state
  };

  useEffect(() => {
    // Scroll to the middle part of the time slots when the component mounts
    const scrollToMiddle = () => {
      if (scrollRef.current) {
        const middleSlotIndex = 24; // For example, to scroll to 12:00 PM
        const middleSlot = scrollRef.current.children[middleSlotIndex];
        if (middleSlot) {
          scrollRef.current.scrollTop = middleSlot.offsetTop - scrollRef.current.offsetTop;
        }
      }
    };
    scrollToMiddle();
  }, []);

  return (
    <div className="training-day-column">
      <h3>Day {dayNumber}</h3>
      <Button 
        variant="contained" 
        color={isTrainingDay ? "primary" : "secondary"}
        onClick={toggleDayType}
      >
        {isTrainingDay ? "Training Day" : "Rest Day"}
      </Button>
      <div className="time-slots-grid" ref={scrollRef}>
        {isTrainingDay && timeSlots.map((slot, index) => (
          <div key={index} className="time-slot" onClick={() => handleRowClick(slot)}>
            {slot}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrainingDayColumn;
