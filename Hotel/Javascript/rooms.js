(function() {
  'use strict';
  let rooms;
  const roomTypesAvailible = [];
  function getData() {
    const beginDateInput = new Date(document.getElementById('beginDateInput').value);
    const endDateInput = new Date(document.getElementById('endDateInput').value);
    fetch('../JSON/rooms.json')
        .then((response) => {
          return response.json();
        })
        .then((data) => {
        // gebruik de data in de respons
          rooms = data;
          let roomType;
          let beginBooked;
          let endBooked;
          let i;
          let j;
          for (i = 0; i < rooms.length; i++) {
            for (j = 0; j < rooms[i].bookedFrom.length; j++) {
              beginBooked = new Date(rooms[i].bookedFrom[j]);
              endBooked = new Date(rooms[i].bookedTo[j]);
              if (beginBooked <= beginDateInput &&
                 beginDateInput <= endBooked) {
                break;
              } else if (beginBooked <= endDateInput &&
                endDateInput <= endBooked) {
                break;
              } else if (beginDateInput <= beginBooked &&
                 endDateInput >= endBooked) {
                break;
              } else {
                roomType = rooms[i].typeRoom;

                if (roomTypesAvailible.includes(roomType)) {
                } else {
                  roomTypesAvailible.push(roomType);
                }
                break;
              }
            }
          }
          availibility();
          roomTypesAvailible.length = 0;
        })
        .catch((err) => {
        // doe iets met de error
          console.log(`De request faalde :${err}`);
        });
  }

  document.getElementById('btnAvailibility').addEventListener('click', getData);

  function availibility() {
    if (roomTypesAvailible.includes('junior suite')) {
      document.getElementById('availableJunior').style.display = 'block';
      document.getElementById('notAvailableJunior').style.display = 'none';
    } else {
      document.getElementById('notAvailableJunior').style.display = 'block';
      document.getElementById('availableJunior').style.display = 'none';
    }

    if (roomTypesAvailible.includes('Vital room')) {
      document.getElementById('availableVital').style.display = 'block';
      document.getElementById('notAvailableVital').style.display = 'none';
    } else {
      document.getElementById('notAvailableVital').style.display = 'block';
      document.getElementById('availableVital').style.display = 'none';
    }
    if (roomTypesAvailible.includes('vitality room deluxe')) {
      document.getElementById('availableDeluxe').style.display = 'block';
      document.getElementById('notAvailableDeluxe').style.display = 'none';
    } else {
      document.getElementById('notAvailableDeluxe').style.display = 'block';
      document.getElementById('availableDeluxe').style.display = 'none';
    }
  }
})();
