import { useState, useEffect } from "react";
import { fetchNotifications } from "../api/notifications";
import { getToken } from "../utils/auth";
import { Log } from "../utils/logger";

export function useNotifications(params = {}) {
  const token = getToken();

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(!!token);
  const [error, setError] = useState(token ? null : new Error("No access token found"));
  const [total, setTotal] = useState(0);

  const paramsStr = JSON.stringify(params);

  useEffect(() => {
    if (!token) return;

    const load = async () => {
      setLoading(true);
      setError(null);

      try {
        await Log(
          "frontend",
          "info",
          "hook",
          "Fetching notifications",
          token
        );

        const data = await fetchNotifications(token, JSON.parse(paramsStr));

        setNotifications(data || []);
        setTotal(data?.length || 0);

        await Log(
          "frontend",
          "info",
          "hook",
          "Notifications loaded successfully",
          token
        );
      } catch (err) {
        setError(err);

        await Log(
          "frontend",
          "error",
          "hook",
          `Failed to load notifications: ${err.response?.status || err.message}`,
          token
        );
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [token, paramsStr]);

  const totalPages = Math.ceil(total / 10);

  return {
    notifications,
    total,
    totalPages,
    loading,
    error,
  };
} 