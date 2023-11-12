


const UTILS = {
    // displayLoader: (verify = true) => {
    //     if (verify) {
    //         $("#preloader").css("display", "flex");
    //         $("#preloader").css("background-color", "hsl(0 0% 100% / 40%)");
    //         $("#preloader .sk-three-bounce").css("background-color", "unset");
    //         $("#preloader").css("z-index", "99999");
    //         return "atualizando...";
    //     }
    //     $("#preloader").css("display", "none");
    //     $("#preloader").css("z-index", "unset");
    //     $("#preloader").css("background-color", "white");
    //     $("#preloader .sk-three-bounce").css("background-color", "white");
    //     return "completo...";
    // },

    // search: (closeOnly = true) => {
    //     console.log(Dashboard.getActiveFilters());
    //     Dashboard.getChartsFirstPart();
    //     Dashboard.getChartsSecondPart();
    //     Dashboard.toggleFilters(closeOnly);
    //     Dashboard.setActiveFiltersLabel();
    // },

    toggleFilters: (closeOnly = false) => {
        if (closeOnly) {
            $(".chatbox").removeClass("active");
            return false;
        }
        let active = $(".chatbox").hasClass("active");
        if (active) {
            $(".chatbox").removeClass("active");
            return false;
        }
        $(".chatbox").addClass("active");
    },

    checkCNPJorCPF: (value) => {
        value = value.replace(/[^\d]/g, "");
        if (value.length <= 11) {
            if (UTILS.validateCPF(value)) {
                Swal.fire({
                    title: "Sucesso!",
                    text: "CPF válido!",
                    icon: "success",
                });
            } else {
                Swal.fire({
                    title: "Erro!",
                    text: "CPF inválido!",
                    icon: "error",
                });
            }
            return;
        } else if (UTILS.validateCNPJ(value)) {
            Swal.fire({
                title: "Sucesso!",
                text: "CNPJ válido!",
                icon: "success",
            });
        } else {
            Swal.fire({
                title: "Erro!",
                text: "CNPJ inválido!",
                icon: "error",
            });
        }
    },

    validateCPF: (cpf) => {
        cpf = cpf.replace(/[^\d]/g, "");

        if (cpf.toString().length != 11 || /^(\d)\1{10}$/.test(cpf))
            return false;

        let result = true;
        [9, 10].forEach(function (j) {
            let soma = 0,
                r;

            cpf.split(/(?=)/)
                .splice(0, j)
                .forEach(function (e, i) {
                    soma += parseInt(e) * (j + 2 - (i + 1));
                });

            r = soma % 11;
            r = r < 2 ? 0 : 11 - r;

            if (r != cpf.substring(j, j + 1)) result = false;
        });
        return result;
    },

    validateCNPJ: (cnpj) => {
        cnpj = cnpj.replace(/[^\d]/g, "");

        if (cnpj.length !== 14 || /^(.)\1+$/.test(cnpj)) {
            return false;
        }

        var soma = 0;
        var peso = 2;

        for (var i = 11; i >= 0; i--) {
            soma += parseInt(cnpj.charAt(i)) * peso;
            peso = peso === 9 ? 2 : peso + 1;
        }

        var digito = soma % 11 < 2 ? 0 : 11 - (soma % 11);

        if (digito !== parseInt(cnpj.charAt(12))) {
            return false;
        }

        soma = 0;
        peso = 2;

        for (var i = 12; i >= 0; i--) {
            soma += parseInt(cnpj.charAt(i)) * peso;
            peso = peso === 9 ? 2 : peso + 1;
        }

        digito = soma % 11 < 2 ? 0 : 11 - (soma % 11);

        if (digito !== parseInt(cnpj.charAt(13))) {
            return false;
        }

        return true;
    },
};
