"use client";

import "./Header.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useState } from "react";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";
import ReactLanguageSelect from "react-languages-select";
import "react-languages-select/scss/react-languages-select.scss";

const Header = () => {
    const localActive = useLocale();
    const t = useTranslations("header");

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <>
            {mobileMenuOpen ? (
                <aside className="mobile-menu">
                    <div
                        className="close-mobile-menu"
                        onClick={() => {
                            setMobileMenuOpen(false);
                        }}
                    >
                        <FontAwesomeIcon icon={faX} />
                    </div>
                    <div className="navigation-links">
                        <Link
                            href={"/"}
                            onClick={() => {
                                setMobileMenuOpen(false);
                            }}
                        >
                            {t("home")}
                        </Link>
                    </div>
                    <div className="navigation-links">
                        <Link
                            href={`/${localActive}/projects`}
                            onClick={() => {
                                setMobileMenuOpen(false);
                            }}
                        >
                            {t("my_projects")}
                        </Link>
                    </div>
                    <div className="navigation-links">
                        <Link
                            href={`/Resume.pdf`}
                            download={`/Resume.pdf`}
                            onClick={() => {
                                setMobileMenuOpen(false);
                            }}
                            target="_blank"
                        >
                            {t("download_cv")}
                        </Link>
                    </div>
                    <div className="navigation-links last-link">
                        <Link
                            href={`/${localActive}/contact-me`}
                            onClick={() => {
                                setMobileMenuOpen(false);
                            }}
                        >
                            {t("contact_me")}
                        </Link>
                    </div>
                </aside>
            ) : (
                ""
            )}

            <header className="header">
                <div className="container">
                    <div className="logo-container">
                        <div className="hello-world">{t("hello_world")}</div>
                    </div>
                    <div className="navigation-through-site">
                        <div className="navigation-links">
                            <Link href={"/"}>{t("home")}</Link>
                        </div>
                        <div className="navigation-links">
                            <Link href={`/${localActive}/projects`}>{t("my_projects")}</Link>
                        </div>
                        <div className="navigation-links">
                            <Link
                                href={`/Resume.pdf`}
                                target="_blank"
                            >
                                {t("download_cv")}
                            </Link>
                        </div>
                        <div className="navigation-links last-link">
                            <Link
                                href={`/${localActive}/contact-me`}
                                onClick={() => {
                                    setMobileMenuOpen(false);
                                }}
                            >
                                {t("contact_me")}
                            </Link>
                        </div>

                        <div
                            className="hamburger-menu"
                            onClick={() => {
                                setMobileMenuOpen(true);
                            }}
                        >
                            <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
