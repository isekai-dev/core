export default ({
    SET
}) => {
    SET({
        BIFROST: (path) => {
            const signal_sets = new Set();
        
            const eventStream = new EventSource(`${path}/CLIENT_VERSION`);
        
            eventStream.onmessage = ({ data: raw }) => {  
                const {
                    signal,
                    data
                } = JSON.parse(raw);
                
                signal_sets.forEach((signals) => {
                    if(signals[signal]) {
                        signals[signal]({ data });
                    }
                });
            };
    
            return {
                on: (new_signals) => {
                    signal_sets.add(new_signals);
                } 
            };
        }
    });
};
