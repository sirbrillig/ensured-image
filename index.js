/* globals setTimeout */
const React = require( 'react' );
const PropTypes = require( 'prop-types' );

const secsToMs = ( secs ) => secs * 1000;

const el = React.createElement;

class EnsuredImage extends React.Component {
	constructor( props ) {
		super( props );
		this.state = { didLoadFail: false };
		this.handleFailedImage = this.handleFailedImage.bind( this );
		this.retryImage = this.retryImage.bind( this );
	}

	retryImage() {
		this.setState( { didLoadFail: false } );
	}

	handleFailedImage( retryAfter ) {
		this.setState( { didLoadFail: true } );
		this.props.setTimeout( this.retryImage, retryAfter );
	}

	render() {
		const { src, retryAfter } = this.props;
		if ( this.state.didLoadFail ) {
			return el( this.props.PlaceholderComponent );
		}
		const onError = () => this.handleFailedImage( retryAfter );
		return el( this.props.ImageComponent, { src, onError } );
	}
}

EnsuredImage.propTypes = {
	src: PropTypes.string.isRequired,
	retryAfter: PropTypes.number,
	setTimeout: PropTypes.func,
	ImageComponent: PropTypes.func,
	PlaceholderComponent: PropTypes.func,
};

EnsuredImage.defaultProps = {
	retryAfter: secsToMs( 60 ),
	setTimeout: ( callBack, timeUntil ) => setTimeout( callBack, timeUntil ),
	ImageComponent,
	PlaceholderComponent,
};

function ImageComponent( { src, onError } ) {
	return el( 'img', { className: 'reloadable-image', src, onError } );
}

function PlaceholderComponent() {
	return el(
		'svg',
		{ className: 'placeholder-image', width: '33', height: '33' },
		el( 'circle', { cx: '16', cy: '16', r: '15', fill: 'orange' } )
	);
}

module.exports = EnsuredImage;
