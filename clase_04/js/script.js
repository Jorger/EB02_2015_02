window.onload = function()
{
	var adivina = [];
	var tabla = "";
	var maximoNumeros = 3;
	nuevoJuego = (function nuevoJuego()
	{
		tabla = "<table width='100%' border='0' cellspacing='0' cellpadding='0'>" + 
					"<tr>" + 
						"<td width='30%'><center>Número</center></td>" + 
						"<td width='20%'><center>Fijas</center></td>" + 
						"<td width='20%'><center>Picas</center></td>" + 
						"<td width='30%'><center>Estado</center></td>" + 
					"</tr>";
		//Para gererar el valor a adivinar...
		adivina = []; //Reinicia la variable...
		var aleatorio = 0;
		var existe = false;
		for(var i = 0; i < maximoNumeros; i++)
		{
			do
			{
				existe = false;
				aleatorio = Math.floor(Math.random() * 10);
				//Buscar si el aleatorio ya está almacenado en el array...
				if(i !== 0)
				{
					for(var c = 0; c < adivina.length; c++)
					{
						if(adivina[c] === aleatorio)
						{
							existe = true;
							break;
						}
					}
				}
				if(!existe)
				{
					break;
				}
			}while(1);
			//Guardar el número...
			adivina[i] = aleatorio;
		}
		nom_div("historial").innerHTML = tabla;
		console.log(adivina);
		return nuevoJuego;
	})();

	nom_div("form").addEventListener('submit', function(event)
	{
		if(nom_div("numero").value.length === maximoNumeros)
		{
			if(!repiteNumero())
			{
				fijasPicas();
			}
			else
			{
				alert("No debe existir números repetidos");
				nom_div("numero").focus();
			}
		}
		else
		{
			alert("El número debe tener "+(maximoNumeros)+" digitos");
			nom_div("numero").focus();
		}
		event.preventDefault();
		return false;
	});

	nom_div("nuevo").addEventListener('click', function(event)
	{
		event.preventDefault();
		nuevoJuego();
	});

	var repiteNumero = function()
	{
		var numero = nom_div("numero").value;
		var repite = false;
		for(var i = 0; i < numero.length; i++)
		{
			for(var c = 0; c < numero.length; c++)
			{
				if(c !== i)
				{
					if(Number(numero.charAt(i)) === Number(numero.charAt(c)))
					{
						repite = true;
						break;
					}
				}
			}
			if(repite)
			{
				break;
			}
		}
		return repite;
	}

	//Para corroborar las fijas y picas que hay o si ha adivinado el número...
	var fijasPicas = function()
	{
		var numero = nom_div("numero").value;
		var contador = {fijas : 0, picas : 0};
		var numeroConsulta = 0;
		for(var i = 0; i < numero.length; i++)
		{
			numeroConsulta = Number(numero.charAt(i)); //El número que se está consultado...
			if(numeroConsulta === adivina[i])
			{
				contador.fijas++;
			}
			else
			{
				for(var c = 0; c < adivina.length; c++)
				{
					if(numeroConsulta === adivina[c])
					{
						contador.picas++;
					}
				}
			}
		}
		tabla += "<tr>" +
					"<td><center><b>"+(numero)+"</b></center></td>" +
					"<td><center>"+(contador.fijas)+"</center></td>" +
					"<td><center>"+(contador.picas)+"</center></td>" +
					"<td><center><b>"+(contador.fijas === maximoNumeros ? "CORRECTO :)" : "INCORRECTO :(")+"</b></center></td>" +
				"</tr>";
		//console.log(contador);
		nom_div("historial").innerHTML = tabla;
		nom_div("numero").value = "";
		nom_div("numero").focus();
	}

	//Imorime en el HTML...
	function nom_div(div)
	{
		return document.getElementById(div);
	}
};