import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    createHashRouter,
    RouterProvider,
} from "react-router-dom";
import './style.css';

import { useState, useEffect, useCallback } from 'react';

import { Page } from './page'

/*
    TODOs
    -Affichage d'une frise temporelle avec les années
    -Ajout de life lines sur les côtés de la frise qui représente les périodes de chaque expérience
    -Switch vers des experiences placées en position absolue sur l'échelle du temps
*/

export const projectList = [
    {
        id: 1,
        thumbnail: "bal-des-bobards.png",
        name: "Le Bal des Bobards",
        link: "/le-bal-des-bobards",
        description: "Political and satirical web game created in response to the different 2016-2017 primary elections in France.",
        date: "2016 - 2017"
    },
    {
        id: 2,
        thumbnail: "/matiere noire.png",
        name: "Matière Noire",
        subname: "Matière Noire",
        link: "https://www.youtube.com/@matierenoire5248",
        description: "The eponymous and first album of my ambient one man black metal musical project.<br/>\
        The album is still in writing and not yet released in its physical form.",
        date: "2015 - ?"
    },
    {
        id: 3,
        thumbnail: "/matiere-noire-poussiere-d-etoiles.jpg",
        name: "Poussière d'Étoiles",
        subname: "Matière Noire",
        link: "https://matierenoire.bandcamp.com/album/poussi-re-d-toiles-demo",
        description: "The demo from my ambient one man black metal musical project.",
        date: "2009 - 2016"
    },
    {
        id: 4,
        thumbnail: "/mots-melanges-feather.png",
        name: "Mots Mélangés",
        link: "https://mots-melanges.com/",
        description: "Web game version of word search puzzles, procedurally generated.<br/>\
        Built to test the new features of a new frontend framework version and compare it with the old ones.",
        date: "2024"
    },
];

