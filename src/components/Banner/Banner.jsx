import Carousel from "react-bootstrap/Carousel";

function Banner() {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://marketplace.canva.com/EAFyHJ2sKTI/1/0/1600w/canva-banner-horizontal-black-friday-monocrom%C3%A1tico-verde-y-negro-Ai2UwuoF0vA.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>¡Obtén un 20% de descuento con nuestro cupón: MIMKT!</h3>
          <p>Solo válido haste el 31 de mayo del 2024.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://i.pinimg.com/originals/4e/31/42/4e3142435b7a0a2f5f1229db876c7ed4.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Compra lo nuevo de Adidas.</h3>
          <p>Disponibles en tienda física y envíos a tu domicilio.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://northlandpetfood.co.nz/cdn/shop/files/banner-01a_3ffa77aa-9a7d-4047-81c1-eb2530ebbbb9.jpg?v=1694778423"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Regalonea a tu mejor amigo con productos de la mejor calidad.</h3>
          <p>
            Encuentra la más amplia variedad de productos para tus mascotas.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://landing.tripstore.com.ar/adidas/img/3503438-SuperstarXLG_FW23_LAM_AR_WHS_Trip_1366x600.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>¡Superstar XLG llegó para quedarse!</h3>
          <p>Encuentra el modelo que más te guste y no dudes en llevártelo.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Banner;
