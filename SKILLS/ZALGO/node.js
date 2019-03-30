import niceware from "niceware";

export default ({
    HTTP: {
        API,
    },
    SET
}) => {
    const listeners = new Set();

    const ZALGOS = new Map(Object.entries({
        echo: () => ({
            message: `echo` 
        })
    }));

    const set_zalgo = ({
        zalgo,
        strength = 12,
        handler
    }) => {
        zalgo = zalgo || niceware.generatePassphrase(strength).
            join(` `);

        ZALGOS.set(zalgo, handler);
        
        return zalgo;
    };

    const fire = ({
        zalgo,
        data = {}
    }) => {
        if(!ZALGOS.has(zalgo)) {
            return listeners.forEach((hey_listen) => hey_listen({
                zalgo,
                data
            }));
        }

        return ZALGOS.get(zalgo)(data);
    };

    const remove = (zalgo) => {
        ZALGOS.delete(zalgo);
    };

    const listen = (listener) => {
        listeners.add(listener);
        
        return () => {
            listeners.remove(listener);
        };
    };

    SET({
        ZALGO: Object.assign(set_zalgo, {
            remove,
            fire,
            listen,
            make: niceware.generatePassphrase
        })
    });

    API.post(`/zalgo`, ({ body }, res) => {
        res.setHeader(`Content-Type`, `application/json`);

        res.end(JSON.stringify(fire(body) || {}));
    });
};