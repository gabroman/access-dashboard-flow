
import { Calendar, FileText, MessageSquare, Pill } from 'lucide-react';

export function PatientDashboard() {
  const today = new Date();
  const dateFormatted = today.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  const appointments = [
    { date: '2025-05-15', time: '10:00 AM', doctor: 'Dr. Williams', type: 'Check-up' },
    { date: '2025-06-22', time: '02:30 PM', doctor: 'Dr. Taylor', type: 'Follow-up' }
  ];

  const medications = [
    { name: 'Amoxicillin', dosage: '500mg', frequency: 'Twice daily', remaining: '5 days' },
    { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', remaining: 'Ongoing' },
    { name: 'Ibuprofen', dosage: '400mg', frequency: 'As needed', remaining: 'As needed' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between space-y-2 md:flex-row md:items-center md:space-y-0">
        <h1 className="text-2xl font-bold tracking-tight">Patient Dashboard</h1>
        <p className="text-sm text-muted-foreground">{dateFormatted}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="p-6 bg-white rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 mr-4 bg-blue-100 rounded-full">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Next Appointment</h3>
              <p className="text-lg font-semibold">May 15, 10:00 AM</p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 mr-4 bg-green-100 rounded-full">
              <Pill className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Medications</h3>
              <p className="text-lg font-semibold">3 Active</p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 mr-4 bg-purple-100 rounded-full">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Test Results</h3>
              <p className="text-lg font-semibold">1 Pending</p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 mr-4 bg-yellow-100 rounded-full">
              <MessageSquare className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Messages</h3>
              <p className="text-lg font-semibold">2 Unread</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="overflow-hidden bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b">
            <h3 className="text-lg font-medium">Upcoming Appointments</h3>
          </div>
          {appointments.length > 0 ? (
            <div className="divide-y">
              {appointments.map((appointment, i) => (
                <div key={i} className="p-6">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium">{new Date(appointment.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                      <p className="text-sm text-gray-500">{appointment.time} - {appointment.type}</p>
                      <p className="mt-1 text-sm">{appointment.doctor}</p>
                    </div>
                    <div>
                      <button className="px-3 py-1 text-xs font-medium text-white bg-medical-600 rounded-md hover:bg-medical-700">
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center text-gray-500">
              No upcoming appointments
            </div>
          )}
          <div className="px-6 py-4 text-right bg-gray-50">
            <button className="text-sm font-medium text-medical-600 hover:text-medical-800">
              Schedule New Appointment →
            </button>
          </div>
        </div>

        <div className="overflow-hidden bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b">
            <h3 className="text-lg font-medium">Current Medications</h3>
          </div>
          <div className="divide-y">
            {medications.map((medication, i) => (
              <div key={i} className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{medication.name}</p>
                    <p className="text-sm text-gray-500">{medication.dosage} - {medication.frequency}</p>
                    <p className="mt-1 text-sm">Remaining: {medication.remaining}</p>
                  </div>
                  <div>
                    <button className="px-3 py-1 text-xs font-medium text-medical-600 border border-medical-600 rounded-md hover:bg-medical-50">
                      Refill
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="px-6 py-4 text-right bg-gray-50">
            <button className="text-sm font-medium text-medical-600 hover:text-medical-800">
              View Medication History →
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 bg-white rounded-lg shadow">
        <h3 className="mb-4 text-lg font-medium">Recent Medical Records</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-md">
            <div className="flex justify-between">
              <div>
                <p className="font-medium">Annual Physical Examination</p>
                <p className="text-sm text-gray-500">April 10, 2025</p>
              </div>
              <button className="inline-flex items-center px-3 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-md hover:bg-blue-200">
                <FileText className="w-3 h-3 mr-1" />
                View
              </button>
            </div>
          </div>
          <div className="p-4 border rounded-md">
            <div className="flex justify-between">
              <div>
                <p className="font-medium">Blood Test Results</p>
                <p className="text-sm text-gray-500">March 22, 2025</p>
              </div>
              <button className="inline-flex items-center px-3 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-md hover:bg-blue-200">
                <FileText className="w-3 h-3 mr-1" />
                View
              </button>
            </div>
          </div>
          <div className="p-4 border rounded-md">
            <div className="flex justify-between">
              <div>
                <p className="font-medium">Vaccination Record</p>
                <p className="text-sm text-gray-500">February 15, 2025</p>
              </div>
              <button className="inline-flex items-center px-3 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-md hover:bg-blue-200">
                <FileText className="w-3 h-3 mr-1" />
                View
              </button>
            </div>
          </div>
        </div>
        <div className="mt-4 text-right">
          <button className="text-sm font-medium text-medical-600 hover:text-medical-800">
            View All Medical Records →
          </button>
        </div>
      </div>
    </div>
  );
}
