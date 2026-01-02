import { createClient } from "@/utils/supabase/client";
import { useEffect, useState, useCallback } from "react";
import { User } from "@supabase/supabase-js";

// Define the shape of your 'users' table data here
export interface UserDetails {
  id: string;
  role: string;
  // add other columns from your 'users' table here (e.g., full_name, avatar_url)
  [key: string]: any; 
}

export const useUserDetail = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const supabase = createClient();

  const fetchUserDetails = useCallback(async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Error fetching user details:", error);
        return null;
      }
      
      setUserDetails(data);
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  }, [supabase]);

  useEffect(() => {
    const initializeAuth = async () => {
      setIsLoading(true);
      
      // 1. Get initial session
      const { data: { session } } = await supabase.auth.getSession();
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      console.log(currentUser);

      // 2. If user exists, fetch their details immediately
      if (currentUser) {
        await fetchUserDetails(currentUser.id);
      }
      
      setIsLoading(false);
    };

    initializeAuth();

    // 3. Listen for auth changes (login, logout, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const currentUser = session?.user ?? null;
        setUser(currentUser);

        if (currentUser) {
          // If logging in, fetch details
          await fetchUserDetails(currentUser.id);
        } else {
          // If logging out, clear details
          setUserDetails(null);
        }
        
        setIsLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, [supabase, fetchUserDetails]);

  // Return the auth user, the database profile, and loading status
  return { user, userDetails, isLoading };
};