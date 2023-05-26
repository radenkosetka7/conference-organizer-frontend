import base from "./base.service";

const instance = base.service(true);


export const createReservedItem = (dataReservedItem ) => {
    return instance
        .post('conferences/reserved_items/', dataReservedItem, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then((result) => result.data);
};

export const deleteReservedItem = (idItem) => {
    return instance
        .delete(`conferences/reserved_items/${idItem}`)
        .then((result)=>result.data)
};

export const updateReservedItem = (idItem,dataToUpdate) => {
    return instance
        .put(`conferences/reserved_items/${idItem}`,dataToUpdate)
        .then((result)=>result.data)
};

const ReservedItem  = {
    createReservedItem,
    deleteReservedItem,
    updateReservedItem
}

export default ReservedItem;