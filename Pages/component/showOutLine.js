function OutLine(){

    this.Init = function(){

    };

    this.AddDom = function(){

    };

    this.Show = function(){
        console.log("show out line.");
        [].forEach.call($$('*'), function(a) {
            a.style.outline = "1px solid #" + (~~(Math.random()*(1<<24))).toString(16);
        });
    };
    this.Hide = function(){
        console.log("hide out line.");
        [].forEach.call($$('*'), function(a) {
            a.style.outline = "";
        });
    };
}