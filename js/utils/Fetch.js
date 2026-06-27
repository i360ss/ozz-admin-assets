// Send fetch request
const send = (url, method='GET', body=null, headers={}) => {
  const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content') ?? '';

  const requestHeaders = {
    'X-CSRF-TOKEN': csrfToken,
    ...headers
  };

  return new Promise((resolve, reject) => {
    fetch(url, {
      method: method,
      headers: requestHeaders,
      body: body,
    })
    .then(response => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    })
    .then(data => {
      resolve(data);
    })
    .catch(error => {
      console.error('Error:', error);
      reject(error);
    });
  });
};

export { send };
