import inkPictures from '../data/inkPictures2.js';

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

        app.titleForm = document.createElement('title-form');
        app.titleForm.classList.add('title-form');

        app.displayInk();
        app.displayTitle('Obtenez une suite de chiffres pairs ou impairs');
        app.displayBaseline('Pratique pour vos impressions recto-verso !');
        app.displayForm('1 ou 2', '15 ou 87');

        if (app.state.finalResult) {
            app.displayResult(app.state.finalResult);
        }

        /* app.displayTitle('Obtenez une suite de chiffres impairs');
        app.displayForm(1, 57); */

        app.container.appendChild(app.titleForm);
    },

    displayInk: () => {
        app.inkContainer = document.createElement('div');
        app.inkContainer.classList.add('ink-container');

        inkPictures.map((picture) => {
            app.ink = document.createElement('img');

            app.ink.setAttribute('src', picture.link);
            app.ink.setAttribute('alt', 'encre multicolore coulant de haut en bas');

            app.ink.classList.add(`ink-container-content-${picture.type}`);

            app.inkContainer.appendChild(app.ink);
        });

        app.container.appendChild(app.inkContainer);
    },

    displayTitle: (titleText) => {
        app.titleBaseline = document.createElement('div');
        app.titleBaseline.classList.add('title-baseline');

        app.title = document.createElement('h1');
        app.title.classList.add('title');
        app.title.textContent = titleText;
        
        app.titleBaseline.appendChild(app.title);
        app.titleForm.appendChild(app.titleBaseline);
    },

    displayBaseline: (baselineText) => {
        app.baseline = document.createElement('h2');
        app.baseline.classList.add('baseline');
        app.baseline.textContent = baselineText;
        
        app.titleBaseline.appendChild(app.baseline);
        app.titleForm.appendChild(app.titleBaseline);
    },

    displayForm: (min, max) => {
        app.formResults = document.createElement('div');
        app.formResults.classList.add('form-results');

        app.form = document.createElement('form');
        app.form.classList.add('form');

        app.displayLabelInput('Chiffre minimal', 'min', 'Saisissez un chiffre minimal', min);
        app.displayLabelInput('Chiffre maximal', 'max', 'Saisissez un chiffre maximal', max);

        app.button = document.createElement('button');
        app.button.classList.add('button');
        app.button.textContent = 'Ok';

        app.form.appendChild(app.button);

        app.form.addEventListener('submit', app.handleSubmit);

        app.formResults.appendChild(app.form);
        app.titleForm.appendChild(app.formResults);
    },

    displayLabelInput: (label, forIdAttributes, inputTitle, placeholder) => {
        app.label = document.createElement('label');
        app.label.htmlFor = forIdAttributes;
        app.label.classList.add('label');
        app.label.textContent = label;

        app.input = document.createElement('input');
        app.input.classList.add('input');
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
            if (app.state.minValue % 2 === 0 && app.state.maxValue % 2 === 0) {
                app.state.filteredValues = app.state.allValues.filter((value) => value % 2 === 0);
            // to only get odd numbers among all numbers
            } else if (app.state.minValue % 2 !== 0 && app.state.maxValue % 2 !== 0) {
                app.state.filteredValues = app.state.allValues.filter((value) => value % 2 !== 0);
            }
            
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

        app.formResults.appendChild(app.result);
    }
};

document.addEventListener('DOMContentLoaded', app.init);

