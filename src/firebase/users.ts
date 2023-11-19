import { getDoc, doc, setDoc } from "firebase/firestore";
import { db } from "./config";
import { User } from "../providers";

const USERS = "users";

export const addUser = async (id: string, data: Omit<User, "id">) => {
  try {
    await setDoc(doc(db, USERS, id), data);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const getUser = async (id: string): Promise<null | User> => {
  const docRef = doc(db, USERS, id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = {
      id: docSnap.id,
      ...docSnap.data(),
    } as User;
    return data;
  } else {
    return null;
  }
};
