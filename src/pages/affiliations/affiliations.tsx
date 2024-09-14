import './affiliations.css';
import { AffiliationsContent } from '../../assets/content/affiliations';

const AffiliationList: JSX.IntrinsicAttributes | JSX.Element[] = AffiliationsContent.map(
    (affiliation, index) => {
      return (
        <div key={index} className="affilation">
          <p>{affiliation}</p>
        </div>
      );
    }
  );

const title = "Selected Affiliations";
const Affiliations = () => {
    return (
      <div className="affiliations-container">
        <h1>{title.toUpperCase()}</h1>
        <div className="affiliation-list">{AffiliationList}</div>
      </div>
    );
  };

export default Affiliations;