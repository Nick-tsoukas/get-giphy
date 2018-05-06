var array = ['orion nebula', 'vela pulsar', 'ganymede', 'triangulum galaxy', 'lagoon nebula', 'eagle nebula', 'helix nebula', 'omega nebula'];
var btnToAddAnimal = document.getElementById('add_animal_btn');


function callApi(search, index) {
  $.ajax({
    url: `https://cors-anywhere.herokuapp.com/http://api.giphy.com/v1/gifs/search?q=${search}&limit=6&api_key=Y7eIT0AhbEPOy1v9fu1UgUozsYu2DDBm`,
    method: "GET"
  }).then(function(res) {
    console.log(res);

    //gets an array of objects
    // In each item of the array get images.fixed_height_small_still

    var arrayOfGif = res.data;
    arrayOfGif.forEach(function(val, index) {
      if (index % 2 === 0) {
        //  prepend img html to id images fixed_height_small_still orig
        var template = `<div class="green"><img class="gif" src="${val.images.fixed_height_still.url}" data-state="still" data-still="${val.images.fixed_height_still.url}" data-animate="${val.images.fixed_height.url}" /></div>`;
        $("#images").prepend(template);
      } else {
        var template = `<div class="green"><img class="gif" src="${val.images.fixed_height_still.url}" data-state="still" data-still="${val.images.fixed_height_still.url}" data-animate="${val.images.fixed_height.url}" /></div>`;
        $("#images").prepend(template);
      }
    });
    //Adding click event to images with the gif class
    addClickToGifs();

  });
}

// this function makes the call to the api on button click and gets the data-name attr for the call
function addListener(array) {
  array.forEach(function(val, index, array) {
    val.addEventListener('click', function(e) {
      var value = $(this).attr('data-name');
      callApi(value, index);
    })
  })
}

// Adding click event to gifs to alter the image src attributes
function addClickToGifs() {
  $('.gif').on('click', function(e) {
    var state = $(this).attr('data-state');

    if (state === 'still') {
      $(this).attr('src', $(this).attr('data-animate')).attr('data-state', 'animate');
    } else {
      $(this).attr('src', $(this).attr('data-still')).attr('data-state', 'still');
    }

  });
}

// builds button from array of strings
function buildBtn(array) {
  var template = ``;
  array.forEach(function(val, index, array) {
    template += `<a href="#fly"><div class="myButton" data-name="${val}">${val.toUpperCase()}</div></a>
    `;
  });
  $('#grid').append(template);
  // gets button array
  var buttonsArray = Array.from(document.getElementsByClassName('myButton'));
  // console.logs button array : html collection
  addListener(buttonsArray);
};

buildBtn(array);

function changeClass() {
  setTimeout(function() {
    $('.myButton').addClass('red');
  },2000);
}
changeClass();


//button to add animal eventListen
btnToAddAnimal.addEventListener('click', function(e) {
  e.preventDefault();
  var value = $('#animal-input-val').val();
  array.push(value);
  callApi(value)
  $('#grid').empty();
  $("#animal-input-val").val(" ");
  buildBtn(array);
  changeClass();
})
