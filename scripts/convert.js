let alphabet_dict = [{
        "name": "Fraktur Bold",
        "start": "1D56C",
        "ul": true
    },
    {
        "name": "Cursive",
        "start": "1D4D0",
        "ul": true
    },
    {
        "name": "Filled Circle",
        "start": "1F150",
        "ul": false
    },
    {
        "name": "Circle",
        "start": "024B6",
        "ul": true
    },
    {
        "name": "Serif Italic",
        "start": "1D468",
        "ul": true
    },
    {
        "name": "Sans Serif Italic",
        "start": "1D608",
        "ul": true
    },
    {
        "name": "Filled Squares",
        "start": "1F170",
        "ul": false
    },
    {
        "name": "Squares",
        "start": "1F130",
        "ul": false
    },
    {
        "name": "Parentheses",
        "start": "1F110",
        "ul": false
    }
]

function convert_char(c, i, ul) {

    if (!/[a-zA-Z]/.test(c)) {
        return c
    }
    else {
        let starting_value = 71;
        if (!ul) {
            starting_value = 65;
            c = c.toUpperCase();
        }
        else if (c.toUpperCase() === c) {
            starting_value = 65;
        }

        let return_value = (c.charCodeAt(0) - starting_value) + parseInt(i, 16);
        return "&#x" + (return_value).toString(16) + ";";

    }

}

function receive_text() {
    document.getElementById("outputBox").innerHTML = "";
    let convertString = document.getElementById("inputBox").value;
    if (convertString) {
        for (let k in alphabet_dict) {
            let returnString = "";
            for (let i in convertString) {
                returnString += convert_char(convertString[i], alphabet_dict[k].start, alphabet_dict[k].ul);
            }
            let formattedReturn = "<tr><td>";
            formattedReturn += alphabet_dict[k].name + ":</td><td class='newText'>" + returnString + "</td><td class='copy'><i class='fa fa-clipboard'></i><span class='tooltiptext'>Copy to clipboard</span></td></tr>";
            document.getElementById("outputBox").innerHTML += formattedReturn;
        }
    $("body").append('<script>$(".copy").click(function() { copyToClipboard($(this).prev().text());  alert("Copied to clipboard");})</script>');
    }
}

function copyToClipboard (str) {
   let el = document.createElement('textarea');
   el.value = str;
   el.setAttribute('readonly', '');
   el.style = {position: 'absolute', left: '-9999px'};
   document.body.appendChild(el);
   el.select();
   document.execCommand('copy');
   document.body.removeChild(el);
}

$(document).ready(function() {
    $("input").keypress(function(e) {
    let keycode = (e.keyCode ? e.keyCode : e.which);
    if (keycode == '13') {
        receive_text();
    }
});
})