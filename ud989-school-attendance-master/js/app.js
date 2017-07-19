/* STUDENTS IGNORE THIS FUNCTION
 * All this does is create an initial
 * attendance record if one is not found
 * within localStorage.
 */
const COLUMNS_NUMBER = 12;
const STUDENTS = ['Slappy the Frog', 'Lilly the Lizard', 'Paulrus the Walrus',
                  'Gregory the Goat', 'Adam the Anaconda'];
var tableView = {
  missedList: [],
  init: function() {
    var tbody = document.getElementById('table-container');
    for (var i = 0; i < STUDENTS.length; i++) {
      var attendanceInfo = interface.getAttendanceInfo(i);
      var tr = document.createElement('tr');

      var tdName = document.createElement('td');
      tdName.classList.add('name-col');
      tdName.textContent = attendanceInfo.name;
      tr.appendChild(tdName);

      for (var j = 0; j < COLUMNS_NUMBER; j++) {
        var td = document.createElement('td');
        var input = document.createElement('input');
        input.setAttribute('type', 'checkbox');
        input.addEventListener('input', (function(i, j) {
          return function(e) {
            interface.setData(i, j, e.target.checked);
            console.log('### i = ' + i + ';### j = ' + j);
          };
        })(i, j));
        td.appendChild(input);
        tr.appendChild(td);
      }

      var tdMissed = document.createElement('td');
      tdMissed.classList.add('missed-col');
      tdMissed.textContent = attendanceInfo.missed;
      this.missedList.push(tdMissed);
      tr.appendChild(tdMissed);

      tbody.appendChild(tr);
    }
  },

  render: function(missed, index) {
    this.missedList[index].textContent = missed;
  }
};

var interface = {
  init: function() {
    attendanceData.init();
    tableView.init();
  },

  getAttendanceInfo: function(index) {
    return attendanceData.getAttendanceInfo(index);
  },

  setData: function(nameIndex, attendanceIndex, checked) {
    attendanceData.updataData(nameIndex, attendanceIndex, checked);
    tableView.render(attendanceData.getMissedNum(nameIndex), nameIndex);
  }
};

var attendanceData = {
  studentsAttendance: [],
  init: function() {
    for (var i = 0; i < STUDENTS.length; i++) {
      var attendance = [];
      for (var index = 0; index < COLUMNS_NUMBER; index++) {
        attendance.push(false);
      }
      
      var attendanceInfo = {
        name: STUDENTS[i],
        attendance: attendance,
        missed: COLUMNS_NUMBER
      }

      this.studentsAttendance.push(attendanceInfo);
    }
  },

  getAttendanceInfo: function(index) {
    return this.studentsAttendance[index];
  },

  updataData: function(nameIndex, attendanceIndex, checked) {
    this.studentsAttendance[nameIndex].attendance[attendanceIndex] = checked;
    if (checked) {
      this.studentsAttendance[nameIndex].missed--;
    } else {
      this.studentsAttendance[nameIndex].missed++;
    }
  },

  getMissedNum: function(nameIndex) {
    return this.studentsAttendance[nameIndex].missed;
  }
};

interface.init();
