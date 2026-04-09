import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function BookingCalendar({ bookings }: any) {
  const bookedDates = bookings.map((b: any) =>
    new Date(b.travelDate).toDateString()
  );

  return (
    <Calendar
      tileClassName={({ date }) => {
        const d = date.toDateString();
        if (bookedDates.includes(d)) {
          return "bg-gray-600 text-blue-700 rounded-full";
        }
        else {    
          return "text-gray-600";
        }
      }}
    />
  );
}