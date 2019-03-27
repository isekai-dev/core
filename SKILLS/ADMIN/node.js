import runner from "./runner.js";

export default ({
    ZALGO,
    ADMIN: {
        zalgo,
    }
}) => {
    const admin_zalgo = ZALGO({
        zalgo,
        strength: 18,
        handler: () => {
            runner(`git pull origin master`, `npm install`, `npm run build`).
                then(() => {
                    process.exit();
                });
            
            return {
                restart: true
            };
        }
    });

    if(!zalgo) {
        return console.log(`[ADMIN] ZALGO: ${admin_zalgo}`);
    } 
        
    console.log(`[ADMIN] STARTED`);
};
