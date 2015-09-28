$(function()
{
    var canvas = $('#canvas');
    var context = canvas[0].getContext('2d');

    context.beginPath();
    context.moveTo(100, 50);
    context.lineTo(100, 300);
    context.lineTo(650, 300);
    context.lineWidth = 3;
    context.strokeStyle = "black";
    context.stroke();
    //Flecha...
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
    context.font = "normal 20px Arial";
    context.fillStyle = "black"
    context.fillText("Amplitud", 60, 30);
    context.font = "normal 20px Arial";
    context.fillStyle = "black"
    context.fillText("Tiempo", 660, 300);
    context.font = "normal 20px Arial";
    context.fillStyle = "black"
    context.fillText("0", 80, 320);
});
