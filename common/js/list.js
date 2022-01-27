$(function () {
  // list 더보기 버튼
  const listMoreHandler = () => {
    $('.js-list-button-more').on('click', function () {
      const select = $('.list-button-more-area');
      if(select.hasClass('is--open')) {
        select.removeClass('is--open')
      }else {
        select.addClass('is--open')
      }
      const seting = $(this).find('.list-button-more-content');
      $(document).on('mouseup', function(e) {
        if (seting.has(e.target).length === 0) {
          if(e.target.className !== 'list-button-more js-list-button-more') {
            select.removeClass('is--open');
          }
        }
      })
    })
    $('.js-list-more-item').on('click', function () {
      $('.list-button-more-area').removeClass('is--open')
    })

  }

  //select box
  const selectBoxHandler = () => {
    $(document).on('click', '.js-select', function() {
      const select = $(this);
      if($(this).hasClass('is--open')) {
        $(this).removeClass('is--open')
      }else {
        $(this).addClass('is--open')
      }
      const seting = $(this).find('.select-box-list');
      $(document).on('mouseup', function(e) {
        if (seting.has(e.target).length === 0) {
          if(e.target.className !== select[0].className) {
            select.removeClass('is--open');
          }
        }
      });
    });
    $(document).on('click', '.js-select-item', function() {
      $(this).parents('.js-select').addClass('is--selected')
      $(this).addClass('is--selected').siblings().removeClass('is--selected');
      $($(this).parent().parent().find('.select-box__label')).text($(this).text());
      $($(this).parent().parent().find('.select-box__label')).addClass('is--selected');
    });
  }


  // datepicker
  const datePickerHandler = () => {
    const $startDate = $('.js-start-date');
    const $endDate = $('.js-end-date');

   const startPicker = $startDate.datepicker(
     {
       format: 'yyyy.mm.dd',
       autoPick: true,
       autoHide: true,
       language: 'ko-KR',
       template: `
        <div class="datepicker-container">
         <div class="datepicker-panel years" data-view="years picker">
          <ul class="datepicker-top">
            <li data-view="years prev" class="arrow prev"></li>
            <li class="datepicker-top-current" data-view="years current"></li>
            <li data-view="years next" class="arrow next"></li>
          </ul>
          <ul class="years-list" data-view="years"></ul>
         </div>
          <div class="datepicker-panel months" data-view="months picker">
            <ul class="datepicker-top">
              <li data-view="year prev" class="arrow prev"></li>
              <li class="datepicker-top-current" data-view="year current"></li>
              <li data-view="year next" class="arrow next"></li>
            </ul>
            <ul class="months-list" data-view="months"></ul>
          </div>
          <div class="datepicker-panel days" data-view="days picker">
            <ul class="datepicker-top">
              <li data-view="month prev" class="arrow prev"></li>
              <li class="datepicker-top-current" data-view="month current"></li>
              <li data-view="month next" class="arrow next"></li>
            </ul>
            <ul class="datepicker-week" data-view="week"></ul>
            <ul class="datepicker-days" data-view="days"></ul>
          </div>
        </div>`,
       show: function() {
         $(this).addClass('is--open')
       },
       hide: function() {
         $(this).removeClass('is--open')
       }
     },
   );

    const endPicker = $endDate.datepicker({
      format: 'yyyy.mm.dd',
      autoPick: true,
      autoHide: true,
      startDate: $startDate.datepicker('getDate'),
      language: 'ko-KR',
      template: `
        <div class="datepicker-container">
         <div class="datepicker-panel years" data-view="years picker">
          <ul class="datepicker-top">
            <li data-view="years prev" class="arrow prev"></li>
            <li class="datepicker-top-current" data-view="years current"></li>
            <li data-view="years next" class="arrow next"></li>
          </ul>
          <ul class="years-list" data-view="years"></ul>
         </div>
          <div class="datepicker-panel months" data-view="months picker">
            <ul class="datepicker-top">
              <li data-view="year prev" class="arrow prev"></li>
              <li class="datepicker-top-current" data-view="year current"></li>
              <li data-view="year next" class="arrow next"></li>
            </ul>
            <ul class="months-list" data-view="months"></ul>
          </div>
          <div class="datepicker-panel days" data-view="days picker">
            <ul class="datepicker-top">
              <li data-view="month prev" class="arrow prev"></li>
              <li class="datepicker-top-current" data-view="month current"></li>
              <li data-view="month next" class="arrow next"></li>
            </ul>
            <ul class="datepicker-week" data-view="week"></ul>
            <ul class="datepicker-days" data-view="days"></ul>
          </div>
        </div>`
    });

    $startDate.on('change', function () {
      $endDate.datepicker('setStartDate', $startDate.datepicker('getDate'));
    });

    $('.js-date-button[data-date=0]').addClass('is--active')
    $('.js-date-button').on('click', function () {
      $(this).addClass('is--active').siblings().removeClass('is--active')
      const current = $startDate.datepicker('getDate')
      const standard = Number($(this).attr('data-date'))
      let last = new Date(current.getTime() + (standard * 24 * 60 * 60 * 1000));
      if(standard === 0) {
        last = new Date()
      }
      $endDate.datepicker('setDate', last);
    })
  }

  const filterPartHandler = () => {
    function appendFilter (current) {
      current.after(`<div class="list-filter-part">
        <div class="select-box js-select js-select-filter">
          <strong class="select-box__label">검색 구분</strong><span class="select-box__icon"></span>
          <div class="select-box-list">
            <span class="select-box__item js-select-item">품목코드</span>
            <span class="select-box__item js-select-item">품목명</span>
            <span class="select-box__item js-select-item">모델코드</span>
            <span class="select-box__item js-select-item">속성명</span>
            <span class="select-box__item js-select-item">인쇄상태</span>
            <span class="select-box__item js-select-item">재고수량</span>
            <span class="select-box__item js-select-item" data-category="authentication">인증정보</span>
          </div>
        </div>
        <input type="text" class="filter-input__search" placeholder="검색 내용을 입력해 주세요.">
        <div class="filter-part-button-area">
          <button class="part-button add js-part-add"><span class="blind">추가</span></button>
          <button class="part-button remove js-part-remove"><span class="blind">제거</span></button>
        </div>
      </div>`)
    }

    // 검색창에서 검색조건 추가버튼 눌렀을 경우
    $(document).on( 'click' , '.js-part-add', function() {
      appendFilter($(this).parents('.list-filter-part'))
    });
    // 검색창에서 검색조건 삭제버튼 눌렀을 경우
    $(document).on( 'click' , '.js-part-remove', function() {
      $(this).parents('.list-filter-part').remove()
    });
    $(document).on( 'click' , '.js-select-filter .js-select-item', function() {
      const category = $(this).attr('data-category')
      const authenticationList = `
      <div class="select-box js-select js-select-filter">
          <strong class="select-box__label">인증 종류</strong><span class="select-box__icon"></span>
          <div class="select-box-list">
            <span class="select-box__item js-select-item">KC인증</span>
            <span class="select-box__item js-select-item">전자파 인증</span>
            <span class="select-box__item js-select-item">어린이 인증</span>
          </div>
        </div>`
      if (category === 'authentication') {
        $(this).parents('.js-select-filter').after(authenticationList)
      }
    });
  }

  const searchList = () => {
    $('.js-search-button').on('click', function (event) {
      event.preventDefault()

      if(validationCheck()) {
      }
    })

    function validationCheck () {
      const isSelected = $('.js-select-filter .select-box__label').hasClass('is--selected')

      if (!isSelected) {
        alert('검색어는 필수입력입니다');
        return false;
      }
    }
  }

  const listHandler = () => {
    // 리스트 이미지 클릭시
    $('.js-img-box').on('click', function (){
      $(this).next('.js-img-layer').toggleClass('is--show')
    })
    $('.js-layer-bg').on('click', function () {
      $(this).parents('.js-img-layer').removeClass('is--show')
    })
    // 더보기버튼
    $('.js-list-more-button').on('click', function (){
      $(this).toggleClass('is--open').siblings().removeClass('is--open')
      $(this).parents('.list-table-content').siblings().toggleClass('is--open')
      $(this).parents('.list-table-li').siblings().toggleClass('is--open')
    })
    //all check 버튼
    $('.js-input-checkbox-all').on('click', function() {
      if($(this).prop('checked')) {
        $('.js-input-checkbox').prop('checked',true);
        } else {
        $('.js-input-checkbox').prop('checked',false);
      }
    })
    //check
    $('.js-input-checkbox').on('click', function() {
      if ($(this).is(':checked')) {
        let isAllChecked = 0;

        $('.js-input-checkbox').each(function() {
          if (!this.checked)
            isAllChecked = 1;
        });

        if (isAllChecked === 0) {
          $('.js-input-checkbox-all').prop('checked', true);
        }
      }
      else {
        $('.js-input-checkbox-all').prop('checked', false);
      }
    })

    //품목 전송
    $('.js-table-button-item').on('click', function() {
      const data = $('.js-input-checkbox:checked').map(function() {
        const main = $(this).parent().parent()

        const sub = main.parent().find('.child')
        const subCount = sub.length
        const subData = sub.map(function() {
          return {
            name: $(this).find('.js-data-name').text(),
            qty: $(this).find('.js-data-qty').text(),
            price: $(this).find('.js-data-price').text(),
          }
        }).get()

        return {
          code: main.find('.js-data-code').text(),
          name: main.find('.js-data-name').text(),
          mall_name: main.find('.js-data-mallName').prop('alt'),
          price: main.find('.js-data-price').text(),
          qty: main.find('.js-data-qty').text(),
          sub_count: subCount,
          sub_data: subData
        }
      }).get()

      console.log(JSON.stringify(data))

      if (data.length === 0) {
        swal({
          title: 'error',
          text: '품목을 선택하여 주시기 바립니다',
          icon: 'error',
          button: 'ok',
        });
        return
      }

      $.ajax({
        url: 'http://115.85.181.125/test.php',
        type: 'post',
        accept: 'application/json',
        contentType: 'application/json; charset=utf-8',
        data: { data: data },
        dataType: 'json',
        success: function(data) {
        },
        error: function(jqXHR,textStatus,errorThrown) {
        }
      });
    })
  }

  const layerPopupHandler = () => {
    //layerpopup open
    $('.js-open-popup').on('click', function () {
      //속도 제어
      $('.js-layer-popup').fadeIn(400);
    })
    // 다음 클릭
    $('.js-next-layer-button').on('click', function () {
      const popupContent = $(this).parents('.js-layer-popup-content')
      //속도 제어
      popupContent.animate({width:'700px', height: '360px'}, 300)
      popupContent.find('.js-layer-popup-close').fadeOut(300)
      popupContent.find('.js-layer-popup-prev').fadeIn(300)
      popupContent.find('.js-next-content').fadeIn(300)
      popupContent.find('.js-next-title').fadeIn(300)
      popupContent.find('.js-first-title').fadeOut(300)
      popupContent.find('.js-first-content').fadeOut(300)
    })
    //닫기클릭
    $('.js-layer-popup-close').on('click', function () {
      //속도 제어
      $('.js-layer-popup').fadeOut(400);
    })
    // 이전클릭
    $('.js-layer-popup-prev').on('click', function () {
      const popupContent = $(this).parents('.js-layer-popup-content')
      //속도 제어
      popupContent.animate({width:'960px', height: '536px'}, 300)
      popupContent.find('.js-layer-popup-close').fadeIn(300)
      popupContent.find('.js-layer-popup-prev').fadeOut(300)
      popupContent.find('.js-next-content').fadeOut(300)
      popupContent.find('.js-next-title').fadeOut(300)
      popupContent.find('.js-first-title').fadeIn(300)
      popupContent.find('.js-first-content').fadeIn(300)
    })
  }


  listHandler()
  searchList()
  layerPopupHandler()
  filterPartHandler()
  listMoreHandler()
  datePickerHandler()
  selectBoxHandler()
})
