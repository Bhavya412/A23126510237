import { useState, useEffect } from "react";
import {
  Alert,
  Badge,
  Box,
  CircularProgress,
  Divider,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

import { NotificationCard } from "../components/NotificationCard";
import { NotificationFilter } from "../components/NotificationFilter";
import { useNotifications } from "../hooks/useNotifications";
import { Log } from "../utils/logger";

export default function NotificationsPage() {
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(1);

  // Log page load major UI event
  useEffect(() => {
    Log("frontend", "info", "page", "Notifications page loaded");
  }, []);

  const { notifications, totalPages, loading, error } =
    useNotifications({
      page,
      notification_type: filter === "All" ? undefined : filter,
    });

  const unreadCount = notifications?.filter(n => !n.read).length || 0;

  const handleFilterChange = async (newFilter) => {
    setFilter(newFilter);
    setPage(1);

    await Log("frontend", "info", "page", `Filter changed to ${newFilter}`);
  };

  const handlePageChange = async (_, newPage) => {
    setPage(newPage);

    await Log("frontend", "info", "page", `Page changed to ${newPage}`);
  };

  return (
    <Box sx={{ maxWidth: 720, mx: "auto", px: 2, py: 4 }}>
      {/* HEADER */}
      <Stack direction="row" alignItems="center" spacing={1.5} mb={3}>
        <Badge badgeContent={unreadCount} color="primary" max={99}>
          <NotificationsIcon sx={{ fontSize: 28 }} />
        </Badge>

        <Typography variant="h5" fontWeight={700}>
          Notifications
        </Typography>
      </Stack>

      <Divider sx={{ mb: 3 }} />

      {/* FILTER */}
      <Box mb={3}>
        <NotificationFilter
          value={filter}
          onChange={handleFilterChange}
        />
      </Box>

      {/* LOADING */}
      {loading && (
        <Box display="flex" justifyContent="center" py={6}>
          <CircularProgress />
        </Box>
      )}

      {/* ERROR */}
      {!loading && error && (
        <Alert severity="error">
          Failed to load notifications
        </Alert>
      )}

      {/* EMPTY */}
      {!loading && !error && notifications.length === 0 && (
        <Alert severity="info">
          No notifications found
        </Alert>
      )}

      {/* LIST */}
      {!loading && !error && notifications.length > 0 && (
        <Stack spacing={1.5}>
          {notifications.map((n) => (
            <NotificationCard key={n.ID} data={n} />
          ))}
        </Stack>
      )}

      {/* PAGINATION */}
      {!loading && !error && notifications.length > 0 && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination
            count={totalPages || 1}
            page={page}
            onChange={handlePageChange}
            color="primary"
            shape="rounded"
          />
        </Box>
      )}
    </Box>
  );
}