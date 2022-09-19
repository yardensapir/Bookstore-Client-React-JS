import environments from '../environments/environments';

const API_URL = environments.API_URL;

export const login = async (data) => {
    const response = await fetch(`${API_URL}/users/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (response.status !== 200) {
          throw new Error();
        }

        const payload = await response.json();

        return payload;
}