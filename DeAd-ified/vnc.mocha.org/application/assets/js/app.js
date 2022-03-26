
/*
 * --------------------------------------------------------------------
 * Mocha VNC for KaiOS
 * 
 * PROHIBITIONS. This Software is licensed to you and/or a company. You are
 * not obtaining title to the Software or any copyrights. You may not sublicense,
 * rent, lease, convey, modify, translate, convert to another programming language,
 * decompile, or disassemble the Software for any purpose. 
 * 
 * Copyright (c) MochaSoft Aps
 * -------------------------------------------------------------------- */



var gP = false;
var ds = false;
var gi = false;
var gp = false;
var hk = false;
var fP = false;
var gc = false;
var ge = false;

var dP = null; 
var gl = String.fromCharCode(0x90); 
var dH = 10;
var cK = false;
var ah = false;
var bm = false;
var ew = false;
var ax = false;
var aJ = false;
var bQ = false;
var dR = false;
var aH = false;
var bY = false;
var de = -1; 

var dA = true;
var dp = 1; 
var cn = false;
var bM;
var dr;
var cj;  
var da;
var bH = true; 
var bA = false;
var bw = 2;
var gd = 240;
var ff = 264;

var buf_out = new Uint8Array(64 * 64 * 3);
var hz = false;
var fH = 0;
var ev = 0;
var cG = null;
var dv = null;
var ci = 0;
var dE = 0;
var bo = 0;
var bx = 0;

var ey = 50;
var fI = 50;
var aM = 50;
var aK = 50;
var bq = 4;
var gE = false;
var bL = null;
var bs = 0;
var zlib_data_size = 0; 
var zipfirsttime = true;
var bp = 0;
var ad = new Uint8Array(0x4ffff);
var bS = 0;
var fa = true;
var bz = true;
var hJ = true; 

var gv = true;  
var eY = 4;
var hx = "";
var bG = 0;
var items = [];
var bi;
var ak = 0;
var gD = '/assets/pages/menu_main.html';
var hm = '/assets/pages/main.html';
var fh = '/assets/pages/about.html';
var hs = '/assets/pages/keyboard.html';
var fn = '/assets/pages/vnc.html';
var fu = '/assets/pages/vncfull.html';
var en = '/assets/pages/addtext.html';
var fJ = '/assets/pages/menu_vnc.html';
var dU = '/assets/pages/settings.html';
var hf = '/assets/pages/config.html';
var gF = '/assets/pages/menu_fxx_keys.html';
var fS = '/assets/pages/menu_keys.html';
var fR = '/assets/pages/menu_keysmac.html';

var current = "";

var bh = "";
var bP = "";
var aq = "";
var aI = "";
var aS = "";

var am = "0";
var J = "0";

var socket = null;
var bI = [];
var bZ = "";

var gr = 0;
var dI = 1;
var fz = 2;
var hw = 3;
var eZ = 4;
var du = 5;
var dJ = 6;
var fj = 7;
var cB = 8;
var fl = 9;
var bO = dI;


document.addEventListener('keydown', handleKeyDown);



window.addEventListener('load', function() {

    
    fs();
    bE();

    window.onpopstate = function(e) {

        bE();
    };
});
function aC()
{
    if (document.getElementById('scrollkey') == undefined)
    {
        return;
    }
    if (ah == false)
    {
        document.getElementById('scrollkey').innerHTML = "";
        document.getElementById('clickkey').innerHTML = "ABORT";
        document.getElementById('menukey').innerHTML = "";

        return;
    }
    document.getElementById('menukey').innerHTML = "Menu";

    if (bH)
    {
        if (J.charAt(0) == '0')
            document.getElementById('scrollkey').innerHTML = "Mouse";
        else
            document.getElementById('scrollkey').innerHTML = "";
        document.getElementById('clickkey').innerHTML = "scrolling";
    }
    else
    {
        document.getElementById('scrollkey').innerHTML = "Scroll";
        if (bA == false)
            document.getElementById('clickkey').innerHTML = "CLICK";
        else
            document.getElementById('clickkey').innerHTML = "dragging";
    }
}

function dN()
{
  if (current == "config") {
        if (document.getElementById('editkey') == undefined) return;
        if (bG == 0 || bG == 1 || bG == 2 || bG == 5 || bG == 6)
            document.getElementById('editkey').innerHTML = "EDIT";
        else
            document.getElementById('editkey').innerHTML = "CHANGE";
    }
    
    if (current == "addtext") {
       
        if (document.getElementById('editkey') == undefined) return;
        if (bG == 0) {
                document.getElementById('editkey').innerHTML = "SEND";
        }
        else
            document.getElementById('editkey').innerHTML = "CHANGE";
    }

}

function eT()
{
    
    document.body.style.backgroundImage = ""; 
    app.innerHTML = this.responseText;
    var bk = document.getElementById('group-list');
    var tabindex = 0;
    var bn = '';

    var a = 0;
    if (bz == false)
    {
        bn += [
            '<li tabindex="' + ++tabindex + '" data-key="' + a + '">',
            '<table> <tr><td>',

            '<div class="kui-list-cont">',
            '<p class="kui-pri"><span>' + "&nbsp;Use only WIFI" + '</span></p>',
            '<p class="kui-thi">' + "&nbsp;Usefull to stop a large phone bill" + '</p>',
            '</div>',
            '</td><td width=10%>',
            '<img src="assets/img/no.png" width="30">',
            '</td></tr></table>',

            '</li>'
        ].join('');
    }
    else
    {
        bn += [
            '<li tabindex="' + ++tabindex + '" data-key="' + a + '">',
            '<table> <tr><td>',

            '<div class="kui-list-cont">',
            '<p class="kui-pri"><span>' + "&nbsp;Use only WIFI" + '</span></p>',
            '<p class="kui-thi">' + "&nbsp;Usefull to stop a large phone bill" + '</p>',
            '</div>',
            '</td><td width=10%>',
            '<img src="assets/img/yes.png" width="30">',
            '</td></tr></table>',
            '</li>'
        ].join('');

    }
    if (dA)
    {
        bn += [
            '<li tabindex="' + ++tabindex + '" data-key="' + a + '">',
            '<table> <tr><td>',

            '<div class="kui-list-cont">',
            '<p class="kui-pri"><span>' + "&nbsp;Give warning" + '</span></p>',
            '<p class="kui-thi">' + "&nbsp;if VNC server screen is large" + '</p>',
            '</div>',
            '</td><td width=10%>',
            '<img src="assets/img/yes.png" width="30">',
            '</td></tr></table>',

            '</li>'
        ].join('');
    }
    else
    {
        bn += [
            '<li tabindex="' + ++tabindex + '" data-key="' + a + '">',
            '<table> <tr><td>',

            '<div class="kui-list-cont">',
                        '<p class="kui-pri"><span>' + "&nbsp;Give warning" + '</span></p>',
            '<p class="kui-thi">' + "&nbsp;if VNC server screen is large" + '</p>',
            '</div>',
            '</td><td width=10%>',
            '<img src="assets/img/no.png" width="30">',
            '</td></tr></table>',
            '</li>'
        ].join('');

    }



    switch (dp)
    {
        case 1:
            bn += [
                '<li tabindex="' + ++tabindex + '" data-key="' + a + '">',
                '<div class="kui-list-cont">',
                '<p class="kui-pri"><span>' + "&nbsp;Mac keyboard" + '</span></p>',
                '<p class="kui-thi">' + "&nbsp;US" + '</p>',
                '</div>',
                '</li>'
            ].join('');
            break;
        case 2:
            bn += [
                '<li tabindex="' + ++tabindex + '" data-key="' + a + '">',
                '<div class="kui-list-cont">',
                '<p class="kui-pri"><span>' + "&nbsp;Mac keyboard" + '</span></p>',
                '<p class="kui-thi">' + "&nbsp;Danish" + '</p>',
                '</div>',
                '</li>'
            ].join('');
            break;
        case 3:

            bn += [
                '<li tabindex="' + ++tabindex + '" data-key="' + a + '">',
                '<div class="kui-list-cont">',
                '<p class="kui-pri"><span>' + "&nbsp;Mac keyboard" + '</span></p>',
                '<p class="kui-thi">' + "&nbsp;French" + '</p>',
                '</div>',
                '</li>'
            ].join('');
            break;
        case 4:

            bn += [
                '<li tabindex="' + ++tabindex + '" data-key="' + a + '">',
                '<div class="kui-list-cont">',
                '<p class="kui-pri"><span>' + "&nbsp;Mac keyboard" + '</span></p>',
                '<p class="kui-thi">' + "&nbsp;German" + '</p>',
                '</div>',
                '</li>'
            ].join('');
            break;
        case 5:

            bn += [
                '<li tabindex="' + ++tabindex + '" data-key="' + a + '">',
                '<div class="kui-list-cont">',
                '<p class="kui-pri"><span>' + "&nbsp;Mac keyboard" + '</span></p>',
                '<p class="kui-thi">' + "&nbsp;Spanish" + '</p>',
                '</div>',
                '</li>'
            ].join('');
            break;
        case 6:

            bn += [
                '<li tabindex="' + ++tabindex + '" data-key="' + a + '">',
                '<div class="kui-list-cont">',
                '<p class="kui-pri"><span>' + "&nbsp;Mac keyboard" + '</span></p>',
                '<p class="kui-thi">' + "&nbsp;Canada / French" + '</p>',
                '</div>',
                '</li>'
            ].join('');
            break;
    } 




    bk.innerHTML = bn;
    items = bk.getElementsByTagName('li');
    if (bm == 0) bG = 0;
    bm = 0;
    cf = items.length;
    items[bG].focus();

}

function fE()
{
    
    document.body.style.backgroundImage = ""; 
    app.innerHTML = this.responseText;
    var bk = document.getElementById('group-list');
    var tabindex = 0;
    var bn = '';

    var a = 0;
    bn += [
            '<li tabindex="' + ++tabindex + '" data-key="' + a + '">',
            '<table> <tr><td>',

            '<div class="kui-list-cont">',
            '<p class="kui-pri"><span>' + "&nbsp;VNC Server IP" + '</span></p>',
            '<input id="serverip" class="kui-input" style="height:30px;">',
            '</div>',
            '</td><td width=10%>',
            '</td></tr></table>',

            '</li>'
    ].join('');

    bn += [
      '<li tabindex="' + ++tabindex + '" data-key="' + a + '">',
      '<table> <tr><td>',

      '<div class="kui-list-cont">',
      '<p class="kui-pri"><span>' + "&nbsp;VNC Server Port" + '</span></p>',
      '<input id="serverport" kaiosbug_type="number" class="kui-input" style="height:30px;">',
      '</div>',
      '</td><td width=10%>',
      '</td></tr></table>',

      '</li>'
  ].join('');

    bn += [
        '<li tabindex="' + ++tabindex + '" data-key="' + a + '">',
        '<table> <tr><td>',

        '<div class="kui-list-cont">',
        '<p class="kui-pri"><span>' + "&nbsp;Password (#=none)" + '</span></p>',
        '<input id="vncpassword" type="password" class="kui-input" style="height:30px;">',
        '</div>',
        '</td><td width=10%>',
        '</td></tr></table>',

        '</li>'
    ].join('');

    if (J.charAt(0) == '0')
    {
        bn += [
            '<li tabindex="' + ++tabindex + '" data-key="' + a + '">',
            '<table> <tr><td>',

            '<div class="kui-list-cont">',
            '<p class="kui-pri"><span>' + "&nbsp;View only mode" + '</span></p>',
            '<p class="kui-thi">' + "&nbsp;" + '</p>',
            '</div>',
            '</td><td width=10%>',
            '<img src="assets/img/no.png" width="30">',
            '</td></tr></table>',

            '</li>'
        ].join('');
    }
    else
    {
        bn += [
            '<li tabindex="' + ++tabindex + '" data-key="' + a + '">',
            '<table> <tr><td>',

            '<div class="kui-list-cont">',
            '<p class="kui-pri"><span>' + "&nbsp;View only mode " + '</span></p>',
            '<p class="kui-thi">' + "&nbsp;" + '</p>',
            '</div>',
            '</td><td width=10%>',
            '<img src="assets/img/yes.png" width="30">',
            '</td></tr></table>',
            '</li>'
        ].join('');

    }


    if (am.charAt(0) == '0')
    {
        bn += [
            '<li tabindex="' + ++tabindex + '" data-key="' + a + '">',
            '<table> <tr><td>',

            '<div class="kui-list-cont">',
            '<p class="kui-pri"><span>' + "&nbsp;Mac OS " + '</span></p>',
            '<p class="kui-thi">' + "&nbsp;Using Mac screen sharing" + '</p>',
            '</div>',
            '</td><td width=10%>',
            '<img src="assets/img/no.png" width="30">',
            '</td></tr></table>',

            '</li>'
        ].join('');
    }
    else
    {
        bn += [
            '<li tabindex="' + ++tabindex + '" data-key="' + a + '">',
            '<table> <tr><td>',

            '<div class="kui-list-cont">',
            '<p class="kui-pri"><span>' + "&nbsp;Mac OS " + '</span></p>',
            '<p class="kui-thi">' + "&nbsp;Using Mac screen sharing" + '</p>',
            '</div>',
            '</td><td width=10%>',
            '<img src="assets/img/yes.png" width="30">',
            '</td></tr></table>',
            '</li>'
        ].join('');

    }
    bn += [
     '<li tabindex="' + ++tabindex + '" data-key="' + a + '">',
     '<table> <tr><td>',

     '<div class="kui-list-cont">',
     '<p class="kui-pri"><span>' + "&nbsp;Mac User" + '</span></p>',
     '<input id="macuser" class="kui-input" style="height:30px;">',
     '</div>',
     '</td><td width=10%>',
     '</td></tr></table>',

     '</li>'
    ].join('');
    bn += [
     '<li tabindex="' + ++tabindex + '" data-key="' + a + '">',
     '<table> <tr><td>',

     '<div class="kui-list-cont">',
     '<p class="kui-pri"><span>' + "&nbsp;Mac Password" + '</span></p>',
     '<input id="macpassword" type="password" class="kui-input" style="height:30px;">',
     '</div>',
     '</td><td width=10%>',
     '</td></tr></table>',

     '</li>'
     ].join('');

    bk.innerHTML = bn;
    items = bk.getElementsByTagName('li');
    if (bm == 0) bG = 0;
    bm = 0;
    cf = items.length;
    items[bG].focus();
    document.getElementById('serverip').value = bh;
    document.getElementById('serverport').value = bP;
    document.getElementById('vncpassword').value = aS;
    document.getElementById('macuser').value = aq;
    document.getElementById('macpassword').value = aI;
    var bD = document.getElementById('serverip');
    bD.addEventListener('input', (ao) =>
    {

        bh = ao.target.value.replace(";", "");
    });
    var fM = document.getElementById('serverport');
    fM.addEventListener('input', (ao) =>
    {

        var a = ao.target.value;
        bP = "";
        for (var c = 0; c < a.length; c++)
        {
            var ch = a[c];
            if (ch >= '0' && ch <= '9')
                bP = bP + ch;
        }
        document.getElementById('serverport').value = bP;
    });
    var eV = document.getElementById('vncpassword');
    eV.addEventListener('input', (ao) =>
    {
        aS = ao.target.value.replace(";", "");
    });
    var fC = document.getElementById('macuser');
    fC.addEventListener('input', (ao) =>
    {
        aq = ao.target.value.replace(";", "");
    });
    var eP = document.getElementById('macpassword');
    eP.addEventListener('input', (ao) =>
    {
        aI = ao.target.value.replace(";", "");
    });
    dN();
}



