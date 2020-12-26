import React from 'react';
import { Entry } from '../types';
import { Icon, Item } from 'semantic-ui-react';


//const sameName_= ({ entry }: Entry) => {}, but apparently no static type checking this way.
const EntryDetail: React.FC<{entry: Entry}> = ({ entry }) => {
    switch (entry.type) {
        case "Hospital": {
            return (
                <Item.Group>
                  <Item>
                     <Item.Content>
                    <Item.Header as='a'>{entry.date} {entry.type} <Icon name="wheelchair"></Icon></Item.Header>
                    <Item.Description>
                      {entry.description}
                    </Item.Description>
                        <Item.Extra>{entry?.discharge?.criteria}</Item.Extra>
                     </Item.Content>
                 </Item>
                </Item.Group>
            );
        }

        case "HealthCheck": {
            return (
                <Item.Group>
                  <Item>
                    <Item.Content>
                      <Item.Header as='a'>{entry.date} {entry.type} <Icon name="blind"></Icon></Item.Header>
                        <Item.Description>
                          {entry.description}
                        </Item.Description>
                          <Item.Extra>Health check rating: {entry.healthCheckRating}</Item.Extra>
                    </Item.Content>
                  </Item>
                </Item.Group>
            );
        }
        case "OccupationalHealthcare": {
          return (
            <Item.Group>
              <Item>
                <Item.Content>
                  <Item.Header as='a'>{entry.date} {entry.type} <Icon name="fighter jet"></Icon></Item.Header>
                  <Item.Description>
                    {entry.description}
                  </Item.Description>
                  <Item.Extra>sickleave start-end: {entry?.sickLeave?.startDate} - {entry?.sickLeave?.endDate}</Item.Extra>
                </Item.Content>
              </Item>
            </Item.Group>
          );
        }
    }

};

export default EntryDetail;