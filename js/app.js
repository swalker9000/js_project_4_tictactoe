var ticTacToe = (function() {
	var boardSetUp = {
	 	
	 	//constructs player profiles
	 	activePlayers: function () {
	 		var player1 = new boardSetUp.player("", 1);
	 		var player2 = new boardSetUp.player("", 2);
	 	},
	 /* after the box is clicked, makes assignment for x or o
	 */
		boxSelect: function() {
			$('.box').off("click");
			$('.box').click( function() {
				if($(this).val() == 0) {
					// if player 1 is active
					if( $('#player1').hasClass("active") ) {

						// remove and turn off hover events
						$(this).css("background", "");		
						$(this).addClass("box-filled-1").off("mouseenter", "mouseleave");


						$(this).val(1); // set the value to player1 claimed the spot

						// toggle the active player
						$('.active').removeClass("active").siblings().addClass("active");
						
						boardSetUp.hoverX();
					} // if player 2 is active
					else {
						// remove and turn off hover events
						$(this).css("background", "");
						$(this).addClass("box-filled-2").off("mouseenter", "mouseleave");

				
						$(this).val(2); // set the value to player2 claimed the spot

						// toggle the active player
						$('.active').removeClass("active").siblings().addClass("active");

						boardSetUp.hoverO();
					}
				} else {
					alert("This box is already claimed. Please choose a different box.");
				}
			boardSetUp.getValue();				// checks the value, to get the game state
			boardSetUp.checkForWinner();		// check to see if a winner has been selected
			}) 
		},

	/**
	 * Restarts / Clears Everything
	 */
		boardReset: function() {
			$('#finish').remove(); 	// clear winner message
			$('.box').val(0);		// clears owner value
			boardSetUp.getValue.gameState = [];			// empty game state
			boardSetUp.playerRandomizer.selector = 0;			// clear random selector for which player goes first
			boardSetUp.activePlayers.name = "";		// clear names from previous game
			$('.playerName').text("");	// clears the text input to get name
			$('.players').removeClass("active");	// clears the active class to say whose turn it is
			$('.box').removeClass("box-filled-1 box-filled-2"); // clear box from the previous game
		},

		/** 
	 * 
	 */
		checkForWinner: function() {
		var winningCombinations = [ [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6] ];
		
			//cycle through the winning combination
			for (var i = 0; i < winningCombinations.length ; i++) {
				//copy the winning Combinations array into a varible "set" in order to use the integers of the multidimensional array as indexes to check for winner
				var set = winningCombinations[i].slice();
				// check for a winning combination
				// make sure the first index of the winning combo has an assigned player1/player2 value - check that the value of the winning combo boxes have the same value (either 1 for player 1 or 2 for player 2)
				if ( boardSetUp.getValue()[set[0]] != 0 && boardSetUp.getValue()[set[0]] == boardSetUp.getValue()[set[1]] && boardSetUp.getValue()[set[1]] == boardSetUp.getValue()[set[2]] ) {
					//if winner has been found - hide board and create winner screen
					$('#board').hide();
					$('body').append('<div class="screen screen-win" id="finish"><header><h1>Tic Tac Toe</h1><p class="message">Winner</p><a href="#" class="button">New game</a></header></div>');

					// if the first player is the winner
					if( boardSetUp.getValue()[set[0]] == 1) {
						//styles winning screen for player 1
						$('#finish').addClass("screen-win-one");
						//displays player1's name
						$('.message').append( ", " + player1.name + " " );
						//if new game button is pressed - restart game
						$('.button').click(function(){
							boardSetUp.startScreen();
						})
					} // otherwise the second player must be the winner
					else {
						//style winning screen for player 2
						$('#finish').addClass("screen-win-two");
						//displays player2's name
						$('.message').append( ", " + player2.name + " " );
						//if new game button is pressed - restart game
						$('.button').click(function() {
							boardSetUp.startScreen();
						})
					}  

					return;
				} 
				// check for a tie
			}

			// otherwise, check for a tie
				//if all boxes have been claimed and the value of the boxes for the winning combination don't equal each other then...
				if ( boardSetUp.getValue().indexOf(0) == -1 ) {
					//hide board and create It's a Tie screen
					$('#board').hide();
					$('body').prepend('<div class="screen screen-win" id="finish"><header><h1>Tic Tac Toe</h1><p class="message">It'+ "'" + 's a Tie</p><a href="#" class="button">New game</a></header></div>');
					$('#finish').addClass("screen-win-tie");
					//if new game button is pressed - restart game
					$('.button').click(function() {
						boardSetUp.startScreen();
					});

					return;
				}
		},

		/**
		 * Prompts for a name
		 */
		enterName: function () {
			var name1 = prompt("Enter name for Player 1");
			if (name1 == "" || name1 == null) {
				player1.name = "Player 1";
			} else {
				player1.name = name1;
			}
			var name2 = prompt("Enter name for Player 2");
			if (name2 === "" || name2 == null) {
				player2.name = "Player 2";
			} else {
				player2.name = name2;
			}
		},

		//starts game
		gameStart: function() {
			boardSetUp.enterName();		// ask for names
			$('#player1').append("<li class='playerName'>" + player1.name + "<li>"); // display name to screen
			$('#player2').append("<li class='playerName'>" + player2.name + "<li>");

			boardSetUp.playerRandomizer(); // randomly select a player to start
			boardSetUp.hoverO();// set up hover states
			boardSetUp.hoverX();
			boardSetUp.boxSelect();		// set up selecting a box
			
		},

			/**
		 * Gets the Game State
		 * Tells which boxes have been claimed inside tic tac toe board
		 */
		getValue: function () {
				var gameState = [];
				var gameBoxes = document.getElementsByClassName("box");
			for (let i =0; i < gameBoxes.length; i++) {
				gameState.push(gameBoxes[i].value);
			}
			return gameState;
		},
		hoverO: function() {
			if ($('#player1').hasClass("active")) {
				//when the cursor enters a box style it this way
				$('.box').on("mouseenter", function() {
					if ($(this).val() === 0 ) {
						$(this).css("background", "#EFEFEF url('img/o.svg') center center/50% no-repeat");
					}	
				})
			} 
			//when the cursor leaves a box style it this way
			$('.box').on("mouseleave", function() {
				$(this).css("background", "");
			})
		},

		/*
		 * If the box is empty, show an X
		 */ 
		hoverX: function() {
			if ($('#player2').hasClass("active")) {
				//when a cursor enters a box style it this way
				$('.box').on( "mouseenter", function() {
					if ($(this).val() === 0 ) {
						$(this).css("background", "#EFEFEF url('img/x.svg') center center/50% no-repeat");
					}
				})
			} 
			//when the cursor leaves a box style it this way
			$('.box').on("mouseleave", function() {
				$(this).css("background", "");
			})
		},


		//creates player 1 and player 2
		player: function (name, value) { //symbol, active
			this.name = name;
			this.value = value;
		},

		/**
		 * Selects a random first player
		 */
		playerRandomizer: function () {
			var selector = Math.floor(Math.random() * 2 - 1 + 1);
			if (selector === player1.value) {
					$('#player1').addClass("active");
				} else {
					$('#player2').addClass("active");
				}
		}, 

		//creates startScreen and removes it when start button is clicked

		startScreen: function () {
			boardSetUp.boardReset();
			$('#board').hide();		// hides the board

			// create start screen
			$('body').prepend('<div class="screen screen-start" id="start"><header><h1>Tic Tac Toe</h1><a href="#" class="button">Start game</a></header></div>');
			
			$('.button').click( () => {
				$('#start').remove();		// removes start game
				$('#board').show();			// shows board game
				boardSetUp.gameStart(); //begins game 
			})
		},
	};

	boardSetUp.startScreen(); //initializes start screen
	return boardSetUp; //return entire boardSetUp object 
}());