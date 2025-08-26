import "./Home.css";
import heroBg from "../assets/images/iteration-1-images/home-banner.png";
import logo from "../assets/images/iteration-1-images/logo.svg"; 
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <img src={heroBg} alt="" className="hero-bg" aria-hidden="true" />
   
      <div className="hero-content">
        <img src={logo} alt="Teknolojik Yemekler" className="hero-logo" />

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
  );
}
