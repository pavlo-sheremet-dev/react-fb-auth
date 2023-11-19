import { Suspense } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../providers";

export const Layout = () => {
  const { user, signOut } = useAuth();
  return (
    <>
      <header>
        <div className="flex gap-4 justify-between px-4 py-4">
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
              {!user && (
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
              )}
              {user && (
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
              )}
            </ul>
          </nav>
          {user && (
            <button
              type="button"
              className="block px-4 py-2 bg-slate-300 hover:bg-slate-400 border rounded"
              onClick={signOut}
            >
              Sign out
            </button>
          )}
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
