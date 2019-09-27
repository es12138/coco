
var s = document.createElement("canvas"),
	img = W("#__CONTAINER_FOR_IMG");
img.insertAdjacentElement("beforeend",s);
var o = s.getContext("2d"),
	u = new Image;
u.onload = function() {
	o.drawImage(u, 0, 0, pictureSize, pictureSize);
//	var n = o.getImageData(0, 0, e, e);
//	for (var r = 0; r < e * e * 4; r += 4) {
//		var s = n.data[r],
//			a = n.data[r + 1],
//			f = n.data[r + 2];
//		t.push([s, a, f])
//	}
//	console.log(t.length+",data:"+n.data.length);
//	i(0, 0, 0, 0, 0)
};
u.src = "/4.%20picture/src/fun4.jpg";