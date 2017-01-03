// 

var AbbrChecker = function() {

	var self = {};

    /**
    * checks the page for abbrevations and adds a
    * mouseover with explanation.
    **/
    var addExplanations = function( abbreviationList ) {

        abbreviationList.forEach(function(entry){
            var abbrev = parseAbbrev(entry);
            if(abbrev !== undefined && abbrev.abbrev.trim() != "") {

                mark( abbrev.abbrev, abbrev.longtext, abbrev.casesensitive );
            }
        });
        addEventListeners();
    }

    
    var insertPopups = function(node, regex, callback, excludeElements) { 

        excludeElements || (excludeElements = ['script', 'style', 'a', 'form', 'iframe', 'canvas']);
        var child = node.firstChild;

        while (child) {
            switch (child.nodeType) {
            case 1:
                if (excludeElements.indexOf(child.tagName.toLowerCase()) > -1)
                    break;
                insertPopups(child, regex, callback, excludeElements);
                break;
            case 3:
                var bk = 0;
                child.data.replace(regex, function(all) {
                    var args = [].slice.call(arguments),
                        offset = args[args.length - 2],
                        newTextNode = child.splitText(offset+bk), tag;
                    bk -= child.data.length + all.length;

                    newTextNode.data = newTextNode.data.substr(all.length);
                    tag = callback.apply(window, [child].concat(args));
                    child.parentNode.insertBefore(tag, newTextNode);
                    child = newTextNode;
                });
                break;
            }
            child = child.nextSibling;
        }

        return node;
    };
  

    var mark = function(abbrev, longtext, casesensitive) {

        var regexModifier = casesensitive==="no"?"gi":"g"

        var regex = new RegExp(abbrev, regexModifier);

        insertPopups(document.body, regex, function(node, match, offset) {
            var abbrevNode = document.createElement("span");
            abbrevNode.appendChild(document.createTextNode(abbrev));
            abbrevNode.className="abbrev";
            abbrevNode.style.cssText="border-bottom:1px dotted #069;"

            var popupNode = document.createElement("span");
            popupNode.style.display="none";
            popupNode.className="abbrev_popup";
            popupNode.appendChild(document.createTextNode("[ "+longtext+" ]"));

            var compoundNode = document.createElement("span");
            compoundNode.appendChild(abbrevNode);
            compoundNode.appendChild(popupNode);
            return compoundNode;
        });

    }

    function addEventListeners() {

        var abbrevs = document.getElementsByClassName("abbrev");

        if(abbrevs!==undefined) {

            [].forEach.call(abbrevs, function(entry){
                addSingleEventListener(entry,"abbrev_popup");
            });

        }
    }

    function addSingleEventListener(abbrev, popupClass) {

        abbrev.addEventListener("mouseenter", function() {
            var parent = this.parentNode;
            if(parent !== undefined) {
                var popup = parent.getElementsByClassName(popupClass);
                popup[0].style.display = 'inline';
            }
        });

        abbrev.addEventListener("mouseleave", function() {
            var parent = this.parentNode;
            if(parent !== undefined) {
                var popup = parent.getElementsByClassName(popupClass);
                popup[0].style.display = 'none';
            }
        });
    }

    /**
    * An element is one csv-line like the following:
    *
    * abbr;abbreviation;no
    */
    var parseAbbrev = function(element) {
        if(element !== undefined) {
            var splitted = element.split(/;/);
            // TODO create dedicated object
            var entry = new Object();
            entry.abbrev = splitted[0];
            entry.longtext = splitted[1];
            entry.casesensitive = splitted[2];
            return entry;
        }
    }

    self.addExplanations = addExplanations;
    return self;
}

var initAbbreviations = function() {
    var checker = AbbrChecker();
    chrome.runtime.sendMessage({method: "getAbbrevs"}, function(response) {
        var list = response.status;
        if(list!==undefined) {
            checker.addExplanations(list.split("%;%"));
        }
    });
}

initAbbreviations();
