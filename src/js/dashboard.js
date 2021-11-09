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
  document.querySelector('#jedi').addEventListener('click', ()=>{
    students.map(student=>{
      return student.jedi==true
    })
    console.log(students);
  })
  students.forEach(student => {
    const cell = document.createElement('tr')
    cell.innerHTML = `
    <td><a id="${students.student_id}" href="FormPreenchido.html?${student.student_id}"><img src="../assets/edit.png" alt="Editar Cadastro"></a></td>
    <td><a id="${students.student_id}" href="FormPreenchido.html?${student.student_id}">${student.name}</a></td>
    <td>${student.birthdate}</td>
    <td>${student.contacts.phone}</td>`

    document.querySelector('tbody').appendChild(cell)
  })
})()





