let muscle = 'biceps';
$.ajax({
  method: 'GET',
  url: 'https://api.api-ninjas.com/v1/exercises?muscle=' + muscle,
  headers: { 'X-Api-Key': 'Y+nxTPsyrkSvnAOH9CKTkQ==dnVOTmqx3Q0WpvJT' },
  contentType: 'application/json',
  success: function (result) {
    console.log(result);
  },
  error: function ajaxError(jqXHR) {
    console.error('Error: ', jqXHR.responseText);
  },
});


