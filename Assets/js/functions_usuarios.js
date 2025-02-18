var tableUsuarios;
document.addEventListener('DOMContentLoaded', function(){


    tableUsuarios = $('#tableUsuarios').dataTable( {
        "aProcessing":true,
        "aServerSide":true,
        "language": {
            "url": "//cdn.datatables.net/plug-ins/1.10.20/i18n/Spanish.json"
        },
        "ajax":{
            "url": " "+base_url+"/Usuarios/getUsuarios",
            "dataSrc":""
        },
        "columns":[
        {"data":"idpersona"},
        {"data":"nombres"},
        {"data":"appat"},
        {"data":"apmat"},
        {"data":"telefono"},
        {"data":"email_user"},
        {"data":"nombrerol"},
        {"data":"status"},
        {"data":"options"}
        ],
             'dom': 'lBfrtip',
        'buttons': [
            {
                "extend": "copyHtml5",
                "text": "<i class='fa fa-files-o' aria-hidden='true'></i> Copiar",
                "titleAttr":"Copiar",
                "className": "btn btn-secondary"
            },{
                "extend": "excelHtml5",
                "text": "<i class='fa fa-file-excel-o' aria-hidden='true'></i> Excel",
                "titleAttr":"Esportar a Excel",
                "className": "btn btn-success"
            },{
                "extend": "pdfHtml5",
                "text": "<i class='fa fa-file-pdf-o' aria-hidden='true'></i> PDF",
                "titleAttr":"Esportar a PDF",
                "className": "btn btn-danger"
            }
        ],
        "resonsieve":"true",
        "bDestroy": true,
        "iDisplayLength": 10,
        "order":[[0,"desc"]]  
    });



    var formUsuario = document.querySelector("#formUsuario");
    formUsuario.onsubmit = function(e) {
        e.preventDefault();
        var strIdentificacion = document.querySelector('#txtIdentificacion').value;
        var strNombre = document.querySelector('#txtNombre').value;
        var strApellidoma = document.querySelector('#txtApellidoMat').value;
        var strApellidopa = document.querySelector('#txtApellidoPat').value;
        var strEmail = document.querySelector('#txtEmail').value;
        var intTelefono = document.querySelector('#txtTelefono').value;
        var intTipousuario = document.querySelector('#listRolid').value;
        var strPassword = document.querySelector('#txtPassword').value;



        if(strIdentificacion == '' || strNombre == '' ||strApellidoma == '' ||strApellidopa == '' || strEmail == '' || intTelefono == '' || intTipousuario == '')
        {
            swal("Atención", "Todos los campos son obligatorios." , "error");
            return false;
            
        }
            let elementsValid = document.getElementsByClassName("valid");
        for (let i = 0; i < elementsValid.length; i++) { 
            if(elementsValid[i].classList.contains('is-invalid')) { 
                swal("Atención", "Por favor verifique los campos en rojo." , "error");
                return false;
            } 
        } 

        var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        var ajaxUrl = base_url+'/Usuarios/setUsuario'; 
        var formData = new FormData(formUsuario);
        request.open("POST",ajaxUrl,true);
        request.send(formData);
        request.onreadystatechange = function(){
            if(request.readyState == 4 && request.status == 200){
                var objData = JSON.parse(request.responseText);
                if(objData.status)
                {
                    $('#modalFormUsuario').modal("hide");
                    formUsuario.reset();
                    swal("Usuarios", objData.msg ,"success");
                    tableUsuarios.api().ajax.reload(function(){
                       // fntRolesUsuario();
                           /* fntViewUsuario();
                            fntEditUsuario();
                             fntDelUsuario(); */

                    });
                }else{
                    swal("Error", objData.msg , "error");
                }
            }
        }

    }


}, false);


window.addEventListener('load', function() {
    fntRolesUsuario();
   /* fntViewUsuario();
    fntEditUsuario();
     fntDelUsuario(); */
}, false);


