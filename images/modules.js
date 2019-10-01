const Util = (function(){
    const dataToDom = {
        // 카드 데이터 -> 카드 HTML
        getCardDOM:function(type, data){
            let idx = data.idx;
            let title = data.title;
            let description = data.description;
            let card_dom = ''
            +'<div class="card" data-type=' + type + ' data-idx=' + idx + '>'
            +   '<div class="front">'
            +       '<div class="card-image ' + type + '"></div>'
            +       '<div class="card-description">'
            +           '<h2>' + title + '</h2>'
            +           '<hr>'
            +           '<p>' + description + '</p>'
            +       '</div>'
            +   '</div>'
            +'</div>';
            return card_dom;
        },
        // 메뉴 데이터 -> 메뉴 HTML
        getContentMenuDOM:function(data, type, idx){
            let contentmenu_dom = ''
            +'<li>'
            +   '<a href="' + data.link + '?title=' + Data[type][idx*1].title + '&idx=' + idx + '&type=' + type + '&no=' + data.no + '">' + data.title + '</a>'
            +'</li>';
            return contentmenu_dom;
        }
    }

    return {
        /* type : html, css, javascript ... */
        getCardListDOM: function(type){
            let cardListDOM = ''
            let cardListData = Data[type];

            $.each(cardListData, function(i, o){
                cardListDOM += dataToDom.getCardDOM(type, o);
            })

            return cardListDOM;
        },
        getContentMenuListDOM: function(type, idx){
            let menuListDOM = '';
            let menuListData = Data[type][idx*1].contents;

            menuListDOM += '<ul>';
            $.each(menuListData, function(i, o){
                menuListDOM += dataToDom.getContentMenuDOM(o, type, idx);
            })
            menuListDOM += '</ul>'

            return menuListDOM;
        },
        getURLData: function(){
            let GETParams = {};
            let url = "";

            url = decodeURI(location.href);
            const parameters = (url.slice(url.indexOf('?') + 1, url.length)).split('&')
            for (let i = 0; i < parameters.length; i++) {
                const key = parameters[i].split('=')[0];
                const value = parameters[i].split('=')[1];
                GETParams[key] = value;
            }

            return GETParams;
        },
        moveToFirstContent: function(type, idx){
            const firstContentLink = Data[type][idx*1].contents[0].link 
            + '?title=' + Data[type][idx*1].title
            + '&idx=' + idx
            + '&type=' + type
            + '&no=0';
            location.href=firstContentLink;
        }
    }
})();

const UI = (function(){
    const update = {
        setTitle: function(){
            const jsonURLData = Util.getURLData();
            const title = jsonURLData.title;
            $('.title h3').html(title);
        },
        setCardList: function(type, option){
            const domString = Util.getCardListDOM(type);
            if(option === 'filter'){
                $('.card-list').html(domString);
            }else if(option === undefined){
                $('.card-list').append(domString);
            }
        },
        setContentsHeight: function(){
            $('html').scrollTop(100);
        }
    }

    const event = {
        initCardList: function(){
            $('.card-list').html('');
            update.setCardList('html');
            update.setCardList('css');
            update.setCardList('javascript');
            update.setCardList('vue');
            update.setCardList('react');
            update.setCardList('shell');
            update.setCardList('spring');
        },
        filterCardList: function(type){
            update.setCardList(type, 'filter');
            return false;
        }
    };

    /* Card Category Filter - 글자색 변경 이벤트 */
    $('.card-side li').on('click', function(){
        $('.card-side li').removeClass('on');
        $(this).addClass('on');
    })

    /* Card Category Filter - 카드 필터링 이벤트 */
    $(document).on('click', '.f-all', function(){event.initCardList(); return false;});
    $(document).on('click', '.f-html', function(){event.filterCardList('html'); return false;});
    $(document).on('click', '.f-css', function(){event.filterCardList('css'); return false;});
    $(document).on('click', '.f-javascript', function(){event.filterCardList('javascript'); return false;});
    $(document).on('click', '.f-vue', function(){event.filterCardList('vue'); return false;});
    $(document).on('click', '.f-react', function(){event.filterCardList('react'); return false;});
    $(document).on('click', '.f-shell', function(){event.filterCardList('shell'); return false;});
    $(document).on('click', '.f-spring', function(){event.filterCardList('spring'); return false;});

    /* Card Category 글 목록조회 및 첫화면 보기 */
    $(document).on('click', '.card', function(){
        const type = $(this).data('type');
        const idx = $(this).data('idx');

        // const domString = Util.getContentMenuListDOM(type, idx);
        // $('.card-side').html(domString);
        
        Util.moveToFirstContent(type, idx);
    })

    return {
        init: function(){
            event.initCardList();
            if(location.href.indexOf('entry/')>=0){
                const urlData = Util.getURLData();
				$('.title h3').html(urlData.title);
                
                $('.title').show();
                $('#contents').show();
                $('.card-layout').hide();

                $('.side').html(Util.getContentMenuListDOM(urlData.type, urlData.idx));
                $('.side li').eq(urlData.no*1).addClass('on');
                $('.side ul').scrollTop(50*urlData.no);
			}else{
                $('.title').hide();
                $('#contents').hide();
                $('.card-layout').show();
            }
            $('body').css('opacity', 1);
        }
    }
})();