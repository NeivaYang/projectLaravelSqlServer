const YSpace = {
    init: () => {
        YSpace.setListeners();
    },

    setListeners: () => {
        $(document).on('click', 'body', (e) => {
            e.preventDefault();
            console.log('clicked'); 
        });
    }
}

$(document).ready(() => {
    YSpace.init();
});