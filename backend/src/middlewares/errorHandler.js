export const errorHandler = (err, req, res, next) => {
    console.log(err.stack);
    formatResponse(res, 500, 'Internal Server Error', null, err);
}