import axios from 'axios';


export async function getAllZweets(token) {
    try {
        const response = await axios.get('https://yvldybmd1b.execute-api.us-east-1.amazonaws.com/prod/zweets', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function postZweet(token, content) {
    try {
        await axios.post('https://yvldybmd1b.execute-api.us-east-1.amazonaws.com/prod/zweets',
            {
                content: content
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );

    } catch (error) {
        console.error(error);
        throw error;
    }
}