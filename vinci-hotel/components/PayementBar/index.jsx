import React from "react";
import { FaCalendar } from "react-icons/fa";

const PaymentBar = ({ totalValue, paidValue }) => {
  const unpaidValue = totalValue - paidValue;
  const paidPercentage = (paidValue / totalValue) * 100;

  return (
    <div className="max-w-md mx-auto font-sans">
      <h3 className="text-lg font-semibold flex items-center space-x-2">
        <FaCalendar size={30} color="#0FA958" />
        <span className="text-2xl ml-3 font-medium text-[#5A5555]">Paiements planifiés pour le mois</span>
      </h3>
      <p className="text-gray-500 text-lg mt-2">Total des paiements futurs prévus</p>
      <h1 className="text-3xl font-bold text-gray-900 my-4">
        €{totalValue.toLocaleString("fr-FR", { minimumFractionDigits: 2 })}
      </h1>

      <div className="relative w-full h-6 rounded-md overflow-hidden bg-[#CB584E]">
        <div
          className="absolute top-0 left-0 h-full bg-green-500"
          style={{ width: `${paidPercentage}%` }}
        ></div>
      </div>

      <div className="flex justify-between mt-4">
        <div className="justify-center text-center">
          <p className="text-green-500 font-medium text-lg">✅ Paiement Reçu</p>
          <p className="font-bold text-gray-700 text-lg">
            €{paidValue.toLocaleString("fr-FR", { minimumFractionDigits: 2 })}
          </p>
        </div>
        <div className="justify-center text-center">
          <p className="text-red-500 font-medium text-lg">❌ Paiement pas encore reçu</p>
          <p className="font-bold text-gray-700 text-lg">
            €{unpaidValue.toLocaleString("fr-FR", { minimumFractionDigits: 2 })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentBar;
