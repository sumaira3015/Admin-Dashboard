"use client";

import { useState, useEffect, useCallback } from "react";

interface Product {
  name: string;
  price: number;
}

const Checkout = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    zip: "",
    country: "",
    paymentMethod: "EasyPaisa",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
    bankAccountName: "",
    bankAccountNumber: "",
    bankName: "",
  });

  const [savedProducts, setSavedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load saved products only once
  useEffect(() => {
    const saved = localStorage.getItem("wishlist");
    if (saved) {
      setSavedProducts(JSON.parse(saved));
    }
  }, []);

  // Debounced handle change to reduce re-renders
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulating a submission delay
    setTimeout(() => {
      setIsLoading(false);
      alert("Shipping and payment details submitted!");
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-6 bg-white shadow-xl rounded-lg">
      <h2 className="text-4xl font-semibold text-[#272343] mb-8 text-center">Shipping & Payment Details</h2>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="name">Full Name</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" required />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="address">Address</label>
            <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} className="w-full px-4 py-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" required />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="city">City</label>
            <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} className="w-full px-4 py-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" required />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="zip">Zip Code</label>
            <input type="text" id="zip" name="zip" value={formData.zip} onChange={handleChange} className="w-full px-4 py-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" required />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="country">Country</label>
            <input type="text" id="country" name="country" value={formData.country} onChange={handleChange} className="w-full px-4 py-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" required />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700" htmlFor="paymentMethod">Payment Method</label>
          <select id="paymentMethod" name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} className="w-full px-4 py-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
            <option value="EasyPaisa">EasyPaisa</option>
            <option value="Bank">Bank Transfer</option>
            <option value="PayPal">PayPal</option>
            <option value="JazzCash">JazzCash</option>
            <option value="CreditCard">Credit Card</option>
          </select>
          <p className="mt-2 text-sm text-gray-500">
            {formData.paymentMethod === "EasyPaisa" && "Pay via EasyPaisa mobile app."}
            {formData.paymentMethod === "Bank" && "Direct bank transfer to our account."}
            {formData.paymentMethod === "PayPal" && "Pay securely using PayPal."}
            {formData.paymentMethod === "JazzCash" && "Use JazzCash wallet for quick payment."}
            {formData.paymentMethod === "CreditCard" && "Enter your credit card details."}
          </p>
        </div>

        {formData.paymentMethod === "Bank" && (
          <div className="space-y-6">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700" htmlFor="bankAccountName">Account Holder Name</label>
              <input type="text" id="bankAccountName" name="bankAccountName" value={formData.bankAccountName} onChange={handleChange} className="w-full px-4 py-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" required />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700" htmlFor="bankAccountNumber">Bank Account Number</label>
              <input type="text" id="bankAccountNumber" name="bankAccountNumber" value={formData.bankAccountNumber} onChange={handleChange} className="w-full px-4 py-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" required />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700" htmlFor="bankName">Bank Name</label>
              <input type="text" id="bankName" name="bankName" value={formData.bankName} onChange={handleChange} className="w-full px-4 py-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" required />
            </div>
          </div>
        )}

        {formData.paymentMethod === "CreditCard" && (
          <div className="space-y-6">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700" htmlFor="cardNumber">Credit Card Number</label>
              <input type="text" id="cardNumber" name="cardNumber" value={formData.cardNumber} onChange={handleChange} className="w-full px-4 py-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" required />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700" htmlFor="expirationDate">Expiration Date (MM/YY)</label>
                <input type="text" id="expirationDate" name="expirationDate" value={formData.expirationDate} onChange={handleChange} className="w-full px-4 py-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" required />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700" htmlFor="cvv">CVV</label>
                <input type="text" id="cvv" name="cvv" value={formData.cvv} onChange={handleChange} className="w-full px-4 py-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" required />
              </div>
            </div>
          </div>
        )}

        <button type="submit" className="w-full bg-[#029FAE] text-white py-3 rounded-full hover:bg-[#027b89] transition duration-200">
          {isLoading ? "Processing..." : "Submit Order"}
        </button>
      </form>

      {savedProducts.length > 0 && (
        <div className="mt-12">
          <h3 className="text-2xl font-semibold text-[#272343] mb-6">Saved Products for Later</h3>
          <ul className="space-y-4">
            {savedProducts.map((product, index) => (
              <li key={index} className="flex justify-between items-center border-b py-4">
                <span className="text-lg font-medium">{product.name}</span>
                <span className="text-lg font-semibold">${product.price}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Checkout;
