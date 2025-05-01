
import { Calendar, CheckSquare, Clock, Users } from 'lucide-react';

export function ReceptionistDashboard() {
  const today = new Date();
  const dateFormatted = today.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  const appointments = [
    { time: '09:00 AM', patient: 'John Smith', doctor: 'Dr. Williams', status: 'Checked In' },
    { time: '10:30 AM', patient: 'Emily Johnson', doctor: 'Dr. Taylor', status: 'Scheduled' },
    { time: '11:15 AM', patient: 'David Wilson', doctor: 'Dr. Roberts', status: 'Scheduled' },
    { time: '12:00 PM', patient: 'Michael Brown', doctor: 'Dr. Williams', status: 'Cancelled' },
    { time: '02:00 PM', patient: 'Lisa Anderson', doctor: 'Dr. Taylor', status: 'Scheduled' },
    { time: '03:30 PM', patient: 'Robert Thomas', doctor: 'Dr. Roberts', status: 'Scheduled' },
  ];

  const stats = [
    { name: 'Total Appointments', value: '24', icon: Calendar },
    { name: 'Checked In', value: '7', icon: CheckSquare },
    { name: 'Waiting', value: '3', icon: Clock },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between space-y-2 md:flex-row md:items-center md:space-y-0">
        <h1 className="text-2xl font-bold tracking-tight">Receptionist Dashboard</h1>
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

      <div className="overflow-hidden bg-white rounded-lg shadow">
        <div className="px-6 py-5 border-b">
          <h3 className="text-lg font-medium">Today's Schedule</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Time
                </th>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Patient
                </th>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Doctor
                </th>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {appointments.map((appointment, i) => (
                <tr key={i}>
                  <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                    {appointment.time}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                    {appointment.patient}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                    {appointment.doctor}
                  </td>
                  <td className="px-6 py-4 text-sm whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      appointment.status === 'Checked In' ? 'bg-green-100 text-green-800' :
                      appointment.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {appointment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button className="text-xs text-medical-600 hover:text-medical-900">
                        Check In
                      </button>
                      <button className="text-xs text-gray-600 hover:text-gray-900">
                        Edit
                      </button>
                      <button className="text-xs text-red-600 hover:text-red-900">
                        Cancel
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="mb-4 text-lg font-medium">Quick Actions</h3>
          <div className="grid gap-3 grid-cols-2">
            <button className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-medical-600 rounded-md hover:bg-medical-700">
              <Calendar className="w-4 h-4 mr-2" />
              New Appointment
            </button>
            <button className="flex items-center justify-center px-4 py-2 text-sm font-medium text-medical-700 bg-medical-100 rounded-md hover:bg-medical-200">
              <Users className="w-4 h-4 mr-2" />
              Register Patient
            </button>
            <button className="flex items-center justify-center px-4 py-2 text-sm font-medium text-medical-700 bg-medical-100 rounded-md hover:bg-medical-200">
              <CheckSquare className="w-4 h-4 mr-2" />
              Check In Patient
            </button>
            <button className="flex items-center justify-center px-4 py-2 text-sm font-medium text-medical-700 bg-medical-100 rounded-md hover:bg-medical-200">
              <Clock className="w-4 h-4 mr-2" />
              View Schedule
            </button>
          </div>
        </div>
        
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="mb-4 text-lg font-medium">Messages</h3>
          <div className="space-y-4">
            <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-md">
              <p className="text-sm font-medium text-yellow-800">Dr. Taylor is running 20 minutes behind schedule</p>
              <p className="text-xs text-yellow-600">Please inform patients</p>
            </div>
            <div className="p-3 bg-blue-50 border-l-4 border-blue-400 rounded-r-md">
              <p className="text-sm font-medium text-blue-800">New lab results have arrived</p>
              <p className="text-xs text-blue-600">For patient Emily Johnson</p>
            </div>
            <div className="p-3 bg-green-50 border-l-4 border-green-400 rounded-r-md">
              <p className="text-sm font-medium text-green-800">Staff meeting at 5:00 PM</p>
              <p className="text-xs text-green-600">Conference Room B</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
