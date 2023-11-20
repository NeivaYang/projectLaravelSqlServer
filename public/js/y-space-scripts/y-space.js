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
        $(document).on('click', '.clean-filter', function (e) {
            e.preventDefault();
            $('#FilterForm')[0].reset();
            YSpace.populateAccountTable();
        });

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
            console.log("acc id: " + account_id);
            $('input[name="account_id_disapprove"]').val(account_id);
            console.log('input acc idval: ' + $('input[name="account_id_disapprove"]').val());    
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
                                })
                                YSpace.populateAccountTable();
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

            let formData = new FormData($(this)[0]);

            $.ajax({
                url: '/y-space/bank-account-disapprove',
                type: "POST",
                data: formData,
                dataType: 'json',
                contentType: false,
                cache: false,
                processData: false,
                success: function (data) {
                    if(data.status == 'success') {
                        Swal.fire({
                            icon: 'success',
                            title: 'Sucesso!',
                            text: data.message,
                        })
                        $('#ModalReprovarConta').modal('hide');
                        $('input[name="account_id_disapprove"]').val('');
                        $(this)[0].reset();
                        YSpace.populateAccountTable()
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: data.message,
                        })
                    }
                },
            });
        });
        // FIM... approve listener and disapprove submition
        //////////////////////////
        /////////////////////////

        $(document).on('click','.bank-account-details', function (e) {
            e.preventDefault();
            let account_id = $(this).data('id');

            $("#change-acc-details").data("id", account_id);

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

                    switch(data.bank_account.pix_type) {
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

        // $(document).on('submit', '#FilterForm', function (e) {
        //     e.preventDefault();
        //     YSpace.populateAccountTable();
        //     // let formData = new FormData(this);

        //     // $.ajax({
        //     //     url: $(this).attr('action'),
        //     //     type: "get",
        //     //     data: formData,
        //     //     dataType: "json",
        //     //     processData: false,
        //     //     contentType: false,
        //     //     success: function (data) {
        //     //         console.log(data);
        //     //         if (data.bank_accounts.data.length > 0) {
        //     //             data.bank_accounts.data.map(element => {
        //     //                 let accountStatus;
        //     //                 switch (element.status) {
        //     //                     case 'approved':
        //     //                         accountStatus = `<span class="">Aprovado</span>`;
        //     //                         break;
        //     //                     case 'disapproved':
        //     //                         accountStatus = `<span class="">Reprovado</span>`;
        //     //                         break;
        //     //                     default:
        //     //                         accountStatus = `<span class="">Pendente</span>`;
        //     //                         break;
        //     //                 }
    
        //     //                 $(tbody).append(`
        //     //                     <tr>
        //     //                         ${data.user != 'admin' ? (`
        //     //                             <td class="tw-px-3 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-dark-500 tw-uppercase tw-tracking-wider">${element.display_date_request}</td>
        //     //                             <td class="tw-px-3 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-dark-500 tw-uppercase tw-tracking-wider">${element.bank_list.name}</td>
        //     //                             <td class="tw-px-3 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-dark-500 tw-uppercase tw-tracking-wider">${element.type == 'current' ? 'corrente' : 'poupança'}</td>
        //     //                             <td class="tw-px-3 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-dark-500 tw-uppercase tw-tracking-wider">${element.pix_key}</td>
        //     //                             <td class="tw-px-3 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-dark-500 tw-uppercase tw-tracking-wider">${accountStatus}</td>
        //     //                             <td class=" tw-flex tw-items-center tw-justify-center gap-2 align-self-center tw-px-3 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-dark-500 tw-uppercase tw-tracking-wider">
        //     //                                 <a class="btn btn-sm btn-primary bank-account-details text-10" data-id="${element.id}" data-bs-toggle="modal" data-bs-target="#bankAccountDetailsModal">Detalhes</a>
        //     //                                 <a class="btn btn-sm btn-danger remove-bank-account text-10" data-id="${element.id}">X</a>
        //     //                             </td>
        //     //                         `) : (`
        //     //                             <td class="tw-px-3 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-dark-500 tw-uppercase tw-tracking-wider">${element.display_date_request}</td>
        //     //                             <td class="tw-px-3 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-dark-500 tw-uppercase tw-tracking-wider">${element.user.name}</td>
        //     //                             <td class="tw-px-3 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-dark-500 tw-uppercase tw-tracking-wider">${element.bank_list.name}</td>
        //     //                             <td class="tw-px-3 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-dark-500 tw-uppercase tw-tracking-wider">${element.type == 'current' ? 'corrente' : 'poupança'}</td>
        //     //                             <td class="tw-px-3 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-dark-500 tw-uppercase tw-tracking-wider">${element.pix_key}</td>
        //     //                             <td class="tw-px-3 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-dark-500 tw-uppercase tw-tracking-wider">${accountStatus}</td>
        //     //                             <td class="tw-flex tw-items-center tw-justify-center gap-2 align-self-center tw-px-3 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-dark-500 tw-uppercase tw-tracking-wider">
        //     //                                 <a class="btn btn-sm btn-success approve-bank-account text-10 d-inline-flex" data-id="${element.id}">OK</a>
        //     //                                 <a class="btn btn-sm btn-danger disapprove-bank-account text-10 d-inline-flex" data-id="${element.id}" data-bs-toggle="modal" data-bs-target="#bankAccountDisapproveModal">NO</a>
        //     //                                 <a class="btn btn-sm btn-primary bank-account-details text-10" data-id="${element.id}" data-bs-toggle="modal" data-bs-target="#bankAccountDetailsModal">Detalhes</a>
        //     //                             </td>
        //     //                         `)}
        //     //                     </tr>
        //     //                 `);
        //     //             });
    
        //     //             let pagination = '<div class="pagination">';
        //     //             console.log(data.bank_accounts.links)
        //     //             if (data.bank_accounts.prev_page_url != null) {
        //     //                 pagination += `
        //     //                     <li class="page-item">
        //     //                         <a class="page-link tw-text-blue-500 hover:tw-text-blue-700" href="#" data-page="${data.bank_accounts.current_page - 1}">Anterior</a>
        //     //                     </li>
        //     //                 `;
        //     //             }
        //     //             for (let i = 1; i <= data.bank_accounts.last_page; i++) {
        //     //                 pagination += `
        //     //                     <li class="page-item ${data.bank_accounts.current_page == i ? 'active' : ''}">
        //     //                         <a class="page-link tw-text-blue-500 hover:tw-text-blue-700" href="#" data-page="${i}">${i}</a>
        //     //                     </li>
        //     //                 `;
        //     //             }
        //     //             if (data.bank_accounts.next_page_url != null) {
        //     //                 pagination += `
        //     //                     <li class="page-item">
        //     //                         <a class="page-link tw-text-blue-500 hover:tw-text-blue-700" href="#" data-page="${data.bank_accounts.current_page + 1}">Próxima</a>
        //     //                     </li>
        //     //                 `;
        //     //             }
        //     //             pagination += '</div>';
        //     //             $(tbody).append(`
        //     //                 ${pagination}
        //     //             `);
        //     //         } else {
        //     //             $('#accounts-table').append(`
        //     //                 <tr>
        //     //                     <td class="tw-px-3 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-dark-500 tw-uppercase tw-tracking-wider text-center" colspan="6">
        //     //                         Nenhuma conta bancária cadastrada
        //     //                     </td>
        //     //                     <td class="d-none"></td>
        //     //                     <td class="d-none"></td>
        //     //                     <td class="d-none"></td>
        //     //                     <td class="d-none"></td>
        //     //                     <td class="d-none"></td>
        //     //                 </tr>
        //     //             `);
        //     //         };
        //     //     },
        //     //     error: function(xhr) {
        //     //         console.log(xhr.responseText);
        //     //         let response = JSON.parse(xhr.responseText);
        //     //         Swal.fire({
        //     //             icon: 'error',
        //     //             title: 'Oops...',
        //     //             text: response.message,
        //     //         });
        //     //         console.log(xhr.statusText);
        //     //     },
        //     // })
        // });

        $(document).on('submit', '#AddBankAccForm', function (e) {
            e.preventDefault();
            let formData = new FormData(this);

            $('.bank-btn').attr('disabled', true);

            $.ajax({
                url: $(this).attr('action'),
                type: "POST",
                data: formData,
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
            }).always(function() {
                $('.bank-btn').attr('disabled', false);
            });
        });

        $(document).on('click', '#change-acc-details', function (e) {
            e.preventDefault();
            let account_id = $(this).data('id');
            console.log("🚀 ~ file: y-space.js:261 ~ account_id:", account_id)

            $.ajax({
                url:'/y-space/get-bank-accounts-details/' + account_id,
                type: "GET",
                dataType: "json",
                processData: true,
                contentType: false,
                success: function (data) {
                    let type = data.bank_account.type == 'current' ? 0 : 1;
                    let pix_type;
                    switch(data.bank_account.pix_type){
                        case 'cpf':   
                            pix_type = 1;
                            break;
                        case 'cnpj':
                            pix_type = 2;
                            break;
                        case 'email':
                            pix_type = 3;
                            break;
                        case 'phone':
                            pix_type = 4;
                            break;
                        default:
                            pix_type = 5;
                            break;
                    };
                    $("#bank-update option").each(function() {
                        if($(this).val() == data.bank_account.ispb) {
                            $(this).prop('selected', true);
                            $("#bank-update").val(data.bank_account.ispb);
                            $("#bank-update").trigger('change');
                        }
                    })
                    $("#select-bank-acc-type-update option").each(function() {
                        if($(this).val() == type) {
                            $(this).prop('selected', true);
                            $('#select-bank-acc-type-update').val(type);
                            $('#select-bank-acc-type-update').trigger('change');
                        }
                    });
                    $("#select-bank-pix-type-update option").each(function() {
                        if($(this).val() == pix_type) {
                            $(this).prop('selected', true);
                            $('#select-bank-pix-type-update').val(pix_type);
                            $('#select-bank-pix-type-update').trigger('change');
                        }
                    });
                    $("#agency-update").val(data.bank_account.agency);
                    $("#number-update").val(data.bank_account.number);
                    $("#digit-update").val(data.bank_account.digit);
                    $("#pix-key-update").val(data.bank_account.pix_key);
                    $("#account-id-update").val(account_id);
                },
                error: function(xhr) {
                    console.log(xhr.responseText);
                    console.log(xhr.statusText);
                },
            });
        });

        $(document).on('submit', '#UpdateBankAccForm', function (e) {
            e.preventDefault();

            let formData = new FormData($(this)[0]);

            $.ajax({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                url: '/y-space/update-bank-account',
                type: "POST",
                data: formData,
                dataType: 'json',
                contentType: false,
                cache: false,
                processData: false,
                success: function (data) {
                    $('#UpdateBankAccForm')[0].reset();
                    YSpace.populateAccountTable();
                    if (data.status == 'success') {
                        Swal.fire({
                            icon: 'success',
                            title: 'Sucesso!',
                            text: data.message,
                        })
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
        console.log($('#FilterForm').serialize());
        $.ajax({
            url: url,
            type: "GET",
            data: {
                filter: function() { return $('#FilterForm').serialize(); }
            },
            dataType: "json",
            beforeSend: function () {
                $(tbody).html("");
                $('.filter-text').html("");
            },
            success: function (data) {
                console.log(data);
                if(data.filter_text_bool) {
                    $('.filter-text').html(data.filter_text);
                }
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
                                ${data.user != 'admin' ? (`
                                    <td class="tw-px-3 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-dark-500 tw-uppercase tw-tracking-wider">${element.display_date_request}</td>
                                    <td class="tw-px-3 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-dark-500 tw-uppercase tw-tracking-wider">${element.bank_list.name}</td>
                                    <td class="tw-px-3 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-dark-500 tw-uppercase tw-tracking-wider">${element.type == 'current' ? 'corrente' : 'poupança'}</td>
                                    <td class="tw-px-3 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-dark-500 tw-uppercase tw-tracking-wider">${element.pix_key}</td>
                                    <td class="tw-px-3 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-dark-500 tw-uppercase tw-tracking-wider">${accountStatus}</td>
                                    <td class=" tw-flex tw-items-center tw-justify-center gap-2 align-self-center tw-px-3 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-dark-500 tw-uppercase tw-tracking-wider">
                                        <a class="btn btn-sm btn-primary bank-account-details text-10" data-id="${element.id}" data-bs-toggle="modal" data-bs-target="#bankAccountDetailsModal">Detalhes</a>
                                        <a class="btn btn-sm btn-danger remove-bank-account text-10" data-id="${element.id}">X</a>
                                    </td>
                                `) : (`
                                    <td class="tw-px-3 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-dark-500 tw-uppercase tw-tracking-wider">${element.display_date_request}</td>
                                    <td class="tw-px-3 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-dark-500 tw-uppercase tw-tracking-wider">${element.user.name}</td>
                                    <td class="tw-px-3 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-dark-500 tw-uppercase tw-tracking-wider">${element.bank_list.name}</td>
                                    <td class="tw-px-3 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-dark-500 tw-uppercase tw-tracking-wider">${element.type == 'current' ? 'corrente' : 'poupança'}</td>
                                    <td class="tw-px-3 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-dark-500 tw-uppercase tw-tracking-wider">${element.pix_key}</td>
                                    <td class="tw-px-3 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-dark-500 tw-uppercase tw-tracking-wider">${accountStatus}</td>
                                    <td class="tw-flex tw-items-center tw-justify-center gap-2 align-self-center tw-px-3 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-dark-500 tw-uppercase tw-tracking-wider">
                                        <a class="btn btn-sm btn-success approve-bank-account text-10 d-inline-flex" data-id="${element.id}">OK</a>
                                        <a class="btn btn-sm btn-danger disapprove-bank-account text-10 d-inline-flex" data-id="${element.id}" data-bs-toggle="modal" data-bs-target="#bankAccountDisapproveModal">NO</a>
                                        <a class="btn btn-sm btn-primary bank-account-details text-10" data-id="${element.id}" data-bs-toggle="modal" data-bs-target="#bankAccountDetailsModal">Detalhes</a>
                                    </td>
                                `)}
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
                    for (let i = 1; i <= data.bank_accounts.last_page; i++) {
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
                    $(tbody).append(`
                        <tr>
                            <td class="tw-px-3 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-dark-500 tw-uppercase tw-tracking-wider text-center" colspan="6">
                                Nenhuma conta bancária encontrada
                            </td>
                            <td class="d-none"></td>
                            <td class="d-none"></td>
                            <td class="d-none"></td>
                            <td class="d-none"></td>
                            <td class="d-none"></td>
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
        });
    },

    addMaskToInput: (element) => {
        console.log("🚀 ~ file: y-space.js:664 ~ element:", element.closest('.form-group').parentNode.parentNode.nextElementSibling.nextElementSibling.querySelector("input[name='pix_key']"));
        console.log(element.value);
        let pix_type = element.value;
        let pix_key = element.closest('.form-group').parentNode.parentNode.nextElementSibling.nextElementSibling.querySelector("input[name='pix_key']");
        // let pix_key = element.closest('.form-group').nextElementSibling.querySelector("input[name='pix_key']");
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