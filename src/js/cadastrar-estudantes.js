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

