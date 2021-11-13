document.querySelector('#formUser').addEventListener('submit', async e => {
  e.preventDefault();
  const user = {
    name: document.querySelector('#nome').value,
    surname: document.querySelector('#sobrenome').value,
    email: document.querySelector('#email').value,
    password: document.querySelector('#password').value,
    admin: document.querySelector('#adm').checked
  }
  try {
    let ret = await fetch('https://impact-app.herokuapp.com/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'authorization': 'Bearer' + ' ' + sessionStorage.getItem('token')
        },
      body: JSON.stringify(user),
    })
    let retJson = await ret.json();
    if (ret.status == 201) {
      output.classList.add('success');
      output.style.color = 'green';
      output.innerText = retJson.message;
      document.querySelector('#formUser').reset();
    } else {
      output.style.color = 'red';
      output.innerText = retJson.error;
    }
  } catch (error) {
    output.innerText = error.message;
    output.style.color = 'red';
    
  }
})