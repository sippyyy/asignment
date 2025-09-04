'use client'

import React, { useState } from 'react'
import { useAuthStore } from '../store/authStore'
import { useRouter } from 'next/navigation'
import { Search, User, Settings, LogOut, Menu, X } from 'lucide-react'
import IconButtonStyled from './IconButtonStyled'
import { useSearchStore } from '../store/searchStore'
import useDebounceEffect from '../hooks/useDebounceEffect'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const { setSearchQuery } = useSearchStore()
  const { logout, isAuthenticated } = useAuthStore()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/login')
    setIsMenuOpen(false)
  }

  const menuItems = [
    {
      icon: <User className="w-5 h-5" />,
      label: 'Profile',
      onClick: () => {
        console.log('Profile clicked')
        setIsMenuOpen(false)
      }
    },
    {
      icon: <Settings className="w-5 h-5" />,
      label: 'Settings & Privacy',
      onClick: () => {
        console.log('Settings & Privacy clicked')
        setIsMenuOpen(false)
      }
    },
    {
      icon: <LogOut className="w-5 h-5" />,
      label: 'Logout',
      onClick: handleLogout
    }
  ]

  useDebounceEffect(() => {
    setSearchQuery(searchValue)
  }, [searchValue], 300)

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 right-0 z-50">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2">
          <div className="flex items-center">
            <div className="text-title-md font-bold text-main-shine">
              YourLogo
            </div>
          </div>
          {isAuthenticated && (
            <>
              <div className="flex flex-1 max-w-lg">
                <div className="w-full relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="w-5 h-5 text-main-shine" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main-shine focus:border-main-shine outline-none transition-colors text-md"
                  />
                </div>
              </div>
              <div className="hidden md:flex items-center space-x-4">
                {menuItems.map((item, index) => (
                  <span key={item.label}>
                    <IconButtonStyled
                      key={item.label}
                      icon={item.icon}
                      label={item.label}
                      onClick={item.onClick}
                    />
                  </span>
                ))}
              </div>
              <div className="md:hidden">
                <IconButtonStyled
                  icon={isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                  label="Toggle menu"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                />
              </div>
            </>
          )}
        </div>
        {isMenuOpen && isAuthenticated && (
          <div className="md:hidden bg-white border-t border-gray-200 py-4 space-y-2">
            {menuItems.map((item, index) => (
              <button
                key={item.label}
                onClick={item.onClick}
                className="w-full cursor-pointer flex items-center space-x-3 px-4 py-3 text-main-shine hover:bg-main-shine/10 transition-colors text-left"
              >
                {item.icon}
                <span className="text-md font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}

export default Header