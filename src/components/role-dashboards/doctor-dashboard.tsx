
import { Calendar, Clock, Users } from 'lucide-react';

export function DoctorDashboard() {
  const today = new Date();
  const dateFormatted = today.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  
  const appointments = [
    { time: '09:00 AM', patient: 'John Smith', type: 'Check-up', status: 'Scheduled' },
    { time: '10:30 AM', patient: 'Emily Johnson', type: 'Follow-up', status: 'Confirmed' },
    { time: '12:00 PM', patient: 'Michael Brown', type: 'Consultation', status: 'Waiting' },
    { time: '02:30 PM', patient: 'Sarah Davis', type: 'Treatment', status: 'Confirmed' },
    { time: '04:00 PM', patient: 'Robert Wilson', type: 'Check-up', status: 'Scheduled' },
  ];
  
  const stats = [
    { name: 'Patients Today', value: '8', icon: Users },
    { name: 'Upcoming', value: '3', icon: Calendar },
    { name: 'Hours', value: '6.5', icon: Clock },
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between space-y-2 md:flex-row md:items-center md:space-y-0">
        <h1 className="text-2xl font-bold tracking-tight">Doctor Dashboard</h1>
        <p className="text-sm text-muted-foreground">{dateFormatted}</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.name} className="flex items-center p-4 bg-white rounded-lg shadow">
            <div className="mr-4 bg-medical-100 p-2.5 rounded-full">
              <stat.icon className="w-5 h-5 text-medical-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.name}</p>
              <p className="text-2xl font-semibold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        <div className="col-span-2 overflow-hidden bg-white rounded-lg shadow">
          <div className="px-6 py-5 border-b">
            <h3 className="text-lg font-medium">Today's Appointments</h3>
          </div>
          <div className="divide-y">
            {appointments.map((appointment, i) => (
              <div key={i} className="grid grid-cols-4 px-6 py-4">
                <div className="text-sm font-medium">{appointment.time}</div>
                <div className="text-sm">{appointment.patient}</div>
                <div className="text-sm text-gray-500">{appointment.type}</div>
                <div className="text-sm">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    appointment.status === 'Waiting' ? 'bg-yellow-100 text-yellow-800' :
                    appointment.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {appointment.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-5 border-b">
            <h3 className="text-lg font-medium">Notifications</h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">Patient Record Updated</p>
              <p className="text-xs text-gray-500">The medical records for Emily Johnson have been updated with new test results.</p>
              <p className="text-xs text-muted-foreground">10 minutes ago</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">New Appointment Request</p>
              <p className="text-xs text-gray-500">Michael Brown has requested a follow-up appointment for next week.</p>
              <p className="text-xs text-muted-foreground">1 hour ago</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Meeting Reminder</p>
              <p className="text-xs text-gray-500">Staff meeting at 5:00 PM in Conference Room B.</p>
              <p className="text-xs text-muted-foreground">2 hours ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
