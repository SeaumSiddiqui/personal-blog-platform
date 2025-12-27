import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import { User, LogOut, Shield, ChevronDown } from 'lucide-react';

export const UserMenu: React.FC = () => {
  const { user, logout, isWebAdmin } = useAuth();
  const { isDarkMode } = useTheme();
  const [showMenu, setShowMenu] = useState(false);

  if (!user) return null;

  const handleLogout = () => {
    setShowMenu(false);
    logout();
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
          isDarkMode
            ? 'hover:bg-dark-border text-dark-text'
            : 'hover:bg-light-border text-light-text'
        }`}
      >
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
          isDarkMode ? 'bg-dark-border' : 'bg-light-border'
        }`}>
          <User className="w-4 h-4" />
        </div>
        <div className="hidden sm:block text-left">
          <div className="text-sm font-medium">
            {user.firstName || user.username}
          </div>
          {isWebAdmin() && (
            <div className={`text-xs ${
              isDarkMode ? 'text-primary-400' : 'text-primary-600'
            }`}>
              Admin
            </div>
          )}
        </div>
        <ChevronDown className="w-4 h-4" />
      </button>

      {/* User Menu */}
      {showMenu && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowMenu(false)}
          />

          {/* Menu */}
          <div className={`absolute right-0 top-full mt-2 w-64 rounded-lg shadow-lg border z-50 ${
            isDarkMode
              ? 'bg-dark-card border-dark-border'
              : 'bg-light-card border-light-border'
          }`}>
            <div className="p-4 border-b border-light-border dark:border-dark-border">
              <div className={`text-sm font-medium ${
                isDarkMode ? 'text-dark-text' : 'text-light-text'
              }`}>
                {user.firstName && user.lastName
                  ? `${user.firstName} ${user.lastName}`
                  : user.username
                }
              </div>
              <div className={`text-xs ${
                isDarkMode ? 'text-dark-text-secondary' : 'text-light-text-secondary'
              }`}>
                {user.email}
              </div>

              {/* Roles */}
              {user.roles.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {user.roles.map((role, index) => (
                    <span
                      key={index}
                      className={`inline-flex items-center space-x-1 px-2 py-1 text-xs rounded-full ${
                        role === 'web-admin'
                          ? isDarkMode
                            ? 'bg-primary-900/30 text-primary-400'
                            : 'bg-primary-100 text-primary-700'
                          : isDarkMode
                          ? 'bg-dark-border text-dark-text'
                          : 'bg-light-border text-light-text'
                      }`}
                    >
                      {role === 'web-admin' && <Shield className="w-3 h-3" />}
                      <span>{role}</span>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="py-2">
              <button
                onClick={handleLogout}
                className={`w-full flex items-center space-x-3 px-4 py-2 text-sm transition-colors duration-200 ${
                  isDarkMode
                    ? 'text-red-400 hover:bg-red-900/20'
                    : 'text-red-600 hover:bg-red-50'
                }`}
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};