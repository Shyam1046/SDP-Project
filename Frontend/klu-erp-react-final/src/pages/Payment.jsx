import React, { useState } from "react";

export default function Payment() {
  const [method, setMethod] = useState("card");
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    upiId: "",
    bank: "",
    walletProvider: ""
  });

  const validateCardNumber = (number) => {
    const cleaned = number.replace(/\s/g, "");
    return /^\d{13,19}$/.test(cleaned);
  };

  const validateExpiry = (expiry) => {
    const match = expiry.match(/^(\d{2})\/(\d{2})$/);
    if (!match) return false;
    const month = parseInt(match[1]);
    const year = parseInt("20" + match[2]);
    const now = new Date();
    const expDate = new Date(year, month - 1);
    return month >= 1 && month <= 12 && expDate > now;
  };

  const validateCVV = (cvv) => /^\d{3,4}$/.test(cvv);

  const validateUPI = (upi) => /^[\w.-]+@[\w.-]+$/.test(upi);

  const formatCardNumber = (value) => {
    const cleaned = value.replace(/\s/g, "");
    const chunks = cleaned.match(/.{1,4}/g);
    return chunks ? chunks.join(" ") : cleaned;
  };

  const formatExpiry = (value) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + "/" + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  const handleInputChange = (field, value) => {
    let formatted = value;
    
    if (field === "cardNumber") {
      formatted = formatCardNumber(value.replace(/\s/g, "").slice(0, 19));
    } else if (field === "expiry") {
      formatted = formatExpiry(value.slice(0, 5));
    } else if (field === "cvv") {
      formatted = value.replace(/\D/g, "").slice(0, 4);
    }

    setFormData(prev => ({ ...prev, [field]: formatted }));
    setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (method === "card") {
      if (!formData.cardName.trim()) newErrors.cardName = "Cardholder name is required";
      if (!validateCardNumber(formData.cardNumber)) newErrors.cardNumber = "Invalid card number";
      if (!validateExpiry(formData.expiry)) newErrors.expiry = "Invalid or expired date";
      if (!validateCVV(formData.cvv)) newErrors.cvv = "Invalid CVV";
    } else if (method === "upi") {
      if (!validateUPI(formData.upiId)) newErrors.upiId = "Invalid UPI ID format";
    } else if (method === "netbanking") {
      if (!formData.bank) newErrors.bank = "Please select a bank";
    } else if (method === "wallet") {
      if (!formData.walletProvider) newErrors.walletProvider = "Please select a wallet";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = async () => {
    if (!validateForm()) return;

    setProcessing(true);

    await new Promise(resolve => setTimeout(resolve, 2000));

    setProcessing(false);
    alert("✅ Payment Successful!");
  };

  const paymentMethods = [
    { id: "card", label: "Card", icon: "💳" },
    { id: "upi", label: "UPI", icon: "📱" },
    { id: "netbanking", label: "Net Banking", icon: "🏦" },
    { id: "wallet", label: "Wallet", icon: "👛" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-1">🔒 Secure Payment</h1>
              <p className="text-blue-100 text-sm">Your transaction is protected with end-to-end encryption</p>
            </div>
            <div className="text-5xl opacity-80">🛡️</div>
          </div>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {paymentMethods.map(({ id, label, icon }) => (
              <button
                key={id}
                onClick={() => setMethod(id)}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                  method === id
                    ? "border-blue-600 bg-blue-50 text-blue-700"
                    : "border-gray-200 hover:border-gray-300 text-gray-600"
                }`}
              >
                <span className="text-2xl">{icon}</span>
                <span className="text-sm font-medium">{label}</span>
              </button>
            ))}
          </div>

          <div className="space-y-5">
            {method === "card" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    value={formData.cardName}
                    onChange={(e) => handleInputChange("cardName", e.target.value)}
                    placeholder="Rahul Sharma"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition ${
                      errors.cardName ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.cardName && <p className="text-red-500 text-sm mt-1">{errors.cardName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Card Number
                  </label>
                  <input
                    type="text"
                    value={formData.cardNumber}
                    onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                    placeholder="5123 4567 8901 2345"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition ${
                      errors.cardNumber ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      value={formData.expiry}
                      onChange={(e) => handleInputChange("expiry", e.target.value)}
                      placeholder="MM/YY"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition ${
                        errors.expiry ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.expiry && <p className="text-red-500 text-sm mt-1">{errors.expiry}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CVV
                    </label>
                    <input
                      type="password"
                      value={formData.cvv}
                      onChange={(e) => handleInputChange("cvv", e.target.value)}
                      placeholder="123"
                      maxLength="4"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition ${
                        errors.cvv ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
                  </div>
                </div>
              </>
            )}

            {method === "upi" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  UPI ID
                </label>
                <input
                  type="text"
                  value={formData.upiId}
                  onChange={(e) => handleInputChange("upiId", e.target.value)}
                  placeholder="rahul@upi"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition ${
                    errors.upiId ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.upiId && <p className="text-red-500 text-sm mt-1">{errors.upiId}</p>}
                <div className="mt-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800 flex items-center gap-2">
                    <span>ℹ️</span>
                    You'll receive a payment request on your UPI app
                  </p>
                </div>
              </div>
            )}

            {method === "netbanking" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Your Bank
                </label>
                <select
                  value={formData.bank}
                  onChange={(e) => handleInputChange("bank", e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition ${
                    errors.bank ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Choose a bank</option>
                  <option value="SBI">State Bank of India</option>
                  <option value="HDFC">HDFC Bank</option>
                  <option value="ICICI">ICICI Bank</option>
                  <option value="AXIS">Axis Bank</option>
                  <option value="PNB">Punjab National Bank</option>
                  <option value="BOB">Bank of Baroda</option>
                  <option value="Canara">Canara Bank</option>
                </select>
                {errors.bank && <p className="text-red-500 text-sm mt-1">{errors.bank}</p>}
                <div className="mt-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-sm text-amber-800 flex items-center gap-2">
                    <span>🔐</span>
                    You'll be redirected to your bank's secure login page
                  </p>
                </div>
              </div>
            )}

            {method === "wallet" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Wallet Provider
                </label>
                <select
                  value={formData.walletProvider}
                  onChange={(e) => handleInputChange("walletProvider", e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition ${
                    errors.walletProvider ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Choose a wallet</option>
                  <option value="Paytm">Paytm</option>
                  <option value="PhonePe">PhonePe</option>
                  <option value="GooglePay">Google Pay</option>
                  <option value="AmazonPay">Amazon Pay</option>
                  <option value="Mobikwik">Mobikwik</option>
                </select>
                {errors.walletProvider && <p className="text-red-500 text-sm mt-1">{errors.walletProvider}</p>}
                <div className="mt-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-800 flex items-center gap-2">
                    <span>✅</span>
                    Payment will be processed through your wallet app
                  </p>
                </div>
              </div>
            )}

            <button
              onClick={handlePayment}
              disabled={processing}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold py-4 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
            >
              {processing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Processing Payment...
                </>
              ) : (
                <>
                  🔒 Complete Secure Payment
                </>
              )}
            </button>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
            <span>🛡️</span>
            <span>Protected by 256-bit SSL encryption</span>
          </div>
        </div>
      </div>
    </div>
  );
}
