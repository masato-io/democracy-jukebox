import React from 'react';
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from 'material-ui/Card';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import styled from 'styled-components';

const Item = styled.div`
  height: 64px;
  color: #363636;
  display: flex;
  align-items: center;
  justify-content: start;
  padding: 12px 20px;
  border-bottom: 1px solid #ededed;
  transition: 0.2s all ease;
  &:hover {
    background-color: #ededed;
    cursor: pointer;
  }
`;

const Thumbnail = styled.div`width: 20%;`;
const Texts = styled.div`width: 80%;`;
const Title = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #363636;
`;
const Sub = styled.div`
  font-size: 14px;
  color: #888;
`;

const SearchEntry = props => {
  const clickHandler = () => {
    props.onAdd(props.Result);
  };
  return (
    <div>
      <Item onClick={clickHandler}>
        <Thumbnail>
          {<img src={props.Result.album.images['2'].url} alt="" />}
        </Thumbnail>
        <Texts>
          <Title>{props.Result.name}</Title>
          <Sub>{props.Result.artists[0].name}</Sub>
        </Texts>
      </Item>
    </div>
  );
};

export default SearchEntry;
