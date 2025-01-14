export function Project({project}){
    return (<div className="project">
        <a className="link" href={project.link}>
            { project.thumbnail != null ? (
                <div className="thumbnailContainer">
                    <img className="thumbnail" src={project.thumbnail}></img>
                </div>
            ) : "" }
            <h3>{project.name}</h3>
            { project.subname != null ? (<h4>{project.subname}</h4>) : "" }
            <div className="description" dangerouslySetInnerHTML={{__html: project.description}}></div>
            { project.date != null ? (<div className="date">{project.date}</div>) : "" }
        </a>
    </div>);
}