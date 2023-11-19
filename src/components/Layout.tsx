import { Suspense } from "react";
import { NavLink, Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <>
      <header>
        <div>
          <nav>
            <ul className="flex gap-4">
              <li>
                <NavLink
                  className={({ isActive }) =>
                    `block px-4 py-2 bg-slate-300 hover:bg-slate-400 border rounded ${
                      isActive ? "bg-slate-400" : ""
                    }`
                  }
                  to={"/"}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    `block px-4 py-2 bg-slate-300 hover:bg-slate-400 border rounded ${
                      isActive ? "bg-slate-400" : ""
                    }`
                  }
                  to={"/sign-in"}
                >
                  Sign in
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    `block px-4 py-2 bg-slate-300 hover:bg-slate-400 border rounded ${
                      isActive ? "bg-slate-400" : ""
                    }`
                  }
                  to={"/user"}
                >
                  User
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main>
        <Suspense>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
};
