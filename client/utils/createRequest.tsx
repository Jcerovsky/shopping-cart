type Props = 'PATCH' | 'DELETE' | 'GET' | 'POST';

const createRequest = async (path: string, method: Props) => {
  const BASE_URL = 'http://127.0.0.1:1337/';
  return await fetch(BASE_URL + path, {
    method: method,
  });
};

export { createRequest };
