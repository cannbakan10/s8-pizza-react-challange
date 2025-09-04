import "./Home.css";
import heroBg from "../assets/images/iteration-1-images/home-banner.png";
import logo from "../assets/images/iteration-1-images/logo.svg";
import { Link } from "react-router-dom";
import icYeni from "../assets/images/iteration-2-images/icons/1.svg";
import icPizza from "../assets/images/iteration-2-images/icons/2.svg";
import icBurger from "../assets/images/iteration-2-images/icons/3.svg";
import icKizartma from "../assets/images/iteration-2-images/icons/4.svg";
import icFast from "../assets/images/iteration-2-images/icons/5.svg";
import icGazli from "../assets/images/iteration-2-images/icons/6.svg";
import kart1 from "../assets/images/iteration-2-images/cta/kart-1.png";
import kart2 from "../assets/images/iteration-2-images/cta/kart-2.png";
import kart3 from "../assets/images/iteration-2-images/cta/kart-3.png";
import food1 from "../assets/images/iteration-2-images/pictures/food-1.png"; // Terminal Pizza
import food2 from "../assets/images/iteration-2-images/pictures/food-2.png"; // Position Absolute Acılı Pizza
import food3 from "../assets/images/iteration-2-images/pictures/food-3.png"; // useEffect Tavuklu Burger

import icon1 from "../assets/images/iteration-2-images/footer/icons/icon-1.png"; // konum
import icon2 from "../assets/images/iteration-2-images/footer/icons/icon-2.png"; // mail
import icon3 from "../assets/images/iteration-2-images/footer/icons/icon-3.png"; // telefon

import li0 from "../assets/images/iteration-2-images/footer/insta/li-0.png";
import li1 from "../assets/images/iteration-2-images/footer/insta/li-1.png";
import li2 from "../assets/images/iteration-2-images/footer/insta/li-2.png";
import li3 from "../assets/images/iteration-2-images/footer/insta/li-3.png";
import li4 from "../assets/images/iteration-2-images/footer/insta/li-4.png";
import li5 from "../assets/images/iteration-2-images/footer/insta/li-5.png";

import { useNavigate } from "react-router-dom";

const instaImgs = [li0, li1, li2, li3, li4, li5];

