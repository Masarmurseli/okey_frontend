const BASE_URL = "http://localhost:8080"      

async function baseFetch(endpoint, options = {}, dispatch, getState) {

  const config = {
    method: 'GET', 
    ...options,
    headers: {
      'Content-Type': 'application/json', 
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      ...options.headers,
    },
    credentials: "include",
    
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, config);  

  return await response.json()
  
}

export { baseFetch };

