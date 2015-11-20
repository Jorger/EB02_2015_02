$(function()
{
    var canvas = $('#canvas');
    var w = canvas[0].width;
	var h = canvas[0].height;
    var ctx = canvas[0].getContext('2d');
    var palabrasBuscar = ["Desarrollo", "Canvas", "WebGL", "Html", "ThreeJS", "CSS", "websockets", "Javascript"];
    var numPalabra = 0; //Guarda el valor aletorio de la palabra que se buscará...

    var teclado = [];
    //Para mostrar el teclado en pantalla...
    (function()
    {
        var letra = 0;
        for(var i = 1; i <= 26; i++)
        {
            letra = i + 64;
            teclado.push({
                            letra   :   String.fromCharCode(letra).toLowerCase(),
                            ocupado :   false
                        });
            $("#opciones").append("<div class = 'divLetra noSelecciona' id = 'opc_"+(i)+"'>"+(String.fromCharCode(letra))+"</div>");
            $("#opc_" + i).click(function(event)
            {
                var indLetra = Number(this.id.split("_")[1]) - 1;
                if(!teclado[indLetra].ocupado)
                {
                    //Para que la letra se indique que ha sido utilizado...
                    $(this).removeClass('noSelecciona').addClass('selecciona');
                    teclado[indLetra].ocupado = true;
                    buscarLetraPalabra(teclado[indLetra].letra);
                }
            });
        }
    })();

    //Para poner una palabra que el usuario deberá buscar...
    var ubicaPalabra = (function()
    {
        numPalabra = Math.floor(Math.random() * palabrasBuscar.length);
        for(i = 1; i <= palabrasBuscar[numPalabra].length; i++)
		{
			$("#adivina").append("<div class = 'divLetra baseLetra' id = 'pal_"+(i)+"'>&nbsp;</div>");
        }
    })();

    var dibujaPersonaje = (function dibujaPersonaje(limite)
    {
        /*
        limite recibe un valor que indica hasta que punto se dibuja el ahorcado...
        Por ejmplo si limite = 2; Se dibujará la cabeza y el torso del personaje
        limite máximo llegará hasta 06, lo que significa que si el usuario s eha equivocado 06 veces, ha perdido...
        */

        ctx.clearRect(0,0,w,h);
        //Para dibujar el escenario...
        //Horizaontal Base...
        ctx.beginPath();
		ctx.moveTo(10, h - 40);
		ctx.lineTo(w - 20, h - 40);
        ctx.lineWidth = 4;
		ctx.strokeStyle = 'blue';
		ctx.stroke();
        //Vertical...
        ctx.beginPath();
		ctx.moveTo(50, h - 40);
        ctx.lineTo(50, 20);
        ctx.lineTo(160, 20);
        ctx.lineTo(160, 50);
        ctx.lineWidth = 4;
		ctx.strokeStyle = 'blue';
		ctx.stroke();
        if(limite >= 1)
        {
            //Para la cabeza...
            ctx.beginPath();
            ctx.strokeStyle = 'red';
    	    ctx.arc(160, 80, 30, 0, Math.PI * 2, false);
    	    ctx.closePath();
    	    //ctx.fill();
    	    ctx.stroke();
            //Los ojos..
            ctx.beginPath();
    	    ctx.arc(150, 70, 1, 0, Math.PI * 2, false);
    	    ctx.closePath();
    	    ctx.fill();
    	    ctx.stroke();
            ctx.beginPath();
    	    ctx.arc(170, 70, 1, 0, Math.PI * 2, false);
    	    ctx.closePath();
    	    ctx.fill();
    	    ctx.stroke();
            //Para la boca..
            ctx.beginPath();
    		ctx.moveTo(150, 90);
    		ctx.lineTo(170, 90);
    		ctx.stroke();
        }
        if(limite >= 2)
        {
            //Para el tronco...
            ctx.beginPath();
    		ctx.moveTo(160, 110);
    		ctx.lineTo(160, 250);
    		ctx.stroke();
        }

        if(limite >= 3)
        {
            //Para el brazo izquierdo...
            ctx.beginPath();
    		ctx.moveTo(160, 160);
    		ctx.lineTo(100, 120);
    		ctx.stroke();
        }

        if(limite >= 4)
        {
            //Para el brazo derecho...
            ctx.beginPath();
    		ctx.moveTo(160, 160);
    		ctx.lineTo(220, 120);
    		ctx.stroke();
        }

        if(limite >= 5)
        {
            //Para la pierna Izquierda...
            ctx.beginPath();
    		ctx.moveTo(160, 250);
    		ctx.lineTo(100, 290);
    		ctx.stroke();
        }

        if(limite >= 6)
        {
            //Para la pierna derecha...
            ctx.beginPath();
            ctx.moveTo(160, 250);
            ctx.lineTo(220, 290);
            ctx.stroke();
        }

        return dibujaPersonaje;
    })(0);

    var buscarLetraPalabra = function(letra)
    {
        /*
        TODO:
        Completar función que busque si la letra enviada se encuentra en la palabra a buscar,
        si es así se deberá mostrar en el escenario, si no se deberá mostrar la acción en el canvas
        para el ahorcado..

        El valor de la letra que llega  a la función es en minúscula,
        por lo que la comparación se deberá hacer de esta forma...
        _______________________________________________________________________________________________

        Si el usuario se ha equivocado 6 veces, que es la animación máxima se deberá indiar que ha perdido,
        por lo tanto se deberá crear una varible global que contenga este valor,
        _______________________________________________________________________________________________

        Por el contrario si el usuario acertó deberá tener una varaible global que cuente
        el número de aciertos:
            Ejemplo: la palabra CSS, el usuario selecionó la letra S,
            por lo tanto la variable de acer deberá equivaler a 2
        _______________________________________________________________________________________________
        Al final se deberá comprobar si la variable de aciertos es igual a la cantidad
        de letras que conforma la palabra a buscar...
        _______________________________________________________________________________________________

        Los mensajes de perdió y acertó, pueden ser mostrados a través de la librería
        sweet-alert, que ya se encuentra asociada en el proyecto o haciendo uso de un
        alert(), para reiniciar el juego puede hacerse uso de la función location.reload();
        */
        console.log(letra);
    };
});
