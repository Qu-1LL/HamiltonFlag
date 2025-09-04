
import '../styles/timeCard.css'

import { useState } from 'react'

export default function TimeCard ({ date, toggleSched, availability }) {

    let months = {1:'Jan',2:'Feb',3:'Mar',4:'Apr',5:'May',6:'Jun',7:'July',8:'Aug',9:'Sep',10:'Oct',11:'Nov',12:'Dec'}

    return (
        <div className="day-sched">
            <div className="day-label">
                <h3>{months[date.getMonth() + 1]}  {date.getDate()}</h3>
            </div>
            <div className="day-games">
                {[18, 19, 20, 21].map((time) => {
                    
                    if (date.getTime() in availability == false) {
                        availability[date.getTime()] = {18: false, 19: false, 20: false, 21: false}
                    }

                    return (
                        <label
                            key={time}
                            className="rect-checkbox"
                        >
                            <input 
                                type="checkbox" 
                                defaultChecked={availability[date.getTime()][time]}
                                onChange={e => {
                                    e.stopPropagation();
                                    toggleSched(date, time);
                                }}
                            />
                            <div className="rect-fill">
                                <div className="sched-info">
                                    <div className="sched-time">{time-12}:00 PM</div>
                                </div>
                            </div>
                        </label>
                    )
                })}
            </div>
        </div>
    );
}