// MainLayout.tsx
import React from 'react';
import AppHeader from './AppHeader'; // Header component
import AppSidebar from './AppSidebar'; // Sidebar component
import { Outlet } from 'react-router-dom'; // To render nested routes

const MainLayout: React.FC = () => {
  return (
    <div className="main-layout">
      <AppHeader /> {/* Header component */}
      <div className="layout-body">
        <AppSidebar /> {/* Sidebar component */}
        <div className="main-content">
          <Outlet /> {/* Render nested routes here */}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
