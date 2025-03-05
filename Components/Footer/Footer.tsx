import React from "react";
import "./Footer.scss";
import { useTranslations } from "next-intl";

const Footer = () => {
    const t = useTranslations("footer");

    return <footer>{t("all_rights_reserved")} &copy;</footer>;
};

export default Footer;
