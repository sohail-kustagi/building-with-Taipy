import React from 'react';

function PredictionCard({ title, value, trend, loading = false }) {
  const getTrendColor = (trend) => {
    if (trend > 0) return 'text-green-600';
    if (trend < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const getTrendIcon = (trend) => {
    if (trend > 0) return '↗';
    if (trend < 0) return '↘';
    return '→';
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 border animate-pulse">
        <div className="h-4 bg-gray-200 rounded mb-4"></div>
        <div className="h-8 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border hover:shadow-lg transition-shadow">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <div className="text-3xl font-bold text-blue-600 mb-2">
        ${value?.toFixed(2) || 'N/A'}
      </div>
      {trend !== undefined && (
        <div className={`flex items-center ${getTrendColor(trend)}`}>
          <span className="mr-1">{getTrendIcon(trend)}</span>
          <span className="text-sm font-medium">
            {Math.abs(trend).toFixed(2)}%
          </span>
        </div>
      )}
    </div>
  );
}

export default PredictionCard;