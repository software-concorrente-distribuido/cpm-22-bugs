document.addEventListener('DOMContentLoaded', function() {
    
    const postButton = document.getElementById('post');
    const getByIdButton = document.getElementById('get-by-id');
    const getAllButton = document.getElementById('get');
    const putButton = document.getElementById('put');
    const deleteButton = document.getElementById('delete');
    const optionsButton = document.getElementById('options');
    const headButton = document.getElementById('head');
    const traceButton = document.getElementById('trace');

    const idInput = document.getElementById('id');
    const contentInput = document.getElementById('content');

    const response = document.getElementById('response');

    const requestUrl = 'http://172.16.13.66:9090';

    const updateResponse = (data) => {
        response.innerHTML = JSON.stringify(data, null, 4);
    }

    const getRequestBody = () => {
        return contentInput.value;
    }

    const performRequest = (method, withHeaders = true, withBody = false, withId = false) => {
        fetch(`${requestUrl}${withId ? `?id=${idInput.value}` : ''}`, {
            method: method,
            headers: withHeaders ? {
                'Content-Type': 'application/json'
            } : {},
            body: withBody ? JSON.stringify(getRequestBody()) : null
        })
            .then(response => response.json())
            .then(updateResponse);
    }

    postButton.addEventListener('click', performRequest.bind(null, 'POST', true, true));

    getByIdButton.addEventListener('click', performRequest.bind(null, 'GET', false, false, true));

    getAllButton.addEventListener('click', performRequest.bind(null, 'GET'));

    putButton.addEventListener('click', performRequest.bind(null, 'PUT', true, true, true));

    deleteButton.addEventListener('click', performRequest.bind(null, 'DELETE', false, false, true));

    optionsButton.addEventListener('click', performRequest.bind(null, 'OPTIONS'));

    headButton.addEventListener('click', performRequest.bind(null, 'HEAD'));

    traceButton.addEventListener('click', performRequest.bind(null, 'TRACE'));

});