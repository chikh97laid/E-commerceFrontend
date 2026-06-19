import { useState } from "react";
import { toast } from "react-toastify";
import { Country, State, City } from "country-state-city";

const CustomerForm = ({ customerData, onSave, onClose, revalidate }) => {
  const [name, setName] = useState(customerData?.name || "");
  const [email, setEmail] = useState(customerData?.email || "");
  const [phone, setPhone] = useState(customerData?.phone || "");
  const [address, setAddress] = useState(customerData?.address || "");
  const [postalCode, setPostalCode] = useState(customerData?.postalCode || "");

  // Get Country Code
  const getCountryCode = (name) => {
    return (
      Country.getAllCountries().find((c) => c.name === name)?.isoCode || ""
    );
  };

  // Get Region Code
  const getRegionCode = (countryCode, regionName) => {
    if (!countryCode || !regionName) return "";
    return (
      State.getStatesOfCountry(countryCode).find((s) => s.name === regionName)
        ?.isoCode || ""
    );
  };

  // Location states
  const [country, setCountry] = useState(
    getCountryCode(customerData?.country) || "",
  ); // Stores Country ISO Code
  const [city, setCity] = useState(customerData?.city || ""); // Stores State ISO Code
  const [region, setRegion] = useState(
    getRegionCode(country, customerData?.region) || "",
  );

  // Data Lists
  const countries = Country.getAllCountries();
  const states = country ? State.getStatesOfCountry(country) : [];
  const cities = region ? City.getCitiesOfState(country, region) : [];

  const isEdit = Boolean(customerData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // When sending to DB, we want names, not ISO codes
    const countryName = Country.getCountryByCode(country)?.name;
    const regionName = State.getStateByCodeAndCountry(region, country)?.name;

    const dataToSend = {
      name: name,
      email: email,
      phone: phone,
      address: address,
      city: city,
      region: regionName,
      postalCode: postalCode,
      country: countryName,
    };

    if (isEdit) {
      await onSave({ ...dataToSend, id: customerData?.id }, "customers");
    } else {
      await onSave(dataToSend, "customers");
    }

    revalidate();
    toast.success("Customer Added successfully");
    onClose();
  };

  return (
    <div className="relative bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <button
        className="absolute top-4 left-6 text-xl fa-bold text-red-600 hover:text-gray-600 transition-colors p-2"
        onClick={onClose}
      >
        ← <span className="hidden md:inline">Back</span>
      </button>
      <div className="bg-indigo-50 rounded-xl w-full md:w-2/3 m-auto">
        <div className="px-6 py-8">
          <form onSubmit={handleSubmit}>
            <h2 className="text-2xl text-center font-semibold mb-6">
              {isEdit ? "Edit Customer" : "Add New Customer"}
            </h2>

            <div className="mb-6">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="border rounded w-full py-2 px-3 focus:outline-indigo-500"
                placeholder="eg. John Doe"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="border rounded w-full py-2 px-3 focus:outline-indigo-500"
                placeholder="eg. customer@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="phone"
              >
                Phone
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                className="border rounded w-full py-2 px-3 focus:outline-indigo-500"
                placeholder="eg. 0000-000-0000"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="address"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                className="border rounded w-full py-2 px-3 focus:outline-indigo-500"
                placeholder="eg. 123 Main Street"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-2">
                Country
              </label>
              <select
                className="border rounded w-full py-2 px-3 focus:outline-indigo-500 bg-white"
                value={country}
                onChange={(e) => {
                  setCountry(e.target.value);
                  setRegion(""); // Reset downstream
                  setCity("");
                }}
                required
              >
                <option value="">Select a country</option>
                {countries.map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-2">
                State
              </label>
              <select
                className="border rounded w-full py-2 px-3 focus:outline-indigo-500 bg-white"
                value={region}
                disabled={!country}
                onChange={(e) => {
                  setRegion(e.target.value);
                  setCity("");
                }}
                required
              >
                <option value="">Select a state</option>
                {states.map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-2">City</label>
              <select
                className="border rounded w-full py-2 px-3 focus:outline-indigo-500 bg-white"
                value={city}
                disabled={!region}
                onChange={(e) => setCity(e.target.value)}
                required
              >
                <option value="">Select a city</option>
                {cities.map((item) => (
                  <option key={item.name} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="postalCode"
              >
                Postal Code
              </label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                className="border rounded w-full py-2 px-3 focus:outline-indigo-500"
                placeholder="eg. 10001"
                required
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </div>

            <div className="flex flex-col md:flex-row gap-3">
              <button
                type="button"
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full w-full transition"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full transition"
              >
                {isEdit ? "Update" : "Add"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomerForm;
