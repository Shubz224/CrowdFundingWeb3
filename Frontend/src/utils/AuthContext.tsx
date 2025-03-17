import { createContext, useContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../auth/firebaseConfig'; // Make sure you import the auth instance

interface AuthContextType {
    user: any;
    loginWithGoogle: () => Promise<void>;
    logout: () => Promise<void>;
}

// ✅ Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<any>(null);

    // ✅ Monitor auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });
        return () => unsubscribe();
    }, []);

    // ✅ Define loginWithGoogle function
    const loginWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            setUser(result.user);
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    // ✅ Define logout function
    const logout = async () => {
        try {
            await signOut(auth);
            setUser(null);
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loginWithGoogle, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// ✅ Hook for easy usage in components
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
