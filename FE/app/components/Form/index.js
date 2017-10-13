/**
*
* Form
*
*/

import React from 'react';


const Form = ({className, children}) => {
  return (
    <div className={className}>
        {children}
    </div>
  );
}
export default Form;
// const StyledForm = styled(Form)`
//     --primaryBlack: black;
//     --radiusS: 2px;
//     --radiusM: 5px;
//     --paddingS: 5px;
//     --paddingM: 10px;
//     --paddingL: 15px;
//     --marginS: 5px;
//     --marginM: 10px;
//     --marginL: 15px;

//     .form-section {
//         margin-bottom: var(--marginM);
//     }

//     label {
//         &>span {
//             display: inline-block;
//             margin-bottom: var(--marginS);
//         }
//     }
//     input {
//         width: 100%;
//         height: 2.4375rem;
//         padding: var(--paddingS);
//         border: 1px solid var(--primaryBlack);
//         border-radius: var(--radiusS);
//         font-size: 1rem;
//         box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.1);
//         transition: box-shadow 0.5s, border-color 0.25s ease-in-out;
//     }
//     .is-invalid-input:not(:focus) {
//         background-color: rgba(236, 88, 64, 0.1);
//         border-color: #ec5840;
//     }

//     button {
//         display: inline-block;
//         text-align: center;
//         line-height: 1;
//         cursor: pointer;
//         transition: background-color 0.25s ease-out, color 0.25s ease-out;
//         vertical-align: middle;
//         border: 1px solid transparent;
//         border-radius: 0;
//         padding: 0.85em 1em;
//         margin: 0 0 1rem 0;
//         font-size: 0.9rem;
//         background-color: #2199e8;
//         color: #fefefe;

//         &.disabled, &[disabled] {
//             opacity: 0.25;
//             cursor: not-allowed;
//         }
//     }

//     .form-error {
//         display: inline-block;
//         margin-top: var(--marginM);
//         &.is-visible {
//             color: red;
//         }
//     }
// `;
// export default StyledForm;