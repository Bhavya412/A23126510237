import { ToggleButton, ToggleButtonGroup } from "@mui/material";

const filters = ["All", "Placement", "Result", "Event"];

export function NotificationFilter({ value, onChange }) {
  return (
    <ToggleButtonGroup
      value={value}
      exclusive
      size="small"
      onChange={(e, newValue) => {
        if (newValue !== null) {
          onChange(newValue);
        }
      }}
      sx={{
        flexWrap: "wrap",
        gap: 1,
        marginBottom: 2,
      }}
    >
      {filters.map((type) => (
        <ToggleButton
          key={type}
          value={type}
          sx={{ textTransform: "none", px: 2 }}
        >
          {type}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}