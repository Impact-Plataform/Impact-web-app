
let url = document.URL
let tamanho = url.length
let id = url[tamanho - 1];

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

    console.log(student)
    
    document.getElementById("name").value = student.name
    document.getElementById("birthdate").value = student.birthdate
    document.getElementById("rg").value = student.documents.rg
    document.getElementById("cpf").value = student.documents.cpf
    document.getElementById("city_of_birth").value = student.city_of_birth
    //document.getElementById("schooling").value = student.schooling
    document.getElementById("email").value = student.contacts.email
    document.getElementById("phone").value = student.contacts.phone

    
    document.getElementById("nameRes").value = student.parent.name
    document.getElementById("cpfRes").value = student.parent.cpf
    document.getElementById("relationshinp").value = student.parent.relationshinp
    document.getElementById("phoneRes").value = student.parent.phone

    document.getElementById("cep").value = student.address.cep
    document.getElementById("street").value = student.address.street
    document.getElementById("complement").value = student.address.complement
    document.getElementById("number").value = student.address.number

    document.getElementById("marital_status").value = student.marital_status
    document.getElementById("income").value = student.income
    
    if(student.family_members_with_disability){
        document.getElementById("family_members_with_disability").value = 'Sim'
    }else{
        document.getElementById("family_members_with_disability").value = 'Não'
    }

    document.getElementById("family_income").value = student.family_income
    if(student.government_aid){
        document.getElementById("government_aid").value = 'Sim'
    }else{
        document.getElementById("government_aid").value = 'Não'
    }
    document.getElementById("family_members").value = student.family_members

})()







