"use client"

import { useState } from "react"
import { User, Check, X, Eye, Download, Star } from "react-feather"
import { toast } from "react-hot-toast"

// Mock data
const applications = [
  {
    id: 1,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+91 9876543210",
    occupation: "Software Engineer",
    income: "1200000",
    property: "Luxury Apartment",
    status: "pending",
    date: "2023-07-20",
    creditScore: 750,
    backgroundCheck: "passed",
    documents: ["ID Proof", "Income Proof", "Employment Certificate"],
    references: ["John Doe", "Sarah Johnson"],
  },
  {
    id: 2,
    name: "Robert Brown",
    email: "robert.brown@example.com",
    phone: "+91 9876543211",
    occupation: "Marketing Manager",
    income: "950000",
    property: "Villa with Garden",
    status: "approved",
    date: "2023-07-15",
    creditScore: 780,
    backgroundCheck: "passed",
    documents: ["ID Proof", "Income Proof", "Employment Certificate"],
    references: ["Michael Wilson", "Emily Davis"],
  },
  {
    id: 3,
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    phone: "+91 9876543212",
    occupation: "Doctor",
    income: "1800000",
    property: "Office Space",
    status: "rejected",
    date: "2023-07-10",
    creditScore: 620,
    backgroundCheck: "failed",
    documents: ["ID Proof", "Income Proof"],
    references: ["David Lee", "Susan Miller"],
  },
  {
    id: 4,
    name: "Michael Wilson",
    email: "michael.wilson@example.com",
    phone: "+91 9876543213",
    occupation: "Business Analyst",
    income: "1100000",
    property: "Modern Apartment",
    status: "pending",
    date: "2023-07-18",
    creditScore: 710,
    backgroundCheck: "passed",
    documents: ["ID Proof", "Income Proof", "Employment Certificate"],
    references: ["Robert Brown", "Jane Smith"],
  },
]

const TenantApplications = () => {
  const [activeTab, setActiveTab] = useState("all")
  const [selectedApplication, setSelectedApplication] = useState<number | null>(null)

  const filteredApplications = applications.filter((app) => {
    if (activeTab === "all") return true
    return app.status === activeTab
  })

  const handleApprove = (id: number) => {
    toast.success("Application approved successfully")
    // In a real app, this would update the application status
  }

  const handleReject = (id: number) => {
    toast.success("Application rejected successfully")
    // In a real app, this would update the application status
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Tenant Applications</h1>
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
              All Applications
              <span className="ml-2 py-0.5 px-2.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                {applications.length}
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
                {applications.filter((app) => app.status === "pending").length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab("approved")}
              className={`${
                activeTab === "approved"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Approved
              <span className="ml-2 py-0.5 px-2.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {applications.filter((app) => app.status === "approved").length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab("rejected")}
              className={`${
                activeTab === "rejected"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Rejected
              <span className="ml-2 py-0.5 px-2.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                {applications.filter((app) => app.status === "rejected").length}
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
                        Applicant
                      </th>
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
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Credit Score
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredApplications.map((application) => (
                      <tr key={application.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                              <User className="h-6 w-6 text-gray-500" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{application.name}</div>
                              <div className="text-sm text-gray-500">{application.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{application.property}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              application.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : application.status === "approved"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(application.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div
                              className={`text-sm font-medium ${
                                application.creditScore >= 700
                                  ? "text-green-600"
                                  : application.creditScore >= 650
                                    ? "text-yellow-600"
                                    : "text-red-600"
                              }`}
                            >
                              {application.creditScore}
                            </div>
                            <div className="ml-2 flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`h-4 w-4 ${
                                    application.creditScore >= 700
                                      ? "text-green-400"
                                      : application.creditScore >= 650
                                        ? "text-yellow-400"
                                        : "text-red-400"
                                  } ${star > Math.floor(application.creditScore / 150) && "text-gray-300"}`}
                                  fill={star <= Math.floor(application.creditScore / 150) ? "currentColor" : "none"}
                                />
                              ))}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-3">
                            <button
                              onClick={() => setSelectedApplication(application.id)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              <Eye className="h-5 w-5" />
                            </button>
                            {application.status === "pending" && (
                              <>
                                <button
                                  onClick={() => handleApprove(application.id)}
                                  className="text-green-600 hover:text-green-900"
                                >
                                  <Check className="h-5 w-5" />
                                </button>
                                <button
                                  onClick={() => handleReject(application.id)}
                                  className="text-red-600 hover:text-red-900"
                                >
                                  <X className="h-5 w-5" />
                                </button>
                              </>
                            )}
                          </div>
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

      {selectedApplication && (
        <div className="fixed inset-0 overflow-y-auto z-50">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Application Details</h3>
                    <div className="mt-4">
                      {applications
                        .filter((app) => app.id === selectedApplication)
                        .map((application) => (
                          <div key={application.id} className="space-y-4">
                            <div>
                              <h4 className="text-sm font-medium text-gray-500">Personal Information</h4>
                              <div className="mt-2 grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-xs text-gray-500">Name</p>
                                  <p className="text-sm font-medium">{application.name}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500">Email</p>
                                  <p className="text-sm font-medium">{application.email}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500">Phone</p>
                                  <p className="text-sm font-medium">{application.phone}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500">Occupation</p>
                                  <p className="text-sm font-medium">{application.occupation}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500">Annual Income</p>
                                  <p className="text-sm font-medium">
                                    ₹{Number.parseInt(application.income).toLocaleString()}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-gray-500">Background Check</h4>
                              <div className="mt-2 grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-xs text-gray-500">Credit Score</p>
                                  <p
                                    className={`text-sm font-medium ${
                                      application.creditScore >= 700
                                        ? "text-green-600"
                                        : application.creditScore >= 650
                                          ? "text-yellow-600"
                                          : "text-red-600"
                                    }`}
                                  >
                                    {application.creditScore}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500">Background Check</p>
                                  <p
                                    className={`text-sm font-medium ${
                                      application.backgroundCheck === "passed" ? "text-green-600" : "text-red-600"
                                    }`}
                                  >
                                    {application.backgroundCheck === "passed" ? "Passed" : "Failed"}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-gray-500">Documents</h4>
                              <div className="mt-2">
                                <ul className="divide-y divide-gray-200">
                                  {application.documents.map((doc, index) => (
                                    <li key={index} className="py-2 flex justify-between items-center">
                                      <span className="text-sm">{doc}</span>
                                      <button className="text-blue-600 hover:text-blue-900">
                                        <Download className="h-4 w-4" />
                                      </button>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-gray-500">References</h4>
                              <div className="mt-2">
                                <ul className="divide-y divide-gray-200">
                                  {application.references.map((ref, index) => (
                                    <li key={index} className="py-2">
                                      <span className="text-sm">{ref}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => setSelectedApplication(null)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TenantApplications

