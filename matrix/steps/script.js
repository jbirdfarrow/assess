$(function () {
  var data = [
    {
      idx: 1,
      title: '👋Welcome ',
      content: 'What you see is a dashboard of the most current sustainability metrics for Destinations and Blue Communities.  The data you see here is a real time reflection of data entered into through the Blue Community App.'
    },
    {
      idx: 2,
      title: '🌊Blue Community Matrix',
      content: 'Every destination known for tourism faces a complex matrix of issues related to sustainability.  By assessing strengths and weaknesses through data collection, we can set strategic goals for progress over time.'
    },
    {
      idx: 3,
      title: '🚉🚿Sustainability Metrics👨‍👦‍👦',
      content: 'Destination managers and local assessors collect data across 20 categorical metric groups, each containing a set of questions geared to analyze efforts and areas for improving local policy and practice.'
    },
    {
      idx: 4,
      title: 'Accountability & Transparency',
      content: 'Our assessment enables assessors to provide proof and documentation. Together, we can erradicate greenwashing through championing verifiable proof of improvement of destinations for tourism. '
    },
    {
      idx: 5,
      title: 'Do You Live in a Blue Community?',
      content: 'Is your destination community acting to mitigate the effects of climate change? Your water bills, energy management and waste practices tell the story.Self Audit as a Team.'
    }
  ];
  
  var template =
    '<div class="slides" data-active-slide="1">' +
      '{{#slides}}' +
        '<article class="step" data-slide="{{idx}}">' +
          '<header>{{title}}</header>' +
          '<div class="content">{{content}}</div>' +
        '</article>' +
      '{{/slides}}' +
    '</div>';
  
  $('.how-to-guide').append(Mustache.render(template, { slides: data }));
  
  var slidesCount = data.length;
  var currentIdx = 1;
  
  $('body')
    .off('click', '.js-nav:not(.disabled)')
    .on('click', '.js-nav:not(.disabled)', function (event) {
      var button = $(event.currentTarget).blur();
      var container = button.parents('.js-container');
      
      var newIdx = currentIdx + (button.attr('data-nav') === 'prev' ? -1 : 1);
      container
        .find('.slides').attr('data-active-slide', newIdx).end()
        .find('.js-slide-no').html(newIdx);
      
      /* enable/disable nav buttons */  
      container.find('.js-nav').removeClass('disabled');
      if (newIdx <= 1) {
        container.find('.js-nav[data-nav="prev"]').addClass('disabled');
      } else if (newIdx >= slidesCount) {
        container.find('.js-nav[data-nav="next"]').addClass('disabled');
      }
      
      currentIdx = newIdx;
      
      return true;
    });
});