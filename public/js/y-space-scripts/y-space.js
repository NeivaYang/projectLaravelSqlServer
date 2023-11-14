const YSpace = {
    init: () => {
        YSpace.setListeners();
        YSpace.setMasK();
        $('#select-bank-pix-type').trigger('change');
    },

    setMasK: () => {
        $(".number").mask("#0", { reverse: true });
    },

    setListeners: () => {
        const accordionMangeAccountsDrop = document.getElementById('accordionMangeAccountsDrop');

        accordionMangeAccountsDrop.addEventListener('shown.bs.collapse', function () {
            YSpace.populateAccountTable();
        });

        accordionMangeAccountsDrop.addEventListener('hidden.bs.collapse', function () {
            console.log(this.id);
            $('tbody').html("");
        });

        $(document).on('click', '.pagination a', function(e) {
            e.preventDefault();
            let page = $(this).data('page');
            console.log(page);
            YSpace.populateAccountTable(page);
        });

        $(document).on('change', '#select-bank-pix-type', function(){
            YSpace.addMaskToInput(this);
        });

        $(document).on('change', '#select-bank-pix-type-update', function(){
            YSpace.addMaskToInput(this);
        });

        //////////////////////////////////////////////////////
        // approve listener and disapprove submition
        $(document).on('click', '.disapprove-bank-account', function(){
            let account_id = $(this).data('id');
            console.log(account_id);
            $('input[name="account_id_disapprove"]').val(account_id);
        });
        $(document).on('click', '.approve-bank-account', function(){
            let account_id = $(this).data('id');
            let url = "/y-space/bank-account-approve"

            Swal.fire({
                title: 'Tem certeza?',
                text: `Deseja aprovar essa conta?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sim',
                cancelButtonText: 'Não',
                reverseButtons: true,
            }).then((result) => {
                if (result.isConfirmed) {
                    $.ajax({
                        headers: {
                            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                        },
                        url: url,
                        type: "POST",
                        data: {
                            account_id: account_id,
                        },
                        dataType: "json",
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
                    });
                }
            });
        });

        $('#DisapproveForm').submit(function(e){
            e.preventDefault();
            console.log("🚀 ~ file: adm-bank-accounts.js:22 ~ $ ~ $('#DisapproveForm').submit(function(e){", $('#DisapproveForm').serialize())
        });

        // $(document).on('submit', '#DisapproveBankAccount', (e) => {
        //     e.preventDefault();
        //     let id = $('#disapprove-bank-account-submit').attr('data-id');
        //     let url = "/usuarios/contas-bancarias/desaprovar";
        //     let reason = $('#justificativa').val();
        //     console.log("🚀 ~ file: adm-bank-accounts.js:22 ~ $ ~ reason:", reason)

        //     let parentDivGroup = $('#div-bank-account-status-btn-' + id);
        //     console.log("🚀 ~ file: adm-bank-accounts.js:191 ~ parentDivGroup:", parentDivGroup)

        //     $.ajax({
        //         url: url,
        //         type: "POST",
        //         data: { 
        //             id : id,
        //             reason: reason,
        //         },
        //         dataType: 'json',
        //         success: function (data) {
        //             if(data.status == 'success') {
        //                 toastr.success(data.msg, data.title, {
        //                     timeOut: 1500,
        //                     closeButton: !0,
        //                     debug: !1,
        //                     newestOnTop: !0,
        //                     progressBar: !0,
        //                     positionClass: "toast-top-right",
        //                     preventDuplicates: !0,
        //                     onclick: null,
        //                     showDuration: "400",
        //                     hideDuration: "1000",
        //                     extendedTimeOut: "1000",
        //                     showEasing: "swing",
        //                     hideEasing: "linear",
        //                     showMethod: "fadeIn",
        //                     hideMethod: "fadeOut",
        //                     tapToDismiss: !0
        //                 });
        //                 $('#ModalReprovarConta').modal('toggle');
        //                 $('#justificativa').val('');
        //                 parentDivGroup.html(`
        //                     <button type='button' class='btn btn-danger dropdown-toggle btn-xs' data-toggle='dropdown' aria-expanded='false' id='bank-account-status-btn-${id}'>Reprovada</button>
        //                     <div class='dropdown-menu' x-placement='bottom-start' style='position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 42px, 0px);'>
        //                         <a class='dropdown-item' onclick='Page.approveBankAccount(this)' data-action='1' data-id='${id}' href='#' data-btn-id='bank-account-status-btn-${id}'>Aprovar</a>
        //                     </div>
        //                 `);
        //             } else {
        //                 toastr.success(data.msg, data.title, {
        //                     timeOut: 1500,
        //                     closeButton: !0,
        //                     debug: !1,
        //                     newestOnTop: !0,
        //                     progressBar: !0,
        //                     positionClass: "toast-top-right",
        //                     preventDuplicates: !0,
        //                     onclick: null,
        //                     showDuration: "400",
        //                     hideDuration: "1000",
        //                     extendedTimeOut: "1000",
        //                     showEasing: "swing",
        //                     hideEasing: "linear",
        //                     showMethod: "fadeIn",
        //                     hideMethod: "fadeOut",
        //                     tapToDismiss: !0
        //                 });
        //             }
        //         },
        //         complete: function () {
        //             COMMON.displayLoader(false);
        //         },
        //         error: function (xhr) {
        //         },
        //     });
        // });

        // FIM... approve listener and disapprove submition
        //////////////////////////
        /////////////////////////

        $(document).on('click','.bank-account-details', function () {
            let account_id = $(this).data('id');

            $.ajax({
                url: '/y-space/get-bank-accounts-details/' + account_id,
                type: "GET",
                dataType: "json",
                processData: true,
                contentType: false,
                success: function (data) {
                    console.log(data);
                    $(".acc-details-json").html("");

                    if (data.bank_account.status == 'pending' ){
                        $("#acc-details-status").html(`
                            <span class="badge badge-danger">Pendente</span>
                        `);
                    } else if (data.bank_account.status == 'approved' ){
                        $("#acc-details-status").html(`
                            <span class="badge badge-success">Aprovado</span>
                        `);
                    } else {
                        $("#acc-details-status").html(`
                            <span class="badge badge-danger">Reprovado</span>
                        `);
                    }

                    switch(data.bank_account.pix_type){
                        case 'phone':
                            $("#acc-details-pix-type").html('Telefone');
                            break;
                        case 'cpf':
                            $("#acc-details-pix-type").html('CPF');
                            break;
                        case 'cnpj':
                            $("#acc-details-pix-type").html('CNPJ');
                            break;
                        case 'email':
                            $("#acc-details-pix-type").html('E-mail');
                            break;
                        case 'random':
                            $("#acc-details-pix-type").html('Aleatória');
                            break;
                    };

                    $("#acc-details-bank").html(data.bank_account.bank);
                    $("#acc-details-agency").html(data.bank_account.agency);
                    $("#acc-details-number").html(data.bank_account.number);
                    $("#acc-details-type").html(data.bank_account.type == 'current' ? 'Corrente' : 'Poupança');
                    $("#acc-details-pix-key").html(data.bank_account.pix_key);
                    $("#change-acc-details").attr("data-id", account_id);

                    if (!data.bank_account.disapproval_justification && data.bank_account.status != 'disapproved') {
                        $("#disapproval-justification-div").addClass("d-none");
                        $("disapproval-justification-i").html("");
                    } else {
                        $("#disapproval-justification-div").removeClass("d-none");
                        $("#acc-details-justification").html("");
                        $("#acc-details-justification").html(data.bank_account.disapproval_justification);
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
            });
        });

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
                url: $(this).attr('action'),
                type: "POST",
                data: form,
                dataType: "json",
                processData: false,
                contentType: false,
                success: function (data) {
                    if (data.status == 'success') {
                        Swal.fire({
                            icon: 'success',
                            title: 'Sucesso!',
                            text: data.message,
                        }).then((result) => {
                            if (result.isConfirmed) {
                                $('#AddBankAccForm')[0].reset();
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
            // const url = '//localhost:8000';
            let account_id = $(this).data('id');
            // let url = $('#route-destroy-accounts').data('url') + '/' + account_id;
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
                        url: '/y-space/delete/' + account_id,
                        type: "DELETE",
                        dataType: "json",
                        processData: true,
                        contentType: false,
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
                    });
                }
            });
        });
    },

    populateAccountTable: (page) => {
        let url = page ? $('#route-get-bank-accounts').data('url') + '?page=' + page : $('#route-get-bank-accounts').data('url') ;
        let tbody = $('tbody.active');

        console.log(url);
        console.log(tbody);
        $.ajax({
            url: url,
            type: "GET",
            dataType: "json",
            beforeSend: function () {
                $(tbody).html("");
            },
            success: function (data) {
                console.log(data);
                if (data.bank_accounts.data.length > 0) {
                    data.bank_accounts.data.map(element => {
                        let accountStatus;
                        switch (element.status) {
                            case 'approved':
                                accountStatus = `<span class="">Aprovado</span>`;
                                break;
                            case 'disapproved':
                                accountStatus = `<span class="">Reprovado</span>`;
                                break;
                            default:
                                accountStatus = `<span class="">Pendente</span>`;
                                break;
                        }

                        $(tbody).append(`
                            <tr>
                                <td class="tw-px-3 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-dark-500 tw-uppercase tw-tracking-wider">${element.display_date_request}</td>
                                <td class="tw-px-3 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-dark-500 tw-uppercase tw-tracking-wider">${element.display_owner_name}</td>
                                <td class="tw-px-3 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-dark-500 tw-uppercase tw-tracking-wider">${element.name}</td>
                                <td class="tw-px-3 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-dark-500 tw-uppercase tw-tracking-wider">${element.type == 'current' ? 'corrente' : 'poupança'}</td>
                                <td class="tw-px-3 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-dark-500 tw-uppercase tw-tracking-wider">${element.pix_key}</td>
                                <td class="tw-px-3 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-dark-500 tw-uppercase tw-tracking-wider">${accountStatus}</td>
                                <td class="tw-px-3 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-dark-500 tw-uppercase tw-tracking-wider">
                                    ${data.user == 'admin' ? (`
                                        <a class="btn btn-sm btn-success approve-bank-account text-10" data-id="${element.id}">OK</a>
                                        <a class="btn btn-sm btn-danger disapprove-bank-account text-10 d-inline-flex" data-id="${element.id}" data-bs-toggle="modal" data-bs-target="#bankAccountDisapproveModal">NO</a>
                                    `) : (`
                                        <a class="btn btn-sm btn-primary bank-account-details text-10" data-id="${element.id}" data-bs-toggle="modal" data-bs-target="#bankAccountDetailsModal">detalhes</a>
                                        <a class="btn btn-sm btn-danger remove-bank-account text-10" data-id="${element.id}">X</a>
                                    `)}
                                </td>
                            </tr>
                        `);
                    });

                    let pagination = '<div class="pagination">';
                    console.log(data.bank_accounts.links)
                    if (data.bank_accounts.prev_page_url != null) {
                        pagination += `
                            <li class="page-item">
                                <a class="page-link tw-text-blue-500 hover:tw-text-blue-700" href="#" data-page="${data.bank_accounts.current_page - 1}">Anterior</a>
                            </li>
                        `;
                    }
                    for (let i = 1; i < data.bank_accounts.last_page; i++) {
                        pagination += `
                            <li class="page-item ${data.bank_accounts.current_page == i ? 'active' : ''}">
                                <a class="page-link tw-text-blue-500 hover:tw-text-blue-700" href="#" data-page="${i}">${i}</a>
                            </li>
                        `;
                    }
                    if (data.bank_accounts.next_page_url != null) {
                        pagination += `
                            <li class="page-item">
                                <a class="page-link tw-text-blue-500 hover:tw-text-blue-700" href="#" data-page="${data.bank_accounts.current_page + 1}">Próxima</a>
                            </li>
                        `;
                    }
                    pagination += '</div>';
                    $(tbody).append(`
                        ${pagination}
                    `);
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
}

$(document).ready(() => {
    YSpace.init();
});