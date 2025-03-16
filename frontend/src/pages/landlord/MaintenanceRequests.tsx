"use client"

import { useState } from "react"
import { Tool, CheckCircle, Clock, AlertTriangle, MessageSquare, User, Calendar, Home } from "react-feather"
import { toast } from "react-hot-toast"

// Mock data
const maintenanceRequests = [
  {
    id: 1,
    title: "Leaking Faucet",
    description: "The kitchen faucet is leaking and causing water damage to the cabinet below.",
    property: "Luxury Apartment",
    tenant: "Jane Smith",
    status: "pending",
    priority: "medium",
    date: "2023-07-20",
    images: ["/placeholder.svg?height=200&width=300"],
    messages: [
      { id: 1, sender: "Jane Smith", message: "The leak is getting worse, please fix it soon.", date: "2023-07-21" },
    ],
  },
  {
    id: 2,
    title: "AC Not Working",
    description: "The air conditioner in the master bedroom is not cooling properly.",
    property: "Villa with Garden",
    tenant: "Robert Brown",
    status: "in_progress",
    priority: "high",
    date: "2023-07-18",
    assignedTo: "ABC Repairs",
    scheduledDate: "2023-07-25",
    images: ["/placeholder.svg?height=200&width=300"],
    messages: [
      {
        id: 1,
        sender: "Robert Brown",
        message: "It's very hot, please fix it as soon as possible.",
        date: "2023-07-18",
      },
      { id: 2, sender: "John Doe", message: "We've scheduled a technician to visit on July 25th.", date: "2023-07-19" },
    ],
  },
  {
    id: 3,
    title: "Broken Window",
    description: "The window in the living room is broken and needs to be replaced.",
    property: "Office Space",
    tenant: "Michael Wilson",
    status: "resolved",
    priority: "high",
    date: "2023-07-15",
    resolvedDate: "2023-07-17",
    cost: 2500,
    images: ["/placeholder.svg?height=200&width=300"],
    messages: [
      { id: 1, sender: "Michael Wilson", message: "The window is completely shattered.", date: "2023-07-15" },
      { id: 2, sender: "John Doe", message: "We'll send someone to fix it today.", date: "2023-07-15" },
      { id: 3, sender: "John Doe", message: "The window has been replaced.", date: "2023-07-17" },
    ],
  },
  {
    id: 4,
    title: "Electrical Issue",
    description: "The power keeps tripping in the kitchen when using multiple appliances.",
    property: "Modern Apartment",
    tenant: "Alice Johnson",
    status: "pending",
    priority: "high",
    date: "2023-07-22",
    images: ["/placeholder.svg?height=200&width=300"],
    messages: [],
  },
  {
    id: 5,
    title: "Plumbing Blockage",
    description: "The bathroom sink is clogged and draining very slowly.",
    property: "Luxury Apartment",
    tenant: "Jane Smith",
    status: "resolved",
    priority: "medium",
    date: "2023-07-10",
    resolvedDate: "2023-07-12",
    cost: 1200,
    images: ["/placeholder.svg?height=200&width=300"],
    messages: [
      { id: 1, sender: "Jane Smith", message: "The sink is completely clogged.", date: "2023-07-10" },
      { id: 2, sender: "John Doe", message: "A plumber will visit tomorrow.", date: "2023-07-11" },
      { id: 3, sender: "John Doe", message: "The issue has been fixed.", date: "2023-07-12" },
    ],
  },
]

