import axios from 'axios';

const API_URL = 'http://localhost:3001/';
const TOKEN = 'whatever-you-want';

export const endpoints = {
  posts: ({ id, categoryPath } = {}) => {
    if (id) {
      return `/posts/${id}`;
    }

    if (categoryPath) {
      return `/${categoryPath}/posts`;
    }

    return '/posts';
  },
  comments: ({ commentId, postId } = {}) => {
    if (postId) {
      return `/posts/${postId}/comments`;
    }

    if (commentId) {
      return `/comments/${commentId}`;
    }

    return '/comments';
  },
  categories: () => '/categories',
};

const request = (params) => (method) =>
  axios({
    baseURL: API_URL,
    method,
    headers: {
      ...params.headers,
      Authorization: TOKEN,
    },
    ...params,
  });

export default {
  get: params => request(params)('GET'),
  post: params => request(params)('POST'),
  put: params => request(params)('PUT'),
  delete: params => request(params)('DELETE'),
};
