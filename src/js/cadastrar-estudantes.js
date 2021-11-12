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
  document.querySelector('#parentsForm')
  if (!await isMinor(birthdate)) {
    document.querySelector('#parentsForm').style.display = 'none'
  } else {
    document.querySelector('#parentsForm').style.display = 'grid'
  }
})

document.querySelector('#cep').addEventListener("blur", async ()=>{
  let search = cep.value.replace("-","")
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
    console.log('Deu Erro: '+ error.message)
  }
})


//validação de cpf//
function _cpf(cpf) {
  cpf = cpf.replace(/[^\d]+/g, '');
  if (cpf == '') return false;
  if (cpf.length != 11 ||
  cpf == "00000000000" ||
  cpf == "11111111111" ||
  cpf == "22222222222" ||
  cpf == "33333333333" ||
  cpf == "44444444444" ||
  cpf == "55555555555" ||
  cpf == "66666666666" ||
  cpf == "77777777777" ||
  cpf == "88888888888" ||
  cpf == "99999999999")
  return false;
  add = 0;
  for (i = 0; i < 9; i++)
  add += parseInt(cpf.charAt(i)) * (10 - i);
  rev = 11 - (add % 11);
  if (rev == 10 || rev == 11)
  rev = 0;
  if (rev != parseInt(cpf.charAt(9)))
  return false;
  add = 0;
  for (i = 0; i < 10; i++)
  add += parseInt(cpf.charAt(i)) * (11 - i);
  rev = 11 - (add % 11);
  if (rev == 10 || rev == 11)
  rev = 0;
  if (rev != parseInt(cpf.charAt(10)))
  return false;
  return true;
  }

  function validarCPF(el){
    if( !_cpf(el.value) ){
    alert("CPF inválido!" + el.value);
    el.value = "";
    }
    }