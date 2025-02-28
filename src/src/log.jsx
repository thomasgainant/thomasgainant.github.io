import { LogEntry } from "./logEntry";

export function Log({entries}){
    const logEntries = entries.map((entry) => {
        return (<LogEntry key={entry.id} entry={entry}></LogEntry>)
    });

    return (
        <div id="log">
            {logEntries}
        </div>);
}