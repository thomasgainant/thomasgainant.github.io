import { Project } from "./project";

export function Projects({projects}){
    const projectItems = projects.map((project) => {
        return (<Project key={project.id} project={project}></Project>)
    });

    return (
        <div id="projects">
            <div className="content">
                {projectItems}
            </div>
        </div>);
}