(function() {
  'use strict';
  const date = new Date();
  /* functie die de volledige data oproept van huidige datum*/
  const renderCalender = () => {
    /* date.setDate geeft het nummer van de dag weer: zondag=0 maandag=1...*/
    const firstDayIndex = date.getDay();
    const lastDayIndex = new Date(date.getFullYear(),
        date.getMonth() + 1, 0).getDay();
    date.setDate(1);
    /* end*/
    const monthDays = document.querySelector('.days');
    /* Geeft het aantal dagen van de maand terug*/
    const lastDay = new Date(date.getFullYear(),
        date.getMonth() + 1, 0).getDate();
    /* end*/
    const prevLastDay = new Date(date.getFullYear(),
        date.getMonth(), 0).getDate();
    const nextDays = 7 - lastDayIndex -1;
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'];

    document.querySelector('.date h1').innerHTML = months[date.getMonth()];
    document.querySelector('.date p').innerHTML = date.toDateString();

    let days = '';
    /* Zolang firstDayIndex niet op nul staat zal hier een div gecreerd worden met dagen van de vorige maand */
    for (let i = firstDayIndex; i > 0; i-- ) {
      days += `<div class="prev-date">${prevLastDay - i +1}</div>`;
    }

    for (let i = 1; i <= lastDay; i++) {
      if (i === new Date().getDate() &&
    date.getMonth() === new Date().getMonth()) {
        days += `<div class="today">${i}</div>`;
      } else {
        days += `<div>${i}</div>`;
      }
    }

    for (let i = 1; i <= nextDays; i++) {
      days += `<div class="next-date">${i +1}</div>`;
      monthDays.innerHTML = days;
    }
  };


  document.querySelector('.prev').addEventListener('click', () =>{
    date.setMonth(date.getMonth() - 1);
    renderCalender();
  });

  document.querySelector('.next').addEventListener('click', () =>{
    date.setMonth(date.getMonth() + 1);
    renderCalender();
  });
  renderCalender();
})();