function fK()
{

    

    app = document.getElementById('kui-app');
    current = 'settings';

    var xhr = new XMLHttpRequest();
    xhr.open('GET', dU);
    xhr.send();
    xhr.addEventListener('load', eT);
}

function cb()
{

    

    app = document.getElementById('kui-app');
    current = 'config';

    var xhr = new XMLHttpRequest();
    xhr.open('GET', hf);
    xhr.send();
    xhr.addEventListener('load', fE);
}

function ek()
{
    
    document.body.style.backgroundImage = ""; 
    app.innerHTML = this.responseText;
    var bk = document.getElementById('group-list');
    var tabindex = 0;
    var bn = '';

   var a = 0;
    bn += [
            '<li tabindex="' + ++tabindex + '" data-key="' + a + '">',
            '<table> <tr><td>',

            '<div class="kui-list-cont">',
            '<p class="kui-pri"><span>' + "&nbsp;Text" + '</span></p>',
            '<input id="mytext"   autocapitalize="none" class="kui-input" style="height:30px">',
            '</div>',
            '</td><td width=10%>',
            '</td></tr></table>',
        
            '</li>'
    ].join('');
    if (aH == false)
    {
        bn += [
            '<li tabindex="' + ++tabindex + '" data-key="' + a + '">',
            '<table> <tr><td>',

            '<div class="kui-list-cont">',
            '<p class="kui-pri"><span>' + "&nbsp;Ctrl" + '</span></p>',
            '<p class="kui-thi">' + "&nbsp;" + '</p>',
            '</div>',
            '</td><td width=10%>',
            '<img src="assets/img/no.png" width="30">',
            '</td></tr></table>',

            '</li>'
        ].join('');
    }
    else
    {
        bn += [
            '<li tabindex="' + ++tabindex + '" data-key="' + a + '">',
            '<table> <tr><td>',

            '<div class="kui-list-cont">',
            '<p class="kui-pri"><span>' + "&nbsp;Ctrl" + '</span></p>',
            '<p class="kui-thi">' + "&nbsp;" + '</p>',
            '</div>',
            '</td><td width=10%>',
            '<img src="assets/img/yes.png" width="30">',
            '</td></tr></table>',
            '</li>'
        ].join('');

    }
    if (am.charAt(0) == '1') {
        if (bQ == false) {
            bn += [
                '<li tabindex="' + ++tabindex + '" data-key="' + a + '">',
                '<table> <tr><td>',

                '<div class="kui-list-cont">',
                '<p class="kui-pri"><span>' + "&nbsp;Option" + '</span></p>',
                '<p class="kui-thi">' + "&nbsp;" + '</p>',
                '</div>',
                '</td><td width=10%>',
                '<img src="assets/img/no.png" width="30">',
                '</td></tr></table>',

                '</li>'
            ].join('');
        }
        else {
            bn += [
                '<li tabindex="' + ++tabindex + '" data-key="' + a + '">',
                '<table> <tr><td>',

                '<div class="kui-list-cont">',
                '<p class="kui-pri"><span>' + "&nbsp;Option" + '</span></p>',
                '<p class="kui-thi">' + "&nbsp;" + '</p>',
                '</div>',
                '</td><td width=10%>',
                '<img src="assets/img/yes.png" width="30">',
                '</td></tr></table>',
                '</li>'
            ].join('');

        }
        if (aJ == false) {
            bn += [
                '<li tabindex="' + ++tabindex + '" data-key="' + a + '">',
                '<table> <tr><td>',

                '<div class="kui-list-cont">',
                '<p class="kui-pri"><span>' + "&nbsp;Apple (cmd)" + '</span></p>',
                '<p class="kui-thi">' + "&nbsp;" + '</p>',
                '</div>',
                '</td><td width=10%>',
                '<img id="altimg" src="assets/img/no.png" width="30">',
                '</td></tr></table>',

                '</li>'
            ].join('');
        }
        else {
            bn += [
                '<li tabindex="' + ++tabindex + '" data-key="' + a + '">',
                '<table> <tr><td>',

                '<div class="kui-list-cont">',
                '<p class="kui-pri"><span>' + "&nbsp;Apple (cmd)" + '</span></p>',
                '<p class="kui-thi">' + "&nbsp;" + '</p>',
                '</div>',
                '</td><td width=10%>',
                '<img id="altimg" src="assets/img/yes.png" width="30">',
                '</td></tr></table>',
                '</li>'
            ].join('');

        }



    }
    else {
        
        if (ax == false) {
            bn += [
                '<li tabindex="' + ++tabindex + '" data-key="' + a + '">',
                '<table> <tr><td>',

                '<div class="kui-list-cont">',
                '<p class="kui-pri"><span>' + "&nbsp;Alt" + '</span></p>',
                '<p class="kui-thi">' + "&nbsp;" + '</p>',
                '</div>',
                '</td><td width=10%>',
                '<img src="assets/img/no.png" width="30">',
                '</td></tr></table>',

                '</li>'
            ].join('');
        }
        else {
            bn += [
                '<li tabindex="' + ++tabindex + '" data-key="' + a + '">',
                '<table> <tr><td>',

                '<div class="kui-list-cont">',
                '<p class="kui-pri"><span>' + "&nbsp;Alt" + '</span></p>',
                '<p class="kui-thi">' + "&nbsp;" + '</p>',
                '</div>',
                '</td><td width=10%>',
                '<img src="assets/img/yes.png" width="30">',
                '</td></tr></table>',
                '</li>'
            ].join('');

        }

    }

  bk.innerHTML = bn;
    items = bk.getElementsByTagName('li');
  if (bm == 0) bG = 0;
    bm = 0;
    cf = items.length;
   

    var bD = document.getElementById('mytext');
    if (bZ.length == 0) bZ = "" + gl;
    bD.value = bZ;

    hh(bD);
    bD.addEventListener('input', (ao) =>
    {
      
        bZ = ao.target.value;
        if (bZ.length == 0) {
            bZ = "" + gl;
            bD.value = bZ;
        }
        if (aH) {
            if (bZ.length > 2) {
                bZ = "" + gl + bZ.substring(bZ.length - 1);
                ao.target.value = bZ;
            }
        }
        dN();
    });
    if (bG == 0)
        bD.focus();
    else
        items[bG].focus();
    dN();
}

function hh(end) {
   

    var T = end.value.length;
 end.focus();
        end.setSelectionRange(T, T);
    
}

function cl()
{

    

    app = document.getElementById('kui-app');
    current = "addtext";

    var xhr = new XMLHttpRequest();
    xhr.open('GET', en);
    xhr.send();
    xhr.addEventListener('load', ek);
}
function fs()
{

    

    aN = localStorage.getItem('wifionly');
    if (typeof aN == 'undefined') aN = null;
    if (aN != null)
    {
        if (aN.localeCompare("true") == 0)
            bz = true;
        else
            bz = false;
    }
   
    var aN = localStorage.getItem('config_0');
    if (aN == null)
    {
       
        bI = [];
        }
    else
    {
        
        var eb = true;
        for (var a = 0; a < 20 && eb; a++)
        {
           
            var y = localStorage.getItem('config_' + a);
            

            if (y == null)
                eb = false;
            else
                bI.push(y);
        }
        }
}
function eS()
{



    localStorage.setItem('wifionly', bz.toString());

    if (bI != null)
    {
        
        dX();
        for (var a = 0; a < 20 && bI[a] != null && a < bI.length; a++)
        {
            
            localStorage.setItem('config_' + a, bI[a]);
        }

    }
    else
    {
        

    }

}
function dX()
{
    for (var a = 0; a < 20; a++)
    {
        localStorage.removeItem('config_' + a);
    }
}
function hi()
{
    

    app = document.getElementById('kui-app');
    current = 'vncmenu';

    var xhr = new XMLHttpRequest();
    xhr.open('GET', fJ);
    xhr.send();
    xhr.addEventListener('load', eC);
}
function eC()
{
    app.innerHTML = this.responseText;

    var bk = document.getElementById('menumainlist');
    bi = bk.getElementsByTagName('li');
    ak = 0;
    cZ = bi.length;
    bi[ak].focus();
}
function df()
{
    app.innerHTML = this.responseText;
}
function hI()
{
    
    document.body.style.backgroundImage = ""; 
    app = document.getElementById('kui-app');
    current = 'about';

    var xhr = new XMLHttpRequest();
    xhr.open('GET', fh);
    xhr.send();
    xhr.addEventListener('load', df);
}
function hb()
{
    
    document.body.style.backgroundImage = ""; 
    app = document.getElementById('kui-app');
    current = 'keyboard';

    var xhr = new XMLHttpRequest();
    xhr.open('GET', hs);
    xhr.send();
    xhr.addEventListener('load', df); 
}



function bE()
{

    
    ho = 0;
    app = document.getElementById('kui-app');
    current = "main";

    var xhr = new XMLHttpRequest();
    xhr.open('GET', hm);
    xhr.send();
    xhr.addEventListener('load', fe);
}
function ht() {
    setTimeout(function () {
        L();
    }, 200);
}
function L()
{

    
    ho = 0;
    app = document.getElementById('kui-app');
    current = "vnc";

    var xhr = new XMLHttpRequest();
    if (cn)
        xhr.open('GET', fu);
    else
        xhr.open('GET', fn);
    xhr.send();
    xhr.addEventListener('load', dY);
}
function dY()
{
    app.innerHTML = this.responseText;
    var target = document.getElementById('my_canvas');
    var ctx = target.getContext("2d");

    if (socket == null)
    {
        ctx.clearRect(0, 0, target.width, target.height);
        dH = 10;
        target.width = 600;
        target.height = 600;
        target.style.height = 600;
        target.style.width = 600;

        ctx.font = "28px bold arial,serif";
        ctx.fillStyle = "#000000"; 

        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        gT();
    }
    else
        ab();
    aC();


}


function fe()
{

    app.innerHTML = this.responseText;
    var bk = document.getElementById('group-list');
   
    var bn = '';
    var tabindex = 0;
    for (var a = 0; a < 9999 && a < bI.length && bI[a] != null; a++)
    {
        var t = bI[a];
    var be = t.split(";");
        bn += [
            '<li tabindex="' + ++tabindex + '">',
            '<img src="assets/img/Computer.png" width="30">',

            '<div class="kui-list-cont">',
            '<p class="nowrap" class="kui-pri"><span>&nbsp;' + be[0] + '</span></p>',
            '<p class="kui-sec">&nbsp;' + be[1] + '</p>',
            '</div>',
            '</li>'
        ].join('');
    }
   
    
    bk.innerHTML = bn;
    items = bk.getElementsByTagName('li');
    bG = 0;
    cf = items.length;
    items[bG].focus();
   

    aC();
    

}




function df()
{
    app.innerHTML = this.responseText;
}

function fV()
{
    
    
}

var fA = Date.now();  
function al()
{

    var millis = Date.now() - fA;
    if (millis < 300)
        bq = bq * 2;
    else
        bq = 4;

    if (bq > 50) bq = 50;
    fA = Date.now();
}
function dg()
{
    if (cn)
        cn = false;
    else
        cn = true;
    L();
    ab();
}




