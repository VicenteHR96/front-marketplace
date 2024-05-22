import * as React from "react";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function CarritoIcon() {
  return (
    <Badge badgeContent={100} color="error">
      <ShoppingCartIcon />
    </Badge>
  );
}
