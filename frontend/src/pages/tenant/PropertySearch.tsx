"use client"

import type React from "react"

import { useState } from "react"
import { Search, Filter, MapPin, Home, DollarSign, Maximize2 } from "react-feather"

// Mock data
const properties = [
  {
    id: 1,
    name: "Luxury Apartment",
    type: "apartment",
    location: "Mumbai, India",
    address: "Bandra West, Mumbai",
    rent: 25000,
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    amenities: ["Parking", "AC", "Furnished", "24x7 Security"],
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 2,
    name: "Villa with Garden",
    type: "villa",
    location: "Bangalore, India",
    address: "Koramangala, Bangalore",
    rent: 35000,
    bedrooms: 3,
    bathrooms: 3,
    area: 2000,
    amenities: ["Parking", "AC", "Furnished", "24x7 Security", "Garden", "Pool"],
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 3,
    name: "Office Space",
    type: "office",
    location: "Delhi, India",
    address: "Connaught Place, Delhi",
    rent: 45000,
    bedrooms: 0,
    bathrooms: 2,
    area: 1500,
    amenities: ["Parking", "AC", "24x7 Security", "Conference Room"],
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 4,
    name: "Modern Apartment",
    type: "apartment",
    location: "Pune, India",
    address: "Kothrud, Pune",
    rent: 18000,
    bedrooms: 1,
    bathrooms: 1,
    area: 800,
    amenities: ["Parking", "AC", "Gym"],
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 5,
    name: "Commercial Shop",
    type: "shop",
    location: "Chennai, India",
    address: "T. Nagar, Chennai",
    rent: 30000,
    bedrooms: 0,
    bathrooms: 1,
    area: 500,
    amenities: ["AC", "24x7 Security"],
    image: "/placeholder.svg?height=300&width=400",
  },
]

const PropertySearch = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    propertyType: "",
    minRent: "",
    maxRent: "",
    bedrooms: "",
  })
  const [showFilters, setShowFilters] = useState(false)

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFilters({
      ...filters,
      [name]: value,
    })
  }

  const filteredProperties = properties.filter((property) => {
    // Search term filter
    if (
      searchTerm &&
      !property.location.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !property.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false
    }

    // Property type filter
    if (filters.propertyType && property.type !== filters.propertyType) {
      return false
    }

    // Min rent filter
    if (filters.minRent && property.rent < Number.parseInt(filters.minRent)) {
      return false
    }

    // Max rent filter
    if (filters.maxRent && property.rent > Number.parseInt(filters.maxRent)) {
      return false
    }

    // Bedrooms filter
    if (filters.bedrooms && property.bedrooms < Number.parseInt(filters.bedrooms)) {
      return false
    }

    return true
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Find Your Perfect Property</h1>
      </div>

      <div className="bg-white shadow p-4 rounded-lg mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Search by location or property name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <Filter className="h-5 w-5 mr-2" />
            Filters
          </button>
        </div>

        {showFilters && (
          <div className="mt-4 grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-2">
              <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700">
                Property Type
              </label>
              <select
                id="propertyType"
                name="propertyType"
                value={filters.propertyType}
                onChange={handleFilterChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="">All Types</option>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="villa">Villa</option>
                <option value="office">Office Space</option>
                <option value="shop">Commercial Shop</option>
              </select>
            </div>

            <div className="sm:col-span-1">
              <label htmlFor="minRent" className="block text-sm font-medium text-gray-700">
                Min Rent (₹)
              </label>
              <input
                type="number"
                name="minRent"
                id="minRent"
                value={filters.minRent}
                onChange={handleFilterChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div className="sm:col-span-1">
              <label htmlFor="maxRent" className="block text-sm font-medium text-gray-700">
                Max Rent (₹)
              </label>
              <input
                type="number"
                name="maxRent"
                id="maxRent"
                value={filters.maxRent}
                onChange={handleFilterChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div className="sm:col-span-1">
              <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700">
                Bedrooms
              </label>
              <select
                id="bedrooms"
                name="bedrooms"
                value={filters.bedrooms}
                onChange={handleFilterChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
              </select>
            </div>

            <div className="sm:col-span-1 flex items-end">
              <button
                type="button"
                onClick={() =>
                  setFilters({
                    propertyType: "",
                    minRent: "",
                    maxRent: "",
                    bedrooms: "",
                  })
                }
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6">
        <p className="text-sm text-gray-500 mb-4">Showing {filteredProperties.length} properties</p>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProperties.map((property) => (
            <div key={property.id} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="relative">
                <img
                  src={property.image || "/placeholder.svg"}
                  alt={property.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-0 right-0 m-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                    {property.type}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900">{property.name}</h3>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <MapPin className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                  {property.address}
                </div>
                <div className="mt-4 flex justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <DollarSign className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />₹{property.rent}/month
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Maximize2 className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                    {property.area} sq.ft
                  </div>
                </div>
                <div className="mt-2 flex justify-between">
                  {property.bedrooms > 0 && (
                    <div className="flex items-center text-sm text-gray-500">
                      <Home className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                      {property.bedrooms} {property.bedrooms === 1 ? "Bedroom" : "Bedrooms"}
                    </div>
                  )}
                  <div className="flex items-center text-sm text-gray-500">
                    {property.bathrooms} {property.bathrooms === 1 ? "Bathroom" : "Bathrooms"}
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex flex-wrap gap-2">
                    {property.amenities.slice(0, 3).map((amenity, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                      >
                        {amenity}
                      </span>
                    ))}
                    {property.amenities.length > 3 && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                        +{property.amenities.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
                <div className="mt-4">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <Search className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No properties found</h3>
            <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default PropertySearch

