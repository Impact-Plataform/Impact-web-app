let email = document.querySelector("#email");
let entrar = document.querySelector("#entrar");
let password = document.querySelector("#password");
let output = document.createElement("span");
output.classList.add("output");



function check() {
  if (email.value.indexOf("@") == -1) {
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

document.querySelectorAll('input').forEach(input =>input.addEventListener("blur", () => check()));

entrar.addEventListener("click", e => {
    e.preventDefault();
    check();
});
