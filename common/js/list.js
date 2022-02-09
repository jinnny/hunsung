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
    //layerpopup open multiple
    $('.js-open-popup-multiple').on('click', function () {
      //속도 제어
      $('.js-layer-popup-multiple').fadeIn(400);
    })
    // 다음 클릭
    $('.js-layer-popup-multiple .js-next-layer-button').on('click', function () {
      const popupContent = $(this).parents('.js-layer-popup-content')
      //속도 제어
      popupContent.animate({'max-width':'700px', height: '360px'}, 300)
      popupContent.find('.js-layer-popup-close').fadeOut(300)
      popupContent.find('.js-layer-popup-prev').fadeIn(300)
      popupContent.find('.js-next-content').fadeIn(300)
      popupContent.find('.js-next-title').fadeIn(300)
      popupContent.find('.js-first-title').fadeOut(300)
      popupContent.find('.js-first-content').fadeOut(300)
    })
    //닫기클릭
    $('.js-layer-popup-multiple .js-layer-popup-close').on('click', function () {
      //속도 제어
      $(this).parents('.js-layer-popup-multiple').fadeOut(400);
    })
    // 이전클릭
    $('.js-layer-popup-multiple .js-layer-popup-prev').on('click', function () {
      const popupContent = $(this).parents('.js-layer-popup-content')

      //속도 제어
      popupContent.animate({'max-width':'960px', height: '536px'}, 300)
      popupContent.find('.js-layer-popup-close').fadeIn(300)
      popupContent.find('.js-layer-popup-prev').fadeOut(300)
      popupContent.find('.js-next-content').fadeOut(300)
      popupContent.find('.js-next-title').fadeOut(300)
      popupContent.find('.js-first-title').fadeIn(300)
      popupContent.find('.js-first-content').fadeIn(300)
    })


    // layerpopup 기본팝업
    $('.js-open-popup').on('click', function () {
      //속도 제어
      $('.js-layer-popup').fadeIn(400);
    })
    //닫기클릭
    $('.js-layer-popup .js-layer-popup-close').on('click', function () {
      //속도 제어
      $(this).parents('.js-layer-popup').fadeOut(400);
    })
  }

  //register popup
  const registerPopupHandler = () => {
    // 추가버튼
    $('.js-amount-add').on('click', function () {
      const last = $('.amount-contents-area .input-content-area:last-child')
      if(last.prev().find('.js-input-end').val()){
        last.append(`
         <span class="set-amount-area">
          <input type="text" class="input__input input__input-price mini js-input-end">
          <span class="input__input-unit">개</span>
         </span>
      `)
        last.after(`
       <div class="input-content-area text-left">
          <input type="text" class="input__input input__input-price mini js-last-input">
          ~
        </div>
      `)
        $('.input-content-area-area').append(`
          <div class="input-content-area justify-center">
            <input type="text" class="input__input input__input-price text-right mini">
            <span class="input__input-unit">원</span>
          </div>
        `)
      }else {
        swal({
          title: 'error',
          text: '조건 추가시 이전 수량 조건을 입력하셔야 합니다.',
          icon: 'error',
          button: 'ok',
        });
      }
    })
    $(document).on('keyup', '.js-input-end', function () {
      const value = $(this).val()
      if(value !== '') {
        $(this).parent().parent().next().find('.js-last-input').val(Number($(this).val())+1)
      }else {
        $(this).parent().parent().next().find('.js-last-input').val(null)
      }
    })
    // 삭제버튼
    $('.js-amount-remove').on('click', function () {
      if($('.amount-contents-area').children().length > 2) {
        const last = $('.amount-contents-area .input-content-area:last-child')
        last.prev().find('.set-amount-area').remove()
        last.remove()
        $('.input-content-area-area .input-content-area:last').remove()
      }
    })

    //추가 설정 정보 버튼 클릭시
    $('.js-register-setting-button').on('click', function (){
      $(this).toggleClass('is--open')
      $(this).parent().next().toggle()
    })

    //category select box
    const categorySelectBoxHandler = () => {
      $(document).on('click', '.js-category-select-top', async function() {
        const selectbox = $(this).parent();
        // 대분류거나, 선택된 분류의 이전거가 이미 선택되어있을때(중분류는 반드시 대분류를 선택되어있어야만 여/닫)
        if(selectbox.data('category-box') === 0 || selectbox.prev().hasClass('is--selected')) {
          $('.js-category-select').toggleClass('is--open')
          if(selectbox.hasClass('category-select-box1')) {
            selectbox.addClass('is--show-list')

            // 대분류 카테고리 가져오기
            $('.js-cate-0').empty()
            const a = await getCategory(1)
            console.log(a)
            a['cate1'].forEach(function(item) {
              $('.js-cate-0').append(`
                <span class="category-select-box__item js-category-select-item" data-key="${item.key}">${item.name}</span>
              `)
            })

          }
        }
      });

      let selectedCategory = [];
      let lastSelectIndex = 0;

      $(document).on('click', '.js-category-select-item', async function() {

        const categoryBoxIndex = $(this).parents('.js-category-select').data('category-box')
        const selectParent = $(this).parents('.js-category-select')
        let selectedCategoryText = ''

        // 카테고리 가져오기
        if (categoryBoxIndex < 4) {
          $(`.js-cate-${categoryBoxIndex + 1}`).empty()
          const a = await getCategory(categoryBoxIndex + 2, $(this).attr('data-key'))
          const list = a[`cate${categoryBoxIndex + 2}`][`${$(this).attr('data-key')}`]
          const range = [...Array(4 - categoryBoxIndex).keys()].map(i => i + categoryBoxIndex + 2);
          if (a.cnt) {
            list.forEach(function(item) {
              $(`.js-cate-${categoryBoxIndex + 1}`).append(`
                <span class="category-select-box__item js-category-select-item" data-key="${item.key}">${item.name}</span>
              `)
            })
            range.forEach(function(item) {
              $(`.category-select-box${item}`).removeClass('disabled')
            })
          } else {
            range.forEach(function(item) {
              $(`.category-select-box${item}`).addClass('disabled')
            })
          }
        }



        $($(this).parent().parent().find('.category-select-box__label')).text($(this).text());
        $(this).parents('.js-category-select').addClass('is--selected')
        $(this).parents('.js-category-select').next().addClass('is--show-list')
        $(this).addClass('is--selected').siblings().removeClass('is--selected');

        // 선택 카테고리 보이게 처리
        if(!$('.category-select-select').is(':visible')) {
          $('.category-select-select').addClass('is--show')
        }

        // 마지막으로 클릭한 select가 카테고리박스의 인덱스보다 클 때
        if(lastSelectIndex > categoryBoxIndex) {
          //선택된카테고리랑 현재텍스트가 같지않고, 선택된카테고리가 있을 때
          if(selectedCategory[categoryBoxIndex] !== $(this).text() && selectedCategory.length > 0) {
            const nextSelect = selectParent.next()
            nextSelect.removeClass('is--selected');
            nextSelect.addClass('is--show-list');
            nextSelect.find('.category-select-box__label').removeClass('is--selected');
            nextSelect.find('.category-select-box__item').removeClass('is--selected');
            console.log(categoryBoxIndex)
            switch(categoryBoxIndex){
              case 0: selectParent.siblings().removeClass('is--selected is--show-list');
                nextSelect.addClass('is--show-list');
                $('.category-select-box2, .category-select-box3, .category-select-box4, .category-select-box5').find('.category-select-box__label, .js-category-select-item').removeClass('is--selected')
                $('.category-select-box2').find('.category-select-box__label').text('중분류 선택');
                $('.category-select-box3').find('.category-select-box__label').text('소분류 선택');
                $('.category-select-box4').find('.category-select-box__label').text('세분류 선택');
                $('.category-select-box5').find('.category-select-box__label').text('세세분류 선택');
                selectedCategory = []
                break;
              case 1: selectParent.next().next().removeClass('is--selected is--show-list');
                $('.category-select-box3, .category-select-box4, .category-select-box5').find('.category-select-box__label, .js-category-select-item').removeClass('is--selected')
                $('.category-select-box3').find('.category-select-box__label').text('소분류 선택');
                $('.category-select-box4').find('.category-select-box__label').text('세분류 선택');
                $('.category-select-box5').find('.category-select-box__label').text('세세분류 선택');
                $('.category-select-box5').removeClass('is--selected is--show-list');
                nextSelect.addClass('is--show-list');

                //무조건 두번째 인덱스부터 삭제
                selectedCategory.splice(2, 2);
                break;
              case 2:
                $('.category-select-box4, .category-select-box5').removeClass('is--selected is--show-list');
                nextSelect.addClass('is--show-list');
                $('.category-select-box4, .category-select-box5').find('.category-select-box__label, .js-category-select-item').removeClass('is--selected')
                $('.category-select-box4').find('.category-select-box__label').text('세분류 선택');
                $('.category-select-box5').find('.category-select-box__label').text('세세분류 선택');
                //무조건 세번째 인덱스부터 삭제
                selectedCategory.splice(3, 2);
                break;
              case 3:
                $('.category-select-box5').removeClass('is--selected');
                $('.category-select-box5').find('.category-select-box__label, .js-category-select-item').removeClass('is--selected')
                $('.category-select-box5').find('.category-select-box__label').text('세세분류 선택');

                //무조건 네번째 인덱스부터 삭제
                selectedCategory.splice(4, 2);
                break;
            }
            selectedCategory[categoryBoxIndex] = $(this).text()
          }
        }

        lastSelectIndex = categoryBoxIndex
        selectedCategory[categoryBoxIndex] = $(this).text()
        for(idx in selectedCategory) {
          /// > 추가여부작업
          if(idx !== '0') {
            selectedCategoryText = selectedCategoryText.concat(' > ' +selectedCategory[idx] + ' ')
          }else {
            selectedCategoryText = selectedCategoryText.concat(selectedCategory[idx])
          }
        }

        $($(this).parent().parent().find('.category-select-box__label')).addClass('is--selected');
        $('.category-select-item').text(selectedCategoryText)
      });

      function getCategory(gubun, cateKey) {
        let url = `http://115.85.181.125/cate1.php?gubun=${gubun}`
        cateKey && (url += `&cate_key=${cateKey}`)

        return new Promise((resolve, reject) => {
          $.ajax({
            url: url,
            type: "GET",
            dataType: "json",
            success: (res) => {
              resolve(res);
            },
            error: (e) => {
              reject(e);
            }
          });
        });
      }
    }

    (function (){
      // changeShipFee
      $('.js-ship-fee-radio').on('change', function () {
        const shipFee = $(this).val()
        switch (shipFee) {
          case 'fee' :
            $('.fee-content-area').show()
            $('.conditional-fee-content-area').hide()
            break
          case 'free' :
            $('.fee-content-area').hide()
            $('.conditional-fee-content-area').hide()
            break
          case 'conditionalFee' :
            $('.fee-content-area').hide()
            $('.conditional-fee-content-area').show()
            break
        }
      })
    })()

    //취소
    $('.js-register-close').on('click', function () {
      $(this).parents('.js-layer-popup').fadeOut(400);
    })
    //저장
    $('.js-register-submit').on('click', function () {
      $(this).parents('.js-layer-popup').fadeOut(400);
    })

    categorySelectBoxHandler();
  }

  //select box
  const selectBoxAddressHandler = () => {
    $(document).on('click', '.js-select-addr:not(.disabled)', function() {
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
    $(document).on('click', '.js-select-addr-item', function() {
      $(this).parents('.js-select-addr').addClass('is--selected')
      $(this).addClass('is--selected').siblings().removeClass('is--selected');
      $($(this).parent().parent().find('.select-box__label')).text($(this).text());
      $($(this).parent().parent().find('.select-box__label')).addClass('is--selected');

      $('.js-addr-input').val($(this).text())
    });

    // 주소 가져오기
    $('.js-address-button').on('click', function () {
      $.ajax({
        url: 'http://115.85.181.125/addr.php',
        type: "GET",
        dataType: "json",
        success: (res) => {
          $('.js-addr').empty()
          res.addr.forEach(function(item) {
            $('.js-addr').append(`
                 <span class="select-box__item js-select-addr-item" data-key="${item.key}">${item.name}</span>
              `)
          })
          $('.js-select-addr').removeClass('disabled')
        },
        error: (e) => {
          console.error(e);
        }
      })
    })
  }


  listHandler()
  searchList()
  layerPopupHandler()
  filterPartHandler()
  listMoreHandler()
  datePickerHandler()
  selectBoxHandler()
  registerPopupHandler()
  selectBoxAddressHandler()
})