function handleKeyDown(e)
{
    
    
    if (e.key == "MicrophoneToggle") {
       
        e.preventDefault();
        e.stopPropagation();
        return;
    }
    if (current == "config")
    {
        switch (e.key)
        {
            case 'ArrowUp':
                aL(-1);
                dN();
                break;
            case 'ArrowDown':
                aL(1);
                dN();
                break;

            case 'Backspace':
                e.preventDefault();
                e.stopPropagation();

                bE();
                break;
            case 'SoftLeft': 
                bE();
                break;
            case 'SoftRight': 
                              if (bh.length == 0)
                {
                    alert("IP address cannot be empty " + bh);
                    break;
                }
                if (bP.length == 0)
                {
                    alert("Port value cannot be empty. Many VNC servers uses port 5900");
                    break;
                }
                if (am.charAt(0) == '0' && aS.length == 0)
                {
                    alert("VNC server password cannot be empty");
                    break;
                }
                if (am.charAt(0) == '1' && aI.length == 0)
                {
                    alert("Mac password field is empty");
                    break;
                }
                if (am.charAt(0) == '1' && aq.length == 0)
                {
                    alert("Mac user field is empty");
                    break;
                }
                var s = "" + bh + ";" + bP + ";" + aS + ";" + aq + ";" + aI + ";" + am + ";" + J;
                if (de == -1)
                    bI.push(s);
                else
                    bI[de] = s;
                eS();
                bE();
                break;
            case 'Enter':
                switch (bG)
                {
                    case 0:  
                        var bD = document.getElementById('serverip');
                        bD.focus();
                        break;
                    case 1:  
                        var bD = document.getElementById('serverport');
                        bD.focus();
                        break;
                    case 2:  
                        var bD = document.getElementById('vncpassword');
                        bD.focus();
                        break;
                    case 3: 
                        if (J.charAt(0) == '1')
                            J = "0";
                        else
                            J = "1";

                        bm = bG;
                        setTimeout(function () {
                            cb();
                        }, 200);
                        break;
                    case 4: 
                        if (am.charAt(0) == '1')
                            am = "0";
                        else
                            am = "1";
                        bm = bG;
                        setTimeout(function () {
                            cb();
                        }, 200);
                        break;

                    case 5:  
                        var bD = document.getElementById('macuser');
                        bD.focus();
                        break;
                    case 6:  
                        var bD = document.getElementById('macpassword');
                        bD.focus();
                        break;

                } 
                break;

        } 
        return;
    }




    if (current == "settings")
    {
        switch (e.key)
        {
            case 'ArrowUp':
                aL(-1);
                break;
            case 'ArrowDown':
                aL(1);
                break;

            case 'Backspace':
                e.preventDefault();
                e.stopPropagation();

                bE();
                break;
            case 'SoftLeft':
                
                bE();

                break;
            case 'Enter':
                

                switch (bG)
                {
                    case 0:
                        if (bz == true)
                            bz = false;
                        else
                            bz = true;
                        break;

                    case 1:
                        if (dA == true)
                            dA = false;
                        else
                            dA = true;
                        break;


                    case 2:
                        dp++;
                        if (dp > 6)
                            dp = 1;
                        break;

                } 
                eS();
                bm = 1; 
                setTimeout(function () {
                    fK();
                }, 200);

                break;

        } 
        return;
    }

    if (current == "vncmenu")
    {
        switch (e.key)
        {
            case '#':
                setTimeout(function () {
                    fv();
                }, 200);
                break;
            case '0':
                setTimeout(function () {
                    fD();
                }, 200);
                
                break;
            case '*':
                dg();
                break;
            case '1':
                if (bw < 4)
                    bw += 0.5;
               
                setTimeout(function () {
                    L();
                }, 200);

                ab();
                break;
            case '2':
                e.preventDefault();
                e.stopPropagation();
                bY = true;
                setTimeout(function () {
                    cl();
                }, 200);

                
                break;
            case '5': 
                if (J.charAt(0) == '1')
                {
                    alert("Input rejected. VNC session is defined as view only");
                    break;
                }
                K(0xff0d, true);
                K(0xff0d, false);

                setTimeout(function () {
                    L();
                }, 200);

                break;
            case '3':
                if (bw > 1)
                    bw -= 0.5;
                setTimeout(function () {
                    L();
                }, 200);

                ab();

                break;
            case '7':
                if (J.charAt(0) == '1')
                {
                    alert("Input rejected. VNC session is defined as view only");
                    break;
                }

                for (var a = 0; a < 8; a++) dB(true);
                setTimeout(function () {
                    L();
                }, 200);

                break;
            case '8':
                if (J.charAt(0) == '1')
                {
                    alert("Input rejected. VNC session is defined as view only");
                    break;
                }
                for (var a = 0; a < 8; a++) dB(false);
                setTimeout(function () {
                    L();
                }, 200);

                break;
            case '6':
                if (J.charAt(0) == '1')
                {
                    alert("Input rejected. VNC session is defined as view only");
                    break;
                }
                by(aM, aK, true);
                by(aM, aK, false);
                setTimeout(function () {
                    L();
                }, 200);

                break;
            case '9':
                dw();
                setTimeout(function () {
                    L();
                }, 200);

                ab();
                break;
            case '4':
                if (J.charAt(0) == '1')
                {
                    alert("Input rejected. VNC session is defined as view only");
                    break;
                }
                if (bH)
                {
                    alert("Cannot drag mouse in scroll mode");
                    break;
                }
                if (bA)
                {
                    bV(aM, aK, false);
                    bA = false;
                }
                else
                {
                    bV(aM, aK, true);
                    bA = true;
                }
                aC();
                setTimeout(function () {
                    L();
                }, 200);

                break;
            case 'ArrowUp':
                aj(-1);
                break;
            case 'ArrowDown':
                aj(1);
                break;
            case 'Backspace':
                e.preventDefault();
                e.stopPropagation();
                setTimeout(function () {
                    L();
                }, 200);

                break;
            case 'SoftLeft':  
                setTimeout(function () {
                    L();
                }, 200);

                break;
            case 'SoftRight':
                break;
            case 'Enter':
                switch (ak)
                {
                    case 0: 
                        db();
                        bE(); 
                        break;
                    case 1:
                        if (J.charAt(0) == '1')
                        {
                            alert("Input rejected. VNC session is defined as view only");
                            break;
                        }
                        
                        else {
                            setTimeout(function () {
                                fD();
                            }, 200);
                        }
                        break;
                    case 2: 
                        if (J.charAt(0) == '1') {
                            alert("Input rejected. VNC session is defined as view only");
                            break;
                        }
                        else {
                            setTimeout(function () {
                                fv();
                            }, 200);
                        }
                        break;
                    case 3: 
                        dg();
                        break;
                    case 4:
                        if (bw < 4)
                            bw += 0.5;
                        setTimeout(function () {
                            L();
                            ab();
                        }, 200);
                       
                       
                        break;
                    case 5:
                        if (bw > 1)
                            bw -= 0.5;
                        setTimeout(function () {
                            L();
                            ab();
                        }, 200);
                      

                        break;
                    case 6:
                        if (J.charAt(0) == '1')
                        {
                            alert("Input rejected. VNC session is defined as view only");
                            break;
                        }
                        e.preventDefault();
                        e.stopPropagation();
                        bY = true;
                        setTimeout(function () {
                            cl();
                        }, 200);
                        
                        break;
                    case 7: 
                        if (J.charAt(0) == '1')
                        {
                            alert("Input rejected. VNC session is defined as view only");
                            break;
                        }
                        if (bH)
                        {
                            alert("Cannot drag mouse in scroll mode");
                            break;
                        }
                        if (bA)
                        {
                            bV(aM, aK, false);
                            bA = false;
                        }
                        else
                        {
                            bV(aM, aK, true);
                            bA = true;
                        }
                        setTimeout(function () {
                            L();
                            ab();
                        }, 200);
                        aC();
                        break;
                    case 8: 
                        if (J.charAt(0) == '1')
                        {
                            alert("Input rejected. VNC session is defined as view only");
                            break;
                        }
                        K(0xff0d, true);
                        K(0xff0d, false);
                        setTimeout(function () {
                            L();
                            ab();
                        }, 200);
                        break;
                    case 9:
                        if (J.charAt(0) == '1')
                        {
                            alert("Input rejected. VNC session is defined as view only");
                            break;
                        }
                        by(aM, aK, true);
                        by(aM, aK, false);
                        setTimeout(function () {
                            L();
                            ab();
                        }, 200);
                        break;

                    case 10:
                        if (J.charAt(0) == '1')
                        {
                            alert("Input rejected. VNC session is defined as view only");
                            break;
                        }
                        for (var a = 0; a < 8; a++) dB(true);
                        setTimeout(function () {
                            L();
                            ab();
                        }, 200);
                        break;
                    case 11:
                        if (J.charAt(0) == '1')
                        {
                            alert("Input rejected. VNC session is defined as view only");
                            break;
                        }
                        for (var a = 0; a < 8; a++) dB(false);
                        setTimeout(function () {
                            L();
                            ab();
                        }, 200);
                        break;

                    case 12:
                        dw();
                        setTimeout(function () {
                            L();
                            ab();
                        }, 200);
                        break;
                    case 13:
                        
                        for (let i = 0; i < bM.length; i++)
                        {
                            bM[i] = Math.random() * 0xFFFFFF + 0xFF000000;
                        }
                       
                        ca(0, 0,
       V,
       ae, 0);
                        setTimeout(function () {
                            L();
                            ab();
                        }, 200);
                        break;

                    case 14: 
                        hb();
                        break;
                }
                break;
        } 
        return;

    }
    if (current == "keys")
    {

        switch (e.key)
        {
            case '*':
                if (am.charAt(0) == '1')
                    O("APPLE");
                else
                    O("WIN");
                ht();
                break;
            case '#':
                O("DELETE");
                ht();

                break;
            case '0':
                O("BACKSPACE");
                ht();
                break;
            case '1':
                O("TAB");
                ht();

                break;
            case '2':
                O("UP");
                ht();

                break;
            case '3':
                O("ESC");
                ht();

                break;
            case '4':

                O("LEFT");
                ht();
                break;
            case '5':
                O("ENTER");
                ht();
                break;
            case '6':
                O("RIGHT");
                ht();

                break;
            case '7':
                O("CTRL");
                ht();

                break;
            case '8':
                O("DOWN");
                ht();

                break;
            case '9':
                if (am.charAt(0) == '1')
                    O("OPTIONS");
                else
                    O("ALT");
                ht();

                break;
            case 'ArrowUp':
                aj(-1);
                break;
            case 'ArrowDown':
                aj(1);
                break;
            case 'Backspace':
                e.preventDefault();
                e.stopPropagation();
                ht();

                break;
            case 'SoftLeft':  
                ht();

                break;
            case 'SoftRight':

                break;
            case 'Enter':
                switch (ak)
                {
                    case 0:
                        O("BACKSPACE");
                        ht();

                        break;
                    case 1:
                        O("TAB");
                        ht();

                        break;
                    case 2:
                        O("UP");
                        ht();

                        break;
                    case 3:
                        O("ESC");
                        ht();

                        break;
                    case 4:
                        O("LEFT");
                        ht();
                        break;
                    case 5:
                        O("ENTER");
                        ht();

                        break;
                    case 6:
                        O("RIGHT");
                        ht();

                        break;
                    case 7:
                        O("CTRL");
                        ht();

                        break;
                    case 8:
                        O("DOWN");
                        ht();

                        break;
                    case 9:
                        if (am.charAt(0) == '1')
                            O("OPTIONS");
                        else
                            O("ALT");
                        ht();
                        break;
                    case 10:
                        if (am.charAt(0) == '1')
                            O("APPLE");
                        else
                            O("WIN");

                        ht();
                        break;
                    case 11:
                        O("DELETE");
                        ht();
                        break;
                    case 12:
                        O("INSERT");
                        ht();
                        break;
                    case 13:
                        O("PGUP");
                        ht();
                        break;
                    case 14:
                        O("PGDN");
                        ht();
                        break;
                } 
                break;
        } 
        return;

    } 



    if (current == "fxx")
    {
        switch (e.key)
        {
            case '*':
                O("F10");
                ht();
                break;
            case '#':
                O("F11");
                ht();
                break;
            case '0':
                O("ALT+F4");
                ht();
                break;
            case '1':
                O("F1");
                ht();
                break;
            case '2':
                O("F2");
                ht();
                break;
            case '3':
                O("F3");
                ht();
                break;
            case '4':
                O("F4");
                ht();
                break;
            case '5':
                O("F5");
                ht();
                break;
            case '6':
                O("F6");
                ht();
                break;
            case '7':
                O("F7");
                ht();
                break;
            case '8':
                O("F8");
                ht();
                break;
            case '9':
                O("F9");
                ht();
                break;
            case 'ArrowUp':
                aj(-1);
                break;
            case 'ArrowDown':
                aj(1);
                break;
            case 'Backspace':
                e.preventDefault();
                e.stopPropagation();
                ht();
                break;
            case 'SoftLeft':  
                ht();
                break;
            case 'SoftRight':

                break;
            case 'Enter':
                switch (ak)
                {
                    case 0:
                        O("ALT+F4");
                        ht();
                        break;
                    case 1:
                        O("F1");
                        ht();
                        break;
                    case 2:
                        O("F2");
                        ht();
                        break;
                    case 3:
                        O("F3");
                        ht();
                        break;
                    case 4:
                        O("F4");
                        ht();
                        break;
                    case 5:
                        O("F5");
                        ht();
                        break;
                    case 6:
                        O("F6");
                        ht();
                        break;
                    case 7:
                        O("F7");
                        ht();
                        break;
                    case 8:
                        O("F8");
                        ht();
                        break;
                    case 9:
                        O("F9");
                        ht();
                        break;
                    case 10:
                        O("F10");
                        ht();
                        break;
                    case 11:
                        O("F11");
                        ht();
                        break;
                    case 12:
                        O("F11");
                        ht();
                        break;
                    case 13:
                        O("CTRL+ALT+DEL");
                        ht();
                        break;
                } 
                break;
        } 
        return;

    } 


    if (current == "addtext")
    {
        switch (e.key)
        {
            case 'ArrowLeft':
               
                var bD = document.getElementById('mytext');
             if (bD.selectionStart <= 1) {
                    e.preventDefault();
                    e.stopPropagation();
               }
                break;
            case 'ArrowUp':
                aL(-1);
                if (bG == 0) {
                    setTimeout(function () {
                       var bD = document.getElementById('mytext');
                       bD.focus();
                       hh(bD);
                       }, 200);


                   
                }
                dN();
                break;
            case 'ArrowDown':
                aL(1);
                if (bG == 0) {
                    var bD = document.getElementById('mytext');
                    bD.focus();
                    hh(bD);
                }
                dN();
                break;

            case 'Backspace':
                e.preventDefault();
                e.stopPropagation();
                ht();
                break;
            case 'SoftLeft':
                
                ht();
                break;
            case 'Enter': 
          e.preventDefault();
                e.stopPropagation();
               
                switch (bG) {
                    case 0:
                        var bD = document.getElementById('mytext');
                       

                        if (bZ.length > 1) {

                       for (var a = 1; a < bZ.length; a++) {
                                hF(bZ.charCodeAt(a));
                            }
                            ht();
                        }
                        else {
                            alert("The text field is empty. Nothing to send");
                            dN();
                        }
                        break; 
                    case 1:
                        if (aH == true) {
                            aH = false;
                            document.images[0].src = "assets/img/no.png";
                            K(0xffe3, false);
                       }
                        else {
                            aH = true;
                            document.images[0].src = "assets/img/yes.png";
                            K(0xffe3, true);
                        }
                        if (aH) {
                          
                            if (bZ.length > 2) {
                                bZ = "" + gl + bZ.substring(bZ.length - 1);
                                var bD = document.getElementById('mytext');
                                bD.value = bZ;
                            }
                           
                        }

                        break;
                    case 2:
                        if (am.charAt(0) == '0') {
                            if (ax == true) {
                                ax = false;
                                document.images[1].src = "assets/img/no.png";
                                K(0xffe9, false);
                            }
                            else {
                                ax = true;
                                document.images[1].src = "assets/img/yes.png";
                                K(0xffe9, true);
                            }
                            if (ax) {
                                if (bZ.length > 2) {
                                    bZ = "" + gl+ bZ.substring(bZ.length - 1);
                                    var bD = document.getElementById('mytext');
                                    bD.value = bZ;
                                }
                            }
                            break;
                        }
                        else {
                            if (bQ == true) {
                                bQ = false;
                                K(0xffe7, false);
                                document.images[1].src = "assets/img/no.png";

                            }
                            else {
                                bQ = true;
                                document.images[1].src = "assets/img/yes.png";

                                K(0xffe7, true);
                            }
                            if (bQ) {
                                if (bZ.length > 2) {
                                    bZ = "" + gl + bZ.substring(bZ.length - 1);
                                    var bD = document.getElementById('mytext');
                                    bD.value = bZ;
                                }
                            }
                            break;
                        }
                    case 3:
                        if (aJ == true) {
                            aJ = false;
                            K(0xffe9, false);
                        }
                        else {
                            aJ = true;
                            K(0xffe9, true);
                        }
                        if (aJ) {
                            if (bZ.length > 2) {
                                bZ = "" + gl + bZ.substring(bZ.length - 1);
                                var bD = document.getElementById('mytext');
                                bD.value = bZ;
                            }
                        }
                        if (aJ)
                            document.images[2].src = "assets/img/yes.png";
                        else
                            document.images[2].src = "assets/img/no.png";
                        break;
                } 
              
                break;
            case 'SoftRight':
                bZ = "";
                document.getElementById('mytext').value = bZ = "" + gl;
                break;

        } 
        return;
    }



    if (current == "vnc")
    {
 if (ah == false)
        {
            switch (e.key)
            {
                case 'Backspace':
                    e.preventDefault();
                    e.stopPropagation();
                    db();
                    aC();
                    bE(); 
                    break;
                case 'Enter':
                    cK = true;
                    db();
                    aC();
                    bE(); 
                    break;
            }
            return;

        }
        switch (e.key)
        {
            case '#':
                if (J.charAt(0) == '1') {
                    alert("Input rejected. VNC session is defined as view only");
                    break;
                }
                setTimeout(function () {
                    fv();
                }, 200);
                break;
            case '0':
                if (J.charAt(0) == '1') {
                    alert("Input rejected. VNC session is defined as view only");
                    break;
                }
                setTimeout(function () {
                    fD();
                }, 200);

                break;

            case '*': 
                dg();
                break;
            case '1':
                if (bw < 4)
                    bw += 0.5;
                ab();
                break;
            case '2':
                e.preventDefault();
                e.stopPropagation();
                setTimeout(function () {
                    cl();
                }, 200);
              
                break;
            case '5': 
                if (J.charAt(0) == '1')
                {
                    alert("Input rejected. VNC session is defined as view only");
                    break;
                }
                K(0xff0d, true);
                K(0xff0d, false);
                break;
            case '3':
                if (bw > 1)
                    bw -= 0.5;
                ab();

                break;
            case '7':
                if (J.charAt(0) == '1')
                {
                    alert("Input rejected. VNC session is defined as view only");
                    break;
                }
                for (var a = 0; a < 8; a++) dB(true);
                break;
            case '8':
                if (J.charAt(0) == '1')
                {
                    alert("Input rejected. VNC session is defined as view only");
                    break;
                }
                for (var a = 0; a < 8; a++) dB(false);
                break;
            case '6':
                if (J.charAt(0) == '1')
                {
                    alert("Input rejected. VNC session is defined as view only");
                    break;
                }
                by(aM, aK, true);
                by(aM, aK, false);

                break;
            case '9':
                if (J.charAt(0) == '1') {
                    alert("Input rejected. VNC session is defined as view only");
                    break;
                }
                dw();
                ab();
                break;
            case '4':
                if (J.charAt(0) == '1')
                {
                    alert("Input rejected. VNC session is defined as view only");
                    break;
                }
                if (bH)
                {
                    alert("Cannot drag mouse in scroll mode");
                    break;
                }
                if (bA)
                {
                    bV(aM, aK, false);
                    bA = false;
                }
                else
                {
                    bV(aM, aK, true);
                    bA = true;
                }
                aC();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                e.stopPropagation();
                if (bH)
                {
                    al();
                    bo -= bq;
                    if (bo < 0) bo = 0;
                    ab();
                }
                else
                {
                    if (J.charAt(0) == '1')
                    {
                        alert("Input rejected. VNC session is defined as view only");
                        break;
                    }
                    al();
                    aM -= bq;
                    if (aM < 0) aM = 0;
                    dG(aM, aK);
                    ab();
                }
                break;
            case 'ArrowRight':
                e.preventDefault();
                e.stopPropagation();
                if (bH)
                {
                    al();
                    bo += bq;
                    ab();
                }
                else
                {
                    if (J.charAt(0) == '1')
                    {
                        alert("Input rejected. VNC session is defined as view only");
                        break;
                    }
                    al();
                    aM += bq;
                    if (aM >= V) aM = V;
                    dG(aM, aK);
                    ab();
                }
                break;
            case 'ArrowUp':
                e.preventDefault();
                e.stopPropagation();
                if (bH)
                {
                    al();
                    bx -= bq;
                    if (bx < 0) bx = 0;
                    ab();
                }
                else
                {
                    if (J.charAt(0) == '1')
                    {
                        alert("Input rejected. VNC session is defined as view only");
                        break;
                    }
                    al();
                    aK -= bq;
                    if (aK < 0) aK = 0;
                    dG(aM, aK);
                    ab();
                }
                break;

            case 'ArrowDown':
                e.preventDefault();
                e.stopPropagation();
                if (bH)
                {
                    al();
                    bx += bq;
                    ab();
                }
                else
                {
                    if (J.charAt(0) == '1')
                    {
                        alert("Input rejected. VNC session is defined as view only");
                        break;
                    }
                    al();
                    aK += bq;
                    if (aK >= ae) aK = ae;
                    dG(aM, aK);
                    ab();
                }
                break;

            case 'SoftLeft':
                if (J.charAt(0) == '1')
                {
                    bH = true;
                    break;
                }
                if (bA)
                {
                    bV(aM, aK, false);
                    bA = false;
                    aC();
                }
                if (bH)
                    bH = false;
                else
                    bH = true;
                aC();
                break;
            case 'SoftRight':
                hi();
                break;

            case 'Backspace':
                e.preventDefault();
                e.stopPropagation();
                if (confirm("Do you really want to close the session ?")) {
                    db();
                    bE(); 
                }
                break;
            case 'Enter':
                if (J.charAt(0) == '1')
                {
                    alert("Input rejected. VNC session is defined as view only");
                    break;
                }

                if (bA)
                {
                    bV(aM, aK, false);
                    bA = false;
                    aC();
                }
                else
                {

                    if (bH)
                    {
                        bH = false;
                        aC();
                    }
                    else
                    {  
                        bV(aM, aK, true);
                        bV(aM, aK, false);

                    }
                }
                break;
        } 
        return;
    }

    if (current == "main")
    {
        switch (e.key)
        {
            case 'ArrowLeft':
                aL(-eY);
                break;
            case 'ArrowRight':
                aL(eY);
                break;
            case 'ArrowUp':
                aL(-1);
                break;
            case 'ArrowDown':
                aL(1);
                break;

            case 'SoftLeft':
                de = -1; 
                bh = "";
                bP = "5900";
                aq = "";
                aI = "";
                aS = "";
                am = "0";
                J = "0";
                cb();
                break;
            case 'SoftRight':
                setTimeout(function () {
                    fY();
                }, 200);
                
                break;

            case 'Backspace':
                fV();
                break;
            case 'Enter':
            if (items.length == 0) {
                    de = -1; 
                    bh = "";
                    bP = "5900";
                    aq = "";
                    aI = "";
                    aS = "";
                    am = "0";
                    J = "0";
                    cb();
                    break;
                }
                var t = bI[bG];
                var be = t.split(";");
                bh = be[0];
                bP = be[1];
                aS = be[2];
                aq = be[3];
                aI = be[4];
                am = be[5];
                J = be[6];
               
                setTimeout(function () {
                    L();
                }, 200);
                break;
        } 
        return;
    }
    if (current == "mainmenu")
    {
        switch (e.key)
        {
            case 'ArrowUp':
                aj(-1);
                break;
            case 'ArrowDown':
                aj(1);
                break;
            case 'Backspace':
                e.preventDefault();
                e.stopPropagation();
                bE();
                break;
            case 'SoftLeft':  
                bE();
                break;
            case 'SoftRight':

                break;
            case 'Enter':
                switch (ak)
                {
                    case 0: 
                            if (bI.length == 0)
                        {
                            de = -1; 
                            bh = "";
                            bP = "5900";
                            aq = "";
                            aI = "";
                            aS = "";
                            am = "0";
                            J = "0";
                            
                            setTimeout(function () {
                                cb();
                            }, 200);
                        }
                        else
                        {
                            de = bG;
                            var t = bI[bG];
                            var be = t.split(";");
                            bh = be[0];
                            bP = be[1];
                            aq = be[3];
                            aI = be[4];
                            aS = be[2];
                            am = be[5];
                            J = be[6];
                            setTimeout(function () {
                                cb();
                            }, 200);
                        }
                        break;
                    case 1: 
                        if (bI.length == 0)
                        {
                            assert("VNC server list is empty");
                        }
                        else
                        {
                            var t = bI[bG];
                            var be = t.split(";");
                            if (confirm("Do you really want to delete VNC server " + be[0]))
                            {
                                bI.splice(bG, 1);
                                eS();
                                bE();
                            }
                            else
                                bE();
                        }
                        break;
                    case 2: 
                        fK();
                        break;
                    case 3: 
                        hb();
                        break;
                    case 4: 
                        hI();
                        break;
                    case 5: 
                        
                        window.close();
                        break;

                }
                break;
        } 
        return;

    }

    if (current == "about")
    {
        switch (e.key)
        {
            case 'SoftLeft':
                window.location.href = "mailto:support@mochasoft.dk?subject=Mocha%20VNC%20for%20Kaios&body=";
                break;
            case 'SoftRight':
                break;
            case 'ArrowLeft':
                if (document.getElementById('aboutdiv'))
                    document.getElementById("aboutdiv").scrollTop -= 20 * 4; ;

                break;
            case 'ArrowUp':
                if (document.getElementById('aboutdiv'))
                    document.getElementById("aboutdiv").scrollTop -= 20; ;

                break;
            case 'ArrowDown':
                if (document.getElementById('aboutdiv'))
                    document.getElementById("aboutdiv").scrollTop += 20;
                break;
            case 'ArrowRight':
                if (document.getElementById('aboutdiv'))
                    document.getElementById("aboutdiv").scrollTop += 20 * 4;
                break;
            case 'Backspace':
                e.preventDefault();
                e.stopPropagation();
                bE();
                break;
            case 'Enter':

                bE();
                break;
        } 
        return;
    }
    if (current == "keyboard")
    {
        switch (e.key)
        {
            case 'SoftLeft':
            
             break;
            
            case 'SoftRight':
                break;
            case 'ArrowLeft':
                if (document.getElementById('aboutdiv'))
                    document.getElementById("aboutdiv").scrollTop -= 20 * 4; ;

                break;
            case 'ArrowUp':
                if (document.getElementById('aboutdiv'))
                    document.getElementById("aboutdiv").scrollTop -= 20; ;

                break;
            case 'ArrowDown':
                if (document.getElementById('aboutdiv'))
                    document.getElementById("aboutdiv").scrollTop += 20;
                break;
            case 'ArrowRight':
                if (document.getElementById('aboutdiv'))
                    document.getElementById("aboutdiv").scrollTop += 20 * 4;
                break;
            case 'Backspace':
                e.preventDefault();
                e.stopPropagation();
                if (socket == null) {
                    setTimeout(function () {
                        bE();
                    }, 200);
                }
                else {
                    setTimeout(function () {
                        L();
                        ab();
                    }, 200);
                }
                break;
            case 'Enter':

                if (socket == null) {
                    setTimeout(function () {
                        bE();
                    }, 200);   
                }
                else {
                    setTimeout(function () {
                        L();
                        ab();
                    }, 200);
                }
                break;
        } 
        return;
    }

}
function aL(move)
{
    bG = bG + move;
    var targetElement = items[bG];

    if ('undefined' == typeof targetElement) {
        if (bG >= cf)
        {
            bG = 0;
        }
        else if (bG < 0)
        {
            bG = cf - 1;
        }

        targetElement = items[bG];
    }

    targetElement.focus();
}
function fY()
{
    

    app = document.getElementById('kui-app');
    current = 'mainmenu';

    var xhr = new XMLHttpRequest();
    xhr.open('GET', gD);
    xhr.send();
    xhr.addEventListener('load', fB);
}
function fD()
{
    

    app = document.getElementById('kui-app');
    current = 'keys';

    var xhr = new XMLHttpRequest();
    if (am.charAt(0) == '1')
        xhr.open('GET', fR);
    else
        xhr.open('GET', fS);

    xhr.send();
    xhr.addEventListener('load', dS);
}
function fv()
{
    

    app = document.getElementById('kui-app');
    current = 'fxx';

    var xhr = new XMLHttpRequest();
    xhr.open('GET', gF);
    xhr.send();
    xhr.addEventListener('load', et);
}
function et()
{
    app.innerHTML = this.responseText;

    var bk = document.getElementById('menufxxlist');
    bi = bk.getElementsByTagName('li');
    ak = 0;
    cZ = bi.length;
    bi[ak].focus();
}
function dS()
{
    app.innerHTML = this.responseText;

    var bk = document.getElementById('menukeylist');
    bi = bk.getElementsByTagName('li');
    ak = 0;
    cZ = bi.length;
    bi[ak].focus();
}

