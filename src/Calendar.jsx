import React, { useState } from 'react';
import './Calendar.css';

export function OrcaCalendar() {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const findMonthDays = (year, month) => {
       return new Date(year, month + 1, 0).getDate();
    };
 
    const findFirstDay = (year, month) => {
       return new Date(year, month, 1).getDay();
    };

    const changeToPrevMonth = () => {
        setSelectedDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1));
     };
     
     const changeToNextMonth = () => {
        setSelectedDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1));
     };
     
     const handleDateClick = (date) => {
        setSelectedDate(date);
     };

     const showCalendar = () => {
        const year = selectedDate.getFullYear();
        const month = selectedDate.getMonth();
        const monthDays = findMonthDays(year, month);
        const firstDayOfWeek = findFirstDay(year, month);
     
        const days = [];
        let bool = false;
        for (let i = 0; i < firstDayOfWeek; i++) {
           days.push(<div key={`empty-${i}`} className="box empty"></div>);
        }
        for (let day = 1; day <= monthDays; day++) {
           const date = new Date(year, month, day);
           days.push(
              <div
                 key={`day-${day}`}
                 className={`box${selectedDate.getDate() === day ? '_selected' : ''}`}
                 onClick={() => handleDateClick(date)}
              >
                  {day}
              </div>
           );
        }
        return days;
     };
     
     return (
        <div>
           <div className="calendar_header">
              <button onClick={changeToPrevMonth}>Previous</button>
              <h2>{selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
              <button onClick={changeToNextMonth}>Next</button>
           </div>
           <div className="calendar_container">{showCalendar()}</div>
        </div>
     );
}

export default OrcaCalendar;
