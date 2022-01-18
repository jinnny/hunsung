$(function () {
  // list 더보기 버튼
  const listMoreHandler = () => {
    $('.js-list-button-more').on('click', function () {
      $(this).parents('.list-button-more-area').toggleClass('is--open')
    })
    $('.js-list-more-item').on('click', function () {
      $('.list-button-more-area').removeClass('is--open')
    })
  }

  //select box
  const selectBoxHandler = () => {
    $(document).on( 'click' , '.js-select', function() {
      $(this).toggleClass('is--open')
    });
    $(document).on( 'click' , '.js-select-item', function() {
      $(this).parents('js-select').removeClass('is--open')
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

    $(document).on( 'click' , '.js-part-add', function() {
      appendFilter($(this).parents('.list-filter-part'))
    });

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
        var form = {
          name: '',
          phone: '',
          address: ''
        }
        form.name = $('.js-input-name').val()
        form.phone = $('.js-input-phone1').val() + $('.js-input-phone2').val() + $('.js-input-phone3').val()
        form.address = $('.js-select-address1').val() + ' ' + $('.js-select-address2').val() + ' ' + $('.js-select-address3').val()
        $.ajax({
          url: API_URI + '/api/'+ SITE_KEY + '/interest/2/enroll',
          contentType: 'application/json; charset=utf-8',
          type:'post',
          data: JSON.stringify(form)
        }).done(function (data) {
          alert('관심고객 등록이 완료되었습니다.\n 힐스테이트 창원 센트럴에 대한 관심에 감사드립니다.');
          location.reload()
        }).fail(function (jqXHR) {
          alert(jqXHR.responseJSON.errorMsg)
        })
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

  searchList()
  filterPartHandler()
  listMoreHandler()
  datePickerHandler()
  selectBoxHandler()
})
