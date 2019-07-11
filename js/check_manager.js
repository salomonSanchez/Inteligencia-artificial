//verificar fila
function CheckRow(x, value){

	count_value = 0;
	for (i=0; i<3; i++){
		if (board[i][x] == value) count_value++;
	}
	return count_value;
	
}

//verficar columna
function CheckColumn(y, value){

	count_value = 0;
	for (i=0; i<3; i++){
		if (board[y][i] == value) count_value++;
	}
	return count_value;
	
}

//verificacion de diagonales
function CheckDiag(d, value){
	/*
	/   \
	00	20
	11	11
	22	02
	*/

	count_value = 0;

	if (board[(1+d)][0] == value) count_value++;
	if (board[1][1] == value) count_value++;
	if (board[(1-d)][2] == value) count_value++;

	return count_value;
}

//comprobar si se forma una linea
function CheckLine(){
	if ( turn == "ball") value = 1;
	else value = 2;
	Line = false;

	if (CheckRow(0, value) == 3) Line = true;
	if (CheckRow(1, value) == 3) Line = true;
	if (CheckRow(2, value) == 3) Line = true;
	if (CheckColumn(0, value) == 3) Line = true;
	if (CheckColumn(1, value) == 3) Line = true;
	if (CheckColumn(2, value) == 3) Line = true;
	if (CheckDiag(1, value) == 3) Line = true;
	if (CheckDiag(-1, value) == 3) Line = true;

	if (Line == true) ShowMessage(value);
}

//contador de fichas
function CheckTurn_Count(turn_value){
	Turn_count = 0;
	for (i=0; i<3; i++){
		for (j=0; j<3; j++){
			if (board[i][j] == turn_value) Turn_count++;
		}
	}
	return Turn_count;
}

//identificcador de movimientos diferentes
function DifMov(x, y){
	diferent = false;

	if (turn == "cross"){
		if ( x != Cross_Sellected_x ) diferent = true;
		if ( y != Cross_Sellected_y ) diferent = true;
	}
	else{
		if ( x != Ball_Sellected_x ) diferent = true;
		if ( y != Ball_Sellected_y ) diferent = true;
	}

	return diferent;
}

//bloquear una fila o una columna (inteligencia)
function CheckBlock(x,y){
	//si hay 2 fichas del jugador y una de la maquina
	if (CheckRow(y, 1) == 1 && CheckRow(y,2) == 2) return true;
	if (CheckColumn(x, 1) == 1 && CheckColumn(x,2) == 2) return true;
	if ( (x==0 && y==2) || (x==1 && y==1) || (x==2 && y==0)){
		if (CheckDiag(1,1) == 1 && CheckDiag(1, 2) == 2) return true
	}
	if ( (x==0 && y==0) || (x==1 && y==1) || (x==2 && y==2)){
		if (CheckDiag(-1,1) == 1 && CheckDiag(-1, 2) == 2) return true
	}

	return false;
}
