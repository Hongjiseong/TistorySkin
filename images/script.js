$(function(){
    // 검색 포커스 효과 : 파란색
    $('.header .search input').on({
        'focus': function(){$('.header .search').addClass('focus');},
        'focusout' : function(){$('.header .search').removeClass('focus');}
    })

    // 동적 높이조절
    $('#contents').css('height', (screen.availHeight-195) + 'px');

    // 윈도우 스크롤 조절
    setTimeout(function(){$('html').scrollTop(100);}, 200);

    // 카테고리 필터 클릭시 빨갛게 변하고 오른쪽 보더 흰색으로 만들기
    
    $('.card-side li').on('click', function(){
        $('.card-side li').removeClass('on');
        $(this).addClass('on');
    })

    // 카드 클릭시 뷰 전환 ( 변경필요 )
    $('.card').on('click', function(){
        $('.list').hide();
        $('.detail').show();
    })

    UI.init();
});

