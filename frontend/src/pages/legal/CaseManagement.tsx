"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-hot-toast"

// Mock data
const cases = [
  {
    id: 1,
    title: "Rent Dispute - Luxury Apartment",
    client: "John Doe (Landlord)",
    opponent: "Jane Smith (Tenant)",
    status: "active",
    date: "2023-07-15",
    type: "rent_dispute",
    description:
      "Tenant has not paid rent for 2 months despite multiple reminders. Landlord is seeking legal action to recover the dues.",
    documents: [
      { id: 1, name: "Rental Agreement.pdf", date: "2023-07-15" },
      { id: 2, name: "Payment History.pdf", date: "2023-07-15" },
      { id: 3, name: "Notice to Tenant.pdf", date: "2023-07-16" },
    ],
    messages: [
      { id: 1, sender: "John Doe", message: "I need help with this rent dispute.", date: "2023-07-15" },
      { id: 2, sender: "Robert Law", message: "I'll review the documents and get back to you.", date: "2023-07-16" },
    ],
    nextHearing: "2023-08-10",
    court: "Mumbai Civil Court",
  },
  {
    id: 2,
    title: "Lease Termination - Villa with Garden",
    client: "Robert Brown (Landlord)",
    opponent: "Alice Johnson (Tenant)",
    status: "pending",
    date: "2023-07-20",
    type: "lease_termination",
    description: "Landlord wants to terminate the lease early due to property sale. Tenant is refusing to vacate.",
    documents: [
      { id: 1, name: "Lease Agreement.pdf", date: "2023-07-20" },
      { id: 2, name: "Property Sale Agreement.pdf", date: "2023-07-20" },
    ],
    messages: [{ id: 1, sender: "Robert Brown", message: "I need to terminate the lease early.", date: "2023-07-20" }],
    nextHearing: null,
    court: null,
  },
  {
    id: 3,
    title: "Property Damage Claim - Office Space",
    client: "Michael Wilson (Landlord)",
    opponent: "David Lee (Tenant)",
    status: "resolved",
    date: "2023-06-10",
    type: "property_damage",
    description: "Tenant caused significant damage to the property. Landlord is seeking compensation for repairs.",
    documents: [
      { id: 1, name: "Damage Assessment Report.pdf", date: "2023-06-10" },
      { id: 2, name: "Repair Estimates.pdf", date: "2023-06-12" },
      { id: 3, name: "Settlement Agreement.pdf", date: "2023-07-05" },
    ],
    messages: [
      { id: 1, sender: "Michael Wilson", message: "The tenant has damaged my property.", date: "2023-06-10" },
      { id: 2, sender: "Robert Law", message: "I'll help you file a claim.", date: "2023-06-11" },
      { id: 3, sender: "Robert Law", message: "The case has been settled.", date: "2023-07-05" },
    ],
    resolution: "Settled with compensation of ₹50,000",
    resolutionDate: "2023-07-05",
  },
]

const CaseManagement = () => {
  const [activeTab, setActiveTab] = useState("all")
  const [selectedCase, setSelectedCase] = useState<number | null>(null)
  const [newMessage, setNewMessage] = useState("")

  const filteredCases = cases.filter((c) => {
    if (activeTab === "all") return true
    return c.status === activeTab
  })

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    toast.success("Message sent successfully")
    setNewMessage("")
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Case Management</h1>
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
              All Cases
            </button>
            <button
              onClick={() => setActiveTab("active")}
              className={`${
                activeTab === "active"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Active
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
                        Case
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Parties
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
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">View</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredCases.map((caseItem) => (
                      <tr key={caseItem.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{caseItem.title}</div>
                          <div className="text-sm text-gray-500 capitalize">{caseItem.type.replace("_", " ")}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{caseItem.client}</div>
                          <div className="text-sm text-gray-500">vs. {caseItem.opponent}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              caseItem.status === "active"
                                ? "bg-green-100 text-green-800"
                                : caseItem.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {caseItem.status.charAt(0).toUpperCase() + caseItem.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(caseItem.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link to={`/legal/cases/${caseItem.id}`} className="text-blue-600 hover:text-blue-900">
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
      </div>
    </div>
  )
}

export default CaseManagement

