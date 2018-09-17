import React, { Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import {
  Container,
  Row,
  Column,
} from 'styled-bootstrap-components';


import ArtsitStorage from 'Storage/artists';
import SearchBar from 'React/components/searchBar';
import ArtistCard from 'React/components/artistCard';
import Routes, { buildUrl } from 'config/routesConfig';

const getSortedByDate = artists => artists.sort((a1, a2) => a2.queryDate - a1.queryDate);

const WithLink = ({ to, children, mandatory }) => {
  const link = to  ? buildUrl(Routes.artist, { artistName: to }) : undefined;
  if (link) {
    return (
      <Link to={link}>
        {children}
      </Link>
    )
  }

  if (mandatory) return <noscript />;

  return children;
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      artists: {},
    };
  }

  componentWillMount() {
    const loadArtist = name => ArtsitStorage.getItem(name).then(artist => {
      this.setState(state => ({
        ...state,
        artists: {
          ...state.artists,
          [name]: {
            ...artist,
            facebookPageUrl: undefined,
          },
        },
      }));
    });

    ArtsitStorage.keys().then((names = []) => {
      const artistsLoading = names.reduce((col, name) => {
        if (!name) return col;
        loadArtist(name);
        return {
          ...col,
          [name]: { isLoading: true },
        };
      }, {});
      
      this.setState(state => ({
        ...state,
        artists: {
          ...artistsLoading,
          ...state.artists,
        },
      }));
    });

  }

  render() {
    const artists = getSortedByDate(Object.values(this.state.artists));

    return (
      <Fragment >
        <Container>
            <Row mt="15px">
              <Column>
                <SearchBar />
              </Column>
            </Row>
          </Container>
        {!!artists.length && (
          <Container>
            <Row mt="15px">
              <Column>
                <h2>Previous searches: </h2>
              </Column>
            </Row>
            <Row mt="5px">
              {artists.map((artist, key) => (
                <Column md={4} sm={3} xs={2} key={key}>
                  <WithLink to={artist.queryString || artist.name}>
                    <ArtistCard inline artist={artist} />
                  </WithLink>
                </Column>
              ))}
            </Row>
          </Container>
        )}
        {!artists.length && (
          <Container>
            <Row mt="15px">
              <Column>
                <h2>Wellcome! </h2>
                <h3>Here you will see all your previous searched artitsts after you make your first search.</h3>  
              </Column>
            </Row>
          </Container>
        )}
      </Fragment>
    );
  }
}

export default App;
