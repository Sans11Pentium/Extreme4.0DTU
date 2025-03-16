"use client"

import type React from "react"

import { useState } from "react"
import { DollarSign, CreditCard, Download } from "react-feather"
import { toast } from "react-hot-toast"

// Mock data
const rentDetails = {
  property: "Luxury Apartment",
  landlord: "John Doe",
  rent: 25000,
  dueDate: "2023-08-05",
  status: "upcoming",
  paymentMethods: ["Bank Transfer", "UPI", "Credit/Debit Card"],
  bankDetails: {
    accountName: "John Doe",
    accountNumber: "XXXX XXXX XXXX 1234",
    ifsc: "ABCD0001234",
    bank: "HDFC Bank",
  },
  upiId: "johndoe@upi",
}

const rentHistory = [
  {
    id: 1,
    amount: 25000,
    date: "2023-07-05",
    dueDate: "2023-07-05",
    status: "paid",
    method: "Bank Transfer",
    receipt: "/receipt-1.pdf",
  },
  {
    id: 2,
    amount: 25000,
    date: "2023-06-05",
    dueDate: "2023-06-05",
    status: "paid",
    method: "UPI",
    receipt: "/receipt-2.pdf",
  },
  {
    id: 3,
    amount: 25000,
    date: "2023-05-05",
    dueDate: "2023-05-05",
    status: "paid",
    method: "Credit Card",
    receipt: "/receipt-3.pdf",
  },
]

