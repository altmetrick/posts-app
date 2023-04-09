import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <h1>Header</h1>
      <main className="main-container">
        <Outlet />
      </main>
      <h2>Footer</h2>
    </>
  );
};

export default Layout;
