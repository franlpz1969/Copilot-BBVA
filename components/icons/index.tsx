import React from 'react';

export const CheckCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const DocumentIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

export const ChevronDownIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
);

export const ChevronUpIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
  </svg>
);


export const BellIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
);

export const PaperAirplaneIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
    </svg>
);

export const SparklesIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0m-11.314 0a5 5 0 017.072 0" />
    </svg>
);

export const XIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

export const ExclamationTriangleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);

export const ArrowCircleRightIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const AnalyticsIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
    </svg>
);

export const SyncIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5M20 20v-5h-5M4 4l1.5 1.5A9 9 0 0120 12h-2a7 7 0 00-11-6.32M20 20l-1.5-1.5A9 9 0 014 12H6a7 7 0 0011 6.32" />
    </svg>
);

export const ShieldCheckIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.417l5.318-3.047a12.02 12.02 0 015.364 0l5.318 3.047A12.02 12.02 0 0021 8.958a11.955 11.955 0 01-2.382-3.972z" />
    </svg>
);

export const CheckBadgeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>
);

export const UserCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

export const ChartBarIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
);

export const ArrowsRightLeftIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
    </svg>
);

export const BanknotesIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

export const SearchIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

export const FilterIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h18M6 8h12m-9 4h6" />
    </svg>
);

export const ArrowRightIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
);

// FIX: Add missing ArrowUpIcon and ArrowDownIcon components
export const ArrowUpIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19V5m0 0l-7 7m7-7l7 7" />
    </svg>
);

export const ArrowDownIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v14m0 0l-7-7m7 7l7-7" />
    </svg>
);

export const CreditCardIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M4.5 3.75a3 3 0 00-3 3v10.5a3 3 0 003 3h15a3 3 0 003-3V6.75a3 3 0 00-3-3h-15z" />
    <path fill="#FFFFFF" d="M4 7.5h16v2H4z" />
  </svg>
);

export const ReceiptPercentIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v11.25c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875V4.875C22.5 3.839 21.66 3 20.625 3H3.375zM9 12.75a.75.75 0 000 1.5h6a.75.75 0 000-1.5H9zM7.125 10.5A.375.375 0 017.5 10.125h9a.375.375 0 010 .75h-9a.375.375 0 01-.375-.375zM12 7.5a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25zM15.375 8.625a1.125 1.125 0 10-2.25 0 1.125 1.125 0 002.25 0zM8.625 8.625a1.125 1.125 0 10-2.25 0 1.125 1.125 0 002.25 0z" clipRule="evenodd" />
  </svg>
);

export const CalendarDaysIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3-3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zM5.25 6.75c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h13.5c.621 0 1.125-.504 1.125-1.125V7.875c0-.621-.504-1.125-1.125-1.125H5.25z" clipRule="evenodd" />
    <path d="M10.5 12a.75.75 0 00-1.5 0v.092l-1.64.656a.75.75 0 00.58 1.392l1.06-.424v3.126c0 .414.336.75.75.75s.75-.336.75-.75v-3.126l1.06.424a.75.75 0 10.58-1.392l-1.64-.656V12z" />
  </svg>
);

export const LeafIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12.965 2.222c.224-.688-.122-1.44-.81-1.664s-1.44.122-1.664.81l-3.328 10.187H2.25a.75.75 0 000 1.5h4.634l-2.45 7.518a.75.75 0 101.432.468l3.046-9.352 2.45-7.518 1.57 4.818H21.75a.75.75 0 000-1.5h-4.634l-3.34-10.264z" />
  </svg>
);

export const LightBulbIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2.25a.75.75 0 01.75.75v2.392c.214.064.42.14.618.231l1.696-1.211a.75.75 0 11.894 1.248l-1.21 1.696c.091.198.167.404.231.618h2.392a.75.75 0 110 1.5h-2.392a6.963 6.963 0 01-.231.618l1.21 1.696a.75.75 0 11-.894 1.248l-1.696-1.211a6.953 6.953 0 01-.618.231v2.392a.75.75 0 11-1.5 0v-2.392c-.214-.064-.42-.14-.618-.231l-1.696 1.211a.75.75 0 11-.894-1.248l1.21-1.696a6.963 6.963 0 01-.231-.618H4.5a.75.75 0 110-1.5h2.392c.064-.214.14-.42.231-.618l-1.21-1.696a.75.75 0 01.894-1.248l1.696 1.211c.198-.091.404-.167.618-.231V3a.75.75 0 01.75-.75zM10.5 12a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
    <path fillRule="evenodd" d="M12 18a.75.75 0 00.75-.75 6 6 0 00-12 0 .75.75 0 00.75.75h10.5z" clipRule="evenodd" />
  </svg>
);

