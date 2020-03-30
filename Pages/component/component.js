// var outLine = new OutLine();

// function show(){
//     outLine.Show();
// }
// function hide(){
//     outLine.Hide();
// }

var component = new Component();
component.Init();

function Component(){
    this._fatherDom = $("body:first");
    this._guid = '';

    this.Init = function(guid){
        this._guid = guid;
        this._fatherDom.append(this.CreateOutLineDom(guid));

        $('#show-12138').click(this.Show);
        $('#hide-12138').click(function(){
            this.Hide();
        });
    }.bind(this);

    this.CreateOutLineDom = function(guid){
        let dom = "<div>";
        // dom += "<button id='show-"+guid+"' onclick='alert(1);'>alert 1</button>";
        // dom += "<button id='hide-"+guid+"' onclick='alert(2);'>alert 2</button>";
        dom += "<button id='show-12138'>alert 1</button>";
        dom += "<button id='hide-12138'>alert 2</button>";
        dom += "</div>";
        return dom;
    };

    this.Show = function(){
        console.log("component: Show().");
    };
    this.Hide = function(){
        console.log("component: Hide().");
    };
}