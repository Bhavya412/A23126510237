import axios from "axios";
import { getToken } from "./auth";

const LOG_API =
  "http://4.224.186.213/evaluation-service/logs";

export const Log = async (stack, level, pkg, message, token) => {
  try {
    const activeToken = token || getToken();
    const cleanToken = activeToken?.trim();

    if (!cleanToken) {
      console.warn(`[Log Skipped - No Token] (${level}) [${pkg}]: ${message}`);
      return;
    }

    await axios.post(
      LOG_API,
      {
        stack,
        level,
        package: pkg,
        message,
      },
      {
        headers: {
          Authorization: cleanToken, // 🔥 IMPORTANT (NO "Bearer")
        },
      }
    );
  } catch (e) {
    // IMPORTANT: do not break app if logging fails
    console.warn("Log failed:", e.response?.status || e.message);
  }
};