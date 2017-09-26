$(document).ready(function() {
  var breakLength = 5,
      sessionLength = 25,
      isSession = true,             // to mark current countdown is session or break
      isPaused = true,              //to mark for starting or pausing the clock
      timeLeft = sessionLength * 60,
      intervalID = null;

  function getFormatedTime() {
    var m = Math.floor(timeLeft / 60),
        s = timeLeft - m * 60;

    return m + ':' + (s < 10 ? '0' : '') + s;
  }

  // function fillClock() {
  //   if (isSession) {
  //     $('.fill.session').stop();
  //     $('.fill.break').stop();
  //     $('.fill.session').animate({ height: '0%' }, 200);
  //     $('.fill.break').animate({ height: '0%' }, 200);
  //     // if length is 60 in seconds then fill the height in 60 seconds (60 * 1000)  
  //     $('.fill.session').animate({
  //       height: '100%'
  //     }, (sessionLength * 60) * 1000);      
  //   } else {
  //     $('.fill.session').stop();
  //     $('.fill.break').stop();
  //     $('.fill.session').animate({ height: '100%' }, 200);
  //     $('.fill.break').animate({ height: '0%' }, 200);
  //     $('.fill.break').animate({
  //       height: '100%'
  //     }, (breakLength * 60) * 1000);
  //   }

  // }

  function fillClock(secLeft, secTotal) {
    $('.fill').removeClass('session');
    $('.fill').removeClass('break');

    if (isSession) {
      $('.fill').addClass('session');
    } else {
      $('.fill').addClass('break');
    }

    var heightPct = Math.abs((secLeft/secTotal) * 100 - 100);
    $('.fill').css('height', heightPct + '%');
  }

  function startClock() {
    var secTotal = (isSession) ? sessionLength * 60 : breakLength * 60;

    intervalID = setInterval(function() {
      if (timeLeft > 0) {
        timeLeft--;
        $('.time').text(getFormatedTime());
        fillClock(timeLeft, secTotal);
      } else {
        next();
      }
    }, 1000);

    isPaused = false;
  }

  function pauseClock() {
    // stop reccuring timer sets by setInterval
    // passing a handle returning by setInterval
    clearInterval(intervalID);
    intervalID = null;     // just to make sure that I've cleared the interval
    isPaused = true;
  };

  function next() {
    clearInterval(intervalID);
    intervalID = null;

    if (isSession) {
      // start break countdown
      isSession = false;
      timeLeft = breakLength * 60;
      
    } else {
      // start session countdown
      isSession = true;
      timeLeft = sessionLength * 60;
    }

    startClock();
  }

  function reset() {
    pauseClock();

    if (isSession) 
      timeLeft = sessionLength * 60;
    else
      timeLeft = breakLength * 60;

    $('.time').text(getFormatedTime());

    $('.fill').removeClass('session');
    $('.fill').removeClass('break');
    // $('.fill').css('height', '');
    $('.fill').removeAttr('style');
  }

  $('.control').on('click', function() {
    if (!isPaused)
      return;

    if ($(this).hasClass('break-min') && breakLength > 1) 
      breakLength -= 1;
    else if ($(this).hasClass('break-plus') && breakLength < 100)
      breakLength += 1;
    else if ($(this).hasClass('session-min') && sessionLength > 1)
      sessionLength -= 1;
    else if ($(this).hasClass('session-plus') && sessionLength < 100)
      sessionLength += 1;

    $('.breakLength').text(breakLength);
    $('.sessionLength').text(sessionLength);
    
    if (isSession) 
      timeLeft = sessionLength * 60;
    else 
      timeLeft = breakLength * 60;

    $('.time').text(getFormatedTime());

    $('.fill').removeClass('session');
    $('.fill').removeClass('break');
    // $('.fill').css('height', '');
    $('.fill').removeAttr('style');
  });

  $('.clock').on('click', function() {
    if (isPaused)
      startClock();
    else
      pauseClock();
  });

  $('.next').on('click', function() {
    if (intervalID !== null)
      next();
  });

  $('.reset').on('click', reset);

  $('.time').text(getFormatedTime());

});