function fB()
{
    app.innerHTML = this.responseText;

    var bk = document.getElementById('menumainlist');
    bi = bk.getElementsByTagName('li');
    ak = 0;
    cZ = bi.length;
    bi[ak].focus();
}


function aj(move)
{
    ak = ak + move;
    var targetElement = bi[ak];

    if ('undefined' === typeof targetElement) {
        if (ak === cZ)
        {
            ak = 0;
        }
        else if (ak < 0)
        {
            ak = cZ - 1;
        }

        targetElement = bi[ak];
    }

    targetElement.focus();
}


var dM = false;

function db()
{
    if (socket != null)
        socket.close();
    socket = null;
    ah = false;
    console.log("do close done");
}

function gT()
{
    var connection = navigator.connection;
    var type = connection.type;
    ah = false;
    cK = false;
    aC();
    if (bz == true && type != null && type.localeCompare("wifi") != 0)
    {


        if (confirm("Mocha VNC is configured in menu - settings only to allow WIFI use. Maybe enable WIFI" + "\n\nDo you want to allow 3G/4G use ?"))
        {
            bz = false;
            eS();
        }
        else
        {
            neterror = true;
            bE();
            return;
        }
    }


    ew = false;
    ax = false;
    aJ = false;
    bQ = false;
    dR = false;
    aH = false;

    bM = null;
    bL = null;
    zipfirsttime = true;
    eN = false;
    bO = dI;
    bS = 0;
    bp = 0;
    
    cA("Connecting: " + bh + " : " + bP);

    socket = navigator.mozTCPSocket.open(bh, bP, {
    useSecureTransport: false,
        binaryType: "arraybuffer"
    });


socket.ondata = function(event) {
    ah = true;
    if (dM) console.log("overrun,,,,,,,,,,,,, " + event.data.byteLength + " data_ing_len " + bS);
    dM = true;
    

    if (typeof event.data === 'string') {
        
    } else
    {

        var buffer = new Uint8Array(event.data);
        var byteCount = event.data.byteLength;
        
        if ((byteCount + bS) >= ad.length)
        {

            var dQ = null;
            var cR = byteCount + bS + 0x4ffff;
            
            ad.length = cR;

            dQ = new Uint8Array(cR);
            if (dQ == null || dQ == undefined)
            {
                console.log("out of memory (Onterminal_data) " + cR);
                bS = 0;
                dM = false;
                return;
            }

            for (var a = 0; a < bS; a++) dQ[a] = ad[a];
            ad = dQ;

        }

        for (var a = 0; a < byteCount; a++) ad[a + bS] = buffer[a];
        bS += byteCount;
        var T = 0;
      
        while (   bS > 0 && socket != null)
        {
            

           
            switch (bO)
            {
                case dI:
                    if (bS >= 12)
                    {
                        T = gu(ad, bS);
                        if (T == 0)
                        {
                            dM = false;
                            return;
                        }
                        if (T == -1)
                        {
                            alert("This is not a VNC server!");
                            db();
                            bE(); 
                            dM = false;
                            return 0;
                        }
                        else
                        {
                            bO = fz;

                            break;
                        }
                    }
                    break;
                case fz:
                    cA("VNC Authentication");
                    

                    if (dm <= 36)
                    {
                     db();
                        alert("This old vnc server protocol is not supported. Update your VNC server");
                        bE(); 
                        dM = false;
                        return 0;
                    }
                    else
                        T = hg(ad, bS); 
                    if (T == 0)
                    {
                        dM = false;
                        return;

                       
                    }
                    if (T == -1)
                    {
                       

                        db();

                        alert("VNC: Security negotiation failed");
                        bE(); 
                        dM = false;
                        return 0;
                    }
                    else
                    {
                        if (dm <= 36)
                        {
                            if (T == 4)
                                bO = du;
                            else
                                bO = eZ;

                        }
                        else
                        {
                            if (bW == 30)
                                bO = fl;
                            else if (cq)
                                bO = fj;
                            else
                                bO = cB;
                        }

                    }
                    break;
                case fl:  
                    cA("Sign on to Mac");
                    T = fO(ad, bS);
                    if (T == 0) {
                        dM = false;
                        return;
                    }
                    bO = cB;
                    break;
                case eZ: 

                    T = eD(ad, bS);
                    if (T == 0)
                    {
                        dM = false;
                        return;
                    }
                    if (T == -1)
                    {
                        db();
                        alert("Password problem. Check VNC server password");
                        dM = false;
                        bE(); 
                        return;
                    }
                    else
                    {
                        bO = du;

                        break;
                    }
                    break;

                case fj:
                    T = gU(ad, bS);
                    if (T == 0)
                    {
                        dM = false;
                        return;
                    }
                    bO = cB;

                    break;
                case cB:
                    T = eD(ad, bS);
                    if (T == 0)
                    {
                        dM = false;
                        return;
                    }
                    if (bW == 30)
                        bW = 0;
                    bO = du;

                    break;
                case du: 

                    T = gI(ad, bS);
                    if (T == 0)
                    {
                        dM = false;
                        return;
                        
                    }
                    if (T == -1)
                    {
                        
                    }
                    else
                    {
                        bO = dJ;
                        fa = false; 

                        ca(0, 0,
                            V,
                            ae, 0);

                        break;
                    }
                    break;
                case dJ: 
                    aC();
                    T = gG(ad, bS);
                    
                    if (T == -1)
                    {
                        
                        bS = 0;
                        dM = false;
                        return;
                    }
                    else
                    {
                        bO = dJ;
                        if (T == 0)
                        {
                            dM = false;
                            return; 
                        }
                        break;
                    }
                    break;
            } 
            if (T > 0)
            {
                if (T >= bS)
                {

                    bS = 0;
                }
                else
                {
                    

                    for (var a = 0; a < (bS - T); a++) ad[a] = ad[a + T];
                    bS -= T;
                }
            }

        } 
    }
    dM = false;
};
socket.ondrain = function() {
    

};
socket.onerror = function(event) {
    ah = false;
    
    if (cK == false)
        alert("Connection failed. Reason :" + event.message);
    aC();
    socket = null;
};

    socket.onopen = function (event) {
    };

socket.onclose = function(event) {
    ah = false;
    

    aC();
    socket = null;
    bE(); 
};
}
var cq = false;
var gg = false;
var dm = 0;
var bW = 0;
var V = 800;
var ae = 800;
var eh = 8;
var fm = 1;
var server_big_engine = 0;
var dW = 0;
var fc = 0;
var ez = 0;
var eB = 0;
var fF = 0;
var eA = 0;
var fL = 0;

