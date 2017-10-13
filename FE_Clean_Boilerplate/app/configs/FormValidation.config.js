/**
 * Place input's validation requirements here
 */

import React from 'react';
import Validation from 'react-validation';

Object.assign(Validation.rules, {
    // Key name maps the rule
  required: {
    // Function to validate value
    // NOTE: value might be a number -> force to string
    rule: (value) => {
      return value.toString().trim();
    },
    // Function to return hint
    // You may use current value to inject it in some way to the hint
    hint: () => {
      return <span className="form-error is-visible">Required</span>;
    },
  },
  // Define API rule to show hint after API error response
  // api: {
  //     // We don't need the rule here because we will call the 'showError' method by hand on API error
  //     hint: value => (
  //         <button
  //             className="form-error is-visible"
  //         >
  //             API Error on "{value}" value. Focus to hide.
  //         </button>
  //     )
  // }
});
