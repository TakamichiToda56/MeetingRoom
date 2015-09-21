var allSchedulePlan = new Array;

$(document).ready(function() {

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
      allSchedulePlan.push(shapingScheduleData(start,end,view));
      document.getElementById('schedulePlan').value = allSchedulePlan;
			newTitle = document.getElementById('newReserve').value;
		  var	eventData = {
        title: newTitle,
				start: start,
				end: end
			};
			$('#calendar').fullCalendar('renderEvent', eventData, true); // stick? = true
			$('#calendar').fullCalendar('unselect');
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

shapingScheduleData = function(start,end,view){
  var schedulePlan = new Array;
  if(view.name == 'month'){
    schedulePlan.push(
      start._d.getFullYear() +"/"+
      (parseInt(start._d.getMonth())+1) +"/"+
      start._d.getDate() +" 終日"
    );
    schedulePlan.push(
      end._d.getFullYear() +"/"+
      (parseInt(end._d.getMonth())+1) +"/"+
      (parseInt(end._d.getDate())-1) +" 終日"
    );
  }else{
    schedulePlan.push(
      start._d.getFullYear() +"/"+
      (parseInt(start._d.getMonth())+1) +"/"+
      start._d.getDate() +" "+
      start._d.getHours() +"時"+
      start._d.getMinutes() +"分"
    );
    schedulePlan.push(
      end._d.getFullYear() +"/"+
      (parseInt(end._d.getMonth())+1) +"/"+
      end._d.getDate() +" "+
      end._d.getHours() +"時"+
      end._d.getMinutes() +"分"
    );
  }
  return schedulePlan;
}
