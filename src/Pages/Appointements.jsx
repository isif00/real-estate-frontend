import { useState, useEffect } from "react";
import { AppointmentCard } from "../components/Appointment/Appointment";
import axios from "axios";
import "./Client.css";

export default function Appointments() {
  const baseUrl = import.meta.env.VITE_HOST_URL;
  const [appointments, setAppointments] = useState([]);
  const [clientDetails, setClientDetails] = useState({});

  useEffect(() => {
    axios
      .get(`${baseUrl}/api/v1/appointment/all`)
      .then((response) => {
        setAppointments(response.data);
        console.log(response.data);
        const clientIds = [
          ...new Set(response.data.map((appointment) => appointment.clientId)),
        ];
        clientIds.forEach((clientId) => {
          axios
            .get(`${baseUrl}/api/v1/client/get-client/${clientId}`)
            .then((response) => {
              setClientDetails((prevState) => ({
                ...prevState,
                [clientId]: {
                  name: response.data.name,
                  email: response.data.email,
                  phone: response.data.phone,
                },
              }));
            })
            .catch((error) => {
              console.error("Error fetching client details:", error);
            });
        });
      })
      .catch((error) => {
        console.error("Error fetching appointments:", error);
      });
  }, [baseUrl]);

  return (
    <div className="client-container mx-8 mt-10 gap-6 flex text-black">
      {appointments.map((appointment) => (
        <AppointmentCard
          id={appointment.id}
          key={appointment.id}
          clientId={clientDetails[appointment.clientId]}
          clientName={clientDetails[appointment.clientId]?.name}
          clientEmail={clientDetails[appointment.clientId]?.email}
          clientPhoneNumber={clientDetails[appointment.clientId]?.phone}
          date={appointment.date}
        />
      ))}
    </div>
  );
}
