import axios from "axios";
import { Log } from "../utils/logger";

const BASE_URL =
  "http://4.224.186.213/evaluation-service";

/**
 * Fetch notifications from server
 */
export async function fetchNotifications(token, params = {}) {
  const cleanToken = token?.trim();
  if (!cleanToken) {
    const error = new Error("No token provided");
    error.status = 401;
    throw error;
  }

  try {
    await Log(
      "frontend",
      "info",
      "api",
      "Fetching notifications started",
      cleanToken
    );

    const response = await axios.get(
      `${BASE_URL}/notifications`,
      {
        headers: {
          Authorization: `Bearer ${cleanToken}`,
        },
        params,
      }
    );

    await Log(
      "frontend",
      "info",
      "api",
      "Fetched notifications successfully",
      cleanToken
    );

    return response.data.notifications;
  } catch (error) {
    const status = error.response?.status;
    const msg = error.response?.data?.message || error.message;
    await Log(
      "frontend",
      "error",
      "api",
      `Failed to fetch notifications: ${status ? status + " " : ""}${msg}`,
      cleanToken
    );

    throw error;
  }
}