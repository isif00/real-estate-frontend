/* eslint-disable react/prop-types */
import { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

function AddAppointmentPopup({ client, onClose }) {
    const baseUrl = import.meta.env.VITE_HOST_URL;

    const [date, setDate] = useState(null);

    const handleDateChange = (date) => {
        const formattedDate = format(date, 'yyyy-MM-dd');
        setDate(formattedDate);
        console.log(formattedDate);
    };

    const handleCreating = async () => {
        console.log(date);
        const newData = { date, client: client};
        try {
            const response = await axios.post(`${baseUrl}/api/v1/appointment/add`, newData);
            console.log('Appointment Created', response.data);
            onClose();
            return response.data;
        } catch (error) {
            console.error('Error creating Real Estate:', error);
            throw error;
        }
    };


    return (
        <div className="popup-container">
            <div className="popup-content">
                <h1>Select a Date</h1>
                <DatePicker
                    selected={date ? new Date(date) : null}
                    onChange={handleDateChange}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Select a date"
                />
                {date && (
                    <div>
                        <h2>Selected Date:</h2>
                        <p>{date}</p>
                    </div>
                )}
                <button onClick={handleCreating}>Add Appointment</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
}

export default AddAppointmentPopup;