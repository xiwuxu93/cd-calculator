import React from 'react';

export default function LadderVisualizer() {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm my-8">
      <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">5-Year CD Ladder Strategy</h3>
      
      <div className="space-y-4">
        {/* Year 1 */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-24 font-semibold text-emerald-700">Year 1</div>
          <div className="flex-1 w-full bg-emerald-100 h-10 rounded-lg flex items-center px-4 border border-emerald-200 text-sm text-emerald-800">
            1-Year CD (Matures) &rarr; Reinvest into 5-Year CD
          </div>
        </div>
        
        {/* Year 2 */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-24 font-semibold text-emerald-700">Year 2</div>
          <div className="flex-1 w-full flex gap-2">
            <div className="w-1/2 bg-gray-100 h-10 rounded-lg flex items-center px-4 border border-gray-200 text-sm text-gray-500 line-through">
              1-Year CD
            </div>
            <div className="w-1/2 bg-emerald-100 h-10 rounded-lg flex items-center px-4 border border-emerald-200 text-sm text-emerald-800">
              2-Year CD (Matures) &rarr; Reinvest into 5-Year CD
            </div>
          </div>
        </div>

        {/* Year 3 */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-24 font-semibold text-emerald-700">Year 3</div>
          <div className="flex-1 w-full flex gap-2">
            <div className="w-2/3 bg-gray-100 h-10 rounded-lg flex items-center px-4 border border-gray-200 text-sm text-gray-500 line-through">
              2-Year CD
            </div>
            <div className="w-1/3 bg-emerald-100 h-10 rounded-lg flex items-center px-4 border border-emerald-200 text-sm text-emerald-800">
              3-Year CD (Matures)
            </div>
          </div>
        </div>

        {/* Year 4 */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-24 font-semibold text-emerald-700">Year 4</div>
          <div className="flex-1 w-full flex gap-2">
            <div className="w-3/4 bg-gray-100 h-10 rounded-lg flex items-center px-4 border border-gray-200 text-sm text-gray-500 line-through">
              3-Year CD
            </div>
            <div className="w-1/4 bg-emerald-100 h-10 rounded-lg flex items-center px-4 border border-emerald-200 text-sm text-emerald-800">
              4-Year CD (Matures)
            </div>
          </div>
        </div>

        {/* Year 5 */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-24 font-semibold text-emerald-700">Year 5</div>
          <div className="flex-1 w-full flex gap-2">
            <div className="w-4/5 bg-gray-100 h-10 rounded-lg flex items-center px-4 border border-gray-200 text-sm text-gray-500 line-through">
              4-Year CD
            </div>
            <div className="w-1/5 bg-emerald-100 h-10 rounded-lg flex items-center px-4 border border-emerald-200 text-sm text-emerald-800">
              5-Year CD (Matures)
            </div>
          </div>
        </div>
      </div>
      
      <p className="mt-6 text-sm text-gray-600 text-center">
        By Year 5, you have a rolling ladder where one 5-Year CD matures every single year, providing annual liquidity at long-term rates.
      </p>
    </div>
  );
}
