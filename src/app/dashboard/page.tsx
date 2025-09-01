'use client';

import { 
  UserGroupIcon, 
  ClipboardDocumentListIcon, 
  BanknotesIcon,
  ArrowTrendingUpIcon,
  BellIcon
} from '@heroicons/react/24/outline';
import { useDashboardStats, useRecentErrands } from '@/hooks/useDashboard';
import { useState } from 'react';
import LineChart from '../_components/LineChart';
import NotificationModal from '../_components/NotificationModal';
import dashboardData from '@/data/dashboardData.json';
import notificationsData from '@/data/notificationsData.json';

export default function Dashboard() {
  const { stats, loading: statsLoading, error: statsError } = useDashboardStats();
  const { errands: recentErrands, loading: errandsLoading, error: errandsError } = useRecentErrands();
  
  const { regionData } = dashboardData;

  const [selectedRegion, setSelectedRegion] = useState('강남구');
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  
  const currentRegionData = regionData[selectedRegion as keyof typeof regionData];
  const { notifications } = notificationsData;
  const unreadCount = notifications.filter((n: any) => !n.isRead).length;
  
  const formatPrice = (price: number) => {
    return '₩' + price.toLocaleString('ko-KR');
  };

  // 심부름 현황 차트 설정
  const errandLineConfig = [
    { dataKey: 'completed', color: '#10B981', name: '완료' },
    { dataKey: 'requested', color: '#3B82F6', name: '요청' }
  ];

  // 수익 현황 차트 설정
  const revenueLineConfig = [
    { dataKey: 'revenue', color: '#F59E0B', name: '수익' }
  ];

  const getStatusText = (status: string) => {
    switch (status) {
      case 'waiting': return '대기중';
      case 'in_progress': return '진행중';
      case 'completed': return '완료';
      case 'cancelled': return '취소됨';
      default: return status;
    }
  };

  if (statsLoading || errandsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">데이터를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (statsError || errandsError) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <div className="text-red-800">
          <h3 className="font-medium">오류가 발생했습니다</h3>
          <p className="mt-1">{statsError || errandsError}</p>
        </div>
      </div>
    );
  }

  const dashboardStats = [
    {
      name: '총 회원수',
      value: stats?.totalUsers.toLocaleString() || '0',
      change: `${(stats?.userGrowth || 0) > 0 ? '+' : ''}${stats?.userGrowth || 0}%`,
      changeType: 'increase',
      icon: UserGroupIcon,
    },
    {
      name: '진행중인 심부름',
      value: stats?.inProgressErrands.toLocaleString() || '0',
      change: `${(stats?.errandGrowth || 0) > 0 ? '+' : ''}${stats?.errandGrowth || 0}%`,
      changeType: 'increase',
      icon: ClipboardDocumentListIcon,
    },
    {
      name: '완료된 심부름',
      value: stats?.completedErrands.toLocaleString() || '0',
      change: `${(stats?.errandGrowth || 0) > 0 ? '+' : ''}${stats?.errandGrowth || 0}%`,
      changeType: 'increase',
      icon: ClipboardDocumentListIcon,
    },
    {
      name: '총 수익',
      value: stats ? formatPrice(stats.totalRevenue) : '₩0',
      change: `${(stats?.revenueGrowth || 0) > 0 ? '+' : ''}${stats?.revenueGrowth || 0}%`,
      changeType: 'increase',
      icon: BanknotesIcon,
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">대시보드</h1>
        
        {/* 알림 버튼 */}
        <button
          onClick={() => setIsNotificationModalOpen(true)}
          className="relative p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        >
          <BellIcon className="h-6 w-6 text-gray-700" />
          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </button>
      </div>
      
      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {dashboardStats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <div className="flex items-center mt-2">
                  <ArrowTrendingUpIcon className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-500">{stat.change}</span>
                </div>
              </div>
              <div className="bg-blue-50 p-3 rounded-full">
                <stat.icon className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 최근 심부름 */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">최근 심부름</h2>
            <a href="/errands" className="text-sm text-blue-600 hover:text-blue-800">
              모두 보기
            </a>
          </div>
          <div className="space-y-4">
            {recentErrands.map((errand) => (
              <div key={errand.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{errand.title}</h3>
                  <p className="text-sm text-gray-600">의뢰자: {errand.clientName}</p>
                  <p className="text-xs text-gray-500">{new Date(errand.createdAt).toLocaleString('ko-KR')}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">{formatPrice(errand.fee)}</p>
                  <span 
                    className={`inline-block px-2 py-1 text-xs rounded-full ${
                      errand.status === 'completed' ? 'bg-green-100 text-green-800' :
                      errand.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {getStatusText(errand.status)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 주간 지역별 심부름 현황 */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">주간 심부름 현황</h2>
            <select 
              value={selectedRegion} 
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="강남구">강남구</option>
              <option value="서초구">서초구</option>
              <option value="송파구">송파구</option>
            </select>
          </div>
          <div className="h-64">
            <LineChart
              data={currentRegionData.errands}
              lines={errandLineConfig}
              title=""
              height={256}
              xAxisKey="day"
              formatTooltip={(value, name) => [value + '건', name === 'completed' ? '완료' : '요청']}
            />
          </div>
        </div>
      </div>

      {/* 주간 지역별 수익 현황 */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">주간 수익 현황</h2>
          <span className="text-sm text-gray-600">{selectedRegion}</span>
        </div>
        <div className="h-64">
          <LineChart
            data={currentRegionData.revenue}
            lines={revenueLineConfig}
            title=""
            height={256}
            xAxisKey="day"
            formatTooltip={(value) => [formatPrice(Number(value)), '수익']}
          />
        </div>
      </div>

      {/* 알림 모달 */}
      <NotificationModal
        isOpen={isNotificationModalOpen}
        onClose={() => setIsNotificationModalOpen(false)}
        notifications={notifications as any}
      />
    </div>
  );
}