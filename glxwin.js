var glxwin = require('./glxwin.node')

TGLXWin = kindof()

TGLXWin.can.init = function(parent, fontName, fontSize, extraX, tuneY) {
	this.handle = glxwin.create_win(undefined, fontName, fontSize, extraX, tuneY)
	if (glxwin.mainWindow == undefined) glxwin.mainWindow = this
	if (glxwin.all == undefined) glxwin.all = [this]
	else glxwin.all.push(this)
}
TGLXWin.can.setXYWH = function(x, y, w, h) { glxwin.set_xywh(this.handle, x, y, w, h) }
TGLXWin.can.getXYWH = function() { return glxwin.get_xywh(this.handle) }
TGLXWin.can.show = function() { glxwin.show(this.handle) }
TGLXWin.can.run = function() { return glxwin.run(this.handle) }
TGLXWin.can.crect = function(x, y, w, h, color) { glxwin.crect(this.handle, x, y, w, h, color)  }
TGLXWin.can.print = function(text, x, y) { glxwin.print(this.handle, text, x, y) }
TGLXWin.can.fontColor = function(color) { glxwin.font_color(this.handle, color) }
TGLXWin.can.applyFont = function(name, size, color, bgcolor) { return glxwin.apply_font(this.handle, name, size, color, bgcolor) }
TGLXWin.can.textExtent = function(txt) { return glxwin.text_extent(this.handle, txt) }
TGLXWin.can.repaint = function() { glxwin.repaint(this.handle) }
TGLXWin.can.forceRepaint = function() { glxwin.force_repaint(this.handle) }
TGLXWin.can.hide = function() { glxwin.hide(this.handle) }
TGLXWin.can.colorText = function(x, y, w, h, TXT, CLR) { glxwin.color_text(this.handle, x, y, w, h, TXT, CLR) }
TGLXWin.can.getXWindowHandle = function() { return glxwin.get_xwindow_handle(this.handle) }//not tested
TGLXWin.can.paintBegin = function() { glxwin.paintBegin(this.handle) }
TGLXWin.can.paintEnd = function() { glxwin.paintEnd(this.handle) }
TGLXWin.can.setCursor = function(cursor) { glxwin.setCursor(this.handle, cursor) }

glxwin.findObject = function(handle) {
	for (var i = 0; i < this.all.length; i++) if (this.all[i].handle == handle) return this.all[i]
}

glxwin.onCursor = function (handle, x, y) {
	var O  = this.findObject(handle)
	if (O.onCursor != undefined) O.onCursor(x, y)
}

glxwin.onSize = function (handle, w, h) {
	var O  = this.findObject(handle)
	if (O.onSize != undefined) O.onSize(w, h)
}

glxwin.onMouse = function (handle, button, down, x, y) {
	var O  = this.findObject(handle)
	if (O.onMouse != undefined) O.onMouse(button, down, x, y)
}

glxwin.onKey = function (handle, down, char, key, physical) {
	var O  = this.findObject(handle)
	if (O.onKey != undefined) O.onKey(down, char, key, physical)
}

glxwin.onFocus = function(handle, on) {
	var O  = this.findObject(handle)
	if (O.onFocus != undefined) if (O.onFocus(on)) O.repaint()
}

glxwin.onPaint = function (handle) {
	var O  = this.findObject(handle)
	if (O.onPaint != undefined) O.onPaint()
}

glxwin.onPipe = function() {
	var O  = this.findObject(handle)
	if (O.onPipe != undefined) O.onPipe()
}

glxwin.register_callbacks(glxwin)

glxwin.mainLoop = function() {
	function go() {
		glxwin.run()
		setTimeout(function() { setImmediate(go) }, 1)
	}
	setImmediate(go)
}

module.exports = glxwin

/*
// MINIMAL PROGRAM
glxwin = require('./glxwin/glxwin.js')

var w = TGLXWin.create()
w.setXYWH(0, 0, 100, 100)
w.onKey = function(char, key, down, physical) {
	console.log(down, char, key, physical)
}
w.onPaint = function() {
	w.crect(0, 0, 1000, 1000, 0xff000000)
}
w.show()
glxwin.mainLoop()

*/
