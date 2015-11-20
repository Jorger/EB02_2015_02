EXámen Final - EL ahorcado
=========

## Función ```buscarLetraPalabra()```

Completar función que busque si la letra enviada se encuentra en la palabra a buscar, si es así se deberá mostrar en el escenario, si no se deberá mostrar la acción en el canvas para el ahorcado.

El valor de la letra que llega  a la función es en minúscula, por lo que la comparación se deberá hacer de esta forma.

Si el usuario se ha equivocado **6 veces**, que es la animación máxima se deberá indiar que ha perdido, por lo tanto se deberá crear una varible global que contenga este valor.

Por el contrario si el usuario acertó deberá tener una varaible global que cuente el número de aciertos:
    
Ejemplo: la palabra **CSS**, el usuario selecionó la letra **S**, por lo tanto la variable de aciertos deberá equivaler a **2** 

Al final se deberá comprobar si la variable de aciertos es igual a la cantidad de letras que conforma la palabra a buscar.

Los mensajes de perdió y acertó, pueden ser mostrados a través de la librería **sweet-alert**, que ya se encuentra asociada en el proyecto o haciendo uso de un ```alert()```, para reiniciar el juego puede hacerse uso de la función ```location.reload(); ```


Autor
-----------
Jorge Rubiano

[@ostjh]


License
----

MIT

[@ostjh]:https://twitter.com/ostjh
