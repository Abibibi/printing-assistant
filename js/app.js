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

        app.displayLabelInput('Chiffre minimal', 'min', 'Saisissez un chiffre minimal', min);
        app.displayLabelInput('Chiffre maximal', 'max', 'Saisissez un chiffre maximal', max);

        app.button = document.createElement('button');
        app.button.classList.add('button');
        app.button.textContent = 'Ok';

        app.form.appendChild(app.button);

        app.form.addEventListener('submit', app.handleSubmit);

        app.container.appendChild(app.form);
    },

    displayLabelInput: (label, forIdAttributes, inputTitle, placeholder) => {
        app.label = document.createElement('label');
        app.label.htmlFor = forIdAttributes;
        app.label.classList.add('label');
        app.label.textContent = label;

        app.input = document.createElement('input');
        app.input.id = forIdAttributes;
        app.input.title = inputTitle;
        app.input.placeholder = `Ex : ${placeholder}`;

        app.inputLabelContainer = document.createElement('div');
        app.inputLabelContainer.classList.add('inputLabelContainer');
        app.inputLabelContainer.append(
            app.label,
            app.input
        );

        app.form.appendChild(app.inputLabelContainer);
    },

    handleSubmit: (event) => {
        event.preventDefault();
        app.init();
        console.log(app.input.value);
        console.log(event.target[0].value);

        const minValue = event.target[0].value;
        const maxValue = event.target[1].value;

        let evenValues = [];
        let newEven = [];
        let result = '';
        
        for (let i=minValue; i<=maxValue; i++) {
            evenValues.push(i);

            newEven = evenValues.filter((evenValue) => evenValue % 2 === 0);

            result = newEven.join(', ');
        }

        app.displayResult(result);
    },

    displayResult: (result) => {
        app.result = document.createElement('div');
        app.result.classList.add('result');
        app.result.textContent = result;

        app.container.appendChild(app.result);
    }
};

document.addEventListener('DOMContentLoaded', app.init);

