import HeadShot from "../assets/images/faith.png";
import "./home.css";
import { HomeContent } from "../../assets/content/home";

const Home = () => {
  return (
    <div className="home-container">
      <div className="welcome-note">
        <p>{HomeContent.welcome}</p>
        <p>{HomeContent.shortSummary}</p>
        <p>{HomeContent.invite}</p>
        <p>{HomeContent.thanks}</p>
        <br/>
        <p className="sign">Faith Ragland</p>
      </div>
      <div className="headshot-container">
        <img src={HeadShot} alt="Head Shot" className="headshot-img"></img>
      </div>
    </div>
  );
};

export default Home;