export const CalculatorIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M4.5 3.75A.75.75 0 015.25 3h13.5a.75.75 0 01.75.75v16.5a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V3.75zM8.25 7.5a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V8.25a.75.75 0 01.75-.75h.75zm.75 2.25a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.75a.75.75 0 00.75-.75v-.008a.75.75 0 00-.75-.75H9zm2.25.75a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.75a.75.75 0 01-.75-.75v-.008a.75.75 0 01.75-.75h.75zM12 7.5a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.75a.75.75 0 00.75-.75V8.25a.75.75 0 00-.75-.75h-.75zm.75 2.25a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.75a.75.75 0 01-.75-.75v-.008a.75.75 0 01.75-.75h.75zm2.25.75a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.75a.75.75 0 00.75-.75v-.008a.75.75 0 00-.75-.75h-.75zM15 7.5a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.75a.75.75 0 01-.75-.75V8.25a.75.75 0 01.75-.75h.75zm.75 3.75a.75.75 0 00-.75.75v3.008a.75.75 0 00.75.75h.75a.75.75 0 00.75-.75v-3.008a.75.75 0 00-.75-.75h-.75zM9 15a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V15.75a.75.75 0 01.75-.75H9z" clipRule="evenodd" />
  </svg>
);

export const VideoCameraIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M4.5 4.5a3 3 0 00-3 3v9a3 3 0 003 3h8.25a3 3 0 003-3v-2.252a3.001 3.001 0 00.623-1.023l3.634-3.635a.75.75 0 011.06 1.06l-3.634 3.635a3 3 0 00-1.023.622V16.5a3 3 0 003-3v-1.528l3.635 3.634a.75.75 0 001.06-1.06l-3.635-3.634a3.001 3.001 0 00-1.023-.623H18a3 3 0 00-3 3V12a.75.75 0 01-1.5 0v-1.5a3 3 0 00-3-3H4.5z" />
  </svg>
);

export const BookOpenIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3A5.25 5.25 0 0012 1.5zm-3.75 5.25a3.75 3.75 0 017.5 0v3h-7.5v-3z" clipRule="evenodd" />
  </svg>
);

export const UserGroupIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.12v-.003zM12.375 19.125a5.625 5.625 0 0111.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.12v-.003z" />
  </svg>
);

export const KeyIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M15.75 1.5a3.75 3.75 0 00-3.75 3.75v4.5a.75.75 0 01-1.5 0v-4.5a5.25 5.25 0 0110.5 0v4.5a.75.75 0 01-1.5 0v-4.5A3.75 3.75 0 0015.75 1.5z" clipRule="evenodd" />
    <path d="M12.75 12.75a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75z" />
    <path fillRule="evenodd" d="M12 15a.75.75 0 01.75-.75h6a.75.75 0 010 1.5h-6a.75.75 0 01-.75-.75z" clipRule="evenodd" />
    <path fillRule="evenodd" d="M12.75 17.25a.75.75 0 01.75-.75h3a.75.75 0 010 1.5h-3a.75.75 0 01-.75-.75z" clipRule="evenodd" />
    <path d="M14.25 9.75a.75.75 0 00-1.5 0v11.25a.75.75 0 001.5 0V9.75z" />
    <path fillRule="evenodd" d="M4.5 9.75A.75.75 0 015.25 9h3.75a.75.75 0 01.75.75v11.25a.75.75 0 01-1.5 0V15.75h-2.25v5.25a.75.75 0 01-1.5 0V9.75z" clipRule="evenodd" />
  </svg>
);

export const QuestionMarkCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.79 4 4 0 1.105-.448 2.105-1.172 2.828l-1.036 1.036c-.378.378-.898.634-1.464.634h-.002c-.566 0-1.086-.256-1.464-.634l-.49-.49a2.25 2.25 0 010-3.182.996.996 0 000-1.414zM12 21a9 9 0 100-18 9 9 0 000 18z" />
  </svg>
);

export const DevicePhoneMobileIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zM5.25 6.75c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h13.5c.621 0 1.125-.504 1.125-1.125V7.875c0-.621-.504-1.125-1.125-1.125H5.25z" clipRule="evenodd" />
  </svg>
);

