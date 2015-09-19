//var debug = 0;
$(function()
{
	var dimensiones = 4;
	var IMG_MAXIMO = 8; //Variable es tipo constante...
	//var tagImagen = "cat";
	var imgJuego = []; //Array vacío, las imágenes...
	var numImagenes = 2;
	var posAdivina = [];
	 //Detectar si se está mostrando una imagen, 
	 //Para evitar el usuario presione la celda...
	var mostrando = false;
	//Limpiar el intervalo de tiempo con el que se muestra una imagen/s
	var tiempoMuestra = 0;
	var tiempoVeImagen = 5; //cinco segundos...

	var descubreImagen = [{fila : 0, columna : 0, img : ""}, {fila : 0, columna : 0, img : ""}];
	var contDescubre = 0;
	var tiempo = 0; //Para saber si el tiempo se ha inicializado...
	var cuentaTiempo = 0;
	var numParejas = 0;

	//Traer las imágenes que se ubicarán...
	//Es una función autoejecutable...
	//Se declara, sino también se invoca  a si misma...
	var imagenes = (function(tags)
	{
		var tags = ["saltar", "pez", "llama", "lemur", "biplano"];
		//var tags = ["dog"];
		$.getJSON("https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
	    {
	        tags: tags[Math.floor(Math.random() * tags.length)], 
	        format: "json"
	    },
	    function(data)
	    {
	        //debug = data;	        
	        $.each(data.items, function(i , item)
	        {
	            //console.log(i, item.media.m);
	            imgJuego.push(item.media.m);
	            if(i >= IMG_MAXIMO - 1)
	            {
	            	preload(imgJuego);
	            	return false;
	            }
	        });
	    });
	})();

	function preload(arrayOfImages)
	{
    	$(arrayOfImages).each(function()
    	{
        	$('<img/>')[0].src = this;
    	});
    	crearEscenario();
	}

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

	function numeroImagen(fila, columna)
	{
		var indice = 0;
		for(var i = 0; i < posAdivina.length; i++)
		{
			if(posAdivina[i].fila === fila && posAdivina[i].columna === columna)
			{
				indice = i;
				break;
			}
		}
		return indice;
	}

	var clickCelda = function()
	{
		for(var i = 0; i < dimensiones; i++)
		{
			for(var c = 0; c < dimensiones; c++)
			{
				$("#" + i + "_" + c).click(function(event)
				{
					var ind = this.id.split("_");
					var posicion = numeroImagen(Number(ind[0]), Number(ind[1]));
					if(!posAdivina[posicion].encontrar)
					{
						if(tiempo === 0)
						{
							tiempo = setInterval(function(){
								cuentaTiempo++;
								$("#tiempo").html("Tiempo: " + cuentaTiempo);
							}, 1000);
						}
						$("#img_" + ind[0] + "_" + ind[1]).show('fast');
						//Es para guaradar la posición de las imágenes...
						//console.log(contDescubre);
						descubreImagen[contDescubre].fila = Number(ind[0]);
						descubreImagen[contDescubre].columna = Number(ind[1]);
						var img = posAdivina[posicion].img.split("/");
						descubreImagen[contDescubre].img = img[img.length - 1];
						descubreImagen[contDescubre].pos = posicion;
						contDescubre++;
						if(contDescubre === 2)
						{
							if(descubreImagen[0].img === descubreImagen[1].img)
							{
								posAdivina[descubreImagen[0].pos].encontrar = posAdivina[descubreImagen[1].pos].encontrar = true;
								numParejas++;
								if(numParejas === IMG_MAXIMO)
								{
									alert("Terminó el Juego, lo lograte en : "+cuentaTiempo+" segundos :)");
									clearInterval(tiempo);
									location.reload();
								}
							}
							else
							{
								$("#img_" + descubreImagen[0].fila + "_" + descubreImagen[0].columna).delay(1000).hide('fast');
								$("#img_" + descubreImagen[1].fila + "_" + descubreImagen[1].columna).delay(1000).hide('fast');
							}
							contDescubre = 0;
						}
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
					posAdivina[i].descubierto = true;
					$("#img_" + posAdivina[i].fila + "_" + posAdivina[i].columna).show('slow', revisaCorrectas);
				}
				existe = true;
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
		var ocupado = false;
		for(var i = 0; i < imgJuego.length; i++)
		{
			for(var veces = 1; veces <= 2; veces++)
			{
				do
				{
					ocupado = false;
					fila = Math.floor(Math.random() * dimensiones);
					columna = Math.floor(Math.random() * dimensiones);
					for(var c = 0; c < posAdivina.length; c++)
					{
						if(posAdivina[c].fila === fila && posAdivina[c].columna === columna)
						{
							ocupado = true;
							break;
						}
					}
					if(!ocupado)
					{
						break;
					}
				}while(1);
				posAdivina.push({
									fila 		: fila, 
									columna 	: columna, 
									img 		: imgJuego[i],
									encontrar 	: false
								});

			}
		}

		for(i = 0; i < posAdivina.length; i++)
		{
			$("#" + posAdivina[i].fila + "_" + posAdivina[i].columna).html("<img src = '" + posAdivina[i].img + "' class = 'imgAdivina' id = 'img_"+(posAdivina[i].fila)+"_"+(posAdivina[i].columna)+"'/>");
		}
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