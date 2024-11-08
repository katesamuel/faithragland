import "./index.css";
import { ProjectContent } from "../../../assets/content/projects";
const ProjectList: JSX.IntrinsicAttributes | JSX.Element[] = ProjectContent.map(
  (project, index) => {
    return (
      <div key={index} className="template-container">
        <div className={project.shortName + ' title'}>
          <h3>{project.name.toUpperCase()}</h3>
          <h5>{project.position.toUpperCase()}</h5>
        </div>
        <div className="content">
          <p>{project.content}</p>
        </div>
      </div>
    );
  }
);

const title = "Faith's Projects";
const Projects = () => {
  return (
    <div className="projects-container">
      <h1>{title.toUpperCase()}</h1>
      <div className="project-list">{ProjectList}</div>
    </div>
  );
};

export default Projects;
