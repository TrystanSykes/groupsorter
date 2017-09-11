var listInput = document.querySelector('#list-input');
var listSubmit = document.querySelector('#list-submit');
var groupInput = document.querySelector('#group-input');
var groupSubmit = document.querySelector('#group-submit');
var splitButton = document.querySelector('#split-em');
var resultsBox = document.querySelector('.results-box');
var overflowExp = document.querySelector('.overflow-exp');

var listArr = [];
var shuffledArray = [];
var splitGroups = [];

var captureList = function() {
  var capturedString = listInput.value;
  listArr = capturedString.split(',');
};

var captureGroupSize = function() {
  groupSize = parseInt(groupInput.value);
};

var clearFields = function() {
  listInput.value = "";
  groupInput.value = "";
  while (resultsBox.firstChild) {
    resultsBox.removeChild(resultsBox.firstChild);
 }
}

var randomizeArray = function(arr) {
  var randomNo;
  while (arr.length > 0) {
      randomNo = Math.floor((Math.random() * arr.length));
      shuffledArray.push(arr[randomNo]);
      arr.splice(randomNo, 1);
  }
};

var split = function(arr) {
  while (arr.length > 0) {
    splitGroups.push(arr.splice(0, groupSize));
  }
};

var checkOverflow = function() {
  var groupPos = splitGroups.length - 1;
  var lastGroup = splitGroups[groupPos];
  if (lastGroup.length === 1) {
    splitGroups.splice(groupPos, 1);
    randomNo = Math.floor((Math.random() * splitGroups.length));
    splitGroups[randomNo].push(lastGroup);
  } else if (lastGroup.length === (groupSize - 1)) {
    overflowExp.style.opacity = 1;
    return;
  } else {
    splitGroups.splice(groupPos, 1);
    lastGroup.forEach(function(elem) {
      randomNo = Math.floor((Math.random() * lastGroup.length));
      splitGroups[randomNo].push(elem);
    })
  } 
  overflowExp.style.opacity = 1;
};

var showResults = function() {
  overflowExp.style.opacity = 0;
  clearFields();
  randomizeArray(listArr);
  split(shuffledArray);
  if (splitGroups[(splitGroups.length - 1)].length !== groupSize) {
    checkOverflow();
  }
  for (var i = 0; i < splitGroups.length; i++) {
    var groupToPrint = document.createElement("ul");
    groupToPrint.setAttribute('class', 'group-' + i);
    resultsBox.appendChild(groupToPrint);
    var groupArr = splitGroups[i];
    groupArr.forEach(function(elem) {
      var item = document.createElement("li");
      var content = document.createTextNode(elem);
      item.appendChild(content);
      groupToPrint.appendChild(item);
    })
  }
  listArr = [];
  shuffledArray = [];
  splitGroups = [];
}




listSubmit.addEventListener('click', captureList);
groupSubmit.addEventListener('click', captureGroupSize);
splitButton.addEventListener('click', showResults);