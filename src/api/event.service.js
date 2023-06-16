import base from "./base.service";

const instance = base.service(true);

export const getAllEvents = () => {
    return instance
        .get('conferences/events/list/')
        .then((result)=>result.data)
};


export const updateEvent = (idEvent,dataToUpdate) => {
    return instance
        .put(`conferences/events/${idEvent}`,dataToUpdate)
        .then((result)=>result.data)
};

export const deleteEvent = (idEvent) => {
    return instance
        .delete(`conferences/events/${idEvent}`)
        .then((result)=>result.data)
};

export const getEvent = (idEvent) => {
    return instance
        .get(`conferences/events/${idEvent}`)
        .then((result)=>result.data)
};



export const createEvent = (dataConference) => {
    return instance
        .post('conferences/events/', dataConference, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then((result) => result.data);
};

export const createEventVisitor = (dataEventVisitor) => {
    return instance
        .post('conferences/event-visitors/', dataEventVisitor, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then((result) => result.data);
};

export const deleteEventVisitor = (idEventVisitor) => {
    return instance
        .delete(`conferences/event-visitors/${idEventVisitor}`)
        .then((result)=>result.data)
};

export const getEventVisitor = (event,visitor) => {

    let urlFetch = 'conferences/visitor/';
    let params= [];

    if(event)
    {
        params.push(`event=${encodeURIComponent(event)}`);
    }
    if(visitor)
    {
        params.push(`visitor=${encodeURIComponent(visitor)}`);
    }
    if(params.length>0)
    {
        urlFetch += `?${params.join('&')}`;
    }

    return instance
        .get(urlFetch)
        .then((result)=>result.data)
};


const Events = {
    getAllEvents,
    createEvent,
    deleteEvent,
    updateEvent,
    getEvent,
    createEventVisitor,
    deleteEventVisitor,
    getEventVisitor
};

export default Events
