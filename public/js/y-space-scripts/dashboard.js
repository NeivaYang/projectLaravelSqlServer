const YSpace = {
    init: () => {
        YSpace.setListeners();
        YSpace.setCharts();
    },

    setListeners: () => {
        $(document).on('click', '#button-advice', function(){
            $.ajax({
                url: 'https://api.adviceslip.com/advice',
                type: "GET",
                dataType: "json",
                beforeSend: function() {
                    $(".advice-text").fadeOut('slow');
                    $(".advice-text").html("");
                },
                success: function (data) {
                    console.log(data);
                    $(".advice-text").html(`
                    <em>"${data.slip.advice}"</em>
                    `);
                    $(".advice-text").fadeIn('slow');
                },
                error: function(xhr) {
                    console.log(xhr.responseText);
                    let response = JSON.parse(xhr.responseText);
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: response.message,
                    });
                    console.log(xhr.statusText);
                },
            });
        });

        // $(document).on('click', '.approve-bank-account', function(){
        //     let account_id = $(this).data('id');
        //     let url = "/y-space/bank-account-approve"

        //     Swal.fire({
        //         title: 'Tem certeza?',
        //         text: `Deseja aprovar essa conta?`,
        //         icon: 'warning',
        //         showCancelButton: true,
        //         confirmButtonText: 'Sim',
        //         cancelButtonText: 'Não',
        //         reverseButtons: true,
        //     }).then((result) => {
        //         if (result.isConfirmed) {
        //             $.ajax({
        //                 headers: {
        //                     'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        //                 },
        //                 url: url,
        //                 type: "POST",
        //                 data: {
        //                     account_id: account_id,
        //                 },
        //                 dataType: "json",
        //                 success: function (data) {
        //                     if (data.status == 'success') {
        //                         Swal.fire({
        //                             icon: 'success',
        //                             title: 'Sucesso!',
        //                             text: data.message,
        //                         }).then(() => {
        //                             YSpace.populateAccountTable();
        //                         });
        //                     } else {
        //                         Swal.fire({
        //                             icon: 'error',
        //                             title: 'Oops...',
        //                             text: data.message,
        //                         });
        //                     }
        //                 },
        //                 error: function(xhr) {
        //                     console.log(xhr.responseText);
        //                     let response = JSON.parse(xhr.responseText);
        //                     Swal.fire({
        //                         icon: 'error',
        //                         title: 'Oops...',
        //                         text: response.message,
        //                     });
        //                     console.log(xhr.statusText);
        //                 },
        //             });
        //         }
        //     });
        // });

        // $('#DisapproveForm').submit(function(e){
        //     e.preventDefault();

        //     let formData = new FormData($(this)[0]);

        //     $.ajax({
        //         url: '/y-space/bank-account-disapprove',
        //         type: "POST",
        //         data: formData,
        //         dataType: 'json',
        //         contentType: false,
        //         cache: false,
        //         processData: false,
        //         success: function (data) {
        //             if(data.status == 'success') {
        //                 Swal.fire({
        //                     icon: 'success',
        //                     title: 'Sucesso!',
        //                     text: data.message,
        //                 })
        //                 $('#ModalReprovarConta').modal('hide');
        //                 $('input[name="account_id_disapprove"]').val('');
        //                 $(this)[0].reset();
        //                 YSpace.populateAccountTable()
        //             } else {
        //                 Swal.fire({
        //                     icon: 'error',
        //                     title: 'Oops...',
        //                     text: data.message,
        //                 })
        //             }
        //         },
        //     });
        // });

        // $(document).on('click','.bank-account-details', function (e) {
        //     e.preventDefault();
        //     let account_id = $(this).data('id');

        //     $("#change-acc-details").data("id", account_id);

        //     $.ajax({
        //         url: '/y-space/get-bank-accounts-details/' + account_id,
        //         type: "GET",
        //         dataType: "json",
        //         processData: true,
        //         contentType: false,
        //         success: function (data) {
        //             console.log(data);
        //             $(".acc-details-json").html("");

        //             if (data.bank_account.status == 'pending' ){
        //                 $("#acc-details-status").html(`
        //                     <span class="badge badge-danger">Pendente</span>
        //                 `);
        //             } else if (data.bank_account.status == 'approved' ){
        //                 $("#acc-details-status").html(`
        //                     <span class="badge badge-success">Aprovado</span>
        //                 `);
        //             } else {
        //                 $("#acc-details-status").html(`
        //                     <span class="badge badge-danger">Reprovado</span>
        //                 `);
        //             }

        //             switch(data.bank_account.pix_type) {
        //                 case 'phone':
        //                     $("#acc-details-pix-type").html('Telefone');
        //                     break;
        //                 case 'cpf':
        //                     $("#acc-details-pix-type").html('CPF');
        //                     break;
        //                 case 'cnpj':
        //                     $("#acc-details-pix-type").html('CNPJ');
        //                     break;
        //                 case 'email':
        //                     $("#acc-details-pix-type").html('E-mail');
        //                     break;
        //                 case 'random':
        //                     $("#acc-details-pix-type").html('Aleatória');
        //                     break;
        //             };

        //             $("#acc-details-bank").html(data.bank_account.bank);
        //             $("#acc-details-agency").html(data.bank_account.agency);
        //             $("#acc-details-number").html(data.bank_account.number);
        //             $("#acc-details-type").html(data.bank_account.type == 'current' ? 'Corrente' : 'Poupança');
        //             $("#acc-details-pix-key").html(data.bank_account.pix_key);
        //             $("#change-acc-details").attr("data-id", account_id);

        //             if (!data.bank_account.disapproval_justification && data.bank_account.status != 'disapproved') {
        //                 $("#disapproval-justification-div").addClass("d-none");
        //                 $("disapproval-justification-i").html("");
        //             } else {
        //                 $("#disapproval-justification-div").removeClass("d-none");
        //                 $("#acc-details-justification").html("");
        //                 $("#acc-details-justification").html(data.bank_account.disapproval_justification);
        //             }
        //         },
        //         error: function(xhr) {
        //             console.log(xhr.responseText);
        //             let response = JSON.parse(xhr.responseText);
        //             Swal.fire({
        //                 icon: 'error',
        //                 title: 'Oops...',
        //                 text: response.message,
        //             });
        //             console.log(xhr.statusText);
        //         },
        //     });
        // });

        // $(document).on('submit', '#AddBankAccForm', function (e) {
        //     e.preventDefault();
        //     let formData = new FormData(this);

        //     $.ajax({
        //         url: $(this).attr('action'),
        //         type: "POST",
        //         data: formData,
        //         dataType: "json",
        //         processData: false,
        //         contentType: false,
        //         success: function (data) {
        //             if (data.status == 'success') {
        //                 Swal.fire({
        //                     icon: 'success',
        //                     title: 'Sucesso!',
        //                     text: data.message,
        //                 }).then((result) => {
        //                     if (result.isConfirmed) {
        //                         $('#AddBankAccForm')[0].reset();
        //                     }
        //                 });
        //             } else {
        //                 Swal.fire({
        //                     icon: 'error',
        //                     title: 'Oops...',
        //                     text: data.message,
        //                 });
        //             }
        //         },
        //         error: function(xhr) {
        //             console.log(xhr.responseText);
        //             let response = JSON.parse(xhr.responseText);
        //             Swal.fire({
        //                 icon: 'error',
        //                 title: 'Oops...',
        //                 text: response.message,
        //             });
        //             console.log(xhr.statusText);
        //         },
        //     });
        // });

        // $(document).on('click', '#change-acc-details', function (e) {
        //     e.preventDefault();
        //     let account_id = $(this).data('id');
        //     console.log("🚀 ~ file: y-space.js:261 ~ account_id:", account_id)

        //     $.ajax({
        //         url:'/y-space/get-bank-accounts-details/' + account_id,
        //         type: "GET",
        //         dataType: "json",
        //         processData: true,
        //         contentType: false,
        //         success: function (data) {
        //             let type = data.bank_account.type == 'current' ? 0 : 1;
        //             let pix_type;
        //             switch(data.bank_account.pix_type){
        //                 case 'phone':   
        //                     pix_type = 1;
        //                     break;
        //                 case 'cpf':
        //                     pix_type = 2;
        //                     break;
        //                 case 'cnpj':
        //                     pix_type = 3;
        //                     break;
        //                 case 'email':
        //                     pix_type = 4;
        //                     break;
        //                 default:
        //                     pix_type = 5;
        //                     break;
        //             };
        //             $("#bank-update option").each(function() {
        //                 if($(this).val() == data.bank_account.ispb) {
        //                     $(this).prop('selected', true);
        //                     $("#bank-update").val(data.bank_account.ispb);
        //                     $("#bank-update").trigger('change');
        //                 }
        //             })
        //             $("#select-bank-acc-type-update option").each(function() {
        //                 if($(this).val() == type) {
        //                     $(this).prop('selected', true);
        //                     $('#select-bank-acc-type-update').val(type);
        //                     $('#select-bank-acc-type-update').trigger('change');
        //                 }
        //             });
        //             $("#select-bank-pix-type-update option").each(function() {
        //                 if($(this).val() == pix_type) {
        //                     $(this).prop('selected', true);
        //                     $('#select-bank-pix-type-update').val(pix_type);
        //                     $('#select-bank-pix-type-update').trigger('change');
        //                 }
        //             });
        //             $("#agency-update").val(data.bank_account.agency);
        //             $("#number-update").val(data.bank_account.number);
        //             $("#digit-update").val(data.bank_account.digit);
        //             $("#pix-key-update").val(data.bank_account.pix_key);
        //             $("#account-id-update").val(account_id);
        //         },
        //         error: function(xhr) {
        //             console.log(xhr.responseText);
        //             console.log(xhr.statusText);
        //         },
        //     });
        // });

        // $(document).on('submit', '#UpdateBankAccForm', function (e) {
        //     e.preventDefault();

        //     let formData = new FormData($(this)[0]);

        //     $.ajax({
        //         headers: {
        //             'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        //         },
        //         url: '/y-space/update-bank-account',
        //         type: "POST",
        //         data: formData,
        //         dataType: 'json',
        //         contentType: false,
        //         cache: false,
        //         processData: false,
        //         success: function (data) {
        //             $(this)[0].reset();
        //             YSpace.populateAccountTable();
        //             if (data.status == 'success') {
        //                 Swal.fire({
        //                     icon: 'success',
        //                     title: 'Sucesso!',
        //                     text: data.message,
        //                 })
        //             } else {
        //                 Swal.fire({
        //                     icon: 'error',
        //                     title: 'Oops...',
        //                     text: data.message,
        //                 });
        //             }
        //         },
        //         error: function(xhr) {
        //             console.log(xhr.responseText);
        //             let response = JSON.parse(xhr.responseText);
        //             Swal.fire({
        //                 icon: 'error',
        //                 title: 'Oops...',
        //                 text: response.message,
        //             });
        //             console.log(xhr.statusText);
        //         },
        //     });
        // });

        // $(document).on('click', '.remove-bank-account', function (e) {
        //     let account_id = $(this).data('id');
        //     let csrf_token = $('meta[name="csrf-token"]').attr('content');

        //     Swal.fire({
        //         title: 'Tem certeza?',
        //         text: `Deseja remover essa conta?`,
        //         icon: 'warning',
        //         showCancelButton: true,
        //         confirmButtonText: 'Sim',
        //         cancelButtonText: 'Não',
        //         reverseButtons: true,
        //     }).then((result) => {
        //         if (result.isConfirmed) {
        //             $.ajax({
        //                 headers: {
        //                     'X-CSRF-TOKEN': csrf_token
        //                 },
        //                 url: '/y-space/delete/' + account_id,
        //                 type: "DELETE",
        //                 dataType: "json",
        //                 processData: true,
        //                 contentType: false,
        //                 success: function (data) {
        //                     if (data.status == 'success') {
        //                         Swal.fire({
        //                             icon: 'success',
        //                             title: 'Sucesso!',
        //                             text: data.message,
        //                         }).then((result) => {
        //                             if (result.isConfirmed) {
        //                                 YSpace.populateAccountTable();
        //                             }
        //                         });
        //                     } else {
        //                         Swal.fire({
        //                             icon: 'error',
        //                             title: 'Oops...',
        //                             text: data.message,
        //                         });
        //                     }
        //                 },
        //                 error: function(xhr) {
        //                     console.log(xhr.responseText);
        //                     let response = JSON.parse(xhr.responseText);
        //                     Swal.fire({
        //                         icon: 'error',
        //                         title: 'Oops...',
        //                         text: response.message,
        //                     });
        //                     console.log(xhr.statusText);
        //                 },
        //             });
        //         }
        //     });
        // });
    },

    setCharts: () => {
        let data = $('#KpiChartsData').serializeArray();
        console.log(data)
        Highcharts.chart('chart-status', {
            chart: {
                type: 'pie'
            },
            title: {
                text: 'Status das contas'
            },
            tooltip: {
                valueSuffix: '%'
            },
            subtitle: {
                text:
                'Porcentagem de cada status das contas bancárias cadastradas '
            },
            plotOptions: {
                series: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: [{
                        enabled: true,
                        distance: 20
                    }, {
                        enabled: true,
                        distance: -40,
                        format: '{point.percentage:.1f}%',
                        style: {
                            fontSize: '1.2em',
                            textOutline: 'none',
                            opacity: 0.7
                        },
                        filter: {
                            operator: '>',
                            property: 'percentage',
                            value: 10
                        }
                    }]
                }
            },
            colors: ['#0d6efd', '#198754', '#b02a37'],
            series: [
                {
                    name: 'Percentage',
                    colorByPoint: true,
                    data: [
                        {
                            name: 'Pendente',
                            y: (data[2].value/data[1].value)*100,
                        },
                        {
                            name: 'Aprovado',
                            sliced: true,
                            selected: true,
                            y: (data[3].value/data[1].value)*100,
                        },
                        {
                            name: 'Reprovado',
                            y: (data[4].value/data[1].value)*100,
                        },
                    ]
                }
            ]
        });
        Highcharts.chart('chart-pix-type', {
            chart: {
                type: 'pie'
            },
            title: {
                text: 'Tipos de chave pix'
            },
            tooltip: {
                valueSuffix: '%'
            },
            subtitle: {
                text:
                'Porcentagem de cada tipo de chave pix cadastrada'
            },
            plotOptions: {
                series: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: [{
                        enabled: true,
                        distance: 20
                    }, {
                        enabled: true,
                        distance: -40,
                        format: '{point.percentage:.1f}%',
                        style: {
                            fontSize: '1.2em',
                            textOutline: 'none',
                            opacity: 0.7
                        },
                        filter: {
                            operator: '>',
                            property: 'percentage',
                            value: 10
                        }
                    }]
                }
            },
            series: [
                {
                    name: 'Percentage',
                    colorByPoint: true,
                    data: [
                        {
                            name: 'CPF',
                            y: (data[5].value/data[1].value)*100,
                        },
                        {
                            name: 'CNPJ',
                            sliced: true,
                            selected: true,
                            y: (data[6].value/data[1].value)*100,
                        },
                        {
                            name: 'Email',
                            y: (data[7].value/data[1].value)*100,
                        },
                        {
                            name: 'Phone',
                            y: (data[8].value/data[1].value)*100,
                        },
                        {
                            name: 'Chave Aleatória',
                            y: (data[9].value/data[1].value)*100,
                        },
                    ]
                }
            ]
        });
    }        
}

$(document).ready(() => {
    YSpace.init();
});