type Props = 'PATCH' | 'DELETE' | 'GET' | 'POST';

const createRequest = async (path: string, method: Props) => {
  const response = await fetch(new URL(path, 'http://127.0.0.1:1337/'), {
    method,
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  if (method !== 'DELETE' && method !== 'PATCH') {
    return response.json();
  }
};

export { createRequest };
