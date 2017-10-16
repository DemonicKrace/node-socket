var rescueAPI = require("./rescue/rescueAPI");

/*
rescueAPI.getAllHistoryEvents(function(data){
	console.log(data);
});
*/
//addInjureRunner("1", "2017-10-02 14:29:19");
//addInjureRunner("2", "2017-10-02 14:34:19");
//addInjureRunner("3", "2017-10-02 14:40:19");
//
//assignEventToRescuer("1", "2017-10-02 14:29:19", "99");
//assignEventToRescuer("2", "2017-10-02 14:34:19", "98");
//
//updateFinishedRecuseEvent("1", "99", "2017-10-02 14:29:19", "2017-10-02 14:49:19", "2017-10-02 14:59:19",
//"chief_complaint", "trauma_part", "diagnosis", "trauma_type", "current_cure", "later_cure");
//getAllRescueEvents();
//
//getAllUnassignedEvents();
//
//getAllAssignedEvents();
//
//getAllHistoryEvents();
//
//
//
//
/*

//string format
String.prototype.format = function() {
  var str = this;
  for (var i = 0; i < arguments.length; i++) {
    var reg = new RegExp("\\{" + i + "\\}", "gm");
    str = str.replace(reg, arguments[i]);
  }
  return str;
}
console.log("{0}{1}".format("bbb", "aaa"));
*/

var str = undefined ? "t" : "f";
console.log(str);

var str = null ? "t" : "f";
console.log(str);

var str = "" ? "t" : "f";
console.log(str);

var str = "apple" ? "t" : "f";
console.log(str);


