import base from './base.service'

const instance = base.service(true);


export const updateResourceItem = (idResourceItem, dataToUpdate) => {
    return instance
        .put(`conferences/resource_items/${idResourceItem}`,dataToUpdate)
        .then((result)=>result.data)
};

const ResourceItem = {
    updateResourceItem
}

export default ResourceItem;