import React from 'react';

export default React.createContext({
  title: '',
  updateTitle: title => {console.log(title,'its in context')},
});
