let muscle = 'biceps';
fetch({
  method: 'GET',
  url: 'https://api.api-ninjas.com/v1/exercises?muscle=' + muscle,
  headers: { 'X-Api-Key': 'Y+nxTPsyrkSvnAOH9CKTkQ==dnVOTmqx3Q0WpvJT'},
  contentType: 'application/json'
})
  .then(function (data) {
    console.log(data);
  });


