export function LogEntry({entry}){
    return (<div className="log-entry">
        <h2>{entry.title}</h2>
        <div className="date">{ entry.date}</div>
        <div className="entry-content" dangerouslySetInnerHTML={{__html: entry.content}}></div>
    </div>)
};