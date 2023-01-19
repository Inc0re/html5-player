    // get DOM elements
    const video = document.querySelector('video');
    const filesInput = document.querySelector('input[type=file]');
    const speedInput = document.querySelector('input[type=text]');
    const filesButton = document.querySelector('a');
    const playlist = document.querySelector('ul');

    // redirect filesButton click to hidden filesInput
    filesButton.addEventListener('click', e => {
      filesInput.click();
      e.preventDefault();
      return false;
    });

    filesInput.addEventListener('change', function (e) {
      // delete all current list items in playlist
      playlist.innerHTML = '';

      // go through all selected files
      for (const file of Array.from(this.files)) {

        // create list item and object url for the video file
        const listItem = document.createElement('li');
        listItem.objUrl = URL.createObjectURL(file);
        listItem.textContent = file.name;

        // give list item a click event listener for the corresponding video
        listItem.addEventListener('click', function (e) {
          this.classList.add('played');
          video.src = this.objUrl;
          video.playbackRate = Number(speedInput.value);
        });

        // append li to the list
        playlist.appendChild(listItem);
      };

      // show the playlist for a moment
      playlist.classList.add('fadeout');
    }, false /* don't capture */);

    // remove playlist fadeout after the animation ends, so it can be retriggered
    playlist.addEventListener('animationend', e => {
      playlist.classList.remove('fadeout');
    });

    // handle changes to speed input
    speedInput.addEventListener('change', e => {
      video.playbackRate = Number(speedInput.value);
      // write actual playback rate value back to input
      speedInput.value = Number(video.playbackRate);
    });

    // add keyboard shortcuts for pause (space) and 5 sec jump (left/right arrow)
    document.addEventListener('keydown', e => {
      // console.log(e.keyCode);
      switch (e.keyCode) {
        case 32: // space
          video.paused ? video.play() : video.pause();
          break;
        case 37: // left arrow
          video.currentTime += -5;
          break;
        case 39: // right arrow
          video.currentTime += 5;
          break;
      }
    });