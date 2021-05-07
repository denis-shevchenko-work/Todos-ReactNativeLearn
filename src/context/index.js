import React, {Component, PureComponent} from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const AppContext = React.createContext();

class AppProvider extends Component {
  state = {
    test: 'test',
    user: {
      name: 'Jane',
    },
    items: [],
  };

  updateState = update => {
    this.setState(update);
  };

  render() {
    return (
      <SafeAreaProvider>
        <AppContext.Provider
          value={{
            state: this.state,
            updateState: this.updateState,
          }}>
          {this.props.children}
        </AppContext.Provider>
      </SafeAreaProvider>
    );
  }
}

export {AppContext, AppProvider};
