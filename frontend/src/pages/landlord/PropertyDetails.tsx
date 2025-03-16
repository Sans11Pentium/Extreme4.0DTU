"use client"

import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import { ArrowLeft, Edit, Trash2, User, DollarSign, FileText, Tool, MessageSquare } from "react-feather"
import { toast } from "react-hot-toast"

// Mock data
const property = {
  id: 1,
  name: "Luxury Apartment",
  type: "apartment",
  location: "Mumbai, India",
  address: "Bandra West, Mumbai, Maharashtra 400050",
  rent: 25000,
  bedrooms: 2,
  bathrooms: 2,
  area: 1200,
  description:
    "A beautiful luxury apartment in the heart of Bandra West. Features modern amenities, spacious rooms, and a stunning view of the Arabian Sea.",
  amenities: ["Parking", "AC", "Furnished", "24x7 Security", "Gym", "Power Backup"],
  status: "Occupied",
  tenant: {
    id: 1,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+91 9876543210",
    occupation: "Software Engineer",
    leaseStart: "2023-01-15",
    leaseEnd: "2024-01-15",
  },
  images: [
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
  ],
  documents: [
    { id: 1, name: "Rental Agreement.pdf", date: "2023-01-10" },
    { id: 2, name: "Property Tax Receipt.pdf", date: "2023-03-15" },
  ],
  maintenanceRequests: [
    { id: 1, title: "Leaking Faucet", status: "pending", date: "2023-07-20" },
    { id: 2, title: "AC Not Working", status: "resolved", date: "2023-06-15" },
  ],
  rentHistory: [
    { id: 1, amount: 25000, status: "paid", date: "2023-07-05", dueDate: "2023-07-05" },
    { id: 2, amount: 25000, status: "paid", date: "2023-06-05", dueDate: "2023-06-05" },
    { id: 3, amount: 25000, status: "paid", date: "2023-05-05", dueDate: "2023-05-05" },
  ],
}