const KATEGORILER = [
  { icon: icYeni, text: "YENİ Kore" },
  { icon: icPizza, text: "Pizza" },
  { icon: icBurger, text: "Burger" },
  { icon: icKizartma, text: "Kızartmalar" },
  { icon: icFast, text: "Fast food" },
  { icon: icGazli, text: "Gazlı içecek" },
];
export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      {/* Hero */}
      <section className="hero" aria-labelledby="hero-title">
        <img src={heroBg} alt="" className="hero-bg" aria-hidden="true" />

        <div className="hero-content">
          <img src={logo} alt="Teknolojik Yemekler" className="hero-logo" />
          <p className="hero-eyebrow">fırsatı kaçırma</p>
          <h1 id="hero-title" className="hero-title">
            <span className="line1">
              <span className="word">KOD</span>
              <span className="word">ACIKTIRIR</span>
            </span>
            <span className="line2">
              <span className="word">PİZZA,</span>
              <span className="word">DOYURUR</span>
            </span>
          </h1>

          <Link to="/order" className="hero-button" role="button">
            ACIKTIM
          </Link>
        </div>
      </section>

      {/* ALLTAKİ İKONLAR */}
      <div className="cat-ribbon-bar">
        {/* İçerik: ortalı, max genişlikte */}
        <div className="cat-ribbon-inner">
          {KATEGORILER.map((k) => (
            <Link key={k.text} to="/order" className="cat-item">
              <img src={k.icon} alt="" />
              <span className="cat-text">{k.text}</span>
            </Link>
          ))}
        </div>
      </div>
      {/* kartlar */}
      <section className="cta-section">
        <div className="container cta-cards">
          {/* Kart 1 */}
          <div className="cta-card">
            <img src={kart1} alt="Özel Lezzetus" className="cta-img" />
            <div className="cta-content">
              <h3 className="cta-title">
                Özel <br />
                Lezzetus
              </h3>
              <p className="cta-subtitle">Position: Absolute Acı Burger</p>
              <button className="cta-button" onClick={() => navigate("/order")}>
                SİPARİŞ VER
              </button>
            </div>
          </div>

          {/* Kart 2 */}
          <div className="cta-card">
            <img src={kart2} alt="Hackathlon Burger Menü" className="cta-img" />
            <div className="cta-content">
              <h3 className="cta-title">
                Hackathlon <br /> Burger Menü
              </h3>
              <button className="cta-button" onClick={() => navigate("/order")}>
                SİPARİŞ VER
              </button>
            </div>
          </div>

          {/* Kart 3 */}
          <div className="cta-card">
            <img
              src={kart3}
              alt="Çoooook hızlı npm gibi kurye"
              className="cta-img"
            />
            <div className="cta-content">
              <h3 className="cta-title">
                <span className="cta-accent">Çoooook</span> hızlı <br /> npm
                gibi kurye
              </h3>
              <button className="cta-button" onClick={() => navigate("/order")}>
                SİPARİŞ VER
              </button>
            </div>
          </div>
        </div>
      </section>

      {/*  */}

      <section className="products-section">
        <div className="container">
          <p className="section-eyebrow">en çok paketlenen menüler</p>
          <h2 className="section-title">Acıktıran Kodlara Doyuran Lezzetler</h2>

          <ul className="filter-pills" role="list">
            <li>
              <button className="pill">
                <img src={icYeni} alt="" className="pill-icon" />
                <span>Ramen</span>
              </button>
            </li>
            <li>
              <button className="pill ">
                <img src={icPizza} alt="" className="pill-icon" />
                <span>Pizza</span>
              </button>
            </li>
            <li>
              <button className="pill">
                <img src={icBurger} alt="" className="pill-icon" />
                <span>Burger</span>
              </button>
            </li>
            <li>
              <button className="pill">
                <img src={icKizartma} alt="" className="pill-icon" />
                <span>French fries</span>
              </button>
            </li>
            <li>
              <button className="pill">
                <img src={icFast} alt="" className="pill-icon" />
                <span>Fast food</span>
              </button>
            </li>
            <li>
              <button className="pill">
                <img src={icGazli} alt="" className="pill-icon" />
                <span>Soft drinks</span>
              </button>
            </li>
          </ul>

          {/* ürün kartları */}
          <div className="products-grid">
            {/* 1. kart */}
            <article className="product-card">
              <Link to="/order" className="product-link">
                <img src={food1} alt="Terminal Pizza" className="product-img" />
                <div className="product-body">
                  <h3 className="product-title">Terminal Pizza</h3>
                  <div className="product-meta">
                    <span className="rating">4.9</span>
                    <span className="reviews">(200)</span>
                    <span className="price">60₺</span>
                  </div>
                </div>
              </Link>
            </article>

            {/* 2 */}
            <article className="product-card">
              <Link to="/order" className="product-link">
                <img
                  src={food2}
                  alt="Position Absolute Acı Pizza"
                  className="product-img"
                />
                <div className="product-body">
                  <h3 className="product-title">Position Absolute Acı Pizza</h3>
                  <div className="product-meta">
                    <span className="rating">4.9</span>
                    <span className="reviews">(200)</span>
                    <span className="price">60₺</span>
                  </div>
                </div>
              </Link>
            </article>

            {/* 3 */}
            <article className="product-card">
              <Link to="/order" className="product-link">
                <img
                  src={food3}
                  alt="useEffect Tavuklu Burger"
                  className="product-img"
                />
                <div className="product-body">
                  <h3 className="product-title">useEffect Tavuklu Burger</h3>
                  <div className="product-meta">
                    <span className="rating">4.9</span>
                    <span className="reviews">(200)</span>
                    <span className="price">60₺</span>
                  </div>
                </div>
              </Link>
            </article>
          </div>
        </div>
      </section>
      {/*FOOTER*/}
      <footer className="footer">
        <div className="container footer-grid">
          <div className="footer-col">
            <img src={logo} alt="Teknolojik Yemekler" className="hero-logo" />
            <ul className="footer-contact">
              <li>
                <img src={icon1} alt="" />
                <span>
                  341 Londonderry Road,
                  <br />
                  İstanbul Türkiye
                </span>
              </li>
              <li>
                <img src={icon2} alt="" />
                <span>aciktim@teknolojikyemekler.com</span>
              </li>
              <li>
                <img src={icon3} alt="" />
                <span>+90 216 123 45 67</span>
              </li>
            </ul>
          </div>
          {/* Hot Menu */}
          <div className="footer-col">
            <h3 className="footer-heading">Hot Menu</h3>
            <ul className="footer-links">
              <li>Terminal Pizza</li>
              <li>5 Kişilik Hackathlon Pizza</li>
              <li>useEffect Tavuklu Pizza</li>
              <li>Beyaz Console Frosty</li>
              <li>Testler Geçti Mutlu Burger</li>
              <li>Position Absolute Acı Burger</li>
            </ul>
          </div>
          {/* ınstagram */}
          <div className="footer-col">
            <h3 className="footer-heading">Instagram</h3>
            <div className="footer-insta">
              {instaImgs.map((src, i) => ( /*Bu dizi yukarda tanımlı içinde 6 foto var*/ /*src: her döngüdeki resim yolu*/
                <img key={i} src={src} alt={`insta-${i}`} />
              ))}
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2023 Teknolojik Yemekler.</p>
        </div>
      </footer>
    </>
  );
}
