'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';

type Feature = {
  title: string;
  achiever: boolean;
  champion: boolean;
};

type PlanPricing = {
  label: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  features: Feature[];
  pricing: {
    achiever: PlanPricing;
    champion: PlanPricing;
  };
  defaultTab?: 'ACHIEVER' | 'CHAMPION';
};

export default function ValidityModal({
  isOpen,
  onClose,
  features,
  pricing,
  defaultTab = 'ACHIEVER',
}: Props) {
  const [activeTab, setActiveTab] = useState<'ACHIEVER' | 'CHAMPION'>(defaultTab);

  if (!isOpen) return null;

  const currentPricing = activeTab === 'ACHIEVER' ? pricing.achiever : pricing.champion;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="bg-black text-white w-full max-w-3xl rounded-xl overflow-hidden shadow-xl">
        {/* Header */}
        <div className="flex justify-between items-center px-4 py-3 border-b border-gray-700">
          <h2 className="text-sm sm:text-base font-semibold">
            Sainik School 2026-27 Complete Live Foundation Batch for Class 6th (English Medium)
          </h2>
          <button onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 py-3">
          {['ACHIEVER', 'CHAMPION'].map((tab) => (
            <button
              key={tab}
              className={`relative px-6 py-2 rounded-md border text-sm font-medium transition ${
                activeTab === tab
                  ? tab === 'ACHIEVER'
                    ? 'bg-yellow-200 text-black'
                    : 'bg-pink-100 text-black'
                  : 'bg-gray-900 border-gray-700 text-white'
              }`}
              onClick={() => setActiveTab(tab as 'ACHIEVER' | 'CHAMPION')}
            >
              {tab}
              {tab === 'CHAMPION' && (
                <span className="absolute -top-2 right-2 bg-orange-400 text-xs px-1 py-0.5 rounded">
                  Recommended
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Features Table */}
        <div className="overflow-x-auto px-4 pb-4">
          <table className="w-full table-auto text-sm text-left border-separate border-spacing-y-2">
            <thead>
              <tr>
                <th className="py-2">Package includes</th>
                <th className="py-2 text-center">6 Months<br />(Achiever)</th>
                <th className="py-2 text-center">Till Exam<br />(12 Months)</th>
              </tr>
            </thead>
            <tbody>
              {features.map((f, i) => (
                <tr key={i} className="bg-gray-800 rounded-md">
                  <td className="py-2 px-3">{f.title}</td>
                  <td className="text-center">{f.achiever ? '✅' : '❌'}</td>
                  <td className="text-center">{f.champion ? '✅' : '❌'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Info strip */}
        <div className="bg-black border-t border-gray-700 text-sm px-4 py-2 text-yellow-400">
          💡 Discover the benefits of Achiever 6 Months <span className="underline cursor-pointer">Know More</span>
        </div>

        {/* Footer with Price */}
        <div className="flex items-center justify-between px-4 py-4 bg-gray-900">
          <div className="text-lg font-semibold">
            ₹{currentPricing.price}
            <span className="text-sm line-through text-gray-400 ml-2">₹{currentPricing.originalPrice}</span>
            <span className="text-green-400 text-sm ml-2">({currentPricing.discountPercent}% OFF)</span>
          </div>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium cursor-pointer">
            BUY NOW
          </button>
        </div>
      </div>
    </div>
  );
}