function aO(H, index, v)
{

    H[index + 0] = ((v & 0xff00) >> 8);
    H[index + 1] = (v & 0xff);
}
function eO(H, index, v)
{
    H[index + 0] = ((v & 0xff000000) >> 24);
    H[index + 1] = ((v & 0xff0000) >> 16);
    H[index + 2] = ((v & 0xff00) >> 8);
    H[index + 3] = (v & 0xff);
}

function dO(p, index)
{
    var aF = (p[0 + index]);
    if (aF < 0)
        aF = 256 + aF;
    var C = (p[1 + index]);
    if (C < 0)
        C = 256 + C;
    var F = (p[2 + index]);
    if (F < 0)
        F = 256 + F;
    var bv = (p[3 + index]);
    if (bv < 0)
        bv = 256 + bv;
    var G = (aF << 24) | (C << 16) | (F << 8) | bv;
    return (G);
}
function ag(p, index)
{
    var aF = (p[index]);
    if (aF < 0)
        aF = 256 + aF;
    var C = (p[1 + index]);
    if (C < 0)
        C = 256 + C;

    var G = (aF << 8) | C;
    return (G);
}
function gu(H, T)
{



    cq = false;
    gg = false;
    var cU = new TextDecoder().decode(H);

    if (T < 12)
        return 0;

    

    if (cU.startsWith("RFB") == false)
    {
        return -1;
    }
    var ef = cU.substring(4, 4 + 3);
    var eg = cU.substring(8, 8 + 3);
    var fZ = parseInt(ef);
    var gC = parseInt(eg);
    dm = fZ * 10 + gC;
    

    var bD = "";

    if (dm < 37)

        bD = "RFB 003.003\n"; 
    else
        bD = "RFB 003.008\n"; 
    var cF = new TextEncoder().encode(bD);

    socket.send(cF.buffer);
    
    return 12;

}
function gW(buf)
{ 

return 0;
}
function hg(buf, T)
{   
    


    if (T > 5 && buf[0] == 0 && buf[1] == 0 && buf[2] == 0 && buf[3] == 0)
    {
        var cU = new TextDecoder().decode(buf);
        if (cU != null) alert(cU);
        return -1;
    }
    
    var bC = 0;
    var ay = new Uint8Array(256);
    var aA; 
    var R;
    var p = 0;

    if (T < 1) {
 return 0;
    }

    bC = buf[p++];
    if (bC == 0) {
  return 1; 
    }
   if (1 + bC > T) {
    return 0;
    }
    for (var a = 0; a < ay.length; a++)
        ay[a] = 0;


    for (R = 0; R < bC; R++)
    {


        aA = buf[p++];
        if (aA < 0) aA = (256 + aA);
        
        if (aA > 255)
            aA = 255;
        if (aA < 0)
            aA = 255;
        
        ay[aA] = 1;
        
    } 


    var cs = aS.length
    if (cs == 1 && aS[0] == '#')
        cs = 0;


    var aB = new Uint8Array(1);

    if ((ay[30] != 0)
        && (aq.length > 0) && am.charAt(0) == '1')
    {
        cq = true;
        aA = 30;
        bW = 30;
        aB[0] = aA; 
        socket.send(aB.buffer);
        return (1 + bC);
    }

    if ((cs > 0) && (ay[2] != 0))
    { 
        cq = true;

        aA = 2;
        aB[0] = aA;
        socket.send(aB.buffer);
        
        return (1 + bC);
    }
    if (ay[1] != 0)
    { 
      
        aA = 1;
        aB[0] = aA;
        socket.send(aB.buffer);
        return (1 + bC);
    }
    if ((cs == 0) && (ay[1] == 0))
    {
        alert("No password. VNC Server rejects the session request");
    }
    
    aA = 0; 
    aB[0] = 0;
    socket.send(aB.buffer);


    if (ay[1] == 0 && ay[2] == 0 && ay[5] != 0
        && ay[30] != 0)
    {
        alert("If using a realvnc server, make sure to select Encryption : prefer on or off");
    }
    return (1 + bC);

}

function gU(H, T)
{
    

    var cF = new TextEncoder().encode(aS);
    if (T < 16)
        return 0;
   

    var r = fw(H, cF);
   ;
    
    socket.send(r.buffer);
    return 16;

}
function fw(challenge, password)
{
    var cz = new Uint8Array(8);
    for (var i = 0; i < 8; i++)
    {
        if (i < password.length)
        {
            cz[i] = password[i];
        }
        else
        {
            cz[i] = 0;
        }
    }
    des_password(cz);
    var bd = new Uint8Array(8);
    var ed = new Uint8Array(8);
    for (var g = 0; g < 8; g++) bd[g] = challenge[g];
    for (var g = 0; g < 8; g++) ed[g] = challenge[g + 8];

    var gy = enc8(bd);


    var fQ = enc8(ed);

    var dC = new Uint8Array(16);
    for (var g = 0; g < 8; g++) dC[g] = gy[g];
    for (var g = 0; g < 8; g++) dC[g + 8] = fQ[g];
    return (dC);

}


function eD(buffer, T)
{ 

    var eU;
    var aE = 0;
    if (T < 4)
        return 0;

    eU = dO(buffer, 0);
    if (eU == 0)
    {
        

    }
    else
    {
        
        db();
        alert("Password login failed");

        return -1;
    }
    var aB = new Uint8Array(1);
    if (hJ)
        aE = 1;
    aB[0] = aE;
    socket.send(aB.buffer);


    return 4;
}


function gI(H, T)
{
    

    var ar = new Uint8Array(20);
    var aV = new Uint8Array(24 + 4); 
    var bU = new Uint8Array(20);
    var aY = new Uint8Array(12);

    aV[0] = 2;
    aV[1] = 0;
    aV[2] = 0;
    aV[3] = 6; 
    aV[4] = 0;
    aV[5] = 0;
    aV[6] = 0;
    aV[7] = 1; 
    aV[8] = 0;
    aV[9] = 0;
    aV[10] = 0;
    aV[11] = 16; 
    aV[12] = 0;
    aV[13] = 0;
    aV[14] = 0;
    aV[15] = 6; 
    aV[16] = 0;
    aV[17] = 0;
    aV[18] = 0;
    aV[19] = 5; 

    aV[20] = 0xff;
    aV[21] = 0xff;
    aV[22] = 0xff;
    aV[23] = 0x11; 
    aV[24] = 0;
    aV[25] = 0;
    aV[26] = 0;
    aV[27] = 0; 

    aY[0] = 2;
    aY[1] = 0;
    aY[2] = 0;
    aY[3] = 2; 
    aY[4] = 0;
    aY[5] = 0;
    aY[6] = 0;
    aY[7] = 16; 
    aY[8] = 0xff;
    aY[9] = 0xff;
    aY[10] = 0xff;
    aY[11] = 0x11; 

    bU[0] = 2; 
    bU[1] = 0;
    bU[2] = 0;
    bU[3] = 4;
    bU[4] = 0;
    bU[5] = 0;
    bU[6] = 0;
    bU[7] = 1;
    bU[8] = 0;
    bU[9] = 0;
    bU[10] = 0;
    bU[11] = 16;
    bU[12] = 0;
    bU[13] = 0;
    bU[14] = 0;
    bU[15] = 6;
    bU[16] = 0;
    bU[17] = 0;
    bU[18] = 0;
    bU[19] = 0;


    var cr;

    if (T < 24)
        return 0;
    V = ag(H, 0);
    ae = ag(H, 2);
    eh = H[4];
    fm = H[5];
    server_big_engine = H[6];
    dW = H[7];
    fc = ag(H, 8);
    eB = ag(H, 10);
    ez = ag(H, 12);
    fF = H[14];
    fL = H[15];
    eA = H[16];
    cr = dO(H, 20);
    if (T < (24 + cr))
        return 0; 

    cQ(V, ae);
    for (var a = 0; a < ar.length; a++)
        ar[a] = 0;

    ar[4] = 32; 
    ar[5] = 24; 
    ar[7] = 1; 
    aO(ar, 8, 0xff); 
    aO(ar, 10, 0xff); 
    aO(ar, 12, 0xff); 
    ar[14] = 16; 
    ar[15] = 8; 
    ar[16] = 0;




    var r = socket.send(ar.buffer);
    
    if (gv)
    {
        r = socket.send(aV.buffer);
    }
    else
    {
        r = socket.send(bU.buffer);
    }
    
    return (24 + cr);
}




function dw()
{
    aM = ey;
    aK = fI;

    dG(aM, aK);
}

function ab()
{

    var target = document.getElementById('my_canvas');
    if (target == undefined)
    {
        return;
    }
    
    var ctx = target.getContext("2d");

    if (cG != null)
    {
        var fG = aM - fH;
        var ea = aK - ev;
        for (var y = 0; y < dE; y++)
        {
            var p = (y + ea) * V + fG;
            var ba = y * ci;
            for (var x = 0; x < ci; x++)
            {
                dv[ba] = bM[p];
                if (cG[ba] != 0)
                {
                    bM[p] = cG[ba];
                }
                p++;
                ba++;
            }
        }
        eN = true;
    }
    ctx.canvas.height = ff * bw;
    ctx.canvas.width = (gd / ff) * ctx.canvas.height;
    if (bo < 0) bo = 0;
    if (bx < 0) bx = 0;
    var w = ctx.canvas.width;
    var h = ctx.canvas.height;

    if (h + bx > ae)
    {
        bx = ae - h;
        
    }
    if (w + bo > V)
    {
        bo = V - w;
        
    }
    ey = bo + w / 2;
    fI = bx + h / 2;
    for (var y = 0; y < h; y++)
    {
        var ba = (y + bx) * V + bo;
        var aX = y * V;
        for (var x = 0; x < w; x++)
        {
            dr[aX + x] = bM[ba + x];

        }
    }
    ctx.putImageData(da, 0, 0);


    for (var y = 0; y < dE; y++)
    {
        var p = (y + ea) * V + fG;
        var ba = y * ci;
        for (var x = 0; x < ci; x++)
        {
            bM[p] = dv[ba];
            p++;
            ba++;
        }
    }
}
function av()
{

    ab();
    ca(0, 0,
        V,
        ae, 1);
    

}

