let datosXY=[];
for(let key in data.powerstate){
    datosXY.push({label: key, y: parseInt(data.powerstats[key])})
}
console.log(datosXY);

let chart = {
	theme: "light2",
	animationEnabled: true,
	title: {
		text: `<span class="text-success p-2 ps-4">Estadísticas de poder para ${data.name}</span>`
	},
	subtitles: [{
		text: "Habilidades y superpoderes",
		fontSize: 16
	}],
	data: [{
		type: "pie",
		indexLabelFontSize: 18,
		radius: 80,
		indexLabel: "{label} - {y}",
		yValueFormatString: "###0.0\"%\"",
		click: explodePie,
		dataPoints: datosXY,
	}]
};
$('#chartContainer').CanvasJSChart(chart);

function explodePie(e) {
	for(var i = 0; i < e.dataSeries.dataPoints.length; i++) {
		if(i !== e.dataPointIndex)
			e.dataSeries.dataPoints[i].exploded = false;
	}
}

<!DOCTYPE HTML>
<html>
<head>
<script>
window.onload = function() {



}
</script>
</head>
<body>
<div id="chartContainer" style="height: 370px; width: 100%;"></div>
<script src="https://cdn.canvasjs.com/canvasjs.min.js"></script>
</body>
</html>


let datosApi= data.powerstats;
let options = {
	theme: "light2",
	animationEnabled: true,
	title: {
		text: `<span class="text-success p-2 ps-4">Estadísticas de poder para ${data.name}</span>`
	},
	subtitles: [{
		text: "Habilidades y superpoderes",
		fontSize: 16
	}],
	data: [{
		type: "pie",
		indexLabelFontSize: 18,
		radius: 80,
		indexLabel: "{label} - {y}",
		yValueFormatString: "###0.0\"%\"",
		click: explodePie,
		dataPoints: datosXY,
	}]
};
for(var i = 0; i < datosApi.length; i++) {
  dataPoints.push({
    label: key, y: parseInt(data.powerstats[key])
  })
  $("#chartContainer").CanvasJSChart(options);
    
};
   error: function(error){
    console.log(error);
    alert('No existe un héroe para ese id')
   }