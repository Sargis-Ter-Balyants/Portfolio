import Link from "next/link";
import React from "react";

import "./ProjectPreview.scss";
import { useTranslations } from "next-intl";

const ProjectPreview = ({ project }: any) => {
    const t = useTranslations("projectPreview");

    return (
        <div className="all_projects_container">
            <div className="project_box">
                <div className="project_title_container">{project.name}</div>
                <img
                    src={project.previewImage}
                    width="100%"
                    height="106%"
                />
            </div>
            <div className="description_box">
                <h3>
                    {t("creation_time")} | <span>{project.creationTime}</span>
                </h3>
                <h3>
                    {t("technologies_used")} | <span>{project.technologies}</span>
                </h3>
                <h3>
                    {t("category")} | <span>{project.category}</span>
                </h3>
                <Link
                    target="_blank"
                    href={project.link}
                    className="preview_btn"
                >
                    <button>{t("preview")}</button>
                </Link>
            </div>
            <div className="title">
                <div className="title-text">{project.name}</div>
            </div>
        </div>
    );
};

export default ProjectPreview;
