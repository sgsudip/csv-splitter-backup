export function getList() {
    return fetch('https://jsonplaceholder.typicode.com/users')
      .then(data => data.json())
  }
  
