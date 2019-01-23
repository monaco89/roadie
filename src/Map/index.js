import React, { Component } from 'react';
import ReactMapGL, { Marker, Popup, NavigationControl } from 'react-map-gl';

import EventPin from './event-pin';
import EventInfo from './event-info';

import './Map.css';

const navStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: '10px'
};

class Map extends Component {
    state = {
        viewport: {
            width: '100%',
            height: 400,
            latitude: 37.785164,
            longitude: -50,
            zoom: 1.8,
            bearing: 0,
            pitch: 0,
        },
        popupInfo: null,
    };


    _updateViewport = (viewport) => {
        this.setState({ viewport });
    }

    _renderCityMarker = (event, index) => {
        return (
            <Marker
                key={`marker-${index}`}
                longitude={event.venue.city.coords.long}
                latitude={event.venue.city.coords.lat}
            >
                <EventPin size={20} onClick={() => this.setState({ popupInfo: event })} />
            </Marker>
        );
    }

    _renderPopup() {
        const { popupInfo } = this.state;

        return popupInfo && (
            <Popup tipSize={5}
                anchor="top"
                longitude={popupInfo.venue.city.coords.long}
                latitude={popupInfo.venue.city.coords.lat}
                closeOnClick={false}
                onClose={() => this.setState({ popupInfo: null })} >
                <EventInfo info={popupInfo} />
            </Popup>
        );
    }

    render() {
        const { viewport } = this.state;
        const { events } = this.props;

        // TODO Fix the double events object
        return (
            <ReactMapGL
                {...viewport}
                mapStyle="mapbox://styles/nickmonaco/cjr9l3agz1shx2snrfk39bh4j"
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                onViewportChange={this._updateViewport}
            >
                {events.events.setlist.map(this._renderCityMarker)}

                {this._renderPopup()}

                <div className="nav" style={navStyle}>
                    <NavigationControl onViewportChange={this._updateViewport} />
                </div>
            </ReactMapGL>
        );
    }
}

export default Map;