function validar (){

    var nome= form.name.value;
    var senha= form.password.value;

    if( nome=== "" || nome.indexOf("@") == -1 ){
        alert("Preencha o campo User com um E-mail valido");
        form.name.focus();
        return false;
    }

    if( senha=== ""){
        alert("Preencha o campo Pasword");
        form.password.focus();
        return false;
    }

};