let id = document.URL.split('?')[1]


async function isMinor(dataNasc) {
  const dataAtual = new Date()
  const anoAtual = dataAtual.getFullYear()
  const anoNascParts = dataNasc.split('/')
  const diaNasc = anoNascParts[0]
  const mesNasc = anoNascParts[1]
  const anoNasc = anoNascParts[2]
  let idade = anoAtual - anoNasc
  const mesAtual = dataAtual.getMonth() + 1

  // Se mes atual for menor que o nascimento, nao fez aniversario ainda;
  if (mesAtual < mesNasc) {
    idade--
  } else {
    // Se estiver no mes do nascimento, verificar o dia
    if (mesAtual === mesNasc) {
      // Se a data atual for menor que o dia de nascimento ele ainda nao fez aniversario
      if (new Date().getDate() < diaNasc) {
        idade--
      }
    }
  }
  return idade < 18 ? true : false
};


(async () => {

  let ret = await fetch('https://impact-app.herokuapp.com/student/getStudent/' + id, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'authorization': 'Bearer' + ' ' + sessionStorage.getItem('token')
    }
  })

  const retJson = await ret.json()
  const student = retJson.student


  document.getElementById("name").value = student.name

  let data = student.birthdate.split('/').reverse().join('-')
  document.getElementById("birthdate").value = data
  document.getElementById("rg").value = student.documents.rg
  document.getElementById("cpf").value = student.documents.cpf
  document.getElementById("city_of_birth").value = student.city_of_birth
  document.getElementById("schooling").value = student.schooling
  document.getElementById("email").value = student.contacts.email
  document.getElementById("phone").value = student.contacts.phone

  if (await isMinor(student.birthdate)) {
    document.getElementById("parentName").value = student.parent.name
    document.getElementById("parentCpf").value = student.parent.cpf
    document.getElementById("relationshinp").value = student.parent.relationship
    document.getElementById("parentPhone").value = student.parent.phone
  }else{
    document.getElementById('parentForm').style.display = 'none'
  }

  document.getElementById("cep").value = student.address.cep
  document.getElementById("street").value = student.address.street
  document.getElementById("complement").value = student.address.complement
  document.getElementById("number").value = student.address.number

  document.getElementById("marital_status").value = student.marital_status
  document.getElementById("income").value = student.income
  if (student.family_members_with_disability) {
    document.getElementById("family_members_with_disability").checked = true
  } else {
    document.getElementById("family_members_with_disability").checked = false
  }

  document.getElementById("family_income").value = student.family_income
  if (student.government_aid) {
    document.getElementById("government_aid").checked = true
  } else {
    document.getElementById("government_aid").checked = false
  }
  document.getElementById("family_members").value = student.family_members

})()

function validarCPF(el) {
  if (!_cpf(el.value)) {
    alert("CPF inválido!" + el.value);
    // apaga o valor
    el.value = "";
  }
}







