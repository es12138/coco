// var outLine = new OutLine();

// function show(){
//     outLine.Show();
// }
// function hide(){
//     outLine.Hide();
// }
const COMPONENT_ID = "873bfcd88a90c67df2fa13d1b4cf2e9e";
var component = new Component();
component.Init();

function Component(){
    this._guid = this.GetGuid();
    this._id = "component-"+this._guid;
    this._fatherDom = $("#"+this._id);

    this.Init = function(guid){
        this._guid = guid;
        this.AddDom();

        $('#show-12138').click(this.Show);
        $('#hide-'+this._id).click(this.Hide);
    }.bind(this);

    this.AddDom = function(fatherDom){
        fatherDom.append(this.CreateFatherDom(this._id));
        fatherDom.append(this.CreateOutLineDom(this._id));
        
        this._fatherDom = $("#"+this._id);
    };

    this.CreateFatherDom = function(guid){
        let dom = '<div style="display:none" class="component-12138" id="'+guid+'"></div>';
        return dom;
    };

    this.CreateOutLineDom = function(guid){
        let dom = "<div>";
        // dom += "<button id='show-"+guid+"' onclick='alert(1);'>alert 1</button>";
        // dom += "<button id='hide-"+guid+"' onclick='alert(2);'>alert 2</button>";
        dom += "<button id='show-12138'>alert 1</button>";
        dom += "<button id='hide-'"+guid+">alert 2</button>";
        dom += "</div>";
        return dom;
    };

    this.Show = function(){
        console.log("component: Show().");
    };
    this.Hide = function(){
        console.log("component: Hide().");
    };

    this.GetGuid = function () {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                return v.toString(16);
            });
    };
}
