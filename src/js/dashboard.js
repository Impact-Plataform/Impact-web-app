(async () => {

  let ret = await fetch('https://impact-app.herokuapp.com/student/getAllStudents', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'authorization': 'Bearer' + ' ' + sessionStorage.getItem('token')
    }
  })

  const retJson = await ret.json()
  let students = retJson.students
  students.sort((a, b) => a.name.localeCompare(b.name))
  students.forEach(student => { insertStudent(student) })



  document.querySelector('#jedi').addEventListener('click', e => {
    e.preventDefault()
    clearTable()
    document.querySelector('.page-title').innerHTML = 'Jedi'
    let jedis = students.filter(student => student.jedi == true)
    jedis.forEach(jedi => insertStudent(jedi))
  })
  if (document.URL.split('?')[1] === 'jedi') {
    clearTable()
    document.querySelector('.page-title').innerHTML = 'Jedi'
    let jedis = students.filter(student => student.jedi == true)
    jedis.forEach(jedi => insertStudent(jedi))
  }
  document.querySelector('#alunos').addEventListener('click', e => {
    window.history.pushState({}, document.title, window.location.pathname);
    e.preventDefault()
    clearTable()
    document.querySelector('.page-title').innerHTML = 'Alunos'
    students.forEach(student => insertStudent(student))
  })
})()

function insertStudent(student) {
  const cell = document.createElement('tr')
   var adm=sessionStorage.getItem('admin');

  if(adm=="true"){
      cell.innerHTML = `
        <td><a id="${student.student_id}" href="consulta-cadastro.html?${student.student_id}"><img src="../assets/edit.png" alt="Visualizar Cadastro"></a></td>
        <td><a id="${student.student_id}" href="consulta-cadastro.html?${student.student_id}">${student.name}</a></td>
        <td>${student.birthdate}</td>
        <td>${student.contacts.phone}</td>
        <td><a id="delete-${student.student_id}" onclick="deletar(${student.student_id})" href="#"><img src="../assets/deletar.png" alt="Visualizar Cadastro"></a></td>`
    }
    else{
    cell.innerHTML = `
        <td><a id="${student.student_id}" href="consulta-cadastro.html?${student.student_id}"><img src="../assets/edit.png" alt="Visualizar Cadastro"></a></td>
        <td><a id="${student.student_id}" href="consulta-cadastro.html?${student.student_id}">${student.name}</a></td>
        <td>${student.birthdate}</td>
        <td>${student.contacts.phone}</td>
        `
    }   
   document.querySelector('tbody').appendChild(cell)
  
}
function clearTable() {
  document.querySelector('tbody').innerHTML = ''
}

function deletar(id) {
  if (confirm('Deseja realmente excluir este aluno?')) {
    fetch(`https://impact-app.herokuapp.com/student/deleteStudents/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'authorization': 'Bearer' + ' ' + sessionStorage.getItem('token')
      }
    })
      .then(res => {
        if (res.status === 200) {
          res.json().then(data => {
            alert(data.message)
            window.location.reload()
          })
        }
      })
  }
}



