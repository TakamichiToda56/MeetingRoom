var allSchedulePlan = new Array;

//$('#calendar').fullCalendar('renderEvent', JSON.parse(document.getElementById('schedulePlan').value), true);
$(document).ready(function() {
	shapeDBData(document.getElementById('id').value)
	$('#calendar').fullCalendar({
		header: {
			left: 'prev,next today',
			center: 'title',
			right: 'month,agendaWeek,agendaDay'
		},
    timezone: 'local',
		//defaultDate: $('#calendar'.fullCalendar( 'today'),
		selectable: true,
		selectHelper: true,

		select: function(start, end, jsEvent, view) {
			//allSchedulePlan.push(document.getElementById('schedulePlan').value);
			title = document.getElementById('newReserve').value;
			// 予約社名を入力しているのか確認
			if(title!=""){
				// 予約を時間で入力しているかの判別
				if(!start._isUTC){
					jsonText = shapeJSONText(title, start, end);
					jsonData = JSON.parse(jsonText);
					$('#calendar').fullCalendar('renderEvent', jsonData, true);
					$('#calendar').fullCalendar('unselect');
					console.log(document.getElementById('schedulePlan').value);
					allSchedulePlan.push(jsonText);
					document.getElementById('schedulePlan').value = allSchedulePlan;
				}else{
					alert("予約は時間で入力して下さい。");
				}
			}else{
				alert("予約者名を入力して下さい。");
			}
		},

    eventClick: function(event, jsEvent, view) {
      var isDeletePlan = confirm("この予定を削除しますか？");
      if(isDeletePlan){
        var deleteDay = shapingScheduleData(
          event.start,event.end,view);
        var deleteNum = new Array;
        $('#calendar').fullCalendar("removeEvents", event._id);
        for(var i = 0; i < allSchedulePlan.length;i++){
          if(allSchedulePlan[i].indexOf(deleteDay[0].toString())!=-1){
            allSchedulePlan.splice(i,1);
            break;
          }
        }
        document.getElementById('schedulePlan').value = allSchedulePlan;
      }
    },
    eventResizeStop: function(event, jsEvent, ui, view){
      var newDay = shapingScheduleData(event.start,event.end,view);
      allSchedulePlan[event._id.split("_fc")[1]-1] = newDay;
      //console.log(1);
      document.getElementById('schedulePlan').value = allSchedulePlan;
      //console.log(2);
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

shapeDBData = function(txt) {
	console.log(txt);
}
