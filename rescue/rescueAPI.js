var dateTime = require('node-datetime');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/Test";

//救援表之欄位
let tableName = "rescue_event";

//救援事件表之欄位名稱
var tableColName = [];
tableColName['runner_id'] = 'runner_id';
tableColName['rescuer_id'] = 'rescuer_id';
tableColName['recv_time'] = 'recv_time';
tableColName['arrival_time'] = 'arrival_time';
tableColName['finish_time'] = 'finish_time';

tableColName['chief_complaint'] = 'chief_complaint';
tableColName['trauma_part'] = 'trauma_part';
tableColName['diagnosis'] = 'diagnosis';
tableColName['trauma_type'] = 'trauma_type';
tableColName['current_cure'] = 'current_cure';
tableColName['later_cure'] = 'later_cure';


module.exports = {
	//偵測到需要救援的跑者，將此新增至救援事件
	addInjureRunner: function(runner_id, recv_time){
	//	var dt = dateTime.create();
	//	var recv_time = dt.format('Y-m-d H:M:S');
	//	var id = tableColName['runner_id'];
	//	var time = tableColName['recv_time'];
		var data = {};
		data[tableColName['runner_id']] = runner_id;
		data[tableColName['recv_time']] = recv_time;

		MongoClient.connect(url, function(err, db) {
		  if (err) throw err;
		  db.collection(tableName).insertOne(data, function(err, result) {
		    if (err) throw err;
		    console.log("addInjureRunner: 1 event inserted");
		    db.close();
		  });
		});
	},
	//addInjureRunner("1", "2017-10-02 14:29:19");
	//addInjureRunner("2", "2017-10-02 14:34:19");
	//addInjureRunner("3", "2017-10-02 14:40:19");

	//指揮者指派需要救援的跑者(事件)給救護人員
	assignEventToRescuer: function(runner_id, recv_time, rescuer_id){
		MongoClient.connect(url, function(err, db) {
			if (err) throw err;
			var myquery = {};
			myquery[tableColName['runner_id']] = runner_id;
			myquery[tableColName['recv_time']] = recv_time;

			var newvalues = {};
			newvalues[tableColName['rescuer_id']] = rescuer_id;

			var updatedValues = { $set: newvalues };

			db.collection(tableName).updateOne(myquery, updatedValues, function(err, result) {
				if (err) throw err;
				console.log("assignEventToRescuer: 1 document updated");
				db.close();
			});
		});
	},
	//assignEventToRescuer("1", "2017-10-02 14:29:19", "99");
	//assignEventToRescuer("2", "2017-10-02 14:34:19", "98");

	//將救護人員已處理完的事件做更新
	updateFinishedRecuseEvent: function(runner_id, rescuer_id, recv_time, arrival_time, finish_time,
		chief_complaint, trauma_part, diagnosis, trauma_type, current_cure, later_cure){
		MongoClient.connect(url, function(err, db) {
			if (err) throw err;
			var myquery = {};
			myquery[tableColName['runner_id']] = runner_id;
			myquery[tableColName['rescuer_id']] = rescuer_id;
			myquery[tableColName['recv_time']] = recv_time;

			var newvalues = {};
			newvalues[tableColName['arrival_time']] = arrival_time;
			newvalues[tableColName['finish_time']] = finish_time;
			newvalues[tableColName['chief_complaint']] = chief_complaint;
			newvalues[tableColName['trauma_part']] = trauma_part;
			newvalues[tableColName['diagnosis']] = diagnosis;
			newvalues[tableColName['trauma_type']] = trauma_type;
			newvalues[tableColName['current_cure']] = current_cure;
			newvalues[tableColName['later_cure']] = later_cure;

			var updatedValues = { $set: newvalues };

			db.collection(tableName).updateOne(myquery, updatedValues, function(err, result) {
				if (err) throw err;
				console.log("updateFinishedRecuseEvent: 1 document updated");
				db.close();
			});
		});
	},
	//updateFinishedRecuseEvent("1", "99", "2017-10-02 14:29:19", "2017-10-02 14:49:19", "2017-10-02 14:59:19",
	//"chief_complaint", "trauma_part", "diagnosis", "trauma_type", "current_cure", "later_cure");


	//增加一筆救援事件
	addOneRescueEvent: function(runner_id, rescuer_id, recv_time, arrival_time, finish_time,
		chief_complaint, trauma_part, diagnosis, trauma_type, current_cure, later_cure, callback){

		var data = {}

		data[tableColName['runner_id']] = runner_id;
		data[tableColName['rescuer_id']] = rescuer_id;
		data[tableColName['recv_time']] = recv_time;
		data[tableColName['arrival_time']] = arrival_time;
		data[tableColName['finish_time']] = finish_time;
		data[tableColName['chief_complaint']] = chief_complaint;
		data[tableColName['trauma_part']] = trauma_part;
		data[tableColName['diagnosis']] = diagnosis;
		data[tableColName['trauma_type']] = trauma_type;
		data[tableColName['current_cure']] = current_cure;
		data[tableColName['later_cure']] = later_cure;

		//console.log(data);

		MongoClient.connect(url, function(err, db) {
		  if (err) throw err;
		  db.collection(tableName).insertOne(data, function(err, result) {
		    if (err) throw err;
		    console.log("addOneRescueEvent: 1 event inserted");
		    db.close();
		    callback(result);
		  });
		});

	},

	/*
	//增加多筆救援事件
	addRescueEvents: function(json_data){

	},
	*/

	//查詢全部救援事件
	getAllRescueEvents: function(callback){
		MongoClient.connect(url, function(err, db) {
			if (err) throw err;

			var table = tableName;

			db.collection(tableName).find({}).toArray(function(err, result) {
				if (err) throw err;
//				console.log(result);
				db.close();
				callback(result);
			});
		});
	},
	//getAllRescueEvents();


	//查詢全部待救援且未指派之事件
	getAllUnassignedEvents: function(callback){
		MongoClient.connect(url, function(err, db) {
			if (err) throw err;

			var filter = {
				$exists : false
			}

			var query = {};
			query[tableColName['rescuer_id']] = filter;

			db.collection(tableName).find(query).toArray(function(err, result) {
				if (err) throw err;
//				console.log(result);
				db.close();
				callback(result);
			});
		});
	},
	//getAllUnassignedEvents();


	//查詢全部待已指派但尚未完成救援之事件
	getAllAssignedEvents: function(callback){
		MongoClient.connect(url, function(err, db) {
			if (err) throw err;

			var rescuer_id_filter = {
				$exists : true
			}

			var arrival_time_filter = {
				$exists : false
			}

			var query = {};

			query[tableColName['rescuer_id']] = rescuer_id_filter;
			query[tableColName['arrival_time']] = arrival_time_filter;

			db.collection(tableName).find(query).toArray(function(err, result) {
				if (err) throw err;
//				console.log(result);
				db.close();
				callback(result);
			});
		});
	},
	//getAllAssignedEvents();


	//查詢全部已救援完畢之歷史事件
	getAllHistoryEvents: function(callback){
		MongoClient.connect(url, function(err, db) {
			if (err) throw err;

			var arrival_time_filter = {
				$exists : true
			}

			var query = {};

			query[tableColName['arrival_time']] = arrival_time_filter;

			db.collection(tableName).find(query).toArray(function(err, result) {
				if (err) throw err;
//				console.log(result);
				db.close();
				callback(result);
			});
		});
	},
	//getAllHistoryEvents();
}
