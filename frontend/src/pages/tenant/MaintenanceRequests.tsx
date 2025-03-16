"use client"

import type React from "react"

import { useState } from "react"
import { Tool, CheckCircle, Clock, MessageSquare, Camera, Plus } from "react-feather"
import { toast } from "react-hot-toast"

// Mock data
const maintenanceRequests = [
  {
    id: 1,
    title: "Leaking Faucet",
    description: "The kitchen faucet is leaking and causing water damage to the cabinet below.",
    property: "Luxury Apartment",
    status: "pending",
    priority: "medium",
    date: "2023-07-20",
    images: ["/placeholder.svg?height=200&width=300"],
    messages: [
      { id: 1, sender: "Jane Smith", message: "The leak is getting worse, please fix it soon.", date: "2023-07-21" },
      { id: 2, sender: "John Doe", message: "We'll send someone to check it tomorrow.", date: "2023-07-21" },
    ],
  },
  {
    id: 2,
    title: "AC Not Working",
    description: "The air conditioner in the master bedroom is not cooling properly.",
    property: "Luxury Apartment",
    status: "in_progress",
    priority: "high",
    date: "2023-07-18",
    assignedTo: "ABC Repairs",
    scheduledDate: "2023-07-25",
    images: ["/placeholder.svg?height=200&width=300"],
    messages: [
      { id: 1, sender: "Jane Smith", message: "It's very hot, please fix it as soon as possible.", date: "2023-07-18" },
      { id: 2, sender: "John Doe", message: "We've scheduled a technician to visit on July 25th.", date: "2023-07-19" },
    ],
  },
  {
    id: 3,
    title: "Broken Window",
    description: "The window in the living room is broken and needs to be replaced.",
    property: "Luxury Apartment",
    status: "resolved",
    priority: "high",
    date: "2023-07-15",
    resolvedDate: "2023-07-17",
    images: ["/placeholder.svg?height=200&width=300"],
    messages: [
      { id: 1, sender: "Jane Smith", message: "The window is completely shattered.", date: "2023-07-15" },
      { id: 2, sender: "John Doe", message: "We'll send someone to fix it today.", date: "2023-07-15" },
      { id: 3, sender: "John Doe", message: "The window has been replaced.", date: "2023-07-17" },
    ],
  },
]

const TenantMaintenanceRequests = () => {
  const [activeTab, setActiveTab] = useState("all")
  const [selectedRequest, setSelectedRequest] = useState<number | null>(null)
  const [newMessage, setNewMessage] = useState("")
  const [showNewRequestForm, setShowNewRequestForm] = useState(false)
  const [newRequest, setNewRequest] = useState({
    title: "",
    description: "",
    priority: "medium",
    images: [] as string[],
  })

  const filteredRequests = maintenanceRequests.filter((request) => {
    if (activeTab === "all") return true
    return request.status === activeTab
  })

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    toast.success("Message sent successfully")
    setNewMessage("")
    // In a real app, this would add the message to the request
  }

  const handleSubmitNewRequest = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success("Maintenance request submitted successfully")
    setShowNewRequestForm(false)
    // In a real app, this would add the new request to the list
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Maintenance Requests</h1>
        <button
          type="button"
          onClick={() => setShowNewRequestForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Request
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-6">
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
              <div className="flex-shrink-0 bg-orange-500 rounded-md p-3">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">In Progress</dt>
                  <dd className="text-lg font-semibold text-gray-900">
                    {maintenanceRequests.filter((r) => r.status === "pending" || r.status === "in_progress").length}
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
            </button>
          </nav>
        </div>

        <div className="overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {filteredRequests.length > 0 ? (
              filteredRequests.map((request) => (
                <li key={request.id} className="px-4 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div
                        className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${
                          request.status === "pending"
                            ? "bg-yellow-100"
                            : request.status === "in_progress"
                              ? "bg-orange-100"
                              : "bg-green-100"
                        }`}
                      >
                        {request.status === "pending" && <Clock className="h-5 w-5 text-yellow-600" />}
                        {request.status === "in_progress" && <Tool className="h-5 w-5 text-orange-600" />}
                        {request.status === "resolved" && <CheckCircle className="h-5 w-5 text-green-600" />}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{request.title}</div>
                        <div className="text-sm text-gray-500">
                          Reported on {new Date(request.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full mr-4 ${
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
                      <button
                        onClick={() => setSelectedRequest(request.id)}
                        className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <li className="px-4 py-12 text-center">
                <Tool className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No maintenance requests</h3>
                <p className="mt-1 text-sm text-gray-500">Get started by creating a new request.</p>
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={() => setShowNewRequestForm(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    New Request
                  </button>
                </div>
              </li>
            )}
          </ul>
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
                                <h4 className="text-sm font-medium text-gray-500">Details</h4>
                                <div className="mt-1 grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-xs text-gray-500">Date Reported</p>
                                    <p className="text-sm text-gray-900">
                                      {new Date(request.date).toLocaleDateString()}
                                    </p>
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
                                    <div>
                                      <p className="text-xs text-gray-500">Scheduled Date</p>
                                      <p className="text-sm text-gray-900">
                                        {new Date(request.scheduledDate!).toLocaleDateString()}
                                      </p>
                                    </div>
                                  )}
                                  {request.status === "resolved" && (
                                    <div>
                                      <p className="text-xs text-gray-500">Resolved Date</p>
                                      <p className="text-sm text-gray-900">
                                        {new Date(request.resolvedDate!).toLocaleDateString()}
                                      </p>
                                    </div>
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
                                              {message.sender === "Jane Smith" ? (
                                                <span className="text-sm font-medium text-gray-700">JS</span>
                                              ) : (
                                                <span className="text-sm font-medium text-gray-700">JD</span>
                                              )}
                                            </div>
                                          </div>
                                          <div
                                            className={`flex-1 rounded-lg px-4 py-2 shadow-sm ${
                                              message.sender === "Jane Smith" ? "bg-blue-50" : "bg-white"
                                            }`}
                                          >
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
                                {request.status !== "resolved" && (
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
                                )}
                              </div>
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

      {showNewRequestForm && (
        <div className="fixed inset-0 overflow-y-auto z-50">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleSubmitNewRequest}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">New Maintenance Request</h3>
                      <div className="mt-4 space-y-4">
                        <div>
                          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Title
                          </label>
                          <input
                            type="text"
                            name="title"
                            id="title"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="Brief title of the issue"
                            value={newRequest.title}
                            onChange={(e) => setNewRequest({ ...newRequest, title: e.target.value })}
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Description
                          </label>
                          <textarea
                            id="description"
                            name="description"
                            rows={4}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="Detailed description of the issue"
                            value={newRequest.description}
                            onChange={(e) => setNewRequest({ ...newRequest, description: e.target.value })}
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
                            Priority
                          </label>
                          <select
                            id="priority"
                            name="priority"
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                            value={newRequest.priority}
                            onChange={(e) => setNewRequest({ ...newRequest, priority: e.target.value })}
                          >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Photos</label>
                          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                              <Camera className="mx-auto h-12 w-12 text-gray-400" />
                              <div className="flex text-sm text-gray-600">
                                <label
                                  htmlFor="file-upload"
                                  className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                                >
                                  <span>Upload photos</span>
                                  <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                              </div>
                              <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Submit Request
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowNewRequestForm(false)}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TenantMaintenanceRequests

