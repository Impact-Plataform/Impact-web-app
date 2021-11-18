let id = document.URL.split('?')[1].split('#')[0]


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
    document.getElementById("relationship").value = student.parent.relationship
    document.getElementById("parentPhone").value = student.parent.phone
  } else {
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
  if (student.jedi) {
    document.getElementById("jedi-checkbox").checked = true
  } else {
    document.getElementById("jedi-checkbox").checked = false
  }

  document.getElementById("family_income").value = student.family_income
  if (student.government_aid) {
    document.getElementById("government_aid").checked = true
  } else {
    document.getElementById("government_aid").checked = false
  }
  document.getElementById("family_members").value = student.family_members

})()

if (sessionStorage.getItem('admin') !== 'true') {
  document.querySelector('#editar').style.display = 'none'
}

 var contador=1;


document.querySelector('#editar-botao').addEventListener('click', e => {
  if(contador==1){
    
    document.querySelector('#editar-botao').addEventListener('click', e => {
    e.preventDefault
    window.location.reload() 
  })};

  contador++
  

  e.preventDefault
  document.querySelectorAll('input').forEach(element => {
    element.disabled = false
    
  });
  document.querySelectorAll('select').forEach(element => {
    element.disabled = false

  })

  const cancelar = document.createElement('a')
  cancelar.id = "descartar"
  cancelar.style.cursor = "pointer"
  cancelar.innerHTML = `<img src="../assets/cancelar-cadastro.png" alt="cancelar edições">`

  const salvar = document.createElement('a')
  salvar.id = "salvar"
  salvar.style.cursor = "pointer"
  salvar.innerHTML = `<img src="../assets/salvar-cadastro.png " alt="salvar alterações">`

  const editArea = document.querySelector('#excluir-confirmar')
  if (editArea.childElementCount === 0) {
    editArea.appendChild(cancelar)
    editArea.appendChild(salvar)
  }
  cancelar.addEventListener('click', e => {
    e.preventDefault
    window.location.reload()
  })

  salvar.addEventListener('click', async e => {
    const student = {
      name: document.querySelector('#name').value,
      birthdate: document.querySelector('#birthdate').value.split('-').reverse().join('/'),
      city_of_birth: document.querySelector('#city_of_birth').value,
      schooling: document.querySelector('#schooling').value,
      marital_status: document.querySelector('#marital_status').value,
      income: document.querySelector('#income').value,
      family_income: document.querySelector('#family_income').value,
      family_members: document.querySelector('#family_members').value,
      government_aid: document.querySelector('#government_aid').checked,
      family_members_with_disability: document.querySelector('#family_members_with_disability').checked,
      jedi: document.querySelector('#jedi-checkbox').checked,
      documents: {
        cpf: document.querySelector('#cpf').value,
        rg: document.querySelector('#rg').value
      },
      address: {
        cep: document.querySelector('#cep').value || '',
        street: document.querySelector('#street').value,
        number: document.querySelector('#number').value,
        complement: document.querySelector('#complement').value || ''
      },
      contacts: {
        phone: document.querySelector('#phone').value,
        email: document.querySelector('#email').value
      }
    }
    if (await isMinor(student.birthdate)) {
      student.parent = {
        name: document.querySelector('#parentName').value,
        cpf: document.querySelector('#parentCpf').value,
        phone: document.querySelector('#parentPhone').value,
        relationship: document.querySelector('#relationship').value
      }
    }
    try {
      let response = await fetch(`https://impact-app.herokuapp.com/student/updateStudents/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'authorization': 'Bearer' + ' ' + sessionStorage.getItem('token')
        },
        body: JSON.stringify(student)
      })
      let retJson = await response.json()
      if (response.status === 200) {
        document.querySelector('#output').innerText = retJson.message
        output.style.color = 'green'
        document.querySelectorAll('input').forEach(element => {
          element.disabled = true
        });
        document.querySelectorAll('select').forEach(element => {
          element.disabled = true
        })
        editArea.innerHTML = ''
      } else {
        document.querySelector('#output').innerText = retJson.error
        output.style.color = 'red'
      }
    } catch (error) {
      document.querySelector('#output').innerText = error.message
      output.style.color = 'red'
    }


  })


})








