var listadoPersonas = [];
function persona(datos)
{
	this.id = datos.id;
	this.primernombre = datos.primernombre;
	this.primerapellido = datos.primerapellido;
	this.email = datos.email;
	this.imprime = function()
	{
		return [
					this.id, 
					this.primernombre + " " + this.primerapellido, 
					this.email
				];
	}
}
listadoPersonas.push(new persona(
									{
										id : "1234", 
										primernombre : "Jorge", 
										primerapellido : "Rubiano", 
										email : "jorge@correo.com"
									}

));