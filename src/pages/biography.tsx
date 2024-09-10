import { BiographyContent } from "../assets/content/biography";
import FaithConducts from '../assets/images/FA-conducts.png';
import './biography.css';

const Biography = () => {
  return (
    <div className="biography-container">
      <div className="para-one">
        <p>{BiographyContent["1"]}</p>
        <img src={FaithConducts}></img>
      </div>
      <div>
        <img></img>
        <p>{BiographyContent["2"]}</p>
      </div>
      <div>
        <p>{BiographyContent["3"]}</p>
        <img></img>
      </div>
      <div>
        <img></img>
        <p>{BiographyContent["4"]}</p>
      </div>
    </div>
  );
};

export default Biography;
