if(sessionStorage.getItem('token')){
  window.location.href = window.location.pathname + 'src/pages/dashboard.html'
}
window.onload = () => {
  let email = document.querySelector("#email");
  let entrar = document.querySelector("#entrar");
  let password = document.querySelector("#password");
  let output = document.createElement("span");
  output.classList.add("output")
  function check(e) {
    if (e.target.name === "email") {
      if (email.value.indexOf("@") == -1 && email.value.indexOf('.') == -1) {
        output.innerHTML = "Preencha os campos corretamentes"
        email.parentNode.insertBefore(output, entrar)
        email.classList.add("error")
        return false
      } else {
        email.classList.remove("error")
        output.remove()
      }
      return true
    }
    if (password.value == "") {
      output.innerHTML = "Preencha os campos corretamente"
      password.parentNode.insertBefore(output, entrar)
      password.classList.add("error")
      return false
    } else {
      password.classList.remove("error")
      output.remove()
    }
    return true
  }

  document.querySelectorAll('input').forEach(input => input.addEventListener("blur", e => check(e)))

  entrar.addEventListener("click", async e => {
    e.preventDefault()
    if (!check(e)) {
      return
    }

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
      window.sessionStorage.setItem('user', retJson.user)
      window.sessionStorage.setItem('admin', retJson.admin)
      window.location.href = './src/pages/dashboard.html'
    } else {
      output.innerHTML = retJson.message
      password.parentNode.insertBefore(output, entrar)
    }

  })
}