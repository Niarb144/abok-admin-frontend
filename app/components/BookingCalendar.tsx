import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";

export default function BookingCalendar({ bookings }: any) {
  const bookedDates = bookings.map((b: any) =>
    new Date(b.travelDate).toDateString()
  );

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const selectedBookings = bookings.filter(
    (b: any) =>
        new Date(b.travelDate).toDateString() ===
        selectedDate?.toDateString()
    );

    <Calendar
    onClickDay={(value) => setSelectedDate(value)}
    />

  return (
    <Calendar
        tileClassName={({ date }) => {
            const d = date.toDateString();
            const today = new Date().toDateString();

            if (bookedDates.includes(d)) {
            return "bg-red-500 text-white rounded-full";
            }

            if (d === today) {
            return "border-2 border-amber-600 rounded-full";
            }

            return "text-gray-600";
        }}

        
    />
    
    
  );
}