function cQ(width, height)
{
    
    if (dA == true && (width * height > 1920 * 1080))
        alert("The Server uses a large screen. VNC will be slow and may fail as to limited memory Ask for:" + width + " x " + height);

    var target = document.getElementById('my_canvas');
    var ctx = target.getContext("2d");
    ctx.scale(1, 1);
    cj = ctx.createImageData(width, height);
    da = ctx.createImageData(width, height);
    dr = new Uint32Array(da.data.buffer);


    bM = new Uint32Array(cj.data.buffer);
    for (let i = 0; i < bM.length; i++)
    {
        bM[i] = Math.random() * 0xFFFFFF + 0xFF000000;
    }
    ctx.putImageData(cj, 0, 0);


}
function cA(t)
{

    var target = document.getElementById('my_canvas');
    if (target != undefined)
    {
        var ctx = target.getContext("2d");
        ctx.fillText(t, 2, dH);
        dH += 12 * 3;
    }
}
function ca(x, y, width, height, mode)
{
    
    var H = new Uint8Array(10);

    H[0] = 3; 
    H[1] = mode; 
    aO(H, 2, x);
    aO(H, 4, y);
    aO(H, 6, width);
    aO(H, 8, height);

    var r = socket.send(H.buffer);
    

}
var aR = 0;
var bN = 0;
var ac = 0;
var bB = 0;
var au = 0;
var cY = 0;
var ai = 0;


function gG(H, T)
{
    var bb;
    var bj;
    var cW;
    var gw;
    var hH;
    var gQ;
    var p = 0;
    var j = 0;

    

    if (T < 1)
    {

        return 0;
    }
aU: while (j < T)
    {
        if (bp > 0)
        {
            switch (bp)
            {
                case 1: 
                        


                    if (j + 12 > T)
                        return j; 
                    aR = ag(H, p);
                    p += 2;
                    bN = ag(H, p);
                    p += 2;
                    ac = ag(H, p);
                    p += 2;
                    bB = ag(H, p);
                    p += 2;
                    if ((aR + ac > V)
                        || (bN + bB > ae))
                    {
                        return T;
                    }

                    cY = dO(H, p);
                    p += 4;
                    ai = 0;
                    j += 12;
                    au--;
                    bp = 2;

                case 2:
                    switch (cY)
                    {

                        case 0: 
                                

                            var b = hD(T - j, H, p);
                            
                            p += b;
                            j += b;
                            if (b == 0)
                            {
                                return j;
                            }
                            continue aU;

                        case 1: 

                            
                            b = gL(T - j, H, p);
                            p += b;
                            j += b;
                            if (b == 0)
                                return j;
                            continue aU;

                        case 5: 
                                

                            b = fX(T - j, H, p);
                            p += b;
                            j += b;
                            if (b == 0)
                            {
                                return j;
                            }
                            continue aU;

                        case 6: 
                            if (ds) console.log("encoding zlib");
                            b = ha(T - j, H, p);
                            p += b;
                            j += b;
                            if (b == 0)
                            {
                                return j;
                            }
                            continue aU;

                        case 16: 
                                 
                            b = gb(T - j, H, p);
                            
                            p += b;
                            j += b;
                            if (b == 0)
                            {
                                return j;
                            }
                            continue aU;

                        case -239: 
                                   
                            var dq = 4;

                            var b = (ac * bB * dq)
                                + Math.floor((ac + 7) / 8) * bB;
                            if (j + b > T)
                            {
                                
                                return j; 
                            }
                            var l = p;
                            var ei = p;
                            fH = aR;
                            ev = bN;
                            var ap = new Uint8Array(ac);
                            p += b;
                            j += b;

                            if (ds) console.log("cursor " + b);
                            if (b > 0)
                            {


                                
                                ci = ac;
                                dE = bB;
                                cG = new Uint32Array(ac * bB);
                                dv = new Uint32Array(ac * bB);
                                eN = false;
                                var yy, xx;

                                for (yy = 0; yy < bB; yy++)
                                {
                                    var as = ei
                                        + (ac * bB * dq)
                                        + Math.floor((ac + 7) / 8) * yy;
                                    for (var R = 0; R < ac; R++)
                                        ap[R] = 0;
                                    for (var R = 0; R < ac;)
                                    {
                                        if (R < ac)
                                            if ((H[as] & 0x80) > 0)
                                                ap[R] = 1;
                                        R++;
                                        if (R < ac)
                                            if ((H[as] & 0x40) > 0)
                                                ap[R] = 1;
                                        R++;
                                        if (R < ac)
                                            if ((H[as] & 0x20) > 0)
                                                ap[R] = 1;
                                        R++;
                                        if (R < ac)
                                            if ((H[as] & 0x10) > 0)
                                                ap[R] = 1;
                                        R++;
                                        if (R < ac)
                                            if ((H[as] & 0x8) > 0)
                                                ap[R] = 1;
                                        R++;
                                        if (R < ac)
                                            if ((H[as] & 0x4) > 0)
                                                ap[R] = 1;
                                        R++;
                                        if (R < ac)
                                            if ((H[as] & 0x2) > 0)
                                                ap[R] = 1;
                                        R++;
                                        if (R < ac)
                                            if ((H[as] & 0x1) > 0)
                                                ap[R] = 1;
                                        R++;
                                        as++;
                                    }



                                    var eo = yy * ci;
                                    for (xx = 0; xx < ac; xx++)
                                    {
                                        if ((ap[xx] == 0))
                                        {
                                            cG[eo++] = 0; 
                                            l += 4;
                                        }
                                        else
                                        {

                                            var blue = H[l++];
                                            var green = H[l++];
                                            var red = H[l++];

                                            l++;
                                            cG[eo++] = ((red) << 16)
                                                + ((green) << 8)
                                                + ((blue))
                                                + 0xff000000;


                                        }

                                        }
                                } 

                                


                            } 
                            else
                            {
                                
                            }
                            if (au > 0)
                            {
                                bp = 1; 
                                }
                            else
                            {
                                bp = 0; 
                                av();
                                }


                            if (b == 0)
                            {
                                return j;
                            }

                            continue aU;

                        default:
                            

                            return (T);
                    } 

            } 
        }

        bb = H[p++];
        j++;
        switch (bb)
        {
            default:
                
                break;
            case 4: 
                
                if (j + 5 > T)
                    return 0; 
                p++; 
                V = ag(H, p);
                p += 2;

                ae = ag(H, p);
                p += 2;

                cQ(V,
                    ae);

                j += 5;
                break;
            case 0: 
                if (j + 3 > T)
                    return 0; 
                bj = H[p++];
                au = ag(H, p);
                p += 2;
                j += 3;
                if (au > 0)
                    bp = 1;
             break;

            case 2: 
                var ej = new Audio("data:audio/wav;base64,//uQRAAAAWMSLwUIYAAsYkXgoQwAEaYLWfkWgAI0wWs/ItAAAGDgYtAgAyN+QWaAAihwMWm4G8QQRDiMcCBcH3Cc+CDv/7xA4Tvh9Rz/y8QADBwMWgQAZG/ILNAARQ4GLTcDeIIIhxGOBAuD7hOfBB3/94gcJ3w+o5/5eIAIAAAVwWgQAVQ2ORaIQwEMAJiDg95G4nQL7mQVWI6GwRcfsZAcsKkJvxgxEjzFUgfHoSQ9Qq7KNwqHwuB13MA4a1q/DmBrHgPcmjiGoh//EwC5nGPEmS4RcfkVKOhJf+WOgoxJclFz3kgn//dBA+ya1GhurNn8zb//9NNutNuhz31f////9vt///z+IdAEAAAK4LQIAKobHItEIYCGAExBwe8jcToF9zIKrEdDYIuP2MgOWFSE34wYiR5iqQPj0JIeoVdlG4VD4XA67mAcNa1fhzA1jwHuTRxDUQ//iYBczjHiTJcIuPyKlHQkv/LHQUYkuSi57yQT//uggfZNajQ3Vmz+Zt//+mm3Wm3Q576v////+32///5/EOgAAADVghQAAAAA//uQZAUAB1WI0PZugAAAAAoQwAAAEk3nRd2qAAAAACiDgAAAAAAABCqEEQRLCgwpBGMlJkIz8jKhGvj4k6jzRnqasNKIeoh5gI7BJaC1A1AoNBjJgbyApVS4IDlZgDU5WUAxEKDNmmALHzZp0Fkz1FMTmGFl1FMEyodIavcCAUHDWrKAIA4aa2oCgILEBupZgHvAhEBcZ6joQBxS76AgccrFlczBvKLC0QI2cBoCFvfTDAo7eoOQInqDPBtvrDEZBNYN5xwNwxQRfw8ZQ5wQVLvO8OYU+mHvFLlDh05Mdg7BT6YrRPpCBznMB2r//xKJjyyOh+cImr2/4doscwD6neZjuZR4AgAABYAAAABy1xcdQtxYBYYZdifkUDgzzXaXn98Z0oi9ILU5mBjFANmRwlVJ3/6jYDAmxaiDG3/6xjQQCCKkRb/6kg/wW+kSJ5//rLobkLSiKmqP/0ikJuDaSaSf/6JiLYLEYnW/+kXg1WRVJL/9EmQ1YZIsv/6Qzwy5qk7/+tEU0nkls3/zIUMPKNX/6yZLf+kFgAfgGyLFAUwY//uQZAUABcd5UiNPVXAAAApAAAAAE0VZQKw9ISAAACgAAAAAVQIygIElVrFkBS+Jhi+EAuu+lKAkYUEIsmEAEoMeDmCETMvfSHTGkF5RWH7kz/ESHWPAq/kcCRhqBtMdokPdM7vil7RG98A2sc7zO6ZvTdM7pmOUAZTnJW+NXxqmd41dqJ6mLTXxrPpnV8avaIf5SvL7pndPvPpndJR9Kuu8fePvuiuhorgWjp7Mf/PRjxcFCPDkW31srioCExivv9lcwKEaHsf/7ow2Fl1T/9RkXgEhYElAoCLFtMArxwivDJJ+bR1HTKJdlEoTELCIqgEwVGSQ+hIm0NbK8WXcTEI0UPoa2NbG4y2K00JEWbZavJXkYaqo9CRHS55FcZTjKEk3NKoCYUnSQ0rWxrZbFKbKIhOKPZe1cJKzZSaQrIyULHDZmV5K4xySsDRKWOruanGtjLJXFEmwaIbDLX0hIPBUQPVFVkQkDoUNfSoDgQGKPekoxeGzA4DUvnn4bxzcZrtJyipKfPNy5w+9lnXwgqsiyHNeSVpemw4bWb9psYeq//uQZBoABQt4yMVxYAIAAAkQoAAAHvYpL5m6AAgAACXDAAAAD59jblTirQe9upFsmZbpMudy7Lz1X1DYsxOOSWpfPqNX2WqktK0DMvuGwlbNj44TleLPQ+Gsfb+GOWOKJoIrWb3cIMeeON6lz2umTqMXV8Mj30yWPpjoSa9ujK8SyeJP5y5mOW1D6hvLepeveEAEDo0mgCRClOEgANv3B9a6fikgUSu/DmAMATrGx7nng5p5iimPNZsfQLYB2sDLIkzRKZOHGAaUyDcpFBSLG9MCQALgAIgQs2YunOszLSAyQYPVC2YdGGeHD2dTdJk1pAHGAWDjnkcLKFymS3RQZTInzySoBwMG0QueC3gMsCEYxUqlrcxK6k1LQQcsmyYeQPdC2YfuGPASCBkcVMQQqpVJshui1tkXQJQV0OXGAZMXSOEEBRirXbVRQW7ugq7IM7rPWSZyDlM3IuNEkxzCOJ0ny2ThNkyRai1b6ev//3dzNGzNb//4uAvHT5sURcZCFcuKLhOFs8mLAAEAt4UWAAIABAAAAAB4qbHo0tIjVkUU//uQZAwABfSFz3ZqQAAAAAngwAAAE1HjMp2qAAAAACZDgAAAD5UkTE1UgZEUExqYynN1qZvqIOREEFmBcJQkwdxiFtw0qEOkGYfRDifBui9MQg4QAHAqWtAWHoCxu1Yf4VfWLPIM2mHDFsbQEVGwyqQoQcwnfHeIkNt9YnkiaS1oizycqJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");
                ej.play();
                break;
            case 3: 
                if (j + 7 > T)
                    return 0; 
                bj = H[p++];
                bj = H[p++];
                bj = H[p++];
                cW = dO(H, p);
                p += 4;
                if (cW > 0)
                {
                    }
                j += 7;
                if (j + cW > T)
                    return 0; 
                p += cW;
                j += cW;
                break;
            case 0xf: 
                      

                if (j + 11 > T)
                    return 0; 
                bj = H[p++];
                p += 2;
                p += 2;
                V = ag(H, p);
                p += 2;
                ae = ag(H, p);
                p += 2;
                bj = H[p++];
                bj = H[p++];
                j += 11;

                cQ(V,
                    ae);

                break;
        } 
    } 
    return (j);
}

