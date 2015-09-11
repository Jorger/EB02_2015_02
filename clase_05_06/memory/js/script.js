$(function()
{
	var dimensiones = 5;
	var IMG_MAXIMO = 10;
	var tagImagen = "sillas";
	var imgJuego = [];
	var numImagenes = 2;
	var posAdivina = [];
	var mostrando = false;
	var tiempoMuestra = 0;
	var tiempoVeImagen = 5; //cinco segundos...
	//Traer las imágenes que se ubicarán...
	var imagenes = (function(tags)
	{
		$.getJSON("https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
	    {
	        tags: tagImagen, 
	        format: "json"
	    },
	    function(data)
	    {
	        $.each(data.items, function(i , item)
	        {
	            imgJuego.push(item.media.m);
	            if(i >= IMG_MAXIMO - 1)
	            {
	            	crearEscenario();
	            	return false;
	            }
	        });
	    });
	})();

	//Para crear el escenario...
	var crearEscenario = function()
	{
		var txt = "<table id = 'chess_board' cellpadding = '0' cellspacing = '0'>";
		var divTabla = "";
		for(var i = 0; i < dimensiones; i++)
		{
			txt += "<tr>";
			for(var c = 0; c < dimensiones; c++)
			{
				divTabla = i + "_" + c;
				txt += "<td id = '"+(divTabla)+"'></td>";
			}
			txt += "</tr>";
		}
		txt += "</table>";
		$("#escenario").html(txt);
		//Para el clic de la celda...
		clickCelda();
		//debugger;
		imagenAdivina();
	};

	var clickCelda = function()
	{
		for(var i = 0; i < dimensiones; i++)
		{
			for(var c = 0; c < dimensiones; c++)
			{
				$("#" + i + "_" + c).click(function(event)
				{
					if(!mostrando)
					{
						buscarImagen(this.id.split("_"));
					}
				});
			}
		}
	};

	//Para buscar si una imagen está o no en el vector de búsqueda...
	var buscarImagen = function(pos)
	{
		var existe = false;
		for(var i = 0; i < posAdivina.length; i++)
		{
			if(posAdivina[i].fila === Number(pos[0]) && posAdivina[i].columna === Number(pos[1]))
			{
				if(!posAdivina[i].descubierto)
				{
					posAdivina[i].descubierto = existe = true;
					$("#img_" + posAdivina[i].fila + "_" + posAdivina[i].columna).show('fast', revisaCorrectas);
				}
			}
		}

		if(!existe)
		{
			alert("Error, no existe la imagen :(");
			imagenAdivina();
		}
	};

	var revisaCorrectas = function()
	{
		//Buscar si ha encontrado todas las imágenes...
		var numBien = 0;
		for(var i = 0; i < posAdivina.length; i++)
		{
			if(posAdivina[i].descubierto)
			{
				numBien++;
			}
		}
		if(numBien === numImagenes)
		{
			alert("Muy bien continúa jugando :)");
			numImagenes++;
			if(numImagenes > 15)
			{
				if(tiempoVeImagen - 1 !== 0)
				{
					tiempoVeImagen--;
				}
			}
			imagenAdivina();
		}
	};

	//Para mostrar las imágenes que se adivinarán...
	var imagenAdivina = function()
	{
		//Se reinicia la variable...
		mostrando = true;
		limpiarEscenario();
		posAdivina = [];
		var fila = 0;
		var columna = 0;
		var ocupado = false;
		for(var i = 1; i <= numImagenes; i++)
		{
			do
			{
				fila = Math.floor(Math.random() * dimensiones);
				columna = Math.floor(Math.random() * dimensiones);
				ocupado = false;
				//Buscar si la fila y columna ya está en uso...
				if(i !== 1)
				{
					for(var c = 0; c < posAdivina.length; c++)
					{
						if(posAdivina[c].fila === fila && posAdivina[c].columna === columna)
						{
							ocupado = true;
							break;
						}
					}
				}
				if(!ocupado)
				{
					break;
				}
			}while(1);
			//Almacena la posición de la celda...
			posAdivina.push({
								fila 		: fila, 
								columna 	: columna, 
								img 		: Math.floor(Math.random() * IMG_MAXIMO), 
								descubierto : false
							});
		}
		//Poner las imágenes en las posiciones en que se adivinarán...
		for(i = 0; i < posAdivina.length; i++)
		{
			$("#" + posAdivina[i].fila + "_" + posAdivina[i].columna).html("<img src = '" + imgJuego[posAdivina[i].img] + "' class = 'imgAdivina' id = 'img_"+(posAdivina[i].fila)+"_"+(posAdivina[i].columna)+"'/>");
			//bounceIn
			// ocularlo...
		}
		//Para mostrar los elementos...
		$(".imgAdivina").addClass("animated slideInUp");
		tiempoMuestra = setTimeout(function()
		{
			console.log("INGRESA A TIEMPO");
			clearTimeout(tiempoMuestra);
			mostrando = false;	
			$(".imgAdivina").hide();
			//Ocultar los elementos...
		}, tiempoVeImagen * 1000);
	};	

	//Para limpiar la tabla...
	var limpiarEscenario = function()
	{
		for(var i = 0; i < dimensiones; i++)
		{
			for(var c = 0; c < dimensiones; c++)
			{
				$("#" + i + "_" + c).html("");
			}
		}
	};

});