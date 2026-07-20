'use client';

import React, { useMemo, useRef, useState } from 'react';
import type { CDGrowthPoint } from '@/lib/cd/interest';

interface CDChartProps {
  schedule: CDGrowthPoint[];
  currencySymbol?: string;
  isPayout?: boolean;
}

export default function CDChart({
  schedule,
  currencySymbol = '$',
  isPayout = false,
}: CDChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);

  // Dimension settings
  const width = 500;
  const height = 260;
  const paddingLeft = 60;
  const paddingRight = 20;
  const paddingTop = 20;
  const paddingBottom = 35;

  const plotWidth = width - paddingLeft - paddingRight;
  const plotHeight = height - paddingTop - paddingBottom;

  // Y-axis scaling range
  const yMin = useMemo(() => {
    if (schedule.length === 0) return 0;
    const principal = schedule[0].deposits;
    return Math.max(0, Math.floor(principal * 0.9));
  }, [schedule]);

  const yMax = useMemo(() => {
    if (schedule.length === 0) return 10000;
    const maxBalance = schedule[schedule.length - 1].balance;
    return Math.max(yMin + 10, maxBalance);
  }, [schedule, yMin]);

  const maxPeriod = useMemo(() => {
    if (schedule.length === 0) return 12;
    return schedule[schedule.length - 1].period;
  }, [schedule]);

  // Calculate coordinates for SVG paths
  const points = useMemo(() => {
    if (schedule.length === 0) return [];
    const yRange = yMax - yMin;

    return schedule.map((d) => {
      const x = paddingLeft + (maxPeriod > 0 ? (d.period / maxPeriod) * plotWidth : 0);
      const yDeposits = paddingTop + plotHeight - ((d.deposits - yMin) / yRange) * plotHeight;
      const yBalance = paddingTop + plotHeight - ((d.balance - yMin) / yRange) * plotHeight;
      return { x, yDeposits, yBalance, data: d };
    });
  }, [schedule, maxPeriod, yMin, yMax, plotWidth, plotHeight]);

  // Generate SVG path descriptions
  const paths = useMemo(() => {
    if (points.length === 0) return { depositsArea: '', balanceArea: '', depositsLine: '', balanceLine: '' };

    const first = points[0];
    const last = points[points.length - 1];
    const yBottom = paddingTop + plotHeight;

    // Deposits Area (Slate-200 fill)
    let depositsArea = `M ${first.x} ${yBottom} `;
    points.forEach((p) => {
      depositsArea += `L ${p.x} ${p.yDeposits} `;
    });
    depositsArea += `L ${last.x} ${yBottom} Z`;

    // Balance Area (Emerald-500 fill)
    let balanceArea = `M ${first.x} ${yBottom} `;
    points.forEach((p) => {
      balanceArea += `L ${p.x} ${p.yBalance} `;
    });
    balanceArea += `L ${last.x} ${yBottom} Z`;

    // Top strokes
    let depositsLine = `M ${first.x} ${first.yDeposits} `;
    points.forEach((p, idx) => {
      if (idx > 0) depositsLine += `L ${p.x} ${p.yDeposits} `;
    });

    let balanceLine = `M ${first.x} ${first.yBalance} `;
    points.forEach((p, idx) => {
      if (idx > 0) balanceLine += `L ${p.x} ${p.yBalance} `;
    });

    return { depositsArea, balanceArea, depositsLine, balanceLine };
  }, [points, plotHeight]);

  // Y-axis grid ticks (4 intervals)
  const yTicks = useMemo(() => {
    const ticks = [];
    const count = 4;
    const yRange = yMax - yMin;
    for (let i = 0; i <= count; i++) {
      const val = yMin + (yRange * i) / count;
      const y = paddingTop + plotHeight - ((val - yMin) / yRange) * plotHeight;
      ticks.push({ val, y });
    }
    return ticks;
  }, [yMin, yMax, plotHeight]);

  // X-axis ticks (Months) - adjust interval to avoid overlapping text
  const xTicks = useMemo(() => {
    if (maxPeriod <= 0) return [];
    const ticks = [];
    let step = 1;
    
    if (maxPeriod > 48) step = 12;      // Ticks every 12 months (1 year)
    else if (maxPeriod > 24) step = 6;  // Ticks every 6 months
    else if (maxPeriod > 12) step = 3;  // Ticks every quarter
    else if (maxPeriod > 6) step = 2;   // Ticks every 2 months
    
    for (let m = 0; m <= maxPeriod; m += step) {
      const x = paddingLeft + (m / maxPeriod) * plotWidth;
      ticks.push({ period: m, x });
    }

    // Always ensure the final month is marked if it's not already close to the last tick
    const lastTick = ticks[ticks.length - 1];
    if (lastTick && maxPeriod - lastTick.period > step / 2) {
      ticks.push({
        period: maxPeriod,
        x: paddingLeft + plotWidth,
      });
    }

    return ticks;
  }, [maxPeriod, plotWidth]);

  // Format currency labels
  const formatYLabel = (val: number) => {
    if (val >= 1000000) return `${currencySymbol}${(val / 1000000).toFixed(1)}M`;
    if (val >= 1000) return `${currencySymbol}${(val / 1000).toFixed(1)}K`;
    return `${currencySymbol}${Math.round(val)}`;
  };

  // Mouse move handler for tooltips
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    if (!svgRef.current || points.length === 0) return;

    const svgRect = svgRef.current.getBoundingClientRect();
    const clientX = e.clientX - svgRect.left;
    
    const viewBoxX = (clientX / svgRect.width) * width;

    let minDiff = Infinity;
    let idx = 0;

    points.forEach((p, i) => {
      const diff = Math.abs(p.x - viewBoxX);
      if (diff < minDiff) {
        minDiff = diff;
        idx = i;
      }
    });

    setHoveredIdx(idx);

    if (containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const point = points[idx];
      
      const percentageX = (point.x / width) * containerRect.width;
      const percentageY = (point.yBalance / height) * containerRect.height;

      setTooltipPos({
        x: percentageX,
        y: percentageY,
      });
    }
  };

  const handleMouseLeave = () => {
    setHoveredIdx(null);
    setTooltipPos(null);
  };

  const formatFullNumber = (val: number) => {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2,
    }).format(val);
  };

  const hoveredData = hoveredIdx !== null ? points[hoveredIdx].data : null;

  return (
    <div ref={containerRef} className="relative w-full bg-white p-4 rounded-xl border border-gray-100 shadow-sm mt-6">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">CD Compounding Growth</h4>
        <div className="flex items-center gap-4 text-[10px] font-semibold text-gray-500">
          <div className="flex items-center gap-1">
            <span className="inline-block w-2.5 h-2.5 rounded bg-slate-300 border border-slate-400"></span>
            <span>Principal</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="inline-block w-2.5 h-2.5 rounded bg-blue-500 border border-blue-600"></span>
            <span>{isPayout ? 'Accumulated Payout' : 'Interest'}</span>
          </div>
        </div>
      </div>

      <div className="w-full aspect-[2/1] min-h-[160px]">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full select-none cursor-crosshair overflow-visible"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Gradients */}
          <defs>
            <linearGradient id="cdBalanceGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="cdDepositsGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#cbd5e1" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.15" />
            </linearGradient>
          </defs>

          {/* Grid lines (Horizontal) */}
          {yTicks.map((tick, i) => (
            <g key={i} className="opacity-40">
              <line
                x1={paddingLeft}
                y1={tick.y}
                x2={width - paddingRight}
                y2={tick.y}
                stroke="#e2e8f0"
                strokeWidth="0.75"
                strokeDasharray="4 4"
              />
              <text
                x={paddingLeft - 8}
                y={tick.y + 3.5}
                textAnchor="end"
                className="text-[9px] font-medium fill-gray-400"
              >
                {formatYLabel(tick.val)}
              </text>
            </g>
          ))}

          {/* X-Axis ticks */}
          {xTicks.map((tick, i) => (
            <g key={i} className="opacity-70">
              <line
                x1={tick.x}
                y1={paddingTop}
                x2={tick.x}
                y2={height - paddingBottom}
                stroke="#f8fafc"
                strokeWidth="1"
              />
              <text
                x={tick.x}
                y={height - paddingBottom + 14}
                textAnchor="middle"
                className="text-[9px] font-medium fill-gray-400"
              >
                {tick.period === 0 ? 'Start' : `Mo ${tick.period}`}
              </text>
            </g>
          ))}

          {/* Render Areas */}
          {points.length > 0 && (
            <>
              {/* Balance Area (deposits + interest) */}
              <path d={paths.balanceArea} fill="url(#cdBalanceGrad)" />
              {/* Deposits Area */}
              <path d={paths.depositsArea} fill="url(#cdDepositsGrad)" />

              {/* Stroke Lines */}
              <path d={paths.balanceLine} fill="none" stroke="#3b82f6" strokeWidth="2.2" strokeLinecap="round" />
              <path d={paths.depositsLine} fill="none" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round" />
            </>
          )}

          {/* Active Hover Indicators */}
          {hoveredIdx !== null && points[hoveredIdx] && (
            <g>
              <line
                x1={points[hoveredIdx].x}
                y1={paddingTop}
                x2={points[hoveredIdx].x}
                y2={height - paddingBottom}
                stroke="#64748b"
                strokeWidth="0.75"
                strokeDasharray="2 2"
              />
              <circle
                cx={points[hoveredIdx].x}
                cy={points[hoveredIdx].yDeposits}
                r="4"
                fill="#f8fafc"
                stroke="#64748b"
                strokeWidth="1.5"
              />
              <circle
                cx={points[hoveredIdx].x}
                cy={points[hoveredIdx].yBalance}
                r="4.5"
                fill="#f8fafc"
                stroke="#3b82f6"
                strokeWidth="2"
              />
            </g>
          )}
        </svg>
      </div>

      {/* Tooltip Overlay */}
      {tooltipPos && hoveredData && (
        <div
          className="absolute z-20 bg-slate-900 text-white p-2.5 rounded-lg shadow-xl text-[10px] space-y-1 pointer-events-none transition-all duration-75 border border-slate-700 max-w-[170px]"
          style={{
            left: `${Math.min(
              tooltipPos.x + 12,
              (containerRef.current?.getBoundingClientRect().width || 400) - 150
            )}px`,
            top: `${Math.max(tooltipPos.y - 70, 10)}px`,
          }}
        >
          <div className="font-bold text-slate-300 border-b border-slate-700 pb-0.5 mb-1">
            {hoveredData.period === 0 ? 'Start' : `Month ${hoveredData.period}`}
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-slate-400">Total Value:</span>
            <span className="font-semibold text-blue-400">
              {formatFullNumber(hoveredData.balance)}
            </span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-slate-400">Principal:</span>
            <span className="font-medium">
              {formatFullNumber(hoveredData.deposits)}
            </span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-slate-400">{isPayout ? 'Withdrawn:' : 'Interest:'}</span>
            <span className="font-medium text-emerald-300">
              {formatFullNumber(hoveredData.interest)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
