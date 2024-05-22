import React, { useEffect, useState, useContext } from "react";

import {
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Checkbox,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { PizzaContext } from "../../contexts/PizzaContext";

const Filtros = ({ onCategorySelect, initialCategory }) => {
  const { getCategoryProduct } = useContext(PizzaContext);
  const [orderBy, setOrderBy] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategories([initialCategory]);
    }
  }, [initialCategory]);

  useEffect(() => {
    onCategorySelect(selectedCategories);
  }, [selectedCategories, onCategorySelect]);

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    }
  };

  const handleChange = (event) => {
    setOrderBy(event.target.value);
  };

  return (
    <Stack spacing={1} style={{ width: "85%" }} className="filterInput">
      <FormControl variant="standard">
        <InputLabel htmlFor="standard-adornment-password">Buscar...</InputLabel>
        <Input
          id="standard-adornment-password"
          endAdornment={
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          }
        />
      </FormControl>

      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">
          Ordenar por...
        </InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={orderBy}
          onChange={handleChange}
          label="Order"
        >
          <MenuItem value="">
            <em>Ordenar por...</em>
          </MenuItem>
          <MenuItem value="name-asc">Nombre A-Z</MenuItem>
          <MenuItem value="name-desc">Nombre Z-A</MenuItem>
          <MenuItem value="price-asc">Precio Menor a Mayor</MenuItem>
          <MenuItem value="price-desc">Precio Mayor a Menor</MenuItem>
        </Select>
      </FormControl>

      <FormGroup className="categoryCheck mt-4">
        <FormLabel>Categorías</FormLabel>
        <FormControlLabel
          control={
            <Checkbox
              checked={selectedCategories.includes("Deportes")}
              onChange={handleCategoryChange}
              value="Deportes"
            />
          }
          label="Deportes"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={selectedCategories.includes("Mascotas")}
              onChange={handleCategoryChange}
              value="Mascotas"
            />
          }
          label="Mascotas"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={selectedCategories.includes("Vestuario")}
              onChange={handleCategoryChange}
              value="Vestuario"
            />
          }
          label="Vestuario"
        />
      </FormGroup>
    </Stack>
  );
};

export default Filtros;
