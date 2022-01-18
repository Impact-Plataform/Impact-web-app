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

document.querySelector('#birthdate').addEventListener('blur', async () => {
  const birthdate = document.querySelector('#birthdate').value.split('-').reverse().join('/')
  if (!birthdate.length) {
    return
  }
  if (!await isMinor(birthdate)) {
    document.querySelector('#parentsForm').style.display = 'none'
  } else {
    document.querySelector('#parentsForm').style.display = 'grid'
    // document.querySelector('#parentName').required = true;
    // document.querySelector('#parentCpf').required = true;
    // document.querySelector('#parentPhone').required = true;
    // document.querySelector('#relationship').required = true;
  }
})

document.querySelector('#cep').addEventListener("blur", async () => {
  let search = cep.value.replace("-", "")
  const options = {
    method: 'GET',
    mode: 'cors',
    cache: 'default'
  }
  try {
    const response = await fetch(`https://viacep.com.br/ws/${search}/json/`, options)
    const data = await response.json()
    document.querySelector('#street').value = data.logradouro
  } catch (error) {
    console.log('Deu Erro: ' + error.message)
  }
})


document.querySelector('.form').addEventListener('submit', async (e) => {
  e.preventDefault()
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
  if (document.querySelector('#parentsForm').style.display === 'grid') {
    student.parent = {
      name: document.querySelector('#parentName').value,
      cpf: document.querySelector('#parentCpf').value,
      phone: document.querySelector('#parentPhone').value,
      relationship: document.querySelector('#relationship').value
    }
  }

  try {
    let response = await fetch('https://impact-app.herokuapp.com/student/saveStudents', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'authorization': 'Bearer' + ' ' + sessionStorage.getItem('token')
      },
      body: JSON.stringify(student)
    })
    let retJson = await response.json()
    if (response.status === 201) {
      document.querySelector('#output').innerText = retJson.message
      output.style.color = 'green'
      document.querySelector('.form').reset()
    } else {
      document.querySelector('#output').innerText = retJson.error
      output.style.color = 'red'
    }
  } catch (error) {
    document.querySelector('#output').innerText = error.message
    output.style.color = 'red'
  }
})


// //validação de cpf//
// function _cpf(cpf) {
//   cpf = cpf.replace(/[^\d]+/g, '');
//   if (cpf == '') return false;
//   if (cpf.length != 11 ||
//     cpf == "00000000000" ||
//     cpf == "11111111111" ||
//     cpf == "22222222222" ||
//     cpf == "33333333333" ||
//     cpf == "44444444444" ||
//     cpf == "55555555555" ||
//     cpf == "66666666666" ||
//     cpf == "77777777777" ||
//     cpf == "88888888888" ||
//     cpf == "99999999999")
//     return false;
//   add = 0;
//   for (i = 0; i < 9; i++)
//     add += parseInt(cpf.charAt(i)) * (10 - i);
//   rev = 11 - (add % 11);
//   if (rev == 10 || rev == 11)
//     rev = 0;
//   if (rev != parseInt(cpf.charAt(9)))
//     return false;
//   add = 0;
//   for (i = 0; i < 10; i++)
//     add += parseInt(cpf.charAt(i)) * (11 - i);
//   rev = 11 - (add % 11);
//   if (rev == 10 || rev == 11)
//     rev = 0;
//   if (rev != parseInt(cpf.charAt(10)))
//     return false;
//   return true;
// }

// function validarCPF(el) {
//   if (!_cpf(el.value)) {
//     alert("CPF inválido!" + el.value);
//     el.value = "";
//   }
// }
