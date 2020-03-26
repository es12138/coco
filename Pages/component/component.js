var outLine = new OutLine();

function show(){
    outLine.Show();
}
function hide(){
    outLine.Hide();
}

function Component(){
    this._fatherDom;

    this.Init = function(dom){
        this._fatherDom = dom;
        this._fatherDom.append(this.CreateOutLineDom());
    };

    this.CreateOutLineDom = function(){
        let dom = "";
        dom += "<button onclick='alert(1);'>alert 1</button>"
        dom += "<button onclick='alert(2);'>alert 2</button>"
        return dom;
    }
}