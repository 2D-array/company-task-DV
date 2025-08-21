import React, { useState, useEffect, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area, LineChart, Line, RadialBarChart, RadialBar } from 'recharts';

// Enhanced Filter Panel Component
const FilterPanel = ({ onFiltersChange, filters }) => {
  const [filterOptions, setFilterOptions] = useState({
    topics: ['Energy', 'Technology', 'Climate', 'Finance', 'Healthcare', 'Manufacturing', 'Automotive', 'Oil', 'Gas', 'Market'],
    sectors: ['Power', 'IT', 'Environment', 'Banking', 'Medical', 'Automotive', 'Energy', 'Manufacturing', 'Retail'],
    regions: ['North America', 'Asia', 'Europe', 'South America', 'Africa', 'Central America', 'Middle East'],
    pestles: ['Political', 'Economic', 'Social', 'Technological', 'Legal', 'Environmental'],
    sources: ['News', 'Reports', 'Research', 'Government', 'Academia', 'Industry'],
    countries: ['United States', 'China', 'Germany', 'Canada', 'Japan', 'India', 'Brazil', 'France', 'UK'],
    endYears: ['2024', '2025', '2026', '2027', '2028', '2029', '2030'],
    startYears: ['2020', '2021', '2022', '2023', '2024']
  });

  const handleFilterChange = (filterName, value) => {
    const newFilters = {
      ...filters,
      [filterName]: value
    };
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      end_year: '',
      topic: '',
      sector: '',
      region: '',
      pestle: '',
      source: '',
      country: '',
      start_year: ''
    };
    onFiltersChange(clearedFilters);
  };

  const activeFilterCount = Object.values(filters).filter(val => val !== '').length;

  return (
    <div className="bg-white p-8 rounded-3xl shadow-2xl border border-gray-100 mb-8 backdrop-blur-sm relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
      
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 flex items-center">
            <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-3 animate-pulse"></div>
            Smart Filters
            {activeFilterCount > 0 && (
              <span className="ml-3 px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm rounded-full">
                {activeFilterCount} active
              </span>
            )}
          </h3>
          <p className="text-gray-500 text-sm mt-1">Apply intelligent filters to discover insights</p>
        </div>
        <button
          onClick={clearFilters}
          className="px-8 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-2xl hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold"
        >
          🗑️ Clear All
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { key: 'end_year', label: '📅 End Year', options: filterOptions.endYears, placeholder: 'All Years', color: 'blue' },
          { key: 'topic', label: '🎯 Topic', options: filterOptions.topics, placeholder: 'All Topics', color: 'green' },
          { key: 'sector', label: '🏢 Sector', options: filterOptions.sectors, placeholder: 'All Sectors', color: 'purple' },
          { key: 'region', label: '🌍 Region', options: filterOptions.regions, placeholder: 'All Regions', color: 'orange' },
          { key: 'pestle', label: '📊 PESTLE', options: filterOptions.pestles, placeholder: 'All PESTLE', color: 'red' },
          { key: 'source', label: '📰 Source', options: filterOptions.sources, placeholder: 'All Sources', color: 'indigo' },
          { key: 'country', label: '🏳️ Country', options: filterOptions.countries, placeholder: 'All Countries', color: 'teal' },
          { key: 'start_year', label: '⏰ Start Year', options: filterOptions.startYears, placeholder: 'All Start Years', color: 'pink' }
        ].map((filter) => (
          <div key={filter.key} className="relative group">
            <label className="block text-sm font-bold text-gray-700 mb-3">{filter.label}</label>
            <select
              value={filters[filter.key]}
              onChange={(e) => handleFilterChange(filter.key, e.target.value)}
              className={`w-full p-4 border-2 rounded-2xl focus:ring-4 focus:ring-${filter.color}-200 focus:border-${filter.color}-500 transition-all duration-300 bg-gradient-to-r from-gray-50 to-white hover:from-white hover:to-gray-50 hover:border-gray-400 shadow-sm hover:shadow-md font-medium ${
                filters[filter.key] ? `border-${filter.color}-400 bg-${filter.color}-50` : 'border-gray-200'
              }`}
            >
              <option value="">{filter.placeholder}</option>
              {filter.options.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            {filters[filter.key] && (
              <div className={`absolute -top-1 -right-1 w-4 h-4 bg-${filter.color}-500 rounded-full animate-bounce`}></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Enhanced Intensity Chart Component
const IntensityChart = ({ data }) => {
  const sectorIntensity = data.reduce((acc, item) => {
    if (item.sector && item.intensity) {
      if (!acc[item.sector]) {
        acc[item.sector] = { sector: item.sector, totalIntensity: 0, count: 0 };
      }
      acc[item.sector].totalIntensity += item.intensity;
      acc[item.sector].count += 1;
    }
    return acc;
  }, {});

  const chartData = Object.values(sectorIntensity)
    .map(item => ({
      sector: item.sector,
      avgIntensity: Math.round((item.totalIntensity / item.count) * 100) / 100,
      count: item.count
    }))
    .sort((a, b) => b.avgIntensity - a.avgIntensity);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={chartData} margin={{ top: 30, right: 30, left: 20, bottom: 100 }}>
        <defs>
          <linearGradient id="intensityGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.9}/>
            <stop offset="50%" stopColor="#1d4ed8" stopOpacity={0.7}/>
            <stop offset="100%" stopColor="#1e40af" stopOpacity={0.5}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" strokeOpacity={0.6} />
        <XAxis 
          dataKey="sector" 
          angle={-45}
          textAnchor="end"
          height={100}
          fontSize={11}
          stroke="#64748b"
          tick={{ fill: '#64748b', fontWeight: 500 }}
        />
        <YAxis stroke="#64748b" tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }} />
        <Tooltip 
          formatter={(value, name) => [value, name === 'avgIntensity' ? '🔥 Avg Intensity' : name]}
          labelFormatter={(label) => `📊 ${label} Sector`}
          contentStyle={{
            backgroundColor: 'white',
            border: 'none',
            borderRadius: '16px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            padding: '16px'
          }}
        />
        <Bar 
          dataKey="avgIntensity" 
          fill="url(#intensityGradient)" 
          name="Average Intensity"
          radius={[8, 8, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

// Enhanced Region Chart Component
const RegionChart = ({ data }) => {
  const regionCount = data.reduce((acc, item) => {
    if (item.region) {
      acc[item.region] = (acc[item.region] || 0) + 1;
    }
    return acc;
  }, {});

  const chartData = Object.entries(regionCount).map(([region, count]) => ({
    region,
    count,
    percentage: ((count / data.length) * 100).toFixed(1)
  }));

  const COLORS = ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#84cc16'];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-6 border-none rounded-2xl shadow-2xl">
          <p className="font-bold text-gray-800 text-lg">🌍 {data.region}</p>
          <p className="text-blue-600 font-semibold mt-2">📊 Count: {data.count}</p>
          <p className="text-green-600 font-semibold">📈 Share: {data.percentage}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <defs>
          {COLORS.map((color, index) => (
            <linearGradient key={index} id={`pieGradient${index}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.9}/>
              <stop offset="100%" stopColor={color} stopOpacity={0.6}/>
            </linearGradient>
          ))}
        </defs>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ region, percentage }) => `${region}: ${percentage}%`}
          outerRadius={130}
          fill="#8884d8"
          dataKey="count"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={`url(#pieGradient${index % COLORS.length})`} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
      </PieChart>
    </ResponsiveContainer>
  );
};

// Enhanced Sector Chart Component
const SectorChart = ({ data }) => {
  const sectorData = data.reduce((acc, item) => {
    if (item.sector) {
      if (!acc[item.sector]) {
        acc[item.sector] = {
          sector: item.sector,
          count: 0,
          totalIntensity: 0,
          totalRelevance: 0,
          totalLikelihood: 0
        };
      }
      acc[item.sector].count += 1;
      acc[item.sector].totalIntensity += item.intensity || 0;
      acc[item.sector].totalRelevance += item.relevance || 0;
      acc[item.sector].totalLikelihood += item.likelihood || 0;
    }
    return acc;
  }, {});

  const chartData = Object.values(sectorData)
    .map(item => ({
      sector: item.sector,
      count: item.count,
      avgIntensity: Math.round((item.totalIntensity / item.count) * 100) / 100,
      avgRelevance: Math.round((item.totalRelevance / item.count) * 100) / 100,
      avgLikelihood: Math.round((item.totalLikelihood / item.count) * 100) / 100
    }))
    .sort((a, b) => b.count - a.count);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart data={chartData} margin={{ top: 30, right: 30, left: 20, bottom: 100 }}>
        <defs>
          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8}/>
            <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.1}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" strokeOpacity={0.6} />
        <XAxis 
          dataKey="sector" 
          angle={-45}
          textAnchor="end"
          height={100}
          fontSize={11}
          stroke="#64748b"
          tick={{ fill: '#64748b', fontWeight: 500 }}
        />
        <YAxis stroke="#64748b" tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }} />
        <Tooltip 
          formatter={(value, name) => {
            const labels = {
              count: '📊 Count',
              avgIntensity: '🔥 Avg Intensity',
              avgRelevance: '🎯 Avg Relevance',
              avgLikelihood: '📈 Avg Likelihood'
            };
            return [value, labels[name] || name];
          }}
          labelFormatter={(label) => `🏢 ${label} Sector`}
          contentStyle={{
            backgroundColor: 'white',
            border: 'none',
            borderRadius: '16px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            padding: '16px'
          }}
        />
        <Area 
          type="monotone" 
          dataKey="count" 
          stackId="1" 
          stroke="#3b82f6" 
          fill="url(#areaGradient)" 
          strokeWidth={3}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

// Enhanced Topic Chart Component
const TopicChart = ({ data }) => {
  const topicMetrics = data.reduce((acc, item) => {
    if (item.topic) {
      if (!acc[item.topic]) {
        acc[item.topic] = {
          topic: item.topic,
          totalRelevance: 0,
          totalLikelihood: 0,
          count: 0
        };
      }
      acc[item.topic].totalRelevance += item.relevance || 0;
      acc[item.topic].totalLikelihood += item.likelihood || 0;
      acc[item.topic].count += 1;
    }
    return acc;
  }, {});

  const chartData = Object.values(topicMetrics)
    .map(item => ({
      topic: item.topic,
      avgRelevance: Math.round((item.totalRelevance / item.count) * 100) / 100,
      avgLikelihood: Math.round((item.totalLikelihood / item.count) * 100) / 100,
      count: item.count
    }))
    .filter(item => item.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={chartData} margin={{ top: 30, right: 30, left: 20, bottom: 100 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" strokeOpacity={0.6} />
        <XAxis 
          dataKey="topic" 
          angle={-45}
          textAnchor="end"
          height={100}
          fontSize={11}
          stroke="#64748b"
          tick={{ fill: '#64748b', fontWeight: 500 }}
        />
        <YAxis stroke="#64748b" tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }} />
        <Tooltip 
          formatter={(value, name) => [value, name === 'avgRelevance' ? '🎯 Avg Relevance' : '📈 Avg Likelihood']}
          labelFormatter={(label) => `🏷️ ${label}`}
          contentStyle={{
            backgroundColor: 'white',
            border: 'none',
            borderRadius: '16px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            padding: '16px'
          }}
        />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="avgRelevance" 
          stroke="#3b82f6" 
          name="🎯 Avg Relevance"
          strokeWidth={4}
          dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }}
          activeDot={{ r: 8, stroke: '#3b82f6', strokeWidth: 3, fill: 'white' }}
        />
        <Line 
          type="monotone" 
          dataKey="avgLikelihood" 
          stroke="#ef4444" 
          name="📈 Avg Likelihood"
          strokeWidth={4}
          dot={{ fill: '#ef4444', strokeWidth: 2, r: 6 }}
          activeDot={{ r: 8, stroke: '#ef4444', strokeWidth: 3, fill: 'white' }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

// New Year Trend Chart
const YearTrendChart = ({ data }) => {
  const yearData = data.reduce((acc, item) => {
    const year = item.end_year || item.start_year || '2024';
    if (!acc[year]) {
      acc[year] = {
        year,
        totalIntensity: 0,
        totalRelevance: 0,
        totalLikelihood: 0,
        count: 0
      };
    }
    acc[year].totalIntensity += item.intensity || 0;
    acc[year].totalRelevance += item.relevance || 0;
    acc[year].totalLikelihood += item.likelihood || 0;
    acc[year].count += 1;
    return acc;
  }, {});

  const chartData = Object.values(yearData)
    .map(item => ({
      year: item.year,
      avgIntensity: Math.round((item.totalIntensity / item.count) * 100) / 100,
      avgRelevance: Math.round((item.totalRelevance / item.count) * 100) / 100,
      avgLikelihood: Math.round((item.totalLikelihood / item.count) * 100) / 100,
      count: item.count
    }))
    .sort((a, b) => parseInt(a.year) - parseInt(b.year));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart data={chartData} margin={{ top: 30, right: 30, left: 20, bottom: 50 }}>
        <defs>
          <linearGradient id="yearGradient1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8}/>
            <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.1}/>
          </linearGradient>
          <linearGradient id="yearGradient2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10b981" stopOpacity={0.8}/>
            <stop offset="100%" stopColor="#10b981" stopOpacity={0.1}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" strokeOpacity={0.6} />
        <XAxis 
          dataKey="year" 
          stroke="#64748b"
          tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }}
        />
        <YAxis stroke="#64748b" tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }} />
        <Tooltip 
          formatter={(value, name) => {
            const labels = {
              avgIntensity: '🔥 Avg Intensity',
              avgRelevance: '🎯 Avg Relevance'
            };
            return [value, labels[name] || name];
          }}
          labelFormatter={(label) => `📅 Year ${label}`}
          contentStyle={{
            backgroundColor: 'white',
            border: 'none',
            borderRadius: '16px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            padding: '16px'
          }}
        />
        <Area 
          type="monotone" 
          dataKey="avgIntensity" 
          stackId="1" 
          stroke="#3b82f6" 
          fill="url(#yearGradient1)" 
          strokeWidth={3}
        />
        <Area 
          type="monotone" 
          dataKey="avgRelevance" 
          stackId="2" 
          stroke="#10b981" 
          fill="url(#yearGradient2)" 
          strokeWidth={3}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

// Main Enhanced Dashboard Component
const Dashboard = () => {
  const [allData, setAllData] = useState([
    { topic: 'Energy', sector: 'Power', region: 'North America', intensity: 8, relevance: 7, likelihood: 6, country: 'United States', end_year: 2025, start_year: 2020, pestle: 'Environmental', source: 'News' },
    { topic: 'Technology', sector: 'IT', region: 'Asia', intensity: 9, relevance: 8, likelihood: 7, country: 'China', end_year: 2026, start_year: 2021, pestle: 'Technological', source: 'Reports' },
    { topic: 'Climate', sector: 'Environment', region: 'Europe', intensity: 7, relevance: 6, likelihood: 8, country: 'Germany', end_year: 2027, start_year: 2022, pestle: 'Environmental', source: 'Research' },
    { topic: 'Finance', sector: 'Banking', region: 'North America', intensity: 6, relevance: 7, likelihood: 5, country: 'Canada', end_year: 2024, start_year: 2020, pestle: 'Economic', source: 'Government' },
    { topic: 'Healthcare', sector: 'Medical', region: 'Asia', intensity: 8, relevance: 9, likelihood: 7, country: 'Japan', end_year: 2028, start_year: 2023, pestle: 'Social', source: 'Academia' },
    { topic: 'Manufacturing', sector: 'Manufacturing', region: 'Asia', intensity: 7, relevance: 6, likelihood: 6, country: 'India', end_year: 2025, start_year: 2021, pestle: 'Economic', source: 'Industry' },
    { topic: 'Automotive', sector: 'Automotive', region: 'Europe', intensity: 8, relevance: 7, likelihood: 8, country: 'Germany', end_year: 2026, start_year: 2022, pestle: 'Technological', source: 'Reports' },
    { topic: 'Oil', sector: 'Energy', region: 'Middle East', intensity: 9, relevance: 8, likelihood: 6, country: 'Saudi Arabia', end_year: 2027, start_year: 2020, pestle: 'Political', source: 'News' },
    { topic: 'Gas', sector: 'Energy', region: 'North America', intensity: 7, relevance: 6, likelihood: 7, country: 'United States', end_year: 2025, start_year: 2021, pestle: 'Environmental', source: 'Government' },
    { topic: 'Market', sector: 'Finance', region: 'Asia', intensity: 6, relevance: 8, likelihood: 5, country: 'China', end_year: 2024, start_year: 2023, pestle: 'Economic', source: 'Research' },
    { topic: 'Technology', sector: 'IT', region: 'North America', intensity: 9, relevance: 9, likelihood: 8, country: 'United States', end_year: 2026, start_year: 2022, pestle: 'Technological', source: 'Academia' },
    { topic: 'Climate', sector: 'Environment', region: 'South America', intensity: 8, relevance: 7, likelihood: 9, country: 'Brazil', end_year: 2028, start_year: 2021, pestle: 'Environmental', source: 'Reports' },
    { topic: 'Energy', sector: 'Power', region: 'Europe', intensity: 7, relevance: 8, likelihood: 6, country: 'France', end_year: 2025, start_year: 2020, pestle: 'Political', source: 'Government' },
    { topic: 'Healthcare', sector: 'Medical', region: 'Europe', intensity: 8, relevance: 9, likelihood: 8, country: 'UK', end_year: 2027, start_year: 2022, pestle: 'Social', source: 'Research' },
    { topic: 'Finance', sector: 'Banking', region: 'Asia', intensity: 6, relevance: 7, likelihood: 5, country: 'India', end_year: 2024, start_year: 2021, pestle: 'Economic', source: 'News' }
  ]);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    end_year: '',
    topic: '',
    sector: '',
    region: '',
    pestle: '',
    source: '',
    country: '',
    start_year: ''
  });

  // Filter data based on applied filters
  const filteredData = useMemo(() => {
    return allData.filter(item => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value) return true; // If no filter applied, include all items
        
        // Handle year filters
        if (key === 'end_year') {
          return item.end_year && item.end_year.toString() === value;
        }
        if (key === 'start_year') {
          return item.start_year && item.start_year.toString() === value;
        }
        
        // Handle other filters
        return item[key] && item[key].toString().toLowerCase().includes(value.toLowerCase());
      });
    });
  }, [allData, filters]);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Calculate statistics from filtered data
  const getStats = () => {
    if (!filteredData.length) return { total: 0, avgIntensity: 0, avgRelevance: 0, avgLikelihood: 0 };
    
    const total = filteredData.length;
    const avgIntensity = filteredData.reduce((sum, item) => sum + (item.intensity || 0), 0) / total;
    const avgRelevance = filteredData.reduce((sum, item) => sum + (item.relevance || 0), 0) / total;
    const avgLikelihood = filteredData.reduce((sum, item) => sum + (item.likelihood || 0), 0) / total;
    
    return {
      total,
      avgIntensity: Math.round(avgIntensity * 100) / 100,
      avgRelevance: Math.round(avgRelevance * 100) / 100,
      avgLikelihood: Math.round(avgLikelihood * 100) / 100
    };
  };

  const stats = getStats();
  const activeFilterCount = Object.values(filters).filter(val => val !== '').length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-32 w-32 border-8 border-blue-600 border-t-transparent mx-auto"></div>
            <div className="absolute inset-0 rounded-full h-32 w-32 border-4 border-blue-200 animate-pulse"></div>
          </div>
          <p className="mt-8 text-2xl text-gray-700 font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Loading Dashboard Magic...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center">
        <div className="text-center max-w-md p-8 bg-white rounded-3xl shadow-2xl">
          <div className="text-red-500 text-6xl mb-6">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-6 text-lg">{error}</p>
          <button 
            onClick={() => setError(null)}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold"
          >
            🔄 Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Enhanced Header */}
      <div className="bg-white shadow-2xl border-b border-gray-100 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Smart Analytics Dashboard
              </h1>
              <p className="text-gray-600 mt-3 text-xl">Real-time insights with intelligent filtering</p>
              {activeFilterCount > 0 && (
                <div className="mt-3 flex items-center space-x-2">
                  <span className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-semibold">
                    🔍 {activeFilterCount} filters active
                  </span>
                  <span className="px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-full text-sm font-semibold">
                    📊 {filteredData.length} records shown
                  </span>
                </div>
              )}
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <div className="flex items-center space-x-3 bg-gradient-to-r from-green-50 to-blue-50 px-6 py-3 rounded-2xl border border-green-200">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-bold text-gray-700">🚀 Live Data</span>
              </div>
              <div className="flex items-center space-x-3 bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-3 rounded-2xl border border-purple-200">
                <span className="text-2xl">⚡</span>
                <span className="text-sm font-bold text-gray-700">Smart Filters</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Filters */}
        <FilterPanel filters={filters} onFiltersChange={handleFiltersChange} />

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {[
            { title: 'Total Records', value: stats.total, color: 'blue', icon: '📊', gradient: 'from-blue-500 to-blue-600', bgGradient: 'from-blue-50 to-blue-100' },
            { title: 'Avg Intensity', value: stats.avgIntensity, color: 'green', icon: '⚡', gradient: 'from-green-500 to-green-600', bgGradient: 'from-green-50 to-green-100' },
            { title: 'Avg Relevance', value: stats.avgRelevance, color: 'purple', icon: '🎯', gradient: 'from-purple-500 to-purple-600', bgGradient: 'from-purple-50 to-purple-100' },
            { title: 'Avg Likelihood', value: stats.avgLikelihood, color: 'orange', icon: '📈', gradient: 'from-orange-500 to-orange-600', bgGradient: 'from-orange-50 to-orange-100' }
          ].map((stat, index) => (
            <div key={index} className={`bg-gradient-to-br ${stat.bgGradient} p-8 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 relative overflow-hidden`}>
              <div className="absolute top-0 right-0 w-20 h-20 bg-white opacity-10 rounded-full -mr-10 -mt-10"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm font-bold text-gray-600 uppercase tracking-wide">{stat.title}</p>
                    <p className={`text-4xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mt-2`}>
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-4 bg-gradient-to-r ${stat.gradient} rounded-2xl text-white text-3xl shadow-lg`}>
                    {stat.icon}
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-full bg-white bg-opacity-50 rounded-full h-3 overflow-hidden">
                    <div className={`h-3 bg-gradient-to-r ${stat.gradient} rounded-full transition-all duration-700 shadow-sm`} 
                         style={{width: `${Math.min((stat.value / 10) * 100, 100)}%`}}></div>
                  </div>
                  <span className="ml-3 text-sm font-bold text-gray-600">{Math.round((stat.value / 10) * 100)}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mr-4 animate-pulse"></div>
              🔥 Average Intensity by Sector
            </h3>
            <IntensityChart data={filteredData} />
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full mr-4 animate-pulse"></div>
              🌍 Distribution by Region
            </h3>
            <RegionChart data={filteredData} />
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-teal-500"></div>
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <div className="w-4 h-4 bg-gradient-to-r from-green-500 to-green-600 rounded-full mr-4 animate-pulse"></div>
              🏷️ Top Topics Analysis
            </h3>
            <TopicChart data={filteredData} />
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-red-500"></div>
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <div className="w-4 h-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full mr-4 animate-pulse"></div>
              🏢 Sector Performance
            </h3>
            <SectorChart data={filteredData} />
          </div>
        </div>

        {/* New Year Trends Chart */}
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 relative overflow-hidden mb-8">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-cyan-500"></div>
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <div className="w-4 h-4 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full mr-4 animate-pulse"></div>
            📅 Year-wise Trends
          </h3>
          <YearTrendChart data={filteredData} />
        </div>

        {/* Enhanced Data Preview */}
        {filteredData.length > 0 && (
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 to-purple-500"></div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800 flex items-center">
                <div className="w-4 h-4 bg-gradient-to-r from-violet-500 to-violet-600 rounded-full mr-4 animate-pulse"></div>
                📋 Recent Data Entries
              </h3>
              <div className="flex items-center space-x-4">
                <span className="text-sm font-bold text-gray-600 bg-gradient-to-r from-gray-100 to-gray-200 px-6 py-3 rounded-2xl border border-gray-200">
                  📊 {filteredData.length} total records
                </span>
                {activeFilterCount > 0 && (
                  <span className="text-sm font-bold text-white bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3 rounded-2xl">
                    🔍 Filtered Results
                  </span>
                )}
              </div>
            </div>
            <div className="overflow-x-auto rounded-2xl border-2 border-gray-100 shadow-inner">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <tr>
                    {['Topic', 'Sector', 'Region', 'Country', 'Year', 'Intensity', 'Relevance', 'Likelihood'].map((header) => (
                      <th key={header} className="px-6 py-5 text-left text-xs font-black text-gray-600 uppercase tracking-wider border-b-2 border-gray-200">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredData.slice(0, 10).map((item, index) => (
                    <tr key={index} className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 group">
                      <td className="px-6 py-5 whitespace-nowrap text-sm font-bold text-gray-900 group-hover:text-blue-600">
                        🏷️ {item.topic || 'N/A'}
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap text-sm font-semibold text-gray-700">
                        🏢 {item.sector || 'N/A'}
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap text-sm font-semibold text-gray-700">
                        🌍 {item.region || 'N/A'}
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap text-sm font-semibold text-gray-700">
                        🏳️ {item.country || 'N/A'}
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap text-sm font-semibold text-gray-700">
                        📅 {item.end_year || item.start_year || 'N/A'}
                      </td>
                      {[
                        { value: item.intensity, high: 7, med: 4, colors: ['bg-red-100 text-red-800 border-red-200', 'bg-yellow-100 text-yellow-800 border-yellow-200', 'bg-green-100 text-green-800 border-green-200'] },
                        { value: item.relevance, high: 7, med: 4, colors: ['bg-blue-100 text-blue-800 border-blue-200', 'bg-purple-100 text-purple-800 border-purple-200', 'bg-gray-100 text-gray-800 border-gray-200'] },
                        { value: item.likelihood, high: 7, med: 4, colors: ['bg-green-100 text-green-800 border-green-200', 'bg-teal-100 text-teal-800 border-teal-200', 'bg-orange-100 text-orange-800 border-orange-200'] }
                      ].map((metric, idx) => (
                        <td key={idx} className="px-6 py-5 whitespace-nowrap text-sm">
                          <span className={`px-4 py-2 rounded-xl text-xs font-black border-2 shadow-sm ${
                            metric.value > metric.high ? metric.colors[0] : 
                            metric.value > metric.med ? metric.colors[1] : 
                            metric.colors[2]
                          }`}>
                            {metric.value || 0}
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredData.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-gray-600 mb-2">No data matches your filters</h3>
                <p className="text-gray-500">Try adjusting your filter criteria to see more results</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default Dashboard;