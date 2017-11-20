import React from "react";

import LanguageSwitcher from "./LanguageSwitcher";

import "./AppFooter.css";

const AppFooter = () => (
  <footer className="AppFooter">
    <p>Copyright &copy; 2015-2017 Bangumi Moe. All rights reserved.</p>
    <p>
      <LanguageSwitcher />
    </p>
  </footer>
);

export default AppFooter;
