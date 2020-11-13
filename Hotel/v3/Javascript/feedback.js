/* eslint-disable max-len */
(function() {
  let results = [];
  'use strict';
  GetData();
  function GetData() {
    fetch('../JSON/feedback.json')
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          // gebruik de data in de respons
          results = data.results;
          for (i = 0; i < results.length; i++) {
              console.log(results);
            const comment = document.createElement('DIV');
            comment.className ='comment';
            comment.innerHTML = `<h2>${results[i].name}</h2> <div class="bodyComment">
            <p class="textComment">${results[i].description}</p>
            <time class="timeComment">${results[i].createdAt}</time>
           </div>`;
            document.getElementById('outputSide').appendChild(comment);
            console.log(comment);
          }
        })
        .catch((err) => {
        // doe iets met de error
          console.log(`De request faalde :${err}`);
        });

    event.preventDefault();
  }

  function showContent() {
    console.log('test');
  }

  document.getElementById('btnSubmitComment').addEventListener('click', GetData);
})();
