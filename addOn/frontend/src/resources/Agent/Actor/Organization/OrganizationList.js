import React from 'react';
import { MultiViewsList } from '@semapps/list-components';
import { MapList } from '@semapps/geo-components';
import { Avatar } from '@material-ui/core';
import MapIcon from '@material-ui/icons/Map';
import ListIcon from '@material-ui/icons/List';
import HomeIcon from '@material-ui/icons/Home';
import OrganizationFilterSidebar from './OrganizationFilterSidebar';
import SimpleList from "../../../../common/list/SimpleList";
import List from "../../../../layout/list/List";
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import ListActionsWithViews from './ListActionsWithViews';
import PopupContent from './PopupContent';

L.Marker.prototype.options.icon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
});;

const OrganizationList = props => (
  <MultiViewsList
    ListComponent={List}
    actions={<ListActionsWithViews />}
    aside={<OrganizationFilterSidebar />}
    views={{
      map: {
        label: 'Carte',
        icon: MapIcon,
        perPage: 500,
        pagination: false,
        list: (
          <MapList
            latitude={record => record['pair:hasLocation'] && record['pair:hasLocation']['pair:latitude']}
            longitude={record => record['pair:hasLocation'] && record['pair:hasLocation']['pair:longitude']}
            label={record => record['pair:label']}
            description={record => record['peps:type']}
            popupContent={PopupContent}
            scrollWheelZoom
            center= {[46.42816, 4.66527]}
            zoom= {11}
          />
          // <MapContainer style={{ height: "100vh" }} center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
          //   <TileLayer
          //     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          //     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          //   />
          //   <Marker position={[51.505, -0.09]}>
          //     <Popup>
          //       A pretty CSS3 popup. <br /> Easily customizable.
          //     </Popup>
          //   </Marker>
          // </MapContainer>
        )
      },
      list: {
        label: 'Liste',
        icon: ListIcon,
        sort: { field: 'pair:label', order: 'ASC' },
        perPage: 25,
        list: (
          <SimpleList
            primaryText={record => record['pair:label']}
            secondaryText={record => record['peps:type']}
            leftAvatar={record => (
              <Avatar src={record['image']} width="100%">
                <HomeIcon />
              </Avatar>
            )}
            linkType="show"
          />
        )
      },
    }}
    {...props}
  />
);

export default OrganizationList;