const TenantRentDashboard = () => {
  const [paymentMethod, setPaymentMethod] = useState("bank")
  const [showPaymentForm, setShowPaymentForm] = useState(false)

  const handlePayNow = () => {
    setShowPaymentForm(true)
  }

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success("Payment successful!")
    setShowPaymentForm(false)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Rent Dashboard</h1>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">Current Rent Details</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Details about your monthly rent payment.</p>
          </div>
          <div>
            <span
              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                new Date(rentDetails.dueDate) > new Date() ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"
              }`}
            >
              {new Date(rentDetails.dueDate) > new Date() ? "Upcoming" : "Overdue"}
            </span>
          </div>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Property</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{rentDetails.property}</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Landlord</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{rentDetails.landlord}</dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Monthly Rent</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">₹{rentDetails.rent}</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Due Date</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {new Date(rentDetails.dueDate).toLocaleDateString()}
                <span className="ml-2 text-sm text-gray-500">
                  (
                  {Math.max(
                    0,
                    Math.floor(
                      (new Date(rentDetails.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
                    ),
                  )}{" "}
                  days remaining)
                </span>
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Payment Methods</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <div className="flex flex-wrap gap-2">
                  {rentDetails.paymentMethods.map((method, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {method}
                    </span>
                  ))}
                </div>
              </dd>
            </div>
          </dl>
        </div>
        <div className="px-4 py-5 sm:px-6 bg-gray-50 border-t border-gray-200">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handlePayNow}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              <DollarSign className="mr-2 h-4 w-4" />
              Pay Now
            </button>
          </div>
        </div>
      </div>

      {showPaymentForm && (
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
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Pay Rent</h3>
                    <div className="mt-4">
                      <div className="mb-4">
                        <p className="text-sm text-gray-500">Select a payment method:</p>
                        <div className="mt-2 grid grid-cols-3 gap-3">
                          <div
                            className={`border rounded-md p-3 flex flex-col items-center cursor-pointer ${
                              paymentMethod === "bank" ? "border-blue-500 bg-blue-50" : "border-gray-300"
                            }`}
                            onClick={() => setPaymentMethod("bank")}
                          >
                            <DollarSign
                              className={`h-6 w-6 ${paymentMethod === "bank" ? "text-blue-500" : "text-gray-400"}`}
                            />
                            <span className="mt-2 text-xs font-medium">Bank Transfer</span>
                          </div>
                          <div
                            className={`border rounded-md p-3 flex flex-col items-center cursor-pointer ${
                              paymentMethod === "upi" ? "border-blue-500 bg-blue-50" : "border-gray-300"
                            }`}
                            onClick={() => setPaymentMethod("upi")}
                          >
                            <CreditCard
                              className={`h-6 w-6 ${paymentMethod === "upi" ? "text-blue-500" : "text-gray-400"}`}
                            />
                            <span className="mt-2 text-xs font-medium">UPI</span>
                          </div>
                          <div
                            className={`border rounded-md p-3 flex flex-col items-center cursor-pointer ${
                              paymentMethod === "card" ? "border-blue-500 bg-blue-50" : "border-gray-300"
                            }`}
                            onClick={() => setPaymentMethod("card")}
                          >
                            <CreditCard
                              className={`h-6 w-6 ${paymentMethod === "card" ? "text-blue-500" : "text-gray-400"}`}
                            />
                            <span className="mt-2 text-xs font-medium">Card</span>
                          </div>
                        </div>
                      </div>

                      <form onSubmit={handlePaymentSubmit}>
                        {paymentMethod === "bank" && (
                          <div className="bg-gray-50 p-4 rounded-md mb-4">
                            <h4 className="text-sm font-medium text-gray-900 mb-2">Bank Transfer Details</h4>
                            <div className="space-y-2 text-sm">
                              <p>
                                <span className="text-gray-500">Account Name:</span>{" "}
                                {rentDetails.bankDetails.accountName}
                              </p>
                              <p>
                                <span className="text-gray-500">Account Number:</span>{" "}
                                {rentDetails.bankDetails.accountNumber}
                              </p>
                              <p>
                                <span className="text-gray-500">IFSC Code:</span> {rentDetails.bankDetails.ifsc}
                              </p>
                              <p>
                                <span className="text-gray-500">Bank:</span> {rentDetails.bankDetails.bank}
                              </p>
                            </div>
                            <div className="mt-4">
                              <label htmlFor="transaction-id" className="block text-sm font-medium text-gray-700">
                                Transaction ID
                              </label>
                              <input
                                type="text"
                                name="transaction-id"
                                id="transaction-id"
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="Enter transaction ID"
                                required
                              />
                            </div>
                          </div>
                        )}

                        {paymentMethod === "upi" && (
                          <div className="bg-gray-50 p-4 rounded-md mb-4">
                            <h4 className="text-sm font-medium text-gray-900 mb-2">UPI Payment</h4>
                            <div className="text-center mb-4">
                              <div className="bg-white p-4 inline-block rounded-md border border-gray-300">
                                <p className="text-sm font-medium">{rentDetails.upiId}</p>
                              </div>
                            </div>
                            <div className="mt-4">
                              <label htmlFor="upi-id" className="block text-sm font-medium text-gray-700">
                                Your UPI ID
                              </label>
                              <input
                                type="text"
                                name="upi-id"
                                id="upi-id"
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="Enter your UPI ID"
                                required
                              />
                            </div>
                            <div className="mt-4">
                              <label htmlFor="upi-transaction-id" className="block text-sm font-medium text-gray-700">
                                UPI Transaction ID
                              </label>
                              <input
                                type="text"
                                name="upi-transaction-id"
                                id="upi-transaction-id"
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="Enter transaction ID"
                                required
                              />
                            </div>
                          </div>
                        )}

                        {paymentMethod === "card" && (
                          <div className="bg-gray-50 p-4 rounded-md mb-4">
                            <h4 className="text-sm font-medium text-gray-900 mb-2">Card Payment</h4>
                            <div className="space-y-4">
                              <div>
                                <label htmlFor="card-number" className="block text-sm font-medium text-gray-700">
                                  Card Number
                                </label>
                                <input
                                  type="text"
                                  name="card-number"
                                  id="card-number"
                                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                  placeholder="1234 5678 9012 3456"
                                  required
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label htmlFor="expiry-date" className="block text-sm font-medium text-gray-700">
                                    Expiry Date
                                  </label>
                                  <input
                                    type="text"
                                    name="expiry-date"
                                    id="expiry-date"
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="MM/YY"
                                    required
                                  />
                                </div>
                                <div>
                                  <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                                    CVV
                                  </label>
                                  <input
                                    type="text"
                                    name="cvv"
                                    id="cvv"
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="123"
                                    required
                                  />
                                </div>
                              </div>
                              <div>
                                <label htmlFor="card-name" className="block text-sm font-medium text-gray-700">
                                  Name on Card
                                </label>
                                <input
                                  type="text"
                                  name="card-name"
                                  id="card-name"
                                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                  placeholder="John Doe"
                                  required
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="bg-gray-50 p-4 rounded-md">
                          <div className="flex justify-between mb-2">
                            <span className="text-sm text-gray-500">Rent Amount</span>
                            <span className="text-sm font-medium">₹{rentDetails.rent}</span>
                          </div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm text-gray-500">Processing Fee</span>
                            <span className="text-sm font-medium">₹0</span>
                          </div>
                          <div className="flex justify-between pt-2 border-t border-gray-200">
                            <span className="text-sm font-medium">Total</span>
                            <span className="text-sm font-medium">₹{rentDetails.rent}</span>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handlePaymentSubmit}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Pay ₹{rentDetails.rent}
                </button>
                <button
                  type="button"
                  onClick={() => setShowPaymentForm(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Payment History</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">Your rent payment history for the last few months.</p>
        </div>
        <div className="border-t border-gray-200">
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
                          Method
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Status
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">Receipt</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {rentHistory.map((payment) => (
                        <tr key={payment.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(payment.dueDate).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(payment.date).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{payment.amount}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.method}</td>
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
        </div>
      </div>
    </div>
  )
}

export default TenantRentDashboard

