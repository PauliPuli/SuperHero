$(document).ready(function () {
  let btn = $(".btn-sh");
  let form = $("#form");

  form.on("submit", function (e) {
    let num = parseInt($("#numerohero").val());

    e.preventDefault();
    $('#ficha').html("");
    $('num').html("");
    validar(num);

  });

  function validar(num) {
    let okNum = /^[0-9]+$/;
    let errorNum = $(".error");
    if (okNum.test(num)) {
      console.log(num);
      errorNum.append(`<p>Caracteres aceptados</p>`);
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
let tarjeta= `
<div class="card p-0">
<div class="row g-0">
  <div class="col-sm-12 col-md-4">
    <img src="${data.image.url}" class="img-fluid rounded-start" alt="...">
  </div>
  <div class="col-md-8">
    <div class="card-body">
      <h5 class="card-title bg-danger text-bg-dark p-2 ps-4"> <span class="nombre">${data.name}</span></h5>
      <p class="card-text">Conexiones: ${data.connections['group-affiliation']}</p>
      <p class="card-text"><small class="text-body-secondary">Publicado por: ${data.biography.publisher}</small></p>

      <ul class="list-group list-group-flush ps-0">
        <li class="list-group-item ps-0 fs-italic"><span class="fst-italic fw-medium">Ocupación: </span>${data.work.occupation}</li>
        <li class="list-group-item ps-0"><span class="fst-italic fw-medium">Primera aparición: </span>${data.biography.publisher}</li>
        <li class="list-group-item ps-0"><span class="fst-italic fw-medium">Altura: </span>${data.appearance.height.join(" - ")}</li>
        <li class="list-group-item ps-0"><span class="fst-italic fw-medium">Peso: </span>${data.appearance.weight.join(" - ")}</li>
        <li class="list-group-item ps-0"><span class="fst-italic fw-medium">Alianzas: </span>${data.biography.aliases}</li>
      </ul>
    </div>
  </div>
</div>
</div>
`
        $('#ficha').append(tarjeta) 

    },
    error: function(error) {
        alert ('Número sin héroe existente')
    }
});

//canvasjs
window.onload = function() {

    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        title: {
            text: "Desktop Search Engine Market Share - 2016"
        },
        data: [{
            type: "pie",
            startAngle: 240,
            yValueFormatString: "##0.00\"%\"",
            indexLabel: "{label} {y}",
            dataPoints: [
                {y: 79.45, label: "Google"},
                {y: 7.31, label: "Bing"},
                {y: 7.06, label: "Baidu"},
                {y: 4.91, label: "Yahoo"},
                {y: 1.26, label: "Others"}
            ]
        }]
    });
    chart.render();
    
    }
  }


});
