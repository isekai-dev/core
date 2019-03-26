import express from "express";
import helmet from "helmet";

import sub_skills from "./SKILLS/*.js";

// for express nto to send stack traces
process.env.NODE_ENV = `production`;

export default ({
    EQUIP
}) => EQUIP({
    HTTP: ({
        HTTP: {
            port = 8080
        },
        SET,
    }) => {
        const app = express();
        app.use(helmet());

        app.listen(port, () => {
            console.log(`[HTTP]`);
            console.log(`Listening on http://localhost:8080`);
        });

        SET({
            HTTP: app
        });
    },    
    ...sub_skills
});
