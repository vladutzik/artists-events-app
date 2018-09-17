import React from 'react';
import styled from 'styled-components';
import {
  Card,
  CardImageHeader,
  CardText,
  CardBody,
  CardTitle,
} from 'styled-bootstrap-components';
import Loading from 'React/components/icons/loading';
import FacebookIcon from 'React/components/icons/facebook';

const CustomCard = styled(Card)`
  display: inline-block;
  max-width: 100%;
  height: auto;
  margin-bottom: ${({ inline }) => (inline ? '15px' : 0)};
`;

const CustomCardBody = styled(CardBody)`
  background-color: rgba(255,255,255, 0.7);
  bottom: 0;
  box-sizing: border-box;
  color: black;
  position: absolute;
  padding: 5px 1.25rem;
  width: 100%;
  word-break: normal;

  .facebook {
    color: initial;

    &:hover {
      color: #3B5998;

      .facebook-icon {
        fill: #3B5998;
      }

    }
  }

  .facebook-icon {
    width: 20px;
    height: 20px;
  }
`;

const WithLink = ({ link, children, mandatory }) => {
  if (link) {
    return (
      <a href={link} target="BLANK" style={{ textDecoration: 'none' }}>
        {children}
      </a>
    )
  }

  if (mandatory) return <noscript />;

  return children;
}

export default ({ artist, ...props }) => {
  if (!artist) return (<noscript />);

  if (artist.isLoading) {
    return (
      <CustomCard width="18rem" textAlign="left" {...props}>
        <Loading />
      </CustomCard>
    );
  }

  return (
    <CustomCard width="18rem" textAlign="left" {...props}>
      <CardImageHeader src={artist.thumbUrl} />
      <CustomCardBody>
        <CardTitle  color="black">
          {artist.name}
        </CardTitle>

        <WithLink mandatory link={artist.facebookPageUrl}>
          <CardText className="facebook">
            Like them on <FacebookIcon className="facebook-icon" />
          </CardText>
        </WithLink>
      </CustomCardBody>
    </CustomCard>
  );
}