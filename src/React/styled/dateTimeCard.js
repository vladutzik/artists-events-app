import styled from 'styled-components';
 
export const DateTimeCard = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  color: #008BF8;
  text-align: center;
  width: 100px;

  > span {

  }

  .day-of-week {
    color: #F5B700;
    text-align: cetner;

    > span {
      color: #008BF8;
    }
  }
`;

export default DateTimeCard;
