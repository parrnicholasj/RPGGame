$(document).ready(function () {

  //define character objects
  var primarchs = [
    Dorn = {

      name: "Dorn",
      health: 150,
      attack: 10, //this updates after each attack by player
      attackPower: 10, //this never changes
      isPlayer: false,
      active: false

    },

    Perturabo = {

      name: "Perturabo",
      health: 100,
      attack: 5,
      attackPower: 5,
      isPlayer: false,
      active: false

    },

    Angron = {

      name: "Angron",
      health: 125,
      attack: 15,
      attackPower: 15,
      isPlayer: false,
      active: false

    },

    sanguinius = {

      name: "Sanguinius",
      health: 200,
      attack: 20,
      attackPower: 20,
      isPlayer: false,
      active: false

    }
  ]


  var charSelectStage = true; //starts at char select
  var pickOpponentStage = false;
  var fightStage = false;


  //stage character select
  // selected characters large in center of screen for player to choose

  if (charSelectStage) {

    //set to col-3s reduce margin on container
    $(".card").removeClass("col-6 col-4").addClass("col-3");

    $(".card").click(function () {

      
      for (var i = 0; i < primarchs.length; i++) {

        if (($(this).attr('id') == primarchs[i].name) && charSelectStage)
        {

          primarchs[i].isPlayer = true;
          console.log(primarchs[i]);
          charSelectStage = false;
          pickOpponentStage = true;
          console.log(pickOpponentStage);

          
        }

      }

      for (var i = 0; i < primarchs.length; i++){//move everything to stage two positions

        console.log(primarchs[i]);
        if (($(".card").attr('id') == primarchs[i].name) && primarchs[i].isPlayer == true){//find player and make them take up col-6
  
          $(".card").removeClass("col-3 col-4").addClass("col-6");
  
        }else{
          $(".card").removeClass("col-6 col-3").addClass("col-4");//everybody else is col-4
        }
          
      }

    });



  }

  //stage 2
  //player char is large and on one side of screen with remaining enemies highlighted while defeated enemies are greyed out

  if (pickOpponentStage) {

    // make player char col-6 others col-4
console.log("here");
    

  }

  //stage 3
  //fight stage player and enemy they are fighting are large and on either side of screen with other enemies at top
  // player fights until win or death

  if (fightStage) {

    // two active ones are col-6 others hidden

  }


})