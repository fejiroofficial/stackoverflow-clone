const responseHandler = (response, status=200, success=true, message='Process was successful', data=[]) => {
    return response.status(status).json({
        success, message, data
    });
};

export default responseHandler