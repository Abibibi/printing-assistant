const app = {
    state: {
        minValue: '',
        maxValue: '',
        allValues: [],
        filteredValues: [],
        finalResult: ''
    },

    init: () => {
        app.container = document.getElementById('app');

        app.container.innerHTML = '';

        console.log(app.state.finalResult);

        app.displayTitle('Obtenez une suite de chiffres pairs');
        app.displayForm(2, 86);

        if (app.state.finalResult) {
            app.displayResult(app.state.finalResult);
        }

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

        app.state.minValue = parseInt(event.target[0].value);
        app.state.maxValue = parseInt(event.target[1].value);

        console.log(app.state.minValue);
        console.log(app.state.maxValue);

        // loop to get all numbers comprised between app.state.minValue and app.state.maxValue
        for (var i=app.state.minValue; i<=app.state.maxValue; i++) {
            app.state.allValues = [...app.state.allValues, i];
            // to only get even numbers among all numbers
            app.state.filteredValues = app.state.allValues.filter((value) => value % 2 === 0);

            // to properly format the suite so it can be used in print windows
            app.state.finalResult = app.state.filteredValues.join(', ');
        }

        console.log(app.state.allValues);

        console.log(app.state.finalResult);

        // to clear form
        app.init();

        // to reinitialize arrays and thus get a new suite after each form submission
        app.state.allValues = [];
    },

    displayResult: (result) => {
        app.result = document.createElement('div');
        app.result.classList.add('result');
        app.result.textContent = result;

        app.container.appendChild(app.result);
    }
};

document.addEventListener('DOMContentLoaded', app.init);

