
/*
(async () =>{

    let ret = await fetch('https://impact-app.herokuapp.com/student/getAllStudents', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'authorization': 'Bearer' + ' ' + sessionStorage.getItem('token')
    }
  })
  console.log(ret)
})()

*/

function fazerRequisicao(){

  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", "https://impact-app.herokuapp.com/student/getAllStudents", false);
  xhttp.setRequestHeader("authorization", 'Bearer' + ' ' + sessionStorage.getItem('token'));
  xhttp.send();//A execução do script pára aqui até a requisição retornar do servidor

  console.log(xhttp.responseText)

}

fazerRequisicao()
