function validar (){

    var nome= form.name.value;
    var senha= form.password.value;

    if( nome=== "" || nome.indexOf("@") == -1 ){
        alert("Preencha o campo Username com um E-mail válido");
        form.name.focus();
        return false;
    }

    if( senha=== ""){
        alert("Preencha o campo Password");
        form.password.focus();
        return false;
    }

};