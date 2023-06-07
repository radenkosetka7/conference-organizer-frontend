import base from "./base.service";

const instance = base.service(true);

export const getAllConferences = (search,start,end,finished) => {
    let urlFetch = 'conferences/conferences/list/';
    let params= [];

    if(search)
    {
        params.push(`search=${encodeURIComponent(search)}`);
    }
    if(start)
    {
        params.push(`start_date=${encodeURIComponent(start)}`);
    }
    if(end)
    {
        params.push(`end_date=${encodeURIComponent(end)}`);
    }
    if(finished != null)
    {
        params.push(`finished=${encodeURIComponent(finished)}`);
    }
    if(params.length>0)
    {
        urlFetch += `?${params.join('&')}`;
    }

    return instance
        .get(urlFetch)
        .then((result)=>result.data)
};

export const updateConference = (idConference,dataToUpdate) => {
    return instance
        .put(`conferences/conferences/${idConference}`,dataToUpdate)
        .then((result)=>result.data)
};

export const deleteConference = (idConference) => {
    return instance
        .delete(`conferences/conferences/${idConference}`)
        .then((result)=>result.data)
};

export const getConference = (idConference) => {
    return instance
        .get(`conferences/conferences/${idConference}`)
        .then((result)=>result.data)
};


export const createConference = (dataConference) => {
    return instance
        .post('conferences/conferences/', dataConference, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then((result) => result.data);
};

export const getAllModeratorConferences = () => {
    return instance
        .get('conferences/conferences/moderator/')
        .then((result)=>result.data)
};

export const getAllOrganizerConferences = () => {
    return instance
        .get('conferences/conferences/organizer/')
        .then((result)=>result.data)
};

export const getAllVisitorConferences = () => {
    return instance
        .get('conferences/user-events/')
        .then((result)=>result.data)
};
const Conferences = {
    getAllConferences,
    updateConference,
    createConference,
    deleteConference,
    getConference,
    getAllVisitorConferences,
    getAllModeratorConferences,
    getAllOrganizerConferences
};

export default Conferences;
