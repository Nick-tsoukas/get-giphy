var array = ['Armadillo','Okapi','Dragon','Pacu Fish','dog','cat','Fossa','Dragon','Dragon','Fossa','Dragon','Fossa','Fossa','Fossa','Fossa','Fossa','Fossa','Fossa','Fossa','Fossa'];
var btnToAddAnimal = document.getElementById('add_animal_btn');
// api key Y7eIT0AhbEPOy1v9fu1UgUozsYu2DDBm

// var url = "http://api.giphy.com/v1/gifs/search?q=dog&limit=5&api_key=Y7eIT0AhbEPOy1v9fu1UgUozsYu2DDBm";
// i get an array of five pics  on click

function callApi(search,index) {
  $.ajax({
    url: `http://api.giphy.com/v1/gifs/search?q=${search}&limit=6&api_key=Y7eIT0AhbEPOy1v9fu1UgUozsYu2DDBm`,
    method : "GET"
  }).then(function(res) {
    //gets an array of objects
    // In each item of the array get images.fixed_height_small_still

    var arrayOfGif = res.data;
    arrayOfGif.forEach(function(val,index) {
      console.log(val)
      if(index%2 === 0){
      //  prepend img html to id images fixed_height_small_still orig
        var template = `<div class="red"><img src="${val.images.fixed_height_still.url}" /></div>`;
        $("#images").prepend(template);
      } else {
        var template = `<div class="green"><img class="green" src="${val.images.fixed_height_still.url}" /></div>`;
        $("#images").prepend(template);
      }
    })
  });
}
// ["0"].images.fixed_height_small_still
function addListener(array) {
  array.forEach(function(val,index,array) {
    val.addEventListener('click',function(e) {
      var value = $(this).attr('data-name')
      callApi(value,index);
    })
  })
}

// builds button from array of strings
function buildBtn(array){
  var template = ``;
  array.forEach(function(val,index,array) {
    template += `<div class="myButton" data-name="${val}">${val}</div>
    `;
  });
  $('#grid').append(template);
  // gets button array
  var buttonsArray = Array.from(document.getElementsByClassName('myButton'));
  // console.logs button array : html collection
  addListener(buttonsArray)
};

buildBtn(array);

//button to add animal eventListen
btnToAddAnimal.addEventListener('click', function(e) {
  e.preventDefault();
  var value = $('#animal-input-val').val();
  array.push(value);
  callApi(value)
  $('#grid').empty();
  $("#animal-input-val").val(" ");
  return buildBtn(array);
})
