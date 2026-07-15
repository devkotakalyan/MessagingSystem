import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import { getSession, onAuthStateChange, signIn, signOut, signUp } from "../services/authService";
import { getProfile, setOnlineStatus } from "../services/profileService";
import { AuthContext } from "./auth-context";

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let subscription;

    (async () => {
      const initialSession = await getSession();
      setSession(initialSession);
      if (initialSession?.user) {
        setProfile(await getProfile(initialSession.user.id));
        setOnlineStatus(initialSession.user.id, true);
      }
      setLoading(false);
    })();

    subscription = onAuthStateChange(async (_event, newSession) => {
      setSession(newSession);
      if (newSession?.user) {
        setProfile(await getProfile(newSession.user.id));
      } else {
        setProfile(null);
      }
    });

    const handleUnload = () => {
      if (session?.user) setOnlineStatus(session.user.id, false);
    };
    window.addEventListener("beforeunload", handleUnload);

    return () => {
      subscription?.unsubscribe();
      window.removeEventListener("beforeunload", handleUnload);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = {
    session,
    user: session?.user ?? null,
    profile,
    loading,
    refreshProfile: async () => {
      if (session?.user) setProfile(await getProfile(session.user.id));
    },
    login: signIn,
    register: signUp,
    logout: async () => {
      if (session?.user) await setOnlineStatus(session.user.id, false);
      await signOut();
    },
    supabase,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
