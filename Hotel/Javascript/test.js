(function() {
  'use strict';
  let rooms;
  const roomTypesAvailible=[];
  const beginDateInput = new Date('2020-12-01T13:00:00+00:00');
  const endDateInput = new Date('2020-12-31T13:00:00+00:00');
  function getData() {
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
              if (beginBooked < beginDateInput &&
                 beginDateInput < endBooked) {
                break;
              } else if (beginBooked < endDateInput &&
                endDateInput < endBooked) {
                break;
              } else if (beginDateInput < beginBooked &&
                 endDateInput > endBooked) {
                break;
              } else {
                roomType = rooms[i].typeRoom;

                if (roomTypesAvailible.includes(roomType)) {
                } else {
                  roomTypesAvailible.push(roomType);
                }
              }
            }
          }
          console.log(roomTypesAvailible);
        })
        .catch((err) => {
        // doe iets met de error
          console.log(`De request faalde :${err}`);
        });
  }

  document.getElementById('btnAvailibility').addEventListener('click', getData);
})();
