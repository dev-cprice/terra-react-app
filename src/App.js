import React, { Component, useState, useContext } from 'react';
import Base from 'terra-base';
import Button from 'terra-button';
import Alert from 'terra-alert';
import { ActiveBreakpointProvider, ActiveBreakpointContext } from 'terra-breakpoints';
import ActionHeader from 'terra-action-header/lib/ActionHeader';
import ActionFooter from 'terra-action-footer/lib/ActionFooter';
import DialogModal from 'terra-dialog-modal';
import Input from 'terra-form-input';
import List, { Item } from 'terra-list';
import logo from './logo.svg';
import './App.css';

const locales = ['en', 'en-AU', 'en-US', 'en-GB', 'es', 'es-US', 'es-ES', 'de', 'fr', 'fr-FR', 'nl', 'nl-BE', 'pt', 'pt-BR', 'sv', 'sv-SE'];
const data = [...new Array(15)].map((_, i) => `${i}`);

const ResponsiveDropdownTest = () => {
  const label = "Label";
  const [isOpen, setIsOpen] = useState(false);
  const activeBreakpoint = useContext(ActiveBreakpointContext);
  const [selected, setSelected] = useState([]);

  function decideOnModal() {
    switch (activeBreakpoint) {
      case 'tiny':
      case 'small':
        return true;
      default:
        return false;
    }
  }

  function onClick() {
    setIsOpen(o => !o);
  }

  return (
    <div>
      <Button text={isOpen ? "Close" : "Open"} onClick={onClick} />
      <p>Active breakpoint: {activeBreakpoint}</p>
      <DialogModal
        isOpen={isOpen && decideOnModal()}
        header={<ActionHeader title={label} onClose={() => setIsOpen(false)} />}
        footer={<ActionFooter start={<Button text="Clear All" onClick={() => alert('Cleared all selected items..')} />} end={<Button text="Apply" onClick={() => alert('Apply!')} />} />}
        ariaLabel="Dialog modal thing"
        onRequestClose={onClick}>
          <Input />
          <List role="listbox">
            {data.map(d => <Item isSelectable onSelect={(e, m) => console.log(e)} key={d}>{d}</Item>)}
          </List>
      </DialogModal>
    </div>
  );
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectLocale: 'en'
    };

    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  handleSelectChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <Base locale={this.state.selectLocale}>
        <ActiveBreakpointProvider>
          <div className="App">
            <Alert type="success">Your Terra UI + Create React App works!</Alert>
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <p>
                Edit <code>src/App.js</code> and save to reload.
              </p>
              <Button
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
                text="Learn React"
                variant="emphasis"
              />
              <p>
                <label htmlFor="locale-switcher">Select locale</label>
                <select id="locale-switcher" className="locale-switcher" name="selectLocale" value={this.state.selectLocale} onChange={this.handleSelectChange}>
                  {locales.map((locale) => <option key={locale} value={locale}>{locale}</option>)}
                </select>
              </p>
              <ResponsiveDropdownTest />
            </header>
          </div>
        </ActiveBreakpointProvider>
      </Base>
    );
  }
}

export default App;
