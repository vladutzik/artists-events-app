import React, { Fragment } from 'react';
import { Button } from 'styled-bootstrap-components';
import GoogleMap from 'React/components/googleMap';
import EventCard from 'React/styled/eventCard';
import DateTimeCard from 'React/styled/dateTimeCard';

import AddressIcon from 'assets/images/address.svg';
import LocationIcon from 'assets/images/location.svg';

export const getParsedDate = d => {
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const date = new Date(d);
  const month = date.getMonth();
  const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();

  if (isNaN(date.getDay())) {
    return null;
  }

  return {
    month: months[month],
    day: date.getDate(),
    weekDay: days[date.getDay()],
    time: `${date.getHours()}:${minutes}`,
    year: date.getFullYear(),
  };
}

export const getLocation = ({city, region, country}) => [city, region, country].filter(Boolean).join(', ');

const getBookTickets = (offers = []) => {
  const offer = offers.filter(offer => offer.status === 'available' && offer.type.toLowerCase() === 'tickets')[0];
  return !!offer && (
    <a href={offer.url} target="BLANK" style={{ 'alignSelf': 'center' }}>
      <Button primary ml="10px" >Book Tickets</Button>
    </a>
  )
}

const getGoogleMap = (lat, lng) => (
  <GoogleMap
    lat={lat}
    lng={lng}
    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCPeUFIWRjGW5LrfvfmkbYfbastJgmSWkM&v=3.exp&libraries=geometry,drawing,places"
    loadingElement={<div style={{ width: 300, height: 200 }} />}
    containerElement={<div style={{ width: 300, height: 200 }} />}
    mapElement={<div style={{ width: 300, height: 200 }} />}
  />
);

export default ({ event }) => {
  const { venue } = event;
  const date = getParsedDate(event.datetime);

  const lat = Number(event.venue.latitude).toFixed(7);
  const lng = Number(event.venue.longitude).toFixed(7);  

  return (
    <Fragment>
      <EventCard>
        {!!date && (
          <DateTimeCard className="date-time">
            <span className="day-of-week">
              {date.weekDay}, <span>{date.time}</span>
            </span>
            <span className="day">{date.month} {date.day}</span>
            <span>{date.year}</span>
          </DateTimeCard>
        )}
        <div className="location">
          <img alt="Address icon" src={AddressIcon} />
          {getLocation(venue)}
        </div>
        <div className="venue-name">
          <img alt="Venue location icon" src={LocationIcon} />
          {venue.name}
        </div>
        {getBookTickets(event.offers)}
        
        {/* Did not decide the beautiful way to add map here */}
        {/* Should remmove the `false &&`in order map to work */}
        {(false && lat && lng && ![lat, lng].includes('NaN')) && getGoogleMap(lat, lng)}
      </EventCard>
    </Fragment>
  );
};