const PropertyDetails = () => {
  const { id } = useParams<{ id: string }>()
  const [activeTab, setActiveTab] = useState("overview")

  const handleDeleteProperty = () => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      toast.success("Property deleted successfully")
      // In a real app, this would redirect to the dashboard after deletion
    }
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div className="flex items-center">
          <Link to="/landlord/dashboard" className="mr-4">
            <ArrowLeft className="h-5 w-5 text-gray-500" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">{property.name}</h1>
          <span
            className={`ml-4 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
              property.status === "Occupied" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {property.status}
          </span>
        </div>
        <div className="flex mt-4 md:mt-0 space-x-3">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </button>
          <button
            type="button"
            onClick={handleDeleteProperty}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </button>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
        <div className="flex overflow-x-auto">
          <nav className="flex-grow px-4 sm:px-6 py-4 border-b border-gray-200">
            <div className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab("overview")}
                className={`${
                  activeTab === "overview"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("tenant")}
                className={`${
                  activeTab === "tenant"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm`}
              >
                Tenant
              </button>
              <button
                onClick={() => setActiveTab("rent")}
                className={`${
                  activeTab === "rent"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm`}
              >
                Rent History
              </button>
              <button
                onClick={() => setActiveTab("maintenance")}
                className={`${
                  activeTab === "maintenance"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm`}
              >
                Maintenance
              </button>
              <button
                onClick={() => setActiveTab("documents")}
                className={`${
                  activeTab === "documents"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm`}
              >
                Documents
              </button>
            </div>
          </nav>
        </div>

        {activeTab === "overview" && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
              <div>
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Property Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Type</p>
                      <p className="mt-1 text-sm text-gray-900 capitalize">{property.type}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Location</p>
                      <p className="mt-1 text-sm text-gray-900">{property.location}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Rent</p>
                      <p className="mt-1 text-sm text-gray-900">₹{property.rent}/month</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Area</p>
                      <p className="mt-1 text-sm text-gray-900">{property.area} sq.ft</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Bedrooms</p>
                      <p className="mt-1 text-sm text-gray-900">{property.bedrooms}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Bathrooms</p>
                      <p className="mt-1 text-sm text-gray-900">{property.bathrooms}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Address</h3>
                  <p className="text-sm text-gray-900">{property.address}</p>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Description</h3>
                  <p className="text-sm text-gray-900">{property.description}</p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Amenities</h3>
                  <div className="flex flex-wrap gap-2">
                    {property.amenities.map((amenity, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Property Images</h3>
                  <div className="grid grid-cols-1 gap-4">
                    {property.images.map((image, index) => (
                      <img
                        key={index}
                        src={image || "/placeholder.svg"}
                        alt={`Property ${index + 1}`}
                        className="h-48 w-full object-cover rounded-lg"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 px-6 py-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <User className="h-5 w-5 text-blue-500 mr-2" />
                    <h4 className="text-sm font-medium text-gray-900">Tenant</h4>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    {property.status === "Occupied" ? property.tenant.name : "No tenant"}
                  </p>
                  <button
                    onClick={() => setActiveTab("tenant")}
                    className="mt-2 text-xs text-blue-600 hover:text-blue-500"
                  >
                    View details
                  </button>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 text-green-500 mr-2" />
                    <h4 className="text-sm font-medium text-gray-900">Rent</h4>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    Last payment:{" "}
                    {property.rentHistory[0]?.date
                      ? new Date(property.rentHistory[0].date).toLocaleDateString()
                      : "N/A"}
                  </p>
                  <button
                    onClick={() => setActiveTab("rent")}
                    className="mt-2 text-xs text-blue-600 hover:text-blue-500"
                  >
                    View history
                  </button>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <Tool className="h-5 w-5 text-yellow-500 mr-2" />
                    <h4 className="text-sm font-medium text-gray-900">Maintenance</h4>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    {property.maintenanceRequests.filter((r) => r.status === "pending").length} pending requests
                  </p>
                  <button
                    onClick={() => setActiveTab("maintenance")}
                    className="mt-2 text-xs text-blue-600 hover:text-blue-500"
                  >
                    View requests
                  </button>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-purple-500 mr-2" />
                    <h4 className="text-sm font-medium text-gray-900">Documents</h4>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">{property.documents.length} documents</p>
                  <button
                    onClick={() => setActiveTab("documents")}
                    className="mt-2 text-xs text-blue-600 hover:text-blue-500"
                  >
                    View documents
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "tenant" && (
          <div className="p-6">
            {property.status === "Occupied" ? (
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Tenant Information</h3>
                    <p className="mt-1 text-sm text-gray-500">Details about the current tenant.</p>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Message
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                    >
                      End Lease
                    </button>
                  </div>
                </div>

                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                  <div className="border-t border-gray-200">
                    <dl>
                      <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Full name</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{property.tenant.name}</dd>
                      </div>
                      <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Email address</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{property.tenant.email}</dd>
                      </div>
                      <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Phone number</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{property.tenant.phone}</dd>
                      </div>
                      <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Occupation</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {property.tenant.occupation}
                        </dd>
                      </div>
                      <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Lease period</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {new Date(property.tenant.leaseStart).toLocaleDateString()} to{" "}
                          {new Date(property.tenant.leaseEnd).toLocaleDateString()}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Tenant Documents</h3>
                  <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <ul className="divide-y divide-gray-200">
                      <li className="px-4 py-4 flex items-center justify-between">
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 text-gray-400 mr-3" />
                          <span className="text-sm font-medium text-gray-900">Rental Agreement</span>
                        </div>
                        <button className="text-sm text-blue-600 hover:text-blue-500">View</button>
                      </li>
                      <li className="px-4 py-4 flex items-center justify-between">
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 text-gray-400 mr-3" />
                          <span className="text-sm font-medium text-gray-900">ID Proof</span>
                        </div>
                        <button className="text-sm text-blue-600 hover:text-blue-500">View</button>
                      </li>
                      <li className="px-4 py-4 flex items-center justify-between">
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 text-gray-400 mr-3" />
                          <span className="text-sm font-medium text-gray-900">Background Check</span>
                        </div>
                        <button className="text-sm text-blue-600 hover:text-blue-500">View</button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <User className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No tenant</h3>
                <p className="mt-1 text-sm text-gray-500">This property is currently vacant.</p>
                <div className="mt-6">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Find Tenants
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "rent" && (
          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Rent History</h3>
                <p className="mt-1 text-sm text-gray-500">Track all rent payments for this property.</p>
              </div>
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
              >
                Send Rent Reminder
              </button>
            </div>

            <div className="flex flex-col">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
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
                            Payment Date
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
                            Status
                          </th>
                          <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Actions</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {property.rentHistory.map((payment) => (
                          <tr key={payment.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(payment.dueDate).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(payment.date).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{payment.amount}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  payment.status === "paid" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                }`}
                              >
                                {payment.status === "paid" ? "Paid" : "Unpaid"}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button className="text-blue-600 hover:text-blue-900">View Receipt</button>
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
        )}

        {activeTab === "maintenance" && (
          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Maintenance Requests</h3>
                <p className="mt-1 text-sm text-gray-500">Track and manage maintenance issues for this property.</p>
              </div>
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
              >
                Schedule Inspection
              </button>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <ul className="divide-y divide-gray-200">
                {property.maintenanceRequests.map((request) => (
                  <li key={request.id} className="px-4 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Tool className="h-5 w-5 text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{request.title}</p>
                          <p className="text-sm text-gray-500">
                            Reported on {new Date(request.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full mr-4 ${
                            request.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {request.status === "pending" ? "Pending" : "Resolved"}
                        </span>
                        <button className="text-sm text-blue-600 hover:text-blue-500">View Details</button>
                      </div>
                    </div>
                  </li>
                ))}
                {property.maintenanceRequests.length === 0 && (
                  <li className="px-4 py-12 text-center">
                    <Tool className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No maintenance requests</h3>
                    <p className="mt-1 text-sm text-gray-500">There are no maintenance requests for this property.</p>
                  </li>
                )}
              </ul>
            </div>
          </div>
        )}

        {activeTab === "documents" && (
          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Property Documents</h3>
                <p className="mt-1 text-sm text-gray-500">Manage all documents related to this property.</p>
              </div>
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
              >
                Upload Document
              </button>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <ul className="divide-y divide-gray-200">
                {property.documents.map((document) => (
                  <li key={document.id} className="px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{document.name}</p>
                        <p className="text-sm text-gray-500">
                          Uploaded on {new Date(document.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-3">
                      <button className="text-sm text-blue-600 hover:text-blue-500">View</button>
                      <button className="text-sm text-blue-600 hover:text-blue-500">Download</button>
                      <button className="text-sm text-red-600 hover:text-red-500">Delete</button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PropertyDetails

