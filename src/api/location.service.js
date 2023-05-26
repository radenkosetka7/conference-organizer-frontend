import base from './base.service'

const instance = base.service(true);

export const getAllLocations = () => {
    return instance
        .get('conferences/locations/list/')
        .then((result)=>result.data)
};

const Locations = {
    getAllLocations,
}

export default Locations;