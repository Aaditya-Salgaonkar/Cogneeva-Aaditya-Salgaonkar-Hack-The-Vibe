import React from 'react';
import { ClerkProvider } from '@clerk/clerk-react';
import { AppRouter } from '@/components/AppRouter';

const Layout = () => {
  return (
    <ClerkProvider frontendApi='your-frontend-api'>
      <nav>
        <ul>
          <li>
            <AppRouter route='dashboard' label='Dashboard' />
          </li>
          <li>
            <AppRouter route='projects' label='Projects' />
          </li>
          <li>
            <AppRouter route='billing' label='Billing' />
          </li>
          <li>
            <AppRouter route='analytics' label='Analytics' />
          </li>
          <li>
            <AppRouter route='settings' label='Settings' />
          </li>
        </ul>
      </nav>
      <main>
        {/* Your page components will be rendered here */}
      </main>
    </ClerkProvider>
  );
};

export default Layout;