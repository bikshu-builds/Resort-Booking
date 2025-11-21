import React from 'react';
import { auth } from '@/app/auth';
import UserNavigation from './components/UserNavigation';
import Admin from '@/app/admin/page';
import AdminNavbar from './components/AdminNavbar'; // your admin component
import ProductCollection from './components/ProductCollection';

async function Page() {
  const session = await auth();
  const username = session?.username || null;
  const role = session?.role || null;

  console.log("Session in Page:", session);

  return (
    <>
      {/* If ADMIN → show admin page only */}
      {role === "admin" && (
        <>
        <AdminNavbar username={username} />
          <Admin />
          <h1>Welcome Admin to the Holiday Resort</h1>
        </>
      )}

      {/* If USER → show user navbar + content */}
      {role === "user" && (
        <>
          <UserNavigation username={username} />

          {username ? (
            <>
              <h1>Welcome to the Holiday Resort</h1>
              <ProductCollection/>
            </>
          ) : (
            <h1>Please sign in to continue</h1>

          )}
        </>
      )}

      {/* If NO SESSION at all */}
      {!role && (
        <>
          <UserNavigation username={null} />
          <h1>Please sign in</h1>
        </>
      )}
    </>
  );
}

export default Page;