export const experienceList = [
  {
      id: 1,
      title: 'Blueberry Harvester',
      company: "<a href=\"https://www.levergerdecessinas.fr/\">Le Verger de Cessinas</a>",
      location: "Saint Marc à Loubaud 🇫🇷",
      startDate: "July 2007",
      endDate: "August 2007",
      content: "<p>As a student, I had to pay the bills.</p>\
      <p>Which is why I ended up in a farm which obtained the french bio label. Which means no chemicals and only minimal machinery could be used to take care of the blueberry patches.</p>\
      <p>Hard work for little money, but a nice experience.</p>",
      secondary: true
  },
  {
      id: 2,
      title: 'Web Designer',
      altTitle: "Intern",
      company: "Mad Cow Pictures",
      location: "Sydney (Parramatta) 🇦🇺",
      startDate: "April 2009",
      endDate: "June 2009",
      content: "<p>Like often, I had to go through an internship in order to validate my diploma. For my diploma in multimedia development, our university gave us the opportunity to go abroad as interns, with the only condition that only the best in english would be chosen.</p>\
          <p>I passed some interviews, prepared myself and there I was... my first REAL job, 17k kilometers away from my hometown. I programmed the website showcasing the work of this australian company specialized in cartoons and advertising. I also programmed a small password protected platform in which the company can present some work for their prospects.</p>\
          <p>The founder of this company is known for being the director of Disney's \"The Jungle Book 2\".</p>",
      tags: [{ name: "PHP", type: "Language"}, { name: "Joomla!", type: "Framework"}, { name: "HTML", type: "Language"}, { name: "CSS", type: "Language"}, { name: "Javascript", type: "Language"}]
  },
  {
      id: 3,
      title: 'Musical Artist',
      company: "<a href=\"https://www.youtube.com/@matierenoire5248\">Matière Noire</a>",
      location: "🇫🇷/🇩🇪",
      startDate: "2010",
      content: "<p>One of my passion is music, and especially the heavy kind.</p>\
      <p>One of my way to express my creativity and my artistic needs is maintaining this project throughout my life. This is a one man band which style ranges from black metal to atmospheric electronic music. In this music lies what sounds would we receive if some entities from outside this world would try to reach us and contact us. There is also in this music some personal experience I went through in life.</p>\
      <p>I describe this music as \"cosmic black metal\" or \"atmospheric black metal\". Grab some good headset, lie down and try it!</p>",
      secondary: true
  },
  {
      id: 4,
      title: 'Web Developer',
      altTitle: 'Game designer & intern',
      company: "Ka Games",
      location: "Limoges 🇫🇷",
      startDate: "July 2010",
      endDate: "September 2010",
      content: "<p>Worked as an intern in this browser gaming company on the biggest game they created: Skirhit. I had to rebalance some features inside the game, I had to think on new features to enhance the player experience.</p>\
      <p>Then, I had to collaborate with the development team, based inside another sister company, Fractale Corp, in order to optimise the code of a Facebook mini game, Skirhit DTC.</p>\
      <p>Skirhit was a commercial failure and is now offline. The company went bankrupt shortly after the release of this game. A classic all-in story in the gaming industry.</p>\
      <p>This internship represented the end of my studies and I had to present all my work there in front of professionals from the video game industry and the computer graphics research branch.</p>",
      tags: [{ name: "PHP", type: "Language"}, { name: "Facebook SDK", type: "Framework"}, { name: "HTML", type: "Language"}, { name: "CSS", type: "Language"}, { name: "Javascript", type: "Language"}]
  },
  {
      id: 5,
      title: 'Web Developer',
      company: "École Française de Poker",
      location: "Limoges (Châlus) 🇫🇷",
      startDate: "December 2010",
      endDate: "February 2011",
      content: "<p>This was the company behind what was the biggest website for learning poker in France. The members of the website were able to read extensive crash courses, watch video tutorials, attend online masterclasses with professional poker players and network with each other.</p>\
      <p>I worked on the three main websites of this company, programmed lots of features, redesigned some others. I had to make some SEO optimisation on the forum (which was a huge pain in the butt) and I optimised the huge (millions of rows) databases on the websites.</p>",
      tags: [{ name: "PHP", type: "Language"}, { name: "PHPbb", type: "Framework"}, { name: "HTML", type: "Language"}, { name: "CSS", type: "Language"}, { name: "Javascript", type: "Language"}]
  },
  {
      id: 6,
      title: 'Gameplay Developer',
      company: "<a href=\"https://www.beview.fr\">Beview</a>",
      location: "Bordeaux (Le Barp) 🇫🇷",
      startDate: "July 2011",
      endDate: "November 2011",
      content: "<p>Worked for the \"Direction Générale de l'Armement\" (french equivalent to the US Army Materiel Command), on a serious game project aiming to teach the soldiers the strategic aspects of a military operation.</p>\
      <p>I used the Virtual Battle Space 2 game engine, integrated different 3d models, went through a lot of scripting and transformed those 3d assets into realistic playable entities (vehicles, weapons...).</p>\
      <p>I also worked on secondary missions such as Actionscript 2 and Android development, especially for the <a href=\"https://www-lmj.cea.fr/\">Laser Mégajoule</a> research center.</p>",
      tags: [{ name: "C++", type: "Language"}, { name: "VBS2", type: "Framework"}, "ActionScript 2", { name: "Java", type: "Language"}, "Android"]
  },
  {
      id: 7,
      title: 'Gameplay Developer',
      company: "<a href=\"http://dsc-studio22.fr/\">DSC Studio 22</a>",
      location: "Bordeaux (Le Bouscat) 🇫🇷",
      startDate: "December 2011",
      endDate: "2013",
      content: "<p>Given my experience in game development and within the modding community, I got contacted by a company which wanted to open a video game studio and needed the first employee to join and help doing it.</p>\
      <p>So I stepped up as a gameplay developer and guided the founders more and more into their project management decisions while programming for the game projects they had in mind.</p>\
      <p>Our first projects were only mobile casual games but we went more and more into serious projects across the years. We started with a first game using OpenGL ES on Android, using Java and our own \"coder art\" assets. Then we translated our small engine into C++ so we could use it as a layer on top of OpenGL for iOS. Interfacing the Android Java ecosystem with our engine in C++ would be then possible using JNI. We had our own small multiplatform game engine that we used for two other games.</p>\
      <p>On our last mobile game, I took more initiative on the game producing and game design side, as our games were frankly not that good as they could be and were commercial failures. This meant for instance organizing focus test sessions with \"normal\" people I recruited from classifieds, managing external freelancers for art & music, participating in the recruitment process in order to grow the studio.</p>",
      linkedNext: 8,
      tags: [{ name: "C++", type: "Language"}, { name: "Java", type: "Language"}, "Android", "JNI", "SVN", "Photoshop", "Illustrator"]
  },
  {
      id: 8,
      title: 'Game Producer',
      company: "<a href=\"http://dsc-studio22.fr/\">DSC Studio 22</a>",
      location: "Bordeaux (Le Bouscat) 🇫🇷",
      startDate: "2013",
      endDate: "March 2015",
      content: "<p>After our experience in mobile games, my bosses realised that the mobile market was too crowded to be successful in it the easy way and we needed to go full in in order to expect success. They started a new project which would be the first PC oriented AAA video game of the studio.</p>\
      <p>The game concept was quite novative back then. With the MOBA genre being slowly the most played in all of the multiplayer genres, we had this idea of mixing MOBA mechanics with a third person shooter. Some sort of mix between League of Legends and Gears of War. Such a project being highly ambitious for our team, I saw the risk of this project to be the last one of this studio and decided to take even more initiative regarding the game producing process. This made me the project manager of the studio, aka game producer.</p>\
      <p>In short, I managed a small team of game creators. I managed the schedule of production and I was head of game design. Lots of paperwork, even more programming work. This was my first experience managing a team in such a specific field of software development and, hell, did I do a lot of mistakes. Excellent soft skills are needed in team management, which I lacked as a 25 years old suddenly having to manage people for the first time. At the height of the project, we had 15 people working on it and we even started a PR round by taking part in interviews for indie gaming websites, talking about the project on a local radio, and so on.</p>\
      <p>But all the effort was not put to good use. It took months to program simple game mechanics with our programming team wanting to replace our game designers, our art team was losing time mixing up game assets creation process, website creation & game trailers edition, game mechanics were added to our game documents by our bosses without any consultation, the server infrastructure was heavily underestimated... and so on, and so on. A lot of mistakes were made, from me included, and we were simply not effective.</p>\
      <p>The video game was still not properly playable after more than two years of development. The search began for the culprits and heads started to roll, the most experienced of my colleagues first and the loudest last. Me getting fired somewhere in between. This did not prevent the game to be never fully released, the people the friendliest to management from getting fired and the studio to close six months after my firing.</p>\
      <p>An absolutely exhausting but rich experience.</p>",
      linkedPrevious: 7,
      tags: ["UnrealScript", { name: "Unreal Engine 3", type: "Framework"}, { name: "C++", type: "Language"}, { name: "Java", type: "Language"}, "Android", "JNI", "ActionScript 2", "SVN", "Scaleform", "Photoshop", "Illustrator"]
  },
  {
      id: 9,
      title: 'Fullstack Developer',
      company: "<a href=\"https://twothirds.fr\">twothirds.fr</a>",
      location: "Bordeaux 🇫🇷",
      startDate: "April 2015",
      endDate: "February 2018",
      content: "<p>twothirds.fr was a software company dedicated to gaming and multimedia in all its form. I used this company for my freelancing missions and also for internal projects, especially around video games.\
      <p>Former clients:</p><ul>\
      <li>Thales Airborne Systems / Apside - Capella fork project - Java (Eclipse RCP / Eclipse EMF)</li>\
      <li>La Banque Postale / SQLi - \"Cap Client 2\" project - Javascript (AngularJS) / Java J2EE (Spring)</li>\
      <li>Leclerc / Sopra-Steria - \"Isocel\" project - Java J2EE (Spring)</li>\
      <li>France Télévisions - Various props creation (fake websites and apps) for the TV series \"Mongeville\" and the TV movie \"Parole contre parole\" - PHP/HTML/CSS</li>\
      <li>Sunna Design - \"Sunna Moon\" low cost smartphone prototyping - Javascript (NodeJS / Native frontend JS)</li>\
      <li>Limousin Archerie - Website maintenance - PHP (Prestashop)</li>\
      <li>Bègue Oenologie - Website creation & maintenance - PHP/HTML/CSS</li></ul>",
      tags: [{ name: "PHP", type: "Language"}, { name: "HTML", type: "Language"}, { name: "CSS", type: "Language"}, { name: "Javascript", type: "Language"}, { name: "Java", type: "Language"}, { name: "Unity", type: "Framework"}, "NodeJS", "AngularJS", "Git"]
  },
  {
      id: 10,
      title: 'Security Agent',
      altTitle: 'General volunteer',
      company: "<a href=\"https://www.facebook.com/TheInsaneLegions\">The Insane Legions</a>",
      location: "Bordeaux 🇫🇷 (& Paris 🇫🇷)",
      startDate: "2015",
      endDate: "2017",
      content: "<p>As said about one of my other experience: I love heavy music.</p>\
      <p>As of this passion, I have been part for a few years of an association organising metal concerts inside the city and in the viscinity of Bordeaux. The association was also often called to provide volunteers for music festivals across France. Volunteering for this scene was a very interesting experience and I loved it.</p>\
      <p>I would be involved in the smooth running of concerts, especially regarding security. Sometimes I would be the bouncer, and some other time I would just ensure that nothing is stolen backstage. I would also take care of the merchandising stands for some bands, food delivery and a lot of other errands.</p>\
      <p>My fondest experience with this association was being part of the access control team for the \"Fall of Summer\" metal festival in Paris, in which I was able to shake hands with my idols backstage.</p>",
      secondary: true
  },
  {
      id: 11,
      title: 'Artificial Intelligence Developer',
      company: "<a href=\"https://www.ics-group.eu/\">ICS Group</a>",
      location: "Berlin 🇩🇪 (+Heilbronn 🇩🇪 & Mannheim 🇩🇪 & Sankt Wandel 🇩🇪)",
      startDate: "March 2018",
      endDate: "January 2020",
      content: "<p>After working as a freelancer for a few years in my home country, I came with the opportunity to meet an objective I previously had and nearly achieved: living abroad.<br/>While previously working in Australia, I got offered a job but decided not to stay there and I came back home. This decision was one of the worst in my life and I regretted it.</p>\
      <p>But my thirties were coming, I was single again and decided that it was time to fulfill this need to live abroad, at least for a few years. I also wanted to flee from the tax hell and the diploma aristocracy reigning in France. Once I would cross the Rhine, my salary would double for doing exactly the same job. Weird, right?</p>\
      <p>Given my previous experience in video games, I was recruited by a german company to work on an artificial intelligence research project.</p>\
      <p>The goal was to help supermarket customers enhance their experience while doing groceries by giving them in real time an optimized path across a store, according to their shopping lists, the real-time position of the other customers inside the store and their personal data (like preferences, allergies, etc.).</p>\
      <p>This project lasted two years and received a state grant for its job creation potential. It was born through a partnership with <a href=\"https://www.uni-saarland.de/\">Universität des Saarlandes</a> (Saarland University) and the retail chain <a href=\"https://www.globus.de/\">Globus</a> which provided us their laboratory in Sankt Wendel.</p>\
      <p>At the same time as working on this research project, I was also working on other non-research related projects from the company, which is specialized in automatic package branding, delivery truck location and logistics.</p>\
      <p>These projects were built on Android, supported by a .NET backend infrastructure, which made my previous experience on mobile games development particularly interesting for ICS.</p>",
      linkedNext: 12,
      tags: [{ name: "Java", type: "Language"}, "Android", { name: "Javascript", type: "Language"}, "NodeJS", "AWS", "React", "Git", "Bitbucket", "Jira"]
  },
  {
      id: 12,
      title: 'Senior Software Developer',
      company: "<a href=\"https://www.ics-group.eu/\">ICS Group</a>",
      location: "Berlin 🇩🇪 (+Heilbronn 🇩🇪 & Mannheim 🇩🇪)",
      startDate: "February 2020",
      endDate: "July 2021",
      content: "<p>After a while, I got promoted within the company and moved back to web development, especially on the frontend side. I got to specialize myself in Google's frontend framework Angular.</p>\
      <p>My main project became a training management app for the public transport company <a href=\"https://www.vestische.de/\">Vestische</a>. The requirements from the german law to be allowed to drive a bus can be quite complicated and this app aimed to ease the process by booking the right drivers to the right training and optimise the training costs.</p>",
      linkedPrevious: 11,
      tags: [{ name: "Angular", type: "Framework"}, { name: "Typescript", type: "Language"}, "RxJS", "Bootstrap", { name: "Javascript", type: "Language"}, "Karma", "C#", ".NET", "NodeJS", "AWS", "Git", "Bitbucket", "Jira", "Agile"]
  },
  {
      id: 13,
      title: 'Software Development Teacher',
      altTitle: 'Part Time & Volunteer',
      company: "<a href=\"https://www.hs-mannheim.de/\">Hochschule Mannheim</a>",
      location: "Mannheim 🇩🇪",
      startDate: "September 2019",
      endDate: "November 2019",
      content: "<p>I took part in a partnership between my then employer ICS Group and the Hochschule Mannheim (technical school in Mannheim), in which I gave courses in software development on the famous cloud computing provider AWS.</p>\
      <p>The goal was to attract students as potential interns within our company, but above all it gave me the chance to try something I had always wanted to try: teaching in my professional field.</p>\
      <p>I was responsible for theoretical courses but also organized a workshop in which I acted as a real customer after being a technical advisor to the students. I then was one of the referents for a month long project the students had to build from the ground up.</p>",
      secondary: true,
      tags: ["AWS", { name: "Javascript", type: "Language"}, "NodeJS"]
  },
  {
      id: 14,
      title: 'Senior Software Engineer',
      company: "<a href=\"https://www.axelspringer.com/\">Axel Springer National Media & Tech</a>",
      location: "Berlin 🇩🇪",
      startDate: "August 2021",
      content: "<p>As a software developer affected to the Business Integration team, most of my tasks involve implementing front end solutions within an online advertising big data environment.</p>\
      <p>Our applications help online advertising experts, data analysis and online marketing professionals inside the whole Axel Springer group to reach better advertising deals and higher turnovers in different online advertising business models (digital ads on our different web sites, mobile apps, in a programmatic way or direct business...). </p>\
      <p>Our team is in charge of the communication to the different supply-side platforms that are involved in our business models (Xandr, Google, Facebook...) to create and synchronize such deals but also gather the data (number of display, clicks, formats used, etc.) from those SSPs and prepare it to be used in our apps for the online marketing branch.</p>\
      <p>To this day, my team at Axel Springer has been the best I have been part of. We are focused, efficient and support each other.</p>\
      <p>What stroke me as I started was that I was seeing a scrum team which was really using this concept to its full potential. Clear, precise and benevolent communication is there and we try to bring as much as possible value with the minimum amount of time spent working on a task and with a maximum quality.</p>\
      <p>One of the other key to the good functioning of our team is the overall goal for code quality, security and our pull requests process. With a \"two approvals before a merge\" policy, we check on every code modifications generated by the team and improve each other's work according to our specialties. We also check together our infrastructure and running apps using security and code analysis tools.</p>\
      <p>But I think the most important ingredient is the really specific environment we involve within our company: half of us are foreigners, the rest are Germans. We are a team within a very international company, which itself is part of a formerly very german firm. The result is that we are the only team within our company which communicates in broken but straightforward german. We follow the culture of accountability, punctuality and independance... but add just enough altruism, spontaneity and small talk to the mix. I love that.</p>\
      <p>It feels good to work with professionals striving to be better and being better than you are: they will in the end make you also a better profesional.</p>",
      tags: [{ name: "Angular", type: "Framework"}, { name: "Typescript", type: "Language"}, { name: "HTML", type: "Language"}, { name: "CSS", type: "Language"}, { name: "SCSS", type: "Language"}, { name: "RxJS", type: "Framework"}, { name: "Akita", type: "Framework"}, { name: "Tailwind", type: "Framework"}, { name: "Javascript", type: "Language"}, { name: "Java", type: "Language"}, "SpringBoot", "JHipster", "Bootstrap", "AWS", "AWS Cloud Formations", "AWS Elastic Beanstalk", "AWS Lambda", "AWS S3", "NodeJS", "Cypress", "Karma", "Storybook", "SonarQube", "Snyk", "Splunk", "Git", "GitHub", "GitHub Actions", "React", "Jira", "Scrum", "Scrumban"]
  }
];

