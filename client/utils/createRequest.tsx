type Props = 'PATCH' | 'DELETE' | 'GET' | 'POST';

const createRequest = async (path: string, method: Props) => {
  return fetch(new URL(path, 'http://127.0.0.1:1337/'), {
    method,
  });
};

export { createRequest };
