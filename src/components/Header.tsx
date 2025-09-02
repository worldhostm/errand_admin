'use client';

import { useState } from 'react';
import { BellIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import NotificationModal from '@/app/_components/NotificationModal';
import notificationsData from '@/data/notificationsData.json';

export default function Header() {
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  
  const { notifications } = notificationsData;
  const unreadCount = notifications.filter((n: any) => !n.isRead).length;

  return (
    <>
      <div className="flex h-16 items-center justify-between bg-white px-6 shadow-sm">
        <div className="flex items-center">
          <h2 className="text-lg font-semibold text-gray-900">
            관리자 패널
          </h2>
        </div>
        
        <div className="flex items-center gap-x-4">
          <button
            type="button"
            onClick={() => setIsNotificationModalOpen(true)}
            className="relative rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <span className="sr-only">알림 보기</span>
            <BellIcon className="h-6 w-6" aria-hidden="true" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>
          
          <div className="flex items-center gap-x-2">
            <UserCircleIcon className="h-8 w-8 text-gray-400" />
            <div className="text-sm">
              <p className="font-medium text-gray-900">관리자</p>
              <p className="text-gray-500">admin@example.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* 알림 모달 */}
      <NotificationModal
        isOpen={isNotificationModalOpen}
        onClose={() => setIsNotificationModalOpen(false)}
        notifications={notifications as any}
      />
    </>
  );
}