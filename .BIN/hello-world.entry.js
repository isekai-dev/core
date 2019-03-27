import isekai from "isekai";
isekai.SET({"NODE":{},"HTTP":{"port":8080,"STATIC":{"public":"/"}},"LOG":{"greetings":"Hello, serving ./DATA/public on http://localhost:8080"},"ZALGO":{},"ADMIN":{"zalgo":"restart"}});

import HTTP from "../SKILLS/HTTP/node.js";
import ZALGO from "../SKILLS/ZALGO/node.js";
import ADMIN from "../SKILLS/ADMIN/node.js";

isekai.EQUIP({
    HTTP,
    ZALGO,
    ADMIN,
});
