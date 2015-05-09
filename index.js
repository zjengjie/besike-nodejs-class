module.exports = function(init, parent) {
	if (init.initialize) {
		init.constructor = init.initialize;
	}
	return init.constructor;
}
