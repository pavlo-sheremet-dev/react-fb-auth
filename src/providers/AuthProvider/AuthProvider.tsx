import { createContext, useEffect, useState } from "react";
import { addUser, getUser } from "../../firebase/users";

import {
  GoogleAuthProvider,
  getAuth,
  signOut as fbSignOut,
  onAuthStateChanged,
  signInWithPopup,
  User as FirebaseUser,
} from "firebase/auth";
import { app } from "../../firebase/config";

const provider = new GoogleAuthProvider();
const auth = getAuth(app);

export interface User {
  id: FirebaseUser["uid"];
  name: FirebaseUser["displayName"];
  email: FirebaseUser["email"];
  avatar: FirebaseUser["photoURL"];
  subscribe: "default" | "silver" | "gold";
}

interface Context {
  user: User | null;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<Context>({
  user: null,
  signInWithGoogle: async () => {},
  signOut: async () => {},
});

interface Props {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) return setUser(null);

      const { uid, email, photoURL, displayName } = user;

      const currentUser = await getUser(uid);

      if (!currentUser) {
        const data: Omit<User, "id"> = {
          email,
          name: displayName,
          avatar: photoURL,
          subscribe: "default",
        };

        await addUser(uid, data);

        setUser({ ...data, id: uid });
      }

      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const signInWithGoogle = async () => {
    await signInWithPopup(auth, provider);
  };

  const signOut = async () => {
    await fbSignOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
