$(document).ready(function () {
  let btn = $(".btn-sh");
  let form = $("#form");

  form.on("submit", function (e) {
    let num = parseInt($("#numerohero").val());

    e.preventDefault();
    $("#ficha").html("");
    $("#numerohero").val("");
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

      success: function (data) {
        console.log(data); //si todo sale bien, se agrega la funcionalidad aquí.
        let tarjeta = `
<div class="card p-0">
<div class="row g-0">
  <div class="col-sm-12 col-md-4">
    <img src="${data.image.url}" class="img-fluid rounded-start" alt="...">
  </div>
  <div class="col-md-8">
    <div class="card-body">
      <h5 class="card-title bg-danger text-bg-dark p-2 ps-4"> <span class="nombre">${
        data.name
      }</span></h5>
      <p class="card-text">Conexiones: ${
        data.connections["group-affiliation"]
      }</p>
      <p class="card-text"><small class="text-body-secondary">Publicado por: ${
        data.biography.publisher
      }</small></p>

      <ul class="list-group list-group-flush ps-0">
        <li class="list-group-item ps-0 fs-italic"><span class="fst-italic fw-medium">Ocupación: </span>${
          data.work.occupation
        }</li>
        <li class="list-group-item ps-0"><span class="fst-italic fw-medium">Primera aparición: </span>${
          data.biography.publisher
        }</li>
        <li class="list-group-item ps-0"><span class="fst-italic fw-medium">Altura: </span>${data.appearance.height.join(
          " - "
        )}</li>
        <li class="list-group-item ps-0"><span class="fst-italic fw-medium">Peso: </span>${data.appearance.weight.join(
          " - "
        )}</li>
        <li class="list-group-item ps-0"><span class="fst-italic fw-medium">Alias: </span>${
          data.biography.aliases
        }</li>
      </ul>
    </div>
  </div>
</div>
</div>
`;
        $("#ficha").append(tarjeta);

        //canvasjs
        let datosXY = [];
        for (let key in data.powerstats) {
            datosXY.push({ label: key, y: parseInt(data.powerstats[key]) });
        }
        CanvasJS.addColorSet("supercolors",
        [//colorSet Array

        "#F2B705",
        "#9304C3",
        "#FA66CB",
        "#00AEEF",
        "#CBFC05",
        "#84F1C6",                
        ]);

        let chart = new CanvasJS.Chart("chartContainer", {
            theme: "dark2",
            colorSet:"supercolors",
            animationEnabled: true,
            backgroundColor: "#3E3C73",
            padding: 2,
            title: {
                text: `Estadísticas de poder para ${data.name}`
            },
            subtitles: [{
                text: "Habilidades y superpoderes",
                fontSize: 16
            }],
            data: [{
                type: "pie",
                indexLabelFontSize: 18,
                radius: 90,
                indexLabel: "{label} - {y}",
                yValueFormatString: "###0.0\"%\"",
                click: explodePie,
                dataPoints: datosXY,
            }]
        });
    
        chart.render();
    
        function explodePie(e) {
            for (var i = 0; i < e.dataSeries.dataPoints.length; i++) {
                if (i !== e.dataPointIndex)
                    e.dataSeries.dataPoints[i].exploded = false;
            }
        }

      },
      error: function(error){
        console.log(error);
        alert('No existe un héroe para ese id')
       }
    });
  }
});
