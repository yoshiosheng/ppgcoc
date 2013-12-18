/**
 *  // Usage
 *    new eeDropDown("#padding", {
 *		type: 1, // can be 1 or 2
 *		width: 270, 
 *		height: 5,
 *		selected: "selected", //the current selected options' text
 *		data: [
 *			{text: "Text1", clickFunc: "clickText('text1', 12)"},
 *			{text: "Text2", clickFunc: "clickText('text2', 22)"},
 *		],
 *		dropdownID: "dropdownID", // the id of the dropdown
 *		displayContainerID: "displayContainerID", // the id of the item display section
 *		selectionID: "selectionID", // the id of dropdown selection id.
 *		onDropDownClick: function(){alert("1")}, // the event hook on clicking the dropdown.
 *		extraCssClass: "displayInlineBlock filterDropDownList valueInput" // the extra css class that will be applied to dropdown
 *	});
 *
 * @param container //the container selector or jquery obj. we will append the dropdown into this container
 *                    // can be "#some_id", ".some_class", "div > .test ????". or jQuery("#some_id") etc
 * @param opt
 * @returns
 */
function eeDropDown(container, opt) {
    var options = {
        type: 1,
        width: null,
        height: 10,
        selected: null,
        data: [],
        dropdownID: null,
        displayContainerID: null,
        selectionID: null,
        onDropDownClick: null,
        extraCssClass: null,
        maxStringLength: null
    };

    var applyOptions = function (opt) {
        for (var key in options) {
            if (opt[key] != null) {
                options[key] = opt[key];
            }
        }
        return options;
    };

    options = applyOptions(opt);
    var wrapper = null;
    var drawUI = function () {
        var appendContainer = typeof(container) == 'string' ? $(container) : container;
        if (options.type == 1) {
            wrapper = $('<div class="dropDown cursorPointer dropdownUnselected_p12Font positionRelative"></div>');
        }
        else {
            wrapper = $('<div class="dropDown filterDropDownList"></div>');
        }
        if (options.extraCssClass) {
            wrapper.addClass(options.extraCssClass);
        }
        if (options.dropdownID) {
            wrapper.attr("id", options.dropdownID);
        }
        wrapper.bind('click', function () {
            if ($(this).is(".disabled"))return false;
            var isOpen = $(this).is(".dropdownOpen");
            hideAllOpenedDropDownList();
            if (!isOpen) {
                wrapper.children("a").removeClass("roundedCorner_BL3P").removeClass("roundedCorner_BR3P");
                wrapper.children("ul").removeClass("displayNone");
                $(this).addClass("dropdownOpen");
                if ($(this).hasClass("dropdownUnselected_p12Font")) {
                    $(this).removeClass("dropdownUnselected_p12Font").addClass("dropdownSelected_p12Font");
                }
            }
        });

        $("body").unbind('click', hideAllOpenedDropDownList).bind('click', hideAllOpenedDropDownList);

        var displayContainer = $('<a class="defaultLink roundedCorner_BL3P roundedCorner_BR3P " title="' + options.selected + '">' + options.selected + '</a>');
        if (options.type == 2) {
            displayContainer.addClass("arrowGreyDropDown");
        }
        if (options.displayContainerID) {
            displayContainer.attr("id", options.displayContainerID);
        }
        if (options.width) {
            displayContainer.css("width", options.width + "px");
        }
        wrapper.append(displayContainer);
        var selection = $('<ul class="dropdownUl displayNone"></ul>');
        if (options.selectionID) {
            selection.attr("id", options.selectionID);
        }
        if (options.width) {
            selection.css("width", (options.width + 30) + "px");
        }
        wrapper.append(selection);
        for (var idx in options.data) {
            var info = options.data[idx];
            var liHTML;
            liHTML = '<li ';
            if (info.id) {
                liHTML += 'id="' + info.id + '" ';
            }
            if (options.width) {
                liHTML += 'style="width:' + (options.width + 30) + 'px;"';
            }
            liHTML += '><a ';
            if (info.a_id) {
                liHTML += 'id="' + info.a_id + '" ';
            }
            liHTML += 'class="selectionsLi" ';
            if (info.value) {
                liHTML += 'value="' + info.value + '" ';
            }
            if (info.clickFunc) {
                liHTML += 'href="javascript:' + info.clickFunc + ';"';
            }
            liHTML += ' title="' + info.text + '">' + info.text + '</a></li>';
            selection.append($(liHTML));
        }
        wrapper.bind("click", function (event) {
            event.stopPropagation();
        });
        wrapper.find("li a").click(function () {
            var text = $(this).text();
            if (options.maxStringLength) {
                if (text.length >= options.maxStringLength) {
                    text = text.substring(0, options.maxStringLength) + "...";
                }
            }
            wrapper.children("a").text(text);
            wrapper.children("a").attr("title", $(this).text());
            wrapper.attr("value", $(this).attr("value"));
        });
        if (options.onDropDownClick) {
            wrapper.bind("click", options.onDropDownClick);
        }
        appendContainer.append(wrapper);
    };
    drawUI();

    this.select = function (value) {
        if (!value) return;
        var text = wrapper.find("a[value='" + value + "']").last().text();

        wrapper.children("a").text(text);
        wrapper.attr("value", value);

    };
    this.val = function () {
        return wrapper.attr("value");
    };
    this.disabled = function () {
        wrapper.addClass("disabled");
    };
    this.enabled = function () {
        wrapper.removeClass("disabled");
    };
    this.change = function (func) {
        wrapper.find("li a").click(function () {
            func($(this).attr("value"), $(this).text());
        });
    };
    this.dropDown = function () {
        return wrapper;
    };
    this.html = function () {
        return wrapper.outerHTML();
    };

    return this;
}

function hideAllOpenedDropDownList() {
    $(".dropdownOpen").each(function (i, n) {
        $(n).children("a").addClass("roundedCorner_BL3P").addClass("roundedCorner_BR3P");
        $(n).children("ul").addClass("displayNone");
        $(n).removeClass("dropdownOpen");
        if ($(n).hasClass("dropdownSelected_p12Font")) {
            $(n).removeClass("dropdownSelected_p12Font").addClass("dropdownUnselected_p12Font");
        }
    });
}

$.fn.outerHTML = function () {

    // IE, Chrome & Safari will comply with the non-standard outerHTML, all others (FF) will have a fall-back for cloning
    return (!this.length) ? this : (this[0].outerHTML || (function (el) {
        var div = document.createElement('div');
        div.appendChild(el.cloneNode(true));
        var contents = div.innerHTML;
        div = null;
        return contents;
    })(this[0]));

}