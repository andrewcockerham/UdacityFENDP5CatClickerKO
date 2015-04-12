$(function(){

  // model holds the data for cat names and number of clicks for each cat
  var model = {
    catNames: ['Cat 0','Cat 1','Cat 2', 'Cat 3', 'Cat 4'],
    catClicks: [0,0,0,0,0]
    // could add image source in here
  };

  // octopus is the controller, which communicates b/w view and model
  var octopus = {
    init: function() {
      view.init();
    },
    updateCatClicks: function(catNumber) {
      model.catClicks[catNumber] += 1;
    },
    getCatClicks: function(catNumber) {
      return model.catClicks[catNumber];
    },
    getCatName: function(catNumber) {
      return model.catNames[catNumber];
    },
    getCatNamesLength: function() {
      return model.catNames.length;
    }
  };

  // view handles all of the view interaction
  var view = {
    // setup the view and listeners
    init: function() {
      // add cat links to list based on cat names
      var image = document.getElementById('catImage');
      // var image = document.getElementById('catImage');
      for (var i = 0; i < octopus.getCatNamesLength(); i++) {
        var idString = 'catLink' + i;
        var catLink = document.getElementById(idString)
        catLink.innerHTML = octopus.getCatName(i)
      };

      // add the cat view image listener for updating the number of clicks
      image.addEventListener('click', function(id) {
        var numString = image.src.substr(image.src.length - 5);
        var myNumber = numString.split('.')[0];
        octopus.updateCatClicks(myNumber); // go through controller to edit model data
        var clicks = document.getElementById('numClicks');
        clicks.innerHTML = octopus.getCatClicks(myNumber);
      }, false);

      // add event listener to each cat name link
      // use IFFE to be careful of closures
      for (var i = 0; i < octopus.getCatNamesLength(); i++) {
        var elem = document.getElementById('catLink' + i);
        // IFFE
        elem.addEventListener('click', (function(iCopy) {
            return function() {
              view.renderCat(iCopy);
            };
        })(i));
      };
      view.renderCat(0); // render the first cat on launch
    },
    // this function renders the cat detail view based on the cat that was clicked in the list
    renderCat: function(catNumber) {
      var image = document.getElementById('catImage');
      var clicks = document.getElementById('numClicks');
      document.getElementById('catName').innerHTML = octopus.getCatName(catNumber);
      image.src = "cat" + catNumber + ".jpg"
      clicks.innerHTML = octopus.getCatClicks(catNumber);
    }
  };

  octopus.init();// start aplication by calling controller init function
});