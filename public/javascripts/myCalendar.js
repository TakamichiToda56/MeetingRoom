var allSchedulePlan = [];

$(document).ready(function() {
	var allSchedulePlan = document.getElementById('schedulePlan').value.split(",");
	allSchedulePlan = deleteCoron(allSchedulePlan)
	if(document.getElementById('schedulePlan').value.length==0){
		var osdJsonList = {'title':"",'start':1,'end':1	};
	}else{
		var osdJsonList = shapeOldSchedule(document.getElementById('schedulePlan').value);
	}
	$('#calendar').fullCalendar({
		header: {
			left: 'prev,next today',
			center: 'title',
			right: 'month,agendaWeek,agendaDay'
		},
		defaultView: 'agendaWeek',
    timezone: 'local',
		selectable: true,
		selectHelper: true,

    // ボタン文字列
    buttonText: {
        today:    '今日',
        month:    '月',
        week:     '週',
        day:      '日'
    },
    // 月名称
    monthNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    // 月略称
    monthNamesShort: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    // 曜日名称
    dayNames: ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'],
    // 曜日略称
    dayNamesShort: ['日', '月', '火', '水', '木', '金', '土'],

		eventSources: [{
                events: osdJsonList
							}],
		select: function(start, end, jsEvent, view) {
			// 予約を時間で入力しているかの判別
			if(!start._isUTC){
				title = prompt("予約者名を入力して下さい", "");
				document.getElementById('newReserve').value = title;
				// 予約社名を入力しているのか確認
				if(title!=""){
					jsonText = shapeJSONText(title, start, end);
					jsonData = JSON.parse(jsonText);
					$('#calendar').fullCalendar('renderEvent', jsonData, true);
					$('#calendar').fullCalendar('unselect');
					allSchedulePlan.push(jsonText);
					document.getElementById('schedulePlan').value = allSchedulePlan;
					jsSubmit('sendScedule','/','POST');
					}else{
						alert("予約者名を入力して下さい。");
					}
			}else{
				alert("weekかdayをクリックして時間で入力して下さい。");
			}
		},

    eventClick: function(event, jsEvent, view) {
      var isDeletePlan = confirm("この予定を削除しますか？");
      if(isDeletePlan){
				var deleteDay = shapeJSONText(event.title,event.start,event.end)
        var deleteNum = new Array;
        $('#calendar').fullCalendar("removeEvents", event._id);
        for(var i = 0; i < (allSchedulePlan.length-2);i += 3){
					var bindSchedule = allSchedulePlan[i] + "," + allSchedulePlan[i+1] + "," + allSchedulePlan[i+2]
						if(bindSchedule==deleteDay){
							allSchedulePlan.splice(i,3);
						}
        }
        document.getElementById('schedulePlan').value = allSchedulePlan;
      }
    },
    eventResizeStop: function(event, jsEvent, ui, view){
      // var newDay = shapingScheduleData(event.start,event.end,view);
      // allSchedulePlan[event._id.split("_fc")[1]-1] = newDay;
			var newDay = shapingScheduleData(event.start,event.end,view);
      allSchedulePlan[event._id.split("_fc")[1]-1] = newDay;
      document.getElementById('schedulePlan').value = allSchedulePlan;
    },
    eventDragStop: function( event, jsEvent, ui, view ) {
      var newDay = shapingScheduleData(event.start,event.end,view);
      allSchedulePlan[event._id.split("_fc")[1]-1] = newDay;
      //console.log(1);
      document.getElementById('schedulePlan').value = allSchedulePlan;
      //console.log(2);
    },
		editable: true,
		eventLimit: true, // allow "more" link when too many events
	});
});

shapeJSONText = function(title,start,end){
	var jsonData =	{
		'title':title,
		'start':start,
		'end':end
	};
	return JSON.stringify(jsonData);
}

shapeOldSchedule = function(elm){
	if(elm[0]==","){
		elm = elm.substr(1);
	}
	elmList = elm.split("},{");
	res = []
	for(i = 0; i < elmList.length; i++){
		if(elmList[i][0]!="{"){
			elmList[i] = "{" + elmList[i];
		}
		if(elmList[i][(elmList[i].length-1)]!="}"){
			elmList[i] = elmList[i] + "}";
		}
		var shapeData = JSON.parse(elmList[i]);
		res.push(shapeData);
	}
	return res;
}

deleteCoron = function(allay){
	if(allay[0]==""){
		res = [];
		for(var i = 1; i < allay.length; i++){
			res.push(allay[i]);
		}
		return res
	}else{
		return allay
	}
}

jsSubmit = function(formName, url, method){
    // サブミットするフォームを取得
    var f = document.forms[formName];
    f.method = method; // method(GET or POST)を設定する
    f.action = url;    // action(遷移先URL)を設定する
    f.submit();        // submit する
    return true;
}
