'use client';

import React, { useMemo, useRef, useState, useEffect } from 'react';
import type { GrowthYear } from '@/lib/millionaire/math';

interface MillionaireChartProps {
  schedule: GrowthYear[];
  currencySymbol?: string;
}

export default function MillionaireChart({
  schedule,
  currencySymbol = '$',
}: MillionaireChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);

  // Filter schedule if too many years (e.g., more than 60) to keep chart rendering clean,
  // but for Millionaire Calculator, we usually have 0 to 50 years.
  const chartData = useMemo(() => {
    return schedule;
  }, [schedule]);

  // Dimension settings
  const width = 500;
  const height = 300;
  const paddingLeft = 65;
  const paddingRight = 20;
  const paddingTop = 20;
  const paddingBottom = 35;

  const plotWidth = width - paddingLeft - paddingRight;
  const plotHeight = height - paddingTop - paddingBottom;

  // Max values for scaling
  const maxVal = useMemo(() => {
    if (chartData.length === 0) return 1000000;
    const maxBalance = chartData[chartData.length - 1].balance;
    return Math.max(100000, maxBalance);
  }, [chartData]);

  const maxYear = useMemo(() => {
    if (chartData.length === 0) return 30;
    return chartData[chartData.length - 1].year;
  }, [chartData]);

  // Calculate coordinates for SVG paths
  const points = useMemo(() => {
    if (chartData.length === 0) return [];

    return chartData.map((d) => {
      const x = paddingLeft + (maxYear > 0 ? (d.year / maxYear) * plotWidth : 0);
      const yDeposits = paddingTop + plotHeight - (d.deposits / maxVal) * plotHeight;
      const yBalance = paddingTop + plotHeight - (d.balance / maxVal) * plotHeight;
      return { x, yDeposits, yBalance, data: d };
    });
  }, [chartData, maxYear, maxVal, plotWidth, plotHeight]);

  // Generate SVG path descriptions
  const paths = useMemo(() => {
    if (points.length === 0) return { depositsArea: '', balanceArea: '', depositsLine: '', balanceLine: '' };

    const first = points[0];
    const last = points[points.length - 1];
    const yBottom = paddingTop + plotHeight;

    // Deposits Area (Slate-200-like fill)
    let depositsArea = `M ${first.x} ${yBottom} `;
    points.forEach((p) => {
      depositsArea += `L ${p.x} ${p.yDeposits} `;
    });
    depositsArea += `L ${last.x} ${yBottom} Z`;

    // Balance Area (Emerald-500-like fill)
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

  // Y-axis grid ticks
  const yTicks = useMemo(() => {
    const ticks = [];
    const count = 4;
    for (let i = 0; i <= count; i++) {
      const val = (maxVal * i) / count;
      const y = paddingTop + plotHeight - (val / maxVal) * plotHeight;
      ticks.push({ val, y });
    }
    return ticks;
  }, [maxVal, plotHeight]);

  // X-axis grid ticks (Year ticks)
  const xTicks = useMemo(() => {
    if (maxYear <= 0) return [];
    const ticks = [];
    let step = 1;
    if (maxYear > 40) step = 10;
    else if (maxYear > 20) step = 5;
    else if (maxYear > 10) step = 2;

    for (let year = 0; year <= maxYear; year += step) {
      const x = paddingLeft + (year / maxYear) * plotWidth;
      ticks.push({ year, x });
    }

    // Always ensure the final year is marked if it's not already close to the last tick
    const lastTick = ticks[ticks.length - 1];
    if (lastTick && maxYear - lastTick.year > step / 2) {
      ticks.push({
        year: maxYear,
        x: paddingLeft + plotWidth,
      });
    }

    return ticks;
  }, [maxYear, plotWidth]);

  // Format currency labels (e.g. $1.2M, $450K)
  const formatYLabel = (val: number) => {
    if (val >= 1000000) {
      return `${currencySymbol}${(val / 1000000).toFixed(1)}M`;
    }
    if (val >= 1000) {
      return `${currencySymbol}${Math.round(val / 1000)}K`;
    }
    return `${currencySymbol}${val}`;
  };

  // Mouse move handler for tooltips
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    if (!svgRef.current || points.length === 0) return;

    const svgRect = svgRef.current.getBoundingClientRect();
    const clientX = e.clientX - svgRect.left;
    
    // Convert clientX to width scale coords
    const viewBoxX = (clientX / svgRect.width) * width;

    // Find nearest point
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

    // Tooltip positioning
    if (containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const point = points[idx];
      
      // Calculate responsive tooltip position
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

  // Format full numbers for tooltip
  const formatFullNumber = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const hoveredData = hoveredIdx !== null ? points[hoveredIdx].data : null;

  return (
    <div ref={containerRef} className="relative w-full bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
      <div className="flex flex-wrap items-center justify-center gap-4 mb-4 text-xs font-semibold text-gray-500">
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded bg-slate-300 border border-slate-400"></span>
          <span>Contributions (Principal)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded bg-emerald-500 border border-emerald-600"></span>
          <span>Compounded Interest</span>
        </div>
      </div>

      <div className="w-full aspect-[5/3] min-h-[220px]">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full select-none cursor-crosshair overflow-visible"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Gradients */}
          <defs>
            <linearGradient id="balanceGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="depositsGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#cbd5e1" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.2" />
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
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              <text
                x={paddingLeft - 8}
                y={tick.y + 4}
                textAnchor="end"
                className="text-[10px] font-medium fill-gray-400"
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
                stroke="#f1f5f9"
                strokeWidth="1"
              />
              <text
                x={tick.x}
                y={height - paddingBottom + 16}
                textAnchor="middle"
                className="text-[10px] font-medium fill-gray-400"
              >
                Yr {Math.round(tick.year)}
              </text>
            </g>
          ))}

          {/* Render Filled Areas (Balance first since it is larger, then Deposits overlapping) */}
          {points.length > 0 && (
            <>
              {/* Balance Area (deposits + interest) */}
              <path d={paths.balanceArea} fill="url(#balanceGrad)" />
              {/* Deposits Area (overlays bottom half) */}
              <path d={paths.depositsArea} fill="url(#depositsGrad)" />

              {/* Stroke Lines */}
              <path d={paths.balanceLine} fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" />
              <path d={paths.depositsLine} fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
            </>
          )}

          {/* Active Hover Indicators */}
          {hoveredIdx !== null && points[hoveredIdx] && (
            <g>
              {/* Vertical line indicator */}
              <line
                x1={points[hoveredIdx].x}
                y1={paddingTop}
                x2={points[hoveredIdx].x}
                y2={height - paddingBottom}
                stroke="#64748b"
                strokeWidth="1"
                strokeDasharray="2 2"
              />
              {/* Hover dot for Deposits */}
              <circle
                cx={points[hoveredIdx].x}
                cy={points[hoveredIdx].yDeposits}
                r="4.5"
                fill="#f8fafc"
                stroke="#64748b"
                strokeWidth="2"
              />
              {/* Hover dot for Balance */}
              <circle
                cx={points[hoveredIdx].x}
                cy={points[hoveredIdx].yBalance}
                r="5"
                fill="#f8fafc"
                stroke="#10b981"
                strokeWidth="2.5"
              />
            </g>
          )}
        </svg>
      </div>

      {/* Tooltip Overlay */}
      {tooltipPos && hoveredData && (
        <div
          className="absolute z-20 bg-slate-900 text-white p-3 rounded-lg shadow-xl text-xs space-y-1 pointer-events-none transition-all duration-75 border border-slate-700 max-w-[200px]"
          style={{
            left: `${Math.min(
              tooltipPos.x + 12,
              (containerRef.current?.getBoundingClientRect().width || 400) - 180
            )}px`,
            top: `${Math.max(tooltipPos.y - 80, 10)}px`,
          }}
        >
          <div className="font-bold text-slate-300 border-b border-slate-700 pb-1 mb-1">
            Year {Math.round(hoveredData.year)}
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-slate-400">Total Value:</span>
            <span className="font-semibold text-emerald-400">
              {formatFullNumber(hoveredData.balance)}
            </span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-slate-400">Deposits:</span>
            <span className="font-medium">
              {formatFullNumber(hoveredData.deposits)}
            </span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-slate-400">Interest:</span>
            <span className="font-medium text-emerald-300">
              {formatFullNumber(hoveredData.interest)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
