import Self from "assets/Abhishek_Sonar.webp";
import "./hero.style.scss";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import Resume from "assets/Abhishek_Sonar_CV.pdf";
const Hero = () => {
  const [text] = useTypewriter({
    words: ["Software Engineer", "Angular Develper", "MERN Stack Developer"],
    loop: 0,
  });

  return (
    <section id="hero-section">
      <div className="hero-content">
        <h3>Hello, I'm</h3>
        <h1>
          Abhishek <span>Sonar</span>
          <br />
        </h1>
        <h2>
          {text} <Cursor cursorColor="#f4d211" />
        </h2>
        <a
          rel="noreferrer"
          href={Resume}
          target="_blank"
          className="cv-button custom-cursor-hover"
        >
          Download CV
        </a>
      </div>
      <div className="hero-img-container">
        <div className="hero-banner"></div>
        <div className="hero-back">
          <img src={Self} alt="" className="self-pic" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