function hD(size, H, p)
{
    var dq = 4;


    if (ac == 0)
    {

        
        return 0;
    }
    var lines = Math.floor(size / (ac * dq));

    if (lines < 1)
        return (0);
    if (lines + ai > bB)
        lines = bB - ai;

    ck(aR, bN + ai, ac, lines, H, p);

    ai = (ai + lines);
    
    if (ai >= bB)
    {

        if (au > 0)
        {
            bp = 1; 
        }
        else
        {
            bp = 0; 

            av();


        }
    }
    return (lines * ac * dq);
}
function ck(x, y, width, height, data,
    p)
{
    var C, F, bv;



    var x2, y2;
    x2 = x + width;
    y2 = y + height;
    var xx, yy;

    if (bM == null)
    {
        
        return;
    }
    if (y2 > ae)
    {
        
        return;
    }
    if (x2 > V)
    {
        
        return;
    }

    var eu = new Uint32Array(V);

    for (yy = 0; yy < height; yy++)
    {
        for (xx = 0; xx < width; xx++)
        {
            C = (data[p++] & 0xff);
            F = (data[p++] & 0xff);
            bv = (data[p++] & 0xff);
            p++; 

            eu[xx] = (C << 16) | (F << 8) | bv | 0xff000000;
        }

        var aX = V * (y + yy) + x;
        if (aX + width > bM.length)
        {
            
            return;
        }
        for (var a = 0; a < width; a++)
        {
            bM[aX + a] = eu[a];
        }

    }
}
function gb(size, H, p) 
{
    
    var bK = 0;
    if (zlib_data_size == 0)
    {
        if (size < 4)
            return 0; 
                      zlib_data_size = dO(H, p);
        
        p += 4;
        bK += 4;
        size -= 4;
        bs = 0; 
        if (bL == null || bL.length != zlib_data_size)
        {
            bL = new Uint8Array(zlib_data_size);
        }
        else
        {
            
        }
        if (bL == null)
        {
            
            return 0;
        }
    }
    else
    {
        }

    if (bs + size > zlib_data_size)
    {
        size = zlib_data_size - bs; 
                                              
    }
    for (var a = 0; a < size; a++) bL[a + bs] = H[p + a];
    bs += size;
    bK += size;

    if (bs < zlib_data_size)
    {
        
        zlib_data_size = 0; 
        return 0; 
    }
    if (zlib_data_size > 0)
    {
        eE(aR, bN, ac, bB);
        zlib_data_size = 0; 

        if (au > 0)
        {
            bp = 1; 
        }
        else
        {
            bp = 0; 
            av();
            }

        return (bK);

    }
}





function eE(x, y, cx, cy)
{
    var bc = 0;
    var l = 0;
    var dj = 0;
    var cV;
    var bF = 3;


    if (zipfirsttime)
    {
        zipfirsttime = false;
        zip_inflate_BEGIN();
        var q = new Uint8Array(bL.length - 2);
        for (var a = 0; a < bL.length - 2; a++) q[a] = bL[a + 2];
        bL = q;
    }
    var g = cx * cy * 4 + 0x8000;
    var G = ZipInflate_append(bL, g);
    if (G == null)
    {
        
    }
    else
    {
        
    }
    if (G != null)
    {



        var i, b, T;
        var bJ;
        var aQ = null;
        var eF; 
        var p = 0; 
        var bb; 
        var x1, y1, bu, az;
        for (y1 = y; y1 < y + cy; y1 += 64)
        {

            if (y1 + 64 > y + cy)
                az = (y + cy) - y1;
            else
                az = 64;

            for (x1 = x; x1 < x + cx; x1 += 64)
            {

                if (x1 + 64 > x + cx)
                    bu = (x + cx) - x1;
                else
                    bu = 64;

                bb = G[p];
                if (bb < 0)
                {
                    
                    bb = 256 + bb;
                }
                p++;
                eF = (bb & 0x80);
                bJ = (bb & 0x7f);

                
                if (bJ > 0)
                {



                    var dK = bJ * bF;
                    aQ = new Uint8Array(dK);
                    for (var a = 0; a < dK; a++) aQ[a] = G[p++];

                    
                }

                if (bJ == 1)
                { 

                    var hu = gZ(aQ, 0);

                    er(x1, y1, bu, az, hu); 
                    continue;
                }

                if (eF == 0)
                {
                    
                    if (bJ == 0)
                    {
                        var dK = bu * az * bF;
                        var ee = new Uint8Array(dK);
                        for (var a = 0; a < dK; a++) ee[a] = G[p++];
                        eI(x1, y1, bu, az, ee, 0);

                    }
                    else
                    {
                        
                        var fq = ((bJ > 16)
                            ? 8
                            : ((bJ > 4)
                                ? 4
                                : ((bJ > 2) ? 2 : 1)));

                        l = 0; 
                        for (i = 0; i < az; i++)
                        {
                            var gz = l + bu * bF;
                            var cD = 0;
                            var cL = 0;

                            while (l < gz)
                            {
                                if (cL == 0)
                                {
                                    cD = G[p++];

                                    if (cD < 0)
                                        cD = 256 + cD;

                                    cL = 8;
                                }
                                cL -= fq;
                                cV = (cD >> cL)
                                    & ((1 << fq) - 1) & 127;

                                cV *= bF;
                                buf_out[l++] = aQ[cV + 2]; 
                                                                          buf_out[l++] = aQ[cV + 1]; 
                                                                          buf_out[l++] = aQ[cV + 0]; 
                                                                          }
                        }

                        

                        cC(x1, y1, bu, az, buf_out, 0);

                    }
                }
                else
                {
                    
                    if (bJ == 0)
                    {

                        l = 0; 
                        dj = l + bu * az * bF;

                        
                        while (l < dj)
                        {

                            if (p + 2 >= G.length)
                            {
                                
                                return -1;
                            }


                            var F = G[p++] & 0xff;  
                            var C = G[p++] & 0xff;
                            var aF = G[p++] & 0xff;

                            bc = ((aF << 16) | (C << 8) | F);


                            T = 1;
                            do
                            {
                                if (p >= G.length)
                                {
                                    
                                    return -1;
                                }
                                b = G[p++];

                                if (b < 0)
                                    b = 256 + b;

                                T += b;
                            } while (b == 255);
                            while (T-- > 0)
                            {
                                buf_out[l++] = ((bc & 0xff0000) >> 16);
                                buf_out[l++] = ((bc & 0xff00) >> 8);
                                buf_out[l++] = (bc & 0xff);

                            }
                        } 



                        cC(x1, y1, bu, az, buf_out, 0); 

                    }
                    else
                    {

                        
                        l = 0; 
                        dj = l + bu * az * bF;


                        while (l < dj)
                        {
                            var cv = G[p++];

                            if (cv < 0)
                                cv = 256 + cv;

                            T = 1;
                            if ((cv & 0x80) > 0)
                            {

                                do
                                {
                                    b = G[p++];

                                    if (b < 0)
                                        b = 256 + b;


                                    T += b;
                                } while (b == 255);
                            }
                            cv &= 0x7f;
                            var dk = cv * 3;
                            var aF = (aQ[2 + dk] & 0xff); 
                            var C = (aQ[1 + dk] & 0xff);
                            var F = (aQ[0 + dk] & 0xff);
                            bc = ((aF << 16) | (C << 8) | F);
                            while (T-- > 0)
                            {
                                buf_out[l++] = ((bc & 0xff0000) >> 16);
                                buf_out[l++] = ((bc & 0xff00) >> 8);
                                buf_out[l++] = (bc & 0xff);

                            }
                        } 


                        cC(x1, y1, bu, az, buf_out, 0); 

                    }
                }
            } 
        } 

 }
}
function gZ(p, index)
{
    var F = (p[2 + index] & 0xff); 
    var C = (p[1 + index] & 0xff);
    var aF = (p[0 + index] & 0xff);
    return ((aF << 16) | (C << 8) | F); 

}
function eI(x, y, width, height, data, p)
{
    

    var aF, C, F;
    var x2, y2;
    x2 = x + width;
    y2 = y + height;
    var xx;

    if (bM == null)
        return;
    if (y2 > ae)
        return;
    if (x2 > V)
        return;





    for (var yy = 0; yy < height; yy++)
    {
        var aX = V * (y + yy) + x;

        for (xx = 0; xx < width; xx++)
        {
            aF = (data[p++] & 0xff);  
            C = (data[p++] & 0xff);
            F = (data[p++] & 0xff);
            bM[aX + xx] = (aF << 16) | (C << 8) | F | 0xff000000;
            }


    }
    

}
function cC(x, y, width, height, data, p)
{
    
    var aF, C, F;
    var x2, y2;
    x2 = x + width;
    y2 = y + height;
    var xx;

    if (bM == null)
        return;
    if (y2 > ae)
        return;
    if (x2 > V)
        return;





    for (var yy = 0; yy < height; yy++)
    {
        var aX = V * (y + yy) + x;

        for (xx = 0; xx < width; xx++)
        {
            F = (data[p++] & 0xff);    
            C = (data[p++] & 0xff);
            aF = (data[p++] & 0xff);
            bM[aX + xx] = (aF << 16) | (C << 8) | F | 0xff000000;  
                                                                           }


    }

    
}

function er(
    x1, y1, cx, cy,
    color)
{
    color |= 0xff000000;
    if (x1 + cx > V)
    {
        
        return;
    }
    if (y1 + cy > ae)
    {
        
        return;
    }

    
    if (bM == null)
        return;

    for (var y = 0; y < cy; y++)
    {
        var aX = V * (y1 + y) + x1;
        for (var x = 0; x < cx; x++)
        {
            bM[aX + x] = color;


        }
    }



}



function gL(size, H, p)
{

    var fN, fr;
    if (size < 4)
        return 0; 
    fN = ag(H, p);
    p += 2;
    fr = ag(H, p);
    p += 2;
    eG(aR, bN, ac, bB, fN,
        fr);


    if (au > 0)
    {
        bp = 1; 
    }
    else
    {
        bp = 0; 
        av();
        }
    return 4;
}

function eG(gV, gj, cx, cy, eH, ec)
{
    

    var aN = new Uint32Array(cx * cy);
    var p = 0;
    for (var y = 0; y < cy; y++)
    {
        var aX = V * (ec + y) + eH;
        for (var x = 0; x < cx; x++)
        {
            aN[p] = bM[aX];
            p++;
            aX++;
        }
    }
    p = 0;
    for (var y = 0; y < cy; y++)
    {
        var aX = V * (gj + y) + gV;
        for (var x = 0; x < cx; x++)
        {
            bM[aX] = aN[p];
            p++;
            aX++;
        }
    }
    aN = null;

}


var af = new Uint8Array(16 * 16 * 6);

function fX(size, H, p)
{
    var aw; 
    var bv, F, C;
    var rx = aR;
    var ry = bN;
    var cJ = ac;
    var cS = bB;
    var bg = 0, cI = 0;
    var i;
    var s;
    var l;
    var x, y;
    var w, h;
    var ct, di;
    var sw, cN;
    var subencoding;
    var aD;
    var T = 0;
    if (bM == null)
        return size;
    
    for (y = ry; y < ry + cS; y += 16)
    { 
        for (x = rx; x < rx + cJ; x += 16)
        {
            w = h = 16;
            if (rx + cJ - x < 16)
                w = rx + cJ - x;
            if (ry + cS - y < 16)
                h = ry + cS - y;

            if (T + 1 > size)
            {
                
                return 0; 
            }
            subencoding = H[p++];
            if (subencoding < 0)
                subencoding = 256 + subencoding;
            T++;

            if ((subencoding & 1) == 1)
            {
             
                s = w * h * 4;
                if (T + s > size)
                {
                    av();
                    return 0; 
                }
                ck(x, y, w, h, H, p);
                p += s;
                T += s;
                continue;
            }

            if ((subencoding & 2) == 2)
            { 

                if (T + 4 > size)
                {
                    av();
                    return 0;
                }
                bv = H[p++];
                if (bv < 0)
                    bv = 256 + bv;
                F = H[p++];
                if (F < 0)
                    F = 256 + F;
                C = H[p++];
                if (C < 0)
                    C = 256 + C;
                p++;
                bg = (C << 16) | (F << 8) | bv;

                
                T += 4;
            }

            cd(x, y, w, h, bg);

            if ((subencoding & 4) == 4)
            { 
                if (T + 4 > size)
                {
                    av();
                    return 0;
                } 
                bv = H[p++];
                if (bv < 0)
                    bv = 256 + bv;
                F = H[p++];
                if (F < 0)
                    F = 256 + F;
                C = H[p++];
                if (C < 0)
                    C = 256 + C;

                p++;
                cI = (C << 16) | (F << 8) | bv;

                
                T += 4;
            }

            if ((subencoding & 8) == 0)
            { 
                continue;
            }
            if (T + 1 > size)
            {
                return 0; 
            }
            aD = H[p++];
            if (aD < 0)
                aD = 256 + aD;
            T++;

            l = 0; 

            if ((subencoding & 16) == 16)
            { 
              
                s = aD * (2 + 4);
                if (s > af.length)
                {
                    

                    return (size);
                }
                if (T + s > size)
                {
                    av();
                    return 0;
                }
                for (var a = 0; a < s; a++) af[a] = H[p + a];
                p += s;
                T += s;

                for (i = 0; i < aD; i++)
                {
                    bv = af[l++];
                    if (bv < 0)
                        bv = 256 + bv;

                    F = af[l++];
                    if (F < 0)
                        F = 256 + F;
                    C = af[l++];
                    if (C < 0)
                        C = 256 + C;

                    l++;
                    cI = (C << 16) | (F << 8) | bv;
                    aw = (af[l]);
                    if (aw < 0)
                        aw = 256 + aw;
                    ct = aw >> 4; 
                    di = aw & 0xf;
                    l++;
                    aw = (af[l]);
                    if (aw < 0)
                        aw = 256 + aw;
                    sw = (aw >> 4) + 1; 
                    cN = (aw & 0xf) + 1;

                    l++;

                    cd(x + ct, y + di, sw, cN, cI);
                }

            }
            else
            {
                s = aD * 2;
                
                if (s > af.length)
                {
                    
                    return (size);
                }
                if (T + s > size)
                {
                    av();
                    return 0;
                }
                for (var a = 0; a < s; a++) af[a] = H[p + a];
                p += s;
                T += s;

                for (i = 0; i < aD; i++)
                {
                    aw = (af[l]);
                    if (aw < 0)
                        aw = 256 + aw;
                    ct = aw >> 4; 
                    di = aw & 0xf;
                    l++;
                    aw = (af[l]);
                    if (aw < 0)
                        aw = 256 + aw;
                    sw = (aw >> 4) + 1; 
                    cN = (aw & 0xf) + 1;
                    l++;


                    cd(x + ct, y + di, sw, cN, cI);
                    }
            }
        } 
    } 


    if (au > 0)
    {
        bp = 1; 
    }
    else
    {
        bp = 0; 
        av();
    }
    return T;

}
function cd(
    x1, y1, cx, cy,
    color )
{

    var C = (color & 0xff0000) >> 16;
    var F = (color & 0x00ff00) >> 8;
    var bv = (color & 0xff)
    color = 0xFF000000 | (bv << 16) | (F << 8) | C;



    if (x1 + cx > V)
    {
        
        return;
    }
    if (y1 + cy > ae)
    {
        
        return;
    }

    for (var yy = 0; yy < cy; yy++)
    {
        var aX = V * (y1 + yy) + x1;
        for (var xx = 0; xx < cx; xx++)
        {
            bM[aX + xx] = color
        }
    }
}

