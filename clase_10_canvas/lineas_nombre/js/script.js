window.onload = function()
{
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext('2d');


    var puntosValor = [[30, 30, 300, 30],
                       [175, 30, 175, 250],
                       [30, 250, 180, 250]];

    var puntosnombre = function(puntos)
    {
        context.beginPath();
        context.moveTo(puntos[0], puntos[1]);
        context.lineTo(puntos[2], puntos[3]);
        context.lineWidth = 10;
        context.strokeStyle = randomColor();
        context.stroke();
    };

    for(var i = 0; i < puntosValor.length; i++)
    {
        puntosnombre(puntosValor[i]);
    }
    function randomColor()
	{
    	// from http://www.paulirish.com/2009/random-hex-color-code-snippets/
    	return '#'+(function lol(m,s,c){return s[m.floor(m.random() * s.length)] +
    	(c && lol(m,s,c-1));})(Math,'0123456789ABCDEF',4);
  	};

};
