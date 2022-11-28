$(function () {

  // select option
  $(document).on('click', '.js-check-select-box', function () {
    const select = $(this)
    if ($(this).hasClass('is--open')) {
      $(this).removeClass('is--open')
    } else {
      $(this).addClass('is--open')
    }
    const setting = $(this).find('.js-check-select-list')
    $(document).on('mouseup', function (e) {
      if (setting.has(e.target).length === 0) {
        if (e.target.className !== select[0].className) {
          select.removeClass('is--open')
        }
      }
    })
  })
  $(document).on('click', '.js-check-select-item', function () {
    $(this).parents('.js-check-select-box').addClass('is--selected')
    $(this).addClass('is--selected').siblings().removeClass('is--selected')
    $($(this).parent().parent().find('.js-check-select-label')).text($(this).text())
    $($(this).parent().parent().find('.js-check-select-label')).addClass('is--selected')
  })

  //all check 버튼
  $('.js-input-checkbox-all-renew').on('click', function () {
    if ($(this).prop('checked')) {
      $('.js-input-checkbox-renew').prop('checked', true)
      //체크 시 select option show
      $('.js-check-title-content').show().css('display', 'flex')
      $('.js-check-title-content .js-check-selected').text($('.js-input-checkbox-renew:checked').length)
      $('.js-product-title').hide()
    } else {
      $('.js-input-checkbox-renew').prop('checked', false)
      //체크 시 select option hide
      $('.js-check-title-content').hide()
      $('.js-product-title').show()
    }
  })
  //check
  $('.js-input-checkbox-renew').on('click', function () {
    if ($('.js-input-checkbox-renew:checked').length) {
      $('.js-check-title-content').show().css('display', 'flex')
      $('.js-check-title-content .js-check-selected').text($('.js-input-checkbox-renew:checked').length)
      $('.js-product-title').hide()
    } else {
      $('.js-check-title-content').hide()
      $('.js-product-title').show()
    }
    if ($(this).is(':checked')) {
      let isAllChecked = 0

      $('.js-input-checkbox').each(function () {
        if (!this.checked)
          isAllChecked = 1
      })
      if (isAllChecked === 0) {
        $('.js-input-checkbox-all-renew').prop('checked', true)
      }
    } else {
      $('.js-input-checkbox-all-renew').prop('checked', false)
    }
  })

  $('.js-edit-button').on('click', function () {
    if ($(this).parent().next().is(':visible')) {
      $(this).parent().next().hide()
    } else {
      $(this).parent().next().show().css('display', 'flex')
    }
  })

  $('.js-amount-save-button').on('click', function () {
    const value = $(this).prev('.js-amount-edit-input')[0].value
    if (value) {
      $(this).parent().prev().find('.js-table-amount').text(value)
      $(this).parent().hide()
    }
  })

  // dropdown 버튼
  const listMoreHandler = () => {
    $('.js-dropdown-button').on('click', function () {
      const select = $(this).parent()
      if (select.hasClass('is--open')) {
        select.removeClass('is--open')
      } else {
        select.addClass('is--open')
      }
      const setting = $(this).find('.js-dropdown-content')
      $(document).on('mouseup', function (e) {
        if (setting.has(e.target).length === 0) {
          if (e.target.className !== 'js-dropdown-button is--open') {
            select.removeClass('is--open')
          }
        }
      })
    })
    $('.js-dropdown-item').on('click', function () {
      const select = $(this).parent().parent()
      select.removeClass('is--open')
      $(this).addClass('is--selected').siblings().removeClass('is--selected')
    })
  }
  listMoreHandler()

  // 로그(히스토리보기) 레이어 팝업열기
  $('.js-log-button').on('click', function () {
    $('.js-log-layer').addClass('open')
    $('.js-log-layer').next('.js-right-layer-bg').addClass('open')
  })
  // 로그(히스토리보기) 레이어 팝업열기
  // 이중 레이어 팝업열기
  $('.js-multiple-layer-button').on('click', function () {
    $('.js-multiple-layer').addClass('open')
    $('.js-multiple-layer').next('.js-right-layer-bg').addClass('open')
  })
  // 로그(히스토리보기) 레이어 팝업열기

  // 엑셀 재고등록 팝업열기
  $('.js-open-excel').on('click', function () {
    $('.js-excel-register-layer').addClass('open')
    $('.js-excel-register-layer').next('.js-right-layer-bg').addClass('open')
  })

  // 멀티플 검색창 리셋버튼 클릭
  $('.js-renew-multiple-reset').on('click', function () {
    $(this).parent().parent().prev().prev('.js-renew-label-area').children('.renew-label-mark').remove()
    $(this).parent().parent().children('.renew-multiple-part').remove()
    $(this).parent().parent().prepend(
      `<div class="renew-multiple-part">
              <div class="renew-select-box js-renew-search-category">
                <strong class="renew-select-box__label">검색 구분</strong><span class="renew-select-box__icon"></span>
                <div class="renew-select-box-list">
                  <span class="renew-select-box__item js-renew-select-item" data-category="condition">판매상태</span>
                  <span class="renew-select-box__item js-renew-select-item" data-category="channelName">채널명</span>
                  <span class="renew-select-box__item js-renew-select-item" data-category="authentication">인증정보</span>
                </div>
              </div>
              <div class="renew-multiple-input-area full">
                <div class="renew-multiple-input js-renew-multiple-input">
                  <input type="text" class="multiple-input__text" placeholder="검색 내용을 입력해 주세요.">
                </div>
              </div>
              <div class="multiple-input-button-area">
                <button class="multiple-input-button add js-renew-part-add"><span class="blind">추가</span></button>
              </div>
            </div>`
    )
  })
  // 우측팝업 닫기
  $('.js-right-layer-close-button').on('click', function () {
    if ($(this).data('content') === 'multiple') {
      const filter = $(this).next('.right-layer-content').find('.renew-list-filter')
      filter.find('.js-renew-calendar-layer').hide()
      filter.find('.renew-date-button').removeClass('is--active')
      filter.find('.renew-date-button:first-child').addClass('is--active')

      filter.find('.js-renew-search-input-alone').val('')
      filter.find('.js-renew-multiple-search').hide()
      filter.find('.js-renew-multiple-search').children('.renew-multiple-part').remove()
      if ($(this).data('date') === 2) {
        $startDate2.datepicker('setDate', new Date())
        $endDate2.datepicker('setDate', new Date())
      } else if ($(this).data('date') === 3) {
        $startDate3.datepicker('setDate', new Date())
        $endDate3.datepicker('setDate', new Date())
      }

      filter.find('.js-renew-calendar-text').text('오늘')

      filter.find('.js-renew-multiple-search').prepend(
        `<div class="renew-multiple-part">
              <div class="renew-select-box js-renew-search-category">
                <strong class="renew-select-box__label">검색 구분</strong><span class="renew-select-box__icon"></span>
                <div class="renew-select-box-list">
                  <span class="renew-select-box__item js-renew-select-item" data-category="condition">판매상태</span>
                  <span class="renew-select-box__item js-renew-select-item" data-category="channelName">채널명</span>
                  <span class="renew-select-box__item js-renew-select-item" data-category="authentication">인증정보</span>
                </div>
              </div>
              <div class="renew-multiple-input-area full">
                <div class="renew-multiple-input js-renew-multiple-input">
                  <input type="text" class="multiple-input__text" placeholder="검색 내용을 입력해 주세요.">
                </div>
              </div>
              <div class="multiple-input-button-area">
                <button class="multiple-input-button add js-renew-part-add"><span class="blind">추가</span></button>
              </div>
            </div>`
      )
    }

    $(this).parent().css('transition', 'all .5s').removeClass('open')
    $(this).parent().next('.js-right-layer-bg').removeClass('open')
  })


  // 엑셀 업로드
  $(document).on('change', '.js-input-file', function (e) {
    const input = e.target
    if (input.files && input.files[0]) {
      const size = input.files[0].size || input.files[0].fileSize
      const limit = 4000000
      if (size > limit) {
        alert('파일용량은 4MB를 넘을 수 없습니다.')
        $(this).val('')
        return
      }
      const reader = new FileReader()
      // 이미지가 로드가 된 경우
      reader.onload = e => {
        const previewText = $(this).prev('.js-input-file-text')
        previewText.text(input.files[0].name)
      }
      // reader가 이미지 읽도록 하기
      reader.readAsDataURL(input.files[0])
    }
  })

  const pagingPerHandler = () => {
    $(document).on('click', '.js-paging-per', function () {
      const select = $(this)
      if ($(this).hasClass('is--open')) {
        $(this).removeClass('is--open')
      } else {
        $(this).addClass('is--open')
      }
      const setting = $(this).find('.js-paging-per-content')
      $(document).on('mouseup', function (e) {
        if (setting.has(e.target).length === 0) {
          if (e.target.className !== select[0].className) {
            select.removeClass('is--open')
          }
        }
      })
    })
    $(document).on('click', '.js-paging-per-item', function () {
      $(this).parent().parent().addClass('is--selected')
      $(this).addClass('is--selected').siblings().removeClass('is--selected')
      $($(this).parent().parent().find('.js-paging-per-text')).text($(this).text())
      $($(this).parent().parent().find('.js-paging-per-text')).addClass('is--selected')
    })
  }

  pagingPerHandler()

  const $startDate = $('.js-renew-start-date')
  const $endDate = $('.js-renew-end-date')
  const $startDate2 = $('.js-renew-start-date2')
  const $endDate2 = $('.js-renew-end-date2')
  const $startDate3 = $('.js-renew-start-date3')
  const $endDate3 = $('.js-renew-end-date3')

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
      show: function () {
        $(this).addClass('is--open')
      },
      hide: function () {
        $(this).removeClass('is--open')
      }
    },
  )
  $startDate2.datepicker(
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
      show: function () {
        $(this).addClass('is--open')
      },
      hide: function () {
        $(this).removeClass('is--open')
      }
    },
  )
  $startDate3.datepicker(
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
      show: function () {
        $(this).addClass('is--open')
      },
      hide: function () {
        $(this).removeClass('is--open')
      }
    },
  )

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
  })
  $endDate2.datepicker({
    format: 'yyyy.mm.dd',
    autoPick: true,
    autoHide: true,
    startDate: $startDate2.datepicker('getDate'),
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
  })
  $endDate3.datepicker({
    format: 'yyyy.mm.dd',
    autoPick: true,
    autoHide: true,
    startDate: $startDate3.datepicker('getDate'),
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
  })

  $startDate.on('change', function () {
    $endDate.datepicker('setStartDate', $startDate.datepicker('getDate'))
    console.log($startDate.datepicker('getDate'))
  })
  $startDate2.on('change', function () {
    $endDate2.datepicker('setStartDate', $startDate2.datepicker('getDate'))
  })
  $startDate3.on('change', function () {
    $endDate3.datepicker('setStartDate', $startDate3.datepicker('getDate'))
  })

  $endDate.on('change', function () {
    $(this).parent().parent().prev().find('.js-renew-calendar-text').text(`${ $startDate[0].value.slice(2) }~${ $(this)[0].value.slice(2) }`)
    // 달력레이어 숨기기
    $('.js-renew-date-button').removeClass('is--active')
    $(this).parent().parent().hide()
  })

  $endDate2.on('change', function () {
    $(this).parent().parent().prev().find('.js-renew-calendar-text').text(`${ $startDate2[0].value.slice(2) }~${ $(this)[0].value.slice(2) }`)
    // 달력레이어 숨기기
    $('.js-renew-date-button').removeClass('is--active')
    $(this).parent().parent().hide()
  })
  $endDate3.on('change', function () {
    $(this).parent().parent().prev().find('.js-renew-calendar-text').text(`${ $startDate3[0].value.slice(2) }~${ $(this)[0].value.slice(2) }`)
    // 달력레이어 숨기기
    $('.js-renew-date-button').removeClass('is--active')
    $(this).parent().parent().hide()
  })

  // init
  $('.js-renew-calendar-button, .js-renew-calendar-button2, .js-renew-calendar-button3').addClass('is--selected')
  $('.js-renew-date-button[data-date=0], .js-renew-date-button2[data-date=0], .js-renew-date-button3[data-date=0]').addClass('is--active')

  $('.js-renew-calendar-layer-bg').on('click', function () {
    $(this).hide()
    $(this).prev().hide()
  })

  $('.js-renew-calendar-button').on('click', function () {
    $(this).next('.js-renew-calendar-layer').show()
    $(this).next().next().show()
    const select = $(this)
    const setting = $(this).next('.js-renew-calendar-layer')
  })
  $('.js-renew-date-button').on('click', function () {
    const current = $startDate.datepicker('getDate')
    const standard = Number($(this).attr('data-date'))
    let last = new Date(current.getTime() + (standard * 24 * 60 * 60 * 1000))
    if (standard === 0) {
      last = new Date()
    }
    $endDate.datepicker('setDate', last)
    $(this).parent().parent().prev().addClass('is--selected')
    $(this).parent().parent().prev().find('.js-renew-calendar-text').text($(this).text())
    // 달력레이어 숨기기
    $(this).addClass('is--active').siblings().removeClass('is--active')
    $(this).parent().parent().hide()
    $(this).parent().parent().next().hide()
  })
  $('.js-renew-date-button2').on('click', function () {
    const current = $startDate2.datepicker('getDate')
    const standard = Number($(this).attr('data-date'))
    let last = new Date(current.getTime() + (standard * 24 * 60 * 60 * 1000))
    if (standard === 0) {
      last = new Date()
    }
    $endDate2.datepicker('setDate', last)
    $(this).parent().parent().prev().addClass('is--selected')
    $(this).parent().parent().prev().find('.js-renew-calendar-text').text($(this).text())
    // 달력레이어 숨기기
    $(this).addClass('is--active').siblings().removeClass('is--active')
    $(this).parent().parent().hide()
    $(this).parent().parent().next().hide()
  })
  $('.js-renew-date-button3').on('click', function () {
    const current = $startDate3.datepicker('getDate')
    const standard = Number($(this).attr('data-date'))
    let last = new Date(current.getTime() + (standard * 24 * 60 * 60 * 1000))
    if (standard === 0) {
      last = new Date()
    }
    $endDate3.datepicker('setDate', last)
    $(this).parent().parent().prev().addClass('is--selected')
    $(this).parent().parent().prev().find('.js-renew-calendar-text').text($(this).text())
    // 달력레이어 숨기기
    $(this).addClass('is--active').siblings().removeClass('is--active')
    $(this).parent().parent().hide()
    $(this).parent().parent().next().hide()
  })

  const multipleSearch = () => {
    $(document).on('click', '.js-renew-search-category', function () {
      const select = $(this)
      if ($(this).hasClass('is--open')) {
        $(this).removeClass('is--open')
      } else {
        $(this).addClass('is--open')
      }
      const setting = $(this).find('.renew-select-box-list')
      $(document).on('mouseup', function (e) {
        if (setting.has(e.target).length === 0) {
          if (e.target.className !== select[0].className) {
            select.removeClass('is--open')
          }
        }
      })
    })

    $(document).on('click', '.js-renew-search-category .js-renew-select-item', function () {
      $(this).parents('.js-renew-search-category').addClass('is--selected')
      $(this).addClass('is--selected').siblings().removeClass('is--selected')
      $($(this).parent().parent().find('.renew-select-box__label')).text($(this).text())
      $($(this).parent().parent().find('.renew-select-box__label')).addClass('is--selected')
      const category = $(this).attr('data-category')
      const target = $(this).parent().parent().next().find('.js-renew-multiple-input')
      switch (category) {
        case 'condition':
          if (!target.children().hasClass('condition')) {
            target.html(`
                <div class="select-box js-select renew condition">
                  <strong class="select-box__label">판매중</strong><span class="select-box__icon"></span>
                  <div class="select-box-list">
                    <span class="select-box__item js-select-item">판매중</span>
                    <span class="select-box__item js-select-item">품절</span>
                    <span class="select-box__item js-select-item">판매중지</span>
                  </div>
                </div>
                `)
          }
          break
        case 'channelName':
          if (!target.children().hasClass('js-multiple-select')) {
            target.children().remove()
            $('.multiselect-dropdown').remove()
            target.html(`
               <select name="field2" id="field2" class="js-multiple-select" style="width: 100%" multiple multiselect-search="true" multiselect-select-all="true" multiselect-max-items="6">
                  <option>Abarth</option>
                  <option>Alfa Romeo</option>
                  <option>Aston Martin</option>
                  <option>Audi</option>
                  <option>Bentley</option>
                  <option>BMW</option>
                  <option>Bugatti</option>
                </select>
            `)
            MultiselectDropdown(window.MultiselectDropdownOptions)
          }
          break

        case 'authentication':
          if (!target.children().hasClass('append-authentication')) {
            target.html(`
               <div class="select-box renew js-select js-select-filter append-authentication">
                <strong class="select-box__label">인증 종류</strong><span class="select-box__icon"></span>
                <div class="select-box-list">
                  <span class="select-box__item js-select-item">KC인증</span>
                  <span class="select-box__item js-select-item">전자파 인증</span>
                  <span class="select-box__item js-select-item">어린이 인증</span>
                </div>
              </div>
              <input type="text" class="multiple-input__text with--select" placeholder="검색 내용을 입력해 주세요.">
              `)
          }
          break
      }
    })

    function appendFilter (current) {
      current.after(`<div class="renew-multiple-part">
              <div class="renew-select-box js-renew-search-category">
                <strong class="renew-select-box__label">검색 구분</strong><span class="renew-select-box__icon"></span>
                <div class="renew-select-box-list">
                  <span class="renew-select-box__item js-renew-select-item" data-category="condition">판매상태</span>
                  <span class="renew-select-box__item js-renew-select-item" data-category="channelName">채널명</span>
                  <span class="renew-select-box__item js-renew-select-item" data-category="authentication">인증정보</span>
                </div>
              </div>
              <div class="renew-multiple-input-area full">
                <div class="renew-multiple-input js-renew-multiple-input">
                  <input type="text" class="multiple-input__text" placeholder="검색 내용을 입력해 주세요.">
                </div>
              </div>
              <div class="multiple-input-button-area">
                <button class="multiple-input-button add js-renew-part-add"><span class="blind">추가</span></button>
                <button class="multiple-input-button remove js-renew-part-remove"><span class="blind">제거</span></button>
              </div>
            </div>`)
    }

    // 검색창에서 검색조건 추가버튼 눌렀을 경우
    $(document).on('click', '.js-renew-part-add', function () {
      appendFilter($(this).parents('.renew-multiple-part'))
    })
    // 검색창에서 검색조건 삭제버튼 눌렀을 경우
    $(document).on('click', '.js-renew-part-remove', function () {
      $(this).parents('.renew-multiple-part').remove()
    })

  }

  multipleSearch()

  // 다중검색
  $('.js-renew-multiple-search-button').on('click', function() {
    $(this).parent().toggleClass('is--open')
    $(this).next('.js-renew-multiple-search').toggle()
    if($(this).next('.js-renew-multiple-search').is(':visible')) {
      $(this).find('.js-search-button-text').text('less filters')
      $(this).parent().next().addClass('is--disabled')
    } else {
      $(this).find('.js-search-button-text').text('more filters')
      $(this).parent().next().removeClass('is--disabled')
    }
  })
})
