import { Card, CardContent, Typography, Box } from "@mui/material";

export function NotificationCard({ data }) {
  return (
    <Card
      sx={{
        borderLeft: data.Type === "Placement"
          ? "5px solid #4caf50"
          : data.Type === "Result"
          ? "5px solid #2196f3"
          : "5px solid #ff9800",
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h6">
            {data.Message}
          </Typography>

          <Typography variant="caption">
            {data.Type}
          </Typography>
        </Box>

        <Typography variant="body2" color="text.secondary">
          {data.Timestamp}
        </Typography>
      </CardContent>
    </Card>
  );
}