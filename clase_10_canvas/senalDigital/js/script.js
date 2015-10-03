$(function()
{
    var canvas = $('#canvas');
    var context = canvas[0].getContext('2d');
    var numeroInputs = 5;
    var crearInputsBinario = function()
    {
        var txtInput = "";
        for(var veces = 1; veces <= 2; veces++)
        {
            for(var i = 1; i <= numeroInputs; i++)
            {
                if(veces === 1)
                {
                    txtInput += "<input type = 'number' min = '0' max = '1' value = '0' class = 'campoTexto' id = 'valor_"+(i)+"'>";
                }
                else
                {
                    $("#valor_" + i).change(function(event)
                    {
                        if(Number($(this).val()) !== 0 && Number($(this).val()) !== 1)
                        {
                            $(this).val(0);
                        }
                        graficaSenal();
                    });
                }
            }
            if(veces === 1)
            {
                $("#binario").html(txtInput)
            }
        }
    }();

    var crearPlano = function()
    {
        context.fillStyle = 'rgba(0,0,0,0.01)';
        context.clearRect(0, 0, 760, 350);
        //Horizontal...
        context.beginPath();
        context.setLineDash([5, 8]);
        context.moveTo(100, 200);
        context.lineTo(630, 200);
        context.lineWidth = 1;
        context.strokeStyle = "red";
        context.stroke();
        //Para el vertical...
        for(var i = 1; i < 6; i++)
        {
            context.beginPath();
            context.setLineDash([5, 8]);
            context.moveTo((100 * i) + 100, 100);
            context.lineTo((100 * i) + 100, 330);
            context.lineWidth = 1;
            context.strokeStyle = "gray";
            context.stroke();
        }
        //Fin de poner las divisiones...
        context.beginPath();
        context.setLineDash([1,0]);
        context.moveTo(100, 50);
        context.lineTo(100, 300);
        context.lineTo(650, 300);
        context.lineWidth = 3;
        context.strokeStyle = "black";
        context.stroke();
        //Flecha Voltaje...
        context.beginPath();
        context.moveTo(90, 60);
        context.lineTo(110, 60);
        context.lineTo(100, 50);
        context.lineTo(90, 60);
        context.lineWidth = 1;
        context.strokeStyle = "black";
        context.fillStyle = 'black';
        context.fill();
        context.stroke();
        //Flecha Tiempo...
        context.beginPath();
        context.moveTo(640, 290);
        context.lineTo(650, 300);
        context.lineTo(640, 310);
        context.lineTo(640, 290);
        context.lineWidth = 1;
        context.strokeStyle = "black";
        context.fillStyle = 'black';
        context.fill();
        context.stroke();
        //Los labels de la gráfica...
        //Para el voltaje
        context.font = "normal 20px Arial";
        context.fillStyle = "black";
        context.fillText("Voltaje", 70, 30);
        //Para el tiempo...
        context.fillText("Tiempo", 660, 305);
        //Para el cero...
        context.fillText("0", 80, 300);
        //Para el uno...
        context.fillText("1", 80, 200);
        return crearPlano;
    };

    var graficaSenal = (function graficaSenal()
    {
        //Para crear el Plano...
        crearPlano();
        var valor = 0,
            posicionY = [300, 200];
        context.beginPath();
        for(var i = 1; i <= numeroInputs; i++)
        {
            valor = Number($("#valor_" + i).val());
            if(i === 1)
            {
                context.moveTo(100 * i, posicionY[valor]);
            }
            else
            {
                context.lineTo(100 * i, posicionY[valor]);
            }
            context.lineTo((100 * i) + 100, posicionY[valor]);
            //Poner los labels...
            context.font = "normal 30px Arial";
            context.fillStyle = "red";
            context.fillText(valor, (100 * i) + 50, 180);
        }
        context.lineWidth = 3;
        context.strokeStyle = "blue";
        context.stroke();
        return graficaSenal;
    })();
});
