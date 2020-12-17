import env from 'react-dotenv';

const resCheck = (res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);

export const signup = (email, password) => {
  return fetch(`${env.BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
    .then(resCheck);
};

export const signin = (email, password) => {
  return fetch(`${env.BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
    .then(resCheck);
}

export const getContent = (token) => {
  return fetch(`${env.BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${token}`
    }
  })
    .then(resCheck);
}