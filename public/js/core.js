document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems,{});
  });

//   $('.delete-post').on('click',  function(e){
//     e.preventDefault();
//     var id = $(this).parent().data('id');
//     $.ajax({ 
//         url: '/'+ id,
//         type: 'DELETE',
//         success: function(data) {
//             // your success response data here in data variable
//             console.log('result ', data);
//         }
//     });
// });