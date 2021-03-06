// var outLine = new OutLine();

// function show(){
//     outLine.Show();
// }
// function hide(){
//     outLine.Hide();
// }
console.log("component.js load!");

if(typeof(component) == 'undefined'){
    var COMPONENT_ID = "873bfcd88a90c67df2fa13d1b4cf2e9e";
    var COMPONENT_CLASS = "component-873bfcd88a90c67df2fa13d1b4cf2e9e";
    
    var component = new Component();
    component.Init();
    console.log("Component init.");
}

function Component(){
    this._guid = "";
    this._id = "component-"+this._guid;
    this._fatherDom = $("#"+this._id);

    this.Init = function(){
        this._guid = this.GetGuid();
        this._id = "component-"+this._guid;
        this._fatherDom = $("#"+this._id);
        
        this.AddDom($("body:first"));

        $('#show-'+this._id).click(this.Show);
        $('#hide-'+this._id).click(this.Hide);
    }.bind(this);

    this.AddDom = function(fatherDom){
        let id = this._id;
        fatherDom.append(this.CreateFatherDom(id));
        
        this._fatherDom = $("#"+this._id);
        this._fatherDom.append(this.CreateOutLineDom(id));
        
        this._fatherDom = $("#"+this._id);
    }.bind(this);

    this.CreateFatherDom = function(id){
        let dom = '<div style="display:none" class="'+COMPONENT_CLASS+'" id="'+id+'"></div>';
        return dom;
    };

    this.CreateOutLineDom = function(id){
        let dom = "<div>";
        // dom += "<button id='show-"+guid+"' onclick='alert(1);'>alert 1</button>";
        // dom += "<button id='hide-"+guid+"' onclick='alert(2);'>alert 2</button>";
        dom += "<button id='show-"+id+"'>alert 1</button>";
        dom += "<button id='hide-"+id+"'>alert 2</button>";
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
        function S4() {
            return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        }
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    };
}
