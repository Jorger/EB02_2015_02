$(function()
{
	//Para generar la ecuación de la respuesta a buscar...
	var respuesta = 0;
	var numCifras = 2;
	var contCorrectas = 0;
	var tiempo = 0;
	var cuentaTiempo = 15;
	var txtEcuacion = "";
	var haRespondido = false;
	//Para generar la ecuación en función del resultado dado...
	var ecuacionAdivina = function()
	{
		var operacion = "";
		if(numCifras >= 2)
		{
			var signoOpera = ["+", "-"];
			do
			{
				operacion = "";
				for(var i = 1; i <= numCifras; i++)
				{
					operacion += Math.floor(Math.random() * 3) + 1;
					if(i < numCifras)
					{
						operacion += " " + signoOpera[Math.floor(Math.random() * 2)] + " ";
					}
				}
				var valor = eval(operacion);
				if(valor === respuesta)
				{
					break;
				}
			}while(1);
		}
		return operacion;
	};

	//Para iniciar un nuevo Juego...
	var nuevoJuego = function()
	{
		haRespondido = false;
		$("#titulo").html("Sumando (" + (contCorrectas <= 9 ? "0" + contCorrectas : contCorrectas) + ")");
		cuentaTiempo = 15;
		if(contCorrectas % 2 === 0 && contCorrectas !== 0)
		{
			numCifras++;
		}
		$("#tiempo").html((cuentaTiempo <= 9 ? "0" + cuentaTiempo : cuentaTiempo) + "'");
		tiempo = setInterval(function(){
			cuentaTiempo--;
			$("#tiempo").html((cuentaTiempo <= 9 ? "0" + cuentaTiempo : cuentaTiempo) + "'");
			if(cuentaTiempo <= 0)
			{
				validaRespuesta(0);
			}
		}, 1000);
		respuesta = Math.floor(Math.random() * 3) + 1;
		txtEcuacion = ecuacionAdivina();
		$("#ecuacion").html(txtEcuacion + " = ?").hide().css({
			"color": 'black'
		}).fadeIn('fast');
	};

	//Para poner las acciones de click sobre los botones de respuesta...
	for(var i = 1; i <= 3; i++)
	{
		$("#respuesta_" + i).click(function(event)
		{
			if(!haRespondido)
			{
				validaRespuesta(Number(this.id.split("_")[1]));
			}
		});
	}

	var validaRespuesta = function(valor)
	{
		haRespondido = true;
		clearInterval(tiempo);
		if(valor === respuesta)
		{
			$("#ecuacion").html(txtEcuacion + " = " + respuesta).css({
				"color": '#73BF43'
			}).delay(1000).fadeOut('fast', function() {
				contCorrectas++;
				nuevoJuego();
			});
		}
		else
		{
			swal(
			{
				title: valor + ", no me digas :)",   
				text: txtEcuacion + " = " + respuesta,
				showCancelButton: false,   
				confirmButtonColor: "#DD6B55",  
				confirmButtonText: "Aceptar", 
				closeOnConfirm: false, 
				imageUrl	: 	"img/reir.gif"
			},
			function()
			{
				swal({title: "Cargando",   text: "Recargando página",   timer: 500,   showConfirmButton: false });
				location.reload();
			});
		}
	};

	//Para el mensaje inicial...
	swal(
	{
		title: "Sumando",   
		text: "Demuéstrame que sabes sumar",
		showCancelButton: false,   
		confirmButtonColor: "#DD6B55",  
		confirmButtonText: "Aceptar", 
		closeOnConfirm: false, 
		imageUrl	: 	"img/icono.png"
	},
	function()
	{
		swal({title: "Cargando",   text: "Cargando Ecuación",  timer: 1, showConfirmButton: false });
		nuevoJuego();
	});
});