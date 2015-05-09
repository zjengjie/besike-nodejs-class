module.exports = function(init) {
	var obj = {};
	if (init.initialize) {
		obj.constructor = init.initialize;
		delete init.initialize;
	}
	obj.constructor.prototype = init;
	return obj.constructor;
}