function fntRolesUsuario(){
    var ajaxUrl = base_url+'/Roles/getSelectRoles';
    var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    request.open("GET",ajaxUrl,true);
    request.send();

        request.onreadystatechange = function(){// para la parte de tipo de usuario  y el status
            if(request.readyState == 4 && request.status == 200){
                document.querySelector('#listRolid').innerHTML = request.responseText;
                $('#listRolid').selectpicker('render');
            }
        }
    }

    function fntViewUsuario(idpersona){
        

                var idpersona = idpersona;
                var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
                var ajaxUrl = base_url+'/Usuarios/getUsuario/'+idpersona;
                request.open("GET",ajaxUrl,true);
                request.send();
      //$('#modalViewUser').modal('show');
      request.onreadystatechange = function(){
        if(request.readyState == 4 && request.status == 200){
            var objData = JSON.parse(request.responseText);

            if(objData.status)
            {
               var estadoUsuario = objData.data.status == 1 ? 
               '<span class="badge badge-success">Activo</span>' : 
               '<span class="badge badge-danger">Inactivo</span>';

               document.querySelector("#celIdentificacion").innerHTML = objData.data.indentificacion;
               document.querySelector("#celNombre").innerHTML = objData.data.nombres;
               document.querySelector("#celApellidoPat").innerHTML = objData.data.appat;
               document.querySelector("#celApellidoMat").innerHTML = objData.data.apmat;
               document.querySelector("#celTelefono").innerHTML = objData.data.telefono;
               document.querySelector("#celEmail").innerHTML = objData.data.email_user;
               document.querySelector("#celTipoUsuario").innerHTML = objData.data.nombrerol;
               document.querySelector("#celEstado").innerHTML = estadoUsuario;
               document.querySelector("#celFechaRegistro").innerHTML = objData.data.fechaRegistro; 
               document.querySelector("#celDireccion").innerHTML = objData.data.direccion;
               $('#modalViewUser').modal('show');
           }else{
            swal("Error", objData.msg , "error");
        }
    }
}

    }

    function fntEditUsuario(idpersona){


             document.querySelector('#titleModal').innerHTML ="Actualizar Usuario";
             document.querySelector('.modal-header').classList.replace("headerRegister", "headerUpdate");
             document.querySelector('#btnActionForm').classList.replace("btn-primary", "btn-info");
             document.querySelector('#btnText').innerHTML ="Actualizar";

             var idpersona = idpersona;
             var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
             var ajaxUrl = base_url+'/Usuarios/getUsuario/'+idpersona;
             request.open("GET",ajaxUrl,true);
             request.send();
      //$('#modalViewUser').modal('show');
      request.onreadystatechange = function(){
     //   $('#modalFormUsuario').modal('show')
     if(request.readyState == 4 && request.status == 200){

       var objData = JSON.parse(request.responseText);

       if(objData.status){
        document.querySelector("#idUsuario").value = objData.data.idpersona;
        document.querySelector("#txtIdentificacion").value = objData.data.indentificacion;
        document.querySelector("#txtNombre").value = objData.data.nombres;
        document.querySelector("#txtApellidoPat").value = objData.data.appat;
        document.querySelector("#txtApellidoMat").value = objData.data.apmat;
        document.querySelector("#txtTelefono").value = objData.data.telefono;
        document.querySelector("#txtEmail").value = objData.data.email_user;
        document.querySelector("#listRolid").value =objData.data.idrol;
        $('#listRolid').selectpicker('render');

        if(objData.data.status == 1){
            document.querySelector("#listStatus").value = 1;
        }else{
            document.querySelector("#listStatus").value = 2;
        }
        $('#listStatus').selectpicker('render');
    }

}
$('#modalFormUsuario').modal('show');
}


    }


    function fntDelUsuario(idpersona){


                var idUsuario =idpersona;
                swal({
                    title: "Eliminar Usuario",
                    text: "¿Realmente quiere eliminar el Usuario?",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Si, eliminar!",
                    cancelButtonText: "No, cancelar!",
                    closeOnConfirm: false,
                    closeOnCancel: true
                }, function(isConfirm) {

                    if (isConfirm) 
                    {
                        var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
                        var ajaxUrl = base_url+'/Usuarios/delUsuario/';
                        var strData = "idUsuario="+idUsuario;
                        request.open("POST",ajaxUrl,true);
                        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                        request.send(strData);
                        request.onreadystatechange = function(){
                            if(request.readyState == 4 && request.status == 200){
                                var objData = JSON.parse(request.responseText);
                                if(objData.status)
                                {
                                    swal("Eliminar!", objData.msg , "success");
                                 tableUsuarios.api().ajax.reload(function(){
                            

                                    });
                                }else{
                                    swal("Atención!", objData.msg , "error");
                                }
                            }
                        }
                    }

                });


    }

    function openModal()
    {
        document.querySelector('#idUsuario').value ="";
        document.querySelector('.modal-header').classList.replace("headerUpdate", "headerRegister");
        document.querySelector('#btnActionForm').classList.replace("btn-info", "btn-primary");
        document.querySelector('#btnText').innerHTML ="Guardar";
        document.querySelector('#titleModal').innerHTML = "Nuevo Usuario";
        document.querySelector("#formUsuario").reset();
        $('#modalFormUsuario').modal('show');
    }