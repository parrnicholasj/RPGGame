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

  var temps = [

    `<div id="Dorn" class="card text-center">
<div class="card-header">
  Dorn
</div>
<div class="card-body">
  <img class="card-img-top" src="assets/images/dorn.jpg" alt="Rogal Dorn">
</div>
<div class="card-footer text-muted">
  2 days ago
</div>
</div>`,//perturabo -----------------------------------------------------------------------------------------

`<div id="Perturabo" class="card text-center">
<div class="card-header">
  Perturabo
</div>
<div class="card-body">
  <img class="card-img-top" src="assets/images/perturabo.jpg" alt="Perturabo">
</div>
<div class="card-footer text-muted">
  2 days ago
</div>
</div>`,//Angron ---------------------------------------------------------------------------------------------

`<div id="Angron" class="card text-center">
<div class="card-header">
  Angron
</div>
<div class="card-body">
  <img class="card-img-top" src="assets/images/Angron.jpg" alt="Angron">
</div>
<div class="card-footer text-muted">
  2 days ago
</div>
</div>`,// Sanguinius _---------------------------------------------------------------------------------------

`<div id="Sanguinius" class="card text-center">
<div class="card-header">
  Sanguinius
</div>
<div class="card-body">
  <img class="card-img-top" src="assets/images/sanguinius.jpg" alt="Sanguinius">
  <div class="card-footer text-muted">
    2 days ago
  </div>
</div>
</div>
</div>`



  ]


  var charSelectStage = true; //starts at char select
  var pickOpponentStage = false;
  var fightStage = false;

  var a;
  
  //function builds out the new order so they can be styled correctly

  function builder (x){//give index of temps slot to put in order

$(".row").append(temps[x]);


  }

  //stage character select
  // selected characters large in center of screen for player to choose

  if (charSelectStage) {

    //set to col-3s reduce margin on container
    $(".card").removeClass("col-6 col-4").addClass("col-3");

    $("#characters").on("click", ".card", function () { //can only click on things that were always there from beginnig


      for (var i = 0; i < primarchs.length; i++) {

        if (($(this).attr('id') == primarchs[i].name) && charSelectStage) {

          primarchs[i].isPlayer = true;
          console.log(primarchs[i]);
          charSelectStage = false;
          pickOpponentStage = true;
          a = i;
          

        }

      }

      //remove everything but selected to rebuild in order
      $(".card").not($(this)).remove();

      //get first index then build the rest

      
      for (var i = 0; i < temps.length; i++){

        if (i != a){
          builder(i);
          console.log(i);
        }

      }

      $(".card").removeClass("col-9 col-3").addClass("col-4 enemy"); //set everyone then overwrite for player

      for (var i = 0; i < primarchs.length; i++) { //move everything to stage two positions

        console.log(primarchs[i].isPlayer);
        if (($(this).attr('id') == primarchs[i].name) && primarchs[i].isPlayer == true) { //find player and make them take up col-6


          console.log(primarchs[i]);
          $(this).removeClass("col-3 col-4").addClass("col-9 player");

        }



      }

    });



  }

  //stage 2
  //player char is large and on one side of screen with remaining enemies highlighted while defeated enemies are greyed out

  $("#characters").on("click", ".enemy", function () {

    console.log("click");

    if (pickOpponentStage){
      

      for (var i = 0; i < primarchs.length; i++) {

        if (($(this).attr('id') == primarchs[i].name) && pickOpponentStage) {

          primarchs[i].active = true;
          console.log(primarchs[i]);
          pickOpponentStage = false
          fightStage = true;
          $(this).removeClass("col-3 col-4").addClass("col-9");          

        }

      }

    }

  });

  //stage 3
  //fight stage player and enemy they are fighting are large and on either side of screen with other enemies at top
  // player fights until win or death

  if (fightStage) {

    // two active ones are col-6 others hidden

  }


})