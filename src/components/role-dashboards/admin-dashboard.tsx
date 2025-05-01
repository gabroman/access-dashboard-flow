
import { FileLineChart, Users, Settings } from 'lucide-react';

export function AdminDashboard() {
  const stats = [
    { name: 'Total Users', value: '1,284', icon: Users, color: 'bg-blue-100 text-blue-600' },
    { name: 'Active Doctors', value: '42', icon: Users, color: 'bg-green-100 text-green-600' },
    { name: 'Monthly Reports', value: '24', icon: FileLineChart, color: 'bg-purple-100 text-purple-600' },
    { name: 'System Settings', value: '16', icon: Settings, color: 'bg-amber-100 text-amber-600' },
  ];
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="p-4 bg-white rounded-lg shadow">
            <div className="flex items-center space-x-4">
              <div className={`p-2 rounded-full ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                <p className="text-2xl font-semibold">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="mb-4 text-lg font-medium">Recent Activities</h2>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-medical-500"></div>
                <p className="text-sm">
                  New user registered - {new Date().toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="mb-4 text-lg font-medium">System Health</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Server Load</span>
                <span className="text-sm font-medium">24%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-green-500 rounded-full" style={{ width: '24%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Database</span>
                <span className="text-sm font-medium">67%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-yellow-500 rounded-full" style={{ width: '67%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">API Requests</span>
                <span className="text-sm font-medium">32%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-blue-500 rounded-full" style={{ width: '32%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
