import { useState, useEffect } from "react";
import { AppointmentCard } from "../components/Appointment/Appointment";
import axios from "axios";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

export default function Appointments() {
  const baseUrl = import.meta.env.VITE_HOST_URL;
  const [appointments, setAppointments] = useState([]);
  const [clientDetails, setClientDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${baseUrl}/api/v1/appointment/all`)
      .then((response) => {
        setAppointments(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching appointments:", error);
      });
  }, [baseUrl]);

  return (

    <div className="flex flex-col h-full overflow-hidden">
      <div className="py-4 mb-4 w-[1250px] border-b  border-zinc-200 flex items-center">
        <p className=" mx-8 text-3xl ">Appointments</p>
      </div>
      <div className=" flex mx-8 gap-5">
        {loading && (
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        )}
        {appointments.map((appointment) => (
          <AppointmentCard
            id={appointment.id}
            key={appointment.id}
            clientName={appointment.client.name}
            clientEmail={appointment.client.email}
            clientPhoneNumber={appointment.client.phone}
            date={appointment.date}
          />
        ))}
      </div>

    </div>
  );
}
