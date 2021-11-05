if (!window.sessionStorage.getItem('token')) {
  window.location.href = "/";
}
window.onload = () => {
  const admin = document.querySelector('.admin').innerHTML = window.sessionStorage.getItem('user')
  document.querySelector('#logout').addEventListener('click', () => {
    sessionStorage.removeItem('token');
    window.location.href = '/';
  })
}
