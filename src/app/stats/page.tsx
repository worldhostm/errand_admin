'use client';

import { useState } from 'react';
import LineChart from '../_components/LineChart';
import DonutChart from '../_components/DonutChart';
import BarChart from '../_components/BarChart';
import statsData from '@/data/statsData.json';

export default function Stats() {
  const [selectedRegion, setSelectedRegion] = useState('전체');
  
  const { monthlyErrandData, categoryData, weeklyData } = statsData;

  const regions = ['전체', '강남구', '서초구', '송파구'];
  
  // 선 그래프 설정
  const getLineChartConfig = () => {
    if (selectedRegion === '전체') {
      return [
        { dataKey: '강남구', color: '#EF4444', name: '강남구' },
        { dataKey: '서초구', color: '#3B82F6', name: '서초구' },
        { dataKey: '송파구', color: '#10B981', name: '송파구' },
        { dataKey: '마포구', color: '#F59E0B', name: '마포구' },
        { dataKey: '기타', color: '#8B5CF6', name: '기타' }
      ];
    } else {
      return [
        { dataKey: 'completed', color: '#10B981', name: '완료' },
        { dataKey: 'requested', color: '#3B82F6', name: '요청' },
        { dataKey: 'cancelled', color: '#EF4444', name: '취소' }
      ];
    }
  };

  // 바 차트 설정
  const getBarChartConfig = () => [
    { dataKey: 'morning', fill: '#FFE082', name: '오전', stackId: 'a' },
    { dataKey: 'afternoon', fill: '#FF8A65', name: '오후', stackId: 'a' },
    { dataKey: 'evening', fill: '#BA68C8', name: '저녁', stackId: 'a' }
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">통계 대시보드</h1>
        <select 
          value={selectedRegion} 
          onChange={(e) => setSelectedRegion(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {regions.map(region => (
            <option key={region} value={region}>{region}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* 선 그래프 - 월별 심부름 현황 */}
        <LineChart
          data={monthlyErrandData[selectedRegion as keyof typeof monthlyErrandData]}
          lines={getLineChartConfig()}
          title={`월별 심부름 현황 ${selectedRegion !== '전체' ? `(${selectedRegion})` : ''}`}
          height={320}
          xAxisKey="month"
          formatTooltip={(value, name) => [value + '건', name]}
        />

        {/* 도넛 차트 - 카테고리별 분포 */}
        <DonutChart
          data={selectedRegion === '전체' ? categoryData.강남구 : categoryData[selectedRegion as keyof typeof categoryData] || []}
          title={`카테고리별 심부름 분포 ${selectedRegion !== '전체' ? `(${selectedRegion})` : ''}`}
          height={320}
          formatTooltip={(value) => [value + '건']}
        />
      </div>

      {/* 바 차트 - 요일별 시간대 현황 */}
      <BarChart
        data={selectedRegion === '전체' ? weeklyData.강남구 : weeklyData[selectedRegion as keyof typeof weeklyData] || []}
        bars={getBarChartConfig()}
        title={`요일별 시간대별 심부름 현황 ${selectedRegion !== '전체' ? `(${selectedRegion})` : ''}`}
        height={384}
        xAxisKey="day"
      />
    </div>
  );
}