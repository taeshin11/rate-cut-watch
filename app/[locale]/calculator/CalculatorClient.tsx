"use client";

import { useState, useCallback } from "react";
import { Calculator, TrendingDown, TrendingUp } from "lucide-react";

function calculateMonthlyPayment(principal: number, annualRate: number, months: number) {
  if (annualRate === 0) return principal / months;
  const r = annualRate / 100 / 12;
  return (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
}

export default function CalculatorClient() {
  const [loanAmount, setLoanAmount] = useState(400000);
  const [mortgageRate, setMortgageRate] = useState(7.0);
  const [savingsBalance, setSavingsBalance] = useState(50000);
  const [savingsRate, setSavingsRate] = useState(4.5);
  const [rateCut, setRateCut] = useState(0.25);
  const [loanTerm, setLoanTerm] = useState(360); // 30 years
  const [calculated, setCalculated] = useState(false);

  const currentMortgagePayment = calculateMonthlyPayment(loanAmount, mortgageRate, loanTerm);
  const newMortgageRate = mortgageRate - rateCut;
  const newMortgagePayment = calculateMonthlyPayment(loanAmount, newMortgageRate, loanTerm);
  const mortgageSavings = currentMortgagePayment - newMortgagePayment;

  const currentAnnualInterest = (savingsBalance * savingsRate) / 100;
  const newSavingsRate = savingsRate - rateCut;
  const newAnnualInterest = (savingsBalance * newSavingsRate) / 100;
  const savingsLoss = currentAnnualInterest - newAnnualInterest;

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);

  return (
    <div className="space-y-6">
      {/* Inputs */}
      <div className="bg-white rounded-2xl border border-blue-100 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-[#0c1a2e] mb-6 flex items-center gap-2">
          <Calculator className="w-5 h-5 text-[#2563eb]" />
          Your Financial Details
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Mortgage */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-600 border-b border-blue-50 pb-2">
              Mortgage
            </h3>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Loan Amount</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                <input
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full pl-8 pr-4 py-2.5 border border-blue-100 rounded-lg text-sm focus:outline-none focus:border-[#2563eb] bg-white"
                  min={0}
                  step={10000}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Current Mortgage Rate</label>
              <div className="relative">
                <input
                  type="number"
                  value={mortgageRate}
                  onChange={(e) => setMortgageRate(Number(e.target.value))}
                  className="w-full pl-4 pr-8 py-2.5 border border-blue-100 rounded-lg text-sm focus:outline-none focus:border-[#2563eb] bg-white"
                  min={0}
                  max={20}
                  step={0.1}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">%</span>
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Loan Term</label>
              <select
                value={loanTerm}
                onChange={(e) => setLoanTerm(Number(e.target.value))}
                className="w-full px-4 py-2.5 border border-blue-100 rounded-lg text-sm focus:outline-none focus:border-[#2563eb] bg-white"
              >
                <option value={360}>30 years</option>
                <option value={240}>20 years</option>
                <option value={180}>15 years</option>
                <option value={120}>10 years</option>
              </select>
            </div>
          </div>

          {/* Savings */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-600 border-b border-blue-50 pb-2">
              Savings Account
            </h3>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Savings Balance</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                <input
                  type="number"
                  value={savingsBalance}
                  onChange={(e) => setSavingsBalance(Number(e.target.value))}
                  className="w-full pl-8 pr-4 py-2.5 border border-blue-100 rounded-lg text-sm focus:outline-none focus:border-[#2563eb] bg-white"
                  min={0}
                  step={1000}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Current Savings APY</label>
              <div className="relative">
                <input
                  type="number"
                  value={savingsRate}
                  onChange={(e) => setSavingsRate(Number(e.target.value))}
                  className="w-full pl-4 pr-8 py-2.5 border border-blue-100 rounded-lg text-sm focus:outline-none focus:border-[#2563eb] bg-white"
                  min={0}
                  max={20}
                  step={0.1}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Rate Cut Amount */}
        <div className="mt-6 pt-6 border-t border-blue-50">
          <label className="block text-sm font-semibold text-gray-600 mb-3">
            Simulated Rate Change
          </label>
          <div className="flex gap-2 flex-wrap">
            {[-0.5, -0.25, 0.25, 0.5].map((cut) => (
              <button
                key={cut}
                onClick={() => setRateCut(-cut)}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                  rateCut === -cut
                    ? "bg-[#2563eb] text-white border-[#2563eb]"
                    : "bg-white text-gray-600 border-blue-100 hover:border-[#2563eb]"
                }`}
              >
                {cut > 0 ? "+" : ""}{cut}% {cut < 0 ? "Cut" : "Hike"}
              </button>
            ))}
            <div className="relative">
              <input
                type="number"
                value={rateCut}
                onChange={(e) => setRateCut(Number(e.target.value))}
                className="w-28 pl-4 pr-8 py-2 border border-blue-100 rounded-lg text-sm focus:outline-none focus:border-[#2563eb] bg-white"
                step={0.25}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Mortgage Impact */}
        <div className="bg-white rounded-2xl border border-blue-100 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <TrendingDown className="w-5 h-5 text-green-500" />
            <h3 className="text-base font-semibold text-[#0c1a2e]">Mortgage Impact</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Current Payment</span>
              <span className="font-semibold text-[#0c1a2e]">{fmt(currentMortgagePayment)}/mo</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">New Rate</span>
              <span className="font-semibold text-[#0c1a2e]">{newMortgageRate.toFixed(2)}%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">New Payment</span>
              <span className="font-semibold text-[#0c1a2e]">{fmt(newMortgagePayment)}/mo</span>
            </div>
            <div className="pt-3 border-t border-blue-50">
              <div className="flex justify-between">
                <span className="text-sm font-semibold text-gray-700">Monthly Savings</span>
                <span
                  className={`text-lg font-bold ${
                    mortgageSavings > 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {mortgageSavings > 0 ? "+" : ""}{fmt(mortgageSavings)}
                </span>
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-xs text-gray-400">Annual Savings</span>
                <span className={`text-sm font-semibold ${mortgageSavings > 0 ? "text-green-500" : "text-red-500"}`}>
                  {fmt(mortgageSavings * 12)}/yr
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Savings Impact */}
        <div className="bg-white rounded-2xl border border-blue-100 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-amber-500" />
            <h3 className="text-base font-semibold text-[#0c1a2e]">Savings Impact</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Current APY</span>
              <span className="font-semibold text-[#0c1a2e]">{savingsRate}%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Current Annual Interest</span>
              <span className="font-semibold text-[#0c1a2e]">{fmt(currentAnnualInterest)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">New APY</span>
              <span className="font-semibold text-[#0c1a2e]">{newSavingsRate.toFixed(2)}%</span>
            </div>
            <div className="pt-3 border-t border-blue-50">
              <div className="flex justify-between">
                <span className="text-sm font-semibold text-gray-700">Annual Change</span>
                <span
                  className={`text-lg font-bold ${
                    savingsLoss < 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {savingsLoss > 0 ? "-" : "+"}{fmt(Math.abs(savingsLoss))}
                </span>
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-xs text-gray-400">New Annual Interest</span>
                <span className="text-sm font-semibold text-[#0c1a2e]">{fmt(newAnnualInterest)}/yr</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Net Impact */}
      <div className="bg-white rounded-2xl border border-blue-100 p-6 shadow-sm">
        <h3 className="text-base font-semibold text-[#0c1a2e] mb-4">Net Annual Impact</h3>
        <div className="flex items-center gap-6">
          <div className="flex-1 text-center">
            <p className="text-xs text-gray-400 mb-1">Mortgage Savings/yr</p>
            <p className={`text-2xl font-bold ${mortgageSavings > 0 ? "text-green-500" : "text-red-500"}`}>
              {mortgageSavings > 0 ? "+" : ""}{fmt(mortgageSavings * 12)}
            </p>
          </div>
          <div className="text-2xl text-gray-300">+</div>
          <div className="flex-1 text-center">
            <p className="text-xs text-gray-400 mb-1">Savings Interest Change/yr</p>
            <p className={`text-2xl font-bold ${savingsLoss < 0 ? "text-green-500" : "text-red-500"}`}>
              {savingsLoss > 0 ? "-" : "+"}{fmt(Math.abs(savingsLoss))}
            </p>
          </div>
          <div className="text-2xl text-gray-300">=</div>
          <div className="flex-1 text-center">
            <p className="text-xs text-gray-400 mb-1">Net Annual Change</p>
            {(() => {
              const net = mortgageSavings * 12 - savingsLoss;
              return (
                <p className={`text-2xl font-bold ${net > 0 ? "text-green-500" : "text-red-500"}`}>
                  {net > 0 ? "+" : ""}{fmt(net)}
                </p>
              );
            })()}
          </div>
        </div>
      </div>
    </div>
  );
}
