import { useRef, useState, useEffect } from "react";

export function Experience({portraitMode, belowMode, experience, experiencesMinHeight, setExperiencesMinHeight}){
    const componentRef = useRef();

    let tagItems = null;
    if(experience.tags != null && experience.tags.length){
        tagItems = experience.tags.map((tag, tagIndex) => {
            let name = "";
            let type = null;

            if(tag.type != null){
                name = tag.name;
                type = tag.type;
            }
            else{
                name = tag;
            }

            return (<ExperienceTag key={tagIndex} tag={name} type={type}/>)
        });
    }

    let visibilityClassName = (
        (portraitMode && !belowMode && !experience.secondary) || (portraitMode && belowMode && experience.secondary)
        || (!portraitMode && !belowMode && experience.secondary) || (!portraitMode && belowMode && !experience.secondary)
    ) ? ' hidden ' : ' visible ';

    const [minimalHeight, setMinimalHeight] = useState("");
    useEffect(() => {
        if(experiencesMinHeight != null && experience != null){
            if((experiencesMinHeight[experience.id] == null || experiencesMinHeight[experience.id] == "")
                || (componentRef.current.getBoundingClientRect().height > experiencesMinHeight[experience.id])){
                experiencesMinHeight[experience.id] = componentRef.current.getBoundingClientRect().height;
                setExperiencesMinHeight(experiencesMinHeight);
            }
            else{
                setMinimalHeight(experiencesMinHeight[experience.id]);
            }
        }
    }, [experience, experiencesMinHeight]);

    return (
        <div
            ref={componentRef}
            className={"experience"+(experience.secondary ? " secondary ":"")+(visibilityClassName)+(experience.linkedNext != null ? " linkedNext ":"")+(experience.linkedPrevious != null ? " linkedPrevious ":"")}
            style={portraitMode && minimalHeight != null && minimalHeight != "" ? {"minHeight": minimalHeight+"px"} : {}}
        >
            <div className="experienceWrapper">
                <h2>{experience.title}</h2>
                <h2 className="altTitle">{experience.altTitle}</h2>
                <div className="company" dangerouslySetInnerHTML={{__html: experience.company}}></div>
                <div className="location">{experience.location} :: {experience.startDate} -&gt; {experience.endDate != null ? ''+experience.endDate : '?'}</div>
                <div className="content" dangerouslySetInnerHTML={{__html: experience.content}}></div>
                <div className="tags">{tagItems}</div>
            </div>
        </div>
    );
}

export function ExperienceTag({tag, type}) {
    return (<div className={"tag"+(type != null ? " type"+type+"" : "")}>{tag}</div>);
}