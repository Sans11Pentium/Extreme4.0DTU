"use client";

import { useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home,
  Users,
  Shield,
  DollarSign,
  Globe,
  Clock,
  MessageSquare,
} from "react-feather";

interface Feature {
  icon: any;
  title: string;
  description: string;
}

interface Statistic {
  value: string;
  label: string;
}

interface Benefit {
  icon: JSX.Element;
  text: string;
}

const LandingPage = () => {
  const navigate = useNavigate();

  const startAnimation = useCallback(() => {
    // Animation would be implemented here with a library like Framer Motion
    // For simplicity, we're not including the animation library in this example
  }, []);

  useEffect(() => {
    startAnimation();
  }, [startAnimation]);

  const features: Feature[] = useMemo(
    () => [
      {
        icon: <Home className="w-6 h-6 text-blue-600" />,
        title: "Property Management",
        description:
          "Easily manage all your properties from anywhere in the world with our intuitive dashboard",
      },
      {
        icon: <Users className="w-6 h-6 text-blue-600" />,
        title: "Tenant Screening",
        description:
          "Comprehensive tenant screening with background checks and rental history verification",
      },
      {
        icon: <DollarSign className="w-6 h-6 text-blue-600" />,
        title: "Rent Collection",
        description:
          "Automated rent collection with multiple payment options and real-time tracking",
      },
    ],
    []
  );

  const statistics: Statistic[] = useMemo(
    () => [
      { value: "5000+", label: "Properties Managed" },
      { value: "10K+", label: "Happy Tenants" },
      { value: "98%", label: "Collection Rate" },
      { value: "24/7", label: "Customer Support" },
    ],
    []
  );

  const benefits: Benefit[] = useMemo(
    () => [
      {
        icon: <Globe className="w-5 h-5" />,
        text: "Manage your properties from anywhere in the world",
      },
      {
        icon: <Shield className="w-5 h-5" />,
        text: "Secure transactions and data protection",
      },
      {
        icon: <Clock className="w-5 h-5" />,
        text: "Save time with automated property management",
      },
      {
        icon: <MessageSquare className="w-5 h-5" />,
        text: "Direct communication with tenants and legal experts",
      },
    ],
    []
  );

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg">
        <div className="container flex items-center justify-between px-4 py-4 mx-auto">
          <div className="text-2xl font-bold text-blue-600">
            NRI Rental Manager
          </div>
          <ul className="hidden md:flex space-x-6 text-gray-600">
            <li
              className="cursor-pointer hover:text-blue-600 mt-2"
              onClick={() => scrollToSection("features")}
            >
              Features
            </li>
            <li
              className="cursor-pointer hover:text-blue-600 mt-2"
              onClick={() => scrollToSection("statistics")}
            >
              Statistics
            </li>
            <li
              className="cursor-pointer hover:text-blue-600 mt-2"
              onClick={() => scrollToSection("benefits")}
            >
              Benefits
            </li>
            <li
              className="cursor-pointer hover:text-blue-600 mt-2"
              onClick={() => scrollToSection("footer")}
            >
              Contact
            </li>
            <li
              className="cursor-pointer px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              onClick={() => navigate("/login")}
            >
              Login
            </li>
          </ul>
          <div className="md:hidden">
            <button className="p-2 text-gray-600 hover:text-blue-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden pt-20">
        <div className="container px-4 pt-20 pb-32 mx-auto">
          <div className="flex flex-col items-center max-w-4xl mx-auto text-center">
            <div className="p-3 mb-6 rounded-full bg-blue-100">
              <Home className="w-10 h-10 text-blue-600" />
            </div>
            <h1 className="mb-6 text-5xl font-bold text-gray-900 md:text-7xl">
              Manage Your Properties{" "}
              <span className="text-blue-600">Remotely</span>
            </h1>
            <p className="mb-8 text-xl text-gray-600">
              The ultimate property management solution for Non-Resident
              Indians. Manage your properties, tenants, and legal matters from
              anywhere in the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                className="flex items-center justify-center gap-2 px-8 py-3 text-white bg-blue-600 rounded-full hover:bg-blue-700"
                onClick={() => navigate("/login")}
              >
                Get Started
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
              <button className="px-8 py-3 text-blue-600 bg-white border border-blue-600 rounded-full hover:bg-blue-50">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container px-4 mx-auto">
          <h2 className="mb-12 text-3xl font-bold text-center text-gray-900">
            Key Features
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 transition-shadow bg-white shadow-lg rounded-xl hover:shadow-xl"
              >
                <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-blue-100">
                  {feature.icon}
                </div>
                <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section id="statistics" className="py-20 bg-blue-50">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {statistics.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="mb-2 text-4xl font-bold text-blue-600">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-white">
        <div className="container px-4 mx-auto">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="order-2 md:order-1">
              <h2 className="mb-6 text-4xl font-bold">
                Why Choose NRI Rental Manager?
              </h2>
              <div className="space-y-4">
                {benefits.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="text-blue-600">{item.icon}</div>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 md:order-2 relative h-[400px]">
              <div className="absolute inset-0 overflow-hidden bg-gradient-to-r from-blue-100 to-blue-200 rounded-2xl">
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="NRI Rental Manager dashboard"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="container px-4 mx-auto text-center">
          <div>
            <h2 className="mb-6 text-4xl font-bold text-white">
              Ready to Simplify Your Property Management?
            </h2>
            <p className="max-w-2xl mx-auto mb-8 text-white/80">
              Join thousands of NRIs who are already using our platform to
              manage their properties in India remotely.
            </p>
            <button
              className="px-8 py-3 bg-white rounded-full text-blue-600 hover:bg-gray-100"
              onClick={() => navigate("/login")}
            >
              Start Free Trial
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="footer" className="py-12 text-white bg-gray-900">
        <div className="container px-4 mx-auto">
          <div className="grid gap-8 md:grid-cols-4">
            {/* About Section */}
            <div>
              <Home className="w-10 h-10 mb-4 text-blue-500" />
              <p className="text-gray-400">
                NRI Rental Manager empowers non-resident Indians to efficiently
                manage their properties in India, streamlining tenant
                management, rent collection, and legal compliance.
              </p>
            </div>

            {/* Product Section */}
            <div>
              <h3 className="mb-4 font-semibold">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="cursor-pointer hover:text-blue-500">
                  Property Management
                </li>
                <li className="cursor-pointer hover:text-blue-500">
                  Tenant Screening
                </li>
                <li className="cursor-pointer hover:text-blue-500">
                  Rent Collection
                </li>
                <li className="cursor-pointer hover:text-blue-500">
                  Legal Assistance
                </li>
              </ul>
            </div>

            {/* Company Section */}
            <div>
              <h3 className="mb-4 font-semibold">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="cursor-pointer hover:text-blue-500">About Us</li>
                <li className="cursor-pointer hover:text-blue-500">Careers</li>
                <li className="cursor-pointer hover:text-blue-500">Press</li>
                <li className="cursor-pointer hover:text-blue-500">Contact</li>
              </ul>
            </div>

            {/* Resources Section */}
            <div>
              <h3 className="mb-4 font-semibold">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="cursor-pointer hover:text-blue-500">Blog</li>
                <li className="cursor-pointer hover:text-blue-500">
                  Property Insights
                </li>
                <li className="cursor-pointer hover:text-blue-500">
                  Case Studies
                </li>
                <li className="cursor-pointer hover:text-blue-500">
                  Help Center
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 mt-12 text-center text-gray-400 border-t border-gray-800">
            <p>
              © {new Date().getFullYear()} NRI Rental Manager. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
