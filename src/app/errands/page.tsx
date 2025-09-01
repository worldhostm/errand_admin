'use client';

import { useState } from 'react';
import { 
  MagnifyingGlassIcon, 
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  MapPinIcon,
  ClockIcon,
  BanknotesIcon
} from '@heroicons/react/24/outline';
import { useErrands } from '@/hooks/useErrands';

type ErrandStatus = 'waiting' | 'in_progress' | 'completed' | 'cancelled';

export default function ErrandsPage() {
  const { errands, loading, error, updateErrand, deleteErrand } = useErrands();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | ErrandStatus>('all');
  const [filterCategory, setFilterCategory] = useState<'all' | string>('all');

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">심부름 데이터를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <div className="text-red-800">
          <h3 className="font-medium">오류가 발생했습니다</h3>
          <p className="mt-1">{error}</p>
        </div>
      </div>
    );
  }

  const categories = ['쇼핑대행', '서류업무', '펫케어', '청소', '배송', '기타'];

  const filteredErrands = errands.filter(errand => {
    const matchesSearch = errand.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         errand.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         errand.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || errand.status === filterStatus;
    const matchesCategory = filterCategory === 'all';
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleStatusChange = async (errandId: string, newStatus: ErrandStatus) => {
    try {
      await updateErrand(errandId, { status: newStatus });
    } catch (err) {
      console.error('Failed to update errand status:', err);
    }
  };

  const handleDeleteErrand = async (errandId: string) => {
    if (confirm('정말로 이 심부름을 삭제하시걠습니까?')) {
      try {
        await deleteErrand(errandId);
      } catch (err) {
        console.error('Failed to delete errand:', err);
      }
    }
  };

  const getStatusColor = (status: ErrandStatus) => {
    switch (status) {
      case 'waiting': return 'bg-yellow-100 text-yellow-800';
      case 'in_progress': return 'bg-purple-100 text-purple-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: ErrandStatus) => {
    switch (status) {
      case 'waiting': return '대기중';
      case 'in_progress': return '진행중';
      case 'completed': return '완료';
      case 'cancelled': return '취소됨';
      default: return status;
    }
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('ko-KR') + '원';
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">심부름 관리</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
          <PlusIcon className="h-4 w-4" />
          새 심부름 등록
        </button>
      </div>

      {/* 검색 및 필터 */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="제목, 의뢰자, 위치 검색..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as 'all' | ErrandStatus)}
          >
            <option value="all">모든 상태</option>
            <option value="waiting">대기중</option>
            <option value="in_progress">진행중</option>
            <option value="completed">완료</option>
            <option value="cancelled">취소됨</option>
          </select>
          
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="all">모든 카테고리</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          
          <div className="text-sm text-gray-500 flex items-center">
            총 {filteredErrands.length}건
          </div>
        </div>
      </div>

      {/* 심부름 목록 그리드 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredErrands.map((errand) => (
          <div key={errand.id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{errand.title}</h3>
                  <span className={`inline-block px-2 py-1 text-xs rounded-full ${getStatusColor(errand.status)}`}>
                    {getStatusText(errand.status)}
                  </span>
                </div>
                <div className="flex items-center gap-1 ml-4">
                  <button className="text-blue-600 hover:text-blue-800 p-1">
                    <EyeIcon className="h-4 w-4" />
                  </button>
                  <button className="text-gray-600 hover:text-gray-800 p-1">
                    <PencilIcon className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => handleDeleteErrand(errand.id)}
                    className="text-red-600 hover:text-red-800 p-1"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{errand.description}</p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-500">
                  <MapPinIcon className="h-4 w-4 mr-2" />
                  {errand.location}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <ClockIcon className="h-4 w-4 mr-2" />
                  마감: {new Date(errand.dueDate).toLocaleString('ko-KR')}
                </div>
                <div className="flex items-center text-sm text-gray-900 font-medium">
                  <BanknotesIcon className="h-4 w-4 mr-2" />
                  {formatPrice(errand.fee)}
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center text-sm">
                  <div>
                    <span className="text-gray-500">의뢰자:</span>
                    <span className="ml-1 font-medium">{errand.clientName}</span>
                  </div>
                  {errand.workerName && (
                    <div>
                      <span className="text-gray-500">담당자:</span>
                      <span className="ml-1 font-medium">{errand.workerName}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* 상태 변경 버튼 */}
              <div className="mt-4 pt-4 border-t">
                <select
                  value={errand.status}
                  onChange={(e) => handleStatusChange(errand.id, e.target.value as ErrandStatus)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="waiting">대기중</option>
                  <option value="in_progress">진행중</option>
                  <option value="completed">완료</option>
                  <option value="cancelled">취소됨</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 페이지네이션 */}
      <div className="flex items-center justify-between mt-8">
        <div className="text-sm text-gray-500">
          1-{filteredErrands.length} of {filteredErrands.length} results
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
            이전
          </button>
          <button className="px-3 py-2 text-sm bg-blue-600 text-white rounded-lg">
            1
          </button>
          <button className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
            다음
          </button>
        </div>
      </div>
    </div>
  );
}