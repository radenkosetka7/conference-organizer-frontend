import base from "./base.service";

const instance = base.service(true);


export const createRating = (dataRating) => {
    return instance
        .post('conferences/rating/', dataRating, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then((result) => result.data);
};

const Rating = {
    createRating
}

export default Rating;