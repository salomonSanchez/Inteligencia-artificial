# Inteligencia-artificial
creación de videojuego con inteligencia artificial y patrones de arquitectura.

#install
npm i microkernel-artificial-inteligency

# usar en el index htl
<script src="./node_modules/microkernel-artificial-inteligency/smart.js"></script>

# variables globales a implementar para usar la inteligencia artificial
 - board = Array(3); se debe crear una variable de tipo array de 3
 - turn; una viarible de turno que indicará si juegan las cruces o las bolas en el juego.
- Cross_Sellected_x; indicara la posicion x en la que se encuentra la cruz
- Cross_Sellected_y; indicara la posicion y en la que se encuentra la cruz

- Ball_Sellected_x; indicara la posicion x en la que se encuentra la bola
- Ball_Sellected_y; indicara la posicion x en la que se encuentra la bola

# implementar las funciones de control de la inteligencia artificial
 //verificar fila, se de debe implentar la funcion "CheckRow(x, value)" la cual recibira dos parmetros de control, la x indica la posicion y el valor indica el turno de juego (0 para la maquina, 1 para el humano.).la funcion recorrera la matriz y retornará el numero total de fichas que se encuentren en la fila de la matriz. 

![image](https://user-images.githubusercontent.com/42421550/61026499-1b8b6000-a379-11e9-9b0c-3577daf18f21.png)

//verficar columna, la funcion "CheckColumn(y, value)" recibe de igual forma los mismos parametros de control que al funcion anterior a diferencia de que esta se encrgará de recorrer las columnas para retornar el numero de total de fichas que se encuentren en la columna. 

![image](https://user-images.githubusercontent.com/42421550/61026552-41186980-a379-11e9-9a53-709e7ab7e9a1.png)


//verificacion de diagonales, la funcion "CheckDiag(d, value)" se encrgará de recorrer las diagonalez para retornar el numero de total de fichas que se encuentren en la diagonal. las diagonales estan formadas de la siguiente manera segun la matriz

![image](https://user-images.githubusercontent.com/42421550/61026572-4bd2fe80-a379-11e9-9147-81227c64105e.png)


por lo tanto para poder acceder a dichas posisciones usaremos la formula
 "[(1+d)][0] == value" y "[(1-d)][2] == value", donde "d" recibira valores entre (1 y -1) desde las funciones de inteligencia artificial para poder acceder a todas las diagones. (1+1)[0] = 20 , indicaría la diagonal derecha. etc. 

![image](https://user-images.githubusercontent.com/42421550/61026576-5392a300-a379-11e9-940d-84060c623117.png)


//comprobar si se forma una linea, la funcion CheckLine() es la encragada de verificar si la posicion en la que se encutra una de las fichas de juego forma una sesecion de de tres fichas consecutivas, de ser asi se dice que el juego a terminado.

![image](https://user-images.githubusercontent.com/42421550/61026588-5d1c0b00-a379-11e9-83e3-f4ce104e9ab6.png)


//contador de fichas,  esta funcion debe encargarse de llevar un conteo de las veces en que la ficha se a jugado y retornar ese valor.

![image](https://user-images.githubusercontent.com/42421550/61026603-65744600-a379-11e9-94ff-37e49fcfa843.png)


//identificcador de movimientos diferentes, esta funcion nos sirve para poder identificar que los turnos del juego. si ya se jugó cruces, le pasa el turno a las bolas.


![image](https://user-images.githubusercontent.com/42421550/61026621-70c77180-a379-11e9-87b8-661809942be5.png)


//bloquear una fila o una columna, esta es una las funciones mas importantes para darle vida a la inteligencia artificial, en esta funcion al encontra dos fichas consecusitas del jugador la maquina debe bloquear la tercera casilla para evitar que el juego se termine.

![image](https://user-images.githubusercontent.com/42421550/61026641-7ae97000-a379-11e9-9bc1-fcfad3b4f905.png)

# otras funciones necesarias para iniciar el juego
ClearCell (x, y), funcion que se encrarga de limpiar las posiciones de la mtriz antes de iniciar cada juego. 

function ClearCell (x, y){
	board[x][y] = 0;
	cell = document.getElementById("c" + x + y);
	cell.innerHTML = "";
}

PaintCell (x, y), funcion encargada de asignar la ficha al juego. 

function PaintCell (x, y){
	cell = document.getElementById("c"+ x + y);
	cell.innerHTML = "<img src= ./images/" + turn + ".gif></img>";

	if (turn == "ball"){
		board[x][y] = 1;
		Ball_Sellected_x = x;
		Ball_Sellected_y = y;
	}
	else{
		board[x][y] = 2;
		Cross_Sellected_x = x;
		Cross_Sellected_y = y;
	}

	CheckLine();

	if (turn == "ball") turn = "cross";
	else turn = "ball";

}
