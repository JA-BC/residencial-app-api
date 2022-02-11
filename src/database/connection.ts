import { createConnection } from 'typeorm';

export default async (callback?: Function) => {
    try {
        const connection = await createConnection();
        
        if (typeof callback === 'function') {
            callback();
        }
    
        return connection;
    } catch(e) {
        console.error('CONNECTION_ERROR:\n', e);
    }
}