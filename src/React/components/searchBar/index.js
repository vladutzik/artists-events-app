import React from 'react';
import { Redirect } from 'react-router-dom';
import {
  Button,
  InputGroup,
  FormControl,
  InputGroupAppend,
} from 'styled-bootstrap-components';

import Routes, { buildUrl } from 'config/routesConfig';


class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      keyword: ''
    };
  }

  onEnter = ({ nativeEvent }) => {
    const { keyCode, charCode } = nativeEvent;
    if ([keyCode, charCode].includes(13)) {
      this.searchArtist();
    }
  }

  searchArtist = () => {
    const artistName = this.state.keyword;
    this.setState({ redirect: buildUrl(Routes.artist, { artistName }) })
  }

  render() {
    if (this.state.redirect) {
      return (<Redirect push to={this.state.redirect} />);
    }

    return (
      <InputGroup {...this.props}>
        <FormControl
          type="text"
          placeholder="Artist or Band name. Ex: Linkin Park, Brainstorm, LP, SOAD"
          value={this.state.keyword}
          onChange={e => this.setState({ keyword: e.target.value })}
          onKeyPress={this.onEnter}
        />
        <InputGroupAppend>
          <Button outline primary>Search</Button>
        </InputGroupAppend>
      </InputGroup>
    );
  }
}

export default SearchBar;
