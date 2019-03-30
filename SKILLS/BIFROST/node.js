import chokidar from "chokidar";
import fs from "fs";
import niceware from "niceware";

// TODO: Move versioning out?
export default ({
    HTTP,
    SET
}) => {
    const addresses = new Map();

    SET({
        BIFROST: Object.assign((path, purpose = `unknown nefarious purposes`) => {
            let snapshot = ``;

            let writers = new Set();
    
            let version = ``;

            const fetch_client_version = () => {
                fs.readFile(`./bin/client.version`, `utf8`, (err, data) => {
                    if(err) {
                        return;
                    }
    
                    version = data;

                    // give the http servers a hot second to change out the files.
                    setTimeout(() => {
                        console.info(`NEW CLIENT VERSION`);
                        console.log(version);
            
                        writers.forEach((write) => write({
                            signal: `UPDATE`,
                            data
                        }));
                    }, 500);
                });
            };

            fetch_client_version();

            chokidar.watch(`./bin/client.version`).
                on(`change`, fetch_client_version);
    
            const handler = (req, res) => {
                res.status(200).
                    set({
                        "Content-Type": `text/event-stream`,
                        "Cache-Control": `no-cache`,
                        "Connection": `keep-alive`,
                    });

                res.write(`\n`);
        
                const write = (data) => res.write(`data:${JSON.stringify(data)}\n\n`);
                const id = niceware.generatePassphrase(16);
                addresses.set(id, write);
                write(snapshot);
                
                write({
                    signal: `ID`,
                    data: id
                });
                
                if(req.params.version) {
                    if(req.params.version.trim() !== version.trim()) {
                        write({
                            signal: `UPDATE`,
                            data: version
                        });
                    }
                }

                writers.add(write);

                req.on(`close`, () => {
                    writers.delete(res);
                    addresses.delete(id);
                });
            };

            HTTP.get(`${path}/:version`, handler);
            HTTP.get(`${path}`, handler);
            
            console.log(`[BIFROST] available on ${path} for ${purpose}`); 
            
            return ({
                signal,
                data
            }) => {
                if(signal === `SNAPSHOT`) {
                    snapshot = data;
                }
        
                writers.forEach((write) => write({
                    signal,
                    data
                }));
            };
        }, {
            to: (address, data) => {
                const writer = addresses.get(address);
                if(!writer) {
                    return false;
                }

                writer(data);
            }
        })
    });
};
