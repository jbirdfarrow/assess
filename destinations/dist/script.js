/* Make a Google Spreadsheet publically viewable and get the JSON
See instructions at 
https://www.freecodecamp.org/news/cjn-google-sheets-as-json-endpoint/

JSON link looks like this
https://spreadsheets.google.com/feeds/cells/YOURGOOGLESHEETCODE/SHEETPAGENUMBER/public/full?alt=json
*/

// Create XMLHttpRequest object.
var oXHR = new XMLHttpRequest();

// Initiate request.
oXHR.onreadystatechange = reportStatus;
oXHR.open(
  "GET", "https://spreadsheets.google.com/feeds/cells/1QZhizsF5gJUdr3cq6XJ9dWUUnHyU5-moKLCPkYQyY2g/1/public/full?alt=json",
  true
);
oXHR.send();

function reportStatus() {
  if (oXHR.readyState == 4) {
    var myArr = JSON.parse(this.responseText);
    //document.getElementById('showData').innerHTML = this.responseText;
    
    //get the contents from cell B2 and put it in the div with id=b2. Cell B2 is the 5th cell (counting left to right then down a row) but we don't use myArr.feed.entry[5].content.$t because counting starts with 0 in. So we need to use .entry[4]. If you wanted to get contents of the first cell, it would be .entry[0].   
    document.getElementById("b2").innerHTML =
      myArr.feed.entry[4].content.$t;
    
    //get the contents from cell C2 and put it in the div with id=c2
    document.getElementById("c2").innerHTML =
      myArr.feed.entry[5].content.$t;
    
    //get the contents from cell B3 and put it in the div with id=b3
    document.getElementById("b3").innerHTML =
      myArr.feed.entry[7].content.$t;
    document.getElementById("c3").innerHTML =
      myArr.feed.entry[8].content.$t;
    document.getElementById("b4").innerHTML =
      myArr.feed.entry[10].content.$t;
    document.getElementById("c4").innerHTML =
      myArr.feed.entry[11].content.$t;
  }
}