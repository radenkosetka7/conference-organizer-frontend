import base from './base.service'

const instance = base.service(true);

export const getAllEventTypes = () => {
    return instance
        .get('conferences/event_types/')
        .then((result)=>result.data)
}


const EventTypes = {
    getAllEventTypes
};

export default EventTypes;