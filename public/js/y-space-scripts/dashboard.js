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