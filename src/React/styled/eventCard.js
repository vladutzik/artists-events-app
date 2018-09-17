
import styled from 'styled-components';

export const EventCard = styled.div`
  box-sizing: border-box;
  box-shadow: 1px 4px 12px lightgray;
  display: inline-flex;
  align-content: space-between;
  padding: 15px;
  margin: 0 20px 15px 0;
  width: calc(100% - 20px);

  &:hover {
    background: rgba(230, 230, 230, 0.3);
  }
  
  img {
    width: 16px;
    height: 16px;
    margin-right: 6px;
  }

  .location, .venue-name {
    padding-left: 20px;
    width: 160px;
    word-break: normal;

    img {
      margin-left: -20px;
    }
  }

  .location {
    flex-grow: 1;
    align-self: center;
    text-align: left;
  }

  .venue-name {
    align-self: center;
    display: inline-block;
    text-align: right;
  }
`;

export default EventCard;