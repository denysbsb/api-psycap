
function AbstractController() {}

AbstractController.prototype.sendData = function(success, data, message) {
    return { success: success, data: data, message: message };
}

module.exports = new AbstractController();