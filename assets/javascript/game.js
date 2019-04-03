$(document).ready(function () {

  //define character objects
  var primarchs = [
    Dorn = {

      name: "Dorn",
      health: 275,
      attack: 15, //this updates after each attack by player
      attackPower: 15, //this never changes
      isPlayer: false,
      active: false

    },

    Perturabo = {

      name: "Perturabo",
      health: 140,
      attack: 35,
      attackPower: 35,
      isPlayer: false,
      active: false

    },

    Angron = {

      name: "Angron",
      health: 145,
      attack: 35,
      attackPower: 35,
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
<h2>Dorn</h2>
</div>
<div class="card-body">
  <img class="card-img-top" src="assets/images/dorn.jpg" alt="Rogal Dorn">
</div>
<div class="card-footer text-muted">
  2 days ago
</div>
</div>`, //perturabo -----------------------------------------------------------------------------------------

    `<div id="Perturabo" class="card text-center">
<div class="card-header">
<h2>Perturabo</h2>
</div>
<div class="card-body">
  <img class="card-img-top" src="assets/images/perturabo.jpg" alt="Perturabo">
</div>
<div class="card-footer text-muted">
  2 days ago
</div>
</div>`, //Angron ---------------------------------------------------------------------------------------------

    `<div id="Angron" class="card text-center">
<div class="card-header">
<h2>Angron</h2>
</div>
<div class="card-body">
  <img class="card-img-top" src="assets/images/Angron.jpg" alt="Angron">
</div>
<div class="card-footer text-muted">
  2 days ago
</div>
</div>`, // Sanguinius _---------------------------------------------------------------------------------------

    `<div id="Sanguinius" class="card text-center">
<div class="card-header">
<h2>Sanguinius</h2>
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
  var wins = 0;

  var a;
  var b;

  //function builds out the new order so they can be styled correctly

  function builder(x) { //give index of temps slot to put in order

    $(".row").append(temps[x]);


  }

  //apply health updates to characters
  function updateHealth(){

    for(var i = 0; i < primarchs.length; i++){

      $("#" + primarchs[i].name).find(".card-footer").html(`<h3>Health: ${primarchs[i].health}`)

    }

  }

  function updateInstruct(x){

    $("#instruct").html(`<h2>${x}</h2>`)

  }

  //stage character select
  // selected characters large in center of screen for player to choose

  if (charSelectStage) {

    updateHealth();
    updateInstruct("Choose your character");

    //set to col-3s reduce margin on container
    $(".card").removeClass("col-6 col-4").addClass("col-3");

    $("#characters").on("click", ".card", function () { //can only click on things that were always there from beginnig

      if (charSelectStage) {
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


        for (var i = 0; i < temps.length; i++) {

          if (i != a) {
            builder(i);
            console.log(i);
          }

        }

        $(".card").removeClass("col-6 col-3").addClass("col-4 enemy"); //set everyone then overwrite for player

        for (var i = 0; i < primarchs.length; i++) { //move everything to stage two positions

          console.log(primarchs[i].isPlayer);
          if (($(this).attr('id') == primarchs[i].name) && primarchs[i].isPlayer == true) { //find player and make them take up col-6


            console.log(primarchs[i]);
            $(this).removeClass("col-3 col-4 enemy").addClass("col-9 player");

          }



        }
        updateHealth();
        updateInstruct("Choose an opponent");
      }

    });



  }

  //stage 2
  //player char is large and on one side of screen with remaining enemies highlighted while defeated enemies are greyed out

  $("#characters").on("click", ".enemy", function () {

    console.log(this);
    var notdead = false;//need to check if alive before proceeding
    for (var i = 0; i < primarchs.length; i++) {
      if (($(this).attr('id') == primarchs[i].name) && (primarchs[i].health > 0) ){
        notdead = true;
      }
    }


    if (pickOpponentStage && notdead) {


      for (var i = 0; i < primarchs.length; i++) {

        if (($(this).attr('id') == primarchs[i].name) && pickOpponentStage && (primarchs[i].health > 0)) {

          
          primarchs[i].active = true;
          console.log(primarchs[i]);
          pickOpponentStage = false
          fightStage = true;
          $(this).removeClass("col-3 col-4").addClass("col-6 active");
          $(".player").removeClass("col-3 col-9").addClass("col-6");
          b = i;

        }

      }
      console.log(b);
      console.log(a);
      $(".card").not($(this,)).not($(".player")).remove();//clean out others so we can rebuild

      for (var i = 0; i < temps.length; i++) {

        if ((i != a) && (i != b)) {
          builder(i);
          $("#" + primarchs[i].name).addClass("col-3 enemy");
        }

      }
      updateHealth();
      updateInstruct("Click on opponent to attack");

    }

  });

  //stage 3
  //fight stage player and enemy they are fighting are large and on either side of screen with other enemies at top
  // player fights until win or death

  $("#characters").on("click", ".active", function () {

    //deal damage and increase player attack after each click then update health

    if (fightStage)
    {

      primarchs[b].health -= primarchs[a].attack;
      primarchs[a].health -= primarchs[b].attack;
      primarchs[a].attack += primarchs[a].attackPower;//increase players attack power
      updateHealth();

      //when enemy defeated set up to select next enemy
      if (primarchs[b].health <= 0){

        $(".enemy").removeClass("col-6 col-3 active").addClass("col-4 enemy"); 
        $(".player").removeClass("col-3 col-4").addClass("col-9");

       
        updateHealth();
        updateInstruct("Choose next opponent");

        fightStage = false;
        pickOpponentStage = true;
        primarchs[b].active = false;
        wins++;

        if (wins >= 3){alert("you are the victor!")}

      }

      if (primarchs[a].health <= 0){

        alert("You have been defeated");

      }



    }

  })


})