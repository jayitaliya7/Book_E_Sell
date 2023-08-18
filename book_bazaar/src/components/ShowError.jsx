import { Typography } from "@mui/material";

const ShowError = (props) => {
  return (
    <Typography variant="p" color={"Highlight"} style={{ display: "block" }}>
      {props.error}
    </Typography>
  );
};

export default ShowError;
