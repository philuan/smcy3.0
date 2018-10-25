import $http from './http'
const api = {
  reportReminding: (obj) => {
    return $http.post('/reportInfo/add', obj)
  }
}
export default api
