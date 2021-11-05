
var x = async function(){

    let ret = await fetch('https://impact-app.herokuapp.com/student/getAllStudents', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'authorization': 'Bearer' + ' ' + sessionStorage.getItem('token')
    }
  })

  return ret

}