function ha(size, H, p) 
{
    var bK = 0;
    if (zlib_data_size == 0)
    {
        if (size < 4)
            return 0; 

        zlib_data_size = dO(H, p);
        
        p += 4;
        bK += 4;
        size -= 4;
        bs = 0; 
        bL = new Uint8Array(zlib_data_size);
        if (bL == null)
        {
            
            return 0;
        }
    }
    else
    {
        }



    if (bs + size > zlib_data_size)
    {
        size = zlib_data_size - bs; 
                                              
    }
    for (var a = 0; a < size; a++) bL[a + bs] = H[p + a];
    bs += size;
    bK += size;

    if (bs < zlib_data_size)
    {
        
        zlib_data_size = 0; 
        return 0; 
    }
    eW(aR, bN, ac, bB);
    zlib_data_size = 0; 

    if (au > 0)
    {
        bp = 1; 
    }
    else
    {
        bp = 0; 
        av();
        }

    return (bK);

}

function eW(x, y, cx, cy)
{
    var g = cx * cy * 4;
    


    if (zipfirsttime)
    {
        zipfirsttime = false;
        zip_inflate_BEGIN();
        var q = new Uint8Array(bL.length - 2);
        for (var a = 0; a < bL.length - 2; a++) q[a] = bL[a + 2];
        bL = q;
    }

    var G = ZipInflate_append(bL, g);


    if (G == null)
    {
        
    }
    else
    {
        
    }
    if (G != null)
    {

        ck(x, y, cx, cy, G, 0);


    }
}
function O(t)
{
    

    switch (t)
    {
        case "CTRL+ALT+DEL":
            if (ax == false)
                K(0xffe9, true);
            if (aH == false)
                K(0xffe3, true);
            ax = true;
            aH = true;
            bf(0xffff);
            break;
        case "F1":
            bf(0xffbe);
            break;
        case "F2":
            bf(0xffbf);
            break;
        case "F3":
            bf(0xffc0);
            break;
        case "F4":
            bf(0xffc1);
            break;
        case "F5":
            bf(0xffc2);
            break;
        case "F6":
            bf(0xffc3);
            break;
        case "F7":
            bf(0xffc4);
            break;
        case "F8":
            bf(0xffc5);
            break;
        case "F9":
            bf(0xffc6);
            break;
        case "F10":
            bf(0xffc7);
            break;
        case "F11":
            bf(0xffc8);
            break;
        case "F12":
            bf(0xffc9);
            break;
        case "ALT+F4":
            if (ax == false)
                K(0xffe9, true);
            ax = true;
            bf(0xffc1);
            break;
        case "ENTER":
            bf(0xff0d);
            break;
        case "BACKSPACE":
            K(0xff08, true);
            K(0xff08, false);

            break;
        case "TAB":
            bf(0xff09);
            break;
        case "ESC":
            bf(0xff1b);
            break;
        case "INSERT":
            bf(0xff63);
            break;
        case "PGUP":
            bf(0xff55);
            break;
        case "PGDN":
            bf(0xff56);
            break;
        case "WIN":
            bf(0xffeb);
            break;
        case "LEFT":
            K(0xff51, true);
            K(0xff51, false);
            break;
        case "RIGHT":
            K(0xff53, true);
            K(0xff53, false);
            break;
        case "UP":
            K(0xff52, true);
            K(0xff52, false);
            break;
        case "DOWN":
            K(0xff54, true);
            K(0xff54, false);
            break;
        case "DELETE":
            bf(0xffff);
            break;
        case "APPLE":
            if (aJ)
            {
                K(0xffe9, false);
                aJ = false;
            }
            else
            {
                K(0xffe9, true);
                aJ = true;
            }
            break;
        case "OPTIONS":
            if (bQ)
            {
                K(0xffe7, false);
                bQ = false;
            }
            else
            {
                K(0xffe7, true);
                bQ = true;
            }
            break;
        case "CTRL":
            if (aH)
            {
                K(0xffe3, false);
                aH = false;
            }
            else
            {
                K(0xffe3, true);
                aH = true;
            }
            break;
        case "ALT":
            if (ax)
            {
                K(0xffe9, false);
                ax = false;
            }
            else
            {
                K(0xffe9, true);
                ax = true;
            }
            break;

    } 
}
function bf(an)
{

    K(an, true);
    K(an, false);
    if (ax)
    {
        ax = false;
        K(0xffe9, false);
    }
    if (aJ)
    {
        aJ = false;
        K(0xffe9, false);
    }

    if (bQ)
    {
        bQ = false;
        K(0xffe7, false);
    }
    if (aH)
    {
        aH = false;
        K(0xffe3, false);
    }
    if (dR)
    {
        dR = false;
        K(0xffe1, false);
    }
}

function K(an, aT)
{
    var H = new Uint8Array(8);
    if (fa == true)
        return;
    H[0] = 0x4; 
    if (aT)
        H[1] = 1;
    else
        H[1] = 0;
    H[2] = 0; 
    H[3] = 0; 
    eO(H, 4, an);
    var r = socket.send(H.buffer);
    
}
function cO(an, ft, aT)
{

    var H = new Uint8Array(18);

    for (var a = 0; a < 18; a++) H[a] = 0;
    H[0] = 0x10;
    H[1] = 0x01;
    H[2] = 0xff; 
    if (aT)
        H[3] = 1;
    else
        H[3] = 0;
    H[15] = 0xcd;
    H[17] = ft;
    aO(H, 6, an);
    H[9] = cT(256);
    H[10] = cT(256);
    H[11] = cT(256);

    fT(H, 2, 16);
    var r = socket.send(H.buffer);
    

}

function hF(ch) 
{
    

    if (ch == 8364)
        ch = 0x80; 
    if (socket == false)
        return;


    if (am.charAt(0) == '0')
    {
        K(ch, true);
        K(ch, false);
    }
    else
    {
        var aZ = 0;
        var bd = 0;
        switch (dp)
        {
            case 1: 
                aZ = hG[ch & 0xff][0];
                bd = hG[ch & 0xff][1];
                break;
            case 2: 
                aZ = fW[ch & 0xff][0];
                bd = fW[ch & 0xff][1];
                break;
            case 3: 
                aZ = gN[ch & 0xff][0];
                bd = gN[ch & 0xff][1];
                break;
            case 4: 
                aZ = gY[ch & 0xff][0];
                bd = gY[ch & 0xff][1];
                break;
            case 5: 
                aZ = gR[ch & 0xff][0];
                bd = gR[ch & 0xff][1];
                break;
            case 6: 
                aZ = ga[ch & 0xff][0];
                bd = ga[ch & 0xff][1];
                break;

        } 
          
        if (aZ != -1)
        { 

            if ((aZ & aG) == aG)
            {
                if (bQ == false)
                {

                    K(0xffe7, true);
                }
            }
            if ((aZ & aP) == aP)
            {
                K(0xffe1, true);
            }
            cO(ch & 0xff, aZ, true);
            cO(ch & 0xff, aZ, false);


            if ((aZ & aP) == aP)
            {
                K(0xffe1, false);
            }
            if ((aZ & aG) == aG)
            {
                K(0xffe7, false);
            }
        }
        if ((bd & aG) == aG)
        {
            if (bQ == false)
            {
                bQ = true;
                K(0xffe7, true);
            }
        }
        if (bd != -1)
        { 
            if ((bd & aP) == aP)
            {
                K(0xffe1, true);
            }
            if ((bd & aG) == aG)
            {
                if (bQ == false)
                {
                    K(0xffe7, true);
                }
            }
            cO(ch & 0xff, bd, true);
            cO(ch & 0xff, bd, false);


            if ((bd & aP) == aP)
            {
                K(0xffe1, false);
            }
            if ((bd & aG) == aG)
            {
                K(0xffe7, false);
            }

        }
    }

    if (ax)
    {
        K(0xffe9, false);
        ax = false;
    }
    if (aJ)
    {
        K(0xffe9, false);
        aJ = false;
    }
    if (bQ)
    {
        K(0xffe7, false);
        bQ = false;
    }
    if (aH)
    {
        K(0xffe3, false);
        aH = false;
    }
    if (dR)
    {
        K(0xffe1, false);
        dR = false;
    }

}



function bV(x, y, aT)
{

    var H = new Uint8Array(6);
    H[0] = 5;
    if (aT)
        H[1] = 1;
    else
        H[1] = 0;
    aO(H, 2, x);
    aO(H, 4, y);

    socket.send(H.buffer);
}
function by(x, y, aT)
{

    var H = new Uint8Array(6);
    H[0] = 5;
    if (aT)
        H[1] = 4;
    else
        H[1] = 0;
    aO(H, 2, x);
    aO(H, 4, y);

    socket.send(H.buffer);
}
function dG(x, y)
{
    var H = new Uint8Array(6);

    H[0] = 5;
    H[1] = 0;
    if (bA)
        H[1] = 1;
    aO(H, 2, x);
    aO(H, 4, y);

    socket.send(H.buffer);

}


function dB(up)
{
    var H = new Uint8Array(6);
    var button;
    if (up)
        button = 0x8;
    else
        button = 0x10;



    H[0] = 5;
    H[1] = button;
    aO(H, 2, aM);
    aO(H, 4, aK);
    socket.send(H.buffer);

}

function fO(H, T)
{
    
    var cg = 0;
    if (T < 4)
        return 0;

    var fb = new Uint8Array(1024);

    var G = gm(H, T);
    if (G > 0)
    {
        var enc = new TextEncoder(); 
        var eJ = enc.encode(aq);
        var fd = enc.encode(aI);

        
        cg = he(fb, 1024, eJ, eJ.length,
            fd, fd.length);
        if (cg > 0)
        {
            var H = new Uint8Array(cg);
            for (var a = 0; a < cg; a++) H[a] = fb[a];
            



            var r = socket.send(H.buffer);
            

            var fk = new Uint8Array(dF);
            for (var a = 0; a < dF; a++) fk[a] = ep[a];

            var hE = socket.send(fk.buffer);
            
        }


    }
    return G;
}

function cT(max)
{
    return Math.floor(Math.random() * max);
}


function cX(be)
{
    var G = "";
    for (var a = 0; a < be.length; a++)
    {
        G = G + fo(be[a]);
    }
    return G;
}
function fo(integer)
{
    var bn = Number(integer).toString(16);
    return (bn.length == 1 ? "0" + bn : bn).toUpperCase();
}

var aE = new Uint8Array(16);
var ep = new Uint8Array(1024);
var dF = 0;
function gm(H, dZ)
{
    



    var dh = new Uint8Array(2);
    var T = new Uint8Array(2);
    var mod = new Uint8Array(128);
    var ce = new Uint8Array(128);
    var cp;



    var dn = new Uint8Array(128);
    var key;
    var el;  
    var modmpi;  
    var fi;  
    var dc;  
    var dV;  
    var es;  

    for (var R = 0; R < dh.length; R++)
        dh[R] = 0;
    for (var R = 0; R < T.length; R++)
        T[R] = 0;
    for (var R = 0; R < mod.length; R++)
        mod[R] = 0;
    for (var R = 0; R < ce.length; R++)
        ce[R] = 0;
    var aW = 0;

    if (dZ < 4)
        return 0;
    for (var R = 0; R < 2; R++)
        dh[R] = H[R];
    for (var R = 0; R < 2; R++)
        T[R] = H[R + 2];

    var cw = (T[0]);
    if (cw < 0)
        cw = 256 + cw;
    var cu = (T[1]);
    if (cu < 0)
        cu = 256 + cu;

    aW = 256 * cw + cu;

    
    if (4 + aW + aW < dZ)
        return 0; 

    for (var R = 0; R < aW; R++)
        mod[R] = H[R + 4];
    for (var R = 0; R < aW; R++)
        ce[R] = H[R + 4 + aW];

    for (var R = 0; R < dn.length; R++)
    {

        dn[R] = cT(256);
    }
    dn[0] = 0;
    

    el = bigInt(cX(dh), 16);
    modmpi = bigInt(cX(mod), 16);


    fi = bigInt(cX(ce), 16);

    dc = bigInt(cX(dn), 16);


    dV = el.modPow(dc, modmpi);
    cp = dV.toString(16); 
    




    es = fi.modPow(dc, modmpi);

    key = es.toString(16); 
    

    var dz = new Uint8Array(Math.ceil(cp.length / 2));
    for (var i = 0; i < dz.length; i++) dz[i] = parseInt(cp.substr(i * 2, 2), 16);


    var cP = new Uint8Array(Math.ceil(key.length / 2));
    for (var i = 0; i < cP.length; i++) cP[i] = parseInt(key.substr(i * 2, 2), 16);

    var eQ = md5(cP);
    aE = new Uint8Array(16);
    for (var i = 0; i < aE.length; i++) aE[i] = parseInt(eQ.substr(i * 2, 2), 16);

    

    for (var R = 0; R < aW; R++)
        ep[R] = dz[R];
    dF = aW;
    
    return 4 + aW + aW;
}





function he(aN, cE, eK,
    eL, password, gA)
{
    

    for (var R = 0; R < cE; R++)
        aN[R] = 0;
    for (var R = 0; R < eL; R++)
        aN[R] = eK[R];
    for (var R = 0; R < gA; R++)
        aN[R + 64] = password[R];



    for (var i = 0; i < (128 / 16); i++)
    {
        var eR = new Uint8Array(16);
        for (var R = 0; R < 16; R++)
            eR[R] = aN[16 * i + R];
        var bX = new Uint8Array(16);
        for (var a = 0; a < 16; a++) bX[a] = aE[a];

        var aes = new aesjs.AES(bX);

        var G = aes.encrypt(eR);

        for (var R = 0; R < 16; R++)
            aN[R + (i * 16)] = G[R];
        } 
      
    return 128;


}
function fT(aN, index, cE) 
{
    var fp = new Uint8Array(cE);
    for (var a = 0; a < cE; a++) fp[a] = aN[a + index];

    var bX = new Uint8Array(16);
    for (var a = 0; a < 16; a++) bX[a] = aE[a];

    var aes = new aesjs.AES(bX);

    var G = aes.encrypt(fp);
    for (var a = 0; a < cE; a++) aN[a + index] = G[a];
}

if (gP) console.log("end of the world");

