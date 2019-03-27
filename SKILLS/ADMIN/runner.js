import { exec } from "child_process";

const do_exec = (cmd) => {
    console.log(`DOING `, cmd);
    const child = exec(cmd);

    return new Promise(((resolve, reject) => {
        child.addListener(`error`, reject);
        child.addListener(`exit`, resolve);
    }));
};

const runner = async (...tasks) => {
    const cmd = tasks.shift();
    if(!cmd) {
        return;
    }

    await do_exec(cmd);
    
    return runner(...tasks);
};

export default runner;
