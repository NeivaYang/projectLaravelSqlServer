const YSpace = {
    init: () => {
        YSpace.setListeners();
        $('#select-bank-pix-type').trigger('change');
    },

    setMasK: () => {
        $(".number").mask("#0", { reverse: true });
        // $('.cpf').mask('000.000.000-00', {reverse: true});
        // $('.cnpj').mask('00.000.000/0000-00', {reverse: true});
    },

    setListeners: () => {
        const accordionMangeAccountsDrop = document.getElementById('accordionMangeAccountsDrop');

        accordionMangeAccountsDrop.addEventListener('shown.bs.collapse', function () {
            YSpace.populateAccountTable(this);
        });

        accordionMangeAccountsDrop.addEventListener('hidden.bs.collapse', function () {
            console.log(this.id);
        });

        // $(document).on('change', '#select-bank-pix-type', function(){
        //     YSpace.addMaskToInput(this);
        // });
        // // $(document).on('change', '#select-bank-pix-type-update', function(){
        // //     YSpace.addMaskToInput(this);
        // // });
        // $(document).on('click','.bank-account-details', function () {
        //     let account_id = $(this).data('id');

        //     $.ajax({
        //         url:'/perfil/contas-bancarias/detalhes/' + account_id,
        //         type: "GET",
        //         dataType: "json",
        //         processData: true,
        //         contentType: false,
        //         beforeSend: function () {
        //             // UTILS.displayLoader();
        //         },
        //         success: function (feedback) {
        //             $(".acc-details-json").html("");

        //             if (feedback.bank_accounts_list.status == 'pending' ){
        //                 $("#acc-details-status").html(`
        //                     <span class="badge badge-danger">Pendente</span>
        //                 `);
        //             } else if (feedback.bank_accounts_list.status == 'approved' ){
        //                 $("#acc-details-status").html(`
        //                     <span class="badge badge-success">Aprovado</span>
        //                 `);
        //             } else {
        //                 $("#acc-details-status").html(`
        //                     <span class="badge badge-danger">Reprovado</span>
        //                 `);
        //             }

        //             switch(feedback.bank_accounts_list.pix_type){
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

        //             $("#acc-details-bank").html(feedback.bank_accounts_list.fullname);
        //             $("#acc-details-agency").html(feedback.bank_accounts_list.agency);
        //             $("#acc-details-number").html(feedback.bank_accounts_list.number);
        //             $("#acc-details-type").html(feedback.bank_accounts_list.type == 'current' ? 'Corrente' : 'Poupança');
        //             $("#acc-details-pix-key").html(feedback.bank_accounts_list.pix_key);
        //             $("#change-acc-details").attr("data-id", account_id);

        //             if (!feedback.bank_accounts_list.disapproval_justification && feedback.bank_accounts_list.status != 'disapproved') {
        //                 $("#disapproval-justification-div").addClass("d-none");
        //                 $("disapproval-justification-i").html("");
        //             } else {
        //                 $("#disapproval-justification-div").removeClass("d-none");
        //                 $("#acc-details-justification").html("");
        //                 $("#acc-details-justification").html(feedback.bank_accounts_list.disapproval_justification);
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
        //         complete: function () {
        //             // UTILS.displayLoader(false);
        //         },
        //     });
        // });
        // $(document).on('click', '#change-acc-details', function () {
        //     let account_id = $(this).data('id');

        //     $.ajax({
        //         url:'/perfil/contas-bancarias/detalhes/' + account_id,
        //         type: "GET",
        //         dataType: "json",
        //         processData: true,
        //         contentType: false,
        //         success: function (feedback) {
        //             $(".change-details-json").html("");
        //             let bank = feedback.bank_accounts_list.code+'-'+feedback.bank_accounts_list.ispb;
        //             let type= feedback.bank_accounts_list.type == 'current' ? 1 : 2;
        //             let pix_type;
        //             switch(feedback.bank_accounts_list.pix_type){
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
        //             $("#updateBank option").each(function() {
        //                 if($(this).val() == bank) {
        //                     $(this).prop('selected', true);
        //                 }
        //             })
        //             $("#select-bank-acc-type-update option").each(function() {
        //                 if($(this).val() == type) {
        //                     $(this).prop('selected', true);
        //                 }
        //             });
        //             $("#select-bank-pix-type-update option").each(function() {
        //                 if($(this).val() == pix_type) {
        //                     $(this).prop('selected', true);
        //                 }
        //             });
        //             $("#change-details-agency").val(feedback.bank_accounts_list.agency);
        //             $("#change-details-number").val(feedback.bank_accounts_list.number);
        //             $("#change-details-digit").val(feedback.bank_accounts_list.digit);
        //             $("#change-details-account-id").val(account_id);
        //             $("#change-details-pix-key").val(feedback.bank_accounts_list.pix_key);
        //             $("#change-details-account-id").attr("data-id", account_id);
        //         },
        //         error: function(xhr) {
        //             console.log(xhr.responseText);
        //             console.log(xhr.statusText);
        //         },
        //     });
        // });
        $(document).on('submit', '#AddBankAccForm', function (e) {
            e.preventDefault();
            let form = new FormData(this);

            $.ajax({
                url: '/y-space/store',
                type: "POST",
                data: form,
                dataType: "json",
                processData: false,
                contentType: false,
                beforeSend: function () {
                    // UTILS.displayLoader();
                },
                success: function (data) {
                    if (data.status == 'success') {
                        Swal.fire({
                            icon: 'success',
                            title: 'Sucesso!',
                            text: data.message,
                        }).then((result) => {
                            if (result.isConfirmed) {
                                $('#AddBankAccForm')[0].reset();
                                $('.default-select').selectpicker('refresh');
                                YSpace.populateAccountTable();
                            }
                        });
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: data.message,
                        });
                    }
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
                complete: function () {
                    // UTILS.displayLoader(false);
                },
            });
        });
        $(document).on('submit', '#UpdateBankAccForm', function (e) {
            e.preventDefault();
            let form = new FormData(this);

            $.ajax({
                url: $(this).attr('action'),
                type: "POST",
                data: form,
                dataType: "json",
                processData: false,
                contentType: false,
                beforeSend: function () {
                    // UTILS.displayLoader();
                },
                success: function (data) {
                    if (data.status == 'success') {
                        Swal.fire({
                            icon: 'success',
                            title: 'Sucesso!',
                            text: data.message,
                        }).then((result) => {
                            if (result.isConfirmed) {
                                $('#UpdateBankAccForm')[0].reset();
                                $('.default-select').selectpicker('refresh');
                                YSpace.populateAccountTable();
                            }
                        });
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: data.message,
                        });
                    }
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
                complete: function () {
                    // UTILS.displayLoader(false);
                },
            });
        });
        $(document).on('click', '.remove-bank-account', function (e) {
            let account_id = $(this).data('id');
            let csrf_token = $('meta[name="csrf-token"]').attr('content');

            Swal.fire({
                title: 'Tem certeza?',
                text: `Deseja remover essa conta?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sim',
                cancelButtonText: 'Não',
                reverseButtons: true,
            }).then((result) => {
                if (result.isConfirmed) {
                    $.ajax({
                        headers: {
                            'X-CSRF-TOKEN': csrf_token
                        },
                        url: '/perfil/contas-bancarias/excluir/'+account_id,
                        type: "DELETE",
                        dataType: "json",
                        processData: true,
                        contentType: false,
                        beforeSend: function () {
                            // UTILS.displayLoader();
                        },
                        success: function (data) {
                            if (data.status == 'success') {
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Sucesso!',
                                    text: data.message,
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        YSpace.populateAccountTable();
                                    }
                                });
                            } else {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: data.message,
                                });
                            }
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
                        complete: function () {
                            // UTILS.displayLoader(false);
                        },
                    });
                }
            });
        });
    },

    populateAccountTable: (element) => {
        console.log(element);
        $.ajax({
            url: '/y-space/get-bank-ccounts',
            type: "GET",
            dataType: "json",
            beforeSend: function () {
                // UTILS.displayLoader();
                $('').html("");
            },
            success: function (data) {
                if (data.bank_accounts.length > 0) {
                    data.bank_accounts.map(element => {
                        let accountStatus;
                        switch (element.status) {
                            case '1':
                                accountStatus = `<span class="badge badge-sm badge-success">Aprovado</span>`;
                                break;
                            case '2':
                                accountStatus = `<span class="badge badge-sm badge-danger">Reprovado</span>`;
                                break;
                            default:
                                accountStatus = `<span class="badge badge-sm badge-warning">Pendente</span>`;
                                break;
                        }

                        $('#accounts-table').append(`

                        `);
                    });
                } else {
                    $('#accounts-table').append(`
                        <tr>
                            <td class="text-center" colspan="6">
                                <div class="text-center alert alert-secondary alert-light alert-dismissible fade show">
                                    <small>Nenhuma conta bancária cadastrada.</small>
                                </div>
                            </td>
                        </tr>
                    `);
                };
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
            complete: function () {
                // UTILS.displayLoader(false);
            },
        });
    },

    addMaskToInput: (element) => {
        console.log(element.value);
        let pix_type = element.value;
        let pix_key = element.closest('.form-group').nextElementSibling.querySelector("input[name='pix_key']");
        console.log(pix_key);
        $(pix_key).attr('type', 'text');

        if (pix_type == "4") {
            pix_key.value = "";
            $(pix_key).mask("+99 (99) 99999-9999");
        } else if (pix_type == "1") {
            pix_key.value = "";
            $(pix_key).mask("999.999.999-99");
        } else if (pix_type == "2") {
            pix_key.value = "";
            $(pix_key).mask("99.999.999/9999-99");
        } else if (pix_type == "3") {
            pix_key.value = "";
            $(pix_key).unmask();
            $(pix_key).attr('type', 'email');
        } else if (pix_type == "5") {
            pix_key.value = "";
            $(pix_key).mask("AAAAAAAA-AAAA-AAAA-AAAA-AAAAAAAAAAAA");
        }
    },
    /////
    // init: () => {
    //     YSpace.setListeners();
    // },

    // setListeners: () => {
    //     $(document).on('click', 'body', (e) => {
    //         e.preventDefault();
    //         console.log('clicked'); 
    //     });
    // }
}

$(document).ready(() => {
    YSpace.init();
});