$(document).ready(function () {

    var domain = window.location.origin;

    $('#contact-form').on('submit', function (event) {
        event.preventDefault();
        
        const submitBtn = $(this).find('button[type="submit"]');
        submitBtn.prop('disabled', true).addClass('disabled');


        console.log("Form Submitted")

        const formData = {
            name: $('#name').val(),
            address: $('#address').val(),
            email: $('#email').val(),
            phone: $('#phone').val(),
            message: $('#message').val(),
            services: []
        };

        $('input[name="services[]"]:checked').each(function () {
            formData.services.push($(this).val());
        });

        if (validateForm(formData)) {

            console.log(formData);

            $.ajax({
                url: `${domain}/assets/php/submit_form_1.php`,
                type: 'POST',
                data: formData,
                dataType: 'json',
                success: function (response) {
                    console.log(response)
                    if (response.status == "success") {
                        showAlertMessage("Form submitted successfully!", "success")
                        $('#contact-form')[0].reset();
                    }
                    else {
                        showAlertMessage("Something went wrong. Please try again.", "error")
                    }
                    submitBtn.prop('disabled', false).removeClass('disabled');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    showAlertMessage("Something went wrong. Please try again.", "error");
                    submitBtn.prop('disabled', false).removeClass('disabled');
                }
            });
        }
    });

    function validateForm(data) {
        const submitBtn = $(this).find('button[type="submit"]');

        if (!data.name || !data.email || !data.phone || !data.message) {
            submitBtn.prop('disabled', false).removeClass('disabled');
            showAlertMessage("Please fill in all required fields.", "error");
            return false;
        }

        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(data.email)) {
            submitBtn.prop('disabled', false).removeClass('disabled');
            showAlertMessage("Please enter a valid email address.", "error");
            return false;
        }

        if (data.message.length > 500) {
            submitBtn.prop('disabled', false).removeClass('disabled');
            showAlertMessage("Message exceeds 500 characters.", "error");
            return false;
        }

        return true;
    }

    function showAlertMessage(message, status) {

        const element = $(".showMessage");
        element.empty();

        if (status == "error") {
            element.text(message);
            element.css({
                "color": "red",
            });
        }
        else if (status == "success") {
            element.text(message);
            element.css({
                "color": "green",
            });
        }
    }














    $('#schedule_btn_form').on('click', function (event) {
        event.preventDefault();
        const submitScheduleBtn = $("#schedule_btn_form");
        submitScheduleBtn.prop('disabled', true).addClass('disabled');

        const formData = {
            service: $('#schedule_service').val(),
            address: $('#schedule_address').val(),
            name: $('#schedule_name').val(),
            email: $('#schedule_email').val(),
            phone: $('#schedule_phone').val()
        };

        if (validateFormShedule(formData)) {

            console.log(formData);

            $.ajax({
                url: `${domain}/assets/php/submit_form_2.php`,
                type: 'POST',
                data: formData,
                dataType: 'json',
                success: function (response) {
                    console.log(response)
                    if (response.status == "success") {
                        showAlertMessageSchedule("Form submitted successfully!", "success")
                        // $('#schedule_service').val('')
                        $('#schedule_address').val('')
                        $('#schedule_name').val('')
                        $('#schedule_email').val('')
                        $('#schedule_phone').val('')
                    }
                    else {
                        showAlertMessageSchedule("Something went wrong. Please try again.", "error")
                    }
                    submitScheduleBtn.prop('disabled', false).removeClass('disabled');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    showAlertMessageSchedule("Something went wrong. Please try again.", "error")
                    submitScheduleBtn.prop('disabled', false).removeClass('disabled');
                }
            });
        }
    });

    function validateFormShedule(data) {
        const submitScheduleBtn = $("#schedule_btn_form");

        if (!data.service || !data.address || !data.name || !data.email || !data.phone) {
            submitScheduleBtn.prop('disabled', false).removeClass('disabled');
            showAlertMessageSchedule("Please fill in all required fields.", "error");
            return false;
        }

        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(data.email)) {
            submitScheduleBtn.prop('disabled', false).removeClass('disabled');
            showAlertMessageSchedule("Please enter a valid email address.", "error");
            return false;
        }

        return true;
    }

    function showAlertMessageSchedule(message, status) {

        const element = $(".schedule_message");
        element.empty();

        if (status == "error") {
            element.text(message);
            element.css({
                "color": "red",
            });
        }
        else if (status == "success") {
            element.text(message);
            element.css({
                "color": "green",
            });
        }
    }


})