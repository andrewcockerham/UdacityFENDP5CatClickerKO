var image = document.getElementById('catImage');
var clicks = document.getElementById('numClicks');

var namesArray = ['Cat 0','Cat 1','Cat 2', 'Cat 3', 'Cat 4']
var clicksArray = [0,0,0,0,0];

// initialize cat list with cat names from namesArray
for (var i = 0; i < namesArray.length; i++) {
	var idString = 'catLink' + i;
	var catLink = document.getElementById(idString)
	catLink.innerHTML = namesArray[i]
};

image.addEventListener('click', function(id) {
	var clicksCount = document.getElementById('numClicks').innerHTML;
	document.getElementById('numClicks').innerHTML = parseInt(clicksCount) + 1
	var numString = image.src.substr(image.src.length - 5);
	var myNumber = numString.split('.')[0];
	clicksArray[myNumber] += 1;
}, false);


var nums = [0,1,2,3,4];

for (var i = 0; i < nums.length; i++) {

    // This is the number we're on...
    var num = nums[i];
    var elem = document.getElementById('catLink' + nums[i]);
    // ... and when we click, alert the value of `num`
    // IFFE
    elem.addEventListener('click', (function(numCopy) {
        return function() {
            image.src = "cat" + numCopy + ".jpg"
            clicks.innerHTML = clicksArray[numCopy];
            document.getElementById('catName').innerHTML = namesArray[numCopy];
        };
    })(num));
};





// $('#catImage').click(function(e) {
// 	// var clicksCount = $('#numClicks').text();
// 	$('#numClicks').text(parseInt($('#numClicks').text()) + 1);
// });