const MaintenanceRequests = () => {
  const [activeTab, setActiveTab] = useState("all")
  const [selectedRequest, setSelectedRequest] = useState<number | null>(null)
  const [newMessage, setNewMessage] = useState("")

  const filteredRequests = maintenanceRequests.filter((request) => {
    if (activeTab === "all") return true
    return request.status === activeTab
  })

  const handleStatusChange = (id: number, status: string) => {
    toast.success(`Request status updated to ${status}`)
    // In a real app, this would update the request status
  }

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    toast.success("Message sent successfully")
    setNewMessage("")
    // In a real app, this would add the message to the request
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Maintenance Requests</h1>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                <Tool className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Requests</dt>
                  <dd className="text-lg font-semibold text-gray-900">{maintenanceRequests.length}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Pending</dt>
                  <dd className="text-lg font-semibold text-gray-900">
                    {maintenanceRequests.filter((r) => r.status === "pending").length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-orange-500 rounded-md p-3">
                <AlertTriangle className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">In Progress</dt>
                  <dd className="text-lg font-semibold text-gray-900">
                    {maintenanceRequests.filter((r) => r.status === "in_progress").length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Resolved</dt>
                  <dd className="text-lg font-semibold text-gray-900">
                    {maintenanceRequests.filter((r) => r.status === "resolved").length}
                  </dd>
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
              onClick={() => setActiveTab("all")}
              className={`${
                activeTab === "all"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              All Requests
              <span className="ml-2 py-0.5 px-2.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                {maintenanceRequests.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab("pending")}
              className={`${
                activeTab === "pending"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Pending
              <span className="ml-2 py-0.5 px-2.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                {maintenanceRequests.filter((r) => r.status === "pending").length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab("in_progress")}
              className={`${
                activeTab === "in_progress"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              In Progress
              <span className="ml-2 py-0.5 px-2.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                {maintenanceRequests.filter((r) => r.status === "in_progress").length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab("resolved")}
              className={`${
                activeTab === "resolved"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Resolved
              <span className="ml-2 py-0.5 px-2.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {maintenanceRequests.filter((r) => r.status === "resolved").length}
              </span>
            </button>
          </nav>
        </div>

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
                        Request
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Property & Tenant
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Priority
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Date
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredRequests.map((request) => (
                      <tr key={request.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{request.title}</div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">{request.description}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{request.property}</div>
                          <div className="text-sm text-gray-500">{request.tenant}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              request.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : request.status === "in_progress"
                                  ? "bg-orange-100 text-orange-800"
                                  : "bg-green-100 text-green-800"
                            }`}
                          >
                            {request.status === "pending"
                              ? "Pending"
                              : request.status === "in_progress"
                                ? "In Progress"
                                : "Resolved"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              request.priority === "high"
                                ? "bg-red-100 text-red-800"
                                : request.priority === "medium"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {request.priority.charAt(0).toUpperCase() + request.priority.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(request.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => setSelectedRequest(request.id)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            View Details
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
      </div>

      {selectedRequest && (
        <div className="fixed inset-0 overflow-y-auto z-50">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
              {maintenanceRequests
                .filter((r) => r.id === selectedRequest)
                .map((request) => (
                  <div key={request.id}>
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                          <div className="flex justify-between items-start">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">{request.title}</h3>
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                request.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : request.status === "in_progress"
                                    ? "bg-orange-100 text-orange-800"
                                    : "bg-green-100 text-green-800"
                              }`}
                            >
                              {request.status === "pending"
                                ? "Pending"
                                : request.status === "in_progress"
                                  ? "In Progress"
                                  : "Resolved"}
                            </span>
                          </div>
                          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <div className="mb-4">
                                <h4 className="text-sm font-medium text-gray-500">Description</h4>
                                <p className="mt-1 text-sm text-gray-900">{request.description}</p>
                              </div>
                              <div className="mb-4">
                                <h4 className="text-sm font-medium text-gray-500">Property & Tenant</h4>
                                <div className="mt-1 flex items-center">
                                  <User className="h-4 w-4 text-gray-400 mr-1" />
                                  <p className="text-sm text-gray-900">{request.tenant}</p>
                                </div>
                                <div className="mt-1 flex items-center">
                                  <Home className="h-4 w-4 text-gray-400 mr-1" />
                                  <p className="text-sm text-gray-900">{request.property}</p>
                                </div>
                              </div>
                              <div className="mb-4">
                                <h4 className="text-sm font-medium text-gray-500">Details</h4>
                                <div className="mt-1 grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-xs text-gray-500">Date Reported</p>
                                    <div className="flex items-center">
                                      <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                                      <p className="text-sm text-gray-900">
                                        {new Date(request.date).toLocaleDateString()}
                                      </p>
                                    </div>
                                  </div>
                                  <div>
                                    <p className="text-xs text-gray-500">Priority</p>
                                    <span
                                      className={`mt-1 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        request.priority === "high"
                                          ? "bg-red-100 text-red-800"
                                          : request.priority === "medium"
                                            ? "bg-yellow-100 text-yellow-800"
                                            : "bg-blue-100 text-blue-800"
                                      }`}
                                    >
                                      {request.priority.charAt(0).toUpperCase() + request.priority.slice(1)}
                                    </span>
                                  </div>
                                  {request.status === "in_progress" && (
                                    <>
                                      <div>
                                        <p className="text-xs text-gray-500">Assigned To</p>
                                        <p className="text-sm text-gray-900">{request.assignedTo}</p>
                                      </div>
                                      <div>
                                        <p className="text-xs text-gray-500">Scheduled Date</p>
                                        <p className="text-sm text-gray-900">
                                          {new Date(request.scheduledDate!).toLocaleDateString()}
                                        </p>
                                      </div>
                                    </>
                                  )}
                                  {request.status === "resolved" && (
                                    <>
                                      <div>
                                        <p className="text-xs text-gray-500">Resolved Date</p>
                                        <p className="text-sm text-gray-900">
                                          {new Date(request.resolvedDate!).toLocaleDateString()}
                                        </p>
                                      </div>
                                      <div>
                                        <p className="text-xs text-gray-500">Cost</p>
                                        <p className="text-sm text-gray-900">₹{request.cost}</p>
                                      </div>
                                    </>
                                  )}
                                </div>
                              </div>
                              {request.images && request.images.length > 0 && (
                                <div className="mb-4">
                                  <h4 className="text-sm font-medium text-gray-500">Images</h4>
                                  <div className="mt-2 grid grid-cols-2 gap-2">
                                    {request.images.map((image, index) => (
                                      <img
                                        key={index}
                                        src={image || "/placeholder.svg"}
                                        alt={`Request ${index + 1}`}
                                        className="h-24 w-full object-cover rounded"
                                      />
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                            <div>
                              <div className="mb-4">
                                <h4 className="text-sm font-medium text-gray-500">Communication</h4>
                                <div className="mt-2 bg-gray-50 rounded-lg p-4 h-64 overflow-y-auto">
                                  {request.messages.length > 0 ? (
                                    <div className="space-y-4">
                                      {request.messages.map((message) => (
                                        <div key={message.id} className="flex">
                                          <div className="flex-shrink-0 mr-3">
                                            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                                              <User className="h-4 w-4 text-gray-500" />
                                            </div>
                                          </div>
                                          <div className="flex-1 bg-white rounded-lg px-4 py-2 shadow-sm">
                                            <div className="flex items-center justify-between">
                                              <span className="text-sm font-medium text-gray-900">
                                                {message.sender}
                                              </span>
                                              <span className="text-xs text-gray-500">
                                                {new Date(message.date).toLocaleString()}
                                              </span>
                                            </div>
                                            <p className="text-sm text-gray-700 mt-1">{message.message}</p>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  ) : (
                                    <div className="flex flex-col items-center justify-center h-full">
                                      <MessageSquare className="h-8 w-8 text-gray-400" />
                                      <p className="mt-2 text-sm text-gray-500">No messages yet</p>
                                    </div>
                                  )}
                                </div>
                                <div className="mt-4">
                                  <div className="flex">
                                    <input
                                      type="text"
                                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                      placeholder="Type a message..."
                                      value={newMessage}
                                      onChange={(e) => setNewMessage(e.target.value)}
                                    />
                                    <button
                                      type="button"
                                      className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                                      onClick={handleSendMessage}
                                    >
                                      Send
                                    </button>
                                  </div>
                                </div>
                              </div>
                              {request.status !== "resolved" && (
                                <div className="mb-4">
                                  <h4 className="text-sm font-medium text-gray-500">Actions</h4>
                                  <div className="mt-2 space-y-3">
                                    {request.status === "pending" && (
                                      <button
                                        type="button"
                                        className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                                        onClick={() => handleStatusChange(request.id, "in_progress")}
                                      >
                                        <Clock className="mr-2 h-4 w-4" />
                                        Mark as In Progress
                                      </button>
                                    )}
                                    {request.status === "in_progress" && (
                                      <button
                                        type="button"
                                        className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
                                        onClick={() => handleStatusChange(request.id, "resolved")}
                                      >
                                        <CheckCircle className="mr-2 h-4 w-4" />
                                        Mark as Resolved
                                      </button>
                                    )}
                                    <button
                                      type="button"
                                      className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50"
                                    >
                                      <Calendar className="mr-2 h-4 w-4" />
                                      Schedule Maintenance
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                      <button
                        type="button"
                        onClick={() => setSelectedRequest(null)}
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MaintenanceRequests

