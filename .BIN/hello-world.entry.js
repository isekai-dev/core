import isekai from "isekai";
isekai.SET({"NODE":{},"HTTP":{"port":8080,"STATIC":{"public":"/"}},"LOG":{"greetings":"Hello, serving ./DATA/public on http://localhost:8080"}});

import HTTP from "../node_modules/isekai/SKILLS/HTTP/node.js";

isekai.EQUIP({
    HTTP,
});
