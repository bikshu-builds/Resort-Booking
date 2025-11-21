'use client'
import Link from 'next/link'
import React from 'react'

function UserNavigation({ username }) {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 24px',
        backgroundColor: '#1a73e8',
        color: 'white',
        boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
      }}
    >
      {/* Left Section */}
      <div style={{ fontSize: '22px', fontWeight: 'bold' }}>
        Holiday Resort
      </div>

      {/* Center Section (Always visible when logged in) */}
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        {username && (
          <Link href="/user/invoice">
            <div
              style={{
                cursor: 'pointer',
                fontSize: '16px',
                padding: '6px 10px',
                borderRadius: '4px',
                transition: '0.3s',
              }}
            >
              Bookings
            </div>
          </Link>
        )}
      </div>

      {/* Right Section - Changes based on login */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {username ? (
          <>
            <p style={{ margin: 0, fontSize: '16px' }}>
              Welcome: <strong>{username}</strong>
            </p>

            <Link href="/api/auth/signout">
              <div
                style={{
                  cursor: 'pointer',
                  padding: '8px 14px',
                  backgroundColor: '#ff4d4d',
                  borderRadius: '5px',
                  fontSize: '14px',
                  color: 'white',
                  transition: '0.3s',
                }}
              >
                Sign Out
              </div>
            </Link>
          </>
        ) : (
          <Link href="/login">
            <div
              style={{
                cursor: 'pointer',
                padding: '8px 14px',
                backgroundColor: '#34a853',
                borderRadius: '5px',
                fontSize: '14px',
                color: 'white',
                transition: '0.3s',
              }}
            >
              Login
            </div>
          </Link>
        )}
      </div>
    </div>
  )
}

export default UserNavigation
