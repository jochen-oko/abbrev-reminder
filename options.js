
var DELIMETER = "%;%";

function init() {
	document.getElementById("addButton").addEventListener("click",add);
	document.getElementById("uploadButton").addEventListener("click",upload);
	redrawList();
}

function upload() {
	var csvLines = $("#csv").val();
	console.log(csvLines);
	csvLines.split(/\n/).forEach(function(line) {
		var entry = line.split(/;/);
		addEntry(entry[0],entry[1],entry[2])
	});
}

/**
* Updates the list of abbreviations currently available.
*/
function redrawList() {

	if(localStorage.abbrevs!==undefined) {
		var lines = localStorage.abbrevs.split(DELIMETER);

		var htmlList = buildHtmlList(lines);
	    document.getElementById("abbreviationsList").remove(); // delete all abbreviations from display.
	    $("#listContainer").append(htmlList) // show all abbreviations.
	}

}

/**
* Builds a html list of the given abbreviations.
*/
var buildHtmlList = function(lines) {

    var snippet = '<div id="abbreviationsList" style="background-color:palegoldenrod;"><ul>';
    lines.forEach(function(entry){
        snippet = snippet + '<li class="entry" style="list-style-type:none; text-decoration:right">' + entry + '</li>';
    });
    snippet = snippet + '</ul></div>'

    return snippet;
}

var getCaseSensitiveValue = function() {
	var radio = document.getElementsByName('casesensitive');

	for (var i = 0, length = radio.length; i < length; i++) {
	    if (radio[i].checked) {
	        return radio[i].value;
	    }
	}
}

function addEntry(abbrev, longtext, casesensitive) {
	$(".error").hide();

	if(abbrev !== "" && longtext!== "" && casesensitive!="") {
		
		// TODO remove other entries with the same 'abbr'. Best way would be to use abbr as index directly in loaclStorage.
		localStorage.abbrevs =  (localStorage.abbrevs !==undefined ? localStorage.abbrevs : "") + abbrev + ";" + longtext + ";" + casesensitive + DELIMETER;

		redrawList();
		$("#abbr").val("");
		$("#longtext").val("");
		$("#casesensitive").val("");
		$("#csv").val("");
	} else {
		$(".error").show();
	}
}

function add() {
	
	var abbr = $("#abbr").val();
	var longtext = $("#longtext").val();
	var casesensitive = getCaseSensitiveValue();

	addEntry(abbr,longtext, casesensitive);

}

window.addEventListener("load", init);
