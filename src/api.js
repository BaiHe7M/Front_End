export function getAuthToken() {
  // 假设 JWT Token 存储在 localStorage 中
  return localStorage.getItem('token'); // 确保这里的 key 是 'token'
}
