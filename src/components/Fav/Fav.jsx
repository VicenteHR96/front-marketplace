import { Checkbox } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import React from "react";

const Fav = ({ checked, onClick }) => {
  return (
    <Checkbox
      icon={<FavoriteBorderIcon />}
      checkedIcon={<FavoriteIcon color="error" />}
      checked={checked}
      onClick={onClick}
    />
  );
};

export default Fav;
