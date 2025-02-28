export function LogEntry({entry}){
    return (<div id={entry.id} className="log-entry">
        <h2>{entry.title}</h2>
        <div className="info">
            { entry.originalLink != "" ? (<div className="original-link"><a href={ entry.originalLink} title="Original link">#</a></div>) : null }
            <div className="date">{ entry.date}</div>
        </div>
        <div className="entry-content" dangerouslySetInnerHTML={{__html: entry.content}}></div>
    </div>)
};