export const BuildingStorefrontIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M13.5 2.25a.75.75 0 01.75.75v2.25H18a.75.75 0 01.75.75v2.25H21a.75.75 0 01.75.75v2.25H18a.75.75 0 01-.75.75h-2.25v2.25a.75.75 0 01-.75.75h-2.25a.75.75 0 01-.75-.75V15H8.25a.75.75 0 01-.75-.75v-2.25H3a.75.75 0 01-.75-.75V8.25H6a.75.75 0 01.75-.75h2.25V5.25a.75.75 0 01.75-.75h3.75z" />
    <path fillRule="evenodd" d="M3 19.5a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75zM12 2.25A.75.75 0 0011.25 3v2.25H8.25a.75.75 0 00-.75.75v2.25H3.75a.75.75 0 00-.75.75v2.25H6a.75.75 0 00.75.75h2.25V15a.75.75 0 00.75.75h2.25a.75.75 0 00.75-.75v-2.25H15a.75.75 0 00.75-.75v-2.25h3.75a.75.75 0 00.75-.75V8.25H18a.75.75 0 00-.75-.75h-2.25V5.25a.75.75 0 00-.75-.75H12z" clipRule="evenodd" />
  </svg>
);

export const ChevronDoubleLeftIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z" clipRule="evenodd" />
  </svg>
);

export const ChevronDoubleRightIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z" clipRule="evenodd" />
  </svg>
);

export const GavelIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M6.75 3.75A.75.75 0 017.5 3h9a.75.75 0 01.75.75v1.5a.75.75 0 01-.75.75h-9a.75.75 0 01-.75-.75v-1.5z" clipRule="evenodd" />
    <path d="M3.323 7.012a.75.75 0 01.936-.51l15.712 4.935a.75.75 0 01-.51.936l-15.713 4.935a.75.75 0 01-.936-.51L3.323 7.012z" />
    <path fillRule="evenodd" d="M9 18a.75.75 0 00-.75.75v2.25a.75.75 0 001.5 0v-2.25A.75.75 0 009 18zm6 0a.75.75 0 00-.75.75v2.25a.75.75 0 001.5 0v-2.25a.75.75 0 00-.75-.75z" clipRule="evenodd" />
  </svg>
);

export const ShareIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M15.75 4.5a3 3 0 11.825 2.066l-8.421 4.679a3.002 3.002 0 010 1.51l8.421 4.679a3 3 0 11-.729 1.31l-8.421-4.678a3 3 0 110-4.132l8.421-4.679a3 3 0 01-.096-.755z" clipRule="evenodd" />
  </svg>
);

export const MicrophoneIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M8.25 4.5a3.75 3.75 0 117.5 0v8.25a3.75 3.75 0 11-7.5 0V4.5z" />
    <path d="M6 10.5a.75.75 0 01.75.75v1.5a5.25 5.25 0 1010.5 0v-1.5a.75.75 0 011.5 0v1.5a6.75 6.75 0 11-13.5 0v-1.5A.75.75 0 016 10.5z" />
  </svg>
);

export const StopCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.5 6a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v6a.75.75 0 01-.75.75h-1.5a.75.75 0 01-.75-.75v-6z" clipRule="evenodd" />
    </svg>
);

export const WhatsappIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.11 4.9a9.88 9.88 0 0 0-14.22 0 9.88 9.88 0 0 0 0 14.22A9.92 9.92 0 0 0 12 21.5a9.89 9.89 0 0 0 7.11-2.9 9.88 9.88 0 0 0 0-14.22m-1.29 12.93a8.38 8.38 0 0 1-11.64 0 8.38 8.38 0 0 1 0-11.64 8.41 8.41 0 0 1 11.64 0 8.38 8.38 0 0 1 0 11.64m-5.38-4.83h-.23a1.44 1.44 0 0 1-1.23-.75 2.39 2.39 0 0 0-2.3-1.51.7.7 0 0 1-.72-.72 2.7 2.7 0 0 1 1.7-2.33.69.69 0 0 1 .89.28l.33.56a.71.71 0 0 1-.1.93 1.25 1.25 0 0 0-.31.85 1.49 1.49 0 0 0 1.5 1.49.52.52 0 0 0 .33-.1l.4-.33a.71.71 0 0 1 .86-.06l1.73 1a.7.7 0 0 1 .31.84 3.33 3.33 0 0 1-2.18 2M15.4 9.4a.71.71 0 0 1-1-.24.71.71 0 0 1 .24-1 4.79 4.79 0 0 0-4.73-3.32.7.7 0 0 1 0-1.4 6.22 6.22 0 0 1 6.16 4.3.71.71 0 0 1-.67.66"/>
    </svg>
);

export const ChatBubbleLeftRightIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M2.25 12.75a.75.75 0 01.75-.75h13.5a.75.75 0 010 1.5H3a.75.75 0 01-.75-.75zM2.25 6a.75.75 0 01.75-.75h13.5a.75.75 0 010 1.5H3a.75.75 0 01-.75-.75zM2.25 18a.75.75 0 01.75-.75h13.5a.75.75 0 010 1.5H3a.75.75 0 01-.75-.75z" clipRule="evenodd" />
    </svg>
);

export const PhoneIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.279-.087.431l4.258 7.373c.077.152.254.179.356.043l1.293-.972a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
    </svg>
);

export const BuildingOfficeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M4.5 2.25a.75.75 0 00-.75.75v12.75a.75.75 0 00.75.75h.75v-.75a.75.75 0 01.75-.75h3a.75.75 0 01.75.75v.75h.75a.75.75 0 00.75-.75V6.31l-5.47 5.47a.75.75 0 01-1.06-1.06L9.53 5.38C8.807 4.954 8.25 4.515 8.25 3a.75.75 0 00-.75-.75h-3z" clipRule="evenodd" />
      <path d="M10.5 4.875a.75.75 0 00-1.5 0v4.652a1.875 1.875 0 01-1.875 1.875H3.75v5.378a.75.75 0 001.5 0v-4.628a.375.375 0 01.375-.375h3.375a.375.375 0 01.375.375v4.628a.75.75 0 001.5 0v-5.378h1.875a1.875 1.875 0 011.875-1.875v-4.652z" />
      <path d="M12.75 6a.75.75 0 00-1.5 0v.875a.75.75 0 001.5 0V6zM13.5 8.25a.75.75 0 01.75-.75h3a.75.75 0 01.75.75v.875a.75.75 0 01-1.5 0V9h-1.5a.75.75 0 01-.75-.75zM13.5 12a.75.75 0 01.75-.75h3a.75.75 0 01.75.75v.875a.75.75 0 01-1.5 0v-.125h-1.5a.75.75 0 01-.75-.75zM13.5 15.75a.75.75 0 01.75-.75h3a.75.75 0 01.75.75v.875a.75.75 0 01-1.5 0v-.125h-1.5a.75.75 0 01-.75-.75z" />
      <path fillRule="evenodd" d="M12.75 21.75a.75.75 0 00.75-.75v-2.193l3.39 1.13a.75.75 0 00.86-.213l2.122-3.676a.75.75 0 00-.43-1.002l-3.39-1.13a.75.75 0 00-.651.111l-.66.508a.75.75 0 00-.339.65V21a.75.75 0 00.75.75zm3.75-5.602a.75.75 0 01.43 1.002l-2.121 3.676a.75.75 0 01-.86.213l-3.39-1.13a.75.75 0 01-.75-.75v-2.193a.75.75 0 01.339-.65l.66-.508a.75.75 0 01.651-.11l3.39 1.13a.75.75 0 01.43.213z" clipRule="evenodd" />
    </svg>
);

export const SunIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.106a.75.75 0 011.06-1.06l1.591 1.59a.75.75 0 01-1.06 1.061l-1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.836 17.836a.75.75 0 01-1.06 1.06l-1.59-1.591a.75.75 0 011.06-1.06l1.59 1.591zM12 18a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.164 6.164a.75.75 0 01-1.06-1.06l-1.591 1.59a.75.75 0 11-1.06-1.061l1.59-1.591A.75.75 0 017.164 6.164zM4.5 12a.75.75 0 01-.75.75H1.5a.75.75 0 010-1.5h2.25a.75.75 0 01.75.75zM6.106 17.836a.75.75 0 011.06 1.06l-1.59 1.591a.75.75 0 11-1.06-1.06l1.59-1.591z" />
  </svg>
);

export const MoonIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.976.75.75 0 01.981.635A11.25 11.25 0 0118 15.75 11.25 11.25 0 016.75 4.5c0-.677.099-1.334.282-1.951a.75.75 0 01.819-.162z" clipRule="evenodd" />
  </svg>
);