export const logEntries = [
    {
        id: "how-ai-makes-software-engineering-easier-and-faster-or-not",
        title: "How AI makes software engineering easier and faster (or not)",
        date: "29.06.2025",
        originalLink: "https://www.linkedin.com/posts/thomas-gainant-58084b15_totally-true-tweet-ive-read-articles-activity-7345145264208314369-pPci",
        content: `<h3>How AI makes software engineering easier and faster</h3>
        <ul>
<li>Big picture questions like "how should I structure my app with features A, B and C, using the framework XYZ?", something that search engines and Stack Overflow were not offering</li>
<li>Typical noobie questions for a framework or technology that you never used, like: "how do you intercept a response in Angular and modify its content?", "how does trilinear filtering work in a graphic engine?"</li>
<li>Specific technical questions on a niche feature, if you explain the context through and through, describe the structure of your app or infrastructure (or better: have a nice subscription to Claude which gives you a >50k code lines context) which will give better odds for the result of the algorithm. Example: "in the controller XYZController, when I use the createSomeEntity endpoint, I am not getting the field XYZ of said entity although it is marked as serializable and should be included in the response JSON. What am I missing?"</li>
<li>Creating simple CRUD apps from scratch, without any legacy codebase: "Give me a backend app using NestJS with a simple user, product & order management system, with register, login, order a product & lost password functionalities."</li>
</ul>
<h3>How AI does *not* make software engineering easier and faster</h3>
<ul>
<li>Having team leads and product managers create an app themselves without reading or understanding a single line of the generated code and then giving it to developers saying: "See? I already did your job. What's wrong with you guys? Are you getting paid spending your time on Youtube?"</li>
<li>Having CCQ specialists merging Pull Requests without any testing, breaking production, because AI told them to change a single line inside a pom.xml or a package.json and "it's just a microscopic change".</li>
<li>Pushing veteran software engineers out of the door, those who spent 15 to 20 years in your company learning your own business logic and building the existing code base to automatize said business processes, all because "the code they produced is bad: 'the AI' cannot understand it".</li>
<li>Thinking that word-suggestion algorithms (ChatGPT, Claude, Cursor... well, the whole new "AI" wave) offer deterministic solutions instead of answers whose probability of functioning depends on the amount of training data on the problem in question.</li>
</ul>
<p>All of these examples are direct testimonies from my SE friends or me, by the way.</p>`
    },
    {
        id: "petite-anecdote-polonaise",
        title: "Petite anecdote polonaise",
        date: "03.06.2025",
        originalLink: "https://www.facebook.com/516573607/posts/pfbid02dCUt8G64cpo1QWWz2zi5ioe4K3RBdDs2jtyD2kmnDic9HuaJnixBXxSz79tAydEpl/",
        content: `<p>Petite anecdote polonaise vu que je n'ai plus trop de raisons de me retenir et vu le climat politique ambiant en Europe.</p>
<p>Séjour à Poznan pour que la petite profite à nouveau de l’aquapark, comme promis il y a bien longtemps. On se retrouve à chercher un parking pour visiter le centre ville et, passant une barrière grande ouverte qui mène vers un parc de stationnement privé, je vais à la caisse pour savoir quand et comment on doit payer, histoire d'éviter le piège à touristes.</p>
<p>Je me retrouve à cette caisse face à un croisement de Pierre Bellemare et Shrek qui aurait trop loupé ses séances d'UV, joliment couperosé depuis probablement ses seize ans et pour qui visiblement une encyclopédie révèle plus du calage de meuble que de la source objective d'informations.</p>
<p>Faisant fi de mes préjugés d'occidental arrogant, je m'approche du monsieur et, après l'avoir salué sommairement dans la langue de Marie Skłodowska, je lui demande, ne pouvant m'exprimer suffisamment correctement dans son langage, s'il parle anglais. Ou bien allemand. Ou bien français.</p>
<p>À chaque question, il rit. Mais quelle idée de ma part de demander à un professionnel faisant face quotidiennement à des tombereaux de touristes de s'exprimer sommairement parmi un panel de langues qui permettent de couvrir environ les deux tiers de la population d’Europe ? Qu'à cela ne tienne, la transaction s'effectue via Google translate et je passe la rigolade assumée de ce monsieur.</p>
<p>Mais vint le soir et le moment pour moi de payer. Visiblement la soirée était bien entamée vu les vapeurs éthyliques émanant de la cahute et l'élocution de mon hôte devenue légèrement hasardeuse. Avec lui, un ami est venu regarder sur le lieu de travail un match de football, qui passe sur une télé derrière eux.</p>
<p>PSG joue contre l'Inter. Je n'aime pas le foot et encore moins le PSG. Mais bref, je suis là pour payer ma place et si possible sans trop parler vu les différences de langage et le manque criant d’atomes crochus entre nous. Je le salue à nouveau et lui tend mon billet. Le coquin apostrophe son collègue : " Lui, il ne comprend pas.”</p>
<p>Mais, cher être difforme, ta langue, je ne la parle pas encore bien, ce n'est pas que je ne la comprends pas.</p>
<p>Il continue en polonais : “C'est parce qu'il parle africain.”</p>
<p>Je regarde la télé et  je revois le PSG avec son équipe parisienne typiquement bigarrée. Mon accent français m’a auparavant trahi. Alors que son collègue s’exclaffe de rire, je comprends enfin le racisme incroyable de la blague, que j’ai déjà entendu plusieurs fois de la part de Polonais du cru. À chaque fois mon hilarité était modeste et l’inculture agricole que j’observais en face me laissait perplexe.</p>
<p>Le lendemain, je me levai avec une information dont en vérité j’en ai absolument rien à foutre : Paris a gagné 5 - 0 en finale. Pas un petit 2 - 1 mais bel et bien une distribution de fessées. Je compris enfin l’ire de ce monsieur et son trait resplendissant de la veille. Lorsque nous sommes allés nous garer dans le même parking ce jour là, je me suis précipité vers la cahute pour entonner un chant que jamais je n’aurais imaginé vouloir chanter : “Pariiis eeest magiiique !!”</p>
<p>Mais le bougre n'était pas là en ce beau matin ! Probablement trop occupé à digérer les tomes de philosophie liquide qu’il avait parcouru toute la soirée avec son ami. Ma déception n’était toutefois qu’infime. Je commençai à assumer pleinement cette arrogance occidentale.</p>
<p>Car très vite le souvenir de l’insulte de la veille me rappela que pendant que ce triste personnage brûlait certainement dans sa poêle à charbon ses emballages plastiques Tatra pour se chauffer l’hiver, des noirs, NOS noirs, faisaient la queue pour venir vivre chez nous, gagner leur vie dans NOTRE pays et pour être ou devenir des Français.</p>
<p>Pour être des gens qui disent bonjour en rentrant dans une maison, qui bouffent trop, trop souvent et trop longtemps, qui baisent sans vouloir faire trop d’enfants, qui demandent comment ça va même si uniquement ce protocole les forcent à sortir de leur mauvaise humeur, qui gueulent pour oui ou pour un non, qui mangent leur baguette pas trop cuite, PAS brûlée et qui, car trop gentils et polis, se font aussi bouffer par les véritables païens de ce monde qui brûlent des voitures à la moindre opportunité ou voient encore le mariage non comme une aventure à deux mais comme une simple transaction financière.</p>
<p>Des gens trop gentils face à ce genre d’énergumènes au degré de civilisation en dessous de l’acceptable, peu importe leur bord ou le dieu qu’il vénère… mais le paradoxe réside dans le fait que la civilisation et la civilité consiste justement à accepter et faire preuve de compassion face à ce genre d’énergumènes. Lourd fardeau, lourde croix à porter dirais-je même.</p>
<p>Mais c'est ça, la culture française, celle qui attire des gens de par le globe et les poussent à inscrire leurs gosses immigrés de deuxième ou troisième génération au club de foot de banlieue parisienne. Et la banlieue influence Paris. Et Paris influence LE MONDE.</p>
<p>Et ça, ça rend fier, bordel à cul de putain de nom de dieu de merde.</p>`
    },
    {
        id: "der-luegenball",
        title: "Der Lügenball",
        date: "16.02.2025",
        originalLink: "https://www.linkedin.com/feed/update/urn:li:activity:7296866403070988288/",
        content: `<p>Hallo an alle!</p>
<p>Ihr wisst vielleicht, dass ich vor langer Zeit ein kleines, kostenloses Webspiel im Rahmen der Wahlen in meinem Heimatland entwickelt hatte. Ziel des Spiels war, als ein Politiker alles zu sagen, was man sagen muss, um sich bei möglichst vielen Menschen beliebt zu machen.</p>
<p>Ich lebe seit acht Jahren in Deutschland, habe aber noch nicht die deutsche Staatsbürgerschaft. Von daher habe ich leider nicht die Möglichkeit, bei den nächsten Wahlen nächste Woche meine Stimme abzugeben.</p>
<p>Meine Botschaft für diese Wahlen wäre: geht wählen!</p>
<p>Aber meine zweite Botschaft wäre auch: wählt richtig! Hört nicht auf die Marktschreier, die auf den aktuellen Ereignissen reiten, um von sich reden zu machen, **unabhängig von ihrer politischen Orientierung**.</p>
<p>Im Zuge der Wahlen in Deutschland wollte ich diese Botschaft hinter diesem Spiel zurückgeben und habe das Spiel auf Deutsch übersetzt. Probiert es aus und teilt euren positiven Meinungsrekord!</p>
<div class="picture">
        <a href="/le-bal-des-bobards"><img src="./bal-des-bobards.png"/></a>
</div>`
    },
    {
        id: "grey-on-grey-v-2024-04",
        title: "Grey on Grey - v2024.04",
        date: "13.05.2024",
        originalLink: "https://thomasgainant.itch.io/grey-on-grey/devlog/730993/202404",
        content: `<p>I just finished a new version of the game!</p>
<p>It is still a private project and only people in my social circle will be testing this version. I hope the next iteration will bring some sort of public version.&nbsp;Please do not forget that this project is built on my free time. Most of my commits on the code are between 9pm and 2am, nothing else. The rest of the day, I have a real job and I sometimes have to sleep! Well, I actually would <strong>love</strong> to sleep but I also have a charming&nbsp;toddler which requires some sort of maintenance, like playing&nbsp;with her and telling her she is my favourite human being in the world. It can be&nbsp;tough sometimes, right?</p>
<p>Here is the changelog for this version:
</p>
<ul><li>The third type of the basic units is implemented: the game has now artillery.</li><li>Soldiers can now sometimes be stunned and will crawl for a while when there is an explosion close to them</li><li>Squad deployment is only possible in the controlled zone in front of the frontline, like intended as a base game mechanics of my game concept. I also added a visual feedback on the map&nbsp;showing that.</li><li>UI improvement: there is now a "progress bar", which represents which part of the frontline is advancing or falling. There is also a&nbsp;fast travel when you click on it.</li><li>UI improvements: the squad badges on the field and in the bottom menu have now more information about the squad. I also included&nbsp;tooltips when you hover these badges.</li><li>I did a big round of game variables balancing (mostly weapon accuracy and speed).</li><li>A start&nbsp;menu has been added.</li><li>Enhanced sound effects, switching to external sound effects instead of the game engine's default sound filters.</li><li>I fixed a nasty bug preventing a unit to retreat in order with we give this order.</li></ul>
<p>My goal for the next version will be to have the game playable by strangers,&nbsp;probably as in the form of&nbsp;a closed beta. But I first have some important game mechanics in mind, like ammo consuption, resupply and the possiblity to deploy ammo cache/storage.</p>
<p>Stay tuned!</p>`
    }
];

