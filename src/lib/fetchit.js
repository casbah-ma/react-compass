const defaultHeaders = {
  "Content-Type": "application/json",
};

const multipartHeaders = {
  "Content-Type": "multipart/form-data",
};

/**
 * fetchit
 * 
 * @param {String} url 
 * @param {*} data json or file
 * @param {Function} method ['POST', 'GET', 'PATCH', 'DELETE'] @default 'GET'
 * @param {String} accessToken 
 * @param {Boolean} multipart @default false
 * @returns {Object} response.json()
 */
async function fetchit(url = "", data = {}, method, accessToken, multipart=false) {
  let options = {}
  options.method = method || "GET"
  options.headers = {
    ...defaultHeaders
  }
  if (accessToken) {
    options.headers = {
      ...defaultHeaders,
      Authorization: `Bearer ${accessToken}`,
    }
  }

  if (data && multipart) {
    options.headers = {
      ...multipartHeaders,
      Authorization: `Bearer ${accessToken}`,
    }
    options.body = data
  }

  if (data && !multipart) {
    options.body = JSON.stringify(data)
  }

  const response = await fetch(url, { ...options });
  
  if (response.status > 299) {
    throw new Error(response.statusText);
  }

  return response.json();
}

export default fetchit;
