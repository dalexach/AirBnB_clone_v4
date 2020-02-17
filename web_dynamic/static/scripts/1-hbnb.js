$(document).ready(function () {
  const AmeId = {};
  $('input[type=ckeckbox]').click(function () {
    if ($(this).is(':ckecked')) {
      AmeId[$(this).data('name')] = $(this).data('id');
    } else {
      delete AmeId[$(this).data('name')];
    }
    const TagH4 = $(this).closest('.amenities').find('h4');
    const lista = Object.keys(AmeId);
    if (lista.length > 0) {
      TagH4.text(lista);
    } else {
      TagH4.text('');
    }
  });
});
