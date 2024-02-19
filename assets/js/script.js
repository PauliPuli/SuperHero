$(document).ready(function () {
  let btn = $(".btn-sh");
  let form = $("#form");

  form.on("submit", function (e) {
    let num = parseInt($("#numerohero").val());

    e.preventDefault();
    validar(num);
    limpiardatos();
  });
function limpiardatos(){
    $('.error').append="";
}
  function validar(num) {
    let okNum = /^[0-9]+$/;
    let errorNum = $(".error");
    if (okNum.test(num)) {
      console.log(num);
      errorNum.append(`Caracteres aceptados`);
    } else {
      alert("Sólo admite caracteres numéricos");
      okNum = false;
    }


    // ajax API
$.ajax({
    dataType: "json",
    method: "GET",
    url: `https://www.superheroapi.com/api.php/10231882289576164/${num}`,

    success: function(data) {
        console.log(data); //si todo sale bien, se agrega la funcionalidad aquí.
let tarjeta= `<p>${data.name}</p>`
        $('#ficha').append(tarjeta) 

    },
    error: function(error) {
        alert ('Número sin héroe existente')
    }
});
  }


});
