import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/components/Firebase";
import { doc, getDoc } from "firebase/firestore";

type UserData = {
    uid: string;
    email: string | null;
    name?: string;
};

const AuthContext = createContext<{ user: UserData | null }>({ user: null });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<UserData | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                // 🔹 Get Firestore info (e.g. name)
                const docRef = doc(db, "Users", firebaseUser.uid);
                const docSnap = await getDoc(docRef);

                setUser({
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    name: docSnap.exists() ? docSnap.data().name : firebaseUser.displayName || "",
                });
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
};

// Custom hook for easy access
export const useAuth = () => useContext(AuthContext);