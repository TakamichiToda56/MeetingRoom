function modalOpen(ownData){
  //キーボード操作などにより、オーバーレイが多重起動するのを防止する
  //$(this).blur() ;	//ボタンからフォーカスを外す
  if($(".modalOverlay")[0]) return false ;
  //オーバーレイ用のHTMLコードを、[body]内の最後に生成する
  $("body").append('<div class="modalOverlay"></div>');
  //[$modal-overlay]をフェードインさせる
  $(".modalOverlay").fadeIn("slow");
  $(".modalWindow#"+ownData.id).fadeIn("slow");
  modalResize();

  // モーダルウインドウの外か閉じるがクリックされる
  $('.modalOverlay, .modalClose').off().click(function(){
    // モーダルコンテンツとオーバーレイをフェードアウト
    $(".modalWindow").fadeOut('slow');
    $('.modalOverlay').fadeOut('slow',function(){
      // オーバーレイを削除
      $('.modalOverlay').remove();
    });
  });
  // リサイズしたら表示位置を再取得
  $(window).on('resize', function(){
    modalResize();
  });

  // モーダルコンテンツの表示位置を設定する関数
  function modalResize(){
    // ウィンドウの横幅、高さを取得
    var w = $(window).width();
    var h = $(window).height();
    // モーダルコンテンツの表示位置を取得
    var x = (w - $(".modalWindow").outerWidth(true)) / 2;
    var y = (h - $(".modalWindow").outerHeight(true)) / 2;
    // モーダルコンテンツの表示位置を設定
    $(".modalWindow").css({'left': x + 'px','top': y + 'px'});
  }
}
