"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { DollarSign, Calendar, AlertTriangle, Download, Send, CheckCircle, Clock } from "react-feather"
import { toast } from "react-hot-toast"

// Mock data
const properties = [
  {
    id: 1,
    name: "Luxury Apartment",
    location: "Mumbai, India",
    tenant: "Jane Smith",
    rent: 25000,
    dueDate: "2023-08-05",
    status: "upcoming",
  },
  {
    id: 2,
    name: "Villa with Garden",
    location: "Bangalore, India",
    tenant: "Robert Brown",
    rent: 35000,
    dueDate: "2023-08-10",
    status: "upcoming",
  },
  {
    id: 3,
    name: "Office Space",
    location: "Delhi, India",
    tenant: "Michael Wilson",
    rent: 45000,
    dueDate: "2023-07-25",
    status: "overdue",
  },
]

const rentHistory = [
  {
    id: 1,
    property: "Luxury Apartment",
    tenant: "Jane Smith",
    amount: 25000,
    date: "2023-07-05",
    status: "paid",
  },
  {
    id: 2,
    property: "Villa with Garden",
    tenant: "Robert Brown",
    amount: 35000,
    date: "2023-07-08",
    status: "paid",
  },
  {
    id: 3,
    property: "Office Space",
    tenant: "Michael Wilson",
    amount: 45000,
    date: "2023-06-25",
    status: "paid",
  },
  {
    id: 4,
    property: "Luxury Apartment",
    tenant: "Jane Smith",
    amount: 25000,
    date: "2023-06-05",
    status: "paid",
  },
  {
    id: 5,
    property: "Villa with Garden",
    tenant: "Robert Brown",
    amount: 35000,
    date: "2023-06-10",
    status: "paid",
  },
]

const RentDashboard = () => {
  const [activeTab, setActiveTab] = useState("upcoming")

  const totalMonthlyRent = properties.reduce((sum, property) => sum + property.rent, 0)
  const overdueRent = properties.filter((p) => p.status === "overdue").reduce((sum, property) => sum + property.rent, 0)

  const handleSendReminder = (id: number) => {
    toast.success("Reminder sent successfully")
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Rent Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-6">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Monthly Rent</dt>
                  <dd className="text-lg font-semibold text-gray-900">₹{totalMonthlyRent}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Upcoming Payments</dt>
                  <dd className="text-lg font-semibold text-gray-900">
                    {properties.filter((p) => p.status === "upcoming").length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-red-500 rounded-md p-3">
                <AlertTriangle className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Overdue Payments</dt>
                  <dd className="text-lg font-semibold text-gray-900">₹{overdueRent}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`${
                activeTab === "upcoming"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Upcoming Payments
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`${
                activeTab === "history"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Payment History
            </button>
          </nav>
        </div>

        {activeTab === "upcoming" && (
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Property
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Tenant
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Amount
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Due Date
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Status
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {properties.map((property) => (
                        <tr key={property.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{property.name}</div>
                            <div className="text-sm text-gray-500">{property.location}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{property.tenant}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{property.rent}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(property.dueDate).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                property.status === "upcoming"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {property.status === "upcoming" ? "Upcoming" : "Overdue"}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => handleSendReminder(property.id)}
                              className="text-blue-600 hover:text-blue-900 mr-4"
                            >
                              <Send className="h-5 w-5" />
                            </button>
                            <Link
                              to={`/landlord/property/${property.id}`}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              View
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "history" && (
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Property
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Tenant
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Amount
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Payment Date
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Status
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {rentHistory.map((payment) => (
                        <tr key={payment.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{payment.property}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{payment.tenant}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{payment.amount}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(payment.date).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              {payment.status === "paid" ? "Paid" : "Pending"}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900">
                              <Download className="h-5 w-5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Rent Collection Settings</h3>
            <p className="mt-1 text-sm text-gray-500">Configure how you want to collect rent from your tenants.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center mb-4">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              <h4 className="text-sm font-medium text-gray-900">Automatic Reminders</h4>
            </div>
            <p className="text-sm text-gray-500 mb-4">Send automatic reminders to tenants before rent is due.</p>
            <div className="flex items-center">
              <input
                id="auto-reminders"
                name="auto-reminders"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                defaultChecked
              />
              <label htmlFor="auto-reminders" className="ml-2 block text-sm text-gray-900">
                Enable automatic reminders
              </label>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center mb-4">
              <Clock className="h-5 w-5 text-blue-500 mr-2" />
              <h4 className="text-sm font-medium text-gray-900">Grace Period</h4>
            </div>
            <p className="text-sm text-gray-500 mb-4">Set a grace period for late rent payments.</p>
            <div className="flex items-center">
              <select
                id="grace-period"
                name="grace-period"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                defaultValue="3"
              >
                <option value="0">No grace period</option>
                <option value="1">1 day</option>
                <option value="3">3 days</option>
                <option value="5">5 days</option>
                <option value="7">7 days</option>
              </select>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center mb-4">
              <DollarSign className="h-5 w-5 text-orange-500 mr-2" />
              <h4 className="text-sm font-medium text-gray-900">Late Fees</h4>
            </div>
            <p className="text-sm text-gray-500 mb-4">Configure late fees for overdue rent payments.</p>
            <div className="flex items-center">
              <input
                id="late-fees"
                name="late-fees"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                defaultChecked
              />
              <label htmlFor="late-fees" className="ml-2 block text-sm text-gray-900">
                Enable late fees
              </label>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="late-fee-amount" className="block text-sm font-medium text-gray-700">
                  Amount (₹)
                </label>
                <input
                  type="number"
                  name="late-fee-amount"
                  id="late-fee-amount"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  defaultValue="500"
                />
              </div>
              <div>
                <label htmlFor="late-fee-type" className="block text-sm font-medium text-gray-700">
                  Type
                </label>
                <select
                  id="late-fee-type"
                  name="late-fee-type"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  defaultValue="fixed"
                >
                  <option value="fixed">Fixed Amount</option>
                  <option value="percentage">Percentage of Rent</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center mb-4">
              <Send className="h-5 w-5 text-purple-500 mr-2" />
              <h4 className="text-sm font-medium text-gray-900">Payment Methods</h4>
            </div>
            <p className="text-sm text-gray-500 mb-4">Configure accepted payment methods for rent collection.</p>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  id="payment-bank"
                  name="payment-method"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  defaultChecked
                />
                <label htmlFor="payment-bank" className="ml-2 block text-sm text-gray-900">
                  Bank Transfer
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="payment-upi"
                  name="payment-method"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  defaultChecked
                />
                <label htmlFor="payment-upi" className="ml-2 block text-sm text-gray-900">
                  UPI
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="payment-card"
                  name="payment-method"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  defaultChecked
                />
                <label htmlFor="payment-card" className="ml-2 block text-sm text-gray-900">
                  Credit/Debit Card
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            onClick={() => toast.success("Settings saved successfully")}
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  )
}

export default RentDashboard

