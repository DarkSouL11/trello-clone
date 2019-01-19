import React from 'react';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { Provider } from 'mobx-react';

import './App.scss';
import Dialog from './components/general/Dialog';
import ItemModal from './components/item/ItemModal';
import ListModal from './components/list/ListModal';
import Main from './components/Main';
import stores from './stores';

function App() {
  return (
    <Provider {...stores}>
      <DragDropContextProvider backend={HTML5Backend}>
        <Main />
        {/* Singleton components */}
        <Dialog />
        <ItemModal />
        <ListModal />
      </DragDropContextProvider>
    </Provider>
  );
}

export default App;
