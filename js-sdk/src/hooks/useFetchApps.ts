/**
 * Retrieves all enabled applications, including ecosystem apps.
 *
 * @returns {Promise<Application[]>} A promise that resolves to an array of all enabled applications and ecosystem apps.
 *
 * @example
 * // Example of retrieving the list of all enabled applications, including ecosystem apps
 * const apps = await Cobalt.getApps();
 * console.log(apps);
 */

"use client";

import { useState, useEffect, useCallback } from "react";
import useCobalt from "@/hooks/useCobalt";
import { Application } from "@/types/cobalt";

const useFetchApps = () => {
  // Destructuring Cobalt instance from custom hook
  const { Cobalt } = useCobalt();

  // State to store the fetched applications
  const [apps, setApps] = useState<Application[]>([]);

  // State to track loading status
  const [loading, setLoading] = useState(false);

  // State to store error message if any occurs
  const [error, setError] = useState<string | null>(null);

  /**
   * Function to fetch applications using Cobalt.getApps().
   * Sets loading state, handles success and error cases, and updates state accordingly.
   */
  const fetchApps = useCallback(async () => {
    setLoading(true); // Start loading
    setError(null); // Reset previous error

    try {
      // Check if Cobalt is initialized before making a request
      if (!Cobalt) {
        throw new Error("Cobalt is not initialized");
      }

      // Fetch applications using the Cobalt SDK
      const res = await Cobalt.getApps();
      setApps(res); // Update state with the fetched applications
    } catch (err: any) {
      // Handle any errors that occur during fetch
      console.error("Error fetching apps:", err);
      setError(err.message || "An error occurred while fetching apps."); // Set error state
    } finally {
      setLoading(false); // End loading state
    }
  }, [Cobalt]); // Dependency array to re-create fetchApps only when Cobalt changes

  /**
   * Fetch applications on component mount or when Cobalt instance is available.
   */
  useEffect(() => {
    if (Cobalt) {
      fetchApps(); // Fetch apps when Cobalt is initialized
    }
  }, [Cobalt, fetchApps]); // Run useEffect again if Cobalt or fetchApps changes

  // Return the state variables and the refetch function
  return { apps, loading, error, refetch: fetchApps };
};

export default useFetchApps;
