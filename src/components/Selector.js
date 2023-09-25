import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
// import Button from '@mui/material/Button';

export default function ControlledOpenSelect(props) {
  const [country, setcountry] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setcountry(event.target.value);
    props.setCountry(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-controlled-open-select-label">Country</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={country}
          label="Country"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          P
          {props.selectList.map((elem) => (
            <MenuItem value={elem.split("-")[1].trim()} key={elem}>
              {elem.split("-")[0].trim()}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
