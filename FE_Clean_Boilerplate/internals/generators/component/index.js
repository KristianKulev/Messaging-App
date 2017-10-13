/**
 * Component Generator
 */

/* eslint strict: ["off"] */

'use strict';

const componentExists = require('../utils/componentExists');

module.exports = {
  description: 'Add an unconnected component',
  prompts: [
    {
      type: 'list',
      name: 'type',
      message: 'Select the type of component',
      default: 'Stateless Function',
      choices: () => ['Stateless Function', 'React.PureComponent', 'React.Component']
    }, {
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      default: 'Button',
      validate: (value) => {
        if ((/.+/).test(value)) {
          return componentExists(value)
            ? 'A component or container with this name already exists'
            : true;
        }

        return 'The name is required';
      }
    }
  ],
  actions: (data) => {
    // Generate index.js and index.test.js
    let componentTemplate;

    switch (data.type) {
      case 'Stateless Function':
        {
          componentTemplate = './component/stateless.js.hbs';
          break;
        }
      default:
        {
          componentTemplate = './component/class.js.hbs';
        }
    }

    data.kebapCaseName = data.name
      .replace(/([A-Z])/g, (x, y) => `-${y.toLowerCase()}`)
      .replace(/^-/, '');

    const actions = [
      {
        type: 'add',
        path: '../../app/components/{{properCase name}}/index.js',
        templateFile: componentTemplate,
        abortOnFail: true
      }, {
        type: 'add',
        path: '../../app/components/{{properCase name}}/styles.scss',
        templateFile: './component/styles.scss.hbs',
        abortOnFail: true
      }
    ];
    return actions;
  }
};
