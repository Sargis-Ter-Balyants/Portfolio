"use client";

import Image from "next/image";
import Link from "next/link";

import "./page.scss";
import IMAGES from "../../../utils/images";
import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import axios from "axios";
import "react-loading-skeleton/dist/skeleton.css";
import dynamic from "next/dynamic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import projectsJSON from "../../../My-Portfolio.projects";

const Skeleton = dynamic(() => import("react-loading-skeleton"));

export default function Home() {
    const localActive = useLocale();
    const headerT = useTranslations("header");
    const projectPreviewT = useTranslations("projectPreview");
    const skillsT = useTranslations("skills");
    const [itemOffSet, setItemOffSet] = useState(0);
    const [sliderMid, setSliderMid] = useState(2);
    const itemCount = 5;

    const [projects, setProjects] = useState<any>(projectsJSON);
    const [previewingProject, setPreviewingProject] = useState<any>({});
    const [limitedProjects, setLimitedProjects] = useState<any>([]);

    // useEffect(() => {
    //     axios
    //         .get(`/${localActive}/api/project/all`)
    //         .then((res) => {
    //             const projectsArr = res.data.projects;
    //             setProjects(projectsArr);

    //             const slicedArr = projectsArr.slice(itemOffSet, itemOffSet + itemCount);
    //             setPreviewingProject(slicedArr[2]);
    //             setLimitedProjects(slicedArr);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // }, []);

    useEffect(() => {
        if (!projects.length) return;
        const slicedArr: any = projectsJSON.slice(itemOffSet, itemOffSet + itemCount);
        setPreviewingProject(slicedArr[sliderMid]);
        setLimitedProjects(slicedArr);
    }, []);

    const previousProject = () => {
        if (sliderMid === 0) {
            setSliderMid(projects.length - 1);
            setItemOffSet(projects.length - 1);
            setLimitedProjects([...projects.slice(projects.length - 3, projects.length), projects[0], projects[1]]);
            setPreviewingProject(projects[projects.length - 1]);
            return;
        } else if (sliderMid === 1) {
            setSliderMid(0);
            setItemOffSet(0);
            setLimitedProjects([projects[projects.length - 2], projects[projects.length - 1], ...projects.slice(0, 3)]);
            setPreviewingProject(projects[0]);
            return;
        } else if (sliderMid === 2) {
            setSliderMid(1);
            setItemOffSet(1);
            setLimitedProjects([projects[projects.length - 1], ...projects.slice(0, 4)]);
            setPreviewingProject(projects[1]);
            return;
        } else if (sliderMid === projects.length - 1) {
            setSliderMid(19);
            setItemOffSet(17);
            setLimitedProjects([...projects.slice(projects.length - 4, projects.length), projects[0]]);
            setPreviewingProject(projects[projects.length - 2]);
            return;
        } else if (sliderMid === projects.length - 2) {
            setSliderMid(18);
            setItemOffSet(16);
            setLimitedProjects(projects.slice(projects.length - 5, projects.length));
            setPreviewingProject(projects[projects.length - 3]);
            return;
        }

        setSliderMid((prev) => prev - 1);
        setItemOffSet((prev) => prev - 1);
        setLimitedProjects(projects.slice(itemOffSet - 1, itemOffSet - 1 + 5));
        setPreviewingProject(projects[itemOffSet + 1]);
    };

    const nextProject = () => {
        if (sliderMid === projects.length - 1) {
            setSliderMid(0);
            setItemOffSet(0);
            setLimitedProjects([projects[projects.length - 2], projects[projects.length - 1], ...projects.slice(0, 3)]);
            setPreviewingProject(projects[0]);
            return;
        } else if (sliderMid === 0) {
            setSliderMid(1);
            setItemOffSet(1);
            setLimitedProjects([projects[projects.length - 1], ...projects.slice(0, 4)]);
            setPreviewingProject(projects[1]);
            return;
        } else if (sliderMid === projects.length - 3) {
            setSliderMid((prev) => prev + 1);
            setItemOffSet((prev) => prev + 1);
            setLimitedProjects([...projects.slice(projects.length - 4, projects.length), projects[0]]);
            setPreviewingProject(projects[projects.length - 2]);
            return;
        } else if (sliderMid === projects.length - 2) {
            setSliderMid((prev) => prev + 1);
            setItemOffSet((prev) => prev + 1);
            setLimitedProjects([...projects.slice(projects.length - 3, projects.length), projects[0], projects[1]]);
            setPreviewingProject(projects[projects.length - 1]);
            return;
        } else if (sliderMid === 1) {
            setSliderMid(2);
            setItemOffSet(0);
            setLimitedProjects(projects.slice(0, 5));
            setPreviewingProject(projects[2]);
            return;
        }

        setSliderMid((prev) => prev + 1);

        setItemOffSet((prev) => prev + 1);
        setLimitedProjects(projects.slice(itemOffSet + 1, itemOffSet + 1 + 5));
        setPreviewingProject(projects[itemOffSet + 3]);
    };

    return (
        <main>
            <section className="home-section">
                <div className="container">
                    <div
                        className="introduction"
                        data-aos="fade-right"
                        data-aos-duration="1000"
                    >
                        Hello, My name is <b>Sargis</b>
                        <br /> I am a Full Stack Software Developer, Problem Solver. Also I am developing web/desktop
                        games just for fun and experience, but the most important one...a person with humor :)
                    </div>
                    <div className="pfp-container">
                        <Image
                            className="profile-image"
                            src={IMAGES.pfp}
                            alt="Profile Image"
                            priority
                        />
                    </div>
                </div>
            </section>

            {/* ------------------------------------------------------------------------------------------------
												MY PROJECTS
	        ------------------------------------------------------------------------------------------------ --> */}
            <div className="section-heading">{headerT("my_projects")}</div>

            <section className="my-projects-section">
                <div className="container">
                    <div className="my-projects-information-container">
                        {previewingProject?.previewImage?.length ? (
                            <div
                                className="preview-box"
                                data-aos="fade-right"
                                data-aos-duration="1000"
                            >
                                <div
                                    className="left-arrow-container"
                                    onClick={previousProject}
                                >
                                    <FontAwesomeIcon icon={faArrowLeft} />
                                </div>
                                <div className="preview-img-box">
                                    <Image
                                        width={100}
                                        height={100}
                                        src={previewingProject?.previewImage}
                                        alt="Project"
                                        priority
                                    />
                                </div>

                                <div
                                    className="right-arrow-container"
                                    onClick={nextProject}
                                >
                                    <FontAwesomeIcon icon={faArrowRight} />
                                </div>
                            </div>
                        ) : (
                            <Skeleton
                                highlightColor="#96bb7c"
                                containerClassName="project-preview-box-skeleton"
                            />
                        )}

                        {previewingProject ? (
                            <div className="project-information">
                                <h3 className="project-title">{previewingProject?.name}</h3>
                                <div>
                                    <h4>
                                        {projectPreviewT("creation_time")} |{" "}
                                        {Object.keys(previewingProject).length ? (
                                            <span>{previewingProject?.creationTime}</span>
                                        ) : (
                                            <Skeleton
                                                highlightColor="#96bb7c"
                                                containerClassName="project-info-box-skeleton"
                                            />
                                        )}
                                    </h4>
                                    <h4>
                                        {projectPreviewT("technologies_used")} |{" "}
                                        {Object.keys(previewingProject).length ? (
                                            <span>{previewingProject?.technologies}</span>
                                        ) : (
                                            <Skeleton
                                                highlightColor="#96bb7c"
                                                containerClassName="project-info-box-skeleton"
                                            />
                                        )}
                                    </h4>
                                    <h4>
                                        {projectPreviewT("category")} |{" "}
                                        {Object.keys(previewingProject).length ? (
                                            <span>{previewingProject?.category}</span>
                                        ) : (
                                            <Skeleton
                                                highlightColor="#96bb7c"
                                                containerClassName="project-info-box-skeleton"
                                            />
                                        )}
                                    </h4>
                                </div>

                                <button className="view-preview">
                                    <a
                                        href={previewingProject?.link}
                                        target="_blank"
                                    >
                                        {projectPreviewT("preview")}
                                    </a>
                                </button>
                            </div>
                        ) : (
                            ""
                        )}
                    </div>

                    <div
                        className="my-projects-box"
                        data-aos="zoom-in"
                        data-aos-duration="1000"
                    >
                        {limitedProjects.length
                            ? limitedProjects.map((project: any, index: number) => {
                                  return (
                                      <div
                                          key={index}
                                          className={`project-boxes box-${index + 1}`}
                                      >
                                          <Image
                                              width={100}
                                              height={100}
                                              src={project.previewImage}
                                              alt="Preview Image"
                                              priority
                                          />
                                      </div>
                                  );
                              })
                            : [1, 2, 3, 4, 5].map((index) => {
                                  return (
                                      <Skeleton
                                          key={index}
                                          style={{ height: "100%" }}
                                          highlightColor="#96bb7c"
                                          containerClassName={`project-boxes box-${index} project-preview-slider-skeleton`}
                                      />
                                  );
                              })}
                    </div>
                </div>

                <div className="view-all-projects-container">
                    <div className="left-side"></div>
                    <Link href={`${localActive}/projects`}>
                        <div className="view-all-projects">{projectPreviewT("view_all_projects")}</div>
                    </Link>
                    <div className="right-side"></div>
                </div>
            </section>
            {/* -----------------------------------------------------------------------------------------------------
												SKILLS SECTION
	----------------------------------------------------------------------------------------------------- */}

            <section className="skills_section">
                <div
                    className="hint_1"
                    data-aos="flip-down"
                >
                    <div id="hint_inner_contaner">
                        {skillsT("hover_on_the_box_to_see")}
                        <Image
                            src={IMAGES.eyeIcon}
                            alt="Eye Icon"
                            priority
                        />
                    </div>
                </div>
                <div className="warning_div"></div>
                <div className="skills_box_container">
                    <div className="skill_box">
                        <div className="skills_container">
                            <h4>HTML</h4>
                            <h4>CSS/SCSS</h4>
                            <h4>JavaScript</h4>
                            <h4>Python</h4>
                            <h4>PHP</h4>
                            <h4>React JS/Vue JS</h4>
                            <h4>Next.js</h4>
                            <h4>SQL, MySQL</h4>
                            <h4>Node.Js/MongoDB</h4>
                            {skillsT("and_more")}...
                            <h4></h4>
                        </div>
                        <div className="skill_box_cover_img"> {skillsT("programming_skills")}</div>
                    </div>

                    <div className="skill_box">
                        <div className="skills_container">
                            <h4>
                                Very Creative
                                <br />
                                (As you can see... 🫡)
                            </h4>
                            <h4>Negotiation Skills</h4>
                            <h4>Hard Worker</h4>
                            <h4>Communicable</h4>
                            <h4>Team Worker</h4>
                            <h4>Reliable and Honest</h4>
                            <h4> {skillsT("and_more")}...</h4>
                        </div>
                        <div className="skill_box_cover_img">{skillsT("social_skills")}</div>
                    </div>

                    <div className="skill_box">
                        <div className="skills_container">
                            <h4>Singing</h4>
                            <h4>Drawing</h4>
                            <h4>Dancing</h4>
                            <h4>PC gaming</h4>
                            <h4>Sports</h4>
                            <h4>Music</h4>
                            <h4>Learning stuff</h4>
                            <h4>{skillsT("and_more")}...</h4>
                        </div>
                        <div className="skill_box_cover_img">{skillsT("hobbies")}</div>
                    </div>
                </div>
                <Image
                    src={IMAGES.cornerSpiderWeb}
                    id="corner_spider_web"
                    alt="corner_spider_web"
                    priority
                />
                <Image
                    src={IMAGES.cornerWeb}
                    id="corner-web"
                    alt="corner-web"
                    priority
                />
                <Image
                    src={IMAGES.cornerWeb}
                    id="corner-web2"
                    alt="corner-web"
                    priority
                />
                <Image
                    src={IMAGES.spider}
                    id="spider"
                    alt="spider"
                    priority
                />
                <Image
                    src={IMAGES.lamp}
                    id="lamp"
                    alt="lamp"
                    priority
                />
            </section>
        </main>
    );
}
