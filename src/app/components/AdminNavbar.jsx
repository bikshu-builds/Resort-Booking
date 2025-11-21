import React from 'react';
import Link from 'next/link';

function AdminNavbar({username}) {
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

export default AdminNavbar