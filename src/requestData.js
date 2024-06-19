// Function to fetch data using GET method
async function fetchData(url) {
    try {
        const response = await fetch(url, {
            method: 'GET',
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error: ', error);
        throw error;
    }
}

// Function to send data using POST method
async function postData(url = '', data = {}, options = {}) {
    try {
        const fetchOptions = {
            method: 'POST',
            body: data instanceof FormData ? data : JSON.stringify(data),
            ...options,
            credentials: 'include'
        };
  
        if (!(data instanceof FormData)) {
            fetchOptions.headers = {
                'Content-Type': 'application/json'
            };
        }
  
        const response = await fetch(url, fetchOptions);
  
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
  
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Fetch error: ', error);
        throw error;
    }
  }

// Export both functions
export { fetchData, postData };