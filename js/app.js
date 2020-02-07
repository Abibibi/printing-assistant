const app = {
    init: () => {
        app.container = document.getElementById('app');

        app.container.innerHTML = '';

        app.displayTitle('Obtenez une suite de chiffres pairs');
        app.displayForm(2, 86);

        /* app.displayTitle('Obtenez une suite de chiffres impairs');
        app.displayForm(1, 57); */
    },

    displayTitle: (titleText) => {
        app.title = document.createElement('h1');
        app.title.classList.add('title');
        app.title.textContent = titleText;
        
        app.container.appendChild(app.title);
    },

    displayForm: (min, max) => {
        app.form = document.createElement('form');
        app.form.classList.add('form');

        app.displayLabelInput('Chiffre minimal', 'Saisissez un chiffre minimal', min);
        app.displayLabelInput('Chiffre maximal', 'Saisissez un chiffre maximal', max);

        app.button = document.createElement('button');
        app.button.classList.add('button');
        app.button.textContent = 'Ok';

        app.form.appendChild(app.button);

        app.container.appendChild(app.form);
    },

    displayLabelInput: (label, inputTitle, placeholder) => {
        app.label = document.createElement('label');
        app.label.classList.add('label');
        app.label.textContent = label;

        app.input = document.createElement('input');
        app.input.title = inputTitle;
        app.input.placeholder = `Ex : ${placeholder}`;

        app.inputLabelContainer = document.createElement('div');
        app.inputLabelContainer.classList.add('inputLabelContainer');
        app.inputLabelContainer.append(
            app.label,
            app.input
        );

        app.form.appendChild(app.inputLabelContainer);
    }
};

document.addEventListener('DOMContentLoaded', app.init);

