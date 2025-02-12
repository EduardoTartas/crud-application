export const formatResponse = (res, status, message, data = null, error = null) => {
    res.status(status).json({
        success : status < 400,
        status,
        message,
        data,
        error: error ? {
            message: error.message,
            details: error.errors || []
        } : null
    });   
}