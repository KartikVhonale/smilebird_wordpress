( function( $ ) {
    "use strict";
    $(document).ready(function(){
        var myOptions = {
            change: function(event, ui){
                var color_id = $(this).attr('id');
                var slug = $(this).data('slug');
                var soical_icon = $(this).data('soical-icon');

                var color_code = ui.color.toString();
                if ( color_id === 'tab_background_color'){
                    $('.mystickyelements-contact-form .mystickyelements-social-icon').css('background-color', color_code );
                }
                if ( color_id === 'tab_text_color'){
                    $('.mystickyelements-contact-form .mystickyelements-social-icon').css('color', color_code );
                }
                if ( color_id === 'minimize_tab_background_color'){
                    $('span.mystickyelements-minimize').css('background-color', color_code );
                }
                if (color_id === 'form_bg_color') {
                    $('.preview-element-contact-form').css('background-color', color_code);
                }
                if (color_id === 'headine_text_color') {
                    $('.preview-element-contact-form-wrap h2').css('color', color_code);
                }
                if (color_id === 'placeholder_color') {
                    $('.myStickyelements-preview-screen').append('<style>.preview-contactform-field::placeholder  {color:' + color_code + '}  </style>');
                }
                if (color_id === 'submit_button_background_color') {
                    $('#preview-stickyelements-submit-form').css('background-color', color_code);
                }
                if (color_id === 'submit_button_text_color') {
                    $('#preview-stickyelements-submit-form').css('color', color_code);
                }
                if ( typeof slug !== 'undefined' ){
                    $('.mystickyelements-social-icon.social-' + slug ).css('background', color_code );
                    social_icon_live_preview_color_css();
                }

                if ( typeof soical_icon !== 'undefined' ){
                    if ( soical_icon == 'line' ) {
                        $('.mystickyelements-social-icon.social-' + soical_icon + ' svg .fil1' ).css('fill', color_code );
                    } else if (  soical_icon == 'qzone' ) {
                        $('.mystickyelements-social-icon.social-' + soical_icon + ' svg .fil2' ).css('fill', color_code );
                    } else {
                        $('.mystickyelements-social-icon.social-' + soical_icon + ' i' ).css('color', color_code );
                    }
                }
            }
        };
        $('.mystickyelement-color').wpColorPicker(myOptions);

        if ( $( "#contact-form-send-leads option:selected" ).val() === 'mail') {
            $('#contact-form-send-mail').show();
        }

        $('#contact-form-send-leads').on( 'change', function() {
            if ( $(this).val() === 'mail' ) {
                $('#contact-form-send-mail').show();
            } else {
                $('#contact-form-send-mail').hide();
            }
        });

        $(document).on("change", "input[name='contact-form[direction]']", function(){
            if($(this).val() == "RTL") {
                $(".mystickyelements-fixed").addClass("is-rtl");
            } else {
                $(".mystickyelements-fixed").removeClass("is-rtl");
            }
        });
        

        $('.button-contact-popup-disable').on('click',function(){
            $( '#myStickyelements-preview-contact' ).hide();
            $( '.mystickyelements-contact-form' ).addClass( 'mystickyelements-contact-form-hide' );
            $(".turn-off-message").css('display','block');
            $(".contact-form-description").css('display','none');
            $(".preview-element-contact-form").css('display','none');
            $('#contactform-status-popup').hide();
            $('#mystickyelement-contact-popup-overlay').hide();
        });



        $( '#myStickyelements-contact-form-enabled' ).on( 'click', function() {
            if( $(this).prop("checked") == true ){
                
                $(".turn-off-message").css('display','none');
                $(".contact-form-description").css('display','block');
                $( '#myStickyelements-preview-contact' ).show();
                $( '.mystickyelements-contact-form' ).removeClass( 'mystickyelements-contact-form-hide' );
            }else {
                $('#contactform-status-popup').show();
                $('#mystickyelement-contact-popup-overlay').show();
                $('.mystickyelements-disable-content-wrap').hide();
            }
             myStickyelements_mobile_count();
             mystickyelements_disable_section( 'mystickyelements-tab-contact-form', 'myStickyelements-contact-form-enabled' );
        });

        /* Social Chanel Privew */
        $(document).on( "click", ".social-channel-view-desktop", function(e){               
            var social_channel_tab_desktop = $(this).data( 'social-channel-view' );
            if($(this).prop("checked") == false ){
                $('ul.myStickyelements-preview-ul li.mystickyelements-social-' + social_channel_tab_desktop).removeClass('element-desktop-on');
            } else {
                $('ul.myStickyelements-preview-ul li.mystickyelements-social-' + social_channel_tab_desktop).addClass('element-desktop-on');
            }
            mystickyelements_border_radius();
        });
        
        $(document).on( "click", ".social-channel-view-mobile", function(e){        
            var social_channel_tab_mobile = $(this).data( 'social-channel-view' );
            if($(this).prop("checked") == false ){
                $('ul.myStickyelements-preview-ul li.mystickyelements-social-' + social_channel_tab_mobile).removeClass('element-mobile-on');
            } else {
                $('ul.myStickyelements-preview-ul li.mystickyelements-social-' + social_channel_tab_mobile).addClass('element-mobile-on');
            }
            mystickyelements_border_radius();
        });

        /* Append Social Channels tab */
        $(document).on( "click" , ".social-channel",function(){ 
            var social_channel = $(this).data( 'social-channel' );
            if( social_channel.indexOf('custom') != -1 ){
                $(this).parent().parent().remove();         
            } 
            if(jQuery(this).prev().hasClass('social-checked-active')){
                jQuery(this).prev().removeClass('social-checked-active');
            }else{
                jQuery(this).prev().addClass('social-checked-active');  
            }
            var len = $(".myStickyelements-social-channels-lists input[name^='social-channels']:checked").length;

            /* Remove Social Channel */
            if($(this).prop("checked") == false){
                $('.social-channels-item[data-slug=' + social_channel +']').remove();
                $('.social-channel[data-social-channel=' + social_channel + ' ]').prop("checked", false);
                mysticky_social_channel_order();

                /* remove from preview */
                $('ul.myStickyelements-preview-ul li.mystickyelements-social-' + social_channel).remove();
                social_icon_live_preview_color_css();
                mystickyelements_border_radius();
            }

            /* When user add more than 2 then return and display upgrade now message. */			
            if ( ( $('.social-channels-item').length >= 2 || len > 2 ) && jQuery(this).prev().hasClass('social-checked-active') ) {
                jQuery(this).prev().removeClass('social-checked-active');
                $('.social-channel[data-social-channel=' + social_channel + ' ]').prop("checked", false);
                $('.social-channel-popover').show().effect('shake', { times: 4 }, 1200);
                $('body,html').animate({ scrollTop:  $(".social-channel-popover").offset().top - 200 }, 800);
                return;
            } else {
				$('.social-channel-popover').hide();
			}

            /* Add  Social Channel */
            if( $(this).prop("checked") == true ){
                jQuery.ajax({
                    url: ajaxurl,
                    type:'post',
                    data: 'action=mystickyelement-social-tab&social_channel=' + social_channel +'&is_ajax=true&wpnonce=' + mystickyelements.ajax_nonce,
                    success: function( data ){
                        $('.social-channels-tab').append(data);
                        $('.mystickyelement-color').wpColorPicker(myOptions);
                        mysticky_social_channel_order();
                        mystickyelements_border_radius();
                        social_icon_live_preview_color_css();
                        
						$('.social-channel-fontawesome-icon').select2({
                                                    allowClear: true,
                                                    templateSelection: stickyelement_iconformat,
                                                    templateResult: stickyelement_iconformat,
                                                    allowHtml: true
                                                });
                    },
                });

            }
            
            social_channel_order();
        });
		jQuery(document).on('click','.social-channel-popover .premio-upgrade-dismiss-btn',function(e){
			$('.social-channel-popover').hide();			
		});
		
		
        var custom_channel_length   = $('#myStickyelements-custom-channel-lenght').val();
        var custom_shortcode_length = $('#myStickyelements-custom-shortcode-lenght').val();
        
        jQuery(document).on('click','#myStickyelements-add-custom-social',function(e){
            e.preventDefault();
            custom_channel_length++;
            /* When user add more than 2 then return and display upgrade now message.  */
            var flag = morethen_channel_validation( 'custom_channel' );
            if(flag == false){
                return;
            }
            mystickyelement_social_tab_ajax( 'custom_channel' , custom_channel_length );
            $('#myStickyelements-custom-channel-lenght').val( custom_channel_length );
            
            var social_list = '<li data-search="custom_channel_'+custom_channel_length+'"><label><span class="social-channels-list social-custom_channel_'+custom_channel_length+' social-checked-active" style="background-color: #7761DF;"><i class="fas fa-cloud-upload-alt"></i></span><input type="checkbox" data-social-channel="custom_channel_'+custom_channel_length+'" class="social-channel" name="social-channels[custom_channel_'+custom_channel_length+']" value="1" checked="checked" > </label><span class="social-tooltip-popup">Custom Channel</span></li>';

            $('.myStickyelements-social-channels-lists').append( social_list );
            $('.social-custom_channel_'+custom_channel_length+' span').addClass('social-checked-active');
            social_channel_order();
            $("html, body").animate({ scrollTop: 50 }, "slow");
        });
        
        jQuery(document).on('click','#myStickyelements-add-custom-shortcode',function(e){
            e.preventDefault();
            custom_shortcode_length++; 
            /* When user add more than 2 then return and display upgrade now message.  */
            var flag = morethen_channel_validation( 'custom_shortcode' );
            if(flag == false){
                return;
            }
            mystickyelement_social_tab_ajax( 'custom_shortcode' , custom_shortcode_length );
            $('#myStickyelements-custom-shortcode-lenght').val(custom_shortcode_length);

            var shortcode_list = '<li data-search="custom_shortcode_'+custom_shortcode_length+'"><label><span class="social-channels-list social-custom_shortcode_'+custom_shortcode_length+' social-checked-active" style="background-color: #7761DF;"><i class="fas fa-code"></i></span><input type="checkbox" data-social-channel="custom_shortcode_'+custom_shortcode_length+'" class="social-channel" name="social-channels[custom_shortcode_'+custom_shortcode_length+']" value="1" checked="checked" ></input> </label><span class="social-tooltip-popup">Custom Shortcode</span></li>';
            $('.myStickyelements-social-channels-lists').append( shortcode_list );
            social_channel_order();
            $("html, body").animate({ scrollTop: 50 }, "slow");
        });
        
        
        function morethen_channel_validation( social_channel ) {
            /* When user add more than 2 then return and display upgrade now message.  */
            if( $(".social-channel-popover").length ) {             
                var len = $(".myStickyelements-social-channels-lists input[name^='social-channels']:checked").length;
                if ( $('.social-channels-item').length >= 2 || len > 2 ) {
                    $('.social-channel[data-social-channel='+ social_channel +']').prop("checked", false);
                    $('.social-channel-popover').show().effect('shake', {times: 4}, 1200);
                    $('body,html').animate({ scrollTop:  $(".social-channel-popover").offset().top - 200 }, 800);
                    return false;
                }
            }
        }
        
        social_channel_order();
        /* Set social channel order */
        function social_channel_order() {
            var social_channel_order = 1;
            $('.myStickyelements-social-channels-lists li input.social-channel:checked').each(function(){
                $(this).parent().parent().css( 'order', social_channel_order++);
            });
            
            $(".myStickyelements-social-channels-lists li input.social-channel:not(:checked)").each(function () {
                $(this).parent().parent().css( 'order', social_channel_order++);
            });
			
		}
        
        
        function mystickyelement_social_tab_ajax( social_channel , channel_key ){
            /* When user add more than 2 then return and display upgrade now message. */
            
            
            if ( $('.social-channels-item').length >= 2 ) {             
                $('.social-channel[data-social-channel=' + social_channel + ' ]').prop("checked", false);
                $('.social-channel-popover').show().effect('shake', { times: 4 }, 1200);
                $('body,html').animate({ scrollTop:  $(".social-channel-popover").offset().top - 200 }, 800);
                return;
            } else {
				$('.social-channel-popover').hide()
			}
            
            jQuery.ajax({
                url: ajaxurl,
                type:'post',
                data: 'action=mystickyelement-social-tab&social_channel=' + social_channel + '&channel_key=' + channel_key + '&is_ajax=true&wpnonce=' + mystickyelements.ajax_nonce,
                success: function( data ){
                    $('.social-channels-tab').append(data);
                    $('.mystickyelement-color').wpColorPicker(myOptions);
                    mysticky_social_channel_order();
                    mystickyelements_border_radius();
                    social_icon_live_preview_color_css();
                    $('.social-channel-fontawesome-icon').select2({
                                                allowClear: true,
                                                templateSelection: stickyelement_iconformat,
                                                templateResult: stickyelement_iconformat,
                                                allowHtml: true
                                            });
                },
            });
        }

        /* Social Channel Delete */
        $(document).on( "click", '.social-channel-close,.close-tooltip .tooltiptext a', function(e){
            e.preventDefault();
            var chanel_name = $(this).data('slug');
            //$('.social-channels-item[data-slug=' + chanel_name +']').remove();
            $('.social-channels-item[data-slug=' + chanel_name +']').slideUp("slow",function(){
                $(this).remove();});
            $('.social-channel[data-social-channel=' + chanel_name + ' ]').prop("checked", false);
            $('.social-channel[data-social-channel=' + chanel_name + ' ]').prev().removeClass('social-checked-active');
            mysticky_social_channel_order();
            mystickyelements_border_radius();
            
            
            
            /* remove from preview */
            $('ul.myStickyelements-preview-ul li.mystickyelements-social-' + chanel_name).remove();
            social_icon_live_preview_color_css();
            
            /* remove custom channel from ul li list*/
            if( chanel_name.indexOf('custom') != -1 ){
                $('.social-channel').each(function(){
                    var social_channel = $(this).data( 'social-channel' );
                    if( chanel_name == social_channel ){
                        $(this).parent().parent().remove(); 
                    }
                }); 
            }
            social_channel_order();
        });
        
        jQuery('.social-channels-tab').sortable({
            items:'.social-channels-item',
            placeholder: "mystickyelements-state-highlight social-channels-item",
            handle: ".mystickyelements-move-handle",
            cursor:'move',
            scrollSensitivity:40,
            stop:function(event,ui){
                mysticky_social_channel_order();
                mystickyelements_border_radius();
            }
        });
        
        $(document).on( "click", '.myStickyelements-channel-view .social-setting', function(e){
            var chanel_name = $(this).data('slug');
            $('.social-channels-item[data-slug=' + chanel_name +'] .social-channel-setting').slideToggle();
        });


        /* Media Upload */
        $(document).on( "click", '.social-custom-icon-upload-button', function(e){      
            e.preventDefault();
            var social_channel = $(this).data('slug');
            var image = wp.media({
                    title: 'Upload Image',
                        multiple: false
                    }).open()
                .on('select', function(e){
                    var uploaded_image = image.state().get('selection').first();
                    var image_url = uploaded_image.toJSON().url;
                    $('#social-channel-' + social_channel + '-custom-icon').val(image_url);
                    $('#social-channel-' + social_channel + '-icon').show();
                    $('#social-channel-' + social_channel + '-icon').parent().addClass( 'myStickyelements-custom-image-select' );
                    $('#social-channel-' + social_channel + '-custom-icon-img').attr( 'src', image_url);
                    var $social_icon_text = $('#social-' + social_channel + '-icon_text').val();
                    var $social_icon_text_size = $('#social-' + social_channel + '-icon_text_size').val();
                    var social_tooltip_text = social_channel.replace( '_', ' ' );
                    if( $social_icon_text != '' ) {
                        var $social_icon_text_size_style = 'display: block;font-size: '+ $social_icon_text_size + 'px;';
                    } else {
                        var $social_icon_text_size_style = 'display: none;font-size: '+ $social_icon_text_size + 'px;';
                    }
                    if( $( 'input[name="social-channels-tab[' + social_channel + '][stretch_custom_icon]"]' ).prop("checked") == true ) {
                        var stretch_custom_class = 'mystickyelements-stretch-custom-img';
                    } else {
                        var stretch_custom_class = '';
                    }
                    $('#mystickyelements-' + social_channel + '-custom-icon').prop("selectedIndex", 0).trigger('change');
                    $('ul.myStickyelements-preview-ul li span.social-' + social_channel + ' i').hide();
                    $('ul.myStickyelements-preview-ul li span.social-' + social_channel + ' img').remove();
                    $('ul.myStickyelements-preview-ul li span.social-' + social_channel + ' .mystickyelements-icon-below-text').remove();
                    $('ul.myStickyelements-preview-ul li span.social-' + social_channel).append( '<img class="' + stretch_custom_class + '" src="' + image_url + '" width="40" height="40"/><span class="mystickyelements-icon-below-text" style="'+ $social_icon_text_size_style +'">'+ $social_icon_text +'</span>' );

                    $('.social-channels-item .social-channel-input-box .social-' + social_channel + ' i').hide();
                    $('.social-channels-item .social-channel-input-box .social-' + social_channel ).append('<img src="' + image_url + '" width="25" height="25"/>');
                    if( $( 'input[name="social-channels-tab[' + social_channel + '][stretch_custom_icon]"]' ).prop("checked") == true ) {
                        $( '.social-' + social_channel + ' img' ).addClass('mystickyelements-stretch-custom-img');
                    } else {
                        $( '.social-' + social_channel + ' img' ).removeClass('mystickyelements-stretch-custom-img');
                    }
            });
        });
        $(document).on( "click", '.social-channel-icon-close', function(e){     
            var chanel_name = $(this).data('slug');
            $('#social-channel-' + chanel_name + '-custom-icon').val('');
            $('#social-channel-' + chanel_name + '-icon').hide();
            $('#social-channel-' + chanel_name + '-icon').parent().removeClass( 'myStickyelements-custom-image-select' );
            $('#social-channel-' + chanel_name + '-custom-icon-img').attr( 'src', '');
            $('ul.myStickyelements-preview-ul li span.social-' + chanel_name + ' i').show();
            $('ul.myStickyelements-preview-ul li span.social-' + chanel_name + ' img').remove();
            $('.social-channels-item .social-channel-input-box .social-' + chanel_name ).append( '<i class="fas fa-cloud-upload-alt"></i>' );
            $('ul.myStickyelements-preview-ul li span.social-' + chanel_name ).append( '<i class="fas fa-cloud-upload-alt"></i>' );
            $('.social-channels-item .social-channel-input-box .social-' + chanel_name + ' i').show();
            $('.social-channels-item .social-channel-input-box .social-' + chanel_name + ' img').remove();
        });
        $(document).on( "click", '.myStickyelements-stretch-icon-wrap input[type="checkbox"]' , function(e){
            var chanel_name = $(this).data('slug');
            $( '.social-' + chanel_name + ' img' ).toggleClass('mystickyelements-stretch-custom-img');
        });

        $('.social-channel-icon').each( function(){
            if ( $(this).children('img').attr('src') !='' ){
                $(this).show();
                $(this).parent().addClass( 'myStickyelements-custom-image-select' );
            }
        });

        /*  Delete Contact Lead*/
        jQuery(".mystickyelement-delete-entry").on( 'click', function(){
            var deleterowid = $( this ).attr( "data-delete" );
            var confirm_delete = window.confirm("Are you sure you want to delete Record with ID# "+deleterowid);
            if (confirm_delete == true) {
                jQuery.ajax({
                    type: 'POST',
                    url: ajaxurl,
                    data: {"action": "mystickyelement_delete_db_record","ID": deleterowid, delete_nonce: jQuery("#delete_nonce").val(),"wpnonce": mystickyelements.ajax_nonce},
                    success: function(data){
                        location.href = window.location.href;
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                        alert("Status: " + textStatus); alert("Error: " + errorThrown);
                    }
                });
            }
            return false;
        });

        jQuery("#mystickyelement_delete_all_leads").on( 'click', function(){
            var confirm_delete = window.confirm("Are you sure you want to delete all Record from the database?");
            if (confirm_delete == true) {
                jQuery.ajax({
                    type: 'POST',
                    url: ajaxurl,
                    data: {"action": "mystickyelement_delete_db_record", 'all_leads': 1 , delete_nonce: jQuery("#delete_nonce").val(),"wpnonce": mystickyelements.ajax_nonce},
                    success: function(data){
                        location.href = window.location.href;
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                        alert("Status: " + textStatus); alert("Error: " + errorThrown);
                    }
                });
            }
            return false;
        });

        /* Desktop Position */
        jQuery("input[name='general-settings[position]'").on( 'click', function(){
			console.log($(this).val());
            if ( $(this).val() === 'left'){
                $('.myStickyelements-preview-screen .mystickyelements-fixed').addClass('mystickyelements-position-left');
                $('.myStickyelements-preview-screen .mystickyelements-fixed').removeClass('mystickyelements-position-bottom');
                $('.myStickyelements-preview-screen .mystickyelements-fixed').removeClass('mystickyelements-position-right');

                    $('.preview-element-contact-form').addClass('left_pos');
                    $('.preview-element-contact-form').removeClass('bottom_pos');
                    $('.preview-element-contact-form').removeClass('right_pos');

                $('span.mystickyelements-minimize').removeClass('minimize-position-right');
                $('span.mystickyelements-minimize').removeClass('minimize-position-bottom');
                $('span.mystickyelements-minimize').addClass('minimize-position-left');
                $( '.mystickyelements-minimize.minimize-position-left' ).html('&larr;');                

                $( '.myStickyelements-position-on-screen-wrap' ).hide();
                $( '.myStickyelements-position-desktop-wrap' ).show();
            }
            if ( $(this).val() === 'right'){
                $('.myStickyelements-preview-screen .mystickyelements-fixed').removeClass('mystickyelements-position-left');
                $('.myStickyelements-preview-screen .mystickyelements-fixed').removeClass('mystickyelements-position-bottom');
                $('.myStickyelements-preview-screen .mystickyelements-fixed').addClass('mystickyelements-position-right');

                    $('.preview-element-contact-form').removeClass('left_pos');
                    $('.preview-element-contact-form').removeClass('bottom_pos');
                    $('.preview-element-contact-form').addClass('right_pos');

                $('span.mystickyelements-minimize').removeClass('minimize-position-left');
                $('span.mystickyelements-minimize').removeClass('minimize-position-bottom');
                $('span.mystickyelements-minimize').addClass('minimize-position-right');
                $( '.mystickyelements-minimize.minimize-position-right' ).html('&rarr;')                

                $( '.myStickyelements-position-on-screen-wrap' ).hide();
                $( '.myStickyelements-position-desktop-wrap' ).show();
            }
            if ( $(this).val() === 'bottom'){
                $('.myStickyelements-preview-screen .mystickyelements-fixed').removeClass('mystickyelements-position-left');
                $('.myStickyelements-preview-screen .mystickyelements-fixed').removeClass('mystickyelements-position-right');
                $('.myStickyelements-preview-screen .mystickyelements-fixed').removeClass('mystickyelements-position-top');
                $('.myStickyelements-preview-screen .mystickyelements-fixed').addClass('mystickyelements-position-bottom');

                    $('.preview-element-contact-form').removeClass('left_pos');
                    $('.preview-element-contact-form').removeClass('right_pos');
                    $('.preview-element-contact-form').addClass('bottom_pos');


                $('span.mystickyelements-minimize').removeClass('minimize-position-left');
                $('span.mystickyelements-minimize').removeClass('minimize-position-right');
                $('span.mystickyelements-minimize').removeClass('minimize-position-top');
                $('span.mystickyelements-minimize').addClass('minimize-position-bottom');
                $( '.mystickyelements-minimize.minimize-position-bottom' ).html('&darr;');              

                $( '.myStickyelements-position-on-screen-wrap' ).show();
                $( '.myStickyelements-position-desktop-wrap' ).hide();
            }
            mystickyelements_border_radius();
        });
        /* NEW CUSTOM FIELD POPUP */
        
        $( '.mystickyelements-add-custom-fields a' ).on( 'click', function () {
            $( '#contact_form_field_open' ).css('display','block');
            $( 'body' ).addClass( 'contact-form-popup-open' );
        });
        
        $( '.contact-form-dropdfown-close' ).on( 'click', function () {
            $('#contact_form_field_open').hide();
            $( 'body' ).removeClass( 'contact-form-popup-open' );
        });
        
        $( document ).on( 'mouseup',  function( event ) {
            if ( !$( event.target ).closest( ".custom-field-popup-open,.contact-form-dropdown-popup, .contact-form-dropdown-open, .mystickyelements-add-custom-fields a, .contact-form-setting-popup-open" ).length ) {
                $( '#contact_form_field_open' ).hide();
                $( '.contact-form-dropdown-open' ).hide();
                $( 'body' ).removeClass( 'contact-form-popup-open' );
            }
        });
        /* Mobile Position */
        jQuery("input[name='general-settings[position_mobile]'").on( 'click', function(){
            if ( $(this).val() === 'left' || $(this).val() === 'right'){
                jQuery( '.myStickyelements-position-mobile-wrap' ).show();
            }
            if ( $(this).val() === 'bottom' || $(this).val() === 'top'){
                jQuery( '.myStickyelements-position-mobile-wrap' ).hide();
            }
            if( $( '.myStickyelements-preview-screen' ).hasClass( 'myStickyelements-preview-mobile-screen' ) == true ) {
                if ( $(this).val() === 'left'){
                    $('.myStickyelements-preview-screen .mystickyelements-fixed').addClass('mystickyelements-position-mobile-left');
                    $('.myStickyelements-preview-screen .mystickyelements-fixed').removeClass('mystickyelements-position-mobile-right');
                    $('.myStickyelements-preview-screen .mystickyelements-fixed').removeClass('mystickyelements-position-mobile-bottom');
                    $('.myStickyelements-preview-screen .mystickyelements-fixed').removeClass('mystickyelements-position-mobile-top');


                        $('.preview-element-contact-form').addClass('left_pos_mobile');
                        $('.preview-element-contact-form').removeClass('right_pos_mobile');
                        $('.preview-element-contact-form').removeClass('bottom_pos_mobile');
                        $('.preview-element-contact-form').removeClass('top_pos_mobile');
                

                    $('span.mystickyelements-minimize').removeClass('minimize-position-mobile-right');
                    $('span.mystickyelements-minimize').removeClass('minimize-position-mobile-bottom');
                    $('span.mystickyelements-minimize').removeClass('minimize-position-mobile-top');
                    $('span.mystickyelements-minimize').addClass('minimize-position-mobile-left');

                    jQuery( '#myStickyelements_mobile_templete_desc' ).hide();
                }
                if ( $(this).val() === 'right'){
                    $('.myStickyelements-preview-screen .mystickyelements-fixed').removeClass('mystickyelements-position-mobile-left');
                    $('.myStickyelements-preview-screen .mystickyelements-fixed').addClass('mystickyelements-position-mobile-right');
                    $('.myStickyelements-preview-screen .mystickyelements-fixed').removeClass('mystickyelements-position-mobile-bottom');
                    $('.myStickyelements-preview-screen .mystickyelements-fixed').removeClass('mystickyelements-position-mobile-top');

                        $('.preview-element-contact-form').removeClass('left_pos_mobile');
                        $('.preview-element-contact-form').addClass('right_pos_mobile');
                        $('.preview-element-contact-form').removeClass('bottom_pos_mobile');
                        $('.preview-element-contact-form').removeClass('top_pos_mobile');

                    $('span.mystickyelements-minimize').removeClass('minimize-position-mobile-left');
                    $('span.mystickyelements-minimize').removeClass('minimize-position-mobile-bottom');
                    $('span.mystickyelements-minimize').removeClass('minimize-position-mobile-top');
                    $('span.mystickyelements-minimize').addClass('minimize-position-mobile-right');

                    jQuery( '#myStickyelements_mobile_templete_desc' ).hide();
                }
                if ( $(this).val() === 'bottom'){
                    $('.myStickyelements-preview-screen .mystickyelements-fixed').removeClass('mystickyelements-position-mobile-left');
                    $('.myStickyelements-preview-screen .mystickyelements-fixed').removeClass('mystickyelements-position-mobile-right');
                    $('.myStickyelements-preview-screen .mystickyelements-fixed').removeClass('mystickyelements-position-mobile-top');
                    $('.myStickyelements-preview-screen .mystickyelements-fixed').addClass('mystickyelements-position-mobile-bottom');
                        $('.preview-element-contact-form').removeClass('left_pos_mobile');
                        $('.preview-element-contact-form').removeClass('right_pos_mobile');
                        $('.preview-element-contact-form').addClass('bottom_pos_mobile');
                        $('.preview-element-contact-form').removeClass('top_pos_mobile');


                    $('span.mystickyelements-minimize').removeClass('minimize-position-mobile-left');
                    $('span.mystickyelements-minimize').removeClass('minimize-position-mobile-right');
                    $('span.mystickyelements-minimize').removeClass('minimize-position-mobile-top');
                    $('span.mystickyelements-minimize').addClass('minimize-position-mobile-bottom');

                    if (jQuery('#myStickyelements-inputs-templete option:selected').val() != 'default') {
                        jQuery( '#myStickyelements_mobile_templete_desc' ).show();
                        $('#myStickyelements_mobile_templete_desc').fadeOut(500);
                        $('#myStickyelements_mobile_templete_desc').fadeIn(500);
                    } else {
                        jQuery( '#myStickyelements_mobile_templete_desc' ).hide();
                    }
                }
                if ( $(this).val() === 'top'){
                    $('.myStickyelements-preview-screen .mystickyelements-fixed').removeClass('mystickyelements-position-mobile-left');
                    $('.myStickyelements-preview-screen .mystickyelements-fixed').removeClass('mystickyelements-position-mobile-right');
                    $('.myStickyelements-preview-screen .mystickyelements-fixed').removeClass('mystickyelements-position-mobile-bottom');
                    $('.myStickyelements-preview-screen .mystickyelements-fixed').addClass('mystickyelements-position-mobile-top');

                    $('.preview-element-contact-form').removeClass('left_pos_mobile');
                    $('.preview-element-contact-form').removeClass('right_pos_mobile');
                    $('.preview-element-contact-form').removeClass('bottom_pos_mobile');
                    $('.preview-element-contact-form').addClass('top_pos_mobile');


                    $('span.mystickyelements-minimize').removeClass('minimize-position-mobile-left');
                    $('span.mystickyelements-minimize').removeClass('minimize-position-mobile-right');
                    $('span.mystickyelements-minimize').removeClass('minimize-position-mobile-bottom');
                    $('span.mystickyelements-minimize').addClass('minimize-position-mobile-top');

                    if (jQuery('#myStickyelements-inputs-templete option:selected').val() != 'default') {
                        jQuery( '#myStickyelements_mobile_templete_desc' ).show();
                        $('#myStickyelements_mobile_templete_desc').fadeOut(500);
                        $('#myStickyelements_mobile_templete_desc').fadeIn(500);
                    } else {
                        jQuery( '#myStickyelements_mobile_templete_desc' ).hide();
                    }
                }
            }
            mystickyelements_border_radius();
        });
        /*Icon text live preivew*/
        $(document).on( "keyup", '.myStickyelements-icon-text-input' , function(e){     
            var myStickyelements_icon_text = $( this ).val();
            var myStickyelements_icon_social = $( this ).data( 'icontext' );
            if( jQuery("#myStickyelements-inputs-templete").val() == 'default' ) {
                $( '.social-' + myStickyelements_icon_social + ' .mystickyelements-icon-below-text' ).show();
            }
            $( '.social-' + myStickyelements_icon_social + ' .mystickyelements-icon-below-text' ).text( myStickyelements_icon_text );
            if( myStickyelements_icon_text == '' ) {
                $( '.social-' + myStickyelements_icon_social + ' .mystickyelements-icon-below-text' ).hide();
            }
        } );
        /*Icon text size live preivew*/     
        $(document).on( "keyup", '.myStickyelements-icon-text-size' , function(e){
            var myStickyelements_icon_text_size = $( this ).val();
            var myStickyelements_icon_social = $( this ).data( 'icontextsize' );
            $( '.social-' + myStickyelements_icon_social + ' .mystickyelements-icon-below-text' ).css( 'font-size', myStickyelements_icon_text_size + 'px' );
            if( myStickyelements_icon_text_size == 0 ) {
                $( '.social-' + myStickyelements_icon_social + ' .mystickyelements-icon-below-text' ).css( 'font-size', '' );
            }
        } );
        /*Contact text live preivew*/       
        $(document).on( "keyup", '[name="contact-form[text_in_tab]"]' , function(e){
            var myStickyelements_text_in_tab = $( this ).val();
            $( '.mystickyelements-contact-form .mystickyelements-social-icon' ).html( '<i class="far fa-envelope"></i> ' + myStickyelements_text_in_tab );          
        } );


        $('form.mystickyelements-form').on('input', updatePreview);
        function updatePreview() {
            var name_value = $('input[name="contact-form[name_value]"]').val();
            var phone_value = $('input[name="contact-form[phone_value]"]').val();
            var email_value = $('input[name="contact-form[email_value]"]').val();
            var message_value = $('textarea#contact-form-message-value').val();
            var submit_button = $('#contact-form-submit-button').val();
            var form_title = $('input[name="contact-form[contact_title_text]"]').val();

            if ( name_value != '' ) {
                $('#contact-form-name').attr("placeholder", name_value);
            }
            
            if ( phone_value != '' ) {
                $('#contact-form-phone').attr("placeholder", phone_value);
            }
            if ( email_value != '' ) {
                $('#contact-form-email').attr("placeholder", email_value);
            }
            if ( message_value != '' ) {
                $('#contact-form-message').attr("placeholder", message_value);
            }
            if ( message_value != '' ) {
                $('#contact-form-message').attr("placeholder", message_value);
            }
            if ( submit_button != '' ) {
                $('#preview-stickyelements-submit-form').val(submit_button);
            }
            if ( form_title != '' ) {
                $('.preview-element-contact-form-wrap h2').text(form_title);
            }
            
        }   
        updatePreview();
        $("#myStickyelements-preview-contact").hover(function(){
            $(".preview-element-contact-form").css("display", "block");
            
          });

          $("#myStickyelements-preview-contact").mouseenter(function(){
            $(".preview-element-contact-form").show();
          });$("#myStickyelements-preview-contact").mouseleave(function(){
            $(".preview-element-contact-form").hide();
          });
          $(".preview-element-contact-form").mouseenter(function(){
            $(this).show();
          });$(".preview-element-contact-form").mouseleave(function(){
            $(this).hide();
          });

        $(document).on("change",'.myStickyelements-visible-icon input[type="checkbox"]',function(){
            var idd = $(this).attr("id");
            console.log(idd);
            if($(this).prop("checked") == true){
                show_this_field( idd );
            }else{
                hide_this_field( idd );
            }
        });
        function show_this_field( idd ){
            if(idd == 'name_enable'){
                $(".preview-element-contact-form .preview-element-contact-form-wrap #contact-form-name").css("display","block");
            }
            if(idd == 'enable_phone'){
                $(".preview-element-contact-form .preview-element-contact-form-wrap #contact-form-phone").css("display","block");
            }
            if(idd == 'email_enable'){
                $(".preview-element-contact-form .preview-element-contact-form-wrap #contact-form-email").css("display","block");
            }
            if(idd == 'message_enable'){
                $(".preview-element-contact-form .preview-element-contact-form-wrap #contact-form-message").css("display","block");
            }
            if(idd == 'dropdown_enable'){
                $(".preview-element-contact-form .preview-element-contact-form-wrap #contact-form-dropdown-value").css("display","block");
            }
            if(idd == 'consent_checkbox'){
                $(".preview-element-contact-form .preview-element-contact-form-wrap #contact-form-consent-text").css("display","block");
            }
        }
        function hide_this_field( idd ){
            if(idd == 'name_enable'){
                $(".preview-element-contact-form .preview-element-contact-form-wrap #contact-form-name").css("display","none");
            }
            if(idd == 'enable_phone'){
                $(".preview-element-contact-form .preview-element-contact-form-wrap #contact-form-phone").css("display","none");
            }
            if(idd == 'email_enable'){
                $(".preview-element-contact-form .preview-element-contact-form-wrap #contact-form-email").css("display","none");
            }
            if(idd == 'message_enable'){
                $(".preview-element-contact-form .preview-element-contact-form-wrap #contact-form-message").css("display","none");
            }
            if(idd == 'dropdown_enable'){
                $(".preview-element-contact-form .preview-element-contact-form-wrap #contact-form-dropdown-value").css("display","none");
            }
            if(idd == 'consent_checkbox'){
                $(".preview-element-contact-form .preview-element-contact-form-wrap #contact-form-consent-text").css("display","none");
            }
        }        
	
        jQuery(".myStickyelements-preview-window ul li").on( 'click', function(){
            $('.myStickyelements-preview-window ul li').removeClass('preview-active');
            if ( $(this).hasClass('preview-desktop') === true ) {
                $(this).addClass('preview-active');				
                $('.myStickyelements-preview-screen').removeClass('myStickyelements-preview-mobile-screen');

                $('.myStickyelements-preview-screen .mystickyelements-fixed').removeClass('mystickyelements-position-mobile-left');
                $('.myStickyelements-preview-screen .mystickyelements-fixed').removeClass('mystickyelements-position-mobile-right');
                $('.myStickyelements-preview-screen .mystickyelements-fixed').removeClass('mystickyelements-position-mobile-bottom');
                $('.myStickyelements-preview-screen .mystickyelements-fixed').removeClass('mystickyelements-position-mobile-top');

                jQuery( '#myStickyelements_mobile_templete_desc' ).hide();

                if ( jQuery( 'input[name="contact-form[desktop]"]' ).prop( 'checked' ) == true ) {
                    jQuery( '#myStickyelements-preview-contact' ).addClass( 'element-desktop-on' );
                } else {
                    jQuery( '#myStickyelements-preview-contact' ).removeClass( 'element-desktop-on' );
                }

                $('.mystickyelements-preview .preview-element-contact-form').removeClass('left_pos_mobile');
                $('.mystickyelements-preview .preview-element-contact-form').removeClass('bottom_pos_mobile');
                $('.mystickyelements-preview .preview-element-contact-form').removeClass('right_pos_mobile');
                $('.mystickyelements-preview .preview-element-contact-form').removeClass('top_pos_mobile');


                if ($("input[name='general-settings[position]']:checked").val() === 'left') {
                    $('.mystickyelements-preview .preview-element-contact-form').addClass('left_pos');
                }
                if ($("input[name='general-settings[position]']:checked").val() === 'right') {
                    $('.mystickyelements-preview .preview-element-contact-form').addClass('right_pos');
                }
                if ($("input[name='general-settings[position]']:checked").val() === 'bottom') {
                    $('.mystickyelements-preview .preview-element-contact-form').addClass('bottom_pos');
                }
                if ($("input[name='general-settings[position]']:checked").val() === 'top') {
                    $('.mystickyelements-preview .preview-element-contact-form').addClass('top_pos');
                }

            }

            if ( $(this).hasClass('preview-mobile') === true ) {
                $(this).addClass('preview-active');

                $('.mystickyelements-preview .preview-element-contact-form').removeClass('left_pos');
                $('.mystickyelements-preview .preview-element-contact-form').removeClass('bottom_pos');
                $('.mystickyelements-preview .preview-element-contact-form').removeClass('right_pos');


                $('.myStickyelements-preview-screen').addClass('myStickyelements-preview-mobile-screen');
                $("input[name='general-settings[position_mobile]']:checked").val()
                if ( $("input[name='general-settings[position_mobile]']:checked").val() === 'left'){
                    $('.myStickyelements-preview-screen .mystickyelements-fixed').addClass('mystickyelements-position-mobile-left');
                    $('.myStickyelements-preview-screen .mystickyelements-fixed').removeClass('mystickyelements-position-mobile-right');
                    $('.myStickyelements-preview-screen .mystickyelements-fixed').removeClass('mystickyelements-position-mobile-bottom');
                    $('.myStickyelements-preview-screen .mystickyelements-fixed').removeClass('mystickyelements-position-mobile-top');


                    $('.preview-element-contact-form').addClass('left_pos_mobile');
                    $('.preview-element-contact-form').removeClass('right_pos_mobile');
                    $('.preview-element-contact-form').removeClass('bottom_pos_mobile');
                    $('.preview-element-contact-form').removeClass('top_pos_mobile');
                }
                if ( $("input[name='general-settings[position_mobile]']:checked").val() === 'right'){
                    $('.myStickyelements-preview-screen .mystickyelements-fixed').removeClass('mystickyelements-position-mobile-left');
                    $('.myStickyelements-preview-screen .mystickyelements-fixed').addClass('mystickyelements-position-mobile-right');
                    $('.myStickyelements-preview-screen .mystickyelements-fixed').removeClass('mystickyelements-position-mobile-bottom');
                    $('.myStickyelements-preview-screen .mystickyelements-fixed').removeClass('mystickyelements-position-mobile-top');
                    $('.preview-element-contact-form').removeClass('left_pos_mobile');
                    $('.preview-element-contact-form').addClass('right_pos_mobile');
                    $('.preview-element-contact-form').removeClass('bottom_pos_mobile');
                    $('.preview-element-contact-form').removeClass('top_pos_mobile');
                }
                if ( $("input[name='general-settings[position_mobile]']:checked").val() === 'bottom'){
                    $('.myStickyelements-preview-screen .mystickyelements-fixed').removeClass('mystickyelements-position-mobile-left');
                    $('.myStickyelements-preview-screen .mystickyelements-fixed').removeClass('mystickyelements-position-mobile-right');
                    $('.myStickyelements-preview-screen .mystickyelements-fixed').removeClass('mystickyelements-position-mobile-top');
                    $('.myStickyelements-preview-screen .mystickyelements-fixed').addClass('mystickyelements-position-mobile-bottom');

                    $('.preview-element-contact-form').removeClass('left_pos_mobile');
                    $('.preview-element-contact-form').removeClass('right_pos_mobile');
                    $('.preview-element-contact-form').addClass('bottom_pos_mobile');
                    $('.preview-element-contact-form').removeClass('top_pos_mobile');
                }
                if ( $("input[name='general-settings[position_mobile]']:checked").val() === 'top'){
                    $('.myStickyelements-preview-screen .mystickyelements-fixed').removeClass('mystickyelements-position-mobile-left');
                    $('.myStickyelements-preview-screen .mystickyelements-fixed').removeClass('mystickyelements-position-mobile-right');
                    $('.myStickyelements-preview-screen .mystickyelements-fixed').removeClass('mystickyelements-position-mobile-bottom');
                    $('.myStickyelements-preview-screen .mystickyelements-fixed').addClass('mystickyelements-position-mobile-top');
                    $('.preview-element-contact-form').removeClass('left_pos_mobile');
                    $('.preview-element-contact-form').removeClass('right_pos_mobile');
                    $('.preview-element-contact-form').removeClass('bottom_pos_mobile');
                    $('.preview-element-contact-form').addClass('top_pos_mobile');
                }

                $('.mystickyelements-preview .preview-element-contact-form').removeClass('left_pos');
                $('.mystickyelements-preview .preview-element-contact-form').removeClass('bottom_pos');
                $('.mystickyelements-preview .preview-element-contact-form').removeClass('right_pos');

                

                if ( jQuery( "#myStickyelements-inputs-templete option:selected" ).val() != 'default' && ( jQuery('input[name="general-settings[position_mobile]"]:checked').val() == 'bottom' || jQuery('input[name="general-settings[position_mobile]"]:checked').val() == 'top' ) ) {
                    jQuery( '#myStickyelements_mobile_templete_desc' ).show();
                    $('#myStickyelements_mobile_templete_desc').fadeOut(500);
                    $('#myStickyelements_mobile_templete_desc').fadeIn(500);
                } else {
                    jQuery( '#myStickyelements_mobile_templete_desc' ).hide();
                }

                if ( jQuery( 'input[name="contact-form[mobile]"]' ).prop( 'checked' ) == true && $( '#myStickyelements-contact-form-enabled' ).prop("checked") == true ) {
                    jQuery( '#myStickyelements-preview-contact' ).addClass( 'element-mobile-on' );
                } else {
                    jQuery( '#myStickyelements-preview-contact' ).removeClass( 'element-desktop-on' );
                    jQuery( '#myStickyelements-preview-contact' ).removeClass( 'element-mobile-on' );
                }
            }
            mystickyelements_border_radius();
        });
        
        function mysticky_social_channel_order(){
            var social_count = 1;
            $('.social-channels-item').each( function(){
                /* remove from preview */
                $('ul.myStickyelements-preview-ul li.mystickyelements-social-' + $(this).data('slug')).remove();
            });

            $('.social-channels-item').each( function(){
                var social_channel = $(this).data('slug');
                social_count = ("0" + social_count).slice(-2);
                $('#social-' + social_channel  + '-number').html(social_count);
                social_count++;

                var $social_icon = $('.social-channel-input-box-section .social-'+social_channel).html();
                var $social_custom_icon = $('.social-channel-setting #social-channel-'+ social_channel + '-icon img').attr( 'src');

                var $social_custom_fontawe_icon = $('#mystickyelements-'+ social_channel + '-custom-icon').val();
                if ( typeof $social_custom_icon !== 'undefined' && $social_custom_fontawe_icon !== '') {
                    $social_icon = '<i class="' + $social_custom_fontawe_icon + '"></i>';
                }else if ( typeof $social_custom_icon !== 'undefined' && $social_custom_icon !== '' ) {
                    $social_icon = '<img src="' + $social_custom_icon + '"/>';
                }

                var $social_bg_color = $('#social-' + social_channel + '-bg_color').val();
                var $social_icon_color = $('#social-' + social_channel + '-icon_color').val();
                var $social_icon_text = $('#social-' + social_channel + '-icon_text').val();
                var $social_icon_text_size = $('#social-' + social_channel + '-icon_text_size').val();
                if( $social_icon_text != '' ) {
                    var $social_icon_text_size_style = 'display: block;font-size: '+ $social_icon_text_size + 'px;';
                } else {
                    var $social_icon_text_size_style = 'display: none;font-size: '+ $social_icon_text_size + 'px;';
                }

                if( $('#social_channel_' + social_channel + '_desktop').prop("checked") == true ){
                    var social_channel_desktop_visible = ' element-desktop-on';
                }
                else {
                    var social_channel_desktop_visible = '';
                }

                if( $('#social_channel_' + social_channel + '_mobile').prop("checked") == true ){
                    var social_channel_mobile_visible = ' element-mobile-on';
                }
                else {
                    var social_channel_mobile_visible = '';
                }
				
                var social_channel_data = '<li id="mystickyelements-social-' + social_channel + '" class="mystickyelements-social-' + social_channel + '' + social_channel_desktop_visible + '' + social_channel_mobile_visible + ' mystickyelements-social-preview "><span class="mystickyelements-social-icon social-' + social_channel + '" style="background: ' +$social_bg_color + '; color: '+ $social_icon_color + '">' + $social_icon + '<span class="mystickyelements-icon-below-text" style="'+ $social_icon_text_size_style +'">'+ $social_icon_text +'</span></span>';

                if ( social_channel == 'line') {
                    social_channel_data += '<style>.mystickyelements-social-icon.social-'+ social_channel +' svg .fil1{fill: '+ $social_icon_color+'}</style>';
                }
                if ( social_channel == 'qzone') {
                    social_channel_data += '<style>.mystickyelements-social-icon.social-'+ social_channel +' svg .fil2{fill: '+ $social_icon_color+'}</style>';
                }
                social_channel_data +='</li>';

                $('ul.myStickyelements-preview-ul').append(social_channel_data);
            });

            setTimeout(function(){
                myStickyelements_mobile_count();
            }, 500);
        }       
        
        myStickyelements_mobile_count();
        
        function myStickyelements_mobile_count () {
            if( $( 'input[name="contact-form[desktop]"]' ).prop("checked") == true && $( '#myStickyelements-contact-form-enabled' ).prop("checked") == true ){
                jQuery( '#myStickyelements-preview-contact' ).addClass( 'element-desktop-on' );
            } else {
                jQuery( '#myStickyelements-preview-contact' ).removeClass( 'element-desktop-on' );
                jQuery( '#myStickyelements-preview-contact' ).removeClass( 'element-mobile-on' );
            }
            if( $( 'input[name="contact-form[mobile]"]' ).prop("checked") == true && $( '#myStickyelements-contact-form-enabled' ).prop("checked") == true ){
                jQuery( '#myStickyelements-preview-contact' ).addClass( 'element-mobile-on' );
            } else {
                jQuery( '#myStickyelements-preview-contact' ).removeClass( 'element-mobile-on' );
            }

            var mobile_bottom = 0;
            $('.mystickyelements-fixed ul li').each( function () {
                if ( $(this).hasClass('element-mobile-on') ){
                    mobile_bottom++;
                }
            });

            $(".myStickyelements-preview-tab .mystickyelements-fixed").removeClass (function (index, className) {
                return (className.match (/(^|\s)mystickyelements-bottom-social-channel-\S+/g) || []).join(' ');
            });
            $(".myStickyelements-preview-tab .mystickyelements-fixed").removeClass (function (index, className) {
                return (className.match (/(^|\s)mystickyelements-top-social-channel-\S+/g) || []).join(' ');
            });
            $( '.myStickyelements-preview-tab .mystickyelements-fixed' ).addClass( 'mystickyelements-bottom-social-channel-' + mobile_bottom );
            $( '.myStickyelements-preview-tab .mystickyelements-fixed' ).addClass( 'mystickyelements-top-social-channel-' + mobile_bottom );
        }

        /* Sortable Contact Form Fields */
        jQuery( '#mystickyelements-contact-form-fields' ).sortable({
            items:'.mystickyelements-option-field',
            handle: ".mystickyelements-move-handle",
            cursor:'move',
            scrollSensitivity:40,
            placeholder: "mystickyelements-state-highlight",
            helper:function(e,ui){
                ui.children().each(function(){
                    jQuery(this).width(jQuery(this).width());
                });
                ui.css('left', '0');
                return ui;
            },
            start:function(event,ui){
                ui.item.css('background-color','#f9fcfc');
            },
            stop:function(event,ui){
                ui.item.removeAttr('style');
            }
        });

        $( "#mystickyelements-contact-form-fields" ).disableSelection();

        /* Open Contact form Dropdown Option popup */
        $(document).on('click','.contact-form-dropdown-popup',function(){
            $( '.contact-form-dropdown-open' ).show();
            $( 'body' ).addClass( 'contact-form-popup-open' );
        });
        
        $( '.contact-form-dropdfown-close' ).on( 'click', function () {
            $( '.contact-form-dropdown-open' ).hide();
            $( 'body' ).removeClass( 'contact-form-popup-open' );
        });
        
        
        /* Add Dropdown Option */
        $( '.add-dropdown-option' ).on( 'click', function () {
            $( '.contact-form-dropdown-option' ).append( '<div class="option-value-field ui-sortable-handle"><div class="move-icon"></div><input type="text" name="contact-form[dropdown-option][]" value=""/><span class="delete-dropdown-option"><i class="fas fa-times"></i></span></div>' );
        });
        /* Delete Dropdown Option */        
        $(document).on( "click", '.delete-dropdown-option' , function(e){
            $(this).closest('div').remove();
        });

        /*  Sortable Dropdown Option Value field*/
        jQuery( '.contact-form-dropdown-option' ).sortable({
            items:'.option-value-field',
            placeholder: "mystickyelements-state-highlight option-value-field",
            cursor:'move',
            scrollSensitivity:40,
            helper:function(e,ui){
                ui.children().each(function(){
                    jQuery(this).width(jQuery(this).width());
                });
                ui.css('left', '0');
                return ui;
            },
            start:function(event,ui){
                ui.item.css('background-color','#EFF6F6');
            },
            stop:function(event,ui){
                ui.item.removeAttr('style');
            }
        });

        if ( $( '#myStickyelements-minimize-tab' ).prop("checked") != true ) {
            $( '.myStickyelements-minimize-tab .wp-picker-container' ).hide();
            $( '.myStickyelements-minimized' ).hide();
        }

        if ( $( '#myStickyelements-contact-form-enabled' ).prop("checked") != true ) {
            $('.myStickyelements-contact-form-field-hide').hide();
            myStickyelements_mobile_count();
            $(".turn-off-message").css('display','block');
            $(".contact-form-description").css('display','none');
        }
        else{
            $(".turn-off-message").css('display','none');
            $(".contact-form-description").css('display','block');
        }

        $( '.myStickyelements-visible-icon input[type="checkbox"]' ).on( 'click', function() {
            var visible_id = $(this).attr('id');
            if( $(this).prop("checked") == true ){
                $( '.mystickyelements-' + visible_id ).removeClass( 'hide_field' );
            }else {
                $( '.mystickyelements-' + visible_id ).addClass( 'hide_field' );
            }
        });

        if ( $( '#myStickyelements-social-channels-enabled' ).prop("checked") != true ) {
            
            $('.social-disable-info').css('display','block');
            $('.mystickyelements-header-sub-title').css('display','none');
            $('.mystickyelements-disable-wrap').addClass('mystickyelements-disable');
            $('.mystickyelements-disable-wrap .myStickyelements-social-channels-info').hide();
            $('.mystickyelements-disable-content-wrap').css('display','block');
            $('.mystickyelements-social-preview').hide();
            $('#myStickyelements-preview-contact').addClass('mystickyelements-contact-last');
            $(".myStickyelements-preview-tab .mystickyelements-fixed").removeClass (function (index, className) {
                return (className.match (/(^|\s)mystickyelements-bottom-social-channel-\S+/g) || []).join(' ');
            });
            $(".myStickyelements-preview-tab .mystickyelements-fixed").removeClass (function (index, className) {
                return (className.match (/(^|\s)mystickyelements-top-social-channel-\S+/g) || []).join(' ');
            });
            $( '.myStickyelements-preview-tab .mystickyelements-fixed' ).addClass( 'mystickyelements-bottom-social-channel-1' );
            $( '.myStickyelements-preview-tab .mystickyelements-fixed' ).addClass( 'mystickyelements-top-social-channel-1' );
        }
        else{
            
            $('.mystickyelements-disable-wrap').remove('mystickyelements-disable');
            $('.mystickyelements-disable-wrap .myStickyelements-social-channels-info').show();
            $('.mystickyelements-disable-content-wrap').css('display','none');
            $('.social-disable-info').css('display','none');
            $('.mystickyelements-header-sub-title').css('display','block');
        }

        $( 'input[name="contact-form[desktop]"]' ).on( 'click', function(){
            if( $(this).prop("checked") == true ){
                jQuery( '#myStickyelements-preview-contact' ).addClass( 'element-desktop-on' );
            } else {
                jQuery( '#myStickyelements-preview-contact' ).removeClass( 'element-desktop-on' );
            }
        });
        $( 'input[name="contact-form[mobile]"]' ).on( 'click', function(){
            if( $(this).prop("checked") == true ){
                jQuery( '#myStickyelements-preview-contact' ).addClass( 'element-mobile-on' );
                myStickyelements_mobile_count();
            } else {
                jQuery( '#myStickyelements-preview-contact' ).removeClass( 'element-mobile-on' );
                myStickyelements_mobile_count();
            }
        });

        $( '#myStickyelements-minimize-tab' ).on( 'click', function () {
            if( $(this).prop("checked") == true ){
                $( '.myStickyelements-minimize-tab .wp-picker-container' ).show();
                $( '.myStickyelements-minimized' ).show();
                var position = $( 'input[name="general-settings[position]"]:checked' ).val();
                var position_arrow = '';
                if (position == 'left'){
                    position_arrow = '&larr;';
                } else {
                    position_arrow = '&rarr;';
                }
                var backgroud_color = $( '#minimize_tab_background_color' ).val();

                var minimize_content = "<li class='mystickyelements-minimize'><span class='mystickyelements-minimize minimize-position-"+ position +"' style='background: "+ backgroud_color +"'>"+position_arrow+"</span></li>";
                $( '.myStickyelements-preview-tab ul.myStickyelements-preview-ul li.mystickyelements-minimize' ).remove();
                $( ".myStickyelements-preview-tab ul.myStickyelements-preview-ul" ).prepend( minimize_content );
                $( '.myStickyelements-preview-tab ul.myStickyelements-preview-ul' ).removeClass( 'remove-minimize' );
            } else {
                $( '.myStickyelements-minimize-tab .wp-picker-container' ).hide();
                $( '.myStickyelements-minimized' ).hide();
                $( '.myStickyelements-preview-tab ul.myStickyelements-preview-ul li.mystickyelements-minimize' ).remove();
                $( '.myStickyelements-preview-tab ul.myStickyelements-preview-ul' ).addClass( 'remove-minimize' );
            }
            mystickyelements_border_radius();
        });

        $( '#myStickyelements-contact-form-enabled' ).on( 'click', function () {
            $('.myStickyelements-contact-form-field-hide').toggle();
        });

        $('.button-social-popup-disable').on('click',function(){
            $('.mystickyelements-social-preview').toggle();
            $('#myStickyelements-preview-contact').toggleClass('mystickyelements-contact-last');
            $('.mystickyelements-header-sub-title').css('display','none');
            $('.social-disable-info').css('display','block');
            $(".myStickyelements-preview-tab .mystickyelements-fixed").removeClass (function (index, className) {
                return (className.match (/(^|\s)mystickyelements-bottom-social-channel-\S+/g) || []).join(' ');
            });
            $(".myStickyelements-preview-tab .mystickyelements-fixed").removeClass (function (index, className) {
                return (className.match (/(^|\s)mystickyelements-top-social-channel-\S+/g) || []).join(' ');
            });
            $( '.myStickyelements-preview-tab .mystickyelements-fixed' ).addClass( 'mystickyelements-bottom-social-channel-1' );
            $( '.myStickyelements-preview-tab .mystickyelements-fixed' ).addClass( 'mystickyelements-top-social-channel-1' );
        
            
            $('#socialform-status-popup').hide();   
            $('#mystickyelement-social-popup-overlay').hide();
        });

        $( '#myStickyelements-social-channels-enabled' ).on( 'click', function () {
                
                if ($(this).prop("checked") != true) {
                    $('#socialform-status-popup').show();   
                    $('#mystickyelement-social-popup-overlay').show();
                } else {
                    $('.mystickyelements-social-preview').toggle();
                    $('#myStickyelements-preview-contact').toggleClass('mystickyelements-contact-last');
                    $('.social-disable-info').css('display','none');
                    $('.mystickyelements-header-sub-title').css('display','block');
                    myStickyelements_mobile_count();
                }
                
                mystickyelements_disable_section( 'mystickyelements-tab-social-media', 'myStickyelements-social-channels-enabled' );
        });

        var total_page_option = 0;
        var page_option_content = "";
        total_page_option   = $( '.myStickyelements-page-options' ).length;
        page_option_content = $( '.myStickyelements-page-options-html' ).html();
        $( '.myStickyelements-page-options-html' ).remove();
        $( '#remove-page-rules' ).on( 'click', function(){
            var rule_id = $( this ).data('wrap');
            $('#myStickyelements-page-options').hide();
            $('#remove-page-rules').hide();
            $( this ).prev().show();
            $( '.' + rule_id ).removeClass( 'rule-active' );
        });
        $( '#create-rule' ).on( 'click', function(){
            $('#remove-page-rules').show();
            var append_html = page_option_content.replace(/__count__/g, total_page_option, page_option_content);
            total_page_option++;
            $( '.myStickyelements-page-options' ).toggle();
            $( '.myStickyelements-page-options .myStickyelements-page-option' ).removeClass( 'last' );
            $( '.myStickyelements-page-options .myStickyelements-page-option:last' ).addClass( 'last' );

            if( $( '.myStickyelements-page-option .upgrade-myStickyelements' ).length > 0 ) {
                $( this ).hide();
            }
            
            var topPos = jQuery(".show-on-apper").offset().top - jQuery(window).scrollTop() - 700;
            topPos = Math.abs(topPos);
            var finalpos = $( '.mystickyelements-wrap' ).position().top + topPos;
            jQuery(".myStickyelements-preview-tab").css("margin-top", ((-1)*finalpos)+"px");
            set_rule_position();

            var window_width = $( window ).width();
            var dir = $("html").attr("dir");
			
            if (dir === 'rtl') {                
                
				var adminmenuwrap = $( '#adminmenuwrap' ).width();
                var more_setting_rows_width = ( $( '.more-setting-rows' ).width() - $( '.myStickyelements-show-on-right' ).width() );
                var remain_width = window_width - more_setting_rows_width - adminmenuwrap - 60;
                $( '.myStickyelements-page-options' ).width( remain_width );    
            
            } else {
                var show_right_pos = $( '.myStickyelements-show-on-right' ).offset().left;
                var remain_width = window_width - show_right_pos - 20;
                $( '.myStickyelements-page-options' ).width( remain_width );    
            }

            var rule_id = $( this ).data('wrap');
            $( '.' + rule_id ).addClass( 'rule-active' );
        });
        
        $( '#remove-data-and-time-rule' ).on( 'click', function(){
            var rule_id = $( this ).data('wrap');
            $('#myStickyelements-days-hours-options').hide();
            $('#remove-data-and-time-rule').hide();
            $( this ).prev().show();
            $( '.' + rule_id ).removeClass( 'rule-active' );
        });
        $( '#create-data-and-time-rule' ).on( 'click', function(){
            $('#remove-data-and-time-rule').show();
            $( '.myStickyelements-days-hours-options' ).toggle();
            if( $( '.myStickyelements-page-option .upgrade-myStickyelements' ).length > 0 ) {
                $( this ).hide();
            }
            
            var topPos = jQuery(".show-on-apper").offset().top - jQuery(window).scrollTop() - 700;
            topPos = Math.abs(topPos);
            var finalpos = $( '.mystickyelements-wrap' ).position().top + topPos;
            jQuery(".myStickyelements-preview-tab").css("margin-top", ((-1)*finalpos)+"px");
            set_rule_position();

            var window_width = $( window ).width();         
            var dir = $("html").attr("dir");
            if (dir === 'rtl') {                
                var adminmenuwrap = $( '#adminmenuwrap' ).width();
                var more_setting_rows_width = ( $( '.more-setting-rows' ).width() - $( '.myStickyelements-show-on-right' ).width() );
                var remain_width = window_width - more_setting_rows_width - adminmenuwrap - 60;
                $( '.myStickyelements-days-hours-options' ).width( remain_width );  
            
            } else {
                var show_right_pos = $( '.myStickyelements-show-on-right' ).offset().left;
                var remain_width = window_width - show_right_pos - 20;
                $( '.myStickyelements-days-hours-options' ).width( remain_width );  
            }

            var rule_id = $( this ).data('wrap');
            $( '.' + rule_id ).addClass( 'rule-active' );
        });
        
        $( '#remove-traffic-add-other-source' ).on( 'click', function(){            
            $('#remove-traffic-add-other-source').hide();
            $('.traffic-source-option').hide();
            $('#remove-traffic-add-other-source').hide();
            $( this ).prev().show();
        });
        
        $( '#traffic-add-other-source' ).on( 'click', function(){
            $('#remove-traffic-add-other-source').show();
            $( '.myStickyelements-traffic-source-inputs' ).toggle();
            //$( this ).css( 'margin-top', '10px' );
            if( $( '.myStickyelements-traffic-source-inputs .upgrade-myStickyelements' ).length > 0 ) {
                $( this ).hide();
            }
            set_rule_position();
        });
        
        $( document ).on( 'click', '#myStickyelements-page-options .myStickyelements-remove-rule', function() {
           //$( this ).closest( '.myStickyelements-page-option' ).remove();
           $( '.myStickyelements-page-options' ).hide();
            $( '.myStickyelements-page-options .myStickyelements-page-option' ).removeClass( 'last' );
            $( '.myStickyelements-page-options .myStickyelements-page-option:last' ).addClass( 'last' );
            $('#remove-page-rules').hide();
            $( '#create-rule' ).show();
        });
        
        $( document ).on( 'click', '#myStickyelements-days-hours-options .myStickyelements-remove-rule', function() {
            $( '.myStickyelements-days-hours-options' ).hide();
            $('#remove-data-and-time-rule').hide();
            $( '#create-data-and-time-rule' ).show();
        });
        check_for_preview_pos();
        $(window).on( 'scroll', function(){
            check_for_preview_pos();
        });

        $( document ).on( 'change', '.myStickyelements-url-options', function() {
            var current_val = jQuery( this ).val();
            var myStickyelements_siteURL = jQuery( '#myStickyelements_site_url' ).val();
            var myStickyelements_newURL  = myStickyelements_siteURL;
            if( current_val == 'page_has_url' ) {
                myStickyelements_newURL = myStickyelements_siteURL;
            } else if( current_val == 'page_contains' ) {
                myStickyelements_newURL = myStickyelements_siteURL + '%s%';
            } else if( current_val == 'page_start_with' ) {
                myStickyelements_newURL = myStickyelements_siteURL + 's%';
            } else if( current_val == 'page_end_with' ) {
                myStickyelements_newURL = myStickyelements_siteURL + '%s';
            }
            $( this ).closest( '.url-content' ).find( '.myStickyelements-url' ).text( myStickyelements_newURL );
        });

        set_rule_position();
        $( window ).on( 'scroll', function(){
            set_rule_position();
        });

        $("#myStickyelements-inputs-position-on-screen").on( 'change', function() {
            $(".myStickyelements-preview-tab .mystickyelements-fixed").removeClass (function (index, className) {
                return (className.match (/(^|\s)mystickyelements-position-screen-\S+/g) || []).join(' ');
            });
            $( '.myStickyelements-preview-tab .mystickyelements-fixed' ).addClass( 'mystickyelements-position-screen-' + $(this).val() );
        });
        $("#myStickyelements-widget-size").on( 'change', function() {
            $(".myStickyelements-preview-tab .mystickyelements-fixed").removeClass (function (index, className) {
                return (className.match (/(^|\s)mystickyelements-size-\S+/g) || []).join(' ');
            });
            $( '.myStickyelements-preview-tab .mystickyelements-fixed' ).addClass( 'mystickyelements-size-' + $(this).val() );
        });
        $("#myStickyelements-widget-mobile-size").on( 'change', function() {
            $(".myStickyelements-preview-tab .mystickyelements-fixed").removeClass (function (index, className) {
                return (className.match (/(^|\s)mystickyelements-mobile-size-\S+/g) || []).join(' ');
            });
            $( '.myStickyelements-preview-tab .mystickyelements-fixed' ).addClass( 'mystickyelements-mobile-size-' + $(this).val() );
        });

        $("#myStickyelements-entry-effect").on( 'change', function() {
            $(".myStickyelements-preview-tab .mystickyelements-fixed").removeClass('entry-effect');
            $(".myStickyelements-preview-tab .mystickyelements-fixed").removeClass (function (index, className) {
                return (className.match (/(^|\s)mystickyelements-entry-effect-\S+/g) || []).join(' ');
            });
            $( '.myStickyelements-preview-tab .mystickyelements-fixed' ).addClass( 'mystickyelements-entry-effect-' + $(this).val() );
            setTimeout( function(){
                $(".myStickyelements-preview-tab .mystickyelements-fixed").addClass('entry-effect');
            }, 1000 );

        });

        $("#myStickyelements-inputs-templete").on( 'change', function() {
            $(".myStickyelements-preview-tab .mystickyelements-fixed").removeClass (function (index, className) {
                return (className.match (/(^|\s)mystickyelements-templates-\S+/g) || []).join(' ');
            });
            $( '.myStickyelements-preview-tab .mystickyelements-fixed' ).addClass( 'mystickyelements-templates-' + $(this).val() );
            social_icon_live_preview_color_css();

            if ( jQuery(this).val() != 'default' && jQuery( '.preview-mobile' ).hasClass('preview-active') == true ) {
                jQuery( '#myStickyelements_mobile_templete_desc' ).show();
                $('#myStickyelements_mobile_templete_desc').fadeOut(500);
                $('#myStickyelements_mobile_templete_desc').fadeIn(500);
            } else {
                jQuery( '#myStickyelements_mobile_templete_desc' ).hide();
            }
            if( jQuery( this ).val() != 'default' ) {
                $( '.mystickyelements-icon-below-text' ).hide();
            } else {
                $( '.mystickyelements-icon-below-text' ).show();
                $( '.myStickyelements-preview-ul li' ).each( function(){
                    if ( $( this ).find( '.mystickyelements-icon-below-text' ).is(':empty') ){
                      $( this ).find( '.mystickyelements-icon-below-text' ).hide();
                    }
                } );
            }
        });

        $( '.mystickyelements-fixed' ).addClass( 'entry-effect' );

        /* FontAwesome icon formate in select2 */
        function stickyelement_iconformat(icon) {
            var originalOption = icon.element;
            return $('<span><i class="' + icon.text + '"></i> ' + icon.text + '</span>');
        }

        $('.social-channel-fontawesome-icon').select2({
                                                    allowClear: true,
                                                    templateSelection: stickyelement_iconformat,
                                                    templateResult: stickyelement_iconformat,
                                                    allowHtml: true
                                                });
        
        $(document).on( "change", '.social-channel-fontawesome-icon' , function(e){
            var social_channel = $(this).data('slug');
            var social_tooltip_text = social_channel.replace( '_', ' ' );
            $('ul.myStickyelements-preview-ul li span.social-' + social_channel).html('<i class="' + $(this).val() + '"></i>');
            $('.social-channels-item .social-channel-input-box .social-' + social_channel ).html('<i class="' + $(this).val() + '"></i><span class="social-tooltip-popup">' + social_tooltip_text + '</span>');
            if($(this).val() != '') {
                $('#social-channel-' + social_channel + '-custom-icon').val('');
                $('#social-channel-' + social_channel + '-icon').hide();
                $('#social-channel-' + social_channel + '-custom-icon-img').attr( 'src', '');
                $('#social-channel-' + social_channel + '-icon').parent().removeClass( 'myStickyelements-custom-image-select' );
            }
            mystickyelements_border_radius();
        });
        mystickyelements_border_radius();
        
        /*Confirm dialog*/
        $( '.mystickyelements-wrap p.submit input#submit' ).on( 'click', function(e){
            var icon_below_text_apper = 0;
            var mystickyelement_save_confirm_status = $( 'input#mystickyelement_save_confirm_status' ).val();
            $( '.mystickyelements-fixed ul li' ).each( function(){
                var icon_below_text_val = $( this ).find( '.mystickyelements-icon-below-text' ).text();
                if ( icon_below_text_val != '' ){
                  icon_below_text_apper = 1;
                  return false;
                }
            } );
            if ( jQuery("#myStickyelements-inputs-templete").val() != 'default' && icon_below_text_apper && mystickyelement_save_confirm_status == '' ) {
                e.preventDefault();
                $( "#mystickyelement-save-confirm" ).dialog({
                    resizable: false,
                    modal: true,
                    draggable: false,
                    height: 'auto',
                    width: 600,
                    buttons: {
                        "Publish": {
                            click:function () {
                                $( 'input#mystickyelement_save_confirm_status' ).val('1');
                                $( '.mystickyelement-wrap p.submit input#submit' ).trigger('click');
                                $( this ).dialog('close');
                            },
                            text: 'Publish',
                            class: 'purple-btn'
                        },
                        "Keep Editing": {
                             click:function () {
                                $( this ).dialog( 'close' );
                            },
                            text: 'Keep Editing',
                            class: 'gray-btn'
                        }
                    }
                });
            }
            //return false;
        } );
        
        /*social search*/
        
        $( ".myStickyelements-social-search-wrap input" ).on( "keyup", function() {
            var search_value = $( this ).val().toLowerCase();
            $( ".myStickyelements-social-channels-lists li" ).filter(function() {
              $( this ).toggle( $( this ).data( "search" ).toLowerCase().indexOf( search_value ) > -1 );
            });
            
            if( search_value.length == 0 ){
				$(".myStickyelements-social-channels-lists-section").animate({height:'190'});
			}

        });
        
        $(document).on( "change", ".social-custom-channel-type" , function(e){
            var csc_name = $(this).val();
            var csc_id   = $(this).data('id');
            var csc_slug     = $(this).data('slug');
            var csc_option = $('option:selected', this).data('social-channel');
            
            $('#' + csc_id + ' .social-channel-input-box .social-channels-list').addClass('custom-channel-type-list');
            $('#' + csc_id + ' .social-channel-input-box .social-channels-list').removeClass (function (index, className) {
                return (className.match (/(^|\s)social-\S+/g) || []).join(' ');
            });
            $('#' + csc_id + ' .social-channel-input-box .custom-channel-type-list').addClass('social-channels-list');
            $('#' + csc_id + ' .social-channel-input-box .custom-channel-type-list').addClass(csc_slug);
            $('#' + csc_id + ' .social-channel-input-box .social-channels-list').addClass('social-'+ csc_name);
            
            $('#' + csc_id + ' .social-channel-input-box .social-channels-list').css( 'background', csc_option.background_color);
            $('.mystickyelements-social-icon.' + csc_slug ).css('background', csc_option.background_color );            
            $('.mystickyelements-social-icon.' + csc_slug +' i').removeClass();
            $('.mystickyelements-social-icon.' + csc_slug +' i').addClass(csc_option.class);
            $('.mystickyelements-social-icon.' + csc_slug ).addClass('social-'+ csc_name);          
            
            $('#' + csc_id + ' .social-channel-input-box .social-channels-list i').removeClass();
            $('#' + csc_id + ' .social-channel-input-box .social-channels-list i').addClass(csc_option.class);
            
            
            $('#' + csc_id + ' .social-channel-input-box .social-channels-list .social-tooltip-popup').text(csc_option.hover_text);
            
            $('#' + csc_id + ' .social-channel-input-box input[type="text"]').attr('placeholder',csc_option.placeholder);
                        
            $('#' + csc_id + ' .social-channel-setting .myStickyelements-on-hover-text input[type="text"]').val(csc_option.hover_text);
            $('#' + csc_id + ' .social-channel-setting .myStickyelements-background-color input[type="text"].mystickyelement-color.wp-color-picker').val(csc_option.background_color);
            
            $('#' + csc_id + ' .social-channel-setting .myStickyelements-background-color .button.wp-color-result').css('background-color',csc_option.background_color);
            
            /* Hide*/
            if ( csc_name == 'custom' ) {
                $('#' + csc_id + ' .myStickyelements-custom-icon-image').show();
            } else {
                $('#' + csc_id + ' .myStickyelements-custom-icon-image').hide();
            }
            
            if (csc_option.is_pre_set_message == 1) {
                $('#' + csc_id + ' .social-channel-setting .myStickyelements-custom-pre-message').show();
            } else {
                $('#' + csc_id + ' .social-channel-setting .myStickyelements-custom-pre-message').hide();
            }
            
        });
        
        $( '#contact-form-send-leads' ).on( 'change', function(){
            
            if ( $('#contact-form-send-leads option:selected').data('href') != '' && $(this).val() != 'database'  ) {
                window.open( $( '#contact-form-send-leads option:selected' ).data('href') , '_blank');
            }
        });
        
        $( '.mystickyelements-turnit-on' ).on( 'click', function () {
            var mystickyelements_turnit = $( this ).data( 'turnit' );
            $( '#' + mystickyelements_turnit ).trigger( 'click' );
        });

        $( '#success-popup-overlay' ).on( 'click', function(event){
            var url = $(this).data('id');
            $( '.stickyelement-action-popup-open' ).hide();
            $( this ).hide();
            location.href = url
            event.stopPropagation();
        });

        $( '#send_leads_database' ).on( 'click', function(){
            $( '.contactform-sendleads-upgrade-popup, #contactform_sendleads_popup_overlay' ).show();
            $('.mystickyelements-intro-popup ').hide();
            $( this ).prop( 'checked', true );
        });
        
        if ( jQuery("input[name='general-settings[open_tabs_when]']:checked").val() == "click" ) {
            $('#mystickyelements-tab-hover-bebahvior').hide();
            $('#mystickyelements-tab-flyout').show();
        }else{
            $('#mystickyelements-tab-hover-bebahvior').show();
            $('#mystickyelements-tab-flyout').hide();
        }
		
		//hide_more_channel_list();
		$(document).on( "click", '#myStickyelements-more-social' , function(e){
			$( this ).toggleClass( 'more-less-btn-change' );
			$( '.myStickyelements-social-channels-lists' ).toggleClass( 'more-less-channel-change' );

			if( $( '.myStickyelements-social-channels-lists' ).hasClass( 'more-less-channel-change' ) ) {
				//$( '.myStickyelements-social-channels-lists li' ).show();	
				var ulHeight = $(".myStickyelements-social-channels-lists").height() + 30;	
				$(".myStickyelements-social-channels-lists-section").animate({height:ulHeight});
			} else {
				$(".myStickyelements-social-channels-lists-section").animate({height:'210'});
			}

			if( $( this ).hasClass( 'more-less-btn-change' ) ) {
				$( '.mystickyelement-more-less-channel a span' ).text( 'Show Less Channels' );
			} else {
				$( '.mystickyelement-more-less-channel a span' ).text( 'Show More Channels' );
			}
		} );
    });
	
	function hide_more_channel_list() {
		jQuery( '.myStickyelements-social-channels-lists li' ).each( function(){
			var order_css = jQuery( this ).css( 'order' );
			if( order_css > 20 ) {
				jQuery( this ).hide();
			}
		} );
	}
    $( window ).on('load',function () {
        $( '.myStickyelements-url-options' ).each( function(){          
            $( this ).trigger( 'change' );
        })
        
        $('.more-setting-rows').css('display','none');
        $('#submit').css('display','none');
        
        var widget_status = $('.mystickyelements-preivew-below-sec').data('id');
        if(widget_status == 0){
            $('.preview-publish').hide();
            $('#save_view').hide();
                $('.save-button').hide();
        }
        else{
            
            $('.preview-publish').html( 'Save' );
            $('.preview-publish').val('Save');
        }
    });
	
    function check_for_preview_pos() {
		if($( '.mystickyelements-tabs-wrap' ).length != 0 ){
		
			var tab_pos_top = $( '.mystickyelements-tabs-wrap' ).offset().top;
			if( jQuery(window).scrollTop() > 80 ) {
				jQuery(".myStickyelements-preview-tab").css("top", "100px");
				jQuery( '.mystickyelements-tabs' ).addClass( 'mystickyelements-tab-sticky' );
				var tab_height = jQuery( '.mystickyelements-tabs' ).outerHeight( true );
				jQuery( '.mystickyelements-form' ).css( 'padding-top', tab_height );
				jQuery( '.mystickyelements-tabs span.mystickyelements-tabs-subheading' ).hide();
			} else {
				jQuery(".myStickyelements-preview-tab").css("top", tab_pos_top + "px");
				jQuery( '.mystickyelements-tabs' ).removeClass( 'mystickyelements-tab-sticky' );
				jQuery( '.mystickyelements-form' ).css( 'padding-top', '' );
				jQuery( '.mystickyelements-tabs span.mystickyelements-tabs-subheading' ).show();
			}
			
			if(jQuery(".show-on-apper").length && jQuery(".myStickyelements-preview-tab").length && jQuery( '#mystickyelements-display-settings' ).hasClass( 'active' )) {
				var widget_title = 0;
				if ( jQuery('.myStickyelements-widget-title').length){
					widget_title = jQuery(".show-on-apper").outerHeight() + 10;
				}

				var topPos = jQuery(".show-on-apper").offset().top - jQuery(window).scrollTop() - 700;
				if (topPos < 0 && $( ".show-on-apper" ).hasClass('rule-active')) {
					topPos = Math.abs(topPos);
					var finalpos = $( '.mystickyelements-wrap' ).position().top + topPos;
					jQuery(".myStickyelements-preview-tab").css("margin-top", ((-1)*finalpos)+"px");
				} else {
					jQuery(".myStickyelements-preview-tab").css("margin-top", "0");
				}
			} else {
				jQuery(".myStickyelements-preview-tab").css("margin-top", "0");
			}
			
			if(jQuery(".show-on-apper-main").length && ! $( ".show-on-apper" ).hasClass('rule-active')) {
				var widget_title = 0;
				if ( jQuery('.myStickyelements-widget-title').length){
					widget_title = jQuery(".show-on-apper-main").outerHeight() + 10;
				}

				var topPos = jQuery(".show-on-apper-main").offset().top - jQuery(window).scrollTop() - 600;
				if (topPos < 0) {
					topPos = Math.abs(topPos);
					var finalpos = $( '.mystickyelements-wrap' ).position().top + topPos;
					jQuery(".myStickyelements-preview-tab").css("margin-top", ((-1)*finalpos)+"px");
				} else {
					jQuery(".myStickyelements-preview-tab").css("margin-top", "0");
				}
			}
		}
    }

    function set_rule_position() {
        var dir = $("html").attr("dir") ;
        if (dir === 'rtl') {
            var rt = ($( '.myStickyelements-content-section tr:first-child .myStickyelements-inputs' ).position().left - $( '.myStickyelements-minimized .myStickyelements-inputs' ).outerWidth()) + 12;
            $( '#create-rule, #create-data-and-time-rule' ).css( 'margin-right', rt + 'px' );
        } else {
            if ($( '.myStickyelements-content-section tr:first-child .myStickyelements-inputs' ).length != 0 ) {
                var right_element_pos = $( '.myStickyelements-content-section tr:first-child .myStickyelements-inputs' ).position().left;
                var create_rule_pos = $( '#create-rule' ).position().left;
                var remain_rule_pos = right_element_pos - create_rule_pos;
                $( '#create-rule, #create-data-and-time-rule' ).css( 'margin-left', remain_rule_pos + 'px' );
            }
        }

    }

    function social_icon_live_preview_color_css() {
        $('.myStickyelements-preview-ul li.mystickyelements-social-preview').each( function () {
            var current_icon_color = $(this).find('span.mystickyelements-social-icon').get(0).style.backgroundColor;
            var all_icon_class = this.className;
            var current_icon_class = all_icon_class.split(' ');

            var preview_css = '.myStickyelements-preview-screen:not(.myStickyelements-preview-mobile-screen) .mystickyelements-templates-diamond li:not(.mystickyelements-contact-form).'+ current_icon_class[0] +' span.mystickyelements-social-icon::before{background: '+ current_icon_color +'}';
            var preview_css = preview_css + '.myStickyelements-preview-screen.myStickyelements-preview-mobile-screen .mystickyelements-templates-diamond li:not(.mystickyelements-contact-form).'+ current_icon_class[0] +' span.mystickyelements-social-icon::before{background: '+ current_icon_color +'}';
            var preview_css = preview_css + '.myStickyelements-preview-mobile-screen .mystickyelements-position-mobile-bottom.mystickyelements-templates-diamond li:not(.mystickyelements-contact-form).'+ current_icon_class[0] +' span.mystickyelements-social-icon{background: '+ current_icon_color +' !important}';
            var preview_css = preview_css + '.myStickyelements-preview-mobile-screen .mystickyelements-position-mobile-top.mystickyelements-templates-diamond li:not(.mystickyelements-contact-form).'+ current_icon_class[0] +' span.mystickyelements-social-icon{background: '+ current_icon_color +' !important}';

            var preview_css = preview_css + '.myStickyelements-preview-screen:not(.myStickyelements-preview-mobile-screen) .mystickyelements-templates-triangle li:not(.mystickyelements-contact-form).'+ current_icon_class[0] +' span.mystickyelements-social-icon::before{background: '+ current_icon_color +'}';
            var preview_css = preview_css + '.myStickyelements-preview-screen.myStickyelements-preview-mobile-screen .mystickyelements-templates-triangle li:not(.mystickyelements-contact-form).'+ current_icon_class[0] +' span.mystickyelements-social-icon::before{background: '+ current_icon_color +'}';
            var preview_css = preview_css + '.myStickyelements-preview-mobile-screen .mystickyelements-position-mobile-bottom.mystickyelements-templates-triangle li:not(.mystickyelements-contact-form).'+ current_icon_class[0] +' span.mystickyelements-social-icon{background: '+ current_icon_color +' !important}';
            var preview_css = preview_css + '.myStickyelements-preview-mobile-screen .mystickyelements-position-mobile-top.mystickyelements-templates-triangle li:not(.mystickyelements-contact-form).'+ current_icon_class[0] +' span.mystickyelements-social-icon{background: '+ current_icon_color +' !important}';

            var preview_css = preview_css + '.myStickyelements-preview-screen:not(.myStickyelements-preview-mobile-screen) .mystickyelements-position-left.mystickyelements-templates-arrow li:not(.mystickyelements-contact-form).'+ current_icon_class[0] +' span.mystickyelements-social-icon::before{border-left-color: '+ current_icon_color +'}';
            var preview_css = preview_css + '.myStickyelements-preview-screen:not(.myStickyelements-preview-mobile-screen) .mystickyelements-position-right.mystickyelements-templates-arrow li:not(.mystickyelements-contact-form).'+ current_icon_class[0] +' span.mystickyelements-social-icon::before{border-right-color: '+ current_icon_color +'}';
            var preview_css = preview_css + '.myStickyelements-preview-screen:not(.myStickyelements-preview-mobile-screen) .mystickyelements-position-bottom.mystickyelements-templates-arrow li:not(.mystickyelements-contact-form).'+ current_icon_class[0] +' span.mystickyelements-social-icon::before{border-bottom-color: '+ current_icon_color +'}';

            var preview_css = preview_css + '.myStickyelements-preview-screen.myStickyelements-preview-mobile-screen .mystickyelements-position-mobile-left.mystickyelements-templates-arrow li:not(.mystickyelements-contact-form).'+ current_icon_class[0] +' span.mystickyelements-social-icon::before{border-left-color: '+ current_icon_color +'}';
            var preview_css = preview_css + '.myStickyelements-preview-screen.myStickyelements-preview-mobile-screen .mystickyelements-position-mobile-right.mystickyelements-templates-arrow li:not(.mystickyelements-contact-form).'+ current_icon_class[0] +' span.mystickyelements-social-icon::before{border-right-color: '+ current_icon_color +'}';

            if ( current_icon_class[0] == 'insagram' ) {
                var preview_css = preview_css + '.myStickyelements-preview-screen:not(.myStickyelements-preview-mobile-screen) .mystickyelements-templates-arrow li:not(.mystickyelements-contact-form).'+ current_icon_class[0] +' span.mystickyelements-social-icon::before{background: '+ current_icon_color +'}';
                var preview_css = preview_css + '.myStickyelements-preview-screen.myStickyelements-preview-mobile-screen .mystickyelements-templates-arrow li:not(.mystickyelements-contact-form).'+ current_icon_class[0] +' span.mystickyelements-social-icon::before{background: '+ current_icon_color +'}';
            }
            $('head').append('<style type="text/css"> '+ preview_css +' </style>');
        });
    }

    /*font family Privew*/
    $( '.form-fonts' ).on( 'change', function(){
        var font_val = $(this).val();
		var selected = $("option:selected", this);
        $( '.sfba-google-font' ).remove();
        if(font_val == 'System Stack' ) {
            font_val = '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen-Sans,Ubuntu,Cantarell,Helvetica Neue,sans-serif';
        }
        $( 'head' ).append( '<link href="https://fonts.googleapis.com/css?family='+ font_val +':400,600,700" rel="stylesheet" type="text/css" class="sfba-google-font">' );
        $( '.myStickyelements-preview-ul .mystickyelements-social-icon' ).css( 'font-family',font_val );
		
		if (selected.parent()[0].label == "Google Fonts") {
			$(".load-google-fonts-enabled").show();
			$("input[name='general-settings[load_google_fonts]']").prop("checked",true);
			$("input[name='general-settings[is_select_google_fonts]']").val("1");
		}else{
			$(".load-google-fonts-enabled").hide();
			$("input[name='general-settings[is_select_google_fonts]']").val("0");
		}
    } );


    
	$(document).on("click","#mystickyelement-disable-loadfonts",function(){
		$("input[name='general-settings[load_google_fonts]']").prop('checked',false);
		$("#myStickyelements-load-google-fonts-enable").removeAttr('checked');
		$("#mystickyelements-load-google-enable-popup").hide();
		$("#mystickyelement-load-google-popup-overlay").hide();
	});
	
	$(document).on("click","#mystickyelement-button-keep-loadfonts",function(){
		$("input[name='general-settings[load_google_fonts]']").prop('checked',true);
		$("#mystickyelements-load-google-enable-popup").hide();
		$("#mystickyelement-load-google-popup-overlay").hide();
	});
	
	$(document).on("change","input[name='general-settings[load_google_fonts]']",function(){
		if(!$(this).prop('checked')){
			$("#mystickyelements-load-google-enable-popup").show();
			$("#mystickyelement-load-google-popup-overlay").show();
			$(this).prop('checked',false)
		}else{
			$(this).prop('checked',true)
		}
	});
	
	$(document).on("click","#mystickyelement-load-google-popup-overlay",function(){
		$("#mystickyelements-load-google-enable-popup").hide();
		$("#mystickyelement-load-google-popup-overlay").hide();
		$("input[name='general-settings[load_google_fonts]']").prop('checked',true);
	});
    
    function mystickyelements_disable_section( parent_class, enable_class ){
        
        
        if ( $( '#' + enable_class ).prop("checked") != true ) {
            
            $( '#' + parent_class + ' .mystickyelements-disable-wrap' ).addClass( 'mystickyelements-disable' );
            $( '#' + parent_class + ' .mystickyelements-disable .myStickyelements-social-channels-info' ).hide();
            $( '#' + parent_class + ' .mystickyelements-disable-content-wrap' ).show();
        } else {
            
            $( '#' + parent_class + ' .mystickyelements-disable-wrap' ).removeClass( 'mystickyelements-disable' );
            $( '#' + parent_class + ' .mystickyelements-disable-wrap .myStickyelements-social-channels-info' ).show();
            $( '#' + parent_class + ' .mystickyelements-disable-content-wrap' ).hide();
        }
    }
    function mystickyelements_border_radius(){
        var position_device = '';
        var social_id = '';
        var $i = 0;
        var second_social_id = '';
        var $flg = false;

        if( $(".myStickyelements-preview-screen" ).hasClass( "myStickyelements-preview-mobile-screen" ) ){
            position_device = 'mobile-';
        }
        var $mobile_bottom = 0;
        $('.mystickyelements-fixed ul li').each( function () {
            $('.mystickyelements-position-' + position_device + 'left #' + $(this).attr('id') + ' .mystickyelements-social-icon').css('border-radius','');
            $('.mystickyelements-position-' + position_device + 'right #' + $(this).attr('id') + ' .mystickyelements-social-icon').css('border-radius','');
            $('.mystickyelements-position-' + position_device + 'bottom #' + $(this).attr('id') + ' .mystickyelements-social-icon').css('border-radius','');

            /* Check First LI */
            if ( $i == 1 ){
                if ( !$(".myStickyelements-preview-screen" ).hasClass( "myStickyelements-preview-mobile-screen" ) &&  !$(this).hasClass('element-desktop-on')){
                    $flg = true;
                }
                if ( $(".myStickyelements-preview-screen" ).hasClass( "myStickyelements-preview-mobile-screen" ) &&  !$(this).hasClass('element-mobile-on')){
                    $flg = true;
                }
            }
            if ( $i == 2 && $flg === true) {
                if ( !$(".myStickyelements-preview-screen" ).hasClass( "myStickyelements-preview-mobile-screen" ) ){
                    second_social_id = $(this).attr('id');
                }
                if ( $(".myStickyelements-preview-screen" ).hasClass( "myStickyelements-preview-mobile-screen" ) ){
                    second_social_id = $(this).attr('id');
                }
            }
            if ( !$(".myStickyelements-preview-screen" ).hasClass( "myStickyelements-preview-mobile-screen" ) &&  $(this).hasClass('element-desktop-on')){
                social_id = $(this).attr('id');
            }
            if ( $(".myStickyelements-preview-screen" ).hasClass( "myStickyelements-preview-mobile-screen" ) &&  $(this).hasClass('element-mobile-on')){
                social_id = $(this).attr('id');
                $mobile_bottom++;
            }
            $i++;
        });
        $(".myStickyelements-preview-tab .mystickyelements-fixed").removeClass (function (index, className) {
            return (className.match (/(^|\s)mystickyelements-bottom-social-channel-\S+/g) || []).join(' ');
        });
        $(".myStickyelements-preview-tab .mystickyelements-fixed").removeClass (function (index, className) {
            return (className.match (/(^|\s)mystickyelements-top-social-channel-\S+/g) || []).join(' ');
        });
        $( '.mystickyelements-fixed.mystickyelements-position-mobile-bottom').addClass( 'mystickyelements-bottom-social-channel-' + $mobile_bottom );
        $( '.mystickyelements-fixed.mystickyelements-position-mobile-top').addClass( 'mystickyelements-top-social-channel-' + $mobile_bottom );
        if ( social_id != ''  ) {
            $('.mystickyelements-fixed').show();
            if ( social_id === 'myStickyelements-preview-contact' ){
                $('.mystickyelements-position-' + position_device + 'left #' + social_id + ' .mystickyelements-social-icon').css('border-bottom-left-radius', '10px' );
                $('.mystickyelements-position-' + position_device + 'right #' + social_id + ' .mystickyelements-social-icon').css('border-top-left-radius', '10px' );
                $('.mystickyelements-position-' + position_device + 'bottom #' + social_id + ' .mystickyelements-social-icon').css('border-top-right-radius', '10px' );

                if( $( 'li.mystickyelements-minimize' ).length !== 1 ){
                    $('.mystickyelements-position-' + position_device + 'left #' + social_id + ' .mystickyelements-social-icon').css('border-bottom-right-radius', '10px' );
                    $('.mystickyelements-position-' + position_device + 'right #' + social_id + ' .mystickyelements-social-icon').css('border-top-right-radius', '10px' );
                }
            } else if ( social_id !== 'myStickyelements-preview-contact') {
                if ( $i=== 1 ) {
                    $('.mystickyelements-position-' + position_device + 'left #' + social_id + ' .mystickyelements-social-icon').css('border-radius', '0 10px 10px 0' );
                    $('.mystickyelements-position' + position_device + '-right #' + social_id + ' .mystickyelements-social-icon').css('border-radius', '10px 0 0 10px' );
                } else {
                    $('.mystickyelements-position-' + position_device + 'left #' + social_id + ' .mystickyelements-social-icon').css( 'border-bottom-right-radius', '10px' );
                    $('.mystickyelements-position-' + position_device + 'right #' + social_id + ' .mystickyelements-social-icon').css( 'border-bottom-left-radius', '10px' );
                    $('.mystickyelements-position-' + position_device + 'bottom #' + social_id + ' .mystickyelements-social-icon').css( 'border-top-right-radius', '10px' );
                }
            }
        } else {
            $('.mystickyelement-credit').hide();
            $('.mystickyelements-fixed').hide();
        }
        if ( second_social_id != '' && second_social_id !== 'myStickyelements-preview-contact' && $( 'li.mystickyelements-minimize' ).length !== 1  ) {
            $('.mystickyelements-position-' + position_device + 'left #' + second_social_id + ' .mystickyelements-social-icon').css('border-top-right-radius', '10px' );
            $('.mystickyelements-position-' + position_device + 'right #' + second_social_id + ' .mystickyelements-social-icon').css('border-top-left-radius', '10px' );
            $('.mystickyelements-position-' + position_device + 'bottom #' + second_social_id + ' .mystickyelements-social-icon').css('border-top-left-radius', '10px' );
        }
    }
    
    /* mysticky tab click */
        
    $(document).ready(function(){
        jQuery( '#mystickyelements-contact-form,#mystickyelements-social-media, #mystickyelements-display-settings' ).on( 'click', function(e) {
            e.preventDefault();
            var curent_tab = $('.mystickyelements-tab.active').data( 'tab-id');
            var next_tab = $(this).data( 'tab-id');
            var widget_status = $('.mystickyelements-preivew-below-sec').data('id');
            if ( curent_tab == next_tab) {
                return false;
            }
            
            if( widget_status == 0 && next_tab=='mystickyelements-tab-display-settings' ){
                if ( $( '#myStickyelements-social-channels-enabled' ).prop("checked") == true ) {
                    var is_links_empty = 0;
                    jQuery('.mystickyelement-social-links-input').each(function(index, value) {
                        if( jQuery(this).val() == '' ){
                            is_links_empty = 1;
                            return; 
                        }
                    });
                }
                
                if( is_links_empty == 1 && jQuery(this).data("tab-triger") != "yes"){
                    if ( $( '#myStickyelements-social-channels-enabled' ).prop("checked") == true ) {
                        jQuery('.mystickyelements-missing-link-popup, #mystickyelement-missing-link-overlay').show();
                        jQuery('.mystickyelement-dolater-widget-btn').attr('data-popupfrom', 'tab_button');
                    }
                    
                    return false;   
                }
            
                $('#btn-next').hide();
                $('#next-button-prev').hide();
                $('#submit').show();
                $('.preview-publish').show();
                $('.preview-publish').html( 'Publish' );
                $('.preview-publish').val('Publish');
                $('#save_view').show();
                $('.save-button').show();
                $( '#mystickyelements-contact-form').addClass('completed');
                $( '#mystickyelements-social-media').addClass('completed');
            }
            else if( widget_status == 0 &&  next_tab != 'mystickyelements-tab-display-settings' ){
                $('#btn-next').show();
                $('#next-button-prev').show();
                $('#submit').hide();
                $('.preview-publish').hide();
                $('.preview-publish').html( 'Save' );
                $('.preview-publish').val('Save');
                $('#save_view').hide();
                $('.save-button').hide();
                if( next_tab=='mystickyelements-tab-social-media' ) {
                    $( '#mystickyelements-contact-form').addClass('completed');
                    $( '#mystickyelements-social-media').removeClass('completed');
                } else if( next_tab=='mystickyelements-tab-contact-form' ) {
                    $( '#mystickyelements-contact-form').removeClass('completed');
                    $( '#mystickyelements-social-media').removeClass('completed');
                }
            }
            else if( widget_status==1 && next_tab == 'mystickyelements-tab-display-settings' ){
                if ( $( '#myStickyelements-social-channels-enabled' ).prop("checked") == true ) {
                    var is_links_empty = 0;
                    jQuery('.mystickyelement-social-links-input').each(function(index, value) {
                        if( jQuery(this).val() == '' ){
                            
                            is_links_empty = 1;
                            return; 
                        }
                    });
                }
                
                if( is_links_empty == 1 && jQuery(this).data("tab-triger") != "yes"){
                    if ( $( '#myStickyelements-social-channels-enabled' ).prop("checked") == true ) {
                        jQuery('.mystickyelements-missing-link-popup, #mystickyelement-missing-link-overlay').show();
                        jQuery('.mystickyelement-dolater-widget-btn').attr('data-popupfrom', 'tab_button');
                    }
                    return false;   
                }
                
                $('#btn-next').hide();
                $('#next-button-prev').hide();
                $('#submit').show();
                $('.preview-publish').show();
                $('.preview-publish').html( 'Publish' );
                $('.preview-publish').val('Publish');
                $('#save_view').show();
                $('.save-button').show();
                $( '#mystickyelements-contact-form').addClass('completed');
                $( '#mystickyelements-social-media').addClass('completed');
            }
            else{
                $('#btn-next').show();
                $('#next-button-prev').show();
                $('#submit').hide();
                $('.preview-publish').show();
                $('.preview-publish').html( 'Save' );
                $('.preview-publish').val('Save');
                $('#save_view').show();
                $('.save-button').show();
                if( next_tab=='mystickyelements-tab-social-media' ) {
                    $( '#mystickyelements-contact-form').addClass('completed');
                    $( '#mystickyelements-social-media').removeClass('completed');
                } else if( next_tab=='mystickyelements-tab-contact-form' ) {
                    $( '#mystickyelements-contact-form').removeClass('completed');
                    $( '#mystickyelements-social-media').removeClass('completed');
                }
            }
            
            if( next_tab=='mystickyelements-tab-contact-form' ){
                $('#btn-prev').hide();
            }else{
                $('#btn-prev').show();
            }
            
            $( '.mystickyelements-tab').removeClass( 'active');
            $(this).addClass('active');
            $( '#' + next_tab).show();
            $( '#' + curent_tab).hide();
            
        });
        
        mystickyelements_disable_section( 'mystickyelements-tab-contact-form', 'myStickyelements-contact-form-enabled' );
        
        $('#btn-more').on('click',function(event){
            event.preventDefault();
            $('.more-setting-rows').slideDown();    
            $('#btn-less').show();
            $(this).hide();
        });
        
        $('#btn-less').on('click',function(event){
            event.preventDefault();
            $('.more-setting-rows').hide(); 
            $('#btn-more').show();
            $(this).hide();
        });

        $( '#btn-prev' ).on( 'click' , function( event ){
            
            event.preventDefault();
            var curent_tab = $( '.mystickyelements-tab.active' ).data( 'tab-id');
            var next_tab = '';
            var widget_status = $('.mystickyelements-preivew-below-sec').data('id');
            
            $( '.mystickyelements-tab' ).removeClass( 'active' );
            if( curent_tab == 'mystickyelements-tab-display-settings' ){
                next_tab = 'mystickyelements-tab-social-media';
                $( '#mystickyelements-social-media' ).addClass( 'active' );
                $( '#mystickyelements-social-media').removeClass('completed');
                $( '#submit').hide();
                $( this ).show();
                $('.preview-publish').html( 'Save' );
                $('.preview-publish').val('Save');
                $( '#next-button-prev' ).show();
                $( '#btn-next' ).show();
            }
            else if(curent_tab == 'mystickyelements-tab-social-media'){
                next_tab = 'mystickyelements-tab-contact-form';
                $('.preview-publish').html( 'Save' );
                $('.preview-publish').val('Save');
                $( '#mystickyelements-contact-form').addClass('active');
                $( '#mystickyelements-contact-form').removeClass('completed');
                $(this).hide();
            }
            
            if( widget_status == 0 && curent_tab == 'mystickyelements-tab-display-settings' ){
                $('.preview-publish').hide();
                $('#save_view').hide();
                $('.save-button').hide();
            }
            else if( widget_status == 0 && curent_tab == 'mystickyelements-tab-social-media' ){
                $('.preview-publish').hide();
                $('#save_view').hide();
                $('.save-button').hide();
            }
            
            if ( curent_tab == next_tab) {
                return false;
            }
            $( '#' + next_tab).show();
            $( '#' + curent_tab).hide();
            
            $("html, body").animate({ scrollTop: 0 }, "slow");
        });
        
        $( '#btn-next' ).on( 'click' , function(event){
            event.preventDefault();
            var curent_tab = $('.mystickyelements-tab.active').data( 'tab-id');
            var next_tab = '';
            var widget_status = $('.mystickyelements-preivew-below-sec').data('id');
            
            
            $( '.mystickyelements-tab').removeClass( 'active');
            if(curent_tab == 'mystickyelements-tab-contact-form'){
                next_tab = 'mystickyelements-tab-social-media';
                $( '#mystickyelements-social-media').addClass('active');
                $( '#mystickyelements-contact-form').addClass('completed');
                $('#submit').hide();
                $(this).show();
                $('#next-button-prev').show();
                $( '#btn-prev' ).show();
                $('.preview-publish').show();
                $('.preview-publish').html( 'Save' );
                $('.preview-publish').val('Save');
                $('#save_view').show();
                $('.save-button').show();
                
                if( widget_status == 0 ){
                    $('.preview-publish').hide();
                    $('#save_view').hide();
                    $('.save-button').hide();
                }
            }else if(curent_tab == 'mystickyelements-tab-social-media'){
                if ( $( '#myStickyelements-social-channels-enabled' ).prop("checked") == true ) {
                    var is_links_empty = 0;
                    jQuery('.mystickyelement-social-links-input').each(function(index, value) {
                        if( jQuery(this).val() == '' ){
                            is_links_empty = 1;
                            return; 
                        }
                    });
                }
                
                if( is_links_empty == 1 && jQuery(this).data("tab-triger") != "yes" ){
                    jQuery('.mystickyelement-dolater-widget-btn').attr('data-popupfrom', 'next_button');
                    if ( $( '#myStickyelements-social-channels-enabled' ).prop("checked") == true ) {
                        jQuery('.mystickyelements-missing-link-popup, #mystickyelement-missing-link-overlay').show();
                    }
                    $( '#mystickyelements-social-media').addClass('active');
                    $( '#mystickyelements-contact-form').addClass('completed');
                    return false;
                }
                else{
                    next_tab = 'mystickyelements-tab-display-settings';
                    $( '#mystickyelements-display-settings').addClass('active');
                    $( '#mystickyelements-contact-form').addClass('completed');
                    $( '#mystickyelements-social-media').addClass('completed');
                    $(this).hide();
                    $('#next-button-prev').hide();
                    $('#submit').show();
                    $('.preview-publish').show();
                    $('.preview-publish').html( 'Publish' );
                    $('.preview-publish').val('Publish');
                    $('#save_view').show();
                    $('.save-button').show();
                }
            }
            
            if ( curent_tab == next_tab) {
                return false;
            }
            
            $( '#' + next_tab).show();
            $( '#' + curent_tab).hide();            
            
            $("html, body").animate({ scrollTop: 0 }, "slow");
        });     
        
        if ( $(".settings-save-toast").length !== 0) {
            setTimeout(function() { 
                $(".settings-save-toast").hide(); 
            }, 5000);               
        }
        
        $('#next-button-prev').on('click',function(event){
            event.preventDefault();
            
            var curent_tab = $('.mystickyelements-tab.active').data( 'tab-id');
            var next_tab = '';
            var widget_status = $('.mystickyelements-preivew-below-sec').data('id');
            
            $( '.mystickyelements-tab').removeClass( 'active');
            if(curent_tab == 'mystickyelements-tab-contact-form'){
                next_tab = 'mystickyelements-tab-social-media';
                 
                $( '#mystickyelements-social-media').addClass('active');
                $( '#mystickyelements-contact-form').addClass('completed');
                $('#submit').hide();
                $(this).show();
                $( '#btn-prev' ).show();
                $('.preview-publish').show();
                $('.preview-publish').html( 'Save' );
                $('.preview-publish').val('Save');
                $('#save_view').show();
                $('.save-button').show();
                
                if( widget_status == 0 && next_tab == 'mystickyelements-tab-social-media' ){
                    $('.preview-publish').hide();
                    $('#save_view').hide();
                    $('.save-button').hide();
                }
            }
            else if(curent_tab == 'mystickyelements-tab-social-media'){
                if ( $( '#myStickyelements-social-channels-enabled' ).prop("checked") == true ) {
                    var is_links_empty = 0;
                    jQuery('.mystickyelement-social-links-input').each(function(index, value) {
                        if( jQuery(this).val() == '' ){
                            is_links_empty = 1;
                            return; 
                        }
                    });
                }
                
                if( is_links_empty == 1 && jQuery(this).data("tab-triger") != "yes" ){
                    jQuery('.mystickyelement-dolater-widget-btn').attr('data-popupfrom', 'next_preview_button');
                    if ( $( '#myStickyelements-social-channels-enabled' ).prop("checked") == true ) {
                        jQuery('.mystickyelements-missing-link-popup, #mystickyelement-missing-link-overlay').show();
                    }
                    $( '#mystickyelements-social-media').addClass('active');
                    $( '#mystickyelements-contact-form').addClass('completed');
                    return false;
                }else{
                    next_tab = 'mystickyelements-tab-display-settings';
                    $( '#mystickyelements-display-settings').addClass('active');
                    $( '#mystickyelements-contact-form').addClass('completed');
                    $( '#mystickyelements-social-media').addClass('completed');
                    $(this).hide();
                    $('#btn-next').hide();
                    $('#submit').show();
                    $('.preview-publish').show();
                    $('.preview-publish').html( 'Publish' );
                    $('.preview-publish').val('Publish');
                    $('#save_view').show();
                    $('.save-button').show();
                }
            }
            if ( curent_tab == next_tab) {
                return false;
            }
            $( '#' + next_tab).show();
            $( '#' + curent_tab).hide();            
            $("html, body").animate({ scrollTop: 0 }, "slow");
            
        });
        
        $( '.dropdown-field-setting' ).on("click",function(){
            
            $('.contact-form-field-open.contact-form-setting-popup-open').css('display','block');
        });
        
        $('.stickyelement-action-popup').on('click',function(){
            var key_id =  $(this).data("id") 
            $('#stickyelement-action-popup-'+key_id).show();
            $('#mystickyelement-action-popup-overlay-'+key_id).show();
        });
        
        $(document).on( "click", ".mystickyelement-widgets-lists-enabled" , function(e){
            
            var widget_id = $(this).data('id');
            if( $(this).prop("checked") != true ){
                $('#widget-status-popup-' + widget_id).show();
                $('#mystickyelement-status-popup-overlay-' + widget_id).show();
            }else{
                var widget_status = 1;
                set_widget_status( widget_id, widget_status );
            }
        });

        $(document).on( 'click', '.btn-disable-cancel' , function(e){
            var widget_id = $(this).data('id');
            var widget_status = 0;
            set_widget_status( widget_id, widget_status );
        } );
           
        $(document).on( 'click', '.mystickyelement-keep-widget-btn' , function() {
            var widget_id = $(this).data('id');
            var widget_status = 1;
            $('.mystickyelement-widgets-lists-enabled').prop('checked', true);
            set_widget_status( widget_id, widget_status );
        });
        
        $(document).on('click','.button-contact-popup-keep',function(){
            var popup_from = 'contact-form';
            $(".turn-off-message").css('display','none');
            $(".contact-form-description").css('display','block');
            $( '#myStickyelements-preview-contact' ).show();
            //$( '.myStickyelements-preview-ul' ).removeClass( 'remove-contact-field' );
            $( '.mystickyelements-contact-form' ).removeClass( 'mystickyelements-contact-form-hide' );
            $('#contactform-status-popup').hide();  
            $('#mystickyelement-contact-popup-overlay').hide();

            $('#myStickyelements-contact-form-enabled').prop('checked',true);
            var parent_class = 'mystickyelements-tab-contact-form';
            $( '#' + parent_class + ' .mystickyelements-disable-wrap' ).removeClass( 'mystickyelements-disable' );
            $( '#' + parent_class + ' .mystickyelements-disable-wrap .myStickyelements-social-channels-info' ).show();
            $( '#' + parent_class + ' .mystickyelements-disable-content-wrap' ).hide();
        });

        $('#mystickyelement-contact-popup-overlay').on('click',function(){
            
            $(".turn-off-message").css('display','none');
            $(".contact-form-description").css('display','block');
            $( '#myStickyelements-preview-contact' ).show();
            $( '.mystickyelements-contact-form' ).removeClass( 'mystickyelements-contact-form-hide' );
            $('#contactform-status-popup').hide();  
            $('#mystickyelement-contact-popup-overlay').hide();

            $('#myStickyelements-contact-form-enabled').prop('checked',true);
            var parent_class = 'mystickyelements-tab-contact-form';
            $( '#' + parent_class + ' .mystickyelements-disable-wrap' ).removeClass( 'mystickyelements-disable' );
            $( '#' + parent_class + ' .mystickyelements-disable-wrap .myStickyelements-social-channels-info' ).show();
            $( '#' + parent_class + ' .mystickyelements-disable-content-wrap' ).hide();
        });

        $(document).on('click','.close-dialog',function(){
            var widget_id = $(this).data('id');
            var popup_from = $(this).data('from');
            if( popup_from == 'widget-status' ){
                var widget_status = 1;
                $('.mystickyelement-widgets-lists-enabled').prop('checked', true);
                set_widget_status( widget_id, widget_status );
            }else if( popup_from == "widget-rename" ){
                $('#stickyelement-widget-rename-popup-' + widget_id).hide();
                $('#mystickyelement-rename-popup-overlay-' + widget_id).hide(); 
            }else if( popup_from == 'widget-social-link'){
                $('.mystickyelements-missing-link-popup').hide();
                $('#mystickyelement-missing-link-overlay').hide();  
            }else{
                $('#stickyelement-action-popup-' + widget_id).hide();
                $('#mystickyelement-action-popup-overlay-' + widget_id).hide();
            }

            if( popup_from == 'contact-form' ){
                $(".turn-off-message").css('display','none');
                $(".contact-form-description").css('display','block');
                $( '#myStickyelements-preview-contact' ).show();
                $( '.mystickyelements-contact-form' ).removeClass( 'mystickyelements-contact-form-hide' );
                $('#contactform-status-popup').hide();  
                $('#mystickyelement-contact-popup-overlay').hide();

                $('#myStickyelements-contact-form-enabled').prop('checked',true);
                var parent_class = 'mystickyelements-tab-contact-form';
                $( '#' + parent_class + ' .mystickyelements-disable-wrap' ).removeClass( 'mystickyelements-disable' );
                $( '#' + parent_class + ' .mystickyelements-disable-wrap .myStickyelements-social-channels-info' ).show();
                $( '#' + parent_class + ' .mystickyelements-disable-content-wrap' ).hide();
                
            }else if( popup_from == 'social-form' ){
                $('.social-disable-info').css('display','none');
                $('.mystickyelements-header-sub-title').css('display','block');

                $('#socialform-status-popup').hide();   
                $('#mystickyelement-social-popup-overlay').hide();
                
                $('#myStickyelements-social-channels-enabled').prop('checked',true);
                var parent_class = 'mystickyelements-tab-social-media';
                $( '#' + parent_class + ' .mystickyelements-disable-wrap' ).removeClass( 'mystickyelements-disable' );
                $( '#' + parent_class + ' .mystickyelements-disable-wrap .myStickyelements-social-channels-info' ).show();
                $( '#' + parent_class + ' .mystickyelements-disable-content-wrap' ).hide();

            }

            if( popup_from == 'sendleads-upgrade') {
                $( '.contactform-sendleads-upgrade-popup, #contactform_sendleads_popup_overlay' ).hide();
            }
            
            if( popup_from == 'intro-popup'){
                myStickyelements_intro_popup_close();
            }
        });
        
        $("#mystickyelement_intro_popup_overlay").on('click',function(){
            myStickyelements_intro_popup_close();
        });

        $('.button-social-popup-keep').on('click',function(){

            $('.social-disable-info').css('display','none');
            $('.mystickyelements-header-sub-title').css('display','block');

            $('#socialform-status-popup').hide();   
            $('#mystickyelement-social-popup-overlay').hide();
            
            $('#myStickyelements-social-channels-enabled').prop('checked',true);
            var parent_class = 'mystickyelements-tab-social-media';
            $( '#' + parent_class + ' .mystickyelements-disable-wrap' ).removeClass( 'mystickyelements-disable' );
            $( '#' + parent_class + ' .mystickyelements-disable-wrap .myStickyelements-social-channels-info' ).show();
            $( '#' + parent_class + ' .mystickyelements-disable-content-wrap' ).hide();
        });

        $('#mystickyelement-social-popup-overlay').on('click',function(){
            $('.social-disable-info').css('display','none');
            $('.mystickyelements-header-sub-title').css('display','block');

            $('#socialform-status-popup').hide();   
            $('#mystickyelement-social-popup-overlay').hide();
            
            $('#myStickyelements-social-channels-enabled').prop('checked',true);
            var parent_class = 'mystickyelements-tab-social-media';
            $( '#' + parent_class + ' .mystickyelements-disable-wrap' ).removeClass( 'mystickyelements-disable' );
            $( '#' + parent_class + ' .mystickyelements-disable-wrap .myStickyelements-social-channels-info' ).show();
            $( '#' + parent_class + ' .mystickyelements-disable-content-wrap' ).hide();

        });

        function set_widget_status( widget_id, widget_status ) {
            jQuery.ajax({
                url: ajaxurl,
                type:'post',
                data: 'action=mystickyelement_widget_status&widget_id='+widget_id+'&widget_status=' + widget_status +'&wpnonce=' + mystickyelements.ajax_nonce,
                success: function( data ){
                    $('#widget-status-popup-' + widget_id).hide();
                    $('#mystickyelement-status-popup-overlay-' + widget_id).hide();
                },
            });
        }
        
        $(document).on('click','.mystickyelement-delete-widget',function(){
            var widget_id = $(this).data('id');
            $('#dashboard_widget_id_' + widget_id).val(widget_id);
            $("#stickyelement-action-popup-" + widget_id).show();
            $('#mystickyelement-action-popup-overlay-'+widget_id).show();
        });
        $(document).on('click','.btn-cancel',function(){
            var widget_id = $(this).data('id');
            $('#stickyelement-action-popup-' + widget_id).hide();
            $('#mystickyelement-action-popup-overlay-'+widget_id).hide();
        });
        
        $(document).on( "click", ".mystickyelement-delete-widget-btn" , function(e){
            e.preventDefault();
            var widget_id = $(this).data('id');
            jQuery.ajax({
                url: ajaxurl,
                type:'post',
                data: 'action=mystickyelement_widget_delete&widget_id='+widget_id+'&widget_delete=1&wpnonce=' + mystickyelements.ajax_nonce,
                success: function( data ){  
                    
                    $( '#stickyelement-widget-' + widget_id ).remove();
                    setTimeout('location.reload()', 500);
                },
            });
        });

        $(document).on('click','.stickyelement-overlay',function(){
            $(this).hide();
            var widget_id = $(this).data('id');
            var widget_from = $(this).data('from');
            
            if( widget_from == 'widget-status' ){
                var widget_status = 1;
                $('.mystickyelement-widgets-lists-enabled').prop('checked', true);
                set_widget_status( widget_id, widget_status );
            }
            $('.mystickyelements-action-popup-open').hide();
        });
        $(document).on('click','.close_flash_popup',function(){        
            $('#flash_message').hide();            
        });
        
        jQuery(document).on('click','.mystickyelemt-rename-widget',function(){
            var id = $(this).data('id');
            $( '#stickyelement-widget-rename-popup-'+id ).show();
            $('#mystickyelement-rename-popup-overlay-' + id).show();
        });
        
        jQuery(document).on('click','.mystickyelement-btn-rename',function(e){
            e.preventDefault();
            var widget_id = $(this).data('id');
            var widget_rename_val = $('#widget_rename_'+widget_id).val();
            jQuery.ajax({
                url: ajaxurl,
                type:'post',
                data: 'action=mystickyelement_widget_rename&widget_id='+widget_id+'&widget_rename='+widget_rename_val+'&wpnonce=' + mystickyelements.ajax_nonce,
                success: function( data ){                  
                    $( '#stickyelement-widget-rename-popup-'+widget_id ).hide();
                    $('#mystickyelement-rename-popup-overlay-' + widget_id).hide();
                    location.reload();
                },
            });
        });

        jQuery(document).on('click','.mystickyelement-cancel-without-color-widget-btn',function(){
            var id = $(this).data('id');
            $( '#stickyelement-widget-rename-popup-'+id ).hide();
            $('#mystickyelement-rename-popup-overlay-' + id).hide();
        });
		
		$(document).on("click", ".remove-mse-js-script", function(e){
            e.preventDefault();			
            $(this).closest(".myStickyelements-inputs").find("input").val("");
            $(this).closest(".myStickyelements-inputs").find("input").removeClass("mse-js-error").removeClass("social-link-highlight");
            $(this).closest(".myStickyelements-inputs").find(".mse-error-message").remove();
            $(this).remove();
        });
        jQuery(document).on('click','.save-button, .btn-save-dropdown',function(e){
			 if (!mystickyelements.has_js_access) {
				var errorCount = 0;
				var errorCount = 0;
				$('.mystickyelement-social-links-input').removeClass("mse-js-error").removeClass("social-link-highlight");
				$('.mse-error-message').remove();
				$('.remove-mse-js-script').remove();
                $(".mystickyelement-social-links-input").each(function(){
                    if($.trim($(this).val()) != "") {
                        if(($.trim($(this).val()).toLowerCase()).indexOf("javascript") != -1 || ($.trim($(this).val()).toLowerCase()).indexOf("<script") != -1) {
                            $("body, html").scrollTop(0);                            
                            $(this).addClass("mse-js-error social-link-highlight");
                            $(this).after("<span class='mse-error-message'>"+mystickyelements.js_message+"</span><a href='#' class='remove-mse-js-script'>"+mystickyelements.remove+"</a>")
                            errorCount++;
                        }
                    }
                });
				if(errorCount != 0) {
					$('#mystickyelements-social-media').trigger('click');
					$(".mse-js-error.social-link-highlight:first").focus();
					return false;
				}
			}
           
			
            var popup_from = jQuery(this).data('popupfrom');
            if ( $( '#myStickyelements-social-channels-enabled' ).prop("checked") == true ) {
                var is_links_empty = 0;
                jQuery('.mystickyelement-social-links-input').each(function(index, value) {
                    if( jQuery(this).val() == '' ){
                        is_links_empty = 1;
                        return; 
                    }
                });
                if( is_links_empty == 1 && jQuery(this).data("tab-triger") != "yes"){
                    jQuery('.mystickyelements-missing-link-popup, #mystickyelement-missing-link-overlay').show();
                    jQuery('.mystickyelement-dolater-widget-btn').attr('data-popupfrom', 'save_button');
                    return false;   
                }
            }
            
            var curent_tab = $('.mystickyelements-tab.active').data( 'tab-id');
            if( curent_tab == 'mystickyelements-tab-social-media' )
                 $('#hide_tab_index').val('mystickyelements-social-media');     
            else if( curent_tab == 'mystickyelements-tab-display-settings' )
                 $('#hide_tab_index').val('mystickyelements-display-settings');             
            else
                 $('#hide_tab_index').val('mystickyelements-contact-form');                 
        });
        
        jQuery(document).on('click','#save_view',function(){
			if (!mystickyelements.has_js_access) {
				var errorCount = 0;
				var errorCount = 0;
				$('.mystickyelement-social-links-input').removeClass("mse-js-error").removeClass("social-link-highlight");
				$('.mse-error-message').remove();
				$('.remove-mse-js-script').remove();
                $(".mystickyelement-social-links-input").each(function(){
                    if($.trim($(this).val()) != "") {
                        if(($.trim($(this).val()).toLowerCase()).indexOf("javascript") != -1 || ($.trim($(this).val()).toLowerCase()).indexOf("<script") != -1) {
                            $("body, html").scrollTop(0);                            
                            $(this).addClass("mse-js-error social-link-highlight");
                            $(this).after("<span class='mse-error-message'>"+mystickyelements.js_message+"</span><a href='#' class='remove-mse-js-script'>"+mystickyelements.remove+"</a>")
                            errorCount++;
                        }
                    }
                });
				if(errorCount != 0) {
					$('#mystickyelements-social-media').trigger('click');
					$(".mse-js-error.social-link-highlight:first").focus();
					return false;
				}
			}
			if ( $( '#myStickyelements-social-channels-enabled' ).prop("checked") == true ) {
				var is_links_empty = 0;
				jQuery('.mystickyelement-social-links-input').each(function(index, value) {
					if( jQuery(this).val() == '' ){
						is_links_empty = 1;
						return; 
					}
				});
			}
			
			if( is_links_empty == 1 && jQuery(this).data("tab-triger") != "yes"){
				if ( $( '#myStickyelements-social-channels-enabled' ).prop("checked") == true ) {
					jQuery('.mystickyelements-missing-link-popup, #mystickyelement-missing-link-overlay').show();
					jQuery('.mystickyelement-dolater-widget-btn').attr('data-popupfrom', 'save_dashboard_button');
				}
				return false;   
			}
			else{
				var curent_tab = $('.mystickyelements-tab.active').data( 'tab-id');
				if( curent_tab == 'mystickyelements-tab-social-media' )
					 $('#hide_tab_index').val('mystickyelements-social-media');     
				else if( curent_tab == 'mystickyelements-tab-display-settings' )
					 $('#hide_tab_index').val('mystickyelements-display-settings');             
				else
					 $('#hide_tab_index').val('mystickyelements-contact-form'); 
			}
			
		});
    
        jQuery(document).on('click','.preview-publish',function(e){
			
			if (!mystickyelements.has_js_access) {
				var errorCount = 0;
				var errorCount = 0;
				$('.mystickyelement-social-links-input').removeClass("mse-js-error").removeClass("social-link-highlight");
				$('.mse-error-message').remove();
				$('.remove-mse-js-script').remove();
                $(".mystickyelement-social-links-input").each(function(){
                    if($.trim($(this).val()) != "") {
                        if(($.trim($(this).val()).toLowerCase()).indexOf("javascript") != -1 || ($.trim($(this).val()).toLowerCase()).indexOf("<script") != -1) {
                            $("body, html").scrollTop(0);                            
                            $(this).addClass("mse-js-error social-link-highlight");
                            $(this).after("<span class='mse-error-message'>"+mystickyelements.js_message+"</span><a href='#' class='remove-mse-js-script'>"+mystickyelements.remove+"</a>")
                            errorCount++;
                        }
                    }
                });
				if(errorCount != 0) {
					$('#mystickyelements-social-media').trigger('click');
					$(".mse-js-error.social-link-highlight:first").focus();
					return false;
				}
			}
            if(jQuery(this).val() != 'Publish' ){
                var popup_from = jQuery(this).data('popupfrom');
                if ( $( '#myStickyelements-social-channels-enabled' ).prop("checked") == true ) {
                    var is_links_empty = 0;
                    jQuery('.mystickyelement-social-links-input').each(function(index, value) {
                        if( jQuery(this).val() == '' ){
                            is_links_empty = 1;
                            return; 
                        }
                    });
                    if( is_links_empty == 1 && jQuery(this).data("tab-triger") != "yes"){
                        jQuery('.mystickyelements-missing-link-popup, #mystickyelement-missing-link-overlay').show();
                        jQuery('.mystickyelement-dolater-widget-btn').attr('data-popupfrom', 'publish_button');
                        return false;   
                    }
                }
                var curent_tab = $('.mystickyelements-tab.active').data( 'tab-id');
                if( curent_tab == 'mystickyelements-tab-social-media' )
                     $('#hide_tab_index').val('mystickyelements-social-media');     
                else if( curent_tab == 'mystickyelements-tab-display-settings' )
                     $('#hide_tab_index').val('mystickyelements-display-settings');             
                else
                     $('#hide_tab_index').val('mystickyelements-contact-form');                 
            }
        });
        
        if( $('#mystickyelements-contact-form').data('tab-index') == 'mystickyelements-contact-form' ){
            $( '#mystickyelements-contact-form' ).trigger( 'click');
        }
        else if($('#mystickyelements-social-media').data('tab-index') == 'mystickyelements-social-media' ){
            $( '#mystickyelements-social-media' ).trigger( 'click');
        }
        else{
            jQuery('#mystickyelements-display-settings').attr('data-tab-triger','yes');
            $( '#mystickyelements-display-settings' ).trigger( 'click');    
        }
    });
    var plus_cnt=0;
    jQuery(document).on('keypress','.mystickyelement-social-text-input',function(event){
        var key = event.which;
        var inputNumber = jQuery(this).val();
        if(jQuery(this).val()=='')
            plus_cnt=0;
        
        if(key == 43)
            plus_cnt++; 
        
        if(!( (key == 43 && plus_cnt < 2) || key >= 48 && key <= 57)){
            event.preventDefault();
            return;
        }
    });
    
    jQuery(document).on('change','#send_leads_mail,#send_leads_mailchimp,#send_leads_mailpoet',function(){
        var url = jQuery(this).data('url'); 
        window.open(url, '_blank');
        jQuery(this).prop('checked', false);
    });
    
    jQuery(document).on('click','.mystickyelement-goto-button',function(){
        myStickyelements_intro_popup_close();
    });
    
    
    jQuery(document).on('click','.mystickyelement-dolater-widget-btn',function(){
        var popup_from = jQuery(this).data('popupfrom');
        jQuery('.mystickyelements-missing-link-popup, #mystickyelement-missing-link-overlay').hide();
        jQuery('#btn-next').attr('data-tab-triger', 'yes');
        jQuery('#mystickyelements-display-settings').attr('data-tab-triger', 'yes');
        jQuery('.preview-publish').attr('data-tab-triger', 'yes');
        jQuery('.save-button').attr('data-tab-triger', 'yes');
        jQuery('#save_view').attr('data-tab-triger', 'yes');
        jQuery('#next-button-prev').attr('data-tab-triger', 'yes');
        
        if( popup_from == 'tab_button' ){
            jQuery('#mystickyelements-display-settings').trigger("click");
        }
        else if( popup_from == 'next_button' ) {
            jQuery('#btn-next').trigger("click");
        }
        else if( popup_from == 'publish_button' ){
            jQuery('.preview-publish').trigger("click");
        }
        else if( popup_from == 'save_button'){
            jQuery('.save-button').trigger("click");
        }
        else if(popup_from == 'save_dashboard_button'){
            jQuery('#save_view').trigger("click");
        }
        else{
            jQuery('#next-button-prev').trigger("click");
        }
    });
    
    jQuery(document).on('click','.mystickyelement-btn-ok',function(e){
        e.preventDefault();
        jQuery('.mystickyelement-social-links-input').each(function(index, value) {
            if( jQuery(this).val() == '' ){
                jQuery('#mystickyelements-social-media').trigger('click');
                jQuery(this).addClass("social-link-highlight").focus();
            }
        });
        jQuery( '.mystickyelements-missing-link-popup, #mystickyelement-missing-link-overlay' ).hide();
        return false;
    });
    
    function myStickyelements_intro_popup_close(){
        var nonceVal = jQuery("#myStickyelements_update_popup_status").val();
        $( "#myStickyelements-intro-popup" ).dialog('close');
        jQuery.ajax({
            url: ajaxurl,
            type:'post',
            data: {
                action: 'myStickyelements_intro_popup_action',
                nonce: nonceVal
            },
            success: function( data ){
                jQuery('.mystickyelements-intro-popup').hide();
                jQuery('#mystickyelement_intro_popup_overlay').hide();
            },
        });
    }
    
    jQuery(document).on("change","input[type='radio'][name='general-settings[open_tabs_when]']",function(){
        if( $(this).val() == 'click'  ){
            $('#mystickyelements-tab-hover-bebahvior').hide();
            $('#mystickyelements-tab-flyout').show();
        }else{
            $('#mystickyelements-tab-hover-bebahvior').show();
            $('#mystickyelements-tab-flyout').hide();
        }
    });
	
	jQuery( document ).on( 'click' , '#doaction' , function(e){
		e.preventDefault();
		var bulkOption = $('#bulk-action-selector-top').val();
		var bulks = [];
		jQuery( '.cb-select-blk' ).each( function(){
			if (this.checked) {
				bulks.push( jQuery(this).val() );
			}
			
		} ); 

		jQuery.ajax({
			type: 'POST',
			url: ajaxurl,
			data: {"action": "my_sticky_elements_bulks","bulks": bulks,"wpnonce": mystickyelements.ajax_nonce},
			success: function(data){
				location.href = window.location.href;

			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				alert("Status: " + textStatus); alert("Error: " + errorThrown);
			}
		});
	} );
    
	jQuery(document).on("click","#close-first-popup",function(){
		jQuery(".first-widget-popup").hide();
		jQuery(".stickyelement-overlay").hide();
	});
	
	jQuery(document).on("click",".ui-widget-overlay.ui-front",function(){
		$("button.gray-btn.ui-button.ui-corner-all.ui-widget").trigger("click");
	});
	
	
	//rating popup 
	$(document).on("keyup", "#upgrade-review-comment", function(){
		var commentLength = 1000 - parseInt($.trim($(this).val()).length);
		if(commentLength < 0) {
			var userComment = $.trim($(this).val());
			userComment = userComment.slice(0, 1000);
			$(".upgrade-review-textarea label span").text(0);
			$(this).val(userComment);
		} else {
			$(".upgrade-review-textarea label span").text(commentLength);
		}
	});

	$(document).on("change", "#upgrade-review-comment", function(){
		var commentLength = 1000 - parseInt($.trim($(this).val()).length);
		if(commentLength < 0) {
			var userComment = $.trim($(this).val());
			userComment = userComment.slice(0, 1000);
			$(".upgrade-review-textarea label span").text(0);
			$(this).val(userComment);
		} else {
			$(".upgrade-review-textarea label span").text(commentLength);
		}
	});
	
	$(document).ready(
        function () {		
		if( $("#mystickyelement-rating").length != 0 ) {
			$("#rating-modal-popup").show();
			$("#mystickyelement-rating").starRating({
				initialRating   : 0,
				useFullStars    : true,
				strokeColor     : '#FDB10C',
				ratedColor      : '#FDB10C',
				activeColor     : '#FDB10C',
				strokeWidth     : 0,
				minRating       : 1,
				starSize        : 32,
				useGradient     : 0,
				onHover: function(currentRate) {
					$(".upgrade-user-rating span").text(currentRate+"/5");
					$(".upgrade-user-rating" ).css('visibility', 'visible');
				},
				onLeave:  function(currentRate) {
					$(".upgrade-user-rating" ).css('visibility', 'hidden');
				},				
				callback( currentRate ) {
					console.log(currentRate);
					if( currentRate !== 5 ) {
						$(".rating-modal-steps").removeClass("active");
						$(".rating-modal-steps#step-2").addClass("active");
						$("#mystickyelement-rated-rating").html("");
						for(let i=0 ; i< parseInt(currentRate); i++) {
							var ratingStar = '<div class="jq-star"><svg shape-rendering="geometricPrecision" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="305px" height="305px" viewBox="60 -62 309 309" style="enable-background:new 64 -59 305 305; stroke-width:0px;" xml:space="preserve"> <polygon data-side="center" className="svg-empty-28" points="281.1,129.8 364,55.7 255.5,46.8 214,-59 172.5,46.8 64,55.4 146.8,129.7 121.1,241 212.9,181.1 213.9,181 306.5,241 " style="fill: transparent; stroke: #ffa83e;"></polygon> <polygon data-side="left" className="svg-empty-28" points="281.1,129.8 364,55.7 255.5,46.8 214,-59 172.5,46.8 64,55.4 146.8,129.7 121.1,241 213.9,181.1 213.9,181 306.5,241 " style="stroke-opacity: 0;"></polygon> <polygon data-side="right" className="svg-empty-28" points="364,55.7 255.5,46.8 214,-59 213.9,181 306.5,241 281.1,129.8 " style="stroke-opacity: 0;"></polygon> </svg></div>';
							$("#mystickyelement-rated-rating").append(ratingStar);
						}
					} else {
						window.open("https://wordpress.org/support/plugin/mystickyelements/reviews/#new-post", '_blank');
						set_mystickyelement_review_reminder(-1);
					}
				}
			})
		}	

		$(document).on("click", ".close-popup-button a.hide-upgrade-modal", function(){
			if($(".rating-modal-steps#step-3").hasClass("active")) {
				set_mystickyelement_review_reminder(14);
			} else {
				$(".rating-modal-steps").removeClass("active");
				$(".rating-modal-steps#step-3").addClass("active");
			}
		});

		$(document).on("click", "#upgrade-review-button", function(){            
			$("#rating-modal-popup").hide();
			var review_reminder = ($('.upgrade-review-reminder').length >= 1) ? $('.upgrade-review-reminder').val(): "-1";		
			jQuery.ajax({
				type:'post',
				url: mystickyelements.ajaxurl,
				data: {
					action: "mystickyelements_review_box_message",
					rating: $("#mystickyelement-rated-rating .jq-star").length,
					nonce: mystickyelements.ajax_nonce,
					message: $.trim($("#upgrade-review-comment").val())
				},
				success: function() {				
					set_mystickyelement_review_reminder(review_reminder);
				}
			});
		});
		
		
		function set_mystickyelement_review_reminder(noOfDays) {		
			$.ajax({
				type: "post",
				url: mystickyelements.ajaxurl,
				data: {
					action: "mystickyelements_review_box",
					days: noOfDays,
					nonce: mystickyelements.ajax_nonce
				},
			   
				success: function() {
					
				}
			});
			$("#rating-modal-popup").remove();
		}
		
		$(document).on("click", ".mystickyelement-popup-form", function( e ){
			console.log(11);
			console.log(e.target);
			console.log($(e.target).attr('id'));
			
			if ( $(e.target).attr('id') == 'rating-modal-popup' ) {
				let step_id = $( '#rating-modal-popup .rating-modal-steps.active' ).attr( 'id') ;
				
				if ( step_id == 'step-1' ) {
					$(".rating-modal-steps").removeClass("active");
					$(".rating-modal-steps#step-3").addClass("active");
				}
				
				if ( step_id == 'step-3' ) {
					$('#upgrade-review-reminder option[value="-1"]').attr("selected", "selected");
					$( "#upgrade-review-button" ).trigger( 'click');
				}
			}
			
		});
		
	});
	
	
})( jQuery );