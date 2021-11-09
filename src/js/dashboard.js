(async () => {

  let ret = await fetch('https://impact-app.herokuapp.com/student/getAllStudents', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'authorization': 'Bearer' + ' ' + sessionStorage.getItem('token')
    }
  })

  const retJson = await ret.json()
  const students = retJson.students

  window.sessionStorage.removeItem('student')
  window.sessionStorage.removeItem('student_id')

  students.forEach(student => {
    const cell = document.createElement('tr')
    cell.innerHTML = `
    <td><a id="${students.student_id}" href="FormPreenchido.html?${student.student_id}"><img src="../assets/edit.png" alt="Editar Cadastro"></a></td>
    <td><a id="${students.student_id}" href="FormPreenchido.html?${student.student_id}">${student.name}</a></td>
    <td>${student.birthdate}</td>
    <td>${student.contacts.phone}</td>`

    document.querySelector('tbody').appendChild(cell)
    document.querySelector(`#${students.student_id}`).addEventListener('click', () => {

      window.sessionStorage.setItem('student', student)
      window.sessionStorage.setItem('student_id', student.student_id)

    })
  })
})()




