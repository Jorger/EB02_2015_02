# Clase 10 - Actividad de Recuperación: Adivina el número

La actividad consiste en adivinar un número en un rango dado, el cual parte desde uno (1) hasta un valor [aleatorio].
* Valor Mínimo a adivinar (1)
* Valor máximo a adivinar entre 50 y 200.

##Pistas

La actividad deberá entregar pistas al usuario que le indique si esta cerca o lejos del número:

* Frio.
* Templado.
* Caliente.


![Adivina Número](https://dl.dropboxusercontent.com/u/181689/adivinaNumero.gif) 


##Intentos

Deberá tener un número de intentos máximos para adivinar el número, se propone que pueden ser 20.

Para obtener un número aleatorio en el rango específicado anteriomente se hace uso de la función ```Math.random``` para realizar redondeo de los mismo se hace uso de la función ```Math.floor```

##Ejemplo obtener número aleatorio entre 50 y 200

```javascript
var rangoMaximo = Math.floor((Math.random() * 200) + 50);
```

Se puede ver la aplicación en funcionamiento en el siguiente enlace: http://goo.gl/e2kHsH

##Entrega

La aplicación deberá ser entregada a través de [Google Drive] y el código a través de [GitHub]

### Autor
Jorge Rubaino [@ostjh]
License
----
MIT
[@ostjh]:https://twitter.com/ostjh
[aleatorio]:https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Math/random
[Google Drive]:https://support.google.com/drive/answer/2881970?hl=es
[GitHub]:https://github.com/
