import { useParams } from "react-router-dom";
import "./DoctorSchedule.css";
import { useQuery } from "react-query";
import axios from "axios";

const DoctorsSchedules = () => {
  const { doctor_Name } = useParams();

  const { data, isLoading, error } = useQuery("doctors", async () => {
    const response = await axios.get("http://localhost:8000/get-doctors");
    return response.data?.data || [];
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>An error has occurred: {error.message}</p>;

  const doctor = data?.find((doc) => doc.DoctorName === doctor_Name);

  return (
    <div className="schedules-container">
      <div className="headerimg">
        <div className="dpage">Doctors Schedules</div>
      </div>

      <div className="schedules">
        {doctor ? (
          <div className="selecteddoctor">
            <h1>{doctor.DoctorName}</h1>
            <h5>View Profile</h5>
          </div>
        ) : (
          <p>No doctor found with the given name.</p>
        )}
        <div className="scheduledetails">
          {doctor?.schedule?.available_days?.length > 0 && (
            <table>
              <thead>
                <tr>
                  <th className="day">Available Days</th>
                  <th>Time Slots</th>
                </tr>
              </thead>
              <tbody>
                {doctor.schedule.available_days.map((day, index) => (
                  <tr key={index}>
                    <td>{day}</td>
                    <td>
                      {doctor.schedule.time_slots.length > 0
                        ? doctor.schedule.time_slots.join(",")
                        : "No slots available"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorsSchedules;
