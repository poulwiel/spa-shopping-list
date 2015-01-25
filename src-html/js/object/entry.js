function Entry(array, objectStorageService) {
	this.update(array, objectStorageService);
}
Entry.prototype.update = function(source, objectStorageService) {
	this.uuid = source.uuid;
	this.name = source.name;
	this.done = source.done;
};