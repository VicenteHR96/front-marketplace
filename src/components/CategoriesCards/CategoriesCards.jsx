// CategoriesCard.jsx
import React, { useState } from "react";
import { FaPaw, FaTshirt } from "react-icons/fa";
import { FcSportsMode } from "react-icons/fc";
import "./CategoriesCards.css";
import MyPopOver from "../MyPopOver/MyPopOver";
import { Fade, Toolbar, Tooltip } from "@mui/material";

const CategoriesCard = ({ onCategoryClick }) => {
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const categories = [
    {
      id: 1,
      name: "Deportes",
      description:
        "Descubre los mejores productos para tu actividad deportiva.",
      icon: <FcSportsMode size={50} />,
      img: "https://lasflores.gob.ar/wp-content/uploads/2024/04/2147813141-1024x1024.webp ",
    },
    {
      id: 2,
      name: "Mascotas",
      description: "Encuentra todo lo que necesitas para tus mascotas.",
      icon: <FaPaw size={50} />,
      img: "https://www.hola.com/imagenes/mascotas/20210324186573/perros-gatos-felices-necesidades/0-933-511/perros-gatos-m.jpg",
    },
    {
      id: 3,
      name: "Vestuario",
      description: "Explora nuestra colección de ropa de moda.",
      icon: <FaTshirt size={50} />,
      img: "https://static.vecteezy.com/system/resources/previews/029/325/080/non_2x/young-couple-in-trendy-streetwear-free-photo.jpg",
    },
  ];

  const handleCategoryClick = (category) => {
    onCategoryClick(category.name);
  };

  const handleHover = (category) => {
    setHoveredCategory(category.id);
  };

  const handleHoverLeave = () => {
    setHoveredCategory(null);
  };

  // PopOver

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div className="categories-container">
      {categories.map((category) => (
        <div
          className="d-flex flex-column align-items-center justify-content-center"
          key={category.id}
          onClick={() => handleCategoryClick(category)}
          onMouseEnter={() => handleHover(category)}
          onMouseLeave={handleHoverLeave}
        >
          <Tooltip
            title={category.description}
            placement="top"
            arrow
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 600 }}
            sx={{ textAlign: "center" }}
          >
            <div
              className={`category-card ${
                hoveredCategory === category.id ? "hovered" : ""
              }`}
              aria-owns={open ? "mouse-over-popover" : undefined}
              aria-haspopup="true"
              onMouseEnter={handlePopoverOpen}
              onMouseLeave={handlePopoverClose}
              style={{
                backgroundImage: `url(${category.img})`,
                backgroundSize: "cover",
              }}
            >
              {/* {category.icon} */}
            </div>
          </Tooltip>
          {/* <MyPopOver
            anchorEl={anchorEl}
            handlePopoverClose={handlePopoverClose}
            open={hoveredCategory === category.id ? open : false}
            description={
              hoveredCategory === category.id ? category.description : null
            }
          ></MyPopOver> */}
          <h6 className="category-name">{category.name}</h6>
        </div>
      ))}
    </div>
  );
};

export default CategoriesCard;
