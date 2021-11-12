document.querySelector('#formUser').addEventListener('submit', async e => {
  e.preventDefault();
  const user = {
    nome: document.querySelector('#nome').value,
    sobrenome: document.querySelector('#sobrenome').value,
    email: document.querySelector('#email').value,
    senha: document.querySelector('#password').value,
    admin: document.querySelector('#adm').checked

  }
  console.log(user);
  let ret = await fetch('https://impact-app.herokuapp.com/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'authorization': 'Bearer' + ' ' + sessionStorage.getItem('token')
      },
    body: JSON.stringify(user),
  })
  let data = await ret.json();
  console.log(data);

})