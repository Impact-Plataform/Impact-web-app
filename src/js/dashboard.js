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
  console.log(students);
  students.forEach(student => {insertStudent(student)})

  
  
  document.querySelector('#jedi').addEventListener('click', e=>{
    e.preventDefault()
    clearTable()
    document.querySelector('.page-title').innerHTML = 'Jedi'
    let jedis = students.filter(student=>student.jedi==true)
    jedis.forEach(jedi => insertStudent(jedi))
  })
  if(document.URL.split('?')[1] === 'jedi'){
    clearTable()
    document.querySelector('.page-title').innerHTML = 'Jedi'
    let jedis = students.filter(student=>student.jedi==true)
    jedis.forEach(jedi => insertStudent(jedi))
  } 
  document.querySelector('#alunos').addEventListener('click', e=>{
    window.history.pushState({}, document.title, window.location.pathname);
    e.preventDefault()
    clearTable()
    document.querySelector('.page-title').innerHTML = 'Alunos'
    students.forEach(student => insertStudent(student))
  })
})()

function insertStudent(student) {
  const cell = document.createElement('tr')
    cell.innerHTML = `
    <td><a id="${student.student_id}" href="consulta-cadastro.html?${student.student_id}"><img src="../assets/edit.png" alt="Visualizar Cadastro"></a></td>
    <td><a id="${student.student_id}" href="consulta-cadastro.html?${student.student_id}">${student.name}</a></td>
    <td>${student.birthdate}</td>
    <td>${student.contacts.phone}</td>`

    document.querySelector('tbody').appendChild(cell)
}
function clearTable() {
  document.querySelector('tbody').innerHTML = ''
} 





