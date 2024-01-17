import { useRef, useEffect } from 'react';

import { experienceList, useResize, useScroll } from './main';
import { Experience } from './experience';

export function ExperienceContainer({portraitMode, setHeight, setWidth, setScrollX, setScrollY, experienceList, experiencesMinHeight, setExperiencesMinHeight}){
    const componentRef = useRef();

    const { width, height } = useResize(componentRef);
    const { offsetX, offsetY } = useScroll(componentRef);

    useEffect(() => {
        setHeight(height);
        setWidth(width);
        setScrollX(offsetX);
        setScrollY(offsetY);
    }, [height, width, offsetX, offsetY]);

    const experienceItems = experienceList.toReversed().map(experience => {
        return <Experience
            key={experience.id}
            belowMode={false}
            portraitMode={portraitMode}
            experience={experience}
            experiencesMinHeight={experiencesMinHeight}
            setExperiencesMinHeight={setExperiencesMinHeight}
        ></Experience>;
    });
    return (<div ref={componentRef} id="experiences">{experienceItems}</div>);
}

export function ExperienceContainerBelow({portraitMode, height, width, scrollX, scrollY, experienceList, experiencesMinHeight, setExperiencesMinHeight}){
    const componentRef = useRef();
    const wrapperComponentRef = useRef();

    useEffect(() => {
        if(componentRef.current){
            if(!portraitMode){
                wrapperComponentRef.current.style.top = "0";
                wrapperComponentRef.current.style.left = "-"+scrollX+"px";
                if(width > 0)
                    componentRef.current.style.width = width+"px";
            }
            else{
                wrapperComponentRef.current.style.top = "-"+scrollY+"px";
                wrapperComponentRef.current.style.left = "0";
                if(height > 0)
                    componentRef.current.style.height = height+"px";
            }
        }
    }, [componentRef, portraitMode, height, width, scrollX, scrollY]);

    const experienceItems = experienceList.toReversed().map(experience => {
        return <Experience
            key={experience.id}
            belowMode={true}
            portraitMode={portraitMode}
            experience={experience}
            experiencesMinHeight={experiencesMinHeight}
            setExperiencesMinHeight={setExperiencesMinHeight}
        ></Experience>;
    });

    return (<div ref={componentRef} id="experiencesBelow"><div ref={wrapperComponentRef} className="wrapper">{experienceItems}</div></div>);
}