/**
*
* SearchAddUserWrapper
*
*/

import React from 'react';

import './styles.scss';

import SearchAddUser from 'containers/SearchAddUser';

function SearchAddUserWrapper() {
  return (
    <div className="search-add-user-wrapper-component row row--no-margin">
      <SearchAddUser/>
    </div>
  );
}

SearchAddUserWrapper.propTypes = {

};

export default SearchAddUserWrapper;
