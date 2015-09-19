$(function()
{
	var preguntas = [];
	var cargarJson = function()
	{
		var txtOpciones = "";
		$.getJSON( "js/preguntas.json", function(data)
		{
			preguntas = data;
			cargarPregunta(0);
		});
	}();

	//Para cargar la pregunta...
	var cargarPregunta = function(numPregunta)
	{
		$("#pregunta").html(preguntas[numPregunta].pregunta);
		//Para cargar las opciones de respuesta...
		for(var i = 1; i <= preguntas[numPregunta].opciones.length; i++)
		{
			$("#opcion_" + i).html(preguntas[numPregunta].opciones[i - 1])
			.click(function(event) {
				var ind = Number(this.id.split("_")[1]);
				console.log(ind);
			});

		}
	};
});
