import { BiographyContent } from "../../../assets/content/biography";
import FaithConducts from "../../../assets/images/faith-conducts.jpg";
import FaithPiano from "../../../assets/images/fa.jpeg";
import "./index.css";

const Biography = () => {
  return (
    <div className="biography-container">
      <div className="section-container">
        <div className="text-container">
          <p className="para-1">{BiographyContent["1"]}</p>
          <p className="para-2">{BiographyContent["2"]}</p>
        </div>
        <div>
          <img src={FaithConducts} className="faith-conducts"></img>
        </div>
      </div>
      <div className="section-container">
        <div>
        <img src={FaithPiano} className="faith-piano"></img>
        </div>
        <div className="text-container">
          <p className="para-3">{BiographyContent["3"]}</p>
          <p className="para-4">{BiographyContent["4"]}</p>
        </div>
      </div>
    </div>
  );
};

export default Biography;
