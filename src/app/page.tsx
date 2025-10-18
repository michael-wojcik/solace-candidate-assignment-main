"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [advocates, setAdvocates] = useState([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("fetching advocates...");
    fetch("/api/advocates")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch advocates");
        }
        return response.json();
      })
      .then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      })
      .catch((err) => {
        console.error("Error fetching advocates:", err);
        setError(err.message);
      });
  }, []);

  const onChange = (e) => {
    const search = e.target.value;
    setSearchTerm(search);

    console.log("filtering advocates...");
    const searchLower = search.toLowerCase();
    const filtered = advocates.filter((advocate) => {
      return (
        advocate.firstName.toLowerCase().includes(searchLower) ||
        advocate.lastName.toLowerCase().includes(searchLower) ||
        advocate.city.toLowerCase().includes(searchLower) ||
        advocate.degree.toLowerCase().includes(searchLower) ||
        advocate.specialties.some((s) => s.toLowerCase().includes(searchLower)) ||
        advocate.yearsOfExperience.toString().includes(search)
      );
    });

    setFilteredAdvocates(filtered);
  };

  const onClick = () => {
    setSearchTerm("");
    setFilteredAdvocates(advocates);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Solace Advocates
          </h1>
          <p className="text-lg text-gray-600">
            Find the right healthcare advocate for your needs
          </p>
        </div>

        <div className="mb-6">
          <p className="text-sm font-medium text-gray-700 mb-2">Search</p>
          <p className="text-sm text-gray-600 mb-3">
            Searching for: <span className="font-semibold text-gray-900">{searchTerm}</span>
          </p>
          <div className="flex gap-3">
            <input
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
              value={searchTerm}
              onChange={onChange}
            />
            <button
              onClick={onClick}
              className="px-6 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200"
            >
              Reset Search
            </button>
          </div>
        </div>

      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>City</th>
            <th>Degree</th>
            <th>Specialties</th>
            <th>Years of Experience</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {filteredAdvocates.map((advocate, index) => {
            return (
              <tr key={index}>
                <td>{advocate.firstName}</td>
                <td>{advocate.lastName}</td>
                <td>{advocate.city}</td>
                <td>{advocate.degree}</td>
                <td>
                  {advocate.specialties.map((s, i) => (
                    <div key={i}>{s}</div>
                  ))}
                </td>
                <td>{advocate.yearsOfExperience}</td>
                <td>{advocate.phoneNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
    </main>
  );
}
