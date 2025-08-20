import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area, LineChart, Line } from 'recharts';

// Enhanced Filter Panel Component
const FilterPanel = ({ onFiltersChange, filters }) => {
  const [filterOptions, setFilterOptions] = useState({
    topics: ['Energy', 'Technology', 'Climate', 'Finance', 'Healthcare', 'Manufacturing'],
    sectors: ['Power', 'IT', 'Environment', 'Banking', 'Medical', 'Automotive'],
    regions: ['North America', 'Asia', 'Europe', 'South America', 'Africa'],
    pestles: ['Political', 'Economic', 'Social', 'Technological', 'Legal', 'Environmental'],
    sources: ['News', 'Reports', 'Research', 'Government', 'Academia'],
    countries: ['United States', 'China', 'Germany', 'Canada', 'Japan', 'India'],
    endYears: ['2024', '2025', '2026', '2027', '2028'],
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

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 mb-8 backdrop-blur-sm">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900 flex items-center">
            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-3"></div>
            Advanced Filters
          </h3>
          <p className="text-gray-500 text-sm mt-1">Refine your data analysis with precision filters</p>
        </div>
        <button
          onClick={clearFilters}
          className="px-6 py-2.5 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl hover:from-gray-600 hover:to-gray-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
        >
          Clear All
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { key: 'end_year', label: 'End Year', options: filterOptions.endYears, placeholder: 'All Years' },
          { key: 'topic', label: 'Topic', options: filterOptions.topics, placeholder: 'All Topics' },
          { key: 'sector', label: 'Sector', options: filterOptions.sectors, placeholder: 'All Sectors' },
          { key: 'region', label: 'Region', options: filterOptions.regions, placeholder: 'All Regions' },
          { key: 'pestle', label: 'PESTLE', options: filterOptions.pestles, placeholder: 'All PESTLE' },
          { key: 'source', label: 'Source', options: filterOptions.sources, placeholder: 'All Sources' },
          { key: 'country', label: 'Country', options: filterOptions.countries, placeholder: 'All Countries' },
          { key: 'start_year', label: 'Start Year', options: filterOptions.startYears, placeholder: 'All Start Years' }
        ].map((filter) => (
          <div key={filter.key} className="relative">
            <label className="block text-sm font-semibold text-gray-700 mb-2">{filter.label}</label>
            <select
              value={filters[filter.key]}
              onChange={(e) => handleFilterChange(filter.key, e.target.value)}
              className="w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white hover:border-gray-300"
            >
              <option value="">{filter.placeholder}</option>
              {filter.options.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
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

  const chartData = Object.values(sectorIntensity).map(item => ({
    sector: item.sector,
    avgIntensity: Math.round((item.totalIntensity / item.count) * 100) / 100
  }));

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
        <defs>
          <linearGradient id="intensityGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8}/>
            <stop offset="100%" stopColor="#1d4ed8" stopOpacity={0.6}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
        <XAxis 
          dataKey="sector" 
          angle={-45}
          textAnchor="end"
          height={80}
          fontSize={11}
          stroke="#64748b"
          tick={{ fill: '#64748b' }}
        />
        <YAxis stroke="#64748b" tick={{ fill: '#64748b', fontSize: 12 }} />
        <Tooltip 
          formatter={(value) => [value, 'Average Intensity']}
          labelFormatter={(label) => `Sector: ${label}`}
          contentStyle={{
            backgroundColor: 'white',
            border: 'none',
            borderRadius: '12px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
          }}
        />
        <Bar 
          dataKey="avgIntensity" 
          fill="url(#intensityGradient)" 
          name="Average Intensity"
          radius={[6, 6, 0, 0]}
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
        <div className="bg-white p-4 border-none rounded-xl shadow-lg">
          <p className="font-bold text-gray-800">{data.region}</p>
          <p className="text-blue-600 font-medium">Count: {data.count}</p>
          <p className="text-green-600 font-medium">Percentage: {data.percentage}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart>
        <defs>
          {COLORS.map((color, index) => (
            <linearGradient key={index} id={`pieGradient${index}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.8}/>
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
          outerRadius={120}
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
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
        <defs>
          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8}/>
            <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.1}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
        <XAxis 
          dataKey="sector" 
          angle={-45}
          textAnchor="end"
          height={80}
          fontSize={11}
          stroke="#64748b"
          tick={{ fill: '#64748b' }}
        />
        <YAxis stroke="#64748b" tick={{ fill: '#64748b', fontSize: 12 }} />
        <Tooltip 
          formatter={(value, name) => {
            const labels = {
              count: 'Count',
              avgIntensity: 'Avg Intensity',
              avgRelevance: 'Avg Relevance',
              avgLikelihood: 'Avg Likelihood'
            };
            return [value, labels[name] || name];
          }}
          labelFormatter={(label) => `Sector: ${label}`}
          contentStyle={{
            backgroundColor: 'white',
            border: 'none',
            borderRadius: '12px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
          }}
        />
        <Area 
          type="monotone" 
          dataKey="count" 
          stackId="1" 
          stroke="#3b82f6" 
          fill="url(#areaGradient)" 
          strokeWidth={2}
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
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
        <XAxis 
          dataKey="topic" 
          angle={-45}
          textAnchor="end"
          height={80}
          fontSize={11}
          stroke="#64748b"
          tick={{ fill: '#64748b' }}
        />
        <YAxis stroke="#64748b" tick={{ fill: '#64748b', fontSize: 12 }} />
        <Tooltip 
          formatter={(value, name) => [value, name === 'avgRelevance' ? 'Avg Relevance' : 'Avg Likelihood']}
          labelFormatter={(label) => `Topic: ${label}`}
          contentStyle={{
            backgroundColor: 'white',
            border: 'none',
            borderRadius: '12px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
          }}
        />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="avgRelevance" 
          stroke="#3b82f6" 
          name="Avg Relevance"
          strokeWidth={3}
          dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
        />
        <Line 
          type="monotone" 
          dataKey="avgLikelihood" 
          stroke="#ef4444" 
          name="Avg Likelihood"
          strokeWidth={3}
          dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, stroke: '#ef4444', strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

// Main Enhanced Dashboard Component
const Dashboard = () => {
  const [data, setData] = useState([
    { topic: 'Energy', sector: 'Power', region: 'North America', intensity: 8, relevance: 7, likelihood: 6, country: 'United States' },
    { topic: 'Technology', sector: 'IT', region: 'Asia', intensity: 9, relevance: 8, likelihood: 7, country: 'China' },
    { topic: 'Climate', sector: 'Environment', region: 'Europe', intensity: 7, relevance: 6, likelihood: 8, country: 'Germany' },
    { topic: 'Finance', sector: 'Banking', region: 'North America', intensity: 6, relevance: 7, likelihood: 5, country: 'Canada' },
    { topic: 'Healthcare', sector: 'Medical', region: 'Asia', intensity: 8, relevance: 9, likelihood: 7, country: 'Japan' },
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

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Calculate statistics
  const getStats = () => {
    if (!data.length) return { total: 0, avgIntensity: 0, avgRelevance: 0, avgLikelihood: 0 };
    
    const total = data.length;
    const avgIntensity = data.reduce((sum, item) => sum + (item.intensity || 0), 0) / total;
    const avgRelevance = data.reduce((sum, item) => sum + (item.relevance || 0), 0) / total;
    const avgLikelihood = data.reduce((sum, item) => sum + (item.likelihood || 0), 0) / total;
    
    return {
      total,
      avgIntensity: Math.round(avgIntensity * 100) / 100,
      avgRelevance: Math.round(avgRelevance * 100) / 100,
      avgLikelihood: Math.round(avgLikelihood * 100) / 100
    };
  };

  const stats = getStats();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-blue-600 mx-auto"></div>
          <p className="mt-6 text-xl text-gray-700 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center max-w-md p-8 bg-white rounded-2xl shadow-xl">
          <div className="text-red-500 text-2xl mb-6">⚠️ Error</div>
          <p className="text-gray-700 mb-6 text-lg">{error}</p>
          <button 
            onClick={() => setLoading(false)}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Enhanced Header */}
      <div className="bg-white shadow-xl border-b border-gray-200 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Data Analytics Dashboard
              </h1>
              <p className="text-gray-600 mt-2 text-lg">Interactive insights and professional visualizations</p>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-gradient-to-r from-green-50 to-blue-50 px-4 py-2 rounded-xl">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">Live Data</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Filters */}
        <FilterPanel filters={filters} onFiltersChange={handleFiltersChange} />

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { title: 'Total Records', value: stats.total, color: 'blue', icon: '📊', gradient: 'from-blue-500 to-blue-600' },
            { title: 'Avg Intensity', value: stats.avgIntensity, color: 'green', icon: '⚡', gradient: 'from-green-500 to-green-600' },
            { title: 'Avg Relevance', value: stats.avgRelevance, color: 'purple', icon: '🎯', gradient: 'from-purple-500 to-purple-600' },
            { title: 'Avg Likelihood', value: stats.avgLikelihood, color: 'orange', icon: '📈', gradient: 'from-orange-500 to-orange-600' }
          ].map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">{stat.title}</p>
                  <p className={`text-3xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mt-2`}>
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 bg-gradient-to-r ${stat.gradient} rounded-xl text-white text-2xl`}>
                  {stat.icon}
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <div className={`w-full bg-gray-200 rounded-full h-2 overflow-hidden`}>
                  <div className={`h-2 bg-gradient-to-r ${stat.gradient} rounded-full transition-all duration-500`} 
                       style={{width: `${Math.min((stat.value / 10) * 100, 100)}%`}}></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mr-3"></div>
              Average Intensity by Sector
            </h3>
            <IntensityChart data={data} />
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full mr-3"></div>
              Distribution by Region
            </h3>
            <RegionChart data={data} />
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-green-600 rounded-full mr-3"></div>
              Top Topics Analysis
            </h3>
            <TopicChart data={data} />
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full mr-3"></div>
              Sector Performance
            </h3>
            <SectorChart data={data} />
          </div>
        </div>

        {/* Enhanced Data Preview */}
        {data.length > 0 && (
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800 flex items-center">
                <div className="w-3 h-3 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full mr-3"></div>
                Recent Data Entries
              </h3>
              <span className="text-sm font-semibold text-gray-600 bg-gradient-to-r from-gray-100 to-gray-200 px-4 py-2 rounded-xl">
                {data.length} total records
              </span>
            </div>
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <tr>
                    {['Topic', 'Sector', 'Region', 'Intensity', 'Relevance', 'Likelihood'].map((header) => (
                      <th key={header} className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.slice(0, 5).map((item, index) => (
                    <tr key={index} className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                        {item.topic || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.sector || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.region || 'N/A'}
                      </td>
                      {[
                        { value: item.intensity, high: 7, med: 4, colors: ['bg-red-100 text-red-800', 'bg-yellow-100 text-yellow-800', 'bg-green-100 text-green-800'] },
                        { value: item.relevance, high: 7, med: 4, colors: ['bg-blue-100 text-blue-800', 'bg-purple-100 text-purple-800', 'bg-gray-100 text-gray-800'] },
                        { value: item.likelihood, high: 7, med: 4, colors: ['bg-green-100 text-green-800', 'bg-teal-100 text-teal-800', 'bg-orange-100 text-orange-800'] }
                      ].map((metric, idx) => (
                        <td key={idx} className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
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
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;