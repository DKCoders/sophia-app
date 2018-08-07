/* eslint-disable react/no-unused-prop-types,react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { withHandlers } from 'proppy';
import { attach } from 'proppy-react';
import { Columns, Column } from 'sophia-components';
import { Card, Classes, ButtonGroup, Button, Text } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';

const P = withHandlers({
  onCardClick: ({ onClick, data }) => event => onClick && onClick(data, event),
  onDeleteClick: ({ onDelete, data }) => (event) => {
    event.stopPropagation();
    if (onDelete) {
      onDelete(data, event);
    }
  },
  onCloneClick: ({ onClone, data }) => (event) => {
    event.stopPropagation();
    if (onClone) {
      onClone(data, event);
    }
  },
});

const ContentCard = ({
  onCardClick,
  onDeleteClick,
  onCloneClick,
  image,
  title,
  subtitle,
}) => (
  <Card interactive onClick={onCardClick}>
    <Columns>
      <Column three>
        {image}
      </Column>
      <Column nine>
        <div>
          <Text
            ellipsize
            className={`${Classes.HEADING} is-marginless`}
            tagName="h3"
          >
            {title}
          </Text>
          <Text
            ellipsize
          >
            {subtitle}
          </Text>
          <ButtonGroup minimal className="is-pulled-right">
            <Button
              icon={IconNames.DUPLICATE}
              onClick={onCloneClick}
            />
            <Button
              icon={IconNames.TRASH}
              onClick={onDeleteClick}
            />
          </ButtonGroup>
        </div>
      </Column>
    </Columns>
  </Card>
);

ContentCard.propTypes = {
  onCardClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onCloneClick: PropTypes.func.isRequired,
  onClick: PropTypes.func,
  onDelete: PropTypes.func,
  onClone: PropTypes.func,
  image: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
  subtitle: PropTypes.node.isRequired,
  data: PropTypes.node,
};

ContentCard.defaultProps = {
  data: null,
  onClick: null,
  onDelete: null,
  onClone: null,
};

export default attach(P)(ContentCard);
