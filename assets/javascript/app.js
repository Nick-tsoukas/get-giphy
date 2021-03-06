var array = ['orion nebula', 'vela pulsar', 'ganymede', 'triangulum galaxy', 'lagoon nebula', 'eagle nebula', 'helix nebula', 'omega nebula',"cat's eye nebula"];
var nebulaBtn = document.getElementById('add_animal_btn');


//function to make call to the giphy api : params = search,index
function callApi(search, index) {
  $.ajax({
    url: `https://cors-anywhere.herokuapp.com/http://api.giphy.com/v1/gifs/search?q=${search}&limit=10&api_key=Y7eIT0AhbEPOy1v9fu1UgUozsYu2DDBm`,
    method: "GET"
  }).then(function(res) {
    console.log(res);

    //1: Get array of objects from data 2. Iterates and builds template. 3. Prepends to DOM
    var arrayOfGif = res.data;
    $("#images").empty();
    arrayOfGif.forEach(function(val, index) {
      var template = `<div class="green">
                        <img id="gif${index}" class="gif" src="${val.images.fixed_height_still.url}" data-state="still" data-still="${val.images.fixed_height_still.url}" data-animate="${val.images.fixed_height.url}" download />
                        <a class="download" href="${val.images.fixed_height_still.url}" download ><i class="material-icons">cloud_download</i</a>
                     </div>`;
      $("#images").prepend(template);
    });
    addClickToGifs();
  });
}

  $.ajax({
    url: `https://cors-anywhere.herokuapp.com/https://eonet.sci.gsfc.nasa.gov/api/v2.1/events?api_key="DEMO_KEY"`,
    method: "GET"
  }).then(function(res) {
   const events = res.events.slice(0,100);
   events.forEach((event) => {
     console.log('===========');
     console.log(event.title);
     console.log('=============');
     console.log(event.geometries);
   })
  });


// this function makes the call to the api on button click and gets the data-name attr for the call
function addListener(array) {
  array.forEach(function(val, index, array) {
    val.addEventListener('click', function(e) {
      var value = $(this).attr('data-name');
      callApi(value, index);
      //Launch Rocket Ship!!!
      playAudio();
    })
  })
}

// Adding click event to gifs to alter the image src attributes
function addClickToGifs() {
  $('.gif').on('click', function(e) {
    var state = $(this).attr('data-state');

    if (state === 'still') {
      $(this).attr('src', $(this).attr('data-animate')).attr('data-state', 'animate');
      console.log(this)
    } else {
      $(this).attr('src', $(this).attr('data-still')).attr('data-state', 'still');
      console.log(this)
    }

  });
}

// builds button from array of strings
function buildBtn(array) {
  var template = ``;
  array.forEach(function(val, index, array) {
    template += `<a href="#rocket"><div class="myButton" data-name="${val}">${val.toUpperCase()}</div></a>
    `;
  });
  $('#grid').append(template);
  // gets button array
  var buttonsArray = Array.from(document.getElementsByClassName('myButton'));
  // console.logs button array : html collection
  addListener(buttonsArray);
};
MicroModal.show('modal-1');
buildBtn(array);

function changeClass() {
  setTimeout(function() {
    $('.myButton').addClass('red');
  }, 2000);
}
changeClass();

//button to add animal eventListen clears all content from div
nebulaBtn.addEventListener('click', function(e) {
  e.preventDefault();
  var value = $('#animal-input-val').val();
  array.push(value);
  callApi(value)
  $('#grid').empty();
  $("#animal-input-val").val(" ");
  buildBtn(array);
  changeClass();
})
var launchSound = document.getElementById("myAudio");

function playAudio() {
  launchSound.play();
}