export const useResize = (myRef) => {
    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)
    
    const handleResize = useCallback(() => {
        setWidth(myRef.current.getBoundingClientRect().width)
        setHeight(myRef.current.getBoundingClientRect().height)
    }, [myRef])

    useEffect(() => {
        window.addEventListener('load', handleResize)
        window.addEventListener('resize', handleResize)

        return () => {
        window.removeEventListener('load', handleResize)
        window.removeEventListener('resize', handleResize)
        }
    }, [myRef, handleResize])

    return { width, height }
}

export const useScroll = (componentRef) => {
    const [offsetX, setOffsetX] = useState(0);
    const [offsetY, setOffsetY] = useState(0);

    const handleScroll = useCallback(() => {
        setOffsetX(componentRef.current.scrollLeft);
        setOffsetY(componentRef.current.scrollTop);
    }, [componentRef]);

    useEffect(() => {
        componentRef.current.addEventListener('scroll', handleScroll);

        return () => {
            if(componentRef.current != null)
                componentRef.current.removeEventListener('scroll', handleScroll);
        };
    }, [componentRef, handleScroll]);

    return { offsetX, offsetY };
};

const router = createHashRouter([
    {
      path: "/",
      element: <Page content={"projects"}></Page>,
    },
    {
        path: "/experience",
        element: <Page content={"experience"}></Page>,
    },
    {
        path: "/projects",
        element: <Page content={"projects"}></Page>,
    },
    {
        path: "/log",
        element: <Page content={"weblog"}></Page>,
    },
    {
        path: "/about",
        element: <Page content={"about"}></Page>,
    },
]);

function AppRoot() {
    return (<div id="content">
        <div id="header">
            <h1>Thomas Gainant</h1>
            <nav id="links">
                <a href="/#/projects">Projects</a>
                <a href="/#/experience">Experience</a>
                <a href="/#/log">Log</a>
                <a href="/#/about">About</a>
            </nav>
        </div>
        <RouterProvider router={router} />
    </div>);
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container).render(<React.StrictMode>
    <AppRoot />
</React.StrictMode>);