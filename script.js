$(function(){

  // model holds the data for cat names and number of clicks for each cat
  var model = {
    currentCat: 0,
    catNames: ['Cat 0','Cat 1','Cat 2', 'Cat 3', 'Cat 4'],
    imagePath: ['cat0.jpg','cat1.jpg','cat2.jpg','cat3.jpg','cat4.jpg'],
    catClicks: [0,0,0,0,0],
    adminVisible: false
  };

  // octopus is the controller, which communicates b/w view and model
  var octopus = {
    init: function() {
      listView.init();
      detailView.init();
      adminView.init();
    },
    getCurrentCat: function() {
      return model.currentCat;
    },
    setCurrentCat: function(catNumber) {
      model.currentCat = catNumber;
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
    getCatImage: function(catNumber) {
      return model.imagePath[catNumber];
    },
    getCatNamesLength: function() {
      return model.catNames.length;
    },
    toggleAdminPanel: function(argument) {
      if ($('#formDiv').is(":visible")) {
        model.adminVisible = false
      } else {
        model.adminVisible = true
      };
      $('#formDiv').toggle();
    },
    checkAdminVisibility: function() {
      return model.adminVisible;
    },
    updateCatInfo: function(catNumber,name,path,clicks) {
      if (name && path && clicks) {
        model.catNames[catNumber] = name
        model.imagePath[catNumber] = path
        model.catClicks[catNumber] = clicks
        // render view
        detailView.render(catNumber);
        listView.render();// - update list view with new name
        this.toggleAdminPanel();
      } else {
        alert('fields cannot be blank');
      };
    }
  };

  // view handles all of the view interaction
  var listView = {
    // setup the view and listeners
    init: function() {
      // add cat links to list based on cat names
      for (var i = 0; i < octopus.getCatNamesLength(); i++) {
        var idString = 'catLink' + i;
        var catLink = document.getElementById(idString)
        catLink.innerHTML = octopus.getCatName(i)
      };

      // add event listener to each cat name link
      // use IFFE to be careful of closures
      for (var i = 0; i < octopus.getCatNamesLength(); i++) {
        var elem = document.getElementById('catLink' + i);
        // IFFE
        elem.addEventListener('click', (function(iCopy) {
            return function() {
              detailView.render(iCopy);
              if (octopus.checkAdminVisibility) {
                adminView.updateAdminFields(iCopy);
              };
            };
        })(i));
      };
    },

    render: function() {
      for (var i = 0; i < octopus.getCatNamesLength(); i++) {
        var idString = 'catLink' + i;
        var catLink = document.getElementById(idString)
        catLink.innerHTML = octopus.getCatName(i)
      };
    }
  };

  var detailView = {
    init: function() {
      var image = document.getElementById('catImage');
      var clicks = document.getElementById('numClicks');
      // add the cat view image listener for updating the number of clicks
      image.addEventListener('click', function(id) {
        octopus.updateCatClicks(octopus.getCurrentCat()); // go through controller to edit model data
        var clicks = document.getElementById('numClicks');
        clicks.innerHTML = octopus.getCatClicks(octopus.getCurrentCat());
        adminView.updateAdminFields(octopus.getCurrentCat());
      }, false);

      this.render(0); // render the first cat on launch
    },
    // this function renders the cat detail view based on the cat that was clicked in the list
    render: function(catNumber) {
      octopus.setCurrentCat(catNumber);
      var image = document.getElementById('catImage');
      var clicks = document.getElementById('numClicks');
      document.getElementById('catName').innerHTML = octopus.getCatName(catNumber);
      image.src = octopus.getCatImage(catNumber);
      clicks.innerHTML = octopus.getCatClicks(catNumber);
    }
  }

  var adminView = {
    init: function() {
      var adminButton = document.getElementById('admin');
      var cancelButton = document.getElementById('cancelButton');
      var saveButton = document.getElementById('saveButton');

      // add listener to admin button
      adminButton.addEventListener('click', function() {
        octopus.toggleAdminPanel();
        if (octopus.checkAdminVisibility) {
          //get current cat
          var catImage = document.getElementById('catImage');
          var numString = catImage.src.substr(catImage.src.length - 5);
          var catNumber = numString.split('.')[0];

          //put values for current cat into input values
          document.getElementById('nameInput').value = octopus.getCatName(catNumber);
        };
      }, false);

      // add listener to cancel button
      cancelButton.addEventListener('click', function(e) {
        e.preventDefault();
        octopus.toggleAdminPanel();
      }, false);

      // add listener to cancel button
      saveButton.addEventListener('click', function(e) {
        e.preventDefault();// prevent page refresh on form submit
        var catNumber = octopus.getCurrentCat();
        var nameValue = document.getElementById('nameInput').value
        var pathValue = document.getElementById('imageInput').value
        var clicksValue = document.getElementById('clicksInput').value
        octopus.updateCatInfo(catNumber,nameValue,pathValue,clicksValue);// pass in three values of input
      }, false);

      adminView.updateAdminFields(octopus.getCurrentCat());//initialize admin
    },
    render: function() {
      //name,clicks,path
    },
    updateAdminFields: function(catNumber) {
      document.getElementById('nameInput').value = octopus.getCatName(catNumber);
      document.getElementById('imageInput').value = octopus.getCatImage(catNumber);
      document.getElementById('clicksInput').value = octopus.getCatClicks(catNumber);
    }
  }

  octopus.init();// start aplication by calling controller init function
});