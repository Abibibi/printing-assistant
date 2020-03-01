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
        setTimeout(() => {
            // to make sure height taken into account
            // is always window height, even if 
            // this height is reduced (typically,
            // when the keyboard is displayed on mobile)
            const viewheight = window.innerHeight;
            const viewwidth = window.innerWidth;
            const viewport = document.querySelector('meta[name=viewport]');
            viewport.setAttribute('content', `height=${viewheight}px, width=${viewwidth}px, initial-scale=1.0`);
        }, 300);
        
        app.container = document.getElementById('app');

        app.container.innerHTML = '';

        app.titleFormResults = document.createElement('div');
        app.titleFormResults.classList.add('title-form-results');

        app.displayInk();
        app.displayTitle('Obtenez une suite de chiffres pairs ou impairs');
        app.displayBaseline('Pratique pour vos impressions recto-verso !');
        app.displayDesc();
        app.displayForm('1 ou 2', '15 ou 84');

        console.log(app.state.finalResult.charAt(0));
        console.log(typeof app.state.finalResult.charAt(0));

        // to display a message on form submission,
        // informing the user how the result displayed
        // can be used
        if (!isNaN(parseInt(app.state.finalResult.charAt(0)))) {
            app.displayInstruction();
        }

        app.displayResult(app.state.finalResult);

        app.container.appendChild(app.titleFormResults);
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
        app.titleFormResults.appendChild(app.titleBaseline);
    },

    displayBaseline: (baselineText) => {
        app.baseline = document.createElement('h2');
        app.baseline.classList.add('baseline');
        app.baseline.textContent = baselineText;
        
        app.titleBaseline.appendChild(app.baseline);
    },

    displayDesc: () => {
        app.desc = document.createElement('div');
        app.desc.classList.add('desc');
        app.desc.textContent = 'Générez une suite en soumettant le formulaire ci-contre.';

        app.titleBaseline.appendChild(app.desc);
    },

    displayInstruction: () => {
        app.instruction = document.createElement('div');
        app.instruction.classList.add('instruction');

        app.instruction.textContent = 
        `
            Vous pouvez copier cette suite
            et la coller dans votre
            fenêtre d'impression.
        `;

        app.titleBaseline.appendChild(app.instruction);
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
        app.titleFormResults.appendChild(app.formResults);
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

        // to make sure that the figures entered are integer
        if (
            event.target[0].value % 1 != 0 && !isNaN(app.state.minValue) || 
            event.target[1].value % 1 != 0 && !isNaN(app.state.maxValue)
        ) {
            app.state.finalResult = 'Veuillez renseigner des nombres entiers.'
            app.init();
            return;
        };

        

        // 
        if (isNaN(app.state.minValue) || isNaN(app.state.maxValue)) {
            app.state.finalResult = 'Veuillez renseignez des chiffres.'
            app.init();
            return;
        };

        if (app.state.minValue >= app.state.maxValue) {
            app.state.finalResult = 'Le chiffre minimal doit être inférieur au chiffre maximal.';
            app.init();
            return;
        };

        if (app.state.minValue === 0 || app.state.maxValue === 0) {
            app.state.finalResult = 'Tous les chiffres doivent être positifs.'
            app.init();
            return;
        };     

        // loop to get all numbers comprised between app.state.minValue and app.state.maxValue
        for (var i=app.state.minValue; i<=app.state.maxValue; i++) {
            app.state.allValues = [...app.state.allValues, i];
            
            // to only get even numbers among all numbers
            if (app.state.minValue % 2 === 0 && app.state.maxValue % 2 === 0) {
                app.state.filteredValues = app.state.allValues.filter((value) => value % 2 === 0);
                
                // to properly format the suite so it can be used in print windows
                app.state.finalResult = app.state.filteredValues.join(', ');
            // to only get odd numbers among all numbers
            } else if (app.state.minValue % 2 !== 0 && app.state.maxValue % 2 !== 0) {
                app.state.filteredValues = app.state.allValues.filter((value) => value % 2 !== 0);

                // to properly format the suite so it can be used in print windows
                app.state.finalResult = app.state.filteredValues.join(', ');
            } else {
                app.state.finalResult = 'Les chiffres renseignés doivent être tous deux soit pairs soit impairs.'
            } 
        }

        console.log(app.state.allValues);

        console.log(app.state.finalResult);

        // to reinitialize arrays and thus get a new suite after each form submission
        app.state.allValues = [];

        // to clear form
        app.init();        
    },

    displayResult: (result) => {
        app.result = document.createElement('div');
        app.result.classList.add('result');
        app.result.textContent = result;

        app.formResults.appendChild(app.result);
    }
};

document.addEventListener('DOMContentLoaded', app.init);

