# abbrev-reminder
chrome-extension to insert long version of user defined abbreviations


## Installation:
Open chrome://extensions/ and click 'Load unpacked extensions'. Select the cloned repo path there.
The Extension is installed now until you disable or remove it.

Initially, the list of abbreviations is empty. To change it, right click the 'abbr' icon in the location bar and choose 'Options'.


## Adding Abbreviations:
a) either use the above fields to add a single entry, or
b) use the textfield below to add multiple abbreviations at once. The format must look like the following:

short;long;casesensitive
"abbr;abbreviation;no;"
"cont'd;continued;yes;"


## Usage:
After inserting some entries, the extension can be tested by opening a page with one or more of the abbreviations.
To activate the extension on a certain site, the icon next to the address bar has to be clicked.
All found abbreviations will be underlined with a blue dotted line. In case of a mouseover event on such an element, the long description appears inlined behind the abbreviation.


## Next steps:
* the long description of an abbreviation should be opened in a popup
* Option page design
* better approach to handle prefixes of other abbreviations and multiple entries of the same abbreviations.
