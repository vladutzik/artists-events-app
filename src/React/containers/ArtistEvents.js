import React from 'react';
import { BandsintownInstance as API } from 'Utils/BandsintownApi';
import { Column, Container, Row } from 'styled-bootstrap-components';
import EventDetails from 'React/components/eventDetails';
import ArtistCard from 'React/components/artistCard';
import Loading from 'React/components/icons/loading';
import SearchBar from 'React/components/searchBar';
import Error404 from 'React/components/404';
import ArtsitStorage from 'Storage/artists';
import Routes from 'config/routesConfig';


const getEmoji = (emoji) => (<span aria-label="emoji" role="img">{emoji}</span>);

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      artist: { isLoading: true },
      events: [],
      isFetching: true,
    };
  }

  componentWillMount() {
    this.fetchData(this.props);
  }

  componentWillReceiveProps(props) {
    this.fetchData(props);
  }

  fetchData = (props) => {
    const { match: { params } } = props;
    if (!params.artistName) return null;

    ArtsitStorage.getItem(params.artistName).then(artist => {
      this.setState(state => ({
        ...state,
        artist: state.artist.isLoading ? {
          ...artist,
        } : state.artist,
      }));
    });

    API.getArtistEvents(params.artistName).then(events => {
      if (!events || typeof events === 'string') {
        return this.setState({ redirect: Routes.index });
      }

      return this.setState(state => ({
        ...state,
        isFetching: false,
        events,
      }));
    });

    API.getArtist(params.artistName).then(artist => {
      if (!artist || !artist.name) return null;

      ArtsitStorage.setItem(artist.name, artist);
      
      return this.setState(state => ({
        ...state,
        artist,
      }));
    });
  }

  render() {
    const { events, artist, isFetching } = this.state;

    if (this.state.redirect) {
      return (<Error404 timeToRedirect={3} redirectTo={this.state.redirect} />);
    }

    return (
      <Container mt="20px">
        <Row>
          <Column md={3}>
            <div style={{ display: 'inline-flex', maxWidth: '100%' }}>
              <ArtistCard artist={artist} />
            </div>
            <SearchBar style={{ marginTop: '20px' }} />
          </Column>
          <Column md={9}>
            {!!isFetching && <Loading />}
            {!!events && events.map((event, ix) => (<EventDetails event={event} key={ix} />)).filter(Boolean)}
            {(!events || !events.length) && !isFetching && (
              <h2 style={{ marginTop: 0 }}>
                There are no events for this artists at the moment {getEmoji('😕')} <br /> Check this page a bit later... 
                {getEmoji('😏')}
              </h2>
            )}
          </Column>
        </Row>
      </Container>
    );
  }
}

export default App;
