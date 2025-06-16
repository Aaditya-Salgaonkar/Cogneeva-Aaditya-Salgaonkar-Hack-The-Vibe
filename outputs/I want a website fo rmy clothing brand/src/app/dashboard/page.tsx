import React from 'react';
import RevenueCard from './RevenueCard';
import NewUsersCard from './NewUsersCard';
import ActiveSubscriptionsCard from './ActiveSubscriptionsCard';
import RecentActivityTable from './RecentActivityTable';
import ChartsPlaceholder from './ChartsPlaceholder';

function Dashboard() {
  return (
    <div className="flex flex-col lg:flex-row justify-between space-y-4 lg:space-y-0 lg:space-x-4 p-4">
      <RevenueCard />
      <NewUsersCard />
      <ActiveSubscriptionsCard />
      <div className="w-full lg:w-3/4">
        <RecentActivityTable />
      </div>
      <div className="w-full lg:w-1/4">
        <ChartsPlaceholder />
      </div>
    </div>
  );
}

export default Dashboard;

// RevenueCard.js
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Jan', Revenue: 1200 },
  { name: 'Feb', Revenue: 2100 },
  { name: 'Mar', Revenue: 800 },
  { name: 'Apr', Revenue: 1600 },
  { name: 'May', Revenue: 2400 },
  { name: 'Jun', Revenue: 2000 },
  { name: 'Jul', Revenue: 1900 },
  { name: 'Aug', Revenue: 2200 },
  { name: 'Sep', Revenue: 2800 },
  { name: 'Oct', Revenue: 2500 },
  { name: 'Nov', Revenue: 2700 },
  { name: 'Dec', Revenue: 3000 },
];

function RevenueCard() {
  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-2xl font-semibold text-gray-800">Revenue</h2>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Revenue" fill="#8884d8" />
      </BarChart>
    </div>
  );
}

export default RevenueCard;

// NewUsersCard.js
import React from 'react';

function NewUsersCard() {
  const usersData = [
    { name: 'Jan', Users: 120 },
    { name: 'Feb', Users: 210 },
    { name: 'Mar', Users: 80 },
    { name: 'Apr', Users: 160 },
    { name: 'May', Users: 240 },
    { name: 'Jun', Users: 200 },
    { name: 'Jul', Users: 190 },
    { name: 'Aug', Users: 220 },
    { name: 'Sep', Users: 280 },
    { name: 'Oct', Users: 250 },
    { name: 'Nov', Users: 270 },
    { name: 'Dec', Users: 300 },
  ];

  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-2xl font-semibold text-gray-800">New Users</h2>
      <BarChart
        width={500}
        height={300}
        data={usersData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Users" fill="#82ca9d" />
      </BarChart>
    </div>
  );
}

export default NewUsersCard;

// ActiveSubscriptionsCard.js
import React from 'react';

function ActiveSubscriptionsCard() {
  const subscriptionsData = [
    { name: 'Jan', Subscriptions: 120 },
    { name: 'Feb', Subscriptions: 210 },
    { name: 'Mar', Subscriptions: 80 },
    { name