import { useState, useRef, useEffect } from 'react';

import { projectList, experienceList, useResize, logEntries } from './main';
import { Projects } from './projects';
import { ExperienceContainer, ExperienceContainerBelow } from './experiences';
import { Log } from './log';

const portraitLimit = 800000;

export function Page({content}){
    let pageContent = null;
    let pageContentBelow;

    const componentRef = useRef();

    const { width } = useResize(componentRef);

    const [height, setHeight] = useState({});
    const [containerWidth, setContainerWidth] = useState({});
    const [scrollX, setScrollX] = useState({});
    const [scrollY, setScrollY] = useState({});

    const [portraitMode, setPortraitMode ] = useState(false);
    const [experiencesMinHeight, setExperiencesMinHeight] = useState({});
    
    if(content == "projects"){
        pageContent = <Projects projects={projectList}></Projects>;
    }
    else if(content == "experience"){
        pageContent = <ExperienceContainer portraitMode={portraitMode} setHeight={setHeight} setWidth={setContainerWidth} setScrollX={setScrollX} setScrollY={setScrollY} experienceList={experienceList} experiencesMinHeight={experiencesMinHeight} setExperiencesMinHeight={setExperiencesMinHeight}/>;
        pageContentBelow = <ExperienceContainerBelow portraitMode={portraitMode} height={height} width={containerWidth} scrollX={scrollX} scrollY={scrollY} experienceList={experienceList} experiencesMinHeight={experiencesMinHeight} setExperiencesMinHeight={setExperiencesMinHeight}/>;
    }
    else if(content == "weblog"){
        pageContent = <Log entries={logEntries}/>;
    }
    else if(content == "about"){
        pageContent = 
        <div id='about'>
            <div id="photoWrapper">
                <div id="photoFilter"></div>
                <img id="photo" src="/moi.png"/>
            </div>
            <div id="description">
                <p>Welcome to my personal website!</p>
                <p>I am a 1988 born software developer, raised in small city in southwestern France, currently living in Berlin, Germany.</p>
                <p>I love building stuff on my computer since my teenage years. I think the real spur was when I realised I could create my own levels on my still favourite game of all time: Half-Life. Until that day, I could barely stay a day away from my machine. I am a real introvert who grew up in a culture of extraverts, so I feel lucky to have been able to build my career out of such hobby.<br/>
                I have a multimedia development degree and on top of this a game design degree. I worked for a few years in the video game industry and still have a passion for creating video games. I am always fiddling with game development und love using Unity3d in game jams.</p>
                <p>I love learning languages but am currently stuck with learning my fifth: polish, a tough one. I am also learning since a decade the dialect of my grand parents, occitan.<br/>
                One of my other passion is history, particularly military history in the XVIIIth century.<br/>
                I am also involved in music, especially black metal. I have a music project myself which mixes my musical tastes and my interest in ufology.<br/>
                I have a passion for the self-defence sport krav maga, which gave me more self-confidence and discipline. I also love to watch hockey and rugby.</p>
                <p>Appono astos! Love is the law! Stand up straight with your shoulders back! Work on leaving a worthy legacy! And enjoy your stay here below!</p>
            </div>
            <div id="links">
                <h2>Links</h2>
                <nav>
                    <a href="/cv.pdf" target="_blank">My CV</a>
                    <a href="https://www.github.com/thomasgainant" target="_blank">My GitHub account</a>
                    <a href="https://www.linkedin.com/in/thomas-gainant-58084b15/" target="_blank">My LinkedIn profile</a>
                    <a href="mailto:thomas@thomas-gainant.eu">thomas@thomas-gainant.eu</a>
                </nav>
            </div>
        </div>;
    }

    useEffect(() => {
        if(width > 0 && width < portraitLimit)
            setPortraitMode(true);
        else
            setPortraitMode(false);

        setExperiencesMinHeight({});
    }, [width]);

    return (<div
        ref={componentRef}
        className={"page"+(portraitMode ? " portrait " : "")}
        style={content == "projects" || content == "about" ? { "overflow": "auto", "height": "auto" } : {}}
        >{pageContent}{pageContentBelow}</div>);
}