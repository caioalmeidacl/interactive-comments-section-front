const BASE_URL = import.meta.env.VITE_BASE_URL_API;

const fetchData = async (endpoint, options = {}) => {
    const token = localStorage.getItem('token');
    const url = `${BASE_URL}/${endpoint}`;
    
    const headers = { 
        'Content-Type': "application/json", "Authorization": token ? `Bearer ${token}` : "", ...options.headers, 
    };

    const response = await fetch(url, { 
        headers, ...options,
    });

    if(!response.ok) {
        if(response.status === 400 || response.status === 403){
            throw new Error((await response.json().detail));
        }
        throw new Error("Error ao realizar a requisição");
    }

    return await response.json();
}


export const login = async (username, password) => {
    return await fetchData("api/login", {
        method: "POST", 
        headers: {
            "Content-Type": "application/json",
        }, 
        body: JSON.stringify({ username, password }),
    });
}


export const getUserInfo = async () => {
    return await fetchData("api/login/me", {
        method: "GET",
    });
};

export const getAllComments = async () => {
    return await fetchData("api/comment", {
        method: "GET",
    });  
};  

export const updateScore = async (score, id) => {
    return await fetchData(`api/comment/${id}`, {
        method: "PATCH", 
        body: JSON.stringify({ score }),
    });
};


export const createComment = async (comment) => {
    return await fetchData('api/comment',  {
        method: "POST", 
        body: JSON.stringify({ content: comment }),
    });
};

export const createReply = async (reply, parentId) => {
    return await fetchData('api/reply', {
        method: "POST",
        body: JSON.stringify({ content: reply, commentId: parentId }),
    });
};