$(function () {
// 효과있는 입력창
  // 사용된 클래스
  // is--active, is--complete, is--error, error
  // 입력후 에러난경우(형식이 틀렸을 경우): is--error
  // 입력전에 에러난 경우(필수값인데 빼먹은 경우): error
  const inputAnimation = () => {
    // 포커스 되었을때
    $(document).on('focus', '.input__input-animation:not(.js-date-input)', function() {
      $(this).parents('.input-animation-part').addClass('is--active');
    }).on('blur', '.input__input-animation:not(.js-date-input)' , function() {
      // 포커스에서 나갔을때

      if ($(this).val().trim() === '') {
        // 아무것도 입력하지 않았을 때
        console.log('미입력')
        $(this).parents('.input-animation-part').removeClass('is--active');
        $(this).parents('.input-animation-part').removeClass('is--complete');
        if($(this).parents('.input-animation-part').hasClass('required')) {
          $(this).parents('.input-animation-part').addClass('error');
        }
      } else {
        console.log('입력')
        $(this).parents('.input-animation-part').addClass('is--complete');
        $(this).parents('.input-animation-part').addClass('is--complete');
        $(this).parents('.input-animation-part').removeClass('error');
      }
    }).on('keydown', '.input__input-animation:not(.js-date-input)', function() {
      $(this).parents('.input-animation-part').removeClass('is--complete');
      $(this).parents('.input-animation-part').addClass('is--active');
    })
  }

  const selectOption = () => {
    $(document).on( 'click' , '.js-select-option .js-select-item-animation', function() {
      const option = $(this).data('option')
      const authenticationList = `
      <div class="input-animation-part input-amount">
        <input type="text" class="input__input-animation" id="code">
        <label for="code" class="input__label input__label-animation">재고수량</label>
        <fieldset class="input-field-outline">
          <legend class="input-legend-text">재고수량</legend>
        </fieldset>
      </div>`
      const parents = $(this).parents('.js-select-option')
      if (option) {
        if(!parents.next().hasClass('input-amount')) {
          parents.after(authenticationList)
        }
      }else {
        if(parents.next().hasClass('input-amount')) {
          parents.next().remove()
        }
      }
    });
  }
  //효과있는 select box
  const selectAnimationHandler = () => {
    $(document).on('click', '.js-select-animation', function() {
      const select = $(this);
      if($(this).hasClass('is--open')) {
        $(this).removeClass('is--open')
      }else {
        $(this).addClass('is--open')
      }
      const seting = $(this).find('.select-box-list-animation');
      $(document).on('mouseup', function(e) {
        if (seting.has(e.target).length === 0) {
          if(e.target.className !== select[0].className) {
            select.removeClass('is--open');
          }
        }
      });
    });
    $(document).on('click', '.js-select-item-animation', function() {
      $(this).parents('.js-select-animation').addClass('is--selected')
      $(this).addClass('is--selected').siblings().removeClass('is--selected');
      $($(this).parent().parent().find('.select-box__label-animation')).text($(this).text());
      $($(this).parent().parent().find('.select-box__label-animation')).addClass('is--selected');
      if ($(this).parents('.js-select-category').hasClass('js-select-category')) {
        $('.registration4-content').addClass('show')
      }
    });
  }

  // datepicker
  const datePickerHandler = () => {
    const $publishedDate = $('.js-published-date');
    const $expirationDate = $('.js-expiration-date');

  $publishedDate.datepicker(
     {
       format: 'yyyy.mm.dd',
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
         $(this).addClass('is--open');
         $(this).parent().addClass('is--active');
       },
       pick: function () {
         $(this).parent().addClass('is--complete');
       },
       hide: function() {
         $(this).removeClass('is--open')
         $(this).parent().removeClass('is--active');
       },
     },
   );

    $expirationDate.datepicker({
      format: 'yyyy.mm.dd',
      autoHide: true,
      startDate: $publishedDate.datepicker('getDate'),
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
        $(this).addClass('is--open');
        $(this).parent().addClass('is--active');
      },
      pick: function () {
        $(this).parent().addClass('is--complete');
      },
      hide: function() {
        $(this).removeClass('is--open')
        $(this).parent().removeClass('is--active');
      },
    });

    $publishedDate.on('change', function () {
      $expirationDate.datepicker('setStartDate', $publishedDate.datepicker('getDate'));
    });

  }

  const previewLayerPopupHandler = () => {
    // layerpopup 기본팝업
    $('.js-preview-button').on('click', function () {
      //속도 제어
      $('.js-preview-popup').fadeIn(400);
      $('body').css('overflow', 'hidden')
    })
    //닫기클릭
    $('.js-preview-popup .js-layer-popup-close').on('click', function () {
      //속도 제어
      $(this).parents('.js-layer-popup').fadeOut(400);
      $('body').css('overflow', 'auto')
    })
  }
  $('.js-textarea-reset-button').on('click', function () {
    $('.js-product-detail-textarea').val('')
  })

  const fileHandler = () => {
    $(document).on('change', '.js-add-file', function(e) {
      const input = e.target
      if(input.files && input.files[0]) {
        const size = input.files[0].size || input.files[0].fileSize;
        const limit = 2000000;
        if ( size > limit ) {
          alert('파일용량은 3MB를 넘을 수 없습니다.');
          $(this).val('');
          return;
        }
        const reader = new FileReader()
        const imageLength = $(this).parents('.image-file-contents').data('image-length')
        const imageCurrent = $(this).parents('.image-file-contents').children().length
        switch (imageLength) {
          case 2:
            if (imageLength + 1 >= imageCurrent) {
              $('.mobile-content-images').prepend(`
                 <div class="image-file-content">
                  <div class="image-file__image">
                    <div class="image-file-button-area">
                      <button class="image-file-button magnifier js-magnifier-button" type="button"></button>
                      <label for="mobileFile${imageCurrent}" class="image-file-button edit js-edit-button"></label>
                      <button class="image-file-button delete js-delete-button" type="button"></button>
                    </div>
                  </div>
                  <label for="mobileFile${imageCurrent}" class="image-file__label">파일찾기</label>
                  <input type="file" id="mobileFile${imageCurrent}" class="input__input-file js-input-file" accept=".png, .jpg, .jpeg">
                </div>
              `)
              // 이미지가 로드가 된 경우
              reader.onload = e => {
                const previewImage = $('.mobile-content-images .image-file-content').eq(0).find('.image-file__image')
                previewImage.css('backgroundImage', `url(${e.target.result})`);
                previewImage.addClass('is--show')
              }
              // reader가 이미지 읽도록 하기
              reader.readAsDataURL(input.files[0])
              if(imageCurrent === imageLength) {
                $('.mobile-content-images .add-content-image').remove()
              }
            }
            checkAddImageCount(imageCurrent, 'mobile')
            break;
          case 9:
            if (imageLength + 1 >= imageCurrent) {
              $('.add-content-images').prepend(`
                 <div class="image-file-content">
                  <div class="image-file__image">
                    <div class="image-file-button-area">
                      <button class="image-file-button magnifier js-magnifier-button" type="button"></button>
                      <label for="addFile${imageCurrent}" class="image-file-button edit js-edit-button"></label>
                      <button class="image-file-button delete js-delete-button" type="button"></button>
                    </div>
                  </div>
                  <label for="addFile${imageCurrent}" class="image-file__label">파일찾기</label>
                  <input type="file" id="addFile${imageCurrent}" class="input__input-file js-input-file" accept=".png, .jpg, .jpeg">
                </div>
              `)
              // 이미지가 로드가 된 경우
              reader.onload = e => {
                const previewImage = $('.add-content-images .image-file-content').eq(0).find('.image-file__image')
                previewImage.css('backgroundImage', `url(${e.target.result})`);
                previewImage.addClass('is--show')
              }
              // reader가 이미지 읽도록 하기
              reader.readAsDataURL(input.files[0])
              if(imageCurrent === imageLength) {
                $('.add-content-images .add-content-image').remove()
              }
            }
            checkAddImageCount(imageCurrent, 'add')
            break;
          }
      }
    })
    //추가이미지 카운팅
    function checkAddImageCount (imageCurrent, type) {
      switch (type) {
        case 'add':
          $('.js-add-image-number').text(imageCurrent)
          if (imageCurrent > 0) {
            $('.js-add-image-number').addClass('active')
          } else {
            $('.js-add-image-number').removeClass('active')
          }
          break;
        case 'mobile':
          $('.js-mobile-image-number').text(imageCurrent)
          if (imageCurrent > 0) {
            $('.js-mobile-image-number').addClass('active')
          } else {
            $('.js-mobile-image-number').removeClass('active')
          }
          break;
      }
    }

    $(document).on('click', '.js-delete-button', function() {
      const imageCurrent = $(this).parents('.image-file-contents').children(':not(.add-content-image)').length;
      const imageLength = $(this).parents('.image-file-contents').data('image-length')

      if($(this).parents('.image-file-contents').find('.image-file-content').length > 1) {
        $(this).parents('.image-file-content').remove()
      }
      switch (imageLength) {
        case 2:
          checkAddImageCount(imageCurrent - 1, 'mobile')
          if (imageCurrent === imageLength) {
            if (!$('.mobile-content-images .image-file-content:last-child').hasClass('add-content-image')) {
              $('.mobile-content-images').append(`
                <div class="image-file-content add-content-image">
                  <div class="image-file__image">
                    <div class="image-file-button-area">
                      <button class="image-file-button magnifier js-magnifier-button" type="button"></button>
                      <label for="mobileFile0" class="image-file-button edit js-edit-button"></label>
                      <button class="image-file-button delete js-delete-button" type="button"></button>
                    </div>
                  </div>
                  <label for="mobileFile0" class="image-file__label">파일찾기</label>
                  <input type="file" id="mobileFile0" class="input__input-file js-input-file js-add-file" accept=".png, .jpg, .jpeg">
                </div>
              `)
            }
          }
          break;
        case 9:
          checkAddImageCount(imageCurrent - 1, 'add')
          if (imageCurrent === imageLength) {
            if (!$('.add-content-images .image-file-content:last-child').hasClass('add-content-image')) {
              $('.add-content-images').append(`
                <div class="image-file-content add-content-image">
                  <div class="image-file__image">
                    <div class="image-file-button-area">
                      <button class="image-file-button magnifier js-magnifier-button" type="button"></button>
                      <label for="addFile0" class="image-file-button edit js-edit-button"></label>
                      <button class="image-file-button delete js-delete-button" type="button"></button>
                    </div>
                  </div>
                  <label for="addFile0" class="image-file__label">파일찾기</label>
                  <input type="file" id="addFile0" class="input__input-file js-input-file js-add-file" accept=".png, .jpg, .jpeg">
                </div>
              `)
            }
          }
          break;
      }
    });

    $(document).on('click', '.js-magnifier-button', function() {
      $('.js-image-magnifier-popup').fadeIn(400);
      $('body').css('overflow', 'hidden')
      //닫기클릭
      $('.js-image-magnifier-popup .js-layer-popup-close').on('click', function () {
        $(this).parents('.js-layer-popup').fadeOut(400);
        $('body').css('overflow', 'auto')
      })
    });

    //이미지 파일 추가를 제외한 인풋 file
    $(document).on('change', '.js-input-file:not(.js-add-file)', function(e) {
      const input = e.target
      if(input.files && input.files[0]) {
        const size = input.files[0].size || input.files[0].fileSize;
        const limit = 2000000;
        if ( size > limit ) {
          alert('파일용량은 3MB를 넘을 수 없습니다.');
          $(this).val('');
          return;
        }
        const reader = new FileReader()
        // 이미지가 로드가 된 경우
        reader.onload = e => {
          const previewImage = $(this).parent().find('.image-file__image')
          previewImage.css('backgroundImage', `url(${e.target.result})`);
          previewImage.addClass('is--show')
        }
        // reader가 이미지 읽도록 하기
        reader.readAsDataURL(input.files[0])
      }
    });


  }

  const optionHandler = () => {
    //all check 버튼
    $('.js-input-checkbox-all').on('click', function() {
      if($(this).prop('checked')) {
        $(this).parents('.input-checkbox-area').find('.js-input-checkbox').prop('checked',true);
      } else {
        $(this).parents('.input-checkbox-area').find('.js-input-checkbox').prop('checked',false);
      }
    })
    //check
    $('.js-input-checkbox').on('click', function() {
      if ($(this).is(':checked')) {
        let isAllChecked = 0;

        $(this).parents('.input-checkbox-area').find('.js-input-checkbox').each(function() {
          if (!this.checked)
            isAllChecked = 1;
        });

        if (isAllChecked === 0) {
          $(this).parents('.input-checkbox-area').find('.js-input-checkbox-all').prop('checked', true);
        }
      }
      else {
        $(this).parents('.input-checkbox-area').find('.js-input-checkbox-all').prop('checked', false);
      }
    })

    // 옵션추가하기 팝업
    $('.js-add-option').on('click', function (){
      $('.js-search-popup').fadeIn(400);
      $('body').css('overflow', 'hidden')
    })

    //닫기클릭
    $('.js-search-popup .js-layer-popup-close').on('click', function () {
      //속도 제어
      $(this).parents('.js-layer-popup').fadeOut(400);
      $('body').css('overflow', 'auto')
    })

    $('.option-table-area-body').scroll(function (event) {
      const scroll = $('.option-table-area-body').scrollTop();
      if (scroll > 0) {
        $('.option-table-area-head').addClass('fixed')
      } else {
        $('.option-table-area-head').removeClass('fixed')
      }
    })
  }

  //select box
  const selectDefaultHandler = () => {
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

  // 안전인증
  const certificationRadio = () => {
    $('.js-certification-radio').on('click', function () {
      const value = $(this).val()
      console.log(value)
      if (value === 'institutionTarget' || value === 'kcTarget' || value === 'qaUse') {
        $(this).parent().next().addClass('show')
      } else {
        $(this).parent().next().removeClass('show')
      }
    })

    function appendKc (current) {
      const number = current.parent().find('.content-info-part').length
      current.after(`
         <div class="content-info-part multiple items-end target-content-part justify-start">
            <div class="select-box-animation js-select-animation width--third fix">
              <span class="select-box-label">인증 선택</span>
              <strong class="select-box__label-animation"></strong><span class="select-box__icon-animation"></span>
              <fieldset class="select-field-outline">
                <legend class="select-legend-text">인증 선택</legend>
              </fieldset>
              <div class="select-box-list-animation">
                <span class="select-box__item-animation js-select-item-animation">생활용품 안전인증</span>
                <span class="select-box__item-animation js-select-item-animation">어린이 안전인증</span>
                <span class="select-box__item-animation js-select-item-animation">공급자 적합성</span>
                <span class="select-box__item-animation js-select-item-animation">전기 안전인증</span>
                <span class="select-box__item-animation js-select-item-animation">생활용품 심의인증</span>
              </div>
            </div>
            <div class="width--second">
              <div class="input-animation-part full">
                <input type="text" class="input__input-animation" id="kcNumber${number}">
                <label for="kcNumber${number}" class="input__label input__label-animation">인증번호</label>
                <fieldset class="input-field-outline">
                  <legend class="input-legend-text">인증번호</legend>
                </fieldset>
              </div>
            </div>
            <div class="certification-button-area">
              <button class="certification-button add js-kc-add" type="button"><span class="blind">추가</span></button>
              <button class="certification-button remove js-kc-remove" type="button"><span class="blind">제거</span></button>
            </div>
          </div>
      `)
    }
    function appendQa (current) {
      const number = current.parent().find('.content-info-part').length
      current.after(`
        <div class="content-info-part multiple items-end target-content-part justify-start">
          <div class="width--certification-button">
            <div class="input-animation-part full input-file-part">
              <input type="file" class="input__input-animation js-file-type-input input__file-animation" id="qaFile${number}">
              <div class="input-file-content ">
                <p class="input-file__name js-input-file-content"></p>
                <button class="input-file-close js-file-clear" type="button"></button>
              </div>
              <label for="qaFile${number}" class="input__label input__label-animation input__label-animation-file js-file-label">첨부파일</label>
              <fieldset class="input-field-outline">
                <legend class="input-legend-text">첨부파일</legend>
              </fieldset>
            </div>
          </div>
          <div class="certification-button-area">
            <button class="certification-button add js-qa-add" type="button"><span class="blind">추가</span></button>
            <button class="certification-button remove js-qa-remove" type="button"><span class="blind">제거</span></button>
          </div>
        </div>
      `)
    }
    function appendInstitution (current) {
      const number = current.parent().find('.content-info-part').length
      current.after(`
        <div class="content-info-part multiple items-end target-content-part justify-start">
          <div class="select-box-animation js-select-animation width--third fix">
            <span class="select-box-label">인증 선택</span>
            <strong class="select-box__label-animation"></strong><span class="select-box__icon-animation"></span>
            <fieldset class="select-field-outline">
              <legend class="select-legend-text">인증 선택</legend>
            </fieldset>
            <div class="select-box-list-animation">
              <span class="select-box__item-animation js-select-item-animation">생활용품 안전인증</span>
              <span class="select-box__item-animation js-select-item-animation">어린이 안전인증</span>
              <span class="select-box__item-animation js-select-item-animation">공급자 적합성</span>
              <span class="select-box__item-animation js-select-item-animation">전기 안전인증</span>
              <span class="select-box__item-animation js-select-item-animation">생활용품 심의인증</span>
            </div>
          </div>
          <div class="width--second">
            <div class="input-animation-part full">
              <input type="text" class="input__input-animation" id="institutionNumber${number}">
              <label for="institutionNumber${number}" class="input__label input__label-animation">인증번호</label>
              <fieldset class="input-field-outline">
                <legend class="input-legend-text">인증번호</legend>
              </fieldset>
            </div>
          </div>
          <div class="certification-button-area">
            <button class="certification-button add js-institution-add" type="button"><span class="blind">추가</span></button>
            <button class="certification-button remove js-institution-remove" type="button"><span class="blind">제거</span></button>
          </div>
        </div>
      `)
    }

    // kc 인증추가
    $(document).on( 'click' , '.js-kc-add', function() {
      appendKc($(this).parents('.target-content-part'))
    });
    // kc 인증삭제
    $(document).on( 'click' , '.js-kc-remove', function() {
      $(this).parents('.target-content-part').remove()
    });
    // 기관 인증추가
    $(document).on( 'click' , '.js-institution-add', function() {
      appendInstitution($(this).parents('.target-content-part'))
    });
    // 기관 인증삭제
    $(document).on( 'click' , '.js-institution-remove', function() {
      $(this).parents('.target-content-part').remove()
    });
    // qa 인증추가
    $(document).on( 'click' , '.js-qa-add', function() {
      appendQa($(this).parents('.target-content-part'))
    });
    // qa 인증삭제
    $(document).on( 'click' , '.js-qa-remove', function() {
      $(this).parents('.target-content-part').remove()
    });

    //qa구비서류 첨부파일
    $(document).on('change', '.js-file-type-input', function(e) {
      $(this).parents('.input-animation-part').addClass('is--active is--complete');
      const input = e.target
      if(input.files && input.files[0]) {
        const name = input.files && input.files[0].name
        const reader = new FileReader()
        // 이미지가 로드가 된 경우
        reader.onload = e => {
          const text = $(this).next().find('.js-input-file-content')
          $(this).next().css('display', 'inline-flex');
          text.text(name)
        }
        // reader가 이미지 읽도록 하기
        reader.readAsDataURL(input.files[0])
      }
    }).on('click', '.js-file-label', function (){
      $(this).parents('.input-animation-part').removeClass('is--active');
    })

    $(document).on('click', '.js-file-clear', function (e) {
      $(this).parents('.input-file-part').find('.js-file-type-input').val('')
      const text = $(this).prev()
      $(this).parent().css('display', 'none');
      text.text('')
      $(this).parents('.input-file-part').removeClass('is--active is--complete')
    })
  }



  datePickerHandler()
  selectOption()
  inputAnimation()
  selectAnimationHandler()
  previewLayerPopupHandler()
  fileHandler()
  optionHandler()
  selectDefaultHandler()
  certificationRadio()
})

