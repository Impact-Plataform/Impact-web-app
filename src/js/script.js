let email = document.querySelector("#email");
let entrar = document.querySelector("#entrar");
let password = document.querySelector("#password");
let output = document.createElement("span");
output.classList.add("output");

function check() {
  if (email.value.indexOf("@") == -1 && email.value.indexOf('.') == -1) {
    output.innerHTML = "Preencha os campos corretamentes";
    email.parentNode.insertBefore(output, entrar);
    email.classList.add("error");
    return false;
  } else {
    email.classList.remove("error");
    output.remove();
  }
  if (password.value == "") {
    output.innerHTML = "Preencha os campos corretamente";
    password.parentNode.insertBefore(output, entrar);
    password.classList.add("error");
    return false;
  } else {
    password.classList.remove("error");
    output.remove();
  }
  return true;
}

document.querySelectorAll('input').forEach(input => input.addEventListener("blur", () => check()));

entrar.addEventListener("click", async e => {
  e.preventDefault();
  check();

  const credenciais = {
    email: email.value,
    password: password.value
  }

  let ret = await fetch('https://impact-app.herokuapp.com/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(credenciais)
  })

  let retJson = await ret.json()

  if (ret.status === 200) { 
    window.sessionStorage.setItem('token', retJson.token)
    window.sessionStorage.setItem('user', retJson.user.name)
    window.sessionStorage.setItem('userType', retJson.user.type)
    window.location.href = './src/pages/dashboard.html'
  } else { 
    output.innerHTML = retJson.message
    password.parentNode.insertBefore(output, entrar);
  }

});
