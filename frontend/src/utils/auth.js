export const BASE_URL = 'https://register.nomoreparties.co';

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Content-Security-Policy': 'default-src self; img-src *; script-src self',
    },
    body: JSON.stringify({password, email})
  })
  .then((res) => {
    return res.json();
  })
  .then((res) => {
    return res;
  })
  .catch((err) => console.log(err));
};

export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Content-Security-Policy': 'default-src self; img-src *; script-src self',
    },
    body: JSON.stringify({password, email})
  })
  .then((res => res.json()))
  .then((data) => {
    if (data.token) {
      localStorage.setItem('jwt', data.token);
      return data;
    }
  })
  .catch(err => console.log(err));
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Content-Security-Policy': 'default-src self; img-src *; script-src self',
    }
  })
  .then(res => res.json())
  .catch((err)=>{console.log